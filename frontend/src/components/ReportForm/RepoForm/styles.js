import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

export const SubContainer = styled.div`
  display: flex;
  max-height: 50px;
  max-width: 250px;
  flex-wrap: wrap;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`

export const BoxList = styled.div`
  background: ${colors.white};
  width: 150px;
  height: ${props=>!!props.height ? props.height : "250px"};
  overflow-y: auto;
  border-radius: 3px;
`;

export const List = styled.ul.attrs((props) => ({}))`
  color: ${colors.black};
  text-align: center;
`;

export const ListItem = styled.li.attrs((props) => ({
  key: `${props.key}`,
  onClick: props.onClick,
}))`
  padding: 0.5rem;
  border-bottom: 3px solid ${colors.grey};
  &:hover{
    cursor: pointer;
  }
`;

export const Button = styled.div.attrs((props) => ({
  onClick: props.onClick,
}))`
  padding: 0 10px 10px 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const ImgButton = styled.img.attrs((props) => ({
  src: `${props.src}`,
  alt: `${props.alt}`,
  height: `${props.height}`,
  width: `${props.width}`,
}))``;
