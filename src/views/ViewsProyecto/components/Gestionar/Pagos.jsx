import {  BtnPago } from "../../../../components";
import { AiOutlineDollarCircle, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Pagos() {
  const navigate = useNavigate();

  return (
    <BtnPago
      style={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:0
      }}

      onClick={()=>   navigate(`/cuenta-por-cobrar`)}
    >
      <div style={{display:"flex",alignItems:"center",padding:5}}>
      <AiOutlineDollarCircle size={35} style={{margin: 10}}/>
      <h4> Realizar pago</h4>
      </div>
      <AiOutlineArrowRight size={35}/>
    </BtnPago>
  );
}
