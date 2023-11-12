// logo
import logoicons from "../assets/logoicons.png";
//componentes personalizados
import { ButtonNav, DivContainerNav, LabelNav } from "../components";
// importacion de iconos
import {
  BiBox,
  BiBriefcaseAlt,
  BiHomeAlt2,
  BiWallet,
  BiWalletAlt,
  BiBulb,
  BiUser,
  BiPieChartAlt,
  BiPackage,
  BiDumbbell,
} from "react-icons/bi";
import { JwtUtils } from "../utils";
import { useState } from "react";
import { useLocation } from "react-router-dom";

///estilo de los iconos
const style = { minWidth: 22, height: 22, margin: 2 };

export default function Navegation() {
  const token = localStorage.getItem("token");
  const userRol = JwtUtils.getRolesByToken(token);

  const color = "#1c3c6d";

  const location = useLocation();
  const [ruta, setRuta] = useState(location.pathname);
  return (
    <>
      <DivContainerNav>
        <div style={{ display: "flex" }}>
          <img
            src={logoicons}
            alt="logo"
            style={{
              marginLeft: 10,
              marginBottom: 50,
              marginTop: 14,
              maxWidth: 50,
            }}
          />
          <LabelNav
            style={{
              marginTop: 20,
              marginRight: 14,
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Jost",
              letterSpacing: 4,
              color: "#365583",
              overflow: "hidden",
            }}
          >
            GESTNETT
          </LabelNav>
        </div>

        {userRol === "Administrador" && (
          <ButtonNav
            exact
            to="/"
            onClick={() => {
              setRuta("/");
            }}
           
          >
            <BiHomeAlt2
              className={`${
                ruta === "/" ? "animate__animated animate__heartBeat" : ""
              }`}
              style={{ color: `${ruta === "/" ? color : ""}`, ...style}}
            />

            <LabelNav
              style={{
                color: `${ruta === "/" ? color : ""}`,
                fontWeight: `${ruta === "/" ? "600" : ""}`,
              }}
            >
              Dashboard
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" || userRol === "Administrador") && (
          <ButtonNav
            exact
            to="proyecto"
            onClick={() => {
              setRuta("/proyecto");
            }}
          >
            <BiBulb
              className={`${
                ruta === "/proyecto"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/proyecto" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/proyecto" ? color : ""}`,
                fontWeight: `${ruta === "/proyecto" ? "600" : ""}`,
              }}
            >
              Proyectos
            </LabelNav>
          </ButtonNav>
        )}

        {userRol === "Administrador" && (
          <ButtonNav
            exact
            to="cliente"
            onClick={() => {
              setRuta("/cliente");
            }}
          >
            <BiBriefcaseAlt
              className={`${
                ruta === "/cliente"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{ color: `${ruta === "/cliente" ? color : ""}`, ...style  }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/cliente" ? color : ""}`,
                fontWeight: `${ruta === "/cliente" ? "600" : ""}`,
              }}
            >
              Clientes
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol === "Asistente Administrativo") && (
          <ButtonNav
            exact
            to="proveedores"
            onClick={() => {
              setRuta("/proveedores");
            }}
          >
            <BiPackage
              className={`${
                ruta === "/proveedores"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/proveedores" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/proveedores" ? color : ""}`,
                fontWeight: `${ruta === "/proveedores" ? "600" : ""}`,
              }}
            >
              Proveedores
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol == "Asistente Administrativo") && (
          <ButtonNav
            exact
            to="inventario"
            onClick={() => {
              setRuta("/inventario");
            }}
          >
            <BiBox
              className={`${
                ruta === "/inventario"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/inventario" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/inventario" ? color : ""}`,
                fontWeight: `${ruta === "/inventario" ? "600" : ""}`,
              }}
            >
              Inventario
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol == "Asistente Administrativo") && (
          <ButtonNav
            exact
            to="cuenta-por-cobrar"
            onClick={() => {
              setRuta("/cuenta-por-cobrar");
            }}
          >
            <BiWallet
              className={`${
                ruta === "/cuenta-por-cobrar"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/cuenta-por-cobrar" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/cuenta-por-cobrar" ? color : ""}`,
                fontWeight: `${ruta === "/cuenta-por-cobrar" ? "600" : ""}`,
              }}
            >
              Cuenta por cobrar
            </LabelNav>
          </ButtonNav>
        )}

        {userRol === "Administrador" && (
          <ButtonNav
            to="cuenta-por-pagar"
            onClick={() => {
              setRuta("/cuenta-por-pagar");
            }}
          >
            <BiWalletAlt
              className={`${
                ruta === "/cuenta-por-pagar"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/cuenta-por-pagar" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/cuenta-por-pagar" ? color : ""}`,
                fontWeight: `${ruta === "/cuenta-por-pagar" ? "600" : ""}`,
              }}
            >
              Cuenta por pagar
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol === "Administrador De Usuario") && (
          <ButtonNav
            exact
            to="usuarios"
            onClick={() => {
              setRuta("/usuarios");
            }}
          >
            <BiUser
              className={`${
                ruta === "/usuarios"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/usuarios" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/usuarios" ? color : ""}`,
                fontWeight: `${ruta === "/usuarios" ? "600" : ""}`,
              }}
            >
              Usuarios
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol === "Administrador De Usuario") && (
          <ButtonNav
            exact
            to="empleado"
            onClick={() => {
              setRuta("/empleado");
            }}
          >
            <BiDumbbell
              className={`${
                ruta === "/empleado"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{
                color: `${ruta === "/empleado" ? color : ""}`,
                ...style,
              }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/empleado" ? color : ""}`,
                fontWeight: `${ruta === "/empleado" ? "600" : ""}`,
              }}
            >
              Empleados
            </LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador De Usuario" ||
          userRol == "Administrador") && (
          <ButtonNav
            exact
            to="reporte"
            onClick={() => {
              setRuta("/reporte");
            }}
          >
            <BiPieChartAlt
              className={`${
                ruta === "/reporte"
                  ? "animate__animated animate__heartBeat"
                  : ""
              }`}
              style={{ color: `${ruta === "/reporte" ? color : ""}`, ...style }}
            />
            <LabelNav
              style={{
                color: `${ruta === "/reporte" ? color : ""}`,
                fontWeight: `${ruta === "/reporte" ? "600" : ""}`,
              }}
            >
              Reportes
            </LabelNav>
          </ButtonNav>
        )}
      </DivContainerNav>
    </>
  );
}
