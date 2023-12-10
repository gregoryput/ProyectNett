import {
  DatePicker,
  Form,
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
import { IImagen, IPersona } from "../../interfaces";
import { useCreatePersonaMutation } from "../../redux/Api/personasApi";
import { CustomUploadImage } from "../CustomUploadImage";
import useBase64Conversion from "../../hooks/UseBase64Conversion";

interface IModalFormPersonProps {
  openModalFP: boolean;
  setOpenModalFP: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalFormPerson = ({
  openModalFP,
  setOpenModalFP,
}: IModalFormPersonProps) => {
  const [form] = Form.useForm(); // <<--- Instancia del Form

  //Observar el valor idPais del form:
  const idPais = Form.useWatch("IdPais", form);

  //Fetch para obtener la lista de paises:
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
  const [executeCreatePerson, petitionCreatePerson] =
    useCreatePersonaMutation();

  // Funcion para hacer submit:
  const onSubmit = () => {
    // Obtener los valores del formulario:
    const dataValues: IPersona = form.getFieldsValue();

    // Obtener el archivo cargado en el upload:
    const selectedFile = fileList[0];

    // Crear objeto data para la imagen:
    let dataImage = {
      IdImagen: 0,
      FileName: selectedFile.name,
      ContentType: selectedFile.type || "",
      FileSize: selectedFile.size || 0,
      Data: null,
    } as IImagen;

    // Obtener la data de la imagen:
    convertToBase64(fileList[0]?.originFileObj as File).then((base64String) => {
      dataImage = {
        ...dataImage,
        Data: base64String,
      };
    });

    // Preparar el json de subida a la api:
    const dataSubmit = {
      IdPersona: 0,
      Nombres: dataValues.Nombres,
      Apellidos: dataValues.Apellidos,
      Telefono1: dataValues.Telefono1,
      Telefono2: dataValues.Telefono2,
      Direccion: dataValues.Direccion,
      Correo: dataValues.Correo,
      FechaDeNacimiento: dataValues.FechaDeNacimiento,
      Cedula: dataValues.Cedula,
      IdSexo: dataValues.IdSexo,
      IdCiudad: dataValues.IdCiudad,
      PersonaTiposPersona: {
        IdPersonaTipoPersona: 0,
        IdPersona: 0,
        IdTipoPersona: 4,
      },
      Imagen: dataImage,
    } as IPersona;

    console.log("dataSubmitdataSubmit", dataSubmit);

    // Ejecutar la subida:
    // executeCreatePerson(dataSubmit);
  };

  // Para almacenar la imagen subida:
  const [fileList, setFileList] = React.useState<UploadFile<any>[]>(
    [] as UploadFile<any>[]
  );

  return (
    <Modal
      title=" - Registrar persona"
      open={openModalFP}
      onCancel={() => setOpenModalFP(false)}
      onOk={() => onSubmit()}
      width={"60%"}
      okText="Guardar"
      cancelText="Cancelar"
    >
      {petitionCreatePerson.isLoading ? (
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item
            name={"Nombres"}
            label={<strong>Nombres:</strong>}
            style={{ width: "29%" }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={"Apellidos"}
            label={<strong>Apellidos:</strong>}
            style={{ width: "29%" }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={"Cedula"}
            label={<strong>Cedula:</strong>}
            style={{ width: "29%" }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={"Telefono1"}
            label={<strong>Telefono 1:</strong>}
            style={{ width: "29%" }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={"Telefono2"}
            label={<strong>telefono 2:</strong>}
            style={{ width: "29%" }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={"Correo"}
            label={<strong>Correo:</strong>}
            style={{ width: "29%" }}
          >
            <Input size="small" />
          </Form.Item>
          <Form.Item
            name={"FechaDeNacimiento"}
            label={<strong>Fecha de nacimiento:</strong>}
            style={{ width: "29%" }}
          >
            <DatePicker size="small" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name={"IdPais"}
            label={<strong>Pais</strong>}
            style={{ width: "29%" }}
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
          <Form.Item
            name={"IdCiudad"}
            label={<strong>Ciudad</strong>}
            style={{ width: "29%" }}
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
          />

          <Form.Item
            name={"IdSexo"}
            label={<strong>Sexo:</strong>}
            style={{ width: "15%" }}
          >
            <Group name="IdSexo">
              <Radio value={1}>
                <span>F</span>
              </Radio>
              <Radio value={2}>
                <span>M</span>
              </Radio>
            </Group>
          </Form.Item>
          <Form.Item
            name={"Direccion"}
            label={<strong>Direccion</strong>}
            style={{ width: "60%" }}
          >
            <TextArea />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ModalFormPerson;
