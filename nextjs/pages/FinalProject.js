import React, { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import Head from "next/head";

function Home() {
  const [showNewInterface, setShowNewInterface] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openForgotPasswordModal, setOpenForgotPasswordModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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
  const handleOpenForgotPassword = () => setOpenForgotPasswordModal(true);
  const handleCloseForgotPassword = () => setOpenForgotPasswordModal(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, password_hash: loginPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Handle successful login (e.g., redirect)
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setSnackbarMessage("Passwords do not match");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerName,
          email: registerEmail,
          password_hash: registerPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      const data = await response.json();
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Handle successful registration (e.g., redirect)
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/users/email/${forgotPasswordEmail}/password/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.user_id) {
        setSnackbarMessage("Password reset email sent successfully");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage("Password reset email failed");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      setSnackbarMessage("An error occurred");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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
          <Typography variant="h5" id="login-modal" sx={{ marginBottom: 2 }}>
            Log in
          </Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              sx={{ marginBottom: 2 }}
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: 2 }}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
                  Forgot password ?
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#d4af6e",
                  "&:hover": { backgroundColor: "#bb9559" },
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
          <form onSubmit={handleRegisterSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
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
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#d4af6e",
                  "&:hover": { backgroundColor: "#bb9559" },
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
          <Typography variant="h5" id="forgot-password-modal" sx={{ marginBottom: 2 }}>
            Forgot Password
          </Typography>
          <form onSubmit={handleForgotPasswordSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              sx={{ marginBottom: 2 }}
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
            />
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#d4af6e",
                  "&:hover": { backgroundColor: "#bb9559" },
                }}
              >
                Send Reset Email
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
} 

export default Home;