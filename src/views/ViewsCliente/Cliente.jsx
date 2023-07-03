import { useState } from "react";
import { Space, Table, Skeleton } from "antd";
import {
  ContainerButton,
  DivAnimetor,
  ViewContainerPages,
} from "../../components";

import { FormClientes } from "./Form";
import { useGetClientsQuery } from "../../redux/Api/clientsApi";

import { IoChevronDownSharp, IoCloseCircleOutline } from "react-icons/io5";

export default function Cliente() {
  const [toggle, setToggle] = useState(true);

  const {
    data: clientesData,
    isSuccess: isClientsSuccess,
    isLoading: isLoadingClients,
  } = useGetClientsQuery("");

  console.log(clientesData);

  return (
    <ViewContainerPages>
      <ContainerButton onClick={() => setToggle(!toggle)}>
        <h4>Crear nuevo cliente</h4>
        <DivAnimetor>
          <IoChevronDownSharp style={{ width: 20, height: 20 }} />
        </DivAnimetor>
      </ContainerButton>

      <FormClientes toggle={toggle} />

<<<<<<< HEAD
        <h3>Información personal </h3>
        </div>
        
        <form  style={{display: "grid", gridTemplateColumns: "0.5fr 0.5fr 0.5fr", gap: 5 ,marginTop:20}} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <LabelFor > Nombre
        <InputFor {...register("example")} placeholder='Nombre'/>
        </LabelFor>

        <LabelFor>Apellido
        <InputFor {...register("example")} placeholder='Apellido '/>
        </LabelFor>

        <LabelFor>Telefono 1
        <InputFor {...register("example")} placeholder='Telefono 1 '/>
        </LabelFor>

        <LabelFor>Telefono 2 opcional
        <InputFor {...register("example")} placeholder='Telefono 2 '/>
        </LabelFor>

        <LabelFor> Direccion 
        <InputFor {...register("example")} placeholder='Direccion '/>
        </LabelFor>

        <LabelFor> Correo
        <InputFor {...register("example")} placeholder='Correo '/>
        </LabelFor>

        <LabelFor> Celular
        <InputFor {...register("example")} placeholder='Celular '/>
        </LabelFor>

        <LabelFor> Edad
        <InputFor {...register("example")} placeholder='Edad '/>
        </LabelFor>

         <LabelFor> Sexo
         <Select >
          {options.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
      ))}
          </Select>
         </LabelFor>


         <LabelFor> Pais 
         <Select >
          {options.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
      ))}
          </Select>
         </LabelFor>

         <LabelFor> Ciudad 
         <Select >
          {options.map((option, index) => (
            <Option key={index} value={option.value}>
              {option.label}
            </Option>
      ))}
          </Select>
         </LabelFor>


    </form>
       </ContainerForm>


      <Tabla/>
=======
      {isLoadingClients ? <Skeleton active /> : <Tabla data={clientesData?.result} />}
>>>>>>> 0bf79c873628f10f3254c70c4998e2b1243ed4e8
    </ViewContainerPages>
  );
}

const { Column } = Table;

function Tabla(props) {
  return (
    <div style={{ margin:12 ,border:"1px solid #e2e2e2" ,padding:20,borderRadius:12 }} >  
    <Table dataSource={data} >
        <Column title="Nombre" dataIndex="Nombre" key="Nombre" />
        <Column title="Apellido" dataIndex="Apellido" key="Apellido" />
      <Column title="Teléfono 1" dataIndex="Telefono 1" key="Telefono 1" />
      <Column title="Correo" dataIndex="Correo" key="Correo" />
      <Column title="Celular" dataIndex="Celular" key="Celular" />
 
    <Column
      title="Accion"
      key="action"
     

        <Column
          title="Accion"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <button>Invite {record.lastName}</button>
              <button>
                <IoCloseCircleOutline />
              </button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
