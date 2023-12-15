import { Button, DatePicker, Form, Input, Select, Tabs, TabsProps } from "antd";
import React from "react";
import { Container, ViewContainerPages } from "../../components";
import { MdGroupWork } from "react-icons/md";
import Table, { ColumnsType } from "antd/es/table";

interface ICuotaPago {
  MontoPago: number;
  FechaPago: Date;
  TipoVencimiento: number;
  FechaVencimiento: Date;
}

const FormConvertToInvoice = () => {
  const [cuotasPagos, setCuotasPagos] = React.useState<ICuotaPago[]>(
    [] as ICuotaPago[]
  );

  const columnsTablePagos: ColumnsType<any> = [
    {
      title: "Monto para el pago",
      dataIndex: "MontoPago",
      key: "MontoPago",
      render: () => <Input />,
    },
    {
      title: "Fecha para el pago",
      dataIndex: "FechaPago",
      key: "FechaPago",
      render: () => <DatePicker />,
    },
    {
      title: "Tipo de vencimiento",
      dataIndex: "TipoVencimiento",
      key: "TipoVencimiento",
      render: () => (
        <Select options={[{ label: "Vencimiento manual", value: 1 }]} />
      ),
    },
    {
      title: "Fecha de vencimiento",
      dataIndex: "FechaVencimiento",
      key: "FechaVencimiento",
      render: () => (
        <Select options={[{ label: "Vencimiento manual", value: 1 }]} />
      ),
    },
  ];

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <MdGroupWork />
          <span>Información del proyecto</span>
        </div>
      ),
      children: (
        <div>
          <div>
            <div>
              <strong>Nombre del proyecto:</strong>
              <span>Proyecto de prueba</span>
            </div>

            <div>
              <strong>Monto total:</strong>
              <span>{"$30,000"}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div>
          <MdGroupWork />
          <span>Informacion del cliente</span>
        </div>
      ),
      children: (
        <div>
          <div>Foto</div>
          <div>
            <strong>Nombre:</strong>
            <span>{"Juaniquito"}</span>
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <MdGroupWork />
          <span>Distribucion de pagos</span>
        </div>
      ),
      children: (
        <div>
          <div>
            <strong>Pago inicial para la facturacion:</strong>
            <span>{"3000"}</span>

            <div>
              <span>Cargo por mora:</span>
              <Input />
            </div>
          </div>

          <h3>Distribucion de cuotas para pagos posteriores:</h3>
          <Table
            columns={columnsTablePagos}
            dataSource={cuotasPagos}
            size={"small"}
            style={{ width: "690px" }}
          />
          <Button
            onClick={() =>
              setCuotasPagos((prevState) => [
                ...prevState,
                {
                  FechaPago: new Date(),
                  TipoVencimiento: 1,
                  FechaVencimiento: new Date(),
                  MontoPago: 0,
                },
              ])
            }
          >
            Agregar cuota de pago
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ViewContainerPages>
      <Container>
        <h3>Datos de encabezado</h3>
        <Form>
          <Form.Item name={"Fecha de emisión"}>
            <DatePicker />
          </Form.Item>

          <Form.Item name={"Fecha de vencimiento"}>
            <DatePicker />
          </Form.Item>

          <Form.Item
            name={"Tipo de NCF"}
            style={{ width: "300px" }}
            label={"Tipo de NCF"}
          >
            <Select
              options={[
                { value: 1, label: "Consumidor final" },
                { value: 1, label: "Registro unico de ingresos" },
              ]}
            />
          </Form.Item>
        </Form>
      </Container>

      <Container>
        <div>Información crucial del proyecto:</div>
        <Tabs defaultActiveKey="1" items={items} />
      </Container>
    </ViewContainerPages>
  );
};
export default FormConvertToInvoice;
