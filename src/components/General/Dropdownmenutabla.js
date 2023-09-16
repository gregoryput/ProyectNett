
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const DropdownContenttabla =styled.div`
display: ${props => (props.open ? 'block' : 'none')};
position: absolute;
top: 20px;
left: 35px;
background-color: #f9f9f9;
min-width: 110px;
box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
z-index: 100;
border-radius: 5px;
opacity: ${props => (props.open ? 1 : 0)};
transform-origin: top;
transform: ${props => (props.open ? 'translateY(0)' : 'translateY(-10px)')};
animation: ${slideIn} 0.2s ease-in-out;

display: ${props => (props.open ? 'block' : 'none')};

`;

