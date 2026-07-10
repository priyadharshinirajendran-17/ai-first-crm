import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useState } from "react";
import api from "../../../api/api";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

function InteractionForm() {
  
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());

  const [formData, setFormData] = useState({
    hcp_name: "",
    interaction_type: "Meeting",
    attendees: "",
    topics_discussed: "",
    materials_shared: "",
    samples_distributed: "",
    sentiment: "neutral",
    outcomes: "",
    follow_up_actions: "",
  });
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSave = async () => {
    try {
      const payload = {
        ...formData,
        date: date.format("YYYY-MM-DD"),
        time: time.format("HH:mm:ss"),
      };

      const res = await api.post("/interaction/", payload);

      alert("Interaction saved successfully!");

      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to save interaction.");
    }
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box>

      <Typography variant="h6" fontWeight={600}>
        Interaction Details
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={2}>

        {/* HCP Name */}

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="HCP Name"
            placeholder="Search or select HCP..."
          />
        </Grid>

        {/* Interaction Type */}

        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            select
            fullWidth
            label="Interaction Type"
            defaultValue="Meeting"
          >
            <MenuItem value="Meeting">Meeting</MenuItem>
            <MenuItem value="Call">Call</MenuItem>
            <MenuItem value="Virtual">Virtual</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </TextField>
        </Grid>

        {/* Date */}

        <Grid size={{ xs: 12, md: 6 }}>
          <DatePicker
          label="Date"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          slotProps={{
          textField: {
          fullWidth: true,
          },
    }}
  />
</Grid>

        {/* Time */}

        <Grid size={{ xs: 12, md: 6 }}>
          <TimePicker
          label="Time"
          value={time}
          onChange={(newValue) => setTime(newValue)}
          slotProps={{
          textField: {
            fullWidth: true,
          },
    }}
  />
</Grid>

        {/* Attendees */}

        <Grid size={12}>
          <TextField
            fullWidth
            label="Attendees"
            placeholder="Enter names or search..."
          />
        </Grid>

        {/* Topics Discussed */}

        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Topics Discussed"
            placeholder="Enter key discussion points..."
          />
        </Grid>

        {/* Voice Note */}

        <Grid size={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Summarize from Voice Note (Requires Consent)"
          />
        </Grid>

        {/* Materials Shared */}

        <Grid size={12}>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            gutterBottom
          >
            Materials Shared / Samples Distributed
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <TextField
                fullWidth
                size="small"
                label="Materials Shared"
                placeholder="No materials added"
              />

              <Button
                variant="outlined"
                sx={{
                  minWidth: 130,
                }}
              >
                Search/Add
              </Button>
            </Stack>
          </Paper>

          {/* Samples */}

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <TextField
                fullWidth
                size="small"
                label="Samples Distributed"
                placeholder="No samples added"
              />

              <Button
                variant="outlined"
                sx={{
                  minWidth: 130,
                }}
              >
                Add Sample
              </Button>
            </Stack>
          </Paper>

        </Grid>

        {/* Sentiment */}

        <Grid size={12}>

          <Typography
            variant="subtitle2"
            fontWeight={600}
            gutterBottom
          >
            Observed / Inferred HCP Sentiment
          </Typography>

          <RadioGroup row defaultValue="neutral">

            <FormControlLabel
              value="positive"
              control={<Radio />}
              label="Positive"
            />

            <FormControlLabel
              value="neutral"
              control={<Radio />}
              label="Neutral"
            />

            <FormControlLabel
              value="negative"
              control={<Radio />}
              label="Negative"
            />

          </RadioGroup>

        </Grid>

        {/* Outcomes */}

        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Outcomes"
            placeholder="Key outcomes or agreements..."
          />
        </Grid>

        {/* Follow-up */}

        <Grid size={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Follow-up Actions"
            placeholder="Enter next steps or tasks..."
          />
        </Grid>

        {/* AI Suggestions */}

        <Grid size={12}>

          <Typography
            variant="subtitle2"
            fontWeight={600}
            gutterBottom
          >
            AI Suggested Follow-ups
          </Typography>

          <Typography
            variant="caption"
            display="block"
            color="primary"
          >
            • Schedule follow-up meeting in 2 weeks
          </Typography>

          <Typography
            variant="caption"
            display="block"
            color="primary"
          >
            • Send educational material
          </Typography>

          <Typography
            variant="caption"
            display="block"
            color="primary"
          >
            • Add Dr. Sharma to advisory board invite list
          </Typography>

        </Grid>

        {/* Save */}

        <Grid size={12}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 1,
              py: 1.4,
              borderRadius: 2,
            }}
          >
            Save Interaction
          </Button>
        </Grid>

      </Grid>

    </Box>
     </LocalizationProvider>
  );
}

export default InteractionForm;