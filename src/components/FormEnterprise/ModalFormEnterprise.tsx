import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Skeleton,
  UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Radio, { Group } from "antd/es/radio";
import React from "react";
import { useGetCountriesQuery } from "../../redux/Api/countriesApiT";
import { useGetCitiesQuery } from "../../redux/Api/citiesApiT";
import { IEmpresa, IImagen, IPersona } from "../../interfaces";
import {
  useCreatePersonaMutation,
  useUpdatePersonaMutation,
} from "../../redux/Api/personasApi";
import { CustomUploadImage } from "../CustomUploadImage";
import useBase64Conversion from "../../hooks/UseBase64Conversion";
import toast from "react-hot-toast";
import { MdSave } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { ButtonFooter } from "./ModalFormEnterpriseStyled";
import { BsPersonVcardFill } from "react-icons/bs";

interface IModalFormPersonProps {
  OpenModalFE: boolean;
  setOpenModalFE: React.Dispatch<React.SetStateAction<boolean>>;
  dataEditEmpresa: IEmpresa | undefined;
  setDataEditEmpresa: React.Dispatch<
    React.SetStateAction<IPersona | undefined>
  >;
  formCPF: FormInstance<any>;
  setIdPersona: React.Dispatch<React.SetStateAction<number | null>>;
}

const ModalFormPerson = ({
  OpenModalFE,
  setOpenModalFE,
  dataEditEmpresa,
  setDataEditEmpresa,
  formCPF,
  setIdPersona,
}: IModalFormPersonProps) => {
  const [form] = Form.useForm(); // <<--- Instancia del Form

  //Observar el valor idPais del form:
  const idPais = Form.useWatch("IdPais", form);

  const [cerrableModal, setCerrableModal] = React.useState<boolean>(true);

  const [deleteImageEditMode, setDeleteImageEditMode] =
    React.useState<boolean>(false);

  const {
    data: countiresData,
    //isSuccess: countriesSuccess,
    isLoading: isLoadingCountries,
  } = useGetCountriesQuery();

  // fetch de obtener ciudades por pais (el skip es para que se ejecute solo si idPais tiene valor):
  const fetchCitiesByCountry = useGetCitiesQuery(idPais, {
    skip: idPais === undefined || idPais === null,
  });

  // Hacer refetch (ejecutar la peticion de getCities cuando el valor de idPais cambie):
  React.useEffect(() => {
    idPais !== undefined && idPais !== null
      ? fetchCitiesByCountry.refetch()
      : null;
  }, [idPais]);

  // Mi hook personalizado para obtener el base64 de la imagen
  const convertToBase64 = useBase64Conversion();

  // Fetch Mutation Redux para hacer la solicitud de insert:
  const [executeCreatePerson, fetchCreatePerson] = useCreatePersonaMutation();
  // Fetch Mutation Redux para hacer la solicitud de Update:
  const [executeUpdatePerson, fetchUpdatePerson] = useUpdatePersonaMutation();

  // MOSTRAR MENSAJE DE LOADING: -------------------------------------------------------------------------------- --------------------------------------------------------------------------------
  React.useEffect(() => {
    if (fetchCreatePerson.isLoading || fetchUpdatePerson.isLoading) {
      toast.loading(
        `${
          dataEditEmpresa == undefined ? "Guardando" : "Actualizando"
        } los datos personales`,
        {
          id: "tSavinPerson",
        }
      );
      setCerrableModal(false); // <<-- hacer que el modal no sea cerrable mientras se esta guardando
    } else {
      toast.dismiss("tSavinPerson");
      !cerrableModal ? setCerrableModal(true) : null; // <<-- hacer que el modal sea cerrable cuando deje de cargar el guardado
    }
  }, [
    fetchCreatePerson.isLoading,
    fetchUpdatePerson.isLoading,
    setCerrableModal,
  ]);

  // // MOSTRAR MENSAJE DE GUARDADO/ACTUALIZADO CORRECTAMENTE: --------------------------------------------------------------------------------
  React.useEffect(() => {
    if (fetchCreatePerson.isSuccess || fetchUpdatePerson.isSuccess) {
      toast.dismiss("tSavinPerson");
      toast.success(
        `Los datos personales han sido ${
          dataEditEmpresa == undefined ? "guardados" : "actualizados"
        } correctamente`,
        {
          id: "tSucc",
        }
      );
      formCPF.resetFields(["IdPersona"]);
      //formCPF.resetFields();
      form.resetFields();
      setFileList([]);
      setIdPersona(null);
      setDataEditEmpresa(undefined);
      setOpenModalFE(false);
    }
  }, [
    fetchCreatePerson.isSuccess,
    fetchUpdatePerson.isSuccess,
    setOpenModalFE,
  ]);

  // // MOSTRAR MENSAJE DE ERROR DE GUARDADO/ACTUALZADO: --------------------------------------------------------------------------------
  React.useEffect(() => {
    if (fetchCreatePerson.isError || fetchUpdatePerson.isError) {
      toast.dismiss("tSavinPerson");
      toast.error("Error al guardar los datos personales", {
        id: "tError",
      });
    }
  }, [fetchCreatePerson.isError, fetchUpdatePerson.isError]);

  // Para almacenar la imagen seleccionada:
  const [fileList, setFileList] = React.useState<UploadFile<any>[]>(
    [] as UploadFile<any>[]
  );

  const [dataImage, setDataImage] = React.useState<string | null>(null);

  // Un useEffect para capturar la informacion de la imagen: --------------------------------------
  React.useEffect(() => {
    fileList.length > 0
      ? convertToBase64(fileList[0]?.originFileObj as File).then(
          (base64String) => {
            // Extraer solo la parte base64 sin el encabezado
            const base64WithoutHeader = base64String?.split(",")[1]; // Obtener la parte después de la coma
            setDataImage(base64WithoutHeader || "");
          }
        )
      : null;
  }, [fileList]);

  // Un useEffect para cuando se vaya editar, capturar la informacion de la persona y mapearla en los campos:
  React.useEffect(() => {
    // si la data edit es diferente !== undefined es porque se va editar:
    if (dataEditEmpresa !== undefined) {
      const dataEstable = dataEditEmpresa as IEmpresa;
      //dataEstable.FechaDeNacimiento = new Date(dataEstable.FechaDeNacimiento);
      form.setFieldsValue(dataEstable);
    } else {
      setDataEditEmpresa(undefined);
      form.resetFields();
      setFileList([]);
    }
  }, [dataEditEmpresa]);

  // Funcion para hacer submit:
  const onSubmit = (dataValues: IEmpresa) => {
    // Obtener los valores del formulario:
    // const dataValues: IPersona = form.getFieldsValue();

    // Obtener el archivo cargado en el upload:
    const selectedFile = fileList[0];

    // Crear objeto data para la imagen:
    let objectImage =
      fileList.length > 0
        ? ({
            IdImagen: dataEditEmpresa?.DataImagenEmpresa?.Imagen.IdImagen || 0,
            FileName: selectedFile.name,
            ContentType: selectedFile.type || "",
            FileSize: selectedFile.size || 0,
            Data: dataImage,
          } as IImagen)
        : undefined;

    // const PTP = dataEditEmpresa?.PersonaTiposPersona?.map(
    //   (P) => P.IdTipoPersona
    // );

    // Preparar el json de subida a la api:
    const dataSubmit = {
      IdPersona: dataEditEmpresa?.IdEmpresa || 0,
      Nombres: dataValues.NombreEmpresa,
      Telefono1: dataValues.Telefono1,
      Telefono2: dataValues.Telefono2,
      Direccion: dataValues.Direccion,
      Correo: dataValues.Correo,
      Cedula: dataValues.RNC,
      IdCiudad: dataValues.IdCiudad,
      // PersonaTiposPersona:
      //   dataEditEmpresa == undefined && !PTP?.includes(4)
      //     ? [
      //         {
      //           IdPersonaTipoPersona: 0,
      //           IdPersona: 0,
      //           IdTipoPersona: 4,
      //         },
      //       ]
      //     : undefined,
      DataImagenPersona:
        objectImage !== undefined
          ? {
              Imagen: objectImage as IImagen,
              PersonaImagen: {
                IdPersonaImagen:
                  dataEditEmpresa?.DataImagenEmpresa?.PersonaImagen
                    .IdPersonaImagen || 0,
                IdImagen: objectImage?.IdImagen || 0,
                IdPersona: dataEditEmpresa?.IdEmpresa || 0,
              },
            }
          : !deleteImageEditMode
          ? {
              Imagen: {
                IdImagen: 0,
                FileName: "",
                ContentType: "",
                FileSize: 0,
                Data: "",
              } as IImagen,
              PersonaImagen: {
                IdImagen: 0,
                IdPersona: 0,
              },
            }
          : undefined,
    } as IPersona;

    // Ejecutar la subida:
    if (dataEditEmpresa == undefined) {
      executeCreatePerson(dataSubmit);
    } else {
      executeUpdatePerson(dataSubmit);
    }
  };

  return (
    <Modal
      title={
        <div
          style={{
            padding: "5px",
            background: "#E3E3E3",
            width: "50%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "5px",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <BsPersonVcardFill style={{ marginRight: "10px" }} size={20} />
          <span>Registrar nueva persona de contacto</span>
        </div>
      }
      open={OpenModalFE}
      onCancel={() => {
        setOpenModalFE(false);
        form.resetFields();
        setFileList([]);
        setDataEditEmpresa(undefined);
      }}
      width={"60%"}
      okText="Guardar"
      cancelText="Cancelar"
      footer={null}
      // ---------------------------------------------------
      maskClosable={!cerrableModal} // Evitar cerrar al hacer clic fuera del modal
      keyboard={!cerrableModal} // Evitar cerrar al presionar la tecla Esc
    >
      {fetchCreatePerson.isLoading || fetchUpdatePerson.isLoading ? (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => onSubmit(values)}
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/*-------------------------------- CAMPO NombreEmpresa: --------------------------------*/}
          <Form.Item
            name={"NombreEmpresa"}
            label={<strong>Nombre Empresa:</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
              {
                max: 40,
                message: "40 caracteres como máximo.",
              },
              {
                min: 2,
                message: "2 caracteres como mínimo.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          {/*-------------------------------- CAMPO Cedula: --------------------------------*/}
          <Form.Item
            name={"RNC"}
            label={<strong>RNC:</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
              {
                max: 13,
                message: "13 caracteres como máximo.",
              },
              {
                min: 2,
                message: "11 caracteres como mínimo.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          {/*-------------------------------- CAMPO Correo: --------------------------------*/}
          <Form.Item
            name={"Correo"}
            label={<strong>Correo:</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
              {
                type: "email",
                message: "El formato del correo electrónico no es válido.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          {/*-------------------------------- CAMPO SitioWeb: --------------------------------*/}
          <Form.Item
            name={"SitioWeb"}
            label={<strong>SitioWeb:</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
              {
                pattern:
                  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/,
                message: "El formato del sitio web no es válido.",
              },
              {
                type: "email",
                message: "El formato de URL no es válido.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          {/*-------------------------------- CAMPO Telefono1: --------------------------------*/}
          <Form.Item
            name={"Telefono1"}
            label={<strong>Teléfono 1:</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
              {
                pattern: new RegExp(/^\d{3}-\d{3}-\d{4}$|^\d{10}$/),
                message: "El formato del número de teléfono no es válido.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          {/*-------------------------------- CAMPO Telefono2 (Opcional): --------------------------------*/}
          <Form.Item
            name={"Telefono2"}
            label={<strong>Teléfono 2:</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                pattern: new RegExp(/^\d{3}-\d{3}-\d{4}$|^\d{10}$/),
                message: "El formato del número de teléfono no es válido.",
              },
            ]}
          >
            <Input size="small" />
          </Form.Item>

          {/*-------------------------------- CAMPO IdPais: --------------------------------*/}
          <Form.Item
            name={"IdPais"}
            label={<strong>País</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
            ]}
            initialValue={dataEditEmpresa?.IdPais}
          >
            <Select
              loading={isLoadingCountries === true}
              size="small"
              options={countiresData?.Result.map((pais) => ({
                label: pais.PaisNombre,
                value: pais.IdPais,
              }))}
            />
          </Form.Item>

          {/*-------------------------------- CAMPO IdCiudad: --------------------------------*/}
          <Form.Item
            name={"IdCiudad"}
            label={<strong>Ciudad</strong>}
            style={{ width: "29%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
            ]}
          >
            <Select
              loading={fetchCitiesByCountry.isLoading}
              size="small"
              options={fetchCitiesByCountry.data?.Result.map((cF2) => ({
                label: cF2.CiudadNombre,
                value: cF2.IdCiudad,
              }))}
            />
          </Form.Item>

          <CustomUploadImage
            fileList={fileList}
            setFileList={setFileList}
            width="14%"
            deleteImageEditMode={deleteImageEditMode}
            setDeleteImageEditMode={setDeleteImageEditMode}
          />

          {/*-------------------------------- CAMPO Sexo: --------------------------------*/}
          <Form.Item
            name={"IdSexo"}
            label={<strong>Sexo:</strong>}
            style={{ width: "15%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
            ]}
          >
            <Group name="IdSexo" onChange={() => null}>
              <Radio value={1}>
                <span>F</span>
              </Radio>
              <Radio value={2}>
                <span>M</span>
              </Radio>
            </Group>
          </Form.Item>

          {/*-------------------------------- CAMPO Direccion: --------------------------------*/}
          <Form.Item
            name={"Direccion"}
            label={<strong>Dirección</strong>}
            style={{ width: "60%" }}
            rules={[
              {
                required: true,
                message: "Este campo es requerido.",
              },
              {
                max: 60,
                message: "13 caracteres como máximo.",
              },
              {
                min: 3,
                message: "11 caracteres como mínimo.",
              },
            ]}
            initialValue={dataEditEmpresa?.Direccion}
          >
            <TextArea />
          </Form.Item>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <Form.Item>
                <Button>Limpiar campos</Button>
              </Form.Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Item>
                <ButtonFooter
                  htmlType="button"
                  style={{ background: "#DF6B6B" }}
                  onClick={() => {
                    setOpenModalFE(false);
                    form.resetFields();
                    setFileList([]);
                    setDataEditEmpresa(undefined);
                  }}
                >
                  <MdCancel size={20} />
                  <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                    Cancelar
                  </span>
                </ButtonFooter>
              </Form.Item>
              <Form.Item>
                <ButtonFooter htmlType="submit">
                  <MdSave size={20} />
                  <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                    Guardar
                  </span>
                </ButtonFooter>
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ModalFormPerson;
