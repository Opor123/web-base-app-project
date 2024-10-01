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
        <Box>This is index page</Box>
        <Link href="/FinalProject">Main App (Final Project) </Link>
        <Link href="/dashboard">Dash Board</Link>
      </main>
    </>
  );
}

export default Home;
