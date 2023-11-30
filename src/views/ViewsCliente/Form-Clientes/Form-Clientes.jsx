import React from "react";
import {
  Step1InfoReconocimiento,
  Step2Representantes,
  Step3Empresas,
} from "./Steps";
import { MdOutlinePersonPin } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";

import { ContainerForm } from "../../../components";
import { OutsideClick } from "outsideclick-react";
import PropTypes from "prop-types";
import { Steps } from "antd";

const FormClients = (props) => {
  const [current, setCurrent] = React.useState(0);
  const [data, setData] = React.useState({});

  const [animacion, setAnimacion] = React.useState(false);

  React.useEffect(() => {
    /*
    if (props.dataClientEdit !== null) {
      //props.dataClientEdit.InitialCedulaEdit = props.dataClientEdit.Cedula;
      setDatosFormulario({
        ...FuncUtils.capitalizePropertyKeys(props.dataClientEdit),
        InitialCedulaEdit: props.dataClientEdit.cedula, // <-- c minuscula porque esta antes de convertir con el Utils
      });
    }
    */
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
      //props.setDataClientEdit(null);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [props.toggle, setAnimacion, props]);

  //Items para los pasos:
  const [itemsSteps, setItemsSteps] = React.useState([
    {
      title: "Info de reconocimiento",
      status: "process",
      icon: <MdOutlinePersonPin />,
    },
    {
      title: "Representante",
      status: "wait",
      icon: <IoPersonCircle />,
    },
    {
      title: "Sucursales",
      status: "wait",
      icon: <BsBuildingsFill />,
    },
  ]);
  console.log("00000", setItemsSteps);

  // Funcion para ir al siguiente paso --------------------
  const handleNextStep = React.useCallback(
    (data, step) => {
      setData((prev) => {
        return { ...prev, ...data };
      });
      setCurrent(current + 1);

      //Obtengo la posicion del arreglo items que debo modificar (Paso 1 es posicion 0, paso 2 es posicion 1, paso 3 es posicion 2):
      const position = step - 1;

      //Al ir de un paso a otro, el paso actual pasa a estar en finish y el siguiente pasa a estar en proceso
      setItemsSteps((prevState) => {
        const newState = [...prevState];
        newState[position] = { ...newState[position], status: "finish" };
        newState[position + 1] = {
          ...newState[position + 1],
          status: "process",
        };
        return newState;
      });
    },
    [current]
  );

  // Funcion para ir al paso anterior --------------------
  const handlePrevStep = React.useCallback(
    (dataBack, step) => {
      setData((prev) => {
        return { ...prev, ...dataBack };
      });
      setCurrent(current - 1);

      //Obtengo la posicion del arreglo items que debo modificar (Paso 1 es posicion 0, paso 2 es posicion 1, paso 3 es posicion 2):
      const position = step - 1;

      //Al regresar de un paso a otro el paso actual pasa a estar en wait y el paso al que se regresa pasa a estar en process
      setItemsSteps((prevState) => {
        const newState = [...prevState];
        newState[position] = { ...newState[position], status: "wait" };
        newState[position - 1] = {
          ...newState[position - 1],
          status: "process",
        };
        return newState;
      });
    },
    [current]
  );

  // Funcion para hacer submit ---------------------:
  const handleSubmit = () => {
    console.log("Guardar datos");
  };

  return (
    <ContainerForm animacion={animacion} display={props.toggle}>
      <OutsideClick>
        <div>
          <Steps current={current} items={[...itemsSteps]} />
          {current === 0 ? (
            <div>
              <Step1InfoReconocimiento
                setItemsSteps={setItemsSteps}
                toggle={props.toggle}
                setToggle={props.setToggle}
                onSuccess={handleNextStep}
                data={data}
              />
            </div>
          ) : null}

          {current === 1 && (
            <div>
              <Step2Representantes
                setItemsSteps={setItemsSteps}
                toggle={props.toggle}
                setToggle={props.setToggle}
                onSuccess={handleNextStep}
                onBack={handlePrevStep}
                data={data}
              />
            </div>
          )}

          {current === 2 && (
            <div>
              <Step3Empresas
                setItemsSteps={setItemsSteps}
                toggle={props.toggle}
                setToggle={props.setToggle}
                onSuccess={handleSubmit}
                onBack={handlePrevStep}
                data={data}
              />
            </div>
          )}
        </div>
      </OutsideClick>
    </ContainerForm>
  );
};

export default FormClients;

// Definir PropTypes para las props del componente
FormClients.propTypes = {
  toggle: PropTypes.bool.isRequired,
  setToggle: PropTypes.func.isRequired,
};
