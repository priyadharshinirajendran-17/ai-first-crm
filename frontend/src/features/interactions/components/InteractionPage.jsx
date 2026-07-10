import { Box, Grid, Typography } from "@mui/material";

import InteractionForm from "./InteractionForm";
import AIChatPanel from "./AIChatPanel";

function InteractionPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
        p: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
      >
        Log HCP Interaction
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ mt: 2 }}
      >
        <Grid size={{ xs: 12, md: 8 }}>
          <InteractionForm />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AIChatPanel />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InteractionPage;