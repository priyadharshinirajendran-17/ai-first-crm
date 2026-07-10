import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/* ===========================
   Async Thunks
=========================== */

export const fetchInteractions = createAsyncThunk(
  "interaction/fetchInteractions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/interaction/");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch interactions"
      );
    }
  }
);

export const saveInteraction = createAsyncThunk(
  "interaction/saveInteraction",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/interaction/", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to save interaction"
      );
    }
  }
);

export const updateInteraction = createAsyncThunk(
  "interaction/updateInteraction",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/interaction/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to update interaction"
      );
    }
  }
);

export const deleteInteraction = createAsyncThunk(
  "interaction/deleteInteraction",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/interaction/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to delete interaction"
      );
    }
  }
);

export const searchHcps = createAsyncThunk(
  "interaction/searchHcps",
  async (query = "", { rejectWithValue }) => {
    try {
      const res = await api.get(`/interaction/hcps?q=${query}`);
      return res.data;
    } catch (err) {
      return rejectWithValue("Unable to load HCP list");
    }
  }
);

export const searchMaterials = createAsyncThunk(
  "interaction/searchMaterials",
  async (query = "", { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/interaction/lookup/materials?q=${query}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Unable to load materials");
    }
  }
);

export const searchSamples = createAsyncThunk(
  "interaction/searchSamples",
  async (query = "", { rejectWithValue }) => {
    try {
      const res = await api.get(
        `/interaction/lookup/samples?q=${query}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Unable to load samples");
    }
  }
);

/* ===========================
   Initial State
=========================== */

const initialState = {
  interactions: [],

  hcpOptions: [],
  materialOptions: [],
  sampleOptions: [],

  aiSuggestedFollowUps: [],

  loading: false,
  saveLoading: false,

  saveSuccess: false,
  error: null,
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {
    clearSaveStatus(state) {
      state.saveSuccess = false;
      state.error = null;
    },

    setAiSuggestedFollowUps(state, action) {
      state.aiSuggestedFollowUps = action.payload;
    },

    addAiSuggestedFollowUp(state, action) {
      if (!state.aiSuggestedFollowUps.includes(action.payload)) {
        state.aiSuggestedFollowUps.push(action.payload);
      }
    },
  },

  extraReducers: (builder) => {
    builder

      /* ---------------- Fetch ---------------- */

      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.interactions = action.payload;
      })

      .addCase(fetchInteractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------------- Save ---------------- */

      .addCase(saveInteraction.pending, (state) => {
        state.saveLoading = true;
        state.saveSuccess = false;
      })

      .addCase(saveInteraction.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.saveSuccess = true;

        state.interactions.unshift(action.payload);
      })

      .addCase(saveInteraction.rejected, (state, action) => {
        state.saveLoading = false;
        state.error = action.payload;
      })

      /* ---------------- Update ---------------- */

      .addCase(updateInteraction.fulfilled, (state, action) => {
        const index = state.interactions.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.interactions[index] = action.payload;
        }
      })

      /* ---------------- Delete ---------------- */

      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.interactions = state.interactions.filter(
          (item) => item.id !== action.payload
        );
      })

      /* ---------------- Lookups ---------------- */

      .addCase(searchHcps.fulfilled, (state, action) => {
        state.hcpOptions = action.payload;
      })

      .addCase(searchMaterials.fulfilled, (state, action) => {
        state.materialOptions = action.payload;
      })

      .addCase(searchSamples.fulfilled, (state, action) => {
        state.sampleOptions = action.payload;
      });
  },
});

export const {
  clearSaveStatus,
  setAiSuggestedFollowUps,
  addAiSuggestedFollowUp,
} = interactionSlice.actions;

export default interactionSlice.reducer;