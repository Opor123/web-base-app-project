import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Link,
  Grid,
  IconButton,
  InputBase,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMenu = () => setMenuOpen(!menuOpen);

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
        <Box
          component="nav"
          sx={{
            display: { xs: isMenuOpen ? "block" : "none", md: "flex" },
            gap: { md: "40px" },
            flexDirection: { xs: "column", md: "row" },
            position: { xs: "absolute", md: "initial" },
            top: { xs: "60px", md: "initial" },
            left: { xs: "0", md: "initial" },
            backgroundColor: { xs: "#fff", md: "transparent" },
            width: { xs: "100%", md: "auto" },
          }}>
          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{ padding: "10px 20px", display: "block" }}>
            Sweets Recipes
          </Link>
          <Link
            href="#"
            underline="none"
            color="inherit"
            sx={{ padding: "10px 20px", display: "block" }}>
            Stocks Investment
          </Link>
        </Box>

        {/* User Actions */}
        <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d28a55",
              color: "#fff",
              borderRadius: "25px",
              fontWeight: "600",
              ":hover": {
                backgroundColor: "#bc7644",
              },
            }}>
            Log In
          </Button>

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
            onClick={handleToggleMenu}>
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
          {/* Replace with dynamic content */}
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          {/* Repeat for other boxes */}
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={3}>
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
          {/* Repeat for other boxes */}
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
