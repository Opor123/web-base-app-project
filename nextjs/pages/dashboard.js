import Head from "next/head";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
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
        <Grid container spacing={2} sx={{ width: "80%" }}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Users
                </Typography>
                <Typography variant="h4" component="div">
                  100
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Posts
                </Typography>
                <Typography variant="h4" component="div">
                  500
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Comments
                </Typography>
                <Typography variant="h4" component="div">
                  1000
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">View Details</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;