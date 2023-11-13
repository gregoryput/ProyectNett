import {  Container } from "../../../components";
import { Colores } from "../../../components/GlobalColor";
import { IoEyeOutline ,IoCashOutline} from "react-icons/io5";
export default function Detalle() {
  return (
    <Container
      style={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:`${Colores.AzulMar}`,
        color:`${Colores.Blanco}`
      }}
    >
      <div style={{display:"flex",alignItems:"center",padding:5}}>
      < IoCashOutline size={35} style={{margin: 10}}/>
      <h4>  Ver completo</h4>
      </div>
      < IoEyeOutline size={35}/>
    </Container>
  );
}
