import styled from "styled-components";

export const CardFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  padding: ${(props) => (props.p ? props.p : 0)};
  gap: ${(props) => (props.gap ? props.gap : "1rem")};
  flex-wrap: ${(props) => props.wrap};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  background-color: ${(props) => props.bgColor && props.theme.main};
  flex: ${(props) => props.flex};
  .title {
    font-size: 0.9rem;
    font-weight: 300;
  }
  .caption-sm {
    font-size: 1.2rem;
    font-weight: 650;
  }
`;

export const Card = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: ${(props) => (props.p ? props.p : 0)};
  box-sizing: border-box;
  border-radius: ${(props) => props.radius};
  box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.2);
  flex: ${(props) => props.flex};
  display: ${(props) => props.display};
  flex-wrap: ${(props) => props.wrap};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => props.direction};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "#fff")};
  background-image: url(${(props) => props.bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.content ? props.content : "space-between"};
  height: ${(props) => props.height};
  gap: 1rem;
  padding: ${(props) => (props.p ? props.p : 0)};
  flex-wrap: wrap;
  background-image: url(${(props) => props.bgImage});
  border-radius: ${(props) => props.radius};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
`;
