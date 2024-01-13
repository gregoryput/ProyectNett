import React, { useEffect, useState } from "react";
import {
  Container,
  DropdownActionsLists,
  ViewContainerPages,
} from "../../components";
import { Input, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import {
  IDocumentoCompraDTO,
  IDocumentoDTO,
  IOrdenCompraDTO,
} from "../../interfaces";
import {
  useGetListaDocumentosComprasQuery,
  useLazyGetProyectoCompletoQuery,
} from "../../redux/Api/proyectoApi";
import { MdPrint } from "react-icons/md";
import { MdDocumentScanner } from "react-icons/md";
import { MdRequestQuote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GeneradorOrdenCompraPDF } from "./DocumentoCompraPDF";
import dayjs from "dayjs";
//import { useGetOrdenCompraByIdQuery } from "../../redux/Api/productsApi";
const { Search } = Input;

export default function CuentaPorCobrar() {
  //Fetch para obtener la lista de Documentos:
  const fetchListaDocumentos = useGetListaDocumentosComprasQuery();

  const [openGeneradorPDF, setOpenGeneradorPDF] = useState(false);

  const [filteredData, setFilteredData] = useState<IDocumentoCompraDTO[]>();

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = fetchListaDocumentos?.data?.Result.filter((item) =>
      item.Secuencia.toLowerCase().includes(searchTerm)
    );

    setFilteredData(filter);
  };

  useEffect(() => {
    if (fetchListaDocumentos?.data?.Result !== undefined) {
      setFilteredData(fetchListaDocumentos?.data?.Result);
    }
  }, [fetchListaDocumentos?.data?.Result, setFilteredData]);

  const navigate = useNavigate();

  const columns: ColumnsType<IDocumentoCompraDTO> = [
    {
      title: "Secuencia o NCF",
      dataIndex: "Secuencia",
      key: "Secuencia",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Fecha de emision",
      dataIndex: "FechaDeEmision",
      key: "FechaDeEmision",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
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
      render: (text) => (
        <p>
          RD$
          {parseFloat(text).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      ),
    },

    {
      title: "Estado documento",
      dataIndex: "NombreEstadoDocumeto",
      key: "NombreEstadoDocumeto",
      render: (_, recor) => <Tag>{recor.NombreEstadoDocumeto}</Tag>,
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
      render: (_, record: IDocumentoCompraDTO, index) => (
        <DropdownActionsLists
          setOrdenId={() => setOrdenId(record.IdDocumento)}
          key={index}
          Actions={
            record?.DocumentoNombre === "Cotización de proyecto"
              ? [
                  {
                    Name: "ConvertInvoice",
                    Title: "Convertir en factura",
                    Method: () =>
                      navigate(`/cuenta-por-paga/${record.IdDocumento}`),
                    Icon: <MdRequestQuote size={20} color="#25375B" />,
                  },
                  {
                    Name: "Imprimir",
                    Title: "Imprimir",
                    Method: () => setOpenGeneradorPDF(true),
                    Icon: <MdPrint size={20} color="#25375B" />,
                  },
                  // Puedes agregar más acciones aquí si se cumple la condición
                ]
              : record?.DocumentoNombre === "Factura de compra"
              ? [
                  {
                    Name: "ViewDetailD",
                    Title: "Realizar pago",
                    Method: () =>
                      navigate(`/PagarCuotas/${record.IdDocumento}`),
                    Icon: <MdDocumentScanner size={20} color="#25375B" />,
                  },
                ]
              : [
                  {
                    Name: "Imprimir",
                    Title: "Imprimir",
                    Method: () => setOpenGeneradorPDF(true),
                    Icon: <MdPrint size={20} color="#25375B" />,
                  },
                ]
          }
        />
      ),
    },
  ];

  const [OrdenId, setOrdenId] = React.useState<number>(0);
  //api para obtener la lista de productos

  return (
    <ViewContainerPages>
      {/* <div>
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
      </div> */}
      <Container>
        <h3>Lista general de documentos de ventas</h3>
        <br />
        <div>
          <Search
            placeholder="Buscar por nombre"
            style={{
              width: 304,
              marginTop: 10,
              marginBottom: 40,
            }}
            onSearch={handleSearch}
          />
        </div>
        <Table
          size="small"
          loading={fetchListaDocumentos.isLoading}
          pagination={{
            showTotal: (total) => ` ${total} Total`,
            defaultPageSize: 100,
            showSizeChanger: true,
            pageSizeOptions: [6, 12, 18, 24, 32, 40, 45, 50, 55, 60, 100],
          }}
          dataSource={filteredData}
          columns={columns}
        />
      </Container>

      {openGeneradorPDF == true ? (
        <>
          <GeneradorOrdenCompraPDF
            OrdenId={OrdenId}
            onCloseGenerador={() => setOpenGeneradorPDF(false)}
            //responseOrdenCompra={responseOrdenCompra}
          />
        </>
      ) : null}
    </ViewContainerPages>
  );
}
