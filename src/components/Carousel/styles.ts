import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  height: 200px;
  overflow: hidden;

  div {
    height: 200px;

    background-color: blue;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        object-fit: contain;
        width: 120px;
        height: 120px;
      }
    }
  }
`;
