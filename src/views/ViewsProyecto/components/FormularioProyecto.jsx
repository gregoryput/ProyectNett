import { DatePicker, Form, Input } from "antd";
import { ButtonIcon, Container, ContainerDetail } from "../../../components";

import { IoPersonAddOutline } from "react-icons/io5";

import { useEffect } from "react";

import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { TreeSelect } from "antd";
import ComponentTarea from "./FormProyecto/TareaComponent";
import ProductoComponent from "./FormProyecto/ProductoComponent";
import { useGetClientsQuery } from "../../../redux/Api/clientsApi";
import ModalCliente from "./Modales/ModalCliente";
const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Asesoría de Personal en el Departamento TIC",
    value: "1",
    key: "1",
  },
  {
    title: "Soporte Técnico Remoto y en Sitio",
    value: "2",
    key: "2",
  },
  {
    title: "Optimización y Seguridad de Redes",
    value: "3",
    key: "3",
  },
  {
    title: "Documentación y Gestión de Infraestructura",
    value: "4",
    key: "4",
  },
  {
    title: "Virtualización, Cluster, NAS",
    value: "5",
    key: "5",
  },
  {
    title: "Garantía de Transferencia de conocimiento",
    value: "6",
    key: "6",
  },
];

export default function FormularioProyecto() {
  const [form] = Form.useForm();

  //esto es de treeselect de tipo de servicio
  const [value, setValue] = useState([]);
  const onChange = (newValue) => {
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Selecionar los servicios",
    style: {
      width: "100%",
    },
  };

  /// codigo para agregar cliente

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState({});
  const [selectState, setSelectState] = useState({});
  const [selectStateProducto, setSelectStateProducto] = useState([]);

  const [tarea, setTarea] = useState([]);

  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    // isLoading: isLoadingClients,
  } = useGetClientsQuery("");

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = clientesData?.result.filter((item) =>
      item.nombres.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };

  useEffect(() => {
    if (clientesData?.result !== undefined && isClientsSuccess) {
      setFilteredData(clientesData?.result);
    }
  }, [clientesData, setFilteredData, isClientsSuccess]);

  const ClienteInput = (item) => {
    CloseModalCliente();
    setSelectState(item.idCliente);
    form.setFieldsValue({
      cliente: item.nombres.toLowerCase(),
      // Puedes agregar más campos según sea necesario
    });
  };

  const OpenModalCliente = () => {
    setIsModalOpen(true);
  };

  const CloseModalCliente = () => {
    setIsModalOpen(false);
  };

  //guardar formulario
  const onFinish = (values) => {
    // Manejar el envío del formulario aquí
    console.log("Valores del formulario:", values);
  };

  return (
    <div style={{ width: "100%", marginTop: 0, margin: 0 }}>
      <ContainerDetail
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Form
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          form={form}
          onFinish={onFinish}
        >
          <Container
            style={{
              marginInline: 5,
              marginBlock: 5,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 20,
            }}
          >
            <h3>Servicios</h3>
            <div style={{ width: 400 }}>
              <TreeSelect {...tProps} />
            </div>
          </Container>
          <Container style={{ marginInline: 5, marginBlock: 5, width: "100%" }}>
            <h3>Informacion basica</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                label={<strong>Nombre:</strong>}
                style={{ width: 200, marginTop: 30 }}
                name={"nombre"}
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar el nombre del producto",
                  },
                  {
                    max: 55,
                    message: "55 caracteres como máximo",
                  },
                  {
                    min: 3,
                    message: "30 caracteres como minimo",
                  },
                ]}
              >
                <Input placeholder="Ingrese el nombre" />
              </Form.Item>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Form.Item
                  label={<strong>Cliente:</strong>}
                  style={{ width: 200, marginTop: 30 }}
                  name={"cliente"}
                  rules={[
                    {
                      required: true,
                      message: "Seleccionar cliente",
                    },
                  ]}
                >
                  <Input
                    readOnly
                    style={{ backgroundColor: "white" }}
                    placeholder="Seleccionar cliente"
                  />
                </Form.Item>
                <ButtonIcon
                  onClick={() => OpenModalCliente()}
                  style={{ width: 40, marginLeft: 10, marginTop: 37 }}
                  type="button"
                >
                  <IoPersonAddOutline size={18} color="black" />
                </ButtonIcon>
              </div>

              <Form.Item
                label={<strong>Fecha de inicio:</strong>}
                style={{ width: 300, marginTop: 30 }}
                name={"fecha"}
                rules={[
                  {
                    required: true,
                    message: "Debe ingresar fecha ",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </div>

            <Form.Item
              label={<strong>Descripcion:</strong>}
              style={{ width: 300, marginRight: 10 }}
              name={"Descripcion"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el nombre del producto",
                },
                {
                  max: 55,
                  message: "55 caracteres como máximo",
                },
                {
                  min: 3,
                  message: "30 caracteres como minimo",
                },
              ]}
            >
              <TextArea placeholder="Ingres una descripcion" />
            </Form.Item>
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <ProductoComponent
              setSelectStateProducto={setSelectStateProducto}
              selectStateProducto={selectStateProducto}
            />
          </Container>

          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <ComponentTarea setTarea={setTarea} tarea={tarea} value={value} />
          </Container>
          <Container style={{ marginBlock: 5, marginInline: 5, width: "100%" }}>
            <h3>Equipo</h3>
          </Container>
        </Form>
      </ContainerDetail>
      {/* modal de cliente  */}
      <ModalCliente
        CloseModalCliente={CloseModalCliente}
        OpenModalCliente={OpenModalCliente}
        llenarCampo={ClienteInput}
        handleSearch={handleSearch}
        isModalOpen={isModalOpen}
        filteredData={filteredData}
        selectState={selectState}
      />
    </div>
  );
}
