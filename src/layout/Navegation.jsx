import { ButtonNav, DivContainerNav, LabelNav } from "../components";
import logoicons from "../assets/logoicons.png"
import { BiBriefcaseAlt,BiHomeAlt2,BiWallet,BiWalletAlt,BiBulb,BiUser,BiPieChartAlt,BiPackage } from "react-icons/bi";


export default function Navegation() {
  return (
   <>
    <DivContainerNav>
      <div style={{display:"flex"}}>
      <img src={logoicons} alt="logo"  style={{marginLeft:10,marginBottom:50,marginTop:50, maxWidth:50}}/>
      <LabelNav style={{marginRight: 14,fontSize:18, fontWeight:600 , fontFamily:"Jost" ,letterSpacing:4  , color:"#365583"}}>GESTNETT</LabelNav>
      </div>
      <ButtonNav >
        <BiHomeAlt2 style={style} />
        <LabelNav>Dashboard</LabelNav>
      </ButtonNav>

      <ButtonNav >
        <BiBulb style={style} />
        <LabelNav>Proyecto</LabelNav>
      </ButtonNav>



      <ButtonNav >
        <BiBriefcaseAlt style={style} />
        <LabelNav>Cliente</LabelNav>
      </ButtonNav>
      <ButtonNav >
        <BiPackage style={style} />
        <LabelNav>Proveedores</LabelNav>
      </ButtonNav>

      <ButtonNav >
        <BiWallet style={style} />
        <LabelNav>Cuenta por Cobrar</LabelNav>
      </ButtonNav>

      <ButtonNav >
        <BiWalletAlt style={style} />
        <LabelNav>Cuenta por Pagar</LabelNav>
      </ButtonNav>
     
      <ButtonNav >
        <BiUser style={style} />
        <LabelNav>Usuario</LabelNav>
      </ButtonNav>

      <ButtonNav >
        <BiPieChartAlt style={style} />
        <LabelNav>Reporte</LabelNav>
      </ButtonNav>

     

     
      

     
      

    </DivContainerNav>
   </>
  )
}


const style = {minWidth:22 , height: 22, margin:2}