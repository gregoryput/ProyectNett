import { useState } from "react";
import InformacionPerfil from "./components/InformacionPerfil";
import InformacionPersonal from "./components/InformacionPersonal";
import { ViewContainerPages } from "../../components";
import FormPasword from "./components/FormPasword";

function ConfiguracionPerfil() {
  const [toggle, setToggle] = useState(false)
  return (
    <ViewContainerPages>
      <h2 style={{marginLeft:15 ,marginBottom:40}}> Configuración de perfil</h2>
     <InformacionPerfil toggle={toggle} setToggle={setToggle} />

       {toggle ?
        <FormPasword toggle={toggle} setToggle={setToggle}/>
        : null}
      <InformacionPersonal/>
     </ViewContainerPages>

  )
}










export default ConfiguracionPerfil