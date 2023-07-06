
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Estilo del componente de texto con animación de degradado
export  const GradientText = styled.span`
  background: linear-gradient(45deg, #08b2b2, #365583, #6610f2);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 4s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 120px;
  font-weight: 600;
  
`;