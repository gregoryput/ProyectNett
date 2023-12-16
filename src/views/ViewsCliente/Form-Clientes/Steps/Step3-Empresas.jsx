import { Button } from "antd";
import { ContainerFormAntd } from "../../../../components";

import PropTypes from "prop-types"; // Importa PropTypes

export default function Step3Empresas(props) {
  // Definir PropTypes para las props del componente
  Step3Empresas.propTypes = {
    setItemsSteps: PropTypes.array.isRequired,
    toggle: PropTypes.bool.isRequired,
    setToggle: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
  };
  console.log(props);

  return (
    <ContainerFormAntd>
      <h1>Info de empresas</h1>
      <div>
        <Button onClick={() => props.onSuccess({ data: "data" }, 3)}>
          Siguiente
        </Button>
        <Button onClick={() => props.onBack({ data: "data" }, 3)}>Atras</Button>
      </div>
    </ContainerFormAntd>
  );
}
