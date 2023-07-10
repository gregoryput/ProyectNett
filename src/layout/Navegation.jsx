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
} from "react-icons/bi";
import { JwtUtils } from "../utils";

///estilo de los iconos
const style = { minWidth: 22, height: 22, margin: 2 };

export default function Navegation() {
  const token = localStorage.getItem("token");
  const userRol = JwtUtils.getRolesByToken(token);

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
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiHomeAlt2 style={style} />
            <LabelNav>Dashboard</LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" || userRol === "Administrador") && (
          <ButtonNav
            exact
            to="proyecto"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiBulb style={style} />
            <LabelNav>Proyecto</LabelNav>
          </ButtonNav>
        )}

        {userRol === "Administrador" && (
          <ButtonNav
            exact
            to="cliente"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiBriefcaseAlt style={style} />
            <LabelNav>Cliente</LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol === "Asistente Administrativo") && (
          <ButtonNav
            exact
            to="proveedores"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiPackage style={style} />
            <LabelNav>Proveedores</LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol == "Asistente Administrativo") && (
          <ButtonNav
            exact
            to="inventario"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiBox style={style} />
            <LabelNav>Inventario</LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador," ||
          userRol == "Asistente Administrativo") && (
          <ButtonNav
            exact
            to="cuenta-por-cobrar"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiWallet style={style} />
            <LabelNav>Cuenta por cobrar</LabelNav>
          </ButtonNav>
        )}

        {userRol === "Administrador" && (
          <ButtonNav
            to="cuenta-por-pagar"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiWalletAlt style={style} />
            <LabelNav>Cuenta por pagar</LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador" ||
          userRol === "Administrador De Usuario") && (
          <ButtonNav
            exact
            to="control-usuarios"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiUser style={style} />
            <LabelNav>Control-usuarios</LabelNav>
          </ButtonNav>
        )}

        {(userRol === "Administrador De Usuario" || userRol == "Administrador") && (
          <ButtonNav
            exact
            to="reporte"
            style={({ isActive }) => {
              return { color: isActive ? "#365583" : "" };
            }}
          >
            <BiPieChartAlt style={style} />
            <LabelNav>Reporte</LabelNav>
          </ButtonNav>
        )}
      </DivContainerNav>
    </>
  );
}
