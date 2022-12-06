import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "characters/getcharacters",
  async (page) => {
    const res = await axios(
      `https://www.breakingbadapi.com/api/characters?limit=12&offset=${
        page * 12
      }`
    );
    return res.data;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    status: "idle",
    page: 0,
    hasNextPage: true,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.status = "loading";
    },

    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.status = "succeeded";
      state.page += 1;
      if (action.payload.length < 12) {
        state.hasNextPage = false;
      }
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default charactersSlice.reducer;
