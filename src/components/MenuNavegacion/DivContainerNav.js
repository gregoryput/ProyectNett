import { styled } from "styled-components";
import { LabelNav } from "./LabelNav";

export const DivContainerNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
  height: 100vh;
  background-color: #ffff;
  border: 1px solid #E4E4E4;
  transition: all 0.4s ease-in-out;
  
  &:hover {
    width:230px;
    
  }
  
  &:hover ${LabelNav} {
    display: block;

  }
`;


