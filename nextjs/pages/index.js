import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Grid from "@mui/material/Grid2";
import { Box, Typography, Button, TextField, Link } from "@mui/material"; // Use by LoginForm
import useBearStore from "@/store/useBearStore";

function Home() {
  return (
    <>

      <main>
        <Box sx={{color:"#90ac8a", margin:"20px"}}>This is index page</Box>
        <Grid container direction="column" spacing={2} sx={{margin:"20px"}}>
          <Grid item>
            <Button sx={{"&:hover":{backgroundColor:"#4d3d81"}}}>
              <Link href="/FinalProject" sx={{color:"#928aac",textDecoration:"none","&:hover":{color:"#a9eaed"}}}>Main App (Final Project)</Link>
            </Button>
          </Grid>
          <Grid item>
            <Button sx={{"&:hover":{backgroundColor:"#4d3d81"}}}>
              <Link href="/dashboard" sx={{color:"#928aac",textDecoration:"none","&:hover":{color:"#a9eaed"}}}>Dash Board</Link>
            </Button>
          </Grid>
        </Grid>
      </main>
    </>
  );
}

export default Home;
