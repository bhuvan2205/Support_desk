import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import noteService from "./noteService";

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new note
export const createNote = createAsyncThunk(
  "note/create",
  async ({ noteText, ticketId }, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      console.log({ ticketId });
      return await noteService.createNote(noteText, ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data.message &&
          error.response.data) ||
        error.toString() ||
        error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

// Get all notes
export const getNotes = createAsyncThunk(
  "note/getAll",
  async (ticketId, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data.message &&
          error.response.data) ||
        error.toString() ||
        error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
