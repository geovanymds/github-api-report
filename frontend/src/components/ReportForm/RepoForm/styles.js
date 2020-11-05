import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
`;

export const SubContainer = styled.div`
  display: flex;
  max-height: 50px;
`;

export const Languages = styled.div`
  background: ${colors.white};
  width: 150px;
  height: 200px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 0px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
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
