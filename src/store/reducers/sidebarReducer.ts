// reducers/authReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const sidbarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    handleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handleSidebar } = sidbarSlice.actions;
export default sidbarSlice.reducer;
