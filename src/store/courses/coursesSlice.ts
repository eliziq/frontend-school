import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CoursePreview, Lesson, CourseDetails } from "./coursesTypes";

export enum StorageKeys {
  latestLessonTime = "latestLessonTime",
  latestLesson = "latestLesson",
  token = "token",
}

interface CoursesState {
  coursesList: CoursePreview[];
  currentCourse: {
    data: CourseDetails | null;
    progress: {
      latestLesson: Lesson | null;
      latestLessonTime: number | null;
    };
  };
}

const timeFromStorage = Number(
  localStorage.getItem(StorageKeys.latestLessonTime) || ""
);
const lessonFromStorage = JSON.parse(
  localStorage.getItem(StorageKeys.latestLesson) || ""
);

const initialState: CoursesState = {
  coursesList: [],
  currentCourse: {
    data: null,
    progress: {
      latestLesson: lessonFromStorage || null,
      latestLessonTime: timeFromStorage || null,
    },
  },
};

const getToken = (): string => {
  const token = localStorage.getItem(StorageKeys.token);
  let exp;

  if (!token) {
    return "";
  }

  try {
    exp = JSON.parse(atob(token.split(".")[1]))?.exp;
  } catch (e) {
    console.error(e);
    return "";
  }
  if (new Date() > new Date(exp * 1000)) {
    //token expired
    return "";
  }

  return "Bearer " + token;
};

export const fetchToken = createAsyncThunk("courses/fetchToken", async () => {
  if (!getToken()) {
    const response = await fetch(
      "https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions",
      {
        method: "GET",
      }
    );
    const data = await response.json();
    localStorage.setItem(StorageKeys.token, data.token);
    return data;
  }
});

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const token = getToken();
    const headers = new Headers();
    headers.append("Authorization", token);

    const response = await fetch(
      "https://api.wisey.app/api/v1/core/preview-courses",
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
    return data as any as Promise<{ courses: CoursePreview[] }>;
  }
);

export const fetchCourse = createAsyncThunk(
  "courses/fetchCourse",
  async (params: { id: string }) => {
    // asd
    const token = getToken();
    const headers = new Headers();
    headers.append("Authorization", token);

    const response = await fetch(
      `https://api.wisey.app/api/v1/core/preview-courses/${params.id}`,
      {
        method: "GET",
        headers,
      }
    );
    const data = await response.json();
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
    setLatestLesson: (state, action: PayloadAction<{ lesson: Lesson }>) => {
      state.currentCourse.progress.latestLesson = action.payload.lesson;
    },
    setLatestLessonTime: (state, action: PayloadAction<{ time: number }>) => {
      state.currentCourse.progress.latestLessonTime = action.payload.time;
    },
    resetProgress: (state) => {
      state.currentCourse.progress = {
        latestLesson: null,
        latestLessonTime: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<{ courses: CoursePreview[] }>) => {
          state.coursesList = action.payload.courses;
        }
      )
      .addCase(
        fetchCourse.fulfilled,
        (state, action: PayloadAction<CourseDetails>) => {
          state.currentCourse.data = action.payload;
        }
      );
  },
});
export const { setCourses, setLatestLesson, setLatestLessonTime, resetProgress } =
  coursesSlice.actions;
export const selectCourses = (state: RootState) => state.courses.coursesList;
export default coursesSlice.reducer;
