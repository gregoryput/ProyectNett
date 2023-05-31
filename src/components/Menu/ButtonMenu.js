import { styled } from "styled-components"
import { DivRotate } from "./DivRotate";




export  const ButtonMenu = styled.button`
  outline: none;
  border: none;
  display: flex;
  border-radius: 50px;
  align-items: center;
  float: right;
  cursor: pointer;
  padding: 0 0 0 20px;
  background-color: #F9F9F9;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #e0e0e0;
    
  }
  &:focus{
    ${DivRotate};
  }

`;