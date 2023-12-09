import React from "react";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { IActionsDAT, TFormType } from "../../interfaces";
import { DivTextIcon, SpanTitle } from "./dropdrown-actions-new.styled";
import { MdOutlinePerson } from "react-icons/md";
import { MdBusiness } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowLeft } from "react-icons/md";

interface IDropdownActionsNewProps {
  Actions: IActionsDAT[];
  selectedTypeForm: TFormType;
}

const DropdownActionsNew = ({
  Actions,
  selectedTypeForm,
}: IDropdownActionsNewProps) => {
  const [visibleOptions, setVisibleOptions] = React.useState(false);

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
    <Dropdown
      menu={{ items }}
      trigger={["hover"]}
      onOpenChange={() => setVisibleOptions((prevState) => !prevState)}
    >
      <Button
        style={{
          display: "flex",
          flexDirection: "row",
          background: "transparent",
          color: "white",
          fontWeight: "bold",
          alignItems: "center",
          paddingLeft: "0px",
          border: "none",
        }}
        onClick={(e) => e.preventDefault()}
      >
        {selectedTypeForm === "form-cp" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={() =>
              setVisibleOptions((prevState) =>
                prevState ? !prevState : prevState
              )
            }
          >
            <MdOutlinePerson color={"black"} />
            <span style={{ color: "black", marginLeft: "5px" }}>
              {" "}
              Persona física
            </span>
            {visibleOptions ? (
              <MdArrowDropDown color="black" />
            ) : (
              <MdArrowLeft color="black" />
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={() =>
              setVisibleOptions((prevState) =>
                prevState ? !prevState : prevState
              )
            }
          >
            <MdBusiness color={"black"} />
            <span style={{ color: "black", marginLeft: "5px" }}>Empresa</span>
            {visibleOptions ? (
              <MdArrowDropDown color="black" />
            ) : (
              <MdArrowLeft color="black" />
            )}
          </div>
        )}
      </Button>
    </Dropdown>
  );
};

export default DropdownActionsNew;
