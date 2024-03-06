// Import reducers
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authReducer'
const rootReducer = combineReducers({
  // Add your reducers here
  auth: authSlice
});

export {rootReducer}