import { useForm } from "react-hook-form";
import { Container, FormContainer, } from "../../../components";

export default function FormularioProyecto() {
  const {
    register,
    formState: { errors },
    // handleSubmit,
    // getValues,
    // setValue,
    // trigger,
    // reset,
    // setError,
  } = useForm();
  return (
   
   <div style={{ width: "100%", height: "100%", marginTop: 0 }}>
      <Container style={{ marginTop: 0, marginInline: 5, paddingBlock: 19 }}>
        <h2>Creacion de proyecto</h2>
      </Container>
      <Container style={{ marginTop: 0, marginInline: 5, marginBlock: 5 }}>
        <FormContainer>
          <h3>Informacion basica</h3>

         
        </FormContainer>
      </Container>
    </div>
  );
}
