import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hcpName: "",
  interactionType: "Meeting",
  date: "",
  time: "",
  attendees: "",
  topicsDiscussed: "",
  voiceSummary: false,
  materialsShared: [],
  samplesDistributed: [],
  sentiment: "neutral",
  outcomes: "",
  followUpActions: "",
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },

    resetInteraction() {
      return initialState;
    },
  },
});

export const { updateField, resetInteraction } =
  interactionSlice.actions;

export default interactionSlice.reducer;