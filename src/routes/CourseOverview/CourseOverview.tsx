import { useEffect, FC, useState, useCallback } from "react";
import { useParams } from "react-router";
import {
  fetchCourse,
  setLatestLesson,
  setLatestLessonTime,
  StorageKeys,
} from "../../store/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import Hls from "hls.js";
import {
  CourseLessonsListContainer,
  CourseOverviewContainer,
  LockOverlay,
  VideoContainer,
} from "./CourseOverviewStyle";
import CourseLessonsList from "../../components/course-lessons-list/CourseLessonsList";
import { Lesson } from "../../store/courses/coursesTypes";
import { FaLock } from "react-icons/fa";

const CourseOverview = () => {
  const params = useParams();
  const id = params.id || "";
  // fetch course
  const dispatch = useAppDispatch();

  useEffect(() => {
    id && dispatch(fetchCourse({ id }));
  }, [dispatch, id]);

  const course = useAppSelector(
    (state: RootState) => state.courses.currentCourse.data
  );
  const lessonFromStore = useAppSelector(
    (state: RootState) => state.courses.currentCourse.progress.latestLesson
  );
  const lessonTimeFromStore =
    useAppSelector(
      (state: RootState) =>
        state.courses.currentCourse.progress.latestLessonTime,
      (a, b) => (a && Math.floor(a)) === (b && Math.floor(b))
    ) || 0;
  const latestLesson: Lesson | null =
    lessonFromStore || course?.lessons[0] || null;
  const [vPlayer, setvPlayer] = useState<HTMLVideoElement | null>();
  const [posterUrl, setPosterUrl] = useState<string>("");
  const [showLockOverlay, setShowLockOverlay] = useState<boolean>(false);

  const writeLatestLessonTime = useCallback(
    (time: number) => {
      dispatch(setLatestLessonTime({ time }));
      localStorage.setItem(StorageKeys.latestLessonTime, String(time));
    },
    [dispatch]
  );
  const writeLatestLessonToStore = useCallback(
    (lesson: Lesson | null) => {
      // don't set the same lesson
      if (lesson && lessonFromStore?.id !== lesson.id) {
        dispatch(setLatestLesson({ lesson }));

        localStorage.setItem(StorageKeys.latestLesson, JSON.stringify(lesson));
        // reset time on lesson change
        writeLatestLessonTime(0);
      }
    },
    [dispatch, lessonFromStore?.id, writeLatestLessonTime]
  );

  // on update
  useEffect(() => {
    const video = vPlayer;
    const hls = new Hls();
    const url = latestLesson?.link || "";

    if (video && url && latestLesson?.status !== "locked") {
      setShowLockOverlay(false);
      hls.loadSource(url);
      hls.attachMedia(video);
      video.controls = true;
      setPosterUrl(
        `${latestLesson?.previewImageLink}/lesson-${latestLesson?.order}.webp`
      );
      writeLatestLessonToStore(latestLesson);
    } else if (video && latestLesson?.status === "locked") {
      setShowLockOverlay(true);
      video.controls = false;
      video.pause();
    }
  }, [latestLesson, vPlayer, writeLatestLessonToStore]);

  useEffect(() => {
    const video = vPlayer;
    if (video) {
      video.currentTime = lessonTimeFromStore;
    }
  }, [lessonTimeFromStore, vPlayer]);

  // on unmount
  // useEffect(() => {
  //   return () => {
  //     // save lesson and progress
  //     writeLatestLessonToStore(latestLesson);
  //     writeLatestLessonTime(vPlayer?.currentTime || 0);
  //     console.log("CURRENT TIME ON UNMOUNT: ", vPlayer?.currentTime);
  //   };
  // }, [
  //   latestLesson,
  //   vPlayer?.currentTime,
  //   writeLatestLessonToStore,
  //   writeLatestLessonTime,
  // ]);
  // causes too many calls, think of better solution
  const getDurationReadble = (durationMins: number | undefined): string => {
    if (!durationMins) return "";
    const hours = Math.floor(durationMins / 60);
    const mins = durationMins % 60;
    return `${hours ? hours + "h." : ""} ${mins ? mins + "m." : ""}`;
  };

  return (
    <div>
      <h1>{course?.title}</h1>
      <CourseOverviewContainer>
        <VideoContainer>
          <LockOverlay show={showLockOverlay}>
            <FaLock />
          </LockOverlay>
          <video
            className="videoCanvas"
            poster={posterUrl}
            ref={(player) => setvPlayer(player)}
            autoPlay={false}
            onPause={() => writeLatestLessonTime(vPlayer!.currentTime)}
            muted={true} // required to autoplay on init
            // onTimeUpdate={(e) => console.log(e)}
          />
        </VideoContainer>
        <CourseLessonsListContainer>
          <CourseLessonsList
            activeLesson={latestLesson}
            lessons={course?.lessons || []}
            lessonClick={writeLatestLessonToStore}
          />
        </CourseLessonsListContainer>
      </CourseOverviewContainer>
      <p>About course: {course?.description}</p>
      <p>Duration: {getDurationReadble(course?.duration)}</p>
      <p>Launch date: {}</p>
    </div>
  );
};

export default CourseOverview;
