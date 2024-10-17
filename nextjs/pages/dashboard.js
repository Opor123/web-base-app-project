import { useEffect, useState, useMemo, memo } from "react";
import {
  Box,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Snackbar,
  Alert,
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

const StatCard = memo(({ title, value }) => (
  <Grid item xs={12} md={3}>
    <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#fff", boxShadow: 1 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </Box>
  </Grid>
));

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Memoize chart data and stats to avoid unnecessary recalculations
  const memoizedChartData = useMemo(() => chartData, [chartData]);
  const memoizedStats = useMemo(() => stats, [stats]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, chartRes] = await Promise.all([
          fetch("/api/stats").then((res) => res.json()),
          fetch("/api/chart-data").then((res) => res.json()),
        ]);
        setStats(statsRes);
        setChartData(chartRes);
      } catch {
        setSnackbar({ open: true, message: "Error fetching data" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev); // Toggle drawer state
  };

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>POPP Dashboard</title>
      </Head>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fdf9ee" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: 1201, bgcolor: "#fff", color: "#d4af8b" }}>
          <Toolbar>
            <IconButton edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">POPP Dashboard</Typography>
          </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box sx={{ width: 250 }}>
            <List>
              {["Dashboard", "Notifications", "Messages"].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index === 0 ? (
                      <Dashboard />
                    ) : index === 1 ? (
                      <Notifications />
                    ) : (
                      <Message />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Dashboard
          </Typography>
          <Grid container spacing={3}>
            {[
              "Sweets",
              "Stocks",
              "Investment",
              "Programming",
              "Pageviews",
              "Visitors",
            ].map((title) => (
              <StatCard
                key={title}
                title={title}
                value={memoizedStats[title.toLowerCase()] || 0}
              />
            ))}
          </Grid>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Visitors and Pageviews Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={memoizedChartData}>
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
              />
              <Area
                type="monotone"
                dataKey="pageviews"
                stroke="#FFD700"
                fill="url(#colorPageviews)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}>
            <Alert
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              severity="error">
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

const LoadingScreen = memo(() => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
    <Typography variant="h6">Loading...</Typography>
  </Box>
));

export default AdminDashboard;
