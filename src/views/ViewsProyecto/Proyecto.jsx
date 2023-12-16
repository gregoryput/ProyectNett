import Seccion from "./components/Seccion";
import DescripcionProyecto from "./components/Gestionar/DescripcionProyecto";
import Detalle from "./components/Gestionar/Detalle";
import Pagos from "./components/Gestionar/Pagos";
import PersonalAsignado from "./components/Gestionar/PersonalAsignado";
import Presupuesto from "./components/Gestionar/Presupuesto";
import Productos from "./components/Gestionar/Productos";
import ProgressTarea from "./components/Gestionar/ProgressTarea";
import InfoCliente from "./components/Gestionar/InfoCliente";
import TareasProyecto from "./components/Gestionar/TareasProyecto";
import Tiempo from "./components/Gestionar/Tiempo";
import ViewsList from "./components/ViewsList";
import { Modal, Table } from "antd";
import TareasComponent from "./components/Operar/TareasComponent";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Colores } from "../../components/GlobalColor";
import FormularioProyecto from "./components/FormProyecto/FormularioProyecto";
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
  SpinnerTables,
  ViewContainerPages2,
} from "../../components";
import { useGetProyectoCompletoQuery } from "../../redux/Api/proyectoApi";
import { JwtUtils } from "../../utils";

export default function Proyecto() {
  const token = localStorage.getItem("token");
  const userRol = JwtUtils.getRolesByToken(token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [seeState, setSee] = useState(true);
  const [formSee, setFormSee] = useState(false);
  const [selectProyecto, setSelectProyecto] = useState(false);
  const [proyecto, setProyecto] = useState([]);
  const [allData, setAllData] = useState([]);

  const OpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };

  // Llama a la consulta usando el hook generado
  const { data, isSuccess, isLoading } =
    useGetProyectoCompletoQuery(selectProyecto);
    console.log(proyecto);

  useEffect(() => {
    if (data?.Result !== undefined && isSuccess) {
      setProyecto(data?.Result);
    }
    if (userRol == "Asistente") {
      setSee(false);
    }
  }, [data, isSuccess, proyecto]);

  return (
    <ViewContainerPages2>
      <FlexContainer>
        <Box1>
          <Seccion
            seeState={seeState}
            setSee={setSee}
            setFormSee={setFormSee}
            selectProyecto={selectProyecto}
            setSelectProyecto={setSelectProyecto}
            proyecto={proyecto}
          />
          <ViewsList
            seeState={seeState}
            setSee={setSee}
            setFormSee={setFormSee}
            formSee={formSee}
            selectProyecto={selectProyecto}
            setSelectProyecto={setSelectProyecto}
            allData={allData}
            setAllData={setAllData}
          />
        </Box1>
        {isLoading == true ? (
          <>
            <SpinnerTables />
          </>
        ) : (
          <>
            <FlexibleBox style={{ width: "90vw" }}>
              <ContainerDetail
                style={{
                  margin: "0",
                  padding: 0,
                  height: 900,
                  overflowY: "auto",
                }}
              >
                {selectProyecto == false && formSee == false ? (
                  <>
                    <Container
                      style={{
                        backgroundColor: "white",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 0,
                        borderRadius: 12,
                        marginBlock: 0,
                        marginInline: 5,
                        height: "87vh",
                        gap: 5,
                      }}
                    >
                      <IoAlertCircleOutline size={30} />
                      <h3>No hay proyecto seleccionado </h3>
                    </Container>
                  </>
                ) : (
                  <>
                    {formSee == false ? (
                      <>
                        {" "}
                        <RowItem>
                          <ProgressTarea proyecto={proyecto} />
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
                            <InfoCliente proyecto={proyecto} />
                            <DescripcionProyecto proyecto={proyecto} />
                            <TareasProyecto proyecto={proyecto} />
                          </ColumnItem2>

                          <ColumnItem>
                            <PersonalAsignado proyecto={proyecto} />
                            <Tiempo proyecto={proyecto[0]} />
                            <Detalle OpenModal={OpenModal} />
                          </ColumnItem>
                          <ColumnItem>
                            <Productos proyecto={proyecto} />
                            <Presupuesto proyecto={proyecto} />
                            <Pagos />
                          </ColumnItem>
                        </>
                      ) : (
                        <>
                          <ColumnItem3>
                            <TareasComponent
                              proyecto={proyecto}
                              setSelectProyecto={setSelectProyecto}
                            />
                          </ColumnItem3>
                          <ColumnItem>
                            <PersonalAsignado proyecto={proyecto} />
                            <Tiempo proyecto={proyecto[0]} />
                          </ColumnItem>
                        </>
                      )}
                    </MainContainer>
                  </>
                )}
              </ContainerDetail>
            </FlexibleBox>
          </>
        )}
      </FlexContainer>
      <ProyectoModal
        proyecto={proyecto}
        OpenModal={OpenModal}
        CloseModal={CloseModal}
        isModalOpen={isModalOpen}
      />
    </ViewContainerPages2>
  );
}

const ProyectoModal = ({ proyecto, OpenModal, CloseModal, isModalOpen }) => {
  // Columnas para la tabla de proyectos
  const columnsProyectos = [
    {
      title: "Nombre Entidad",
      dataIndex: "NombreEntidad",
      key: "NombreEntidad",
    },
    {
      title: "Tipo Entidad",
      dataIndex: "NombreTipoEntidad",
      key: "NombreTipoEntidad",
    },
    {
      title: "Nombre Proyecto",
      dataIndex: "NombreProyecto",
      key: "NombreProyecto",
    },
    {
      title: "Fecha Inicio",
      dataIndex: "FechaDeInicio",
      key: "FechaDeInicio",
    },
    {
      title: "Fecha Fin",
      dataIndex: "FechaDeFinalizacion",
      key: "FechaDeFinalizacion",
    },
    {
      title: "Presupuesto Acordado",
      dataIndex: "PresupuestoAcordado",
      key: "PresupuestoAcordado",
    },
    {
      title: "Estado Proyecto",
      dataIndex: "EstadoProyecto",
      key: "EstadoProyecto",
    },
    {
      title: "Monto Incial",
      dataIndex: "MontoInicial",
      key: "MontoInicial",
    },
    // Agregar más columnas según tus necesidades
  ];

  // Columnas para la tabla de tareas
  const columnsTareas = [
    {
      title: "Nombre Tarea",
      dataIndex: "NombreTarea",
      key: "NombreTarea",
    },
    {
      title: "Fecha Inicio",
      dataIndex: "FechaInicio",
      key: "FechaInicio",
    },
    {
      title: "Fecha Finalización",
      dataIndex: "FechaFinalizacion",
      key: "FechaFinalizacion",
    },
    {
      title: "Estado Tarea",
      dataIndex: "EstadoTarea",
      key: "EstadoTarea",
    },
    {
      title: "Prioridad",
      dataIndex: "NombrePrioridad",
      key: "NombrePrioridad",
    },
    {
      title: "Costo Total",
      dataIndex: "CostoTotal",
      key: "CostoTotal",
    },
    // Agregar más columnas según tus necesidades
  ];

  // Columnas para la tabla de productos
  const columnsProductos = [
    {
      title: "Nombre Producto",
      dataIndex: "NombreProducto",
      key: "NombreProducto",
    },
    {
      title: "Cantidad",
      dataIndex: "Cantidad",
      key: "Cantidad",
    },
    {
      title: "Precio Venta",
      dataIndex: "PrecioVenta",
      key: "PrecioVenta",
    },
    {
      title: "Subtotal",
      dataIndex: "Subtotal",
      key: "Subtotal",
    },
    // Agregar más columnas según tus necesidades
  ];

  // Columnas para la tabla de empleados
  const columnsEmpleados = [
    {
      title: "Nombre Empleado",
      dataIndex: "NombreEmpleado",
      key: "NombreEmpleado",
    },
    {
      title: "Responsabilidad",
      dataIndex: "ResponsabilidadNombre",
      key: "ResponsabilidadNombre",
    },
    // Agregar más columnas según tus necesidades
  ];

  // Columnas para la tabla de gastos
  const columnsGastos = [
    {
      title: "Descripción Gasto",
      dataIndex: "DescripcionGasto",
      key: "DescripcionGasto",
    },
    {
      title: "Monto Gasto",
      dataIndex: "MontoGasto",
      key: "MontoGasto",
    },
    // Agregar más columnas según tus necesidades
  ];
  return (
    <Modal
      open={isModalOpen}
      footer={null}
      width={1000}
      onCancel={CloseModal}
      X
    >
      <Container>
        <Table
          dataSource={proyecto}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          size="middle"
          columns={columnsProyectos}
        />
        <br />

        <Table
          dataSource={proyecto[0]?.TareasProyecto}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          size="middle"
          columns={columnsTareas}
        />
        <br />

        <Table
          dataSource={proyecto[0]?.ProductosProyecto}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          size="middle"
          columns={columnsProductos}
        />
        <br />

        <Table
          dataSource={proyecto[0]?.EmpleadosProyecto}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          size="middle"
          columns={columnsEmpleados}
        />
        <br />
        <Table
          dataSource={proyecto[0]?.GastoProyecto}
          pagination={false} // Desactiva la paginación si no deseas que aparezca
          size="middle"
          columns={columnsGastos}
        />
      </Container>
      {/* Agregar más secciones según tus necesidades */}
    </Modal>
  );
};
