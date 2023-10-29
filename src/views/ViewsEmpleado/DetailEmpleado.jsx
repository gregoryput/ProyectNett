import { Row } from "antd";
import {
  ButtonIcon,
  ButtonIconBorder,
  Container,
  ContainerList,
  ViewContainerPages,
} from "../../components";
import { IoReturnDownBackOutline, IoClipboardOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPersonalInfoQuery } from "../../redux/Api/employeeApi";
import { useEffect, useState } from "react";

export function DetailEmpleado() {
  let navegation = useNavigate();
  const valor = useParams();

  // Traer las empresas solo cuando se este en modo editar:

  const { data: data, isSuccess } = useGetPersonalInfoQuery(
    parseInt(valor.IdEmpleado, 10),{refetchOnMountOrArgChange: true, pollingInterval:3000}
  );
  const [dataCargo, setDataCargo] = useState(null);
  useEffect(() => {
    if (isSuccess && data !== undefined) {
      setDataCargo(data?.result.cargoEmpleadoDTOs);
    }
  }, [setDataCargo, isSuccess, data]);

  return (
    <ViewContainerPages className="animate__animated animate__fadeIn">
      <ButtonIcon
        style={{ marginLeft: 10 }}
        onClick={() => {
          navegation("/empleado");
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
          Datos del Empleado
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
            maxWidth: 700,
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
              <p>{data?.result.nombres}</p>
            </Row>

            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Apellidos:</b>
              </p>
              <p>{data?.result.nombres}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Cédula:</b>
              </p>
              <p>{data?.result.cedula}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Edad:</b>
              </p>
              <p>{data?.result.edad}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Sexo:</b>
              </p>
              <p>{data?.result.sexoNombre}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Pais:</b>
              </p>
              <p>{data?.result.paisNombre}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Ciudad:</b>
              </p>
              <p>{data?.result.ciudadNombre}</p>
            </Row>
            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Fecha de nacimiento:</b>
              </p>
              <p>{data?.result.fechaDeNacimiento}</p>
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
              <p>{data?.result?.correo}</p>
            </Row>

            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Telefono:</b>
              </p>
              <p>{data?.result.telefono1}</p>
            </Row>

            <Row style={{ justifyContent: "space-between", margin: 10 }}>
              <p>
                <b>Telefono 2:</b>
              </p>
              <p>{data?.result.telefono2}</p>
            </Row>
          </div>
        </Container>
        <Container>
          <h3 style={{ marginLeft: 10, marginBottom: 20 }}>
            Cargos en la empresa{" "}
          </h3>

          {data && dataCargo != null ?
          (dataCargo.map((item, index) => 
            <ContainerList key={index}>
              <Row style={{ justifyContent: "space-between", margin: 10 }}>
                <p>
                  <b>Cargo</b>
                </p>
                <p>{item.nombreCargo}</p>
              </Row>
              <Row style={{ justifyContent: "space-between", margin: 10 }}>
                <p>
                  <b>Descripción</b>
                </p>
                <p>{item.descripcion}</p>
              </Row>
            </ContainerList>
          )) : null
          }
        </Container>
      </div>
    </ViewContainerPages>
  );
}
