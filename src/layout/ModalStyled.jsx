import { OutsideClick } from "outsideclick-react";
import styled, { keyframes } from "styled-components";
import { ButtonIcon } from "../components";
import { IoCloseSharp } from "react-icons/io5";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  z-index:100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const ModalStyled = ({ isOpen, onClose, children }) => {
  const handleCloseModal = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <OutsideClick onOutsideClick={() => onClose()}>
        <ModalContent>
          <ButtonIcon style={{ marginBottom: 10 }} onClick={handleCloseModal}>
            <IoCloseSharp size={20} />
          </ButtonIcon>
          {children}
        </ModalContent>
      </OutsideClick>
    </ModalWrapper>
  );
};

export default ModalStyled;
