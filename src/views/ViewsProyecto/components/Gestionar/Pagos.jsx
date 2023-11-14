import {  BtnPago } from "../../../../components";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";

export default function Pagos() {
  return (
    <BtnPago
      style={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:0
      }}
    >
      <div style={{display:"flex",alignItems:"center",padding:5}}>
      <AiOutlineDollarCircle size={35} style={{margin: 10}}/>
      <h4> Realizar pago</h4>
      </div>
      <AiOutlineArrowRight size={35}/>
    </BtnPago>
  );
}
