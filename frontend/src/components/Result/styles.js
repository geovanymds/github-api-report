import styled from "styled-components";
import colors from "../../styles/colors";

export const Title = styled.h2`
  font-size:28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  color: ${colors.sky_blue}; 
`;

export const Container = styled.div`
  overflow-x: auto;
  margin-bottom: 1rem;
`;

export const Table = styled.table.attrs((props) => ({
  cellpadding: props.cellpadding,
  cellspacing: props.cellspacing,
  border: props.border,
}))`
  text-align: left;
  overflow: hidden;
  width: 100%;
  display: table;
  table-layout: fixed;
`;

export const TLabel = styled.h1`
  overflow: hidden;
  font-weight: bold;
  font-size: 0.8rem;
  text-align: left;
  color: ${colors.sky_blue};
`;

export const Td = styled.td`
  word-wrap: break-word;
  width: 5rem;
  font-weight: normal;
  font-size: 0.8rem;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  vertical-align: middle;
  &:first-child {
    color: #fb667a;
  }
`;

export const Tbody = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;
  height: 300px;
  overflow-x: auto;
  margin-top: 0px;
  &::-webkit-scrollbar {
    display: none;
    width: none;
  }
`;

export const Thead = styled.thead`
  overflow: hidden;
  margin: 1rem;
`;

export const Tr = styled.tr`
  &:nth-child(odd) {
    background-color: #323c50;
  }
  &:nth-child(even) {
    background-color: #2c3446;
  }
  &:hover {
    background-color: #464a52;
  }
`;

export const Th = styled.th`
  overflow: hidden;
  width: 5rem;
  background-color: #1f2739;
  font-weight: normal;
  font-size: 0.8rem;
  -webkit-box-shadow: 0 2px 2px -2px #0e1119;
  -moz-box-shadow: 0 2px 2px -2px #0e1119;
  box-shadow: 0 2px 2px -2px #0e1119;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 5rem;
  margin: 0 auto;
  margin-bottom: 1rem;
`;
