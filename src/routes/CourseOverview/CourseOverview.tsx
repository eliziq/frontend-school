import { useEffect, FC } from "react";
import { useParams } from "react-router";
import { fetchCourse } from "../../store/courses/coursesSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import Hls from "hls.js";
import { VideoPlayer } from "./CourseOverviewStyle";

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
    id && dispatch(fetchCourse({ id }));
  }, [dispatch, id]);

  const course = useAppSelector(
    (state: RootState) => state.courses.currentCourse
  );
  let vPlayer: HTMLMediaElement | null = null;
  console.log(course);

  useEffect(() => {
    const video = vPlayer;
    const hls = new Hls();
    const url = course?.lessons[0].link || "";

    if (video && url) {
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    }
  }, [course, vPlayer]);

  return (
    <div>
      <h1>Course Overview</h1>
      <VideoPlayer
        className="videoCanvas"
        ref={(player) => (vPlayer = player)}
        autoPlay={true}
        muted={true}
      />
    </div>
  );
};

export default CourseOverview;
