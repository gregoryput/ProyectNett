import { ContainerForm } from "../../../components";
import { FuncUtils } from "../../../utils";

import InformacionPersonal from "../Components/InformacionPersonal";
import InformacionEmpresas from "../Components/InformacionEmpresas";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { OutsideClick } from "outsideclick-react";
// Importa otros componentes o módulos necesarios

export default function FormClientes(props) {
  const [posicionActual, setPosicionActual] = useState(1);
  const [datosFormulario, setDatosFormulario] = useState({});
  const [saveIsSucces, setSaveIsSucces] = useState(false);

  const [animacion, setAnimacion] = useState(false);

  const siguiente = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual + 1);
  };

  const atras = (data) => {
    setDatosFormulario({ ...datosFormulario, ...data });
    setPosicionActual(posicionActual - 1);
  };

  useEffect(() => {
    if (saveIsSucces) {
      props.setToggle(true);
      setSaveIsSucces(false);
    }
  }, [saveIsSucces]);

  useEffect(() => {
    if (props.dataClientEdit !== null) {
      setDatosFormulario(
        FuncUtils.capitalizePropertyKeys(props.dataClientEdit)
      );
    }
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
      props.setDataClientEdit(null);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [
    props.dataClientEdit,
    props.setDataClientEdit,
    props.toggle,
    setAnimacion,
  ]);

  return (
    <ContainerForm animacion={animacion} display={props.toggle}>
      <OutsideClick>
        <div>
          {posicionActual === 1 && (
            <InformacionPersonal
              nextPart={siguiente}
              dataValues={datosFormulario}
              setDatosFormulario={setDatosFormulario}
              toggle={props.toggle}
              setToggle={props.setToggle}
              dataClientEdit={props.dataClientEdit}
              setDataClientEdit={props.setDataClientEdit}
              setLoadingSave={props.setLoadingSave}
            />
          )}
          {posicionActual === 2 && (
            <InformacionEmpresas
              setPosicionActual={setPosicionActual}
              backPart={atras}
              dataValues={datosFormulario}
              setDatosFormulario={setDatosFormulario}
              setSaveIsSucces={setSaveIsSucces}
              toggle={props.toggle}
              setToggle={props.setToggle}
            />
          )}
        </div>
      </OutsideClick>
    </ContainerForm>
  );
}

// Definir PropTypes para las props del componente
FormClientes.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
  setLoadingSave: PropTypes.func.isRequired,
  dataClientEdit: PropTypes.object, // Cambia el tipo según corresponda
  setDataClientEdit: PropTypes.func.isRequired,
};

// Importa otros componentes o módulos necesarios
