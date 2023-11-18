import {
  Box1,
  ColumnItem,
  ColumnItem2,
  ColumnItem3,
  Container,
  ContainerDetail,
  FlexContainer,
  FlexibleBox,
  MainContainer,
  RowItem,
  ViewContainerPages,
} from "../../components";



import Seccion from "./components/Seccion";
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

import TareasComponent from "./components/Operar/TareasComponent";
import FormularioProyecto from "./components/FormularioProyecto";

import { useState } from "react";
import { Colores } from "../../components/GlobalColor";


export default function Proyecto() {
  const [seeState, setSee] = useState(true);
  const [formSee, setFormSee] = useState(false);

  return (
    <ViewContainerPages>
      <FlexContainer>
        <Box1>
          <Seccion
            seeState={seeState}
            setSee={setSee}
            setFormSee={setFormSee}
          />
          <ViewsList
            seeState={seeState}
            setSee={setSee}
            setFormSee={setFormSee}
            formSee={formSee}
          />
        </Box1>
        <FlexibleBox>
          <ContainerDetail
            style={{
              margin: "0",
              padding: 0,
              overflow: `${formSee == true ? "auto" : "none"}`,
              height: 900,
            }}
          >
            {formSee == false ? (
              <>
                {" "}
                <RowItem>
                  <ProgressTarea />
                </RowItem>
              </>
            ) : (
              <>
                <Container
                  style={{
                    marginInline: 5,
                    marginTop: 0,
                    marginBottom: 5,
                    height: 70,
                    padding: 20,
                    alignItems: "center",
                    backgroundColor: `${Colores.AzulMar}`,
                    color: `${Colores.Blanco}`,
                  }}
                >
                  <h2>Creacion de proyecto</h2>
                </Container>
              </>
            )}
            <MainContainer>
              {formSee == true ? (
                <>
                  <FormularioProyecto />
                </>
              ) : seeState == true ? (
                <>
                  <ColumnItem2>
                    <Servicio />
                    <DescripcionProyecto />
                    <TareasProyecto />
                  </ColumnItem2>

                  <ColumnItem>
                    <PersonalAsignado />
                    <Tiempo />
                    <Detalle />
                  </ColumnItem>
                  <ColumnItem>
                    <Productos />
                    <Presupuesto />
                    <Pagos />
                  </ColumnItem>
                </>
              ) : (
                <>
                  <ColumnItem3>
                    <TareasComponent />
                  </ColumnItem3>
                  <ColumnItem>
                    <PersonalAsignado />
                    <Tiempo />
                  </ColumnItem>
                </>
              )}
            </MainContainer>
          </ContainerDetail>
        </FlexibleBox>
      </FlexContainer>


     

    </ViewContainerPages>
  );
}
