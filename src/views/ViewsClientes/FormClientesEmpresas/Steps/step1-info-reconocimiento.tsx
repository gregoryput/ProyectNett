import {
  Button,
  DatePicker,
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

import {
  MdHelpOutline,
  MdOutlinePersonSearch,
  MdReplayCircleFilled,
} from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import { DivAreaFoto, DivFooterFoto } from "./steps.styled";
import { MdImageNotSupported } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FcEditImage } from "react-icons/fc";
import { MdRemoveRedEye } from "react-icons/md";
import { useCreateEntitieMutation } from "../../../../redux/Api/entitiesApi";

import React from "react";
import { RcFile } from "antd/es/upload";
import { useGetPersonasIfoPersonalQuery } from "../../../../redux/Api/personasApi";
import toast from "react-hot-toast";
import { FaAddressCard, FaUserEdit } from "react-icons/fa";
import { IPersona } from "../../../../interfaces";
import dayjs from "dayjs";

interface IStep1InfoReconocimientoProps {
  setItemsSteps: React.Dispatch<React.SetStateAction<StepProps[]>>;
  onSuccess: (data: any, step: number) => void;
  data: any;
}

export default function Step1InfoReconocimiento(
  props: IStep1InfoReconocimientoProps
) {
  const [form] = Form.useForm();

  const [IdPersona, setIdPersona] = React.useState<number | null>(null);

  const [selectedEnterprise, setSelectedEnterprise] = React.useState<
    any | undefined
  >();

  const fecthClientes = useGetPersonasIfoPersonalQuery();

  //Funcion peticion para el create/insert de Producto:
  const [
    createEntitie,
    {
      isLoading: isLoadingCreate,
      isSuccess: isCreateSuccess,
      isError: isErrorCreate,
    },
  ] = useCreateEntitieMutation();

  const dataSubmit = (data) => {
    const dataS = {
      IdEntidad: 0,
      NombreEntidad: data.NombreEntidad,
      IdTipoEntidad: 1,

      EntidadRolEntidad: {
        IdEntidadRolEntidad: 0,
        IdEntidad: 0,
        IdRolEntidad: 1,
      },

      EntidadPersonaFisica: {
        IdEntidadPersonaFisica: 0,
        IdEntidad: 0,
        IdPersona: IdPersona,
      },

      EntidadPersonaFisicaRepresentante: {
        IdEPFR: 0,
        IdEntidadPersonaFisica: 0,
        IdRepresentanteActual: IdPersona,
        IdRolRepresentante: 1,
      },

      ClienteEntidad: {
        IdCliente: 0,
        Codigo: data.Codigo,
        IdEntidad: 0,
        FechaInicioCliente: data.FechaInicioCliente,
      },
    };

    createEntitie({ ...dataS });

    // Crear: -----------------------------------------------------
  };

  const [openModalFP, setOpenModalFP] = React.useState<boolean>(false);

  // Estado para controlar si se van a crear o editar datos personales:
  const [dataEditPersona, setDataEditPersona] = React.useState<
    IPersona | undefined
  >(undefined);

  React.useEffect(() => {
    dataEditPersona != undefined && dataEditPersona == undefined
      ? setDataEditPersona(undefined)
      : null;
  }, [openModalFP, dataEditPersona]);

  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      return `${text.substring(0, maxLength)}...`;
    }
  }

  return (
    <ContainerFormAntd layout={"vertical"} onFinish={dataSubmit} form={form}>
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
              width: "100%",
              background: "#5592E7",
              borderRadius: "8px",
              textAlign: "center",
              color: "white",
              marginRight: "5px",
            }}
          >
            Información de identificación del cliente
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name={"NombreEntidad"}
            label={<strong>Nombre de identificación (opcional):</strong>}
            style={{ width: "29%" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"Codigo"}
            label={<strong>Código del cliente:</strong>}
            style={{ width: "29%" }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"FechaInicioCliente"}
            label={<strong>Fecha de inicio como cliente:</strong>}
            style={{ width: "29%" }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
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

{
  /*
  
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
  
  */
}
