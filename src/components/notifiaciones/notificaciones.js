import styled, { keyframes } from 'styled-components';

// Define la animación de entrada y salida del contenedor
const slideInAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const slideOutAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`;

// Estilo del componente del contenedor
export const NotificationContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 60px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ show }) => (show ? slideInAnimation : slideOutAnimation)} 0.5s forwards;
  animation-delay: 2s;
`;