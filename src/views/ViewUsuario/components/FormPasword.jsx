import { useForm } from "react-hook-form";
import { ButtonNext, Container, InputFor, LabelFor, Row } from "../../../components"


export default function FormPasword(){
    const {
      formState: { errors },
  
    } = useForm();
    return(
      <>
       <Container>
         <h3 style={{marginBottom:25,}}>Editar contraseña </h3>
         
          <Row>
          <div style={{marginRight:50}}>
            <LabelFor>Contraseña  actual</LabelFor>
           <InputFor type="Password" placeholder="Ingrese los contraseña"/>
            {errors.Nombres && (
              <span style={{ color: "red", fontSize: 10 }}>
                {errors.Nombres.message}
              </span>
            )}
           </div>
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
       </Container>
      </>
    )
  }