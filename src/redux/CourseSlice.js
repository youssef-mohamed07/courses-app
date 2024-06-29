import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchCoursesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess(state, action) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchCoursesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } = coursesSlice.actions;

export default coursesSlice.reducer;