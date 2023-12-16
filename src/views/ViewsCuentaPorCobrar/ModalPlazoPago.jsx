import PropTypes from "prop-types";
import { ButtonSave, Container } from "../../components";
import { Modal } from "antd";
import { Form, DatePicker, InputNumber } from "antd";

ModalPlazoPago.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  CloseModal: PropTypes.func.isRequired,
  setFactura: PropTypes.func.isRequired,
  factura: PropTypes.func.isRequired,
};

export default function ModalPlazoPago({
  isModalOpen,
  CloseModal,
  setFactura,
  factura,
}) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    handleCloses();
    setFactura([...factura, values]);
  };

  const handleCloses = () => {
    CloseModal();
    form.resetFields(["Descripcion", "Costo"]);
  };

  return (
    <>
      {" "}
      <Modal
        title="Configuración de pago"
        open={isModalOpen}
        centered
        footer={null}
        width={900}
        onCancel={handleCloses}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              margin: 0,
              width: "100%",
              justifyContent: "space-between",
              
            }}
          >
           
           
           <Form.Item
              label={<strong>Fecha de Emision </strong>}
              name={"FechaDeEmision"}
              rules={[
                {
                  required: true,
                  message: "No hay Descripción",
                },
              
              ]}
            >
              <DatePicker placeholder="Describe el gasto" />
            </Form.Item>
            <Form.Item
              label={<strong>Fecha de vencimiento</strong>}
              name={"FechaDeVencimiento"}
              rules={[
                {
                  required: true,
                  message: "No hay precio",
                },
              ]}
            >
               <DatePicker placeholder="Describe el gasto" />
            </Form.Item>
            <Form.Item
              label={<strong>Monto a pagar</strong>}
              name={"Monto"}
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
