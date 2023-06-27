import { useState, useEffect, useCallback } from "react";

//libreria para implementar formularios
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUser } from "../redux/authSlice";
import { JwtUtils } from "../utils";
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

import { setUser } from "../redux/authSlice";
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

  const [loginUser, { data: loginData, isSuccess: isLoginSuccess, isLoading }] =
    useLoginUserMutation();

  const dispatchUser = useCallback(() => {
    if (!isLoading && loginData?.result != "" && loginData?.result != null) {
      dispatch(
        setUser({
          token: loginData?.result,
        })
      );
    }
  }, [dispatch, isLoading, loginData?.result]);

<<<<<<< HEAD



  /// -----------------------------------
  useEffect(() => {


    if (isSuccess) {
      if(dataUser.success) {
=======
  useEffect(() => {
    if (isLoginSuccess) {
      if (loginData?.result != null && loginData?.result != "") {
        console.log("autenticacion correcta");
>>>>>>> 2cc2a7fd55a550a5a13ed328b3119d4a707eb73a
        dispatchUser();
    
        navigate("/");
      }
      if (loginData?.result == null) {
        console.log("autenticacion correcta");
      }
    }
  }, [dispatchUser, isLoginSuccess, loginData?.result, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (JwtUtils.verifyTokenExpiration(token)) {
      navigate("/login");
    }
    else{
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
     await loginUser(data);
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
            {isLoading ? <Spinner /> : "Iniciar Sesion"}
          </Button>
        </FormContainer>
      </DivContainerPage>
    </>
  );
}
