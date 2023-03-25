import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ticketreducer from "../features/tickets/ticketSlice";
import noteReducer from "../features/notes/noteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketreducer,
    notes: noteReducer,
  },
});

export default store;
