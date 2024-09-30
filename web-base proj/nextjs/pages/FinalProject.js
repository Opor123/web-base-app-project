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
  Grid, // Added Grid import
} from "@mui/material";
import { useState, useEffect } from "react";

function Home() {
  const [showNewInterface, setShowNewInterface] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    // Start the animation after a delay of 1 second
    const timer = setTimeout(() => {
      setAnimate(true); // Trigger the animation
    }, 1000);

    // Switch to new interface after the animation is complete (another 0.5 seconds)
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
        }}>
        {!showNewInterface ? (
          <Box
            sx={{
              textAlign: "center",
              opacity: animate ? 0 : 1, // Start fading out after 1 second
              transform: animate ? "translateY(-50px)" : "translateY(0)", // Move up as it fades out
              transition:
                "opacity 0.5s ease-in-out, transform 0.5s ease-in-out", // Smooth transitions
            }}>
            <Typography
              variant="h4"
              sx={{ fontSize: "calc(100px + 2vw)", color: "#3d3d3d" }}>
              POPP
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: "24px", color: "#3d3d3d", marginTop: "20px" }}>
              FINAL PROJECT
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              opacity: 1,
              transform: "translateY(0)", // Ensure the new interface is in its final position
              transition:
                "opacity 0.5s ease-in-out, transform 0.5s ease-in-out", // Smooth transitions
            }}>
            <Typography
              variant="h4"
              sx={{
                fontSize: "calc(70px + 2vw)",
                color: "#3d3d3d",
                "&:hover": { cursor: "default" },
              }}>
              Welcome to{" "}
              <Typography
                variant="h4"
                sx={{
                  fontSize: "calc(70px + 2vw)",
                  color: "#b0dddc",
                  "&:hover": {
                    color: "purple", // Change color when hovering
                    cursor: "default",
                  },
                  transition: "color 0.4s ease-in-out",
                }}>
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
              }}>
              Explore more what you interest
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                color: "#3d3d3d",
                marginTop: "10px",
                "&:hover": { cursor: "default" },
              }}>
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
                }}>
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
        }}>
        <Box
          sx={{
            width: "90%",
            maxWidth: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            boxShadow: 24,
          }}>
          <Typography variant="h5" id="login-modal" sx={{ marginBottom: 2 }}>
            Log in
          </Typography>
          <form>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              sx={{ marginBottom: 2 }}
              placeholder="example@example.com"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              sx={{ marginBottom: 2 }}
              placeholder="Enter password"
            />
            <Grid container justifyContent="space-between" sx={{ marginBottom: 2 }}>
            <Grid item>
                <Link href="/register" underline="hover">
                  Register
                </Link>
              </Grid>
              <Grid item>
                <Link href="/forget" underline="hover">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ marginBottom: 3 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#d4af6e",
                "&:hover": { backgroundColor: "#bb9559" },
              }}>
              Log in
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Home;
