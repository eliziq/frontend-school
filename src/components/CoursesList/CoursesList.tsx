import { FC } from "react";
import { CoursePreview } from "../../store/courses/coursesTypes";
import CourseCard from "../CourseCard/CourseCard";
import { CoursesListContainer } from "./CoursesListStyle";


type CoursesListProps = {
  currentItems: CoursePreview[];
}

const CoursesList: FC<CoursesListProps>  = ({currentItems}) => {

  return (
    <CoursesListContainer>
      {currentItems &&
        currentItems.map((course, index) => <CourseCard course={course} key={index} />)}
    </CoursesListContainer>
  );
};

export default CoursesList;
