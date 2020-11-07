import styled from 'styled-components';
import colors from '../../../styles/colors';

export const Container = styled.div`
  display: flex;
  max-width: 400px;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
`; 

export const Attribute = styled.div.attrs((props)=>({
  onClick: props.onClick,
}))
`
  color: ${colors.black};
  border-radius: 3px;
  padding: 10px;
  background-color: ${props=>props.attrList.includes(props.attr)?colors.sky_blue:colors.grey};
  max-width: 150px;
  &:hover{
    cursor:pointer;
  }
`;