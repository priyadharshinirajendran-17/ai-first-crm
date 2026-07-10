import {
  Dashboard,
  Assignment,
  LocalHospital,
  Event,
  BarChart,
  Settings,
} from "@mui/icons-material";

import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const menuItems = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
  },
  {
    title: "Log Interaction",
    icon: <Assignment />,
  },
  {
    title: "Doctors",
    icon: <LocalHospital />,
  },
  {
    title: "Follow Ups",
    icon: <Event />,
  },
  {
    title: "Reports",
    icon: <BarChart />,
  },
  {
    title: "Settings",
    icon: <Settings />,
  },
];

function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#0F172A",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{
          mb: 4,
        }}
      >
        AI CRM
      </Typography>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            sx={{
              borderRadius: 2,
              mb: 1,
              "&:hover": {
                bgcolor: "#2563EB",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;