import React, { useEffect, useState } from "react";
import {
  BtnNavPro,
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
import {
  useGetListaDocumentosVentasQuery,
  useGetProyectoCompletoQuery,
  useLazyGetProyectoCompletoQuery,
} from "../../redux/Api/proyectoApi";
import { MdPrint } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";
import { MdRequestQuote } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { GeneradorDocumentoVentaPDF } from "./DocumentoVentaPDF";
import { Colores } from "../../components/GlobalColor";
import { IoMegaphoneOutline, IoDocumentAttachOutline } from "react-icons/io5";

export default function CuentaPorCobrar() {
  //Fetch para obtener la lista de Documentos:
  const fetchListaDocumentos = useGetListaDocumentosVentasQuery();

  const [openGeneradorPDF, setOpenGeneradorPDF] = useState(false);
  const [Cotizacion, setCotizacion] = useState([]);

  const [trigger, { data }] = useLazyGetProyectoCompletoQuery();

  const handleButtonClick = async (item) => {
    // Llamar a la función de consulta
    const result = await trigger(item);

    // Actualizar Cotizacion y abrir el generador PDF
    if (result.data != undefined) {
      setCotizacion(result.data.Result);
      setOpenGeneradorPDF(true);
    }
  };

  const navigate = useNavigate();

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
      title: "Monto Incial",
      dataIndex: "MontoInicial",
      key: "MontoInicial",
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
                navigate(`/cuenta-por-paga/${record.IdProyecto}`),
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
                handleButtonClick(record.IdProyecto);
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
        <Container
          style={{
            marginTop: 15,
            marginBottom: 15,
            padding: 15,
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: `${Colores.AzulMar}`,
            color: `${Colores.Blanco}`,
          }}
        >
          <div>
            <h2>Facturación</h2>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <div>
              <BtnNavPro
                style={{
                  borderRadius: "12px",
                  width: "280px",
                  height: "50px",
                  padding: 15,
                  marginInline: 15,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <h4>Lista general de documentos</h4>
                </div>
              </BtnNavPro>
            </div>

            <div>
              <BtnNavPro
                style={{
                  borderRadius: "12px",
                  width: "250px",
                  height: "50px",
                  padding: 15,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <h4>Documentos por proyecto</h4>
                </div>
              </BtnNavPro>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <h3>Lista general de documentos de ventas</h3>
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

      {openGeneradorPDF == true && Cotizacion != null && Cotizacion != undefined && Array.isArray(Cotizacion) && Cotizacion.length > 0 ? (
        <>
          <GeneradorDocumentoVentaPDF
            Cotizacion={Cotizacion}
            openGeneradorPDF={openGeneradorPDF}
            setOpenGeneradorPDF={setOpenGeneradorPDF}
          />
        </>
      ) : null}
    </ViewContainerPages>
  );
}
