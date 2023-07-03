import styled from "styled-components";

export const ButtonTheme = styled.button`
  outline: none;
  border: none;
  display: flex;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;
  widht: 80px;
  height: 40px;
  padding: 20px;
  margin: 5px;
  background-color: transparent;
  font-weight: 700;
  font-size: 14px;
  color: #9c9c9c;

  &:hover {
    color: #1c3c6d;
  }
`;
