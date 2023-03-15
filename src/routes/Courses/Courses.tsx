import { CoursesContainer } from "./CoursesStyle";
import CoursesList from "../../components/CoursesList/CoursesList";
import PaginatedCourses from "../../components/PaginatedCourses/PaginatedCourses";

const Courses = () => {
    return (
        <CoursesContainer>
            <h1>Courses page</h1>
            <PaginatedCourses itemsPerPage={10}/>
        </CoursesContainer>
    );
};

export default Courses;