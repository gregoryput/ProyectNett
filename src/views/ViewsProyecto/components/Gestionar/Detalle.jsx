import {  BtnPro } from "../../../../components";
import { IoEyeOutline ,IoCashOutline} from "react-icons/io5";
export default function Detalle() {
  return (
    <BtnPro
      style={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop:0
      }}
    >
      <div style={{display:"flex",alignItems:"center",padding:5}}>
      < IoCashOutline size={35} style={{margin: 10}}/>
      <h4>  Ver completo</h4>
      </div>
      < IoEyeOutline size={35}/>
    </BtnPro>
  );
}
