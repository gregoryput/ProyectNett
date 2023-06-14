import { useState } from "react";
//libreria para implementar formularios 
import { useForm } from "react-hook-form";

import { useLoginUserMutation } from "../redux/Api/AuthApi"; 


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

  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isLoading: isLoadingLoding }] =
  useLoginUserMutation("");

  /// destruturacion de componente useform 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await loginUser(data);
    console.log(result);
  };

  return (
    <>
      <DivContainerPage>
        <img style={{ marginBottom: "50px" ,}} src={logo} alt="" />

        <FormContainer onSubmit={handleSubmit(onSubmit)}>

          <Label> Usuario </Label>
          <Input Error={errors.usuario}
            placeholder="Usuario@gestnett.com"
            {...register("NombreUsuario", { required: true, minLength: 1, maxLength: 50 })}
          />
          {errors.usuario && <span style={{color:"red" ,fontSize:15 , marginBottom: 5,}}>Verifica tu Usuario</span>}

          <Label> Contraseña </Label>
          <DivPassword>

            <Input
              type={activo ? "text" : "Contraseña"}
              placeholder="Ingresar tu contraseña"
              {...register("Contraseña", { required: true, minLength: 1,  maxLength: 50 })}
              Error={errors.Password}
            />

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

          {errors.Password && <span style={{color:"red" ,fontSize:15 , marginBottom: 5}}>Verifica tu contraseña</span>}
          <Button type="submit">Iniciar Sesion</Button>

        </FormContainer>

      </DivContainerPage>
    </>
  );
}

/*
    const onSubmit: SubmitHandler<ILoginData> = async (data) => {
        const result = await loginUser({ userName: data.userName, password: data.password });
        console.log(data, result);
    };

*/