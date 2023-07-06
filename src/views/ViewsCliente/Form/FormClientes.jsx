import { PrincipalContainerForm } from "../../../components";

import React from "react";
import InformacionPersonal from "./InformacionPersonal";
import InformacionEmpresas from "./InformacionEmpresas";

export default function FormClientes(props) {
  const [posicionActual, setPosicionActual] = React.useState(1);
  const [datosFormulario, setDatosFormulario] = React.useState({});

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
