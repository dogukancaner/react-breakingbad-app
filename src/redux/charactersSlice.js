import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const char_limit = 12;
export const fetchCharacters = createAsyncThunk(
  "characters/getcharacters",
  async () => {
    const res = await axios(
      `https://www.breakingbadapi.com/api/characters?limit=${char_limit}`
    );
    return res.data;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.isLoading = true;
    },

    [fetchCharacters.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading.isLoading = false;
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = state.error.message;
    },
  },
});

export default charactersSlice.reducer;
