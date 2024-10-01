import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";

function Home() {
  const [showNewInterface, setShowNewInterface] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false); // Add state for forgot password modal

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1000);

    const transitionTimer = setTimeout(() => {
      setShowNewInterface(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(transitionTimer);
    };
  }, []);

  const handleOpenLogin = () => setOpenLoginModal(true);
  const handleCloseLogin = () => setOpenLoginModal(false);
  const handleOpenSignup = () => setOpenSignupModal(true);
  const handleCloseSignup = () => setOpenSignupModal(false);
  const handleOpenForgotPassword = () => setOpenForgotPasswordModal(true); // Open forgot password modal
  const handleCloseForgotPassword = () => setOpenForgotPasswordModal(false); // Close forgot password modal

  return (
    <>
      <Head>
        <title>Punboon Version</title>
      </Head>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        {!showNewInterface ? (
          <Box
            sx={{
              textAlign: "center",
              opacity: animate ? 0 : 1,
              transform: animate ? "translateY(-50px)" : "translateY(0)",
              transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontSize: "calc(100px + 2vw)", color: "#3d3d3d" }}
            >
              POPP
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "24px", color: "#3d3d3d", marginTop: "20px" }}
            >
              FINAL PROJECT
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              opacity: 1,
              transform: "translateY(0)",
              transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "calc(70px + 2vw)",
                color: "#3d3d3d",
                "&:hover": { cursor: "default" },
              }}
            >
              Welcome to{" "}
              <Typography
                variant="h4"
                sx={{
                  fontSize: "calc(70px + 2vw)",
                  color: "#b0dddc",
                  "&:hover": {
                    color: "purple",
                    cursor: "default",
                  },
                  transition: "color 0.4s ease-in-out",
                }}
              >
                POPP
              </Typography>{" "}
              website
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "24px",
                color: "#3d3d3d",
                marginTop: "20px",
                "&:hover": { cursor: "default" },
              }}
            >
              Explore more what you interest
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                color: "#3d3d3d",
                marginTop: "10px",
                "&:hover": { cursor: "default" },
              }}
            >
              <Button
                onClick={handleOpenLogin}
                variant="outlined"
                sx={{
                  color: "#3d3d3d",
                  borderColor: "#3d3d3d",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    color: "green",
                  },
                }}
              >
                Click here to start journey with us
              </Button>
            </Typography>
          </Box>
        )}
      </Box>

      {/* Login Modal */}
      <Modal
        open={openLoginModal}
        onClose={handleCloseLogin}
        aria-labelledby="login-modal"
        aria-describedby="login-form"
        sx={{
          display : "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" id="login-modal" sx={{ marginBottom: 2 }}>
            Log in
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              sx={{ marginBottom: 2 }}
              placeholder="example@example.com"
              id="email"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: 2 }}
              placeholder="Enter password"
              id="password"
            />
            <Grid container justifyContent="space-between" sx={{ marginBottom: 2 }}>
              <Grid item>
                <Link
                  component="button"
                  onClick={handleOpenSignup}
                  underline="hover"
                >
                  Register
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  onClick={handleOpenForgotPassword}
                  underline="hover"
                >
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#d4af6e",
                  "&:hover": { backgroundColor: "#bb9559" },
                }}
                onClick={async () => {
                  const emailInput = document.querySelector("#email");
                  const passwordInput = document.querySelector("#password");
                  if (emailInput && passwordInput) {
                    const email = emailInput.value;
                    const password = passwordInput.value;
                    try {
                      const response = await fetch("http://localhost:8000/api/users/login/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: email, password_hash: password }),
                      });
                      if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      const data = await response.json();
                      if (data.user_id) {
                        // Login successful, redirect to dashboard
                        window.location.href = "/dashboard";
                      } else {
                        // Login failed, display error message
                        alert("Login failed");
                      }
                    } catch (error) {
                      console.error("Error:", error);
                    }
                  } else {
                    console.error("Email or password input not found");
                  }
                }}
              >
                Log in
              </Button>
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
              />
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Signup Modal */}
      <Modal
        open={openSignupModal}
        onClose={handleCloseSignup}
        aria-labelledby="signup-modal"
        aria-describedby="signup-form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            boxShadow: 24,
          }}
        >
          <Typography variant="h5" id="signup-modal" sx={{ marginBottom: 2 }}>
            Sign up
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              sx={{ marginBottom: 2 }}
              placeholder="example@example.com"
              id="signup-email"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: 2 }}
              placeholder="Enter password"
              id="signup-password"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: 2 }}
              placeholder="Confirm your password"
              id="signup-confirm-password"
            />
            <Grid container justifyContent="space-between" sx={{ marginBottom: 2 }}>
              <Grid item>
                <Link
                  component="button"
                  onClick={handleOpenLogin}
                  underline="hover"
                >
                  Already have an account?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  onClick={handleOpenForgotPassword}
                  underline="hover"
                >
                  Forgot password?
                </Link >
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#d4af6e",
                  "&:hover": { backgroundColor: "#bb9559" },
                }}
                onClick={async () => {
                  const emailInput = document.querySelector("#signup-email");
                  const passwordInput = document.querySelector("#signup-password");
                  const confirmPasswordInput = document.querySelector("#signup-confirm-password");
                  if (emailInput && passwordInput && confirmPasswordInput) {
                    const email = emailInput.value;
                    const password = passwordInput.value;
                    const confirmPassword = confirmPasswordInput.value;
                    console.log("Email:", email);
                    console.log("Password:", password);
                    console.log("Confirm Password:", confirmPassword);
                    if (password !== confirmPassword) {
                      alert("Passwords do not match");
                      return;
                    }
                    try {
                      const apiEndpoint = "http://localhost:8000/api/users/";
                      const requestBody = JSON.stringify({ username: email, password_hash: password, email: email });
                      console.log("API Endpoint:", apiEndpoint);
                      console.log("Request Body:", requestBody);
                      const response = await fetch(apiEndpoint, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: requestBody,
                      });
                      console.log("Response:", response);
                      if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                      }
                      const data = await response.json();
                      console.log("Data:", data);
                      if (data.user_id) {
                        // Registration successful, redirect to login page
                        window.location.href = "/login";
                      } else {
                        // Registration failed, display error message
                        alert("Registration failed");
                      }
                    } catch (error) {
                      console.error("Error:", error);
                    }
                  } else {
                    console.error("Email or password input not found");
                  }
                }}
              >
                Sign up
              </Button>
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
              />
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        open={openForgotPasswordModal}
        onClose={handleCloseForgotPassword}
        aria-labelledby="forgot-password-modal"
        aria-describedby="forgot-password-form"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            boxShadow: 24,
          }}
        >
          <Typography
            variant="h5"
            id="forgot-password-modal"
            sx={{ marginBottom: 2 }}
          >
            Forgot Password
          </Typography>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              fullWidth
              label="Enter your email"
              variant="outlined"
              type="email"
              sx={{ marginBottom: 2 }}
              placeholder="example@example.com"
              id="email"
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#d4af6e",
                "&:hover": { backgroundColor: "#bb9559" },
              }}
              onClick={async () => {
                const email = document.querySelector("#email").value;
                try {
                  const response = await fetch("http://localhost:8000/api/users/email/" + email + "/password/", {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  const data = await response.json();
                  if (data.user_id) {
                    // Password reset email sent successfully
                    alert("Password reset email sent successfully");
                  } else {
                    // Password reset email failed
                    alert("Password reset email failed");
                  }
                } catch (error) {
                  console.error("Error:", error);
                }
              }}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Home;