import { useEffect, useState } from "react"; // React hooks to manage state and lifecycle
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
} from "@mui/material"; // MUI components for UI elements like typography, grid, buttons, modal, etc.
import {
  Menu as MenuIcon,
  Dashboard,
  Notifications,
  Message,
} from "@mui/icons-material"; // Icons from MUI for the menu and other features
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Import Recharts components for creating a responsive area chart
import Head from "next/head";

const AdminDashboard = () => {
  // State to control the opening and closing of the drawer (sidebar menu)
  const [openDrawer, setOpenDrawer] = useState(false);

  // Snackbar state to control visibility and the message displayed in it
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Mock data for the chart - could be replaced by real API data
  const chartData = [
    { name: "Week 1", visitors: 4000, pageviews: 2400 },
    { name: "Week 2", visitors: 3000, pageviews: 1398 },
    { name: "Week 3", visitors: 2000, pageviews: 9800 },
    { name: "Week 4", visitors: 2780, pageviews: 3908 },
    { name: "Week 5", visitors: 1890, pageviews: 4800 },
    { name: "Week 6", visitors: 2390, pageviews: 3800 },
    { name: "Week 7", visitors: 3490, pageviews: 4300 },
  ];

  // Fetch data from API on component mount
  // Placeholder for adding API calls in useEffect to get real-time data

  // Handler for closing the snackbar
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

  return (
    <>
      <Head>POPP DashBoard</Head>

      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#fdf9ee" }}>
        {/* Top App Bar with a menu icon to trigger the drawer */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1201,
            bgcolor: "#ffffff", // Change this to the desired background color
            color: "#d4af8b", // Change the text/icon color
            p: 0.2, //padding 4 px
          }}>
          <Toolbar>
            {/* Menu Icon to open Drawer */}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              POPP DashBoard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Side drawer (menu) that opens from the left */}
        <Drawer
          anchor="left"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}>
          {/* Drawer content */}
          <Box sx={{ width: 250 }} role="presentation">
            <List>
              {/* Dashboard Menu Item */}
              <ListItem button>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              {/* Notifications Menu Item */}
              <ListItem button>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>

              {/* Messages Menu Item */}
              <ListItem button>
                <ListItemIcon>
                  <Message />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>

              {/* Add more menu items here if needed */}
            </List>
          </Box>
        </Drawer>

        {/* Main content area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,

            m: { sm: 0, md: 5 }, // Adjusts margin for responsive layout
            transition: "margin 0.3s", // Smooth transition for margin when drawer opens
          }}>
          {/* Dashboard Title */}
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Dashboard
          </Typography>

          {/* Summary Stats in Grid */}
          <Grid container spacing={3}>
            {/* Individual stat card*/}
            <StatCard title="Sweets" value={40} />
            <StatCard title="Stocks" value={60} />
            <StatCard title="Pageviews" value={1000} />
            <StatCard title="Visitors" value={999} />
          </Grid>

          {/* Line Chart to display visitors and pageviews over time */}
          <Typography variant="h5" sx={{ marginTop: 4, marginBottom: 2 }}>
            Visitors and Pageviews Over Time
          </Typography>
          {/* ResponsiveContainer makes the chart responsive */}
          <ResponsiveContainer
            width="100%"
            height={300}
            sx={{ bgcolor: "#ffffff" }}>
            <AreaChart data={chartData}>
              <defs>
                {/* Define gradients for smoother area fill */}
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF0000" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorPageviews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.9} />{" "}
                  {/* Darker Yellow */}
                  <stop
                    offset="95%"
                    stopColor="#FFA500"
                    stopOpacity={0.3}
                  />{" "}
                  {/* Orange-Yellow transition */}
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              {/* Enhanced Area for Visitors */}
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#FF0000"
                fill="url(#colorVisitors)" // Apply gradient
                strokeWidth={2} // Increase line thickness
                activeDot={{ r: 6 }} // Larger dot on hover
                dot={{ r: 3 }} // Small dot on each data point
                stackId="1"
              />

              {/* Enhanced Area for Pageviews */}
              <Area
                type="monotone"
                dataKey="pageviews"
                stroke="#FFD700" // Dark Yellow Stroke
                fill="url(#colorPageviews)" // Apply gradient
                strokeWidth={2}
                activeDot={{ r: 6 }}
                dot={{ r: 3 }}
                stackId="1"
              />
            </AreaChart>
          </ResponsiveContainer>

          {/* Snackbar for displaying messages like errors or success notifications */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}>
            <Alert
              onClose={handleSnackbarClose}
              severity="error"
              sx={{ width: "100%" }}>
              {snackbarMessage} {/* Displays the snackbar message */}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
