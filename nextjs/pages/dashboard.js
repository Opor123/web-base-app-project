import { useEffect, useState } from "react";
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
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  Notifications,
  Message,
} from "@mui/icons-material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Head from "next/head";

const AdminDashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // State for chart data and statistics
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState({
    sweets: 0,
    stocks: 0,
    pageviews: 0,
    visitors: 0,
    investment:0,
    progamming:0,
  });

  const [loading, setLoading] = useState(true); // Loading state

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        // Fetch statistics
        const responseStats = await fetch("/api/stats");
        if (!responseStats.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const statsData = await responseStats.json();
        setStats(statsData);

        // Fetch chart data
        const responseChart = await fetch("/api/chart-data");
        if (!responseChart.ok) {
          throw new Error("Failed to fetch chart data");
        }
        const chartData = await responseChart.json();
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbarMessage(error.message || "Error fetching data");
        setSnackbarOpen(true);
      } finally {
        setLoading(false); // Set loading to false when fetching ends
      }
    };

    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const StatCard = ({ title, value }) => (
    <Grid item xs={12} md={3}>
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#fff", boxShadow: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Grid>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>POPP Dashboard</title>
      </Head>

      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fdf9ee" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1201,
            bgcolor: "#ffffff",
            color: "#d4af8b",
            p: 0.2,
          }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              POPP Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}>
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            m: { sm: 0, md: 5 },
            transition: "margin 0.3s",
          }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Use fetched stats for stat cards */}
            <StatCard title="Sweets" value={stats.sweets} />
            <StatCard title="Stocks" value={stats.stocks} />
            <StatCard title="Investment" value={stats.investment} />
            <StatCard title="Programming" value={stats.progamming} />
            <StatCard title="Pageviews" value={stats.pageviews} />
            <StatCard title="Visitors" value={stats.visitors} />
          </Grid>

          <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
            Visitors and Pageviews Over Time
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#FFA500" stopOpacity={0.3} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#FF0000"
                fill="url(#colorVisitors)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                stroke="#FFD700"
                fill="url(#colorPageviews)"
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
                stackId="1"
              />
            </AreaChart>
          </ResponsiveContainer>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}>
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
