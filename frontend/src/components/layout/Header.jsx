import {
  NotificationsNone,
  DarkMode,
  Search,
} from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  InputBase,
  Avatar,
} from "@mui/material";

function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#000",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "#F3F4F6",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            mr: 2,
          }}
        >
          <Search />

          <InputBase
            placeholder="Search..."
            sx={{
              ml: 1,
            }}
          />
        </Box>

        <IconButton>
          <DarkMode />
        </IconButton>

        <IconButton>
          <NotificationsNone />
        </IconButton>

        <Avatar
          sx={{
            ml: 2,
          }}
        >
          P
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default Header;