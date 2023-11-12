import { useState, useEffect, useCallback } from "react";
//libreria para implementar formularios
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/Api/AuthApi";
import { useDispatch } from "react-redux";
import { JwtUtils } from "../utils";
import { message } from "antd";
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

import { setUser } from "../redux/Slice/authSlice";

/// libreria de iconos
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
//// importacion de logo de la empresa
import logo from "../assets/logo.png";

//componente login
export default function Login() {
  /// useState para el toogle de ver contrase;o
  const [activo, setActivo] = useState(false);
  const [loadingState, setLoadingloadingState] = useState(false);

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

  useEffect(() => {
    if (isLoginSuccess) {
      if (loginData?.result != null && loginData?.result != "") {
        console.log("autenticacion correcta");
        setLoadingloadingState(true);
        dispatchUser();
        message.success("Sesión iniciada correctamente", 3);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 3 * 1000);
      } else {
        setLoadingloadingState(false);
        message.error({
          content:
            "Error al iniciar sesión, verifique sus datos e intente de nuevo",
        });
      }
    }
  }, [isLoginSuccess, loginData?.result, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (JwtUtils.verifyTokenExpiration(token)) {
      navigate("/login");
    } else {
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
      <DivContainerPage >
        <img className="animate__animated animate__pulse animate__delay-2s animate__repeat-2" style={{ marginBottom: "50px" }} src={logo} />

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
              placeholder="Ingresa tu contraseña"
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
          <Button
            className="animate__animated animate__zoomIn  animate__bounce animate__delay-1s"
            type="submit"
            disabled={isLoading || loadingState}
          >
            {isLoading || loadingState ? <Spinner /> : "Iniciar sesión"}
          </Button>
        </FormContainer>
      </DivContainerPage>
    </>
  );
}
