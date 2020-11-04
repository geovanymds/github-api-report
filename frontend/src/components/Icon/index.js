import React from "react";
import { StyledIcon, IconContainer } from "./styles";

function Icon({ ...props }) {
  return (
    <>
      <IconContainer>
        <StyledIcon {...props} />
      </IconContainer>
    </>
  );
}

export default Icon;
