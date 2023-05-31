import styled, { keyframes } from 'styled-components';


const scaleAnimation = keyframes`
  0% {
    transform: scale(0);
   
  }
  100% {
    transform: scale(0.98);
  }
`;


export const DropdownContent = styled.div`
  display: ${(props) => (props.activo ? 'block' : 'none')};
  background-color:#F9F9F9;
  width: 290px;
  height:200px;
  position:absolute;
  top: 60px;
  right:50px;
  box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius:12px;
  
  transform: scale(0.90);
  transition: transfrom 0.3s ease-in;
  animation: ${scaleAnimation} 0.3s ;
  
`;
