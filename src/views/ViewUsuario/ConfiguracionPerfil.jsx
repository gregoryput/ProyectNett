import { useState } from "react";
import InformacionPerfil from "./components/InformacionPerfil";
import InformacionPersonal from "./components/InformacionPersonal";
import { DivContainerPage, ViewContainerPages } from "../../components";
import FormPasword from "./components/FormPasword";
import { useGetPerfilQuery } from "../../redux/Api/configPerfilApi";

function ConfiguracionPerfil() {
  const [toggle, setToggle] = useState(false);
  const { data, isLoading } = useGetPerfilQuery();

  return (
    <ViewContainerPages>
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
        <DivContainerPage>
          <p> no existe dato de este usuario </p>
        </DivContainerPage>
      )}
    </ViewContainerPages>
  );
}

export default ConfiguracionPerfil;
