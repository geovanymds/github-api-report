import styled from "styled-components";

export const IconContainer = styled.div`
  padding: 1rem;
`;

export const StyledIcon = styled.img.attrs((props) => ({
  src: `${props.src}`,
  alt: `${props.alt}`,
  width: `${props.width}`,
  height: `${props.height}`,
}))``;
