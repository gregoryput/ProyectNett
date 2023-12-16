import { Table, message } from "antd";
import {
  Container,
  ContainerButton,
  DropdownActionsNew,
  ViewContainerPages,
} from "../../components";
import React from "react";
import { IActionsNew, IClienteDTO, TFormType } from "../../interfaces";
import getColumnsTable from "./columnsTable";
import { useGetClientsQuery } from "../../redux/Api/clientsApiT";
import { MdOutlinePerson } from "react-icons/md";
import { MdBusiness } from "react-icons/md";

import "./styles-table.css";

import "animate.css";
import FormProveedoresEmpresas from "./FormProveedoresEmpresas/form-proveedores-e";
import FormProveedoresPersonsFi from "./FormProveedoresPersonasFisicas/form-proveedores-pf";

const Proveedores = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);

  const [formType, setFormType] = React.useState<TFormType>("form-ce");

  //Fetch para obtener la lista de clientes:
  const {
    data: clientesData,
    //isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery();

  const deleteCliente = (record: IClienteDTO) => {
    message.info("Eliminar al cliente " + record.NombreEntidad);
  };

  const viewCliente = (record: IClienteDTO) => {
    message.info("Ver detalle del cliente " + record.NombreEntidad);
  };

  const editCliente = (record: IClienteDTO) => {
    message.info("Editar al cliente " + record.NombreEntidad);
  };

  const changeFormType = (typeForm: TFormType) => {
    setFormType(typeForm);
    message.info("aaa");
  };

  return (
    <ViewContainerPages>
      <ContainerButton
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        <p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onClick={(event) => event.stopPropagation()}
          >
            <b style={{ marginRight: "7px" }}>Nuevo proveedor{"  -->> "}</b>
            <DropdownActionsNew
              Actions={[
                {
                  Value: 1,
                  Name: "NewCP",
                  Title: "Persona física",
                  Method: () => changeFormType("form-cp"),
                  Icon: <MdOutlinePerson size={20} />,
                } as IActionsNew,
                {
                  Value: 2,
                  Name: "NewCE",
                  Title: "Empresa",
                  Method: () => changeFormType("form-ce"),
                  Icon: <MdBusiness size={20} />,
                } as IActionsNew,
              ]}
              selectedTypeForm={formType}
            />
          </div>
        </p>
      </ContainerButton>

      {formType.valueOf() === "form-ce" ? (
        <FormProveedoresEmpresas toggle={toggle} setToggle={setToggle} />
      ) : (
        <FormProveedoresPersonsFi toggle={toggle} setToggle={setToggle} />
      )}

      <Container>
        <Table
          size="small"
          loading={isLoadingClients}
          pagination={{
            showTotal: (total) => ` ${total} Total`,
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: [6, 12, 18, 24, 32, 40, 45, 50, 55, 60, 100],
          }}
          dataSource={clientesData?.Result}
          columns={getColumnsTable({
            Update: editCliente,
            Delete: deleteCliente,
            ViewDetail: viewCliente,
          })}
        />
      </Container>
    </ViewContainerPages>
  );
};

export default Proveedores;
