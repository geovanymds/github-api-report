import styled from "styled-components";
import { animation } from "../../../styles/animations";

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  animation: ${animation} 0.5s forwards;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
