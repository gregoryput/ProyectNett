import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { IActionsDAT } from "../../interfaces";
import { DivTextIcon, SpanTitle } from "./dropdown-actions-lists.styled";
import { IoMdMore } from "react-icons/io";

interface IDropdownActionsListsProps {
  Actions: IActionsDAT[];
  setOrdenId?: () => void;
}

const DropdownActionsLists = ({
  Actions,
  setOrdenId,
}: IDropdownActionsListsProps) => {
  const items: MenuProps["items"] = Actions.map((ac, index) => {
    return {
      key: `${ac.Name} ${index}`,
      label: (
        <DivTextIcon onClick={() => ac.Method()}>
          {ac.Icon}
          <SpanTitle>{ac.Title}</SpanTitle>
        </DivTextIcon>
      ),
    };
  });

  return (
    <Dropdown menu={{ items }} trigger={["hover"]}>
      <a onClick={() => (setOrdenId ? setOrdenId() : null)}>
        <IoMdMore color="#25375B" size={30} style={{ cursor: "pointer" }} />
      </a>
    </Dropdown>
  );
};

export default DropdownActionsLists;
