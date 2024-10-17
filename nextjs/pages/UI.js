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

export default function ui() {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [anchorEl, setAnchorEl] = useState(null); // State to track the anchor for the dropdown
  const [menuType, setMenuType] = useState(""); // Track which menu type is open
  const [closeTimeout, setCloseTimeout] = useState(null); // Track hover close timeout

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Event handler for hover menu
  const handleHoverMenuOpen = (event, menu) => {
    if (closeTimeout) clearTimeout(closeTimeout); // Prevent premature close
    setAnchorEl(event.currentTarget);
    setMenuType(menu);
  };

  const handleHoverMenuClose = () => {
    const timeout = setTimeout(() => {
      setAnchorEl(null);
      setMenuType("");
    }, 200);
    setCloseTimeout(timeout);
  };

  const isMenuOpen = Boolean(anchorEl); // Check if dropdown is open

  return (
    <>
      <Head>
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
          padding: "20px 40px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "28px",
            fontWeight: 600,
            color: "#d28a55",
            letterSpacing: "1px",
          }}>
          POPP-UP
        </Typography>

        {/* Navigation */}
        <Box sx={{ display: "flex", gap: "30px" }}>
          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{
              fontSize: "16px",
              color: "#333",
              padding: "10px 15px",
              ":hover": { color: "#d28a55" },
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(event) =>
              handleHoverMenuOpen(event, "Sweets Recipes")
            }>
            Sweets Recipes
          </Link>

          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{
              fontSize: "16px",
              color: "#333",
              padding: "10px 15px",
              ":hover": { color: "#d28a55" },
              transition: "color 0.2s ease",
            }}
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
            onMouseEnter: () => {
              if (closeTimeout) clearTimeout(closeTimeout);
            },
            onMouseLeave: handleHoverMenuClose,
          }}
          sx={{
            "& .MuiPaper-root": {
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
              padding: "10px",
              borderRadius: "8px",
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
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          />

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f7f7f7",
              borderRadius: "30px",
              padding: "5px 15px",
            }}>
            <InputBase
              placeholder="Search..."
              sx={{ flex: 1, fontSize: "14px" }}
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
      <Box
        component="section"
        sx={{ padding: "80px 40px", backgroundColor: "#fafafa" }}>
        {/* Popular Sweets Recipes */}
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            color: "#333",
            mb: 4,
          }}>
          Popular Sweets Recipes
        </Typography>

        <Grid container spacing={4}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  height: "220px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
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
            fontFamily: "'Inter', sans-serif",
            fontSize: "24px",
            fontWeight: 600,
            color: "#333",
            mb: 4,
            mt: 6,
          }}>
          Popular Stocks Investment
        </Typography>

        <Grid container spacing={4}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  height: "220px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.08)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  ":hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
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
          borderTop: "1px solid #ececec",
          mt: 4,
        }}>
        <Typography
          variant="body1"
          sx={{ marginBottom: "15px", fontWeight: 500 }}>
          Contact Us
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            mb: 2,
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
        <Link
          href="/privacy-policy"
          sx={{ color: "#666", fontSize: "14px", mr: 1 }}>
          Privacy Policy
        </Link>
        |
        <Link
          href="/terms-of-service"
          sx={{ color: "#666", fontSize: "14px", ml: 1 }}>
          Terms of Service
        </Link>
      </Box>
    </>
  );
}
