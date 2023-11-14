import { useState } from "react";
import { BtnNavPro, Container, ViewContainerPages } from "../../components";
import DescripcionProyecto from "./components/Gestionar/DescripcionProyecto";
import Detalle from "./components/Gestionar/Detalle";
import Pagos from "./components/Gestionar/Pagos";
import PersonalAsignado from "./components/Gestionar/PersonalAsignado";
import Presupuesto from "./components/Gestionar/Presupuesto";
import Productos from "./components/Gestionar/Productos";
import ProgressTarea from "./components/Gestionar/ProgressTarea";
import Servicio from "./components/Gestionar/Servicio";
import TareasProyecto from "./components/Gestionar/TareasProyecto";
import Tiempo from "./components/Gestionar/Tiempo";
import ViewsList from "./components/ViewsList";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import TareasComponent from "./components/Operar/TareasComponent";

/// tama;o de la ventada
// const anchoPantalla = window.innerWidth;
// const altoPantalla = window.innerHeight;

export default function Proyecto() {
  const [seeState, setSee] = useState(true);

  return (
    <ViewContainerPages>
      <div style={{ width: "100%", display: "flex" }}>
        <div style={{ flexDirection: "column", marginRight: 5 }}>
          <Seccion seeState={seeState} setSee={setSee} />
          <ViewsList />
        </div>
        {seeState === true ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 5,
                width: "85%",
              }}
            >
              <ProgressTarea />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>
                  <Servicio />
                  <DescripcionProyecto />
                  <TareasProyecto />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                  }}
                >
                  <PersonalAsignado />
                  <Tiempo />
                  <Detalle />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                  }}
                >
                  <Productos />
                  <Presupuesto />
                  <Pagos />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
          {/* aqui va control  */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: 5,
                width: "85%",
              }}
            >
              <ProgressTarea />

              <div style={{ display: "flex", flexDirection: "row" }}>
                <TareasComponent />
                <div style={{ width: "40%" }}>
                  <PersonalAsignado />
                  <Tiempo />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ViewContainerPages>
  );
}

function Seccion({ setSee, seeState }) {
  Seccion.propTypes = {
    setSee: PropTypes.func.isRequired,
    seeState: PropTypes.func.isRequired,
  };

  return (
    <Container
      style={{
        marginTop: 0,
        marginLeft: 10,
        marginRight: 5,
        padding: 0,
        height: 70,
      }}
    >
      <div>
        <BtnNavPro
          color={seeState == true ? true : false}
          style={{ width: "50%", margin: 0 }}
          onClick={() => {
            setSee(true);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Presupuesto</span>
            <AiOutlineDollarCircle size={25} />
          </div>
        </BtnNavPro>
        <BtnNavPro
          color={seeState == false ? true : false}
          style={{ width: "50%", margin: 0 }}
          onClick={() => {
            setSee(false);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Control</span>
            <IoGameControllerOutline size={25} />
          </div>
        </BtnNavPro>
      </div>
    </Container>
  );
}
