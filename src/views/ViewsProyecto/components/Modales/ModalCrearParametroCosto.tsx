import { Form, Input, Modal, Skeleton } from "antd";
import React from "react";
import { useCreateParametroCostoMutation } from "../../../../redux/Api/proyectoApi";

interface IModalCrearParametro {
  open: boolean;
  onClose: () => void;
}
const ModalCrearParametro = ({ open, onClose }: IModalCrearParametro) => {
  const [form] = Form.useForm();

  // Fetch Mutation Redux para hacer la solicitud de insert:
  const [executeCreateParam, petitionCreateParam] =
    useCreateParametroCostoMutation();

  const onSubmit = () => {
    const nombreParametro = form.getFieldValue("NombreParametro");
    executeCreateParam({ NombreParametro: nombreParametro });
  };

  return (
    <Modal
      title={"Crear un nuevo parametro de costo"}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={() => onSubmit()}
      open={open}
    >
      {petitionCreateParam.isLoading ? (
        <div>
          <Skeleton />
        </div>
      ) : (
        <Form>
          <Form.Item
            label={<strong>Nombre del parametro</strong>}
            name={"NombreParametro"}
          >
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default ModalCrearParametro;
