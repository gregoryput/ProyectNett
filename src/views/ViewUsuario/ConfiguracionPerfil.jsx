import { useState } from "react";
import InformacionPerfil from "./components/InformacionPerfil";
import InformacionPersonal from "./components/InformacionPersonal";
import { ViewContainerPages } from "../../components";
import FormPasword from "./components/FormPasword";
import { useGetPerfilQuery } from "../../redux/Api/ConfigPerfilApi";
import { JwtUtils } from "../../utils";


function ConfiguracionPerfil() {
  const [toggle, setToggle] = useState(false)
  const token = localStorage.getItem("token");
  const id = JwtUtils.getUserIdByToken(token);
  const { data , isLoading , isSuccess} = useGetPerfilQuery(id);
  console.log(data,"hola mundo");
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