import PropTypes from "prop-types";
import { ButtonSave, Container } from "../../../../components";
import { Modal } from "antd";
import { Form, Input, InputNumber } from "antd";

ModalGasto.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  CloseModal: PropTypes.func.isRequired,
  setGasto: PropTypes.func.isRequired,
  gasto: PropTypes.func.isRequired,
};

export default function ModalGasto({
  isModalOpen,
  CloseModal,
  setGasto,
  gasto,
}) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleCloses();
    setGasto([...gasto, values]);
  };

  const handleCloses = () => {
    CloseModal();
    form.resetFields(["Descripcion", "Costo"]);
  };

  return (
    <>
      {" "}
      <Modal
        title="Recurso adicionales"
        open={isModalOpen}
        centered
        footer={null}
        width={800}
        onCancel={handleCloses}
      >
        <Form form={form} onFinish={onFinish}>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 0,
              width: "100%",
              justifyContent: "space-between",
              paddingRight: 100,
            }}
          >
            <Form.Item
              label={<strong>Recurso adicionales</strong>}
              name={"Descripcion"}
              rules={[
                {
                  required: true,
                  message: "No hay Recurso adicionales",
                },
                {
                  max: 40,
                  message: "40 caracteres como máximo",
                },
              ]}
            >
              <Input placeholder="Describe el gasto" />
            </Form.Item>

            <Form.Item
              label={<strong>Costo</strong>}
              name={"Costo"}
              rules={[
                {
                  required: true,
                  message: "No hay precio",
                },
              ]}
            >
              <InputNumber
                min={1}
                defaultValue={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                style={{ width: 100 }}
              />
            </Form.Item>
          </Container>
          <div style={{display:"flex", justifyContent:"flex-end"}}>
          <ButtonSave type="submit">Guardar</ButtonSave>
          </div>
        </Form>
      </Modal>
    </>
  );
}
