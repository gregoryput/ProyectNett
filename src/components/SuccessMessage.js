import styled from 'styled-components';

const SuccessMessage = styled.div`
  display: inline-block;
  padding: 10px 20px;
  background-color: #52c41a;
  color: #fff;
  border-radius: 4px;
`;

const Message = ({ content }) => {
  return <SuccessMessage>{content}</SuccessMessage>
};

// Ejemplo de uso:
//showMessage('Autenticación correcta');

export default Message;