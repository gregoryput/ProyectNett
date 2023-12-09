import {
  Button,
  Form,
  Image,
  Input,
  Select,
  StepProps,
  Tooltip,
  Upload,
  UploadFile,
  message,
} from "antd";
import { ContainerFormAntd } from "../../../../components";

import { MdHelpOutline, MdReplayCircleFilled } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { DivAreaFoto, DivFooterFoto } from "./steps.styled";
import { MdImageNotSupported } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FcEditImage } from "react-icons/fc";
import { MdRemoveRedEye } from "react-icons/md";

import React from "react";
import { RcFile } from "antd/es/upload";

interface IStep1InfoReconocimientoProps {
  setItemsSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
  onSuccess: (data: any, step: number) => void;
  data: any;
}

export default function Step1InfoReconocimiento(
  props: IStep1InfoReconocimientoProps
) {
  const [fileList, setFileList] = React.useState<UploadFile<any>[]>(
    [] as UploadFile<any>[]
  );

  return (
    <ContainerFormAntd layout={"vertical"}>
      <div style={{ marginTop: "15px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              width: "350px",
              background: "#5592E7",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              marginRight: "5px",
            }}
          >
            Información de identificación del cliente
          </h3>
          <Tooltip title="Con esta información se puede identificar a cada cliente, se asigna un código único, la fecha en que inicio a ser cliente de GESTNETT y un nombre (apodo, nombre comercial, etc).">
            <MdHelpOutline size={30} color={"#D4D4D8"} />
          </Tooltip>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "11%",
            }}
          >
            <Form.Item name={"fotoCliente"}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <DivAreaFoto>
                  {fileList.length > 0 ? (
                    <Image
                      src={URL.createObjectURL(
                        fileList[0].originFileObj as RcFile
                      )}
                      alt={`Imagen-${fileList[0].fileName}`}
                      style={{
                        maxHeight: "80px",
                        minWidth: "80px",
                        borderRadius: "45px",
                      }}
                    />
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <MdImageNotSupported size={25} color="#90BFD9" />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ fontWeight: "bold", color: "#C6C6C6" }}>
                          No img
                        </span>
                      </div>
                    </div>
                  )}
                </DivAreaFoto>
                <DivFooterFoto>
                  <Upload
                    listType="picture"
                    multiple={false}
                    name="EntidadFoto"
                    maxCount={1}
                    showUploadList={false}
                    onChange={(infoFiles) => {
                      const selectedFiles = infoFiles.fileList;
                      // Agregar archivos únicos a fileList
                      setFileList(selectedFiles);
                    }}
                  >
                    {fileList.length === 0 ? (
                      <FcAddImage size={20} style={{ marginRight: "5px" }} />
                    ) : (
                      <FcEditImage size={20} style={{ marginRight: "5px" }} />
                    )}
                  </Upload>

                  <MdRemoveRedEye
                    size={21}
                    color="#8CBCD6"
                    style={{ marginRight: "2px" }}
                  />
                  <MdDelete size={20} color="#8CBCD6" />
                </DivFooterFoto>
              </div>
            </Form.Item>
          </div>

          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space",
            }}
          >
            <Form.Item
              style={{ width: "35%", marginRight: "30px" }}
              name={"codigo"}
              label={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <strong style={{ marginRight: "10px" }}>
                    RNC de la empresa:
                  </strong>{" "}
                  <MdHelpOutline size={20} color={"#D4D4D8"} />
                </div>
              }
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ width: "35%" }}
              name={"nombreCliente"}
              label={<strong>Nombre comercial (opcional):</strong>}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ width: "35%", marginRight: "30px" }}
              name={"codigo"}
              label={<strong>Código:</strong>}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{ width: "35%" }}
              name={"fechaInicioCliente"}
              label={<strong>Fecha de inicio como cliente:</strong>}
            >
              {/*<DatePicker style={{ width: "100%" }} />*/}
              <input
                type="date"
                style={{
                  background: "white",
                  width: "100%",
                  borderRadius: "8px",
                  padding: "3px",
                  border: "1px solid #D9D9D9",
                }}
              />
            </Form.Item>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "15px", width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              width: "390px",
              background: "#5592E7",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              marginRight: "5px",
            }}
          >
            Información propia de la empresa a registrar
          </h3>
          <Tooltip title="Con esta información se puede identificar a cada cliente, se asigna un código único, la fecha en que inicio a ser cliente de GESTNETT y un nombre (apodo, nombre comercial, etc).">
            <MdHelpOutline size={30} color={"#D4D4D8"} />
          </Tooltip>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label={<strong>Nombre de la empresa:</strong>}
              style={{ width: "24%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<strong>Correo:</strong>}
              style={{ width: "24%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<strong>Teléfono 1</strong>}
              style={{ width: "24%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<strong>Teléfono 2 (opcional)</strong>}
              style={{ width: "24%" }}
            >
              <Input />
            </Form.Item>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Form.Item
              label={<strong>Sitio web (opcional)</strong>}
              style={{ width: "24%" }}
            >
              <Input />
            </Form.Item>

            <Form.Item label={<strong>País</strong>} style={{ width: "24%" }}>
              <Select />
            </Form.Item>

            <Form.Item label={<strong>Ciudad</strong>} style={{ width: "24%" }}>
              <Select />
            </Form.Item>

            <Form.Item
              label={<strong>Dirección</strong>}
              style={{ width: "24%" }}
            >
              <Input />
            </Form.Item>
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
          <Button onClick={() => message.info("Limpiar campos")}>
            Limpiar campos
          </Button>
        </div>

        <div>
          <Tooltip title="Ya estás en el primer paso, no puedes regresar más atras">
            <Button disabled={true} onClick={() => null}>
              Atras
            </Button>
          </Tooltip>
          <Button onClick={() => props.onSuccess({} as any, 1)}>
            Siguiente
          </Button>
        </div>
      </div>
    </ContainerFormAntd>
  );
}
