import { styled} from "styled-components";
import { LabelNav } from "./LabelNav";



export const DivContainerNav = styled.div`
  position: fixed;
  z-index:5;
  flex-direction: column;
  width: 80px;
  height: 100%;
  background-color: #ffff;
  border: 1px solid #E4E4E4;
  transition: all 0.3s ease-in-out;
  overflow:hidden;
  
  &:hover   {
    width:230px; 
  }

  &:hover ${LabelNav} {
    display:flex; 

  }
  
`;


