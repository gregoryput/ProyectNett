import { ContainerForm } from "../../../components";

import { useForm } from "react-hook-form";
import React from "react";
import InformacionPersonal from "./InformacionPersonal";
import InformacionEmpresas from "./InformacionEmpresas";

export default function FormClientes(props) {
  const [posicionActual, setPosicionActual] = React.useState(1);

  const {
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const sigueinte = () => {
    setPosicionActual(posicionActual+1);
  };

  const atras = () => {
    setPosicionActual(posicionActual-1);
  };

  return (
    <ContainerForm display={props.toggle}>
      <form
        style={{
          display: "grid",
          gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
          gap: 5,
          marginTop: 20,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {posicionActual == 1 && <InformacionPersonal nextPart={sigueinte}/>}
          {posicionActual == 2 && <InformacionEmpresas backPart={atras}/>}
        </div>
      </form>
    </ContainerForm>
  );
}
