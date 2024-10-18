from fastapi import APIRouter, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from database import *  # Ensure your database functions are imported

router = APIRouter()

# Pydantic model for user creation
class UserCreate(BaseModel):
    username: str
    password_hash: str
    email: str

# Pydantic model for user update
class UserUpdate(BaseModel):
    username: Optional[str] = None
    password_hash: Optional[str] = None
    email: Optional[str] = None
    user_type: Optional[str]=None

# Pydantic model for user response
class User(BaseModel):
    user_id: int
    username: str
    password_hash: str
    email: str
    user_type:str
    created_at: datetime

# Pydantic model for login
class UserLogin(BaseModel):
    email: str
    password_hash: str

# Endpoint to create a new user
@router.post("/users/create", response_model=User)
async def create_user(user: UserCreate):
    # Check if the username already exists
    existing_user = await get_user(user.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    result = await insert_user(user.username, user.password_hash, user.email)
    if result is None:
        raise HTTPException(status_code=400, detail="Error creating user")
    return result

# Endpoint to get all users
@router.get("/users", response_model=list[User])  
async def get_users():
    query = "SELECT * FROM users"
    users = await database.fetch_all(query)  # Fetch all users from the database
    return users

# Endpoint to update a user
@router.put("/users/{user_id}", response_model=User)
async def update_user_endpoint(user_id: int, user: UserUpdate):
    result = await update_user(user_id, user.username, user.password_hash, user.email, user.user_type)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result

# Endpoint to delete a user
@router.delete("/users/{user_id}")
async def delete_user_endpoint(user_id: int):
    result = await delete_user(user_id)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}

# Endpoint for user login
@router.post("/users/login")
async def login_user(user: UserLogin):
    # Fetch user from the database
    db_user = await get_user_by_email(user.email, user.password_hash)

    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    # If login is successful, you can return user info (omit password hash)
    return {
        "user_id": db_user.user_id,
        "username": db_user.username,
        "email": db_user.email,
        "created_at": db_user.created_at,
        "user_type":db_user.user_type
    }

# Endpoint to get statistics
@router.get("/stats")
async def get_stats():
    # This function should return the relevant statistics from your database.
    sweets_count = await database.fetch_val("SELECT COUNT(*) FROM contentcategories WHERE category_name = 'Sweet Recipe'")
    stocks_count = await database.fetch_val("SELECT COUNT(*) FROM contentcategories WHERE category_name = 'Stock'")
    pageviews_count = await database.fetch_val("SELECT COUNT(*) FROM usercontent")
    visitors_count = await database.fetch_val("SELECT COUNT(DISTINCT user_id) FROM usercontent")
    program_count= await database.fetch_val("SELECT COUNT(*) FROM contentcategories WHERE category_name= 'Programming'")
    basketball_count= await database.fetch_val("SELECT COUNT(*) FROM contentcategories WHERE category_name= 'Basketball'")
    
    return {
        "sweets": sweets_count,
        "stocks": stocks_count,
        "pageviews": pageviews_count,
        "visitors": visitors_count,
        "programming": program_count,
        "basketball": basketball_count
    }

# Endpoint to get chart data for visitors and pageviews over time
@router.get("/chart-data")
async def get_chart_data():
    query = """
    SELECT 
        DATE_TRUNC('day', created_at) AS date, 
        COUNT(DISTINCT user_id) AS visitors, 
        COUNT(user_content_id) AS pageviews 
    FROM usercontent 
    GROUP BY DATE_TRUNC('day', created_at) 
    ORDER BY date
    """
    chart_data = await database.fetch_all(query)
    return [
        {
            "date": record["date"].strftime('%Y-%m-%d'),
            "visitors": record["visitors"],
            "pageviews": record["pageviews"]
        }
        for record in chart_data
    ]
