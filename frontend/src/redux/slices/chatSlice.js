import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [
    {
      role: "assistant",
      content:
        "Hello! Describe your interaction with the HCP and I'll help structure it.",
    },
  ],
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    clearChat(state) {
      state.messages = [];
    },
  },
});

export const {
  addMessage,
  setLoading,
  clearChat,
} = chatSlice.actions;

export default chatSlice.reducer;