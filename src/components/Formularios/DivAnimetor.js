

import styled, { keyframes } from 'styled-components';

const floatingAnimation = keyframes`
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(-2px);
  }
`;

export const DivAnimetor = styled.div`
  animation: ${floatingAnimation} 2s ;
  display:flex;
  justify-content:center;
  align-items:center;
`;
