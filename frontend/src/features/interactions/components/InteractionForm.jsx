import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api/api";
import {
  saveInteraction,
  searchHcps,
  searchMaterials,
  searchSamples,
  clearSaveStatus,
} from "../../../redux/slices/interactionSlice";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Alert,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const INTERACTION_TYPES = ["Meeting", "Call", "Email", "Conference", "Sample Drop"];

const SpeechRecognitionAPI =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

function InteractionForm() {
  const dispatch = useDispatch();

  const hcpOptions = useSelector((s) => s.interaction.hcpOptions);
  const materialOptions = useSelector((s) => s.interaction.materialOptions);
  const sampleOptions = useSelector((s) => s.interaction.sampleOptions);
  const aiSuggestedFollowUps = useSelector((s) => s.interaction.aiSuggestedFollowUps);
  const saveStatus = useSelector((s) => s.interaction.saveStatus);

  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());

  const [formData, setFormData] = useState({
    hcp_name: "",
    interaction_type: "Meeting",
    attendees: [],
    topics_discussed: "",
    outcomes: "",
    follow_up_actions: [],
    sentiment: "neutral",
  });

  const [materialsShared, setMaterialsShared] = useState([]);
  const [samplesDistributed, setSamplesDistributed] = useState([]);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [followUpInput, setFollowUpInput] = useState("");

  const [voiceConsent, setVoiceConsent] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const recognitionRef = useRef(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleHcpInputChange = (_e, value) => {
    setFormData((prev) => ({ ...prev, hcp_name: value }));
    if (value && value.length > 1) {
      dispatch(searchHcps(value));
    }
  };

  const handleMaterialSearch = (_e, value) => {
    if (value && value.length > 0) {
      dispatch(searchMaterials(value));
    }
  };

  const handleSampleSearch = (_e, value) => {
    if (value && value.length > 0) {
      dispatch(searchSamples(value));
    }
  };

  const addAttendee = () => {
    const name = attendeeInput.trim();
    if (name && !formData.attendees.includes(name)) {
      setFormData((prev) => ({ ...prev, attendees: [...prev.attendees, name] }));
    }
    setAttendeeInput("");
  };

  const removeAttendee = (name) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((a) => a !== name),
    }));
  };

  const addFollowUp = (text) => {
    const value = (text ?? followUpInput).trim();
    if (value && !formData.follow_up_actions.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        follow_up_actions: [...prev.follow_up_actions, value],
      }));
    }
    if (text === undefined) setFollowUpInput("");
  };

  const removeFollowUp = (text) => {
    setFormData((prev) => ({
      ...prev,
      follow_up_actions: prev.follow_up_actions.filter((f) => f !== text),
    }));
  };

  const startRecording = () => {
    if (!voiceConsent) {
      setVoiceError("Please provide consent before recording a voice note.");
      return;
    }
    if (!SpeechRecognitionAPI) {
      setVoiceError("Voice capture isn't supported in this browser. Try Chrome or Edge.");
      return;
    }
    setVoiceError("");
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    let transcript = "";
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
      }
    };
    recognition.onerror = (event) => {
      setVoiceError(`Voice capture error: ${event.error}`);
      setIsRecording(false);
    };
    recognition.onend = async () => {
      setIsRecording(false);
      if (transcript.trim()) {
        await summarizeVoiceNote(transcript.trim());
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
  };

  const summarizeVoiceNote = async (transcript) => {
    setIsSummarizing(true);
    try {
      const { data } = await api.post("/chat", {
        session_id: `voice-note-${Date.now()}`,
        message:
          "Summarize this voice note into concise key discussion points for the Topics Discussed field. Do not log an interaction, just summarize.",
        voice_transcript: transcript,
      });
      setFormData((prev) => ({
        ...prev,
        topics_discussed: prev.topics_discussed
          ? `${prev.topics_discussed}\n${data.reply}`
          : data.reply,
      }));
      setSnackbar({ open: true, message: "Voice note summarized into Topics Discussed.", severity: "success" });
    } catch (err) {
      setVoiceError("Unable to summarize voice note. Please try again or type manually.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSave = async () => {
    const payload = {
      hcp_name: formData.hcp_name || undefined,
      interaction_type: formData.interaction_type,
      interaction_datetime: dayjs(
        `${date.format("YYYY-MM-DD")} ${time.format("HH:mm:ss")}`,
        "YYYY-MM-DD HH:mm:ss"
      ).toISOString(),
      attendees: formData.attendees,
      topics_discussed: formData.topics_discussed,
      materials_shared: materialsShared.map((m) => (typeof m === "string" ? m : m.name)),
      samples_distributed: samplesDistributed.map((s) => (typeof s === "string" ? s : s.name)),
      sentiment: formData.sentiment,
      outcomes: formData.outcomes,
      follow_up_actions: formData.follow_up_actions,
      created_via: "form",
    };

    const result = await dispatch(saveInteraction(payload));
    if (saveInteraction.fulfilled.match(result)) {
      setSnackbar({ open: true, message: "Interaction saved successfully!", severity: "success" });
    } else {
      setSnackbar({
        open: true,
        message: result.payload || "Unable to save interaction",
        severity: "error",
      });
    }
  };

  const hcpNameOptions = useMemo(() => hcpOptions.map((h) => h.name), [hcpOptions]);

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
            <Autocomplete
              freeSolo
              fullWidth
              options={hcpNameOptions}
              inputValue={formData.hcp_name}
              onInputChange={handleHcpInputChange}
              renderInput={(params) => (
                <TextField {...params} label="HCP Name" placeholder="Search or select HCP..." />
              )}
            />
          </Grid>

          {/* Interaction Type */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              fullWidth
              name="interaction_type"
              value={formData.interaction_type}
              onChange={handleChange}
              label="Interaction Type"
            >
              {INTERACTION_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Date */}
          <Grid size={{ xs: 12, md: 6 }}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newValue) => newValue && setDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {/* Time */}
          <Grid size={{ xs: 12, md: 6 }}>
            <TimePicker
              label="Time"
              value={time}
              onChange={(newValue) => newValue && setTime(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>

          {/* Attendees */}
          <Grid size={12}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <TextField
                fullWidth
                label="Attendees"
                placeholder="Enter names or search..."
                value={attendeeInput}
                onChange={(e) => setAttendeeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAttendee();
                  }
                }}
              />
              <Button variant="outlined" sx={{ minWidth: 110, height: 56 }} onClick={addAttendee}>
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", rowGap: 1 }}>
              {formData.attendees.map((name) => (
                <Chip key={name} label={name} onDelete={() => removeAttendee(name)} />
              ))}
            </Stack>
          </Grid>

          {/* Topics Discussed */}
          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              name="topics_discussed"
              value={formData.topics_discussed}
              onChange={handleChange}
              label="Topics Discussed"
              placeholder="Enter key discussion points..."
            />
          </Grid>

          {/* Voice Note */}
          <Grid size={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={voiceConsent}
                  onChange={(e) => setVoiceConsent(e.target.checked)}
                />
              }
              label="I consent to recording a voice note for AI summarization"
            />
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                color={isRecording ? "error" : "primary"}
                startIcon={
                  isSummarizing ? (
                    <CircularProgress size={16} />
                  ) : isRecording ? (
                    <StopCircleIcon />
                  ) : (
                    <MicIcon />
                  )
                }
                disabled={!voiceConsent || isSummarizing}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {isSummarizing
                  ? "Summarizing..."
                  : isRecording
                  ? "Stop & Summarize"
                  : "Summarize from Voice Note (Requires Consent)"}
              </Button>
            </Stack>
            {voiceError && (
              <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5 }}>
                {voiceError}
              </Typography>
            )}
          </Grid>

          {/* Materials Shared / Samples Distributed */}
          <Grid size={12}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Materials Shared / Samples Distributed
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 2 }}>
              <Autocomplete
                multiple
                freeSolo
                options={materialOptions}
                getOptionLabel={(opt) => (typeof opt === "string" ? opt : opt.name)}
                value={materialsShared}
                onChange={(_e, value) => setMaterialsShared(value)}
                onInputChange={handleMaterialSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Materials Shared"
                    placeholder={materialsShared.length ? "" : "No materials added"}
                  />
                )}
              />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
              <Autocomplete
                multiple
                freeSolo
                options={sampleOptions}
                getOptionLabel={(opt) => (typeof opt === "string" ? opt : opt.name)}
                value={samplesDistributed}
                onChange={(_e, value) => setSamplesDistributed(value)}
                onInputChange={handleSampleSearch}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    label="Samples Distributed"
                    placeholder={samplesDistributed.length ? "" : "No samples added"}
                  />
                )}
              />
            </Paper>
          </Grid>

          {/* Sentiment */}
          <Grid size={12}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Observed / Inferred HCP Sentiment
            </Typography>

            <RadioGroup
              row
              value={formData.sentiment}
              onChange={(e) => setFormData((prev) => ({ ...prev, sentiment: e.target.value }))}
            >
              <FormControlLabel value="positive" control={<Radio />} label="Positive" />
              <FormControlLabel value="neutral" control={<Radio />} label="Neutral" />
              <FormControlLabel value="negative" control={<Radio />} label="Negative" />
            </RadioGroup>
          </Grid>

          {/* Outcomes */}
          <Grid size={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              name="outcomes"
              value={formData.outcomes}
              onChange={handleChange}
              label="Outcomes"
              placeholder="Key outcomes or agreements..."
            />
          </Grid>

          {/* Follow-up Actions */}
          <Grid size={12}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Follow-up Actions"
                placeholder="Enter next steps or tasks..."
                value={followUpInput}
                onChange={(e) => setFollowUpInput(e.target.value)}
              />
              <Button
                variant="outlined"
                sx={{ minWidth: 110, height: 56 }}
                onClick={() => addFollowUp()}
              >
                Add
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap", rowGap: 1 }}>
              {formData.follow_up_actions.map((f) => (
                <Chip key={f} label={f} onDelete={() => removeFollowUp(f)} />
              ))}
            </Stack>
          </Grid>

          {/* AI Suggestions (populated by the Chat Assistant panel via Redux) */}
          {aiSuggestedFollowUps.length > 0 && (
            <Grid size={12}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                <AutoAwesomeIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
                AI Suggested Follow-ups
              </Typography>
              <Stack spacing={0.5}>
                {aiSuggestedFollowUps.map((suggestion) => (
                  <Typography
                    key={suggestion}
                    variant="caption"
                    display="block"
                    color="primary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => addFollowUp(suggestion)}
                  >
                    • {suggestion} (click to add)
                  </Typography>
                ))}
              </Stack>
            </Grid>
          )}

          {/* Save */}
          <Grid size={12}>
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ mt: 1, py: 1.4, borderRadius: 2 }}
              disabled={saveStatus === "loading"}
              onClick={handleSave}
            >
              {saveStatus === "loading" ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Save Interaction"
              )}
            </Button>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => {
            setSnackbar((prev) => ({ ...prev, open: false }));
            dispatch(clearSaveStatus());
          }}
        >
          <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
}

export default InteractionForm;