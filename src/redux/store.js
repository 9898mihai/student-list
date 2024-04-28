import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice.js';

export default configureStore({
  reducer: {
    students: studentReducer,
  },
});
