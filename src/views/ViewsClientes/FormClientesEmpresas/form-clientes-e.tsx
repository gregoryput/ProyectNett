import React from "react";
import {
  Step1InfoReconocimiento,
  Step2Representantes,
  Step3Empresas,
} from "./Steps";
import { MdOutlinePersonPin } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { StepProps, Steps, message } from "antd";
import { ContainerForm } from "../../../components";
import { OutsideClick } from "outsideclick-react";

interface IFormClientesProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormClientsEmpresas = (props: IFormClientesProps) => {
  const [current, setCurrent] = React.useState<number>(0);
  const [data, setData] = React.useState<any>();
  const [animacion, setAnimacion] = React.useState<boolean>(false);

  //Items para los pasos:
  const [itemsSteps, setItemsSteps] = React.useState<StepProps[]>([
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

  React.useEffect(() => {
    if (props.toggle == false) {
      setTimeout(() => {
        setAnimacion(false);
      }, 200);
    }

    if (props.toggle == true) {
      setAnimacion(true);
    }
  }, [props.toggle, setAnimacion]);

  // Funcion para ir al siguiente paso --------------------
  const handleNextStep = React.useCallback(
    (data: any, step: number) => {
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

      message.info("palante");
    },
    [current]
  );

  // Funcion para ir al paso anterior --------------------
  const handlePrevStep = React.useCallback(
    (dataBack: any, step: number) => {
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

      message.info("patra");
    },
    [current]
  );

  // Funcion para hacer submit ---------------------:
  const handleSubmit = () => {
    message.info("Guardar datos");
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
                onSuccess={handleNextStep}
                data={data}
              />
            </div>
          ) : null}

          {current === 1 && (
            <div>
              <Step2Representantes
                setItemsSteps={setItemsSteps}
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

export default FormClientsEmpresas;
