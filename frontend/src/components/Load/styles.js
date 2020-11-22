import styled from "styled-components";
import colors from "../../styles/colors";

export const Button = styled.div.attrs((props) => ({
  onClick: props.onClick,
}))`
  padding: 1rem;
  background: ${colors.sky_blue};
  text-transform: uppercase;
  color: ${colors.dark_blue};
  border-radius: 5px;
  min-width: 100px;
  text-align: center;
  &:hover{
    cursor: pointer;
  }
`;
