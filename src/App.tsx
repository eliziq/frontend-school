import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/Navigation/Navigation";
import Courses from "./routes/Courses/Courses";
import CourseOverview from "./routes/CourseOverview/CourseOverview";
import { useEffect } from "react";
import { fetchToken } from "./store/courses/coursesSlice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  return (
    <Routes>
      {/* <h1>Frontend school</h1> */}
      <Route path="/" element={<Navigation />}>
        <Route index={true} element={<Courses />} />
        <Route path=":id" element={<CourseOverview />} />
      </Route>
    </Routes>
  );
}

export default App;
