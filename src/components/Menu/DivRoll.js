import styled, { keyframes } from 'styled-components';

// Definir la animación del movimiento hacia la izquierda
const change = keyframes`
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
`;

export const DivRoll = styled.div`
background-color: #365583;
border-radius: 20px;
color:#fff;
margin-right: 30px ;
padding: 8px 15px;
cursor: default;
 background:linear-gradient(-45deg, #143d7e -0.52%, #08b2b2 100.83%);
 background-size: 400% 200%;
 animation:${change} 4s ease-in-out infinite;
`
