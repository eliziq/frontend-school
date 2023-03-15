import { CoursePreview } from "../../store/courses/coursesTypes";
import { CourseCardContainer, RatingContainer } from "./CourseCardStyle";
import { memo, FC } from "react";
const dummy = require("../../assets/dummy.jpg");

type CourseCardProps = {
  course: CoursePreview;
};

const CourseCard: FC<CourseCardProps> = memo(({ course }) => {
  return (
    <CourseCardContainer>
      <img src={course.previewImageLink + "/cover.webp"} alt={course.title} />
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <RatingContainer>
      <p>{course.lessonsCount}</p>
      <p>{course.rating}</p>
      </RatingContainer>
      <p>skills, skills, skills</p>
    </CourseCardContainer>
  );
});

export default CourseCard;
