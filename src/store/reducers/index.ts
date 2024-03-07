// Import reducers
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authReducer'
import sidbarSlice from './sidebarReducer'
const rootReducer = combineReducers({
  // Add your reducers here
  auth: authSlice,
  sidebar: sidbarSlice
});

export {rootReducer}