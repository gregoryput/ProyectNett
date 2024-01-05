import { useState } from "react";
import InformacionPerfil from "./components/InformacionPerfil";
import InformacionPersonal from "./components/InformacionPersonal";
import { Container, Div, DivContainerPage, ViewContainerPages2 } from "../../components";
import FormPasword from "./components/FormPasword";
import { useGetPerfilQuery } from "../../redux/Api/configPerfilApi";

function ConfiguracionPerfil() {
  const [toggle, setToggle] = useState(false);
  const { data, isLoading } = useGetPerfilQuery();

  return (
    <ViewContainerPages2>
      {data !== undefined ? (
        <>
          <h2 style={{ marginLeft: 15, marginBottom: 40 }}>
            {" "}
            Configuración de perfil
          </h2>
          {!isLoading ? (
            <InformacionPerfil
              toggle={toggle}
              setToggle={setToggle}
              data={data}
            />
          ) : null}

          {toggle ? (
            <FormPasword toggle={toggle} setToggle={setToggle} />
          ) : null}
          {!isLoading ? <InformacionPersonal data={data} /> : null}
        </>
      ) : (
        <Container>
          <p> no existe dato de este usuario </p>
        </Container>
      )}
    </ViewContainerPages2>
  );
}

export default ConfiguracionPerfil;
