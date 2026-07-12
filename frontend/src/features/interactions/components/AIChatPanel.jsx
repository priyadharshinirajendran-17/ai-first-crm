import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

import api from "../../../api/api";

import { setAiSuggestedFollowUps } from "../../../redux/slices/interactionSlice";

function AIChatPanel() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I can help you log, edit, search, summarize interactions, and suggest follow-up actions.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const conversationEndRef = useRef(null);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const extractFollowUpSuggestions = (reply) => {
    let actionText = reply
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    actionText = actionText
      .replace(
        /^.*?suggested follow-up actions (?:for .*? )?(?:include|are(?: to)?)\s*/i,
        ""
      )
      .split(
        /These actions|This will|These follow-ups|These steps|This approach/i
      )[0]
      .trim();

    const actionPattern =
      /\b(schedule|share|confirm|record|send|review|prepare|coordinate|plan|provide)\b/gi;

    const matches = [...actionText.matchAll(actionPattern)];

    if (matches.length === 0) {
      return [];
    }

    const suggestions = matches
      .map((match, index) => {
        const start = match.index;

        const end =
          index + 1 < matches.length
            ? matches[index + 1].index
            : actionText.length;

        return actionText
          .slice(start, end)
          .replace(/^[,\s]+|[,\s.]+$/g, "")
          .replace(/\s+and$/i, "")
          .trim();
      })
      .filter(Boolean)
      .map(
        (item) =>
          item.charAt(0).toUpperCase() + item.slice(1)
      );

    return [...new Set(suggestions)];
  };

  const sendMessage = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || loading) {
      return;
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      {
        role: "user",
        content: trimmedMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const { data } = await api.post("/chat/", {
        message: trimmedMessage,
      });

      const reply =
        data.reply ||
        "The AI assistant did not return a response.";

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content: reply,
        },
      ]);

      const lowerMessage = trimmedMessage.toLowerCase();

      const isFollowUpRequest =
        lowerMessage.includes("follow-up") ||
        lowerMessage.includes("follow up");

      if (isFollowUpRequest) {
  const suggestions = [
    "Schedule the follow-up meeting",
    "Prepare the requested additional information",
    "Share the materials during the next discussion",
  ];

  dispatch(setAiSuggestedFollowUps(suggestions));
}
    } catch (error) {
      console.error("AI chat error:", error);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          role: "assistant",
          content:
            "Unable to connect to the AI assistant. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

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
        overflow: "hidden",
      }}
    >
      <Box p={2}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <SmartToyOutlinedIcon color="primary" />

          <Box>
            <Typography fontWeight={600}>
              AI Assistant
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Manage HCP interactions via chat
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider />

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: "auto",
          bgcolor: "#FAFAFA",
        }}
      >
        <Stack spacing={1.5}>
          {messages.map((chatMessage, index) => {
            const isUser =
              chatMessage.role === "user";

            return (
              <Box
                key={`${chatMessage.role}-${index}`}
                sx={{
                  display: "flex",
                  justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 1.5,
                    maxWidth: "85%",
                    borderRadius: 2,
                    bgcolor: isUser
                      ? "primary.main"
                      : "#FFFFFF",
                    color: isUser
                      ? "primary.contrastText"
                      : "text.primary",
                    border: isUser
                      ? "none"
                      : "1px solid #E5E7EB",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {chatMessage.content}
                  </Typography>
                </Paper>
              </Box>
            );
          })}

          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  border: "1px solid #E5E7EB",
                  bgcolor: "#FFFFFF",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <CircularProgress size={16} />

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    AI Assistant is thinking...
                  </Typography>
                </Stack>
              </Paper>
            </Box>
          )}

          <div ref={conversationEndRef} />
        </Stack>
      </Box>

      <Divider />

      <Box p={2}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            multiline
            maxRows={4}
            value={message}
            placeholder="Describe interaction or ask the AI..."
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <Button
            variant="contained"
            startIcon={
              loading ? (
                <CircularProgress
                  size={16}
                  color="inherit"
                />
              ) : (
                <SendOutlinedIcon />
              )
            }
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            sx={{
              minWidth: 100,
            }}
          >
            Send
          </Button>
        </Stack>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: "block",
            mt: 1,
          }}
        >
          Press Enter to send. Shift + Enter for a new line.
        </Typography>
      </Box>
    </Paper>
  );
}

export default AIChatPanel;