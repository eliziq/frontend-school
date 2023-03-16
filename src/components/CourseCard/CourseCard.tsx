import { CoursePreview } from "../../store/courses/coursesTypes";
import {
  CourseCardContainer,
  RatingContainer,
  SkillsContainer,
} from "./CourseCardStyle";
import { memo, FC } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";

const dummy = require("../../assets/dummy.jpg");

type CourseCardProps = {
  course: CoursePreview;
};

const CourseCard: FC<CourseCardProps> = memo(({ course }) => {
  const navigate = useNavigate();

  return (
    <CourseCardContainer onClick={() => navigate(`${course.id}`)}>
      <img src={course.previewImageLink + "/cover.webp"} alt={course.title} />
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <RatingContainer>
        <p>Lessons: {course.lessonsCount}</p>
        <p>
          {course.rating} <FaStar />
        </p>
      </RatingContainer>
      <SkillsContainer>
        {course.meta.skills.map((s, i) => (
          <span key={i}>{s}</span>
        ))}
      </SkillsContainer>
    </CourseCardContainer>
  );
});

export default CourseCard;
