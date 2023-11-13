import {  Container } from "../../../components";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { Colores } from "../../../components/GlobalColor";

export default function Pagos() {
  return (
    <Container
      style={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:"#87d068",
        color:`${Colores.Blanco}`
      }}
    >
      <div style={{display:"flex",alignItems:"center",padding:5}}>
      <AiOutlineDollarCircle size={35} style={{margin: 10}}/>
      <h4> Realizar pago</h4>
      </div>
      <AiOutlineArrowRight size={35}/>
    </Container>
  );
}
