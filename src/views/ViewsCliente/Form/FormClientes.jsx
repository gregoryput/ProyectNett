import { ContainerForm, PrincipalContainerForm } from "../../../components";
import { FuncUtils } from "../../../utils";

import React from "react";
import InformacionPersonal from "./InformacionPersonal";
import InformacionEmpresas from "./InformacionEmpresas";

export default function FormClientes(props) {
  const [posicionActual, setPosicionActual] = React.useState(1);
  const [datosFormulario, setDatosFormulario] = React.useState({});
  const [saveIsSucces, setSaveIsSucces] = React.useState(false);

  const siguiente = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual + 1);
  };

  const atras = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual - 1);
  };

  //Cerrar el formulario si el cliente se guarda correctamente
  React.useEffect(() => {
    if (saveIsSucces) {
      props.setToggle(true);
      setSaveIsSucces(false);
    }
  }, [saveIsSucces]);

  // Llenar los campos con los datos del cliente a editar:
  React.useEffect(() => {
    if (props.dataClientEdit !== null) {
      setDatosFormulario(FuncUtils.capitalizePropertyKeys(props.dataClientEdit));
    }
  }, [props.dataClientEdit]);

  return (
    <ContainerForm display={props.toggle}>
      <div>
        {posicionActual == 1 && (
          <InformacionPersonal
            nextPart={siguiente}
            dataValues={datosFormulario}
          />
        )}
        {posicionActual == 2 && (
          <InformacionEmpresas
            setPosicionActual={setPosicionActual}
            setLoadingSave={props.setLoadingSave}
            backPart={atras}
            dataValues={datosFormulario}
            setDatosFormulario={setDatosFormulario}
            setSaveIsSucces={setSaveIsSucces}
          />
        )}
      </div>
    </ContainerForm>
  );
}
