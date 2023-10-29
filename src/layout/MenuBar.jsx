import { useState } from "react";
import { OutsideClick } from "outsideclick-react";
import {
  IoMoonOutline,
  IoChevronDownSharp,
  IoSunnyOutline,
  IoExitOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";

import {
  Avatar,
  ButtonMenu,
  ButtonOption,
  ButtonTheme,
  DivButtonSesion,
  DivNav,
  DivRoll,
  DivRotate,
  DropdownContent,
  TitleNav,
} from "../components";

import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/Slice/authSlice";
import { JwtUtils } from "../utils";

export default function MenuBar() {
  const token = localStorage.getItem("token");
  const userRol = JwtUtils.getRolesByToken(token);
  const userName = JwtUtils.getUserNameByToken(token);

  const [activo, setActivo] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const Titulo = (location) => {
    // Mapea las rutas a los títulos
    const titleMap = {
      "/": "Home",
      "/proyecto": "Proyectos",
      "/proveedores": "Proveedores",
      "/cliente": "Clientes",
      "/inventario": "Inventario",
      "/cuenta-por-cobrar": "Cuenta por cobrar",
      "/cuenta-por-pagar": "Cuenta por pagar",
      "/usuarios": "Usuarios",
      "/empleado": "Empleados",
      "/reporte": "Reportes",
    };
  
    const title = titleMap[location] || null; // Título por defecto si no se encuentra la ruta
  
    // Devuelve la etiqueta TitleNav si hay un título definido, de lo contrario, solo el título
    return title ? <TitleNav>{title}</TitleNav> : title;
  };
  
  //const [logOut] = useSelector((state) => state.users);
  const handleClick = () => {
    //  var token = localStorage.getItem("token");
    //  if (token){
    dispatch(logOut());
    navigate("/login");
    //  }
  };
  return (
    <>
      <DivNav>
        <div>
          {Titulo(location.pathname)}
        </div>

        <OutsideClick onOutsideClick={() => setActivo(false)}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <DivRoll>{userRol}</DivRoll>
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
                {userName}{" "}
              </p>
              <Avatar>
                <h1>
                  {userName !== undefined ? userName[0]?.toUpperCase() : ""}
                </h1>
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
                  <IoSunnyOutline
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  Claro
                </ButtonTheme>
                <ButtonTheme>
                  <IoMoonOutline
                    style={{ width: 30, height: 30, marginRight: 10 }}
                  />
                  Oscuro
                </ButtonTheme>
              </DivButtonSesion>
            </div>

            <ButtonOption
              onClick={() => {
                navigate("/Configuracion");
              }}
            >
              <IoPersonCircleOutline
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              Perfil
            </ButtonOption>
            <ButtonOption onClick={() => handleClick()}>
              <IoExitOutline
                style={{ width: 20, height: 20, marginRight: 10 }}
              />
              Cerrar Sesion
            </ButtonOption>
          </DropdownContent>
        </OutsideClick>
      </DivNav>
    </>
  );
}
