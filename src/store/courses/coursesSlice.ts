import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CoursePreview, Lesson, CourseDetails } from "./coursesTypes";
import { useAppDispatch } from "../hooks";

interface CoursesState {
  coursesList: CoursePreview[];
  currentCourse: CourseDetails | null;
}

const initialState: CoursesState = {
  coursesList: [],
  currentCourse: null,
};

export const fetchToken = createAsyncThunk(
  "courses/fetchToken",
  async (thunkApi) => {
    const response = await fetch(
      "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    sessionStorage.setItem("token", data.token);
    return data;
  }
);

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (thunkApi) => {
    const token = sessionStorage.getItem("token") || "";
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + token);

    const response = await fetch(
      "https://api.wisey.app/api/v1/core/preview-courses",
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    console.log(data);
    return data as any as Promise<{ courses: CoursePreview[] }>;
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (params: { id: string }) => {
    const token = sessionStorage.getItem("token") || "";
    const headers = new Headers();
    console.log(params)
    headers.append("Authorization", "Bearer " + token);

    const response = await fetch(
      `https://api.wisey.app/api/v1/core/preview-courses/${params.id}`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    console.log(data);
    return data as any as Promise<CourseDetails>;
  }
);

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<CoursePreview[]>) => {
      state.coursesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<{ courses: CoursePreview[] }>) => {
          console.log(action);

          state.coursesList = action.payload.courses;
        }
      )
      .addCase(
        fetchCourse.fulfilled,
        (state, action: PayloadAction<CourseDetails>) => {
          console.log(action);

          state.currentCourse = action.payload;
        }
      );
  },
});
export const { setCourses } = coursesSlice.actions;
export const selectCourses = (state: RootState) => state.courses.coursesList;
export default coursesSlice.reducer;
