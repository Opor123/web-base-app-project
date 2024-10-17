import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "#f0f0f5", padding: "20px", marginTop: "40px" }}>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>Contact</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box className="name" sx={{ fontWeight: "bold" }}>
            <Typography className="child" variant="body2">Punboon</Typography>
            <Typography className="child" variant="body2">Tang</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box className="name" sx={{ fontWeight: "bold" }}>
            <Typography className="child" variant="body2">PP</Typography>
            <Typography className="child" variant="body2">Opor</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
