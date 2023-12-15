import React from "react";
import {
  Container,
  DropdownActionsLists,
  ViewContainerPages,
} from "../../components";
import { Button, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { IDocumentoDTO } from "../../interfaces";
import {
  MdDeleteOutline,
  MdOutlineEdit,
  MdOutlineVisibility,
} from "react-icons/md";
import { useGetListaDocumentosVentasQuery } from "../../redux/Api/proyectoApi";
import { MdPrint } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";
import { MdRequestQuote } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { GeneradorDocumentoVentaPDF } from "./DocumentoVentaPDF";

export default function CuentaPorCobrar() {
  //Fetch para obtener la lista de Documentos:
  const fetchListaDocumentos = useGetListaDocumentosVentasQuery();
  const navigate = useNavigate();

  const [openGeneradorPDF, setOpenGeneradorPDF] =
    React.useState<boolean>(false);

  const [selectedItem, setSelectedItem] = React.useState<IDocumentoDTO>();

  const columns: ColumnsType<IDocumentoDTO> = [
    {
      title: "Secuencia o NCF",
      dataIndex: "Secuencia",
      key: "Secuencia",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "FechaDeEmision",
      dataIndex: "FechaDeEmision",
      key: "FechaDeEmision",
    },
    {
      title: "Tipo de documento",
      key: "DocumentoNombre",
      dataIndex: "DocumentoNombre",
      render: (_, record) => <Tag>{record.DocumentoNombre}</Tag>,
    },
    {
      title: "Monto total",
      dataIndex: "MontoTotal",
      key: "MontoTotal",
    },
    {
      title: "Proyecto asociado",
      dataIndex: "NombreProyecto",
      key: "NombreProyecto",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cliente",
      dataIndex: "NombreEntidad",
      key: "NombreEntidad",
    },
    {
      title: "Tipo de cliente",
      dataIndex: "NombreTipoEntidad",
      key: "NombreTipoEntidad",
      render: (_, record) => <Tag>{record.NombreTipoEntidad}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: IDocumentoDTO, index) => (
        <DropdownActionsLists
          key={index}
          Actions={[
            {
              Name: "ViewDetailD",
              Title: "Detalles del documento",
              Method: () => console.log("aa"),
              Icon: <MdDocumentScanner size={20} color="#25375B" />,
            },
            {
              Name: "ViewDetailP",
              Title: "Detalles del proyecto",
              Method: () => console.log("aa"),
              Icon: <MdOutlineVisibility size={20} color="#25375B" />,
            },
            {
              Name: "ConvertInvoice",
              Title: "Convertir en factura",
              Method: () =>
                navigate("/cuentas-por-pagar-facturar-cotizacion=1"),
              Icon: <MdRequestQuote size={20} color="#25375B" />,
            },
            {
              Name: "Delete",
              Title: "Desactivar",
              Method: () => console.log("aaaa"),
              Icon: <MdDeleteOutline size={20} color="#25375B" />,
            },
            {
              Name: "Imprimir",
              Title: "Imprimir",
              Method: () => {
                setSelectedItem(record);
                setOpenGeneradorPDF(true);
              },
              Icon: <MdPrint size={20} color="#25375B" />,
            },
          ]}
        />
      ),
    },
  ];

  return (
    <ViewContainerPages>
      <div>
        <Button>Lista general de documentos</Button>
        <Button>Documentos por proyecto</Button>
      </div>
      <Container>
        <h2>Lista genreal de documentos de ventas</h2>
        <br />
        <Table
          size="small"
          loading={fetchListaDocumentos.isLoading}
          pagination={{
            showTotal: (total) => ` ${total} Total`,
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [6, 12, 18, 24, 32, 40, 45, 50, 55, 60, 100],
          }}
          dataSource={fetchListaDocumentos?.data?.Result}
          columns={columns}
        />
      </Container>

      <GeneradorDocumentoVentaPDF
        documentoData={selectedItem}
        openGeneradorPDF={openGeneradorPDF}
        setOpenGeneradorPDF={setOpenGeneradorPDF}
      />
    </ViewContainerPages>
  );
}
