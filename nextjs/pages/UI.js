import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Head from "next/head";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [anchorEl, setAnchorEl] = useState(null); // State to track the anchor for the dropdown
  const [menuType, setMenuType] = useState(""); // Track which menu type is open

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Event handler for hover menu
  const handleHoverMenuOpen = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setMenuType(menu);
  };

  const handleHoverMenuClose = () => {
    setAnchorEl(null);
    setMenuType("");
  };

  const isMenuOpen = Boolean(anchorEl); // Check if dropdown is open

  return (
    <>
      <Head>
        <title>POPP-UP</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Poppins:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Header */}
      <Box
        component="header"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 30px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "32px",
            color: "#d28a55",
            letterSpacing: "2px",
          }}>
          POPP-UP
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{ padding: "10px 20px", display: "block" }}
            onMouseEnter={(event) =>
              handleHoverMenuOpen(event, "Sweets Recipes")
            }>
            Sweets Recipes
          </Link>

          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{ padding: "10px 20px", display: "block" }}
            onMouseEnter={(event) =>
              handleHoverMenuOpen(event, "Stocks Investment")
            }>
            Stocks Investment
          </Link>
        </Box>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen} // Set dropdown state
          onClose={handleHoverMenuClose}
          MenuListProps={{
            onMouseLeave: handleHoverMenuClose, // Close dropdown on mouse leave
          }}
          sx={{
            "& .MuiPaper-root": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "10px",
            },
          }}>
          {menuType === "Sweets Recipes" && (
            <>
              <MenuItem onClick={handleHoverMenuClose}>Cakes</MenuItem>
              <MenuItem onClick={handleHoverMenuClose}>Cookies</MenuItem>
              <MenuItem onClick={handleHoverMenuClose}>Pastries</MenuItem>
            </>
          )}
          {menuType === "Stocks Investment" && (
            <>

              <MenuItem onClick={handleHoverMenuClose}>Apple</MenuItem>
              <MenuItem onClick={handleHoverMenuClose}>Nvidia</MenuItem>
              <MenuItem onClick={handleHoverMenuClose}>Microsoft</MenuItem>
            </>
          )}
        </Menu>

        {/* User Actions */}
        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Box
            component="img"
            alt="user"
            src="/img/avatar.png"
            sx={{
              verticalAlign: "middle",
              width: 50,
              height: 50,
              borderRadius: "50%",
            }}
          />

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f0f0f5",
              borderRadius: "25px",
              padding: "5px 10px",
            }}>
            <InputBase
              placeholder="Search..."
              sx={{ padding: "0 8px", flex: 1 }}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main content */}
      <Box component="section" sx={{ padding: "60px 30px" }}>
        {/* Popular Sweets Recipes */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            color: "#d28a55",
            mb: 3,
          }}>
          Popular Sweets Recipes
        </Typography>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  height: "220px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Popular Stocks Investment */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "28px",
            color: "#d28a55",
            mb: 3,
            mt: 5,
          }}>
          Popular Stocks Investment
        </Typography>
        <Grid container spacing={3}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  height: "220px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#fff",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "50px",
          borderTop: "1px solid #ccc",
        }}>
        <Typography variant="body1" sx={{ marginBottom: "15px" }}>
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#d28a55" }}>
            Punboon
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#d28a55" }}>
            Tang
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#d28a55" }}>
            PP
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: "#d28a55" }}>
            Opor
          </Typography>
        </Box>
      </Box>
    </>
  );
}
