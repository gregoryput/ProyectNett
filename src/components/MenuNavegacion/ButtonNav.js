import { styled } from "styled-components";
import { LabelNav } from "./LabelNav";




export  const ButtonNav= styled.button`
  outline: none;
  border: none;
  display: flex;
  border-radius: 12px;
  align-items: center;
  cursor: pointer;
  height:40px;
  width:90%;
  padding-left: 14px ;
  margin: 10px 5px;
  background-color: #fff;
  font-weight: 400;
  color:#9c9c9c;
  overflow: hidden;

  
  &:hover {
    color:#1C3C6D;
    background-color: #E4E4E490;
    
  }
  
 
  
  &:hover ${LabelNav} {
    color:#1C3C6D;
  }
 
`