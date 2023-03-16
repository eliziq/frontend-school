import React, { FC, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchToken, fetchCourses } from "../../store/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import CoursesList from "../CoursesList/CoursesList";
import { PaginatedCoursesContainer } from "./PaginatedCoursesStyle";
import { ReactComponent as ArrowLeft } from "../../assets/arrowLeft.svg";

type PaginatedCoursesProps = {
  itemsPerPage: number;
};

const PaginatedCourses: FC<PaginatedCoursesProps> = ({ itemsPerPage }) => {
  // fetch courses
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchToken());
    dispatch(fetchCourses());
  }, [dispatch]);

  const coursesList = useAppSelector(
    (state: RootState) => state.courses.coursesList
  );
  console.log(coursesList);

  const [pageStart, setPageStart] = useState(0);

  const pageEnd = pageStart + itemsPerPage;

  const currentItems = coursesList.slice(pageStart, pageEnd);
  const pageCount = Math.ceil(coursesList.length / itemsPerPage);

  // Invoke when user clicks to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newPageStart = (event.selected * itemsPerPage) % coursesList.length;
    setPageStart(newPageStart);
  };

  return (
    <>
      <CoursesList currentItems={currentItems} />
      <PaginatedCoursesContainer
        pageCount={pageCount}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        nextLabel="next >"
        previousLabel="< previous"
      />
    </>
  );
};

export default PaginatedCourses;
