import { Row } from "antd";
import {
  ButtonIcon,
  ButtonIconBorder,
  ButtonIconMenuTalba,
  Container,
  ContainerDetail,
  ContainerList,
  ViewContainerPages,
} from "../../components";
import { IoReturnDownBackOutline, IoClipboardOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompaniesByIdClienteQuery } from "../../redux/Api/companiesApi";
import { useGetPersonalInfoQuery } from "../../redux/Api/clientsApi";
import { useEffect } from "react";
import { useState } from "react";

export function Detail() {
  let navegation = useNavigate();
  const valor = useParams();

  // Traer las empresas solo cuando se este en modo editar:
  const {
    data: companiesClientData,
    isSuccess: isCompaniesClientSuccess,
    isError: isErrorCompanies,
    isLoading: isLoadingCompaniesClient,
  } = useGetCompaniesByIdClienteQuery({
    clienteId: parseInt(valor.clienteId, 10),
    estadoId: 0,
  });

  const {
    data: personalInfoData,
    isSuccess: isPersonalInfoSuccess,
    isError: isErrorpersonalInfo,
    isLoading: isLoadingPersonalInfo,
  } = useGetPersonalInfoQuery(parseInt(valor.clienteId, 10));

  const [dataState, setDataState] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const maxCharacters = 30;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderDireccion = (direccion) => {
    if (direccion.length > maxCharacters && !isExpanded) {
      return `${direccion.slice(0, maxCharacters)}...`;
    }
    return direccion;
  };

  useEffect(() => {
    if (companiesClientData) {
      if (companiesClientData.isSuccess) {
        setDataState(companiesClientData.result);
      }
    }
  }, [companiesClientData, setDataState]);

  return (
    <ViewContainerPages className="animate__animated animate__fadeIn">
      <ButtonIcon
        style={{ marginLeft: 10 }}
        onClick={() => {
          navegation("/cliente");
        }}
      >
        <IoReturnDownBackOutline size={25} />
        <p style={{ marginLeft: 5, fontSize: 15 }}>Regresar</p>
      </ButtonIcon>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginInline: 10,
          alignItems: "center",
        }}
      >
        <h2 style={{ marginLeft: 15, marginTop: 20, marginBottom: 20 }}>
          Datos del cliente
        </h2>
        <ButtonIconBorder>
          <IoClipboardOutline
            size={18}
            style={{ marginLeft: 5, marginRight: 5 }}
          />
          Editar
        </ButtonIconBorder>
      </div>

      <div style={{ display: "flex" }}>
        <Container
          style={{
            marginInline: 15,
            minWidthwidth: 400,
            maxWidth: 600,
            borderRadius: 12,
          }}
        >
          <h3 style={{ marginLeft: 10, marginBottom: 20 }}>
            Información personal{" "}
          </h3>
          <div style={{ borderRadius: 12, padding: 5 }}>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Nombres:</b>
              </p>
              <p>{personalInfoData?.result.nombres}</p>
            </Row>

            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Apellidos:</b>
              </p>
              <p>{personalInfoData?.result.nombres}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Cédula:</b>
              </p>
              <p>{personalInfoData?.result.cedula}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Edad:</b>
              </p>
              <p>{personalInfoData?.result.edad}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Sexo:</b>
              </p>
              <p>{personalInfoData?.result.sexoNombre}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Pais:</b>
              </p>
              <p>{personalInfoData?.result.paisNombre}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Ciudad:</b>
              </p>
              <p>{personalInfoData?.result.ciudadNombre}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Fecha de nacimiento:</b>
              </p>
              <p>{personalInfoData?.result.fechaDeNacimiento}</p>
            </Row>
          </div>

          <h3 style={{ marginLeft: 10, marginBottom: 10, marginTop: 10 }}>
            Información de contacto
          </h3>
          <div style={{ borderRadius: 12, padding: 5 }}>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Correo:</b>
              </p>
              <p>{personalInfoData?.result?.correo}</p>
            </Row>

            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Telefono:</b>
              </p>
              <p>{personalInfoData?.result.telefono1}</p>
            </Row>

            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Telefono 2:</b>
              </p>
              <p>{personalInfoData?.result.telefono2}</p>
            </Row>
          </div>
        </Container>
        {/* componente de lista de empresa  */}
        <Container
          style={{
            padding: 10,
            marginInline: 10,
            borderRadius: 12,
          }}
        >
          <h3 style={{ marginLeft: 20, marginTop: 15, marginBottom: 20 }}>
            Datos de las empresas
          </h3>
          <ContainerDetail style={{ overflowY: "visible", maxHeight: 500 }}>
            {dataState.length > 0 ? (
              dataState.map((item, index) => (
                <ContainerList key={item.idEmpresa}>
                  <h3 style={{ marginBottom: 10 }}>Empresa {index + 1} </h3>
                  <div style={{ display: "flex", flexFlow: "wrap" }}>
                    <div style={{ marginInline: 15 }}>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Nombre: </b>
                        <p>{item.nombreEmpresa}</p>
                      </Row>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Rnc: </b>
                        <p>{item.rnc}</p>
                      </Row>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Correo: </b>
                        <p>{item.correo}</p>
                      </Row>
                    </div>

                    <div style={{ marginLeft: 15 }}>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Telefono: </b>
                        <p style={{ maxWidth: 200 }}>{item.teléfono1}</p>
                      </Row>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Telefono: </b>
                        <p>{item.teléfono2}</p>
                      </Row>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Dirección: </b>
                        <p>
                          {" "}
                          {renderDireccion(item.dirección)}
                          {item.dirección.length > maxCharacters && (
                            <ButtonIcon onClick={toggleExpand}>
                              ver más
                            </ButtonIcon>
                          )}
                        </p>
                      </Row>
                    </div>

                    <div style={{ marginLeft: 15 }}>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 3 }}>Ciudad: </b>
                        <p>{item.idCiudad}</p>
                      </Row>

                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 5 }}>Pais: </b>
                        <p>{item.idPais}</p>
                      </Row>
                      <Row style={{ marginBlock: 10 }}>
                        <b style={{ marginRight: 5 }}>Sitio web: </b>
                        <a href={item.sitioWeb}>{item.sitioWeb}</a>
                      </Row>
                    </div>
                  </div>
                </ContainerList>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                <p>Sin registro de empresa</p>
              </div>
            )}
          </ContainerDetail>
        </Container>
      </div>
      <Container style={{ width: 600, marginLeft: 15 }}>
        <h3>Proyecto vinculado</h3>
        <ContainerDetail
          style={{ overflowY: "visible", maxHeight: 160, padding: 5 }}
        >
          <ButtonIconMenuTalba style={{ width: 500, padding: 10, margin: 10 }}>
            <div style={{ paddingInline: 10 }}>
              <Row style={{ marginBlock: 4 }}>
                <p style={{ marginRight: 3 }}>
                  <b>Proyecto: </b>
                </p>
                <p>Terminacion de uno servidores</p>
              </Row>

              <Row>
                <p style={{ marginRight: 3 }}>
                  <b>Estado:</b>
                </p>
                <p>En proceso</p>
              </Row>
            </div>
          </ButtonIconMenuTalba>
        </ContainerDetail>
      </Container>
    </ViewContainerPages>
  );
}
