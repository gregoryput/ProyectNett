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
  Tag,
  Checkbox,
  Modal,
  Button,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import PropTypes from "prop-types";
import { MdAddLink } from "react-icons/md";
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
  ButtonNewUnit,
  ButtonOperation,
  ContainerUnitsAddes,
  DivAddUnits,
  DivAreaFoto,
  DivCardUnit,
  DivContainerCheck,
  DivContainerSelectAddUnits,
  DivCreateNewUnit,
  DivEmptyUnits,
  DivFooterDrawer,
  DivFooterFoto,
  DivSelectArea,
  DivUpload,
  SelectAddUnits,
} from "./drawer-form-styled";
import { MdDelete } from "react-icons/md";
import { MdChangeCircle } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { FaRuler } from "react-icons/fa";

import "./styles.css"; // Importa tu archivo de estilos CSS
import CustomChecked from "./custom-checked";

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
    selectedItem: PropTypes.object.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
  };

  const [form] = Form.useForm();

  //Al momento de editar:

  React.useEffect(() => {
    selectedItem ? form.setFieldsValue(selectedItem) : null;
  }, [selectedItem, form]);

  const handleSubmit = (dataProduct) => {
    createProduct({ ...dataProduct });
  };

  const [fileList, setFileList] = useState([]);
  const [unidadesDeMedida, setUnidadesDeMedida] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openModalUnit, setOpenModalUnit] = useState();

  useEffect(() => {
    cleanInputs ? form.resetFields() : null;
    setCleanInputs(false);
  }, [cleanInputs, form, setCleanInputs]);

  //Funcion para el onChange del ChekBox personalizado:
  const handleCheckChange = (isChecked, file) => {
    setFileList((prevState) => {
      //deshabilito los checks marcados y marco el clickeado:
      const newFileList = prevState.map((pS) => ({
        ...pS,
        isPrincipal: pS.uid === file.uid ? isChecked : false,
      }));
      return newFileList;
    });
  };

  //Funcion para borrar foto:
  const handleDeleteFoto = (file) => {
    setFileList((prevState) => {
      const newFileList = prevState.filter((pS) => pS.uid !== file.uid);
      return newFileList;
    });
  };

  const clickNoPropagation = (event) => {
    event.stopPropagation(); // Detener la propagación del evento para evitar que alcance el Collapse
  };

  const getUnidadMedidaNombre = (id) => {
    const optionUnidadMedida = OpstionsUnits?.find((oU) => oU.value === id);
    return optionUnidadMedida?.label;
  };

  const handleClickAddUnit = () => {
    setUnidadesDeMedida((unitsIds) => {
      // Verificar si selectedUnit ya está en el array antes de añadirlo
      if (!unitsIds.includes(selectedUnit)) {
        setSelectedUnit(null);
        return [...unitsIds, selectedUnit];
      } else {
        setSelectedUnit(null);
        return unitsIds; // No modificar si ya está presente
      }
    });
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
        {/*--- SKELETON PARA CUANDO SE ESTE GUARDANDO: */}
        {statusFetch.loading ? (
          <div>
            <Skeleton active={statusFetch.loading} />
            <br />
            <Skeleton active={statusFetch.loading} />
            <br />
            <Skeleton active={statusFetch.loading} />
          </div>
        ) : (
          /*--- FORMULARIO */
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

            {/*------------ CAMPO MODELO DEL PRODUCTO: ------------*/}
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

            {/*------------ CAMPO DESCRIPCION DEL PRODUCTO: ------------*/}
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

            {/*------------ CAMPO PRECIO COSTO DEL PRODUCTO: ------------*/}
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

            {/*------------ CAMPO PRECIO VENTA DEL PRODUCTO: ------------*/}
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

            {/*------------ CAMPO ITBIS DEL PRODUCTO: ------------*/}
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

            {/*------------ CAMPO CODIGO DEL PRODUCTO: ------------*/}
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
              name={"GenerarCodigo"}
            >
              <Checkbox>
                <strong>Tiene vencimiento</strong>
              </Checkbox>
            </Form.Item>

            {/*Campo Unidades de medida*/}
            <strong
              style={{
                marginBottom: "5px",
              }}
            >
              Unidades de medida:
            </strong>
            <Collapse style={{ width: "100%", marginBottom: "30px" }}>
              <Collapse.Panel
                header={
                  <DivAddUnits onClick={clickNoPropagation}>
                    <strong>Agregar:</strong>
                    <DivContainerSelectAddUnits>
                      <SelectAddUnits
                        value={selectedUnit}
                        onChange={(value) => setSelectedUnit(value)}
                        options={OpstionsUnits}
                        placeholder="Buscar unidad de medida"
                      />
                      <MdLibraryAdd
                        size={30}
                        onClick={() => handleClickAddUnit()}
                      />
                    </DivContainerSelectAddUnits>
                  </DivAddUnits>
                }
                key="1"
              >
                {/*Div para mostrar el boton opcion de agregar nueva unidad de medida*/}
                <DivCreateNewUnit>
                  <ButtonNewUnit
                    size="small"
                    onClick={() => setOpenModalUnit(true)}
                  >
                    <FaRuler style={{ marginRight: "6px" }} size={15} />
                    <span>Crear unidad de medida</span>
                  </ButtonNewUnit>
                </DivCreateNewUnit>

                {unidadesDeMedida?.length > 0 ? (
                  <ContainerUnitsAddes>
                    {unidadesDeMedida?.map((id, index) => (
                      <DivCardUnit key={index}>
                        <Tooltip title="Quitar unidad de medida">
                          <MdDelete
                            size={20}
                            cursor={"pointer"}
                            onClick={() =>
                              setUnidadesDeMedida((prevState) => {
                                const newState = prevState.filter(
                                  (idD) => idD !== id
                                );
                                return newState;
                              })
                            }
                          />
                        </Tooltip>
                        <span style={{ marginRight: "4px" }}>{">"}</span>
                        <Tag
                          style={{
                            minWidth: "100px",
                            fontWeight: "bold",
                            color: "black",
                            border: "1px solid black",
                          }}
                          color="#F0E9E9"
                        >
                          {getUnidadMedidaNombre(id)}
                        </Tag>
                      </DivCardUnit>
                    ))}
                  </ContainerUnitsAddes>
                ) : (
                  <DivEmptyUnits>
                    <span style={{ color: "#D9D7D7", fontWeight: "bold" }}>
                      Usted no ha agregado ninguna unidad de medida
                    </span>
                  </DivEmptyUnits>
                )}
              </Collapse.Panel>
            </Collapse>

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
                              (file) =>
                                !fileList.some((f) => f.uid === file.uid)
                            );

                            // Agregar archivos únicos a fileList
                            setFileList((prevState) => [
                              ...prevState,
                              ...uniqueFiles.map((uF) => {
                                return {
                                  ...uF,
                                  isPrincipal:
                                    prevState.length === 0 ? true : false,
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
                            src={URL.createObjectURL(file.originFileObj)}
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
                              !file.isPrincipal
                                ? "Establecer como principal"
                                : "Quitar de principal"
                            }`}
                          >
                            <DivContainerCheck>
                              <CustomChecked
                                onChange={handleCheckChange}
                                isActive={file.isPrincipal}
                                file={file}
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
        )}
      </Drawer>

      <Modal
        open={openModalUnit}
        onClose={() => setOpenModalUnit(false)}
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
