import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

function AIChatPanel() {
  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        minHeight: 700,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #E5E7EB",
        borderRadius: 2,
      }}
    >
      {/* Header */}

      <Box p={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <SmartToyOutlinedIcon color="primary" />

          <Box>
            <Typography fontWeight={600}>
              AI Assistant
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Log interaction via chat
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      {/* Conversation */}

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: "#FAFAFA",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Log interaction details here.
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2 }}
          >
            Example:
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            "Met Dr. Smith,
            discussed Product X efficacy,
            positive sentiment,
            shared brochure."
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 2 }}
            color="text.secondary"
          >
            or ask for help.
          </Typography>
        </Paper>
      </Box>

      <Divider />

      {/* Bottom */}

      <Box p={2}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Describe interaction..."
          />

          <Button
            variant="contained"
            startIcon={<SendOutlinedIcon />}
          >
            Log
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default AIChatPanel;