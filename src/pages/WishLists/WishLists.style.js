import styled from "styled-components";

export const AddContainer = styled.div`
  border: 5px dotted ${(props) => props.theme.main};
  padding: 1rem;
  height: 18rem;
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.2);
`;
