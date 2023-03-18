import styled from "styled-components";

export const VideoContainer = styled.div`
  flex: 2;
  position: relative;
  video {
    width: 100%;
  }
  CourseLessonsList {
    flex: 1;
  }
`;

export const CourseOverviewContainer = styled.div`
  display: flex;
`;

export const CourseLessonsListContainer = styled.div`
  flex: 1;
`;

export const LockOverlay = styled.div<{ show: boolean }>`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: #fff;
  opacity: 0.9;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  color: #787878;
  ${({ show }) => (show ? `display: flex` : `display: none`)}
`;
