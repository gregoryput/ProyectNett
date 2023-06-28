import {
  ContainerForm,
  InputFor,
  LabelFor,
  Option,
  Select,
  Button,
} from "../../../components";

import { useForm, useFieldArray } from "react-hook-form";

export default function InformacionEmpresas(props) {
  const { register, handleSubmit, control } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "Empresas",
  });

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
        <h3>Información de empresas </h3>
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
        {fields.map((field, index) => (
          <div key={field.id}>
            <LabelFor>
              RNC
              <InputFor
                {...register(`items.${index}.RNC`)}
                {...register("example")}
                placeholder="RNC "
              />
            </LabelFor>
          </div>
        ))}
        <br />
        <button type="button" onClick={() => append({})}>
          Agregar
        </button>

        <br />
        <button type="button" onClick={props.nextPart}>
          Siguiente
        </button>
        <button type="button" onClick={props.backPart}>
          Atras
        </button>
      </form>
    </ContainerForm>
  );
}
