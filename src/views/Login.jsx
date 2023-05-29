import { useState } from "react";
//libreria para implementar formularios 
import { useForm } from "react-hook-form";

//componente creacdo con styled component
import {
  DivContainerPage,
  Button,
  Label,
  Input,
  FormContainer,
  DivPassword,
  ButtonPassword as StyleButtonPassword,
} from "../components";

/// libreria de iconos 
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
//// importacion de logo de la empresa 
import logo from "../assets/logo.png";

//componente login 
export default function Login() {

  /// useState para el toogle de ver contrase;o 
  const [activo, setActivo] = useState(false);

  /// destruturacion de componente useform 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <DivContainerPage>
        <img style={{ marginBottom: "50px" }} src={logo} alt="" />

        <FormContainer onSubmit={handleSubmit(onSubmit)}>

          <Label> Usuario </Label>
          <Input Error={errors.usuario}
            placeholder="Usuario@gestnett.com"
            {...register("usuario", { required: true, minLength: 1, maxLength: 50 })}
          />
          {errors.usuario && <span style={{color:"red" ,fontSize:15 , marginBottom: 5}}> Verifica tu Usuario</span>}

          <Label> Contraseña </Label>
          <DivPassword>

            <Input
              type={activo ? "text" : "password"}
              placeholder="Ingresar tu contraseña"
              {...register("Password", { required: true, minLength: 1,  maxLength: 50 })}
              Error={errors.Password}
            />
             {errors.Password && <span style={{color:"red" ,fontSize:15 , marginBottom: 5}}>Verifica tu contraseña</span>}

            <button
              type="button"
              onMouseUp={() => setActivo(!activo)}
              onMouseDown={() => setActivo(!activo)}
            >
              {activo == false ? (
                <IoEyeOutline style={StyleButtonPassword} />
              ) : (
                <IoEyeOffOutline style={StyleButtonPassword} />
              )}
            </button>

          </DivPassword>

          <Button type="submit">Iniciar Sesion</Button>

        </FormContainer>

      </DivContainerPage>
    </>
  );
}
