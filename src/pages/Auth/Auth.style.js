import styled from "styled-components";
import background from "../../assets/images/background.jpg";

export const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const SubContainer = styled.div`
  width: 25rem;
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  gap: 1rem;
  background-color: #fff;
  .sign-action {
    cursor: pointer;
  }
`;
