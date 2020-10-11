import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  margin-top: 40px;
  max-width: 380px;
  height: 280px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      height: 100%;
      width: 100%;
      padding-left: 35%;
      border-radius: 4px;
      border: 3px dashed #dddddd;
      background: #fff;
      color: #dddddd;

      div {
        align-self: center;
      }

      span {
        font-size: 16px;
        font-weight: bold;
      }
    }

    img {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      border: 3px dashed rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }

    .deliveryman-avatar {
    }
  }
`;
