import {
  Drawer,
  Form,
  Input,
  InputNumber,
  Collapse,
  Modal,
  Button,
  Select,
  UploadFile,
  Switch,
} from "antd";
import TextArea from "antd/es/input/TextArea";

import { MdDeleteOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RxInput } from "react-icons/rx";
import { FiSave } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";

import "../../../GeneralStyles/form-styles.css";
import React, { useState, useEffect } from "react";
import {
  ButtonCancelOp,
  ButtonClearInputs,
  ButtonOperation,
  DivFooterDrawer,
} from "./drawer-form-styled";
import { FaRuler } from "react-icons/fa";

import "./styles.css";
import useBase64Conversion from "../../../hooks/UseBase64Conversion";
import { CustomUploadImageProduct } from "../../../components/CustomUploadImage";
import { IImagen, IProductInv, IProductoImagen } from "../../../interfaces";

export interface IDrawerFormProps {
  //
  dataEditProducto: IProductInv | undefined;
  //
  setDataEditProduct: React.Dispatch<
    React.SetStateAction<IProductInv | undefined>
  >;
  //
  statusFetch: {
    loading: boolean;
    success: boolean;
    error: boolean;
  };
  //
  cleanInputs: any;
  setCleanInputs: React.Dispatch<any>;
  createProduct: any;
  //
  Open: boolean;
  OnClose: () => void;
  OpstionsUnits: any;
  selectedItem: any;
  Title: React.JSX.Element;
}

export default function DrawerForm({
  dataEditProducto,
  Open,
  OnClose,
  Title,
  createProduct,
  statusFetch,
  cleanInputs,
  setCleanInputs,
  selectedItem,
  OpstionsUnits,
}: IDrawerFormProps) {
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

  // Obtener el archivo cargado en el upload:
  const selectedFile = fileList[0];

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

  // Crear objeto data para la imagen:
  let objectImage =
    fileList.length > 0
      ? ({
          IdImagen: dataEditProducto?.DataImagenProducto?.Imagen.IdImagen || 0,
          FileName: selectedFile.name,
          ContentType: selectedFile.type || "",
          FileSize: selectedFile.size || 0,
          Data: dataImage,
        } as IImagen)
      : undefined;

  const [TieneVencimiento, setTieneVencimiento] =
    React.useState<boolean>(false);

  const [deleteImageEditMode, setDeleteImageEditMode] =
    React.useState<boolean>(false);

  const handleSubmit = (dataProduct) => {
    const dataSubmitProduct: IProductInv = {
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

      DataImagenProducto:
        objectImage !== undefined
          ? {
              Imagen: objectImage as IImagen,
              ProductoImagen: {
                IdPrductoImagen:
                  dataEditProducto?.DataImagenProducto?.ProductoImagen
                    .IdPrductoImagen || 0,
                IdImagen: objectImage?.IdImagen || 0,
                IdProducto: dataEditProducto?.IdProducto || 0,
              } as IProductoImagen,
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
              ProductoImagen: {
                IdPrductoImagen: 0,
                IdImagen: 0,
                IdProducto: 0,
              },
            }
          : undefined,
    };
    createProduct({ ...dataSubmitProduct });
  };

  const [openModalUnit, setOpenModalUnit] = useState<boolean>(false);

  useEffect(() => {
    cleanInputs ? form.resetFields() : null;
    setCleanInputs(false);
  }, [cleanInputs, form, setCleanInputs]);

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

          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {/*------------ CAMPO FOTOS DEL PRODUCTO: ------------*/}
            <div style={{ width: "14%", marginLeft: "10px" }}>
              <CustomUploadImageProduct
                fileList={fileList}
                setFileList={setFileList}
                width="100%"
                dataEditProduct={dataEditProducto}
                deleteImageEditMode={deleteImageEditMode}
                setDeleteImageEditMode={setDeleteImageEditMode}
              />
            </div>

            {/*------------ CAMPO CODIGO DEL PRODUCTO: ------------*/}
            <Form.Item
              label={<strong>Código:</strong>}
              name={"Codigo"}
              style={{ width: "30%" }}
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

            {/*------------ CAMPO TIENE VENCIMIENTO: ------------*/}
            <Form.Item
              style={{
                width: "30%",
                display: "flex",
                alignItems: "flex-end",
              }}
              valuePropName="checked"
              name={"TieneVencimiento"}
              label={<strong>Tiene vencimiento:</strong>}
            >
              <Switch
                style={{ width: "80px", marginLeft: "60px" }}
                onChange={() => setTieneVencimiento((prevState) => !prevState)}
              />
            </Form.Item>
          </div>

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
                          OpstionsUnits?.find((op) =>
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
