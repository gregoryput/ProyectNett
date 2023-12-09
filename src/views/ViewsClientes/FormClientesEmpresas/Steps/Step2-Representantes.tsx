import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  StepProps,
  Tooltip,
  message,
} from "antd";
import { ContainerFormAntd } from "../../../../components";

import { MdHelpOutline } from "react-icons/md";
import React from "react";
import FormItem from "antd/es/form/FormItem";

interface IStep2RepresentantesProps {
  setItemsSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
  onSuccess: (data: any, step: number) => void;
  onBack: (dataBack: any, step: any) => void;
  data: any;
}

export default function Step2Representantes(props: IStep2RepresentantesProps) {
  const remoteControl = false;

  return (
    <ContainerFormAntd layout={"vertical"}>
      <div style={{ marginTop: "15px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              width: "400px",
              background: "#5592E7",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              marginRight: "5px",
            }}
          >
            Designación del representante de la empresa
          </h3>
          <Tooltip title="Aquí asignas el representante de la empresa, en este formulario puedes elegir una persona de contacto previamente existente en GETSNETT o bien, crear una nueva persona de contacto.">
            <MdHelpOutline size={30} color={"#D4D4D8"} />
          </Tooltip>
        </div>

        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {/* AREA DE LA FOTO: */}
          <div>
            <div
              style={{
                width: "140px",
                height: "130px",
                border: "2px solid #8CBCD6",
                marginRight: "10px",
              }}
            ></div>
          </div>

          {/* AREA DE LA INFO: */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {!remoteControl ? (
                <div style={{ marginBottom: "3.5px" }}>
                  <strong>Nombre: </strong>
                  <span>Juan Andres Cesar Jimenez</span>
                </div>
              ) : (
                <div>
                  <FormItem name={"idRepresentante"} noStyle>
                    <strong>Buscar:</strong>
                    <Select
                      size="small"
                      options={[
                        {
                          label: "9103515131 - Juan Andres Cesar Jimenez",
                          value: 1,
                        },
                      ]}
                      style={{ width: "400px" }}
                      placeholder="Ingrese la cédula y/o el nombre"
                    />
                  </FormItem>
                </div>
              )}
              <div style={{ marginBottom: "3.5px" }}>
                <strong>Cédula: </strong>
                <span>402-1021-13513</span>
              </div>
              <div style={{ marginBottom: "3.5px" }}>
                <strong>Teléfono: </strong>
                <span>829-836-3523</span>
              </div>
              <div style={{ marginBottom: "3.5px" }}>
                <strong>Correo: </strong>
                <span>juanjimenezmd123@gmail.com</span>
              </div>
            </div>
            <div style={{ marginTop: "5px" }}>
              <a style={{ marginRight: "25px" }}>- Ver más</a>
              <a style={{ marginRight: "25px" }}>- Cambiar</a>
              <a>- Registrar nuevo</a>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "10px",
          boxShadow: " 0 4px 8px rgba(201, 219, 243, 0.3)",
          borderBottom: "0.1px solid #F0F0F5",
        }}
      >
        <div>
          <Button onClick={() => message.info("Limpiar campos")}>
            Cancelar
          </Button>
        </div>

        <div>
          <Button
            onClick={() => props.onBack({} as any, 2)}
            style={{ marginRight: "10px" }}
          >
            Atras
          </Button>
          <Button onClick={() => props.onSuccess({} as any, 2)}>
            Siguiente
          </Button>
        </div>
      </div>
    </ContainerFormAntd>
  );
}
