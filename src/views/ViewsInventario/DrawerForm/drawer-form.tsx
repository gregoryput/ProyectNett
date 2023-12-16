import {
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Skeleton,
  Upload,
  Tooltip,
  Collapse,
  Checkbox,
  Modal,
  Button,
  Select,
  UploadFile,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import { MdAddLink, MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RxInput } from "react-icons/rx";
import { FiSave } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";

import "../../../GeneralStyles/form-styles.css";
import React, { useState, useEffect } from "react";
import {
  ButtonCancelOp,
  ButtonClearInputs,
  ButtonOperation,
  DivAreaFoto,
  DivContainerCheck,
  DivFooterDrawer,
  DivFooterFoto,
  DivSelectArea,
  DivUpload,
} from "./drawer-form-styled";
import { MdDelete } from "react-icons/md";
import { MdChangeCircle } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaRuler } from "react-icons/fa";

import "./styles.css"; // Importa tu archivo de estilos CSS
import CustomChecked from "./custom-checked";
import useBase64Conversion from "../../../hooks/UseBase64Conversion";
import { RcFile } from "antd/es/upload";

export default function DrawerForm({
  Open,
  OnClose,
  Title,
  createProduct,
  statusFetch,
  cleanInputs,
  setCleanInputs,
  selectedItem,
  OpstionsUnits,
}) {
  const [form] = Form.useForm();

  // Mi hook personalizado para obtener el base64 de la imagen
  const convertToBase64 = useBase64Conversion();

  React.useEffect(() => {
    selectedItem ? form.setFieldsValue(selectedItem) : null;
  }, [selectedItem, form]);

  // Para almacenar la imagen seleccionada:
  const [fileList, setFileList] = React.useState<UploadFile<any>[]>(
    [] as UploadFile<any>[]
  );

  const [TieneVencimiento, setTieneVencimiento] =
    React.useState<boolean>(false);

  interface ImageData {
    index: number;
    IdImage: number;
    data: string | null;
    isPrincipal: boolean;
  }
  const [dataImages, setDataImages] = React.useState<ImageData[]>(
    [] as ImageData[]
  );

  console.log("dataImagesdataImages", dataImages);

  React.useEffect(() => {
    const promises = fileList.map((file, index) =>
      convertToBase64(file?.originFileObj as File).then((base64String) => {
        // Extraer solo la parte base64 sin el encabezado
        const base64WithoutHeader = base64String?.split(",")[1]; // Obtener la parte después de la coma
        return {
          index: index,
          IdImage: 0,
          data: base64WithoutHeader as string,
          isPrincipal: false,
        };
      })
    );

    Promise.all(promises).then((imageDataArray) => {
      setDataImages(imageDataArray as ImageData[]);
    });
  }, [fileList]);

  const handleSubmit = (dataProduct) => {
    const dataSubmitProduct = {
      IdProducto: 0,
      Nombre: dataProduct.Nombre,
      Codigo: dataProduct.Codigo,
      Descripcion: dataProduct.Descripcion,
      Modelo: dataProduct.Modelo,
      TieneVencimiento: TieneVencimiento,

      ProductoUnidadesMedidaDetalles: dataProduct.UnidadesDeMedidaDetalles.map(
        (UDD) => ({
          ProductoUnidadDeMedida: {
            IdProductoUnidadDeMedida: 0,
            IdUnidadDeMedida: UDD.IdUnidadDeMedida,
            IdProducto: 0,
          },

          DetalleProductoUnidadDeMedida: {
            IdProducto: 0,
            IdUnidadDeMedida: UDD.IdUnidadDeMedida,
            PrecioCosto: UDD.PrecioCosto,
            PrecioVenta: UDD.PrecioVenta,
            ITBIS: UDD.ITBIS,
            IdProductoUnidadDeMedida: 0,
          },
        })
      ),

      DataProductoImagenes: fileList.map((file, index) => ({
        Imagen: {
          IdImagen: 0,
          FileName: file.name,
          ContentType: file.type || "",
          FileSize: file.size || 0,
          Data: dataImages[index].data,
        },
        ProductoImagen: {
          IdProductoImagen: 0,
          IdImagen: 0,
          IdProducto: 0,
          EsLaPrincipal: index == 0 ? true : false,
        },
      })),
    };

    // {
    //   "IdProducto": 0,
    //   "Nombre": "string",
    //   "Codigo": "string",
    //   "Descripcion": "string",
    //   "Modelo": "string",
    //   "TieneVencimiento": true,
    //   "IdEstado": 0,
    //   "IdCreadoPor": 0,
    //   "FechaCreacion": "2023-12-15T16:46:47.022Z",
    //   "IdModificadoPor": 0,
    //   "FechaModificacion": "2023-12-15T16:46:47.022Z",
    //   "IdEstadoRegistro": 0,
    //   "ProductoUnidadesDeMedida": [
    //     {
    //       "IdProductoUnidadDeMedida": 0,
    //       "IdUnidadDeMedida": 0,
    //       "IdProducto": 0,
    //       "IdCreadoPor": 0,
    //       "FechaCreacion": "2023-12-15T16:46:47.022Z",
    //       "IdModificadoPor": 0,
    //       "FechaModificacion": "2023-12-15T16:46:47.022Z",
    //       "IdEstadoRegistro": 0
    //     }
    //   ],
    //   "ProductoUnidadesMedidaDetalles": [
    //     {
    //       "ProductoUnidadDeMedida": {
    //         "IdProductoUnidadDeMedida": 0,
    //         "IdUnidadDeMedida": 0,
    //         "IdProducto": 0,
    //         "IdCreadoPor": 0,
    //         "FechaCreacion": "2023-12-15T16:46:47.022Z",
    //         "IdModificadoPor": 0,
    //         "FechaModificacion": "2023-12-15T16:46:47.022Z",
    //         "IdEstadoRegistro": 0
    //       },
    //       "DetalleProductoUnidadDeMedida": {
    //         "IdProducto": 0,
    //         "IdUnidadDeMedida": 0,
    //         "PrecioCosto": 0,
    //         "PrecioVenta": 0,
    //         "ITBIS": 0,
    //         "IdProductoUnidadDeMedida": 0,
    //         "IdCreadoPor": 0,
    //         "FechaCreacion": "2023-12-15T16:46:47.022Z",
    //         "IdModificadoPor": 0,
    //         "FechaModificacion": "2023-12-15T16:46:47.022Z",
    //         "IdEstadoRegistro": 0
    //       }
    //     }
    //   ],
    //   "DataProductoImagenes": [
    //     {
    //       "Imagen": {
    //         "IdImagen": 0,
    //         "FileName": "string",
    //         "ContentType": "string",
    //         "FileSize": 0,
    //         "Data": "string",
    //         "IdCreadoPor": 0,
    //         "FechaCreacion": "2023-12-15T16:46:47.022Z",
    //         "IdModificadoPor": 0,
    //         "FechaModificacion": "2023-12-15T16:46:47.022Z",
    //         "IdEstadoRegistro": 0
    //       },
    //       "ProductoImagen": {
    //         "IdProductoImagen": 0,
    //         "IdImagen": 0,
    //         "IdProducto": 0,
    //         "EsLaPrincipal": true,
    //         "IdCreadoPor": 0,
    //         "FechaCreacion": "2023-12-15T16:46:47.022Z",
    //         "IdModificadoPor": 0,
    //         "FechaModificacion": "2023-12-15T16:46:47.022Z",
    //         "IdEstadoRegistro": 0
    //       }
    //     }
    //   ]
    // }

    console.log(
      "dataSubmitProductdataSubmitProductdataSubmitProduct",
      dataSubmitProduct
    );
    createProduct({ ...dataSubmitProduct });
  };

  // const [unidadesDeMedida, setUnidadesDeMedida] = useState([]);
  // const [selectedUnit, setSelectedUnit] = useState(null);
  const [openModalUnit, setOpenModalUnit] = useState<boolean>(false);

  useEffect(() => {
    cleanInputs ? form.resetFields() : null;
    setCleanInputs(false);
  }, [cleanInputs, form, setCleanInputs]);

  //Funcion para el onChange del ChekBox personalizado:
  const handleCheckChange = (isChecked, file) => {
    setDataImages((prevState) => {
      //deshabilito los checks marcados y marco el clickeado:
      const newDataImages = prevState.map((pS) => ({
        ...pS,
        isPrincipal: pS.index === file.index ? isChecked : false,
      }));
      return newDataImages;
    });
  };

  //Funcion para borrar foto:
  const handleDeleteFoto = (file) => {
    setFileList((prevState) => {
      const newFileList = prevState.filter((pS) => pS.uid !== file.uid);
      return newFileList;
    });
  };

  // const clickNoPropagation = (event) => {
  //   event.stopPropagation(); // Detener la propagación del evento para evitar que alcance el Collapse
  // };

  // ---- Observar el FormList
  const UnidadesDetalles = Form.useWatch("UnidadesDeMedidaDetalles", form);

  const getUnidadMedidaNombre = (id) => {
    const optionUnidadMedida = OpstionsUnits?.find((oU) => oU.value === id);
    return optionUnidadMedida?.label;
  };

  return (
    <>
      {/*DRAWER CONTENEDOR DEL FORM PRODUCTS*/}
      <Drawer
        title={Title}
        headerStyle={{
          background: "#E8E4E4",
        }}
        open={Open}
        onClose={() => OnClose()}
        bodyStyle={{ background: "#F8F5F5" }}
        width="40%"
        footerStyle={{
          background: "#E8E4E4",
          boxShadow: "0px -0.5px 5px rgba(0, 0, 0, 0.4)",
        }}
        footer={
          /*--- FOOTER DEL DRAWER (Parte de abajo, donde estan los botones)*/
          <DivFooterDrawer>
            {/*--- BOTON DE EJECUTAR LA OPERACION (Registrar - Editar) */}
            <ButtonOperation
              loading={statusFetch.loading}
              icon={
                selectedItem === undefined ? (
                  <FiSave size={20} color="#4096FF" />
                ) : (
                  <FaEdit size={20} color="#4096FF" />
                )
              }
              htmlType="submit"
              onClick={() => {
                form
                  .validateFields()
                  .then(() => {
                    handleSubmit(form.getFieldsValue(true));
                  })
                  .catch(() => {
                    return;
                  });
              }}
            >
              <strong>
                {selectedItem !== undefined ? "Editar" : "Guardar"}
              </strong>
            </ButtonOperation>

            {/*--- BOTON DE CANCELAR LA OPERACION */}
            <ButtonCancelOp
              loading={statusFetch.loading}
              icon={<IoClose size={25} color="#FF4343" />}
              onClick={() => {
                OnClose();
                setCleanInputs(true);
              }}
            >
              <strong>Cancelar</strong>
            </ButtonCancelOp>

            {/*--- BOTON DE LIMPIAR LOS CAMPOS */}
            <ButtonClearInputs
              loading={statusFetch.loading}
              icon={<RxInput size={20} color="#4096FF" />}
              onClick={() => setCleanInputs(true)}
            >
              <strong>Limpiar campos</strong>
            </ButtonClearInputs>
          </DivFooterDrawer>
        }
      >
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          form={form}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {/*------------ CAMPO NOMBRE DEL PRODUCTO: ------------*/}
          <Form.Item
            label={<strong>Nombre del producto:</strong>}
            style={{ width: "68%" }}
            name={"Nombre"}
            rules={[
              {
                required: true,
                message: "Debe ingresar el nombre del producto",
              },
              {
                max: 55,
                message: "55 caracteres como máximo",
              },
              {
                min: 3,
                message: "30 caracteres como minimo",
              },
            ]}
          >
            <Input placeholder="Ingrese el nombre del producto" />
          </Form.Item>

          {/*------------ CAMPO MODELO DEL PRODUCTO: ------------*/}
          <Form.Item
            label={<strong>Modelo:</strong>}
            style={{ width: "30%" }}
            name={"Modelo"}
            rules={[
              {
                required: true,
                message: "Debe ingresar el nombre del producto",
              },
              {
                max: 40,
                message: "40 caracteres como máximo",
              },
              {
                min: 2,
                message: "2 caracteres como minimo",
              },
            ]}
          >
            <Input placeholder="Ingrese el modelo" />
          </Form.Item>

          {/*------------ CAMPO DESCRIPCION DEL PRODUCTO: ------------*/}
          <Form.Item
            label={<strong>Descripción:</strong>}
            style={{ width: "100%" }}
            name={"Descripcion"}
            rules={[
              {
                required: true,
                message: "Debe ingresar el descripción del producto",
              },
              {
                max: 255,
                message: "255 caracteres como máximo",
              },
              {
                min: 5,
                message: "5 caracteres como minimo",
              },
            ]}
          >
            <TextArea placeholder="Breve descripción del producto" />
          </Form.Item>

          {/*------------ CAMPO PRECIO COSTO DEL PRODUCTO: ------------*/}
          {/*------------ CAMPO PRECIO VENTA DEL PRODUCTO: ------------*/}
          {/*------------ CAMPO ITBIS DEL PRODUCTO: ------------*/}

          {/*------------ CAMPO CODIGO DEL PRODUCTO: ------------*/}
          <Form.Item
            label={<strong>Código:</strong>}
            name={"Codigo"}
            style={{ width: "49%" }}
            rules={[
              {
                required: true,
                message: "Debe ingresar el código del producto",
              },
              {
                max: 7,
                message: "7 caracteres como máximo",
              },
              {
                min: 5,
                message: "5 caracteres como mínimo",
              },
            ]}
          >
            <Input placeholder="Ingrese el código" />
          </Form.Item>

          {/*------------ CAMPO GENERAR CODIGO: ------------*/}
          <Form.Item
            style={{
              width: "49%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
            valuePropName="checked"
            name={"TieneVencimiento"}
            label={<strong>Tiene vencimiento:</strong>}
          >
            <Checkbox
              onChange={() => setTieneVencimiento((prevState) => !prevState)}
            />
          </Form.Item>

          {/*Campo Unidades de medida -----------------------------------------------------------------------------------------------------*/}
          <div style={{ width: "100%" }}>
            <Form.List name="UnidadesDeMedidaDetalles">
              {(fields, { add, remove }) => (
                <>
                  <Collapse
                    defaultActiveKey={["1"]}
                    //onChange={onChangeCollapse}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "20px",
                    }}
                  >
                    {fields.map(({ key, name, ...restField }) => (
                      <Collapse.Panel
                        header={renderHeaderPanel(
                          OpstionsUnits.find((op) =>
                            (op.value == UnidadesDetalles) != undefined
                              ? UnidadesDetalles[name]?.IdUnidadDeMedida || 0
                              : 0
                          )?.label,

                          () => remove(name)
                        )}
                        key={key}
                      >
                        <Form.Item
                          {...restField}
                          label={<strong>Unidad de medida:</strong>}
                          name={[name, "IdUnidadDeMedida"]}
                          rules={[{ required: true, message: "Requerido" }]}
                          style={{ width: "40%" }}
                        >
                          <Select options={OpstionsUnits} size="small" />
                        </Form.Item>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            flexWrap: "wrap",
                          }}
                        >
                          <Form.Item
                            {...restField}
                            label={<strong>Precio costo:</strong>}
                            name={[name, "PrecioCosto"]}
                            rules={[{ required: true, message: "Requerido" }]}
                            style={{ width: "32%" }}
                          >
                            <InputNumber
                              placeholder="Precio costo"
                              size="small"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label={<strong>Precio venta:</strong>}
                            name={[name, "PrecioVenta"]}
                            rules={[{ required: true, message: "Requerido" }]}
                            style={{ width: "32%" }}
                          >
                            <InputNumber
                              placeholder="Precio venta"
                              size="small"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>

                          <Form.Item
                            {...restField}
                            label={<strong>ITBIS:</strong>}
                            name={[name, "ITBIS"]}
                            rules={[{ required: true, message: "Requerido" }]}
                            style={{ width: "32%" }}
                          >
                            <InputNumber
                              placeholder="ITBIS"
                              size="small"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                        </div>
                      </Collapse.Panel>
                    ))}
                  </Collapse>

                  {/*------------------------------------------------ Select de seleccionar unidad de medida y el boton de agregar:*/}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    {/*------------------------------------------------Boton para agregar la unidad de medida seleccionada en el select:*/}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{
                          marginTop: "25px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <MdLibraryAdd
                          style={{ marginRight: "7px" }}
                          size={20}
                        />
                        <span>Agregar Unidad de medida</span>
                      </Button>
                    </Form.Item>
                  </div>
                </>
              )}
            </Form.List>
          </div>

          {/*------------ CAMPO FOTOS DEL PRODUCTO DEL PRODUCTO: ------------*/}
          <Form.Item
            name="CapacitacionFoto"
            style={{
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "95%", margin: "0 auto" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                  >
                    <span style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Imágenes del producto:
                    </span>
                    <Tooltip
                      title="Puede seleccionar un máximo de 4 fotos y elegir una como principal (si no elige ninguna, la primera será la principal)"
                      placement="top"
                    >
                      <MdInfo size={18} />
                    </Tooltip>
                  </div>
                </div>

                {/*CAROUSEL*/}
                <div
                  style={{
                    height: "140px",
                    background: "#252323",
                    padding: "10px",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {fileList.length < 4 ? (
                    <div style={{ marginRight: "20px" }}>
                      <Upload
                        name="ProductoFotos"
                        multiple={false}
                        maxCount={1}
                        showUploadList={false}
                        onChange={(infoFiles) => {
                          const selectedFiles = infoFiles.fileList;
                          const uniqueFiles = selectedFiles.filter(
                            (file) => !fileList.some((f) => f.uid === file.uid)
                          );

                          // Agregar archivos únicos a fileList
                          setFileList((prevState) => [
                            ...prevState,
                            ...uniqueFiles.map((uF) => {
                              return {
                                ...uF,
                              };
                            }),
                          ]);
                        }}
                      >
                        <DivUpload>
                          <DivSelectArea>
                            <span
                              style={{
                                marginTop: "10px",
                                fontWeight: "bold",
                              }}
                            >
                              Agregar
                            </span>
                            <span>
                              <MdAddLink size={30} />
                            </span>
                          </DivSelectArea>
                        </DivUpload>
                      </Upload>
                      <DivFooterFoto>
                        <MdDelete size={20} color="#AAAAAA" />
                        <MdOutlineRadioButtonUnchecked
                          size={18}
                          color="#AAAAAA"
                        />
                        <MdChangeCircle size={20} color="#AAAAAA" />
                      </DivFooterFoto>
                    </div>
                  ) : null}
                  {fileList.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        marginRight: `${
                          index === fileList.length - 1 ? "0" : "20px"
                        }`,
                      }}
                    >
                      <DivAreaFoto>
                        <Image
                          src={URL.createObjectURL(
                            file.originFileObj as RcFile
                          )}
                          alt={`Imagen-${file.uid}`}
                          style={{
                            maxHeight: "80px",
                            minWidth: "80px",
                            borderRadius: "45px",
                          }}
                        />
                      </DivAreaFoto>
                      <DivFooterFoto>
                        <Tooltip title="Eliminar esta foto">
                          <MdDelete
                            size={20}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteFoto(file)}
                          />
                        </Tooltip>

                        <Tooltip
                          title={`${
                            !dataImages[index]?.isPrincipal
                              ? "Establecer como principal"
                              : "Quitar de principal"
                          }`}
                        >
                          <DivContainerCheck>
                            <CustomChecked
                              onChange={handleCheckChange}
                              isActive={dataImages[index]?.isPrincipal}
                              dataImage={dataImages[index]}
                            />
                          </DivContainerCheck>
                        </Tooltip>

                        <div>
                          <Upload
                            name="fileChangeFile"
                            multiple={false}
                            maxCount={1}
                            showUploadList={false}
                            onChange={(infoFiles) => {
                              const selectedFile = infoFiles.fileList[0]; // Obtener el archivo seleccionado

                              // Encuentra el índice del archivo a actualizar en el fileList
                              const index = fileList.findIndex(
                                (file) => file.uid === file.uid
                              );

                              if (index !== -1) {
                                // Crear una nueva lista de archivos actualizada con la foto cambiada
                                const updatedFileList = [...fileList];
                                updatedFileList[index] = selectedFile;

                                // Actualizar el estado fileList con la nueva lista de archivos
                                setFileList(updatedFileList);
                              }
                            }}
                          >
                            <Tooltip title="Cambiar esta foto">
                              <MdChangeCircle
                                size={20}
                                style={{ cursor: "pointer", marginBottom: 0 }}
                              />
                            </Tooltip>
                          </Upload>
                        </div>
                      </DivFooterFoto>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Drawer>

      <Modal
        open={openModalUnit}
        onCancel={() => setOpenModalUnit(false)}
        footer={[
          <Button key="ok" type="primary">
            Guardar
          </Button>,
          <Button key="ok" type="primary">
            Guardar y agregar
          </Button>,
          <Button key="cancel">Cancelar</Button>,
        ]}
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaRuler />
            <span>Agregar nueva unidad de medida</span>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item
            name={"unidadNombre"}
            label={<strong>Nombre unidad:</strong>}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

const renderHeaderPanel = (unidadNombre, handleRemove) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong style={{ marginRight: "5px" }}>Unidad nombre:</strong>
        <span>{unidadNombre}</span>
      </div>

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <MdDeleteOutline
            size={22}
            style={{ marginLeft: "10px" }}
            onClick={() => handleRemove()}
          />
        </div>
      </div>
    </div>
  );
};
