import { CoursePreview } from "../../store/courses/coursesTypes";
import {
  CourseCardContainer,
  RatingContainer,
  SkillsContainer,
} from "./CourseCardStyle";
import { RootState } from "../../store/store";
import { memo, FC } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetProgress, StorageKeys } from "../../store/courses/coursesSlice";

type CourseCardProps = {
  course: CoursePreview;
};

const CourseCard: FC<CourseCardProps> = memo(({ course }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courseIdInStore = useAppSelector(
    (state: RootState) => state.courses.currentCourse.data
  )?.id;

  const navigateToCourse = () => {
    if (course.id !== courseIdInStore) {
      // reset values if changing course Todo: improve solution, subcribe to store changes
      localStorage.removeItem(StorageKeys.latestLessonTime);
      localStorage.removeItem(StorageKeys.latestLesson);
      dispatch(resetProgress());
    }
    navigate(`${course.id}`);
  };

  return (
    <CourseCardContainer onClick={() => navigateToCourse()}>
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
