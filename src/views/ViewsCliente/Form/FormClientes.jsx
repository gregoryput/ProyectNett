import { PrincipalContainerForm } from "../../../components";

import React from "react";
import InformacionPersonal from "./InformacionPersonal";
import InformacionEmpresas from "./InformacionEmpresas";

export default function FormClientes(props) {
  const [posicionActual, setPosicionActual] = React.useState(1);
  const [datosFormulario, setDatosFormulario] = React.useState({
    Nombres: "jklsljkadlkfaklf",
    Apellidos: "asñfjasñkfasf",
    Telefono1: "100-123-1234",
    Telefono2: "809-103-0193",
    Direccion: "asfaejfahkfa",
    Correo: "dfas@gmail.com",
    Cedula: "123-1234567-1",
    IdSexo: 2,
    IdPais: 1,
    IdCiudad: 13,
    FechaNacimiento: "",
    Empresas: [
      {
        NombreEmpresa: "Yaiaf",
        RNC: "123098475",
        Correo: "sfaklfjal@gmail.com",
        Teléfono1: "202-104-0120",
        Teléfono2: "102-184-0123",
        SitioWeb: "http://www.fasfaj.com",
        Pais: 1,
        Ciudad: 15,
        Dirección: "asfklasfklasfa",
      },
    ],
    edad: 25,
  });

  const siguiente = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual + 1);
  };

  const atras = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual - 1);
  };

  return (
    <PrincipalContainerForm display={props.toggle}>
      <div>
        {posicionActual == 1 && (
          <InformacionPersonal
            nextPart={siguiente}
            dataValues={datosFormulario}
          />
        )}
        {posicionActual == 2 && (
          <InformacionEmpresas backPart={atras} dataValues={datosFormulario} />
        )}
      </div>
    </PrincipalContainerForm>
  );
}
