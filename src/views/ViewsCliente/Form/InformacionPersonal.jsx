import {
  ContainerForm,
  InputFor,
  LabelFor,
  Option,
  Select,
  Button,
} from "../../../components";

import { useForm } from "react-hook-form";

export default function InformacionPersonal(props) {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }, 
  ];

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
    <ContainerForm>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 50,
          borderBottom: "1px solid #cecece ",
        }}
      >
        <h3>Información personal </h3>
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
        <br/>
        <button type="button" onClick={props.nextPart}>Siguiente</button>
      </form>
    </ContainerForm>
  );
}
