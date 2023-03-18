import styled from "styled-components";

export const LessonsListContainer = styled.div`
  padding-left: 10px;
  h3 {
    margin-top: 0;
    padding-left: 10px;
  }
`;

export const ListItem = styled.div<{ active: boolean }>`
  padding: 15px;

  :hover {
    cursor: pointer;
    background-color: #eeeeee;
  }

  ${({ active }) =>
    active &&
    `
    color: #fff;
    background-color: #000;
    :hover {
    cursor: pointer;
    background-color: #000;
  }
    `}
`;
