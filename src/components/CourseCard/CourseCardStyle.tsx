import styled from "styled-components";

export const CourseCardContainer = styled.div`
  width: 100%;
  img {
    height: 133px;
    object-fit: cover;
    width: 100%;
  }
  h1 {
    font-size: large;
    margin: 0;
  }
  p {
    margin: 0;
  }
`;

export const RatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  p {
    margin: 0;
  }
`;

export const SkillsContainer = styled.div`
  span {
    font-size: 11px;
    background: white;
    margin-right: 5px;
    color: grey;
    padding: 2px;
    border-radius: 6px;
    word-break: break-all;
  }
`;
