import styled from "styled-components";
import colors from "../../styles/colors";

const inputStyles = `
padding: 10px 0px 5px 5px;
background: ${colors.white};
border: none;
border-bottom: 3px solid ${colors.grey};
&:focus {
  outline: none;
}
margin-bottom: 1rem;
border-radius: 3px;
`;

export const FormTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: ${colors.sky_blue};
  margin: 3rem auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem 1rem 2rem;
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label.attrs((props) => ({
  htmlFor: `${props.htmlFor}`,
}))`
  font-size: 16px;
  color: ${colors.sky_blue};
  font-weight: bold;
`;

export const FormInput = styled.input.attrs((props) => ({
  type: `${props.type && props.type}`,
  placeholder: `${!!props.placeholder && props.placeholder.toUpperCase()}`,
  id: `${props.id}`,
  value: `${props.value && props.value}`,
  onChange: props.onChange,
  required: `${props.required && props.required}`,
  list: `${props.list && props.list}`,
}))`
  ${inputStyles};
  width: ${props=>!!props.width ? props.width : "400px"};
`;

export const FormSelect = styled.select.attrs((props) => ({
  id: `${props.id}`,
  value: `${props.value && props.value}`,
  onChange: props.onChange,
}))`
  ${inputStyles};
  width: ${props=>!!props.width ? props.width : "400px"};
`;

export const FormOption = styled.option.attrs((props) => ({
  value: `${props.value&&props.value}`,
}))``;

export const DataList = styled.datalist.attrs((props) => ({
  id: `${props.id}`
}))``;
