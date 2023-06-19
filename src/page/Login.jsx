import { useState, useEffect, useCallback } from "react";
//libreria para implementar formularios
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/AuthApi";
import { useDispatch } from "react-redux";
import { verifyTokenExpiration } from "../utils/jwt-utils";
//componente creacdo con styled component
import {
  DivContainerPage,
  Button,
  Label,
  Input,
  FormContainer,
  DivPassword,
  ButtonPassword as StyleButtonPassword,
  Spinner,
} from "../components";

import { setUsers } from "../redux/authSlice";
/// libreria de iconos
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
//// importacion de logo de la empresa
import logo from "../assets/logo.png";

//componente login
export default function Login() {
  /// useState para el toogle de ver contrase;o
  const [activo, setActivo] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { data: dataUser, isSuccess, isLoading }] = useLoginUserMutation();

  const dispatchUser = useCallback(() => {
    if (!isLoading) {
        dispatch(
            setUsers({
                token: dataUser?.result,
                
            }),
        );
    }
}, [dispatch, isLoading, dataUser?.result]);

  /// -----------------------------------
  useEffect(() => {

    if (isSuccess) {
      if(dataUser.success) {
        console.log("autenticacion correcta");
        dispatchUser();
        navigate("/");
      }
    }
  }, [isSuccess,dispatchUser,navigate,dataUser]);

  /// -----------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (verifyTokenExpiration(token) ) {
      navigate("/");
    }
  }, [navigate]);

  /// destruturacion de componente useform ----
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /// -----------------------------------
  const onSubmit = async (data) => {
    const result = await loginUser(data);
    console.log(result);
    //console.log(data, isSuccess, isLoading);
  };

  return (
    <>
      <DivContainerPage>
        <img style={{ marginBottom: "50px" }} src={logo} />

        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Label> Usuario </Label>
          <Input
         
            placeholder="Usuario@gestnett.com"
            {...register("NombreUsuario", {
              required: true,
              minLength: 1,
              maxLength: 50,
            })}
          />
          {errors.NombreUsuario && (
            <span style={{ color: "red", fontSize: 15, marginBottom: 5 }}>
              Verifica tu Usuario
            </span>
          )}

          <Label> Contraseña </Label>
          <DivPassword>
            <Input
              type={activo ? "text" : "Password"}
              placeholder="Ingresar tu contraseña"
              {...register("Contraseña", {
                required: true,
                minLength: 1,
                maxLength: 50,
              })}
              
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

          {errors.Contraseña && (
            <span style={{ color: "red", fontSize: 15, marginBottom: 5 }}>
              Verifica tu contraseña
            </span>
          )}
          <Button type="submit">
            {isLoading ? <Spinner/> : "Iniciar Sesion"}
          </Button>
        </FormContainer>
      </DivContainerPage>
    </>
  );
}
