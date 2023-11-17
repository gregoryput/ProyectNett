import {
  Button,
  Carousel,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Upload,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import { MdAddLink } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RxInput } from "react-icons/rx";
import { FiSave } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
//import imagen1 from "./pics/imagen1.jpg";
//import imagen2 from "./pics/imagen2.jpg";
//import imagen3 from "./pics/imagen3.jpg";
//import imagen4 from "./pics/imagen4.jpg";
import "../../../GeneralStyles/form-styles.css";
import React, { useState, useEffect } from "react";

export default function DrawerForm({
  Open,
  OnClose,
  Title,
  OpstionsUnits,
  createProduct,
  statusFetch,
  cleanInputs,
  setCleanInputs,
  selectedItem,
}) {
  DrawerForm.propTypes = {
    Open: PropTypes.bool.isRequired,
    OnClose: PropTypes.func.isRequired,
    Title: PropTypes.element.isRequired,
    OpstionsUnits: PropTypes.array,
    createProduct: PropTypes.any.isRequired,
    statusFetch: PropTypes.object.isRequired,
    setCleanInputs: PropTypes.func.isRequired,
    cleanInputs: PropTypes.bool.isRequired,
    selectedItem: PropTypes.bool.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
  };

  const [form] = Form.useForm();

  //Al momento de editar:
  React.useEffect(() => {
    form.setFieldsValue(selectedItem);
    console.log("aqui toy", selectedItem);
  }, [selectedItem, form]);

  const handleSubmit = (dataProduct) => {
    createProduct({ ...dataProduct });
  };

  const [fileList, setFileList] = useState([]);
  console.log("fileListfileListfileList", fileList);

  // Función para manejar la vista previa de la imagen si es necesario
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    cleanInputs ? form.resetFields() : null;
    setCleanInputs(false);
  }, [cleanInputs, form, setCleanInputs]);

  return (
    <>
      <Drawer
        title={Title}
        headerStyle={{
          background: "#E8E4E4",
        }}
        open={Open}
        onClose={() => OnClose()}
        bodyStyle={{ background: "#F8F5F5" }}
        width="37%"
        footerStyle={{
          background: "#E8E4E4",
          boxShadow: "0px -0.5px 5px rgba(0, 0, 0, 0.4)",
        }}
        footer={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              loading={statusFetch.loading}
              icon={
                selectedItem === undefined ? (
                  <FiSave size={20} color="#4096FF" />
                ) : (
                  <FaEdit size={20} color="#4096FF" />
                )
              }
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
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
            </Button>
            <Button
              loading={statusFetch.loading}
              style={{
                marginLeft: "15px",
                marginRight: "15px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              icon={<IoClose size={25} color="#FF4343" />}
              onClick={() => {
                OnClose();
                setCleanInputs(true);
              }}
            >
              <strong>Cancelar</strong>
            </Button>
            <Button
              loading={statusFetch.loading}
              icon={<RxInput size={20} color="#4096FF" />}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={() => setCleanInputs(true)}
            >
              <strong>Limpiar campos</strong>
            </Button>
          </div>
        }
      >
        {statusFetch.loading ? (
          <div>
            <Skeleton active={statusFetch.loading} />
            <br />
            <Skeleton active={statusFetch.loading} />
            <br />
            <Skeleton active={statusFetch.loading} />
          </div>
        ) : (
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
              name={"nombre"}
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

            <Form.Item
              label={<strong>Modelo:</strong>}
              style={{ width: "30%" }}
              name={"modelo"}
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

            <Form.Item
              label={<strong>Descripción:</strong>}
              style={{ width: "100%" }}
              name={"descripción"}
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

            <Form.Item
              label={<strong>Precio costo:</strong>}
              style={{ width: "32%" }}
              name={"precioCosto"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el precio de costo del producto",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Precio" />
            </Form.Item>

            <Form.Item
              label={<strong>Precio venta:</strong>}
              style={{ width: "32%" }}
              name={"precioVenta"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el precio de venta del producto",
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="Precio" />
            </Form.Item>

            <Form.Item
              label={<strong>Itbis:</strong>}
              style={{ width: "32%" }}
              name={"itbis"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar el Itbis del producto",
                },
              ]}
            >
              <Input placeholder="Precio" />
            </Form.Item>

            <Form.Item
              label={<strong>Unidad de medida:</strong>}
              style={{ width: "49%" }}
              name={"idUnidad_DeMedida"}
              rules={[
                {
                  required: true,
                  message: "Debe ingresar la unidad de medida",
                },
              ]}
            >
              <Select
                options={OpstionsUnits}
                placeholder="Seleccione una unidad"
              />
            </Form.Item>

            <Form.Item
              label={<strong>Código:</strong>}
              name={"codigo"}
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
                  message: "5 caracteres como minimo",
                },
              ]}
            >
              <Input placeholder="Ingrese el código" />
            </Form.Item>

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
                <div
                  style={{
                    width: "7%",
                    display: "flex",
                    flexDirection: "column",
                    marginRight: "40px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Seleccionar
                  </span>
                  <Upload
                    name="ProductoFotos"
                    multiple={false}
                    maxCount={1}
                    showUploadList={false}
                    onChange={(infoFiles) => {
                      const selectedFiles = infoFiles.fileList;
                      const uniqueNewFiles = selectedFiles.filter(
                        (file) => !fileList.some((f) => f.uid === file.uid)
                      );

                      // Combinar archivos anteriores con nuevos archivos únicos
                      setFileList((prevState) => [
                        ...prevState,
                        ...uniqueNewFiles,
                      ]);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        background: "#252323",
                        padding: "3px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                    >
                      <MdAddLink size={40} color="#4096FF" />
                    </div>
                  </Upload>
                </div>

                <div style={{ width: "86%" }}>
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
                        title="Puede seleccionar un máximo de 4 fotos y elegir una como principal"
                        placement="top"
                      >
                        <BiHelpCircle style={{ marginLeft: "5px" }} />
                      </Tooltip>
                    </div>
                  </div>

                  {/*CAROUSEL*/}
                  <Carousel
                    slidesToShow={3}
                    autoplay
                    style={{
                      height: "100px",
                      background: "#252323",
                      padding: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    {fileList.map((file) => (
                      <div
                        key={file.uid}
                        style={{ width: "100px", height: "100px" }}
                      >
                        {handlePreview(file) ? (
                          <Image
                            //src={file.preview}
                            src={handlePreview(file)}
                            alt={`Imagen-${file.uid}`}
                            style={{
                              maxWidth: "100px",
                              borderRadius: "70%",
                              border: "2px solid #4096FF",
                            }}
                          />
                        ) : (
                          // Si no hay vista previa, puedes mostrar un indicador de carga o algo similar
                          <p>Cargando...</p>
                        )}
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
}

{
  /*
                      <div style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={imagen1}
                        style={{
                          maxWidth: "100px",
                          borderRadius: "70%",
                          border: "2px solid #4096FF",
                        }}
                      />
                    </div>
                    <div style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={imagen2}
                        style={{
                          maxWidth: "100px",
                          borderRadius: "70%",
                          border: "2px solid #4096FF",
                        }}
                      />
                    </div>
                    <div style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={imagen3}
                        style={{
                          maxWidth: "100px",
                          borderRadius: "70%",
                          border: "2px solid #4096FF",
                        }}
                      />
                    </div>
                    <div style={{ width: "100px", height: "100px" }}>
                      <Image
                        src={imagen4}
                        style={{
                          maxWidth: "100px",
                          borderRadius: "70%",
                          border: "2px solid #4096FF",
                        }}
                      />
                    </div>
  */
}
