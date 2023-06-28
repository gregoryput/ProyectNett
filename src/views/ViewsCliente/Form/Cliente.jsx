import { useState } from "react";
import { Space, Table } from "antd";
import {
  ContainerButton,
  ContainerForm,
  DivAnimetor,
  InputFor,
  LabelFor,
  Option,
  Select,
  ViewContainerPages,
} from "../../components";

import { IoChevronDownSharp, IoCloseCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export default function Cliente() {
  const [toggle, setToggle] = useState(true);

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // const handleChange = (event) => {
  //   // console.log('Selected option:', event.target.value);
  // };

  return (
    <ViewContainerPages>
      <ContainerButton onClick={() => setToggle(!toggle)}>
        <h4>Crear nuevo cliente</h4>
        <DivAnimetor>
          <IoChevronDownSharp style={{ width: 20, height: 20 }} />
        </DivAnimetor>
      </ContainerButton>

      <ContainerForm display={toggle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 50,
            borderBottom: "1px solid #cecece ",
          }}
        >
          <h3>Informacion personal </h3>
        </div>

        <form
          style={{
            display: "grid",
            gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
            gap: 5,
            marginTop: 20,
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* register your input into the hook by invoking the "register" function */}
          <LabelFor>
            {" "}
            Nombre
            <InputFor {...register("example")} placeholder="Nombre" />
          </LabelFor>

          <LabelFor>
            Apellido
            <InputFor {...register("example")} placeholder="Apellido " />
          </LabelFor>

          <LabelFor>
            Telefono 1
            <InputFor {...register("example")} placeholder="Telefono 1 " />
          </LabelFor>

          <LabelFor>
            Telefono 2 opcional
            <InputFor {...register("example")} placeholder="Telefono 2 " />
          </LabelFor>

          <LabelFor>
            {" "}
            Direccion
            <InputFor {...register("example")} placeholder="Direccion " />
          </LabelFor>

          <LabelFor>
            {" "}
            Correo
            <InputFor {...register("example")} placeholder="Correo " />
          </LabelFor>

          <LabelFor>
            {" "}
            Celular
            <InputFor {...register("example")} placeholder="Celular " />
          </LabelFor>

          <LabelFor>
            {" "}
            Edad
            <InputFor {...register("example")} placeholder="Edad " />
          </LabelFor>

          <LabelFor>
            {" "}
            Sexo
            <Select>
              {options.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </LabelFor>

          <LabelFor>
            {" "}
            Pais
            <Select>
              {options.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </LabelFor>

          <LabelFor>
            {" "}
            Ciudad
            <Select>
              {options.map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </LabelFor>
        </form>
      </ContainerForm>

      <Tabla />
    </ViewContainerPages>
  );
}

const { Column } = Table;

function Tabla() {
  const data = [
    {
      key: "1",
      Nombre: "John",
      Apellido: "Brown",
      "Telefono 1": "123456789",
      "Telefono 2": "987654321", // Opcional
      Direccion: "New York No. 1 Lake Park",
      Correo: "john@example.com",
      Celular: "9876543210",
      Edad: 32,
      Sexo: "Masculino",
      Pais: "Estados Unidos",
      Ciudad: "Nueva York",
    },
    {
      key: "2",
      Nombre: "Jim",
      Apellido: "Green",
      "Telefono 1": "987654321",
      "Telefono 2": "", // Opcional (dejar en blanco)
      Direccion: "London No. 1 Lake Park",
      Correo: "jim@example.com",
      Celular: "1234567890",
      Edad: 42,
      Sexo: "Masculino",
      Pais: "Reino Unido",
      Ciudad: "Londres",
    },
    {
      key: "3",
      Nombre: "Joe",
      Apellido: "Black",
      "Telefono 1": "555555555",
      "Telefono 2": "999999999", // Opcional
      Direccion: "Sydney No. 1 Lake Park",
      Correo: "joe@example.com",
      Celular: "1231231234",
      Edad: 32,
      Sexo: "Masculino",
      Pais: "Australia",
      Ciudad: "Sídney",
    },
  ];

  return (
    <div
      style={{
        margin: 30,
        border: "1px solid #e2e2e2",
        padding: 20,
        borderRadius: 12,
      }}
    >
      <Table dataSource={data}>
        <Column title="Nombre" dataIndex="Nombre" key="Nombre" />
        <Column title="Apellido" dataIndex="Apellido" key="Apellido" />
        <Column title="Teléfono 1" dataIndex="Telefono 1" key="Telefono 1" />
        <Column title="Correo" dataIndex="Correo" key="Correo" />
        <Column title="Celular" dataIndex="Celular" key="Celular" />

        <Column
          title="Accion"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <button>Invite {record.lastName}</button>
              <button>
                <IoCloseCircleOutline />
              </button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
