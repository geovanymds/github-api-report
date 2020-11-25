import React from "react";
import { HeaderContainer, Title } from "./styles";
import githubIcon from '../../assets/icons/github.svg';
import Icon from "../Icon"

function Header(props) {
  return (
    <>
      <HeaderContainer>
        <Icon src={githubIcon} alt="github" height="50px" width="50px"/>
        <Title>ad-hoc Git Report</Title>
      </HeaderContainer>
    </>
  );
}

export default Header;
