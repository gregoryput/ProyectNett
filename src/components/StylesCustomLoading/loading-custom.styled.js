import styled, { keyframes, css } from "styled-components";

// Estilos del Loading:
const StyledSpinContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const StyledSpinSubContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const blinkAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const SavingText = styled.span`
  margin-top: ${({ marginTop }) => marginTop || "10px"};
  animation: ${({ isSaving }) =>
    isSaving
      ? css`
          ${blinkAnimation} 1s infinite
        `
      : "none"};
`;

export { StyledSpinContainer, StyledSpinSubContainer, SavingText };
