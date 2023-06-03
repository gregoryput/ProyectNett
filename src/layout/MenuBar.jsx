import { useState } from "react";
import { OutsideClick } from "outsideclick-react";
import {
  IoMoonOutline, IoChevronDownSharp, IoCalendarNumberOutline, IoSunnyOutline, IoExitOutline,IoPersonCircleOutline
} from "react-icons/io5";

import {
  Avatar,
  ButtonMenu,
  ButtonOption,
  ButtonTheme,
  DivButtonSesion,
  DivNav,
  DivRotate,
  DropdownContent,
} from "../components";

import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const [activo, setActivo] = useState(false);

 const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (

    <>
      <DivNav>
        <IoCalendarNumberOutline
          style={{
            width: 30,
            height: 30,
            marginRight: 50,
            color: "#C3C3C3",
          }}
        />
        <OutsideClick onOutsideClick={() => setActivo(false)}>
          <div>
            <ButtonMenu onMouseUp={() => setActivo(!activo)}>
              <DivRotate activo={activo}>
                <IoChevronDownSharp />
              </DivRotate>
              <p
                style={{
                  marginLeft: 15,
                  fontSize: 15,
                  fontWeight: "600",
                  color: "#365583",
                }}
              >
                Gregoryput{" "}
              </p>
              <Avatar>
                <h1>G</h1>
              </Avatar>
            </ButtonMenu>
          </div>
          <DropdownContent activo={activo}>
            <div
              style={{ borderBottom: "2px solid #E4E4E4 ", paddingBottom: 20 }}
            >
              <p style={{ fontSize: 14, color: "#365583", padding: "15px" }}>
                Tema de la interfaz{" "}
              </p>
              <DivButtonSesion>
                <ButtonTheme>
                  <IoSunnyOutline style={{ width: 30, height: 30, marginRight: 10 }} />
                  Claro
                </ButtonTheme>
                <ButtonTheme>
                  <IoMoonOutline style={{ width: 30, height: 30, marginRight: 10 }} />
                  Oscuro
                </ButtonTheme>
              </DivButtonSesion>
            </div>

            <ButtonOption>
              <IoPersonCircleOutline style={{ width: 20, height: 20, marginRight: 10 }} />
              Perfil
            </ButtonOption>
            <ButtonOption onClick={handleClick}>
            <IoExitOutline style={{ width: 20, height: 20, marginRight: 10 }} />
              Cerrar Sesion</ButtonOption>
          </DropdownContent>
        </OutsideClick>
      </DivNav>
    </>
  );
}
