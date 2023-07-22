import { useForm } from "react-hook-form";
import { ButtonNext, ContainerForm, InputFor, LabelFor, Row, ViewContainerPages } from "../../components"
import { useState } from "react";
import InformacionPerfil from "./components/InformacionPerfil";
import InformacionPersonal from "./components/InformacionPersonal";

function ConfiguracionPerfil() {
  const [toggle, setToggle] = useState(false)
  return (
    <ViewContainerPages>
      <h2 style={{marginLeft:15 ,marginBottom:40}}> Configuración de perfil</h2>
     <InformacionPerfil toggle={toggle} setToggle={setToggle} />

       {toggle ?
        <Password  toggle={toggle} setToggle={setToggle}/>
        : null}
      <InformacionPersonal/>
     </ViewContainerPages>

  )
}








function Password(){
  const {
    formState: { errors },

  } = useForm();
  return(
    <>
     <ContainerForm>
       <h3 style={{marginBottom:25}}>Editar contraseña </h3>
       
        <Row>
         <div>
          <LabelFor>Nueva contraseña</LabelFor>
         <InputFor type="Password" placeholder="Ingrese los contraseña"/>
          {errors.Nombres && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Nombres.message}
            </span>
          )}
         </div>
         <div style={{marginLeft:50}}>
          <LabelFor >Confirmar contraseña</LabelFor>
         <InputFor type="Password" placeholder="Ingrese los contraseña"/>
          {errors.Nombres && (
            <span style={{ color: "red", fontSize: 10 }}>
              {errors.Nombres.message}
            </span>
          )}
         </div>
          <ButtonNext style={{marginTop:27, marginLeft:50}} >Confirmar</ButtonNext>

        </Row>
     </ContainerForm>
    </>
  )
}

export default ConfiguracionPerfil