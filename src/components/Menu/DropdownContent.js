import styled from 'styled-components';

export const DropdownContent = styled.div`
  display: ${(props) => (props.activo ? 'block' : 'none')};
  background-color:#F9F9F9;
  width: 200px;
  height:100px;
  position:absolute;
  top: 60px;
  box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius:12px;
`;
