import { spawn } from "child_process";
import React, { FC } from "react";
import { Lesson } from "../../store/courses/coursesTypes";
import { LessonsListContainer, ListItem } from "./CourseLessonsListStyle";
import "./CourseLessonsListStyle.tsx";

interface CourseLessonsListProps {
  lessons: Lesson[];
  activeLesson: Lesson | null;
  lessonClick: (lesson: Lesson) => void;
}

const CourseLessonsList: FC<CourseLessonsListProps> = ({
  lessons,
  activeLesson,
  lessonClick,
}) => {
  const sortedLessons = lessons.slice().sort((a, b) => a.order - b.order);
  return (
    <LessonsListContainer>
      <h3>Lessons:</h3>
      {sortedLessons.map((l, i) => (
        <ListItem
          active={l.id === activeLesson?.id}
          key={i}
          onClick={() => lessonClick(l)}
        >
          {`${l.order}. ${l.title}`}
        </ListItem>
      ))}
    </LessonsListContainer>
  );
};

export default CourseLessonsList;
