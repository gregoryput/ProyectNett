import styled from 'styled-components';

export const DivRotate = styled.div`
  width: 15px;
  height: 15px;
  transition: transform 0.3s ease;
  transform: ${props => props.rotate ? "rotate(180deg)" : "rotate(0deg)"};
   
  
`;