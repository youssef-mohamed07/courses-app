import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './CourseSlice';

export default configureStore({
  reducer: {
    courses: coursesReducer,
  },
});