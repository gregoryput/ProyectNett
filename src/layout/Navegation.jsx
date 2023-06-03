// logo
import logoicons from "../assets/logoicons.png"
//componentes personalizados
import { ButtonNav, DivContainerNav, LabelNav } from "../components";
// importacion de iconos
import { BiBriefcaseAlt,BiHomeAlt2,BiWallet,BiWalletAlt,BiBulb,BiUser,BiPieChartAlt,BiPackage } from "react-icons/bi";

///estilo de los iconos 
const style = {minWidth:22 , height: 22, margin:2 , };



export default function Navegation() {
  

  return (
   <>
    <DivContainerNav>


      <div style={{display:"flex"}}>
      <img src={logoicons} alt="logo"  style={{marginLeft:10,marginBottom:50,marginTop:14, maxWidth:50}}/>
       <LabelNav style={{marginTop:20,marginRight: 14,fontSize:18, fontWeight:600 , fontFamily:"Jost" ,letterSpacing:4  , color:"#365583",overflow:"hidden"}}>GESTNETT</LabelNav>
      </div>

      <ButtonNav exact  to="dashboard"   style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}}>
        <BiHomeAlt2 style={style} />
        <LabelNav>Dashboard</LabelNav>
      </ButtonNav>

      <ButtonNav exact  to="proyecto"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiBulb style={style} />
        <LabelNav>Proyecto</LabelNav>
      </ButtonNav>

      <ButtonNav to="cliente"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiBriefcaseAlt style={style}  />
        <LabelNav>Cliente</LabelNav>
      </ButtonNav>

      <ButtonNav  exact to="proveedor"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiPackage style={style} />
        <LabelNav>Proveedores</LabelNav>
      </ButtonNav>

      <ButtonNav exact  to="cuentaPorCobrar"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiWallet style={style} />
        <LabelNav>Cuenta por Cobrar</LabelNav>
      </ButtonNav>

      <ButtonNav to="cuentaPorPagar"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiWalletAlt style={style} />
        <LabelNav>Cuenta por Pagar</LabelNav>
      </ButtonNav>
     
      <ButtonNav  exact to="usuario"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiUser style={style} />
        <LabelNav>Usuario</LabelNav>
      </ButtonNav>

      <ButtonNav exact  to="reporte"  style={({ isActive }) => {return { color: isActive ? "#365583" : ""}}} >
        <BiPieChartAlt style={style} />
        <LabelNav>Reporte</LabelNav>
      </ButtonNav>

    </DivContainerNav>
   </>
  )
}

