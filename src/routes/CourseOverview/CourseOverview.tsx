import { useEffect, FC } from "react";
import { useParams } from "react-router";
import { fetchCourse } from "../../store/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

type RouteParams = {
  slug: string;
};

const CourseOverview = () => {
  const params = useParams();
  const id = params.id || "";
  console.log(params);
  // fetch course
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourse({ id }));
  }, [dispatch]);

  const course = useAppSelector(
    (state: RootState) => state.courses.currentCourse
  );
  console.log(course);

  return (
    <div>
      <h1>Course Overview</h1>
    </div>
  );
};

export default CourseOverview;
