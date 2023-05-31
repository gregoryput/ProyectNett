import MenuBar from "../layout/MenuBar";
import Navegation from "../layout/Navegation";

export default function Layout() {
  return (
    <div style={{display: "flex", flexDirection:"row"}}>
     <Navegation/>
     <MenuBar/>
    </div>
  )
}
