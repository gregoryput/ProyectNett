import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LabelNav } from "./LabelNav";

export const ButtonNav = styled(NavLink)`
  outline: none;
  border: none;
  display: flex;
  border-radius: 12px;
  align-items: center;
  cursor: pointer;
  height: 40px;
  width: 90%;
  padding-left: 14px;
  margin: 10px 5px;
  background-color: #fff;
  font-weight: 400;
  color: #9c9c9c;
  overflow: hidden;
  text-decoration: none;

  &:hover {
    color: #1c3c6d;
    background-color: #e4e4e490;
  }

  &:hover ${LabelNav} {
    color: #1c3c6d;
  }
`;
