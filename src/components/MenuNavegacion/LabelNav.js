import styled,{keyframes} from 'styled-components';

export const slideRightAnimation = keyframes`
  from {
    display: none;
    transform: translateX(-12%);
    max-width:120px;
  
  }
  to {
    display: flex;
    transform: translateX(0);
    width:100%;

  }`;


export  const LabelNav= styled.span`
  font-weight: 400;
  font-size: 12px;
  color:#9c9c9c;
  border:none;
  background-color:transparent;
  margin : 0 15px;
  text-align: left;
  cursor: pointer;
  animation: ${slideRightAnimation} 0.3s ease-in-out;
  display: none;
  min-width:120px;
  

 
`