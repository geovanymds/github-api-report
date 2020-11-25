import styled from "styled-components";
import colors from "../../styles/colors"

export const HeaderContainer = styled.div`
  display: flex;
  background-color: ${colors.grey};
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 22px;
  text-transform: uppercase;
  color: ${colors.sky_blue};
  padding: 10px;
`;
