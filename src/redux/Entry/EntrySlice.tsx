import { Entry } from "@/types/EntryType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLastEntries = createAsyncThunk("entry/get-last-entries",async () => {
  const res = await axios.get("https://mern-sozluk-backend.onrender.com/entry/get-last-entries");
  return res.data;
})

export const fetchRandomEntry = createAsyncThunk("entry/get-random-entry",async () => {
  const res = await axios.get("https://mern-sozluk-backend.onrender.com/entry/get-random-entry");
  return res.data;
})

interface UserState {
  lastEntries: Entry[];
  lastEntriesStatus: string;
  randomEntry: Entry;
  randomEntryStatus: string;
}

const initialState: UserState = {
    lastEntries: [],
    lastEntriesStatus: "idle",
    randomEntry: {
      _id: "",
      createdAt: "",
      updatedAt: "",
      topic: {
        _id: "",
        title: "",
      },
      text: "",
      owner: {
        _id: "",
        username: "",
        avatar: undefined,
      },
      likes: [],
      dislikes: [],
      favorites: [],
      __V: 0,
    },
  randomEntryStatus: "idle",
};
const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLastEntries.fulfilled, (state, action) => {
        state.lastEntries = action.payload;
        state.lastEntriesStatus= "ready";
      }).addCase(fetchLastEntries.pending, (state, action) => {
        state.lastEntriesStatus= "pending";
      });
    builder
      .addCase(fetchRandomEntry.fulfilled, (state, action) => {
        state.randomEntry = action.payload;
        state.randomEntryStatus= "ready";
      }).addCase(fetchRandomEntry.pending, (state, action) => {
        state.randomEntryStatus= "pending";
      });
  },
});

export default entrySlice.reducer;
export const { } = entrySlice.actions;
