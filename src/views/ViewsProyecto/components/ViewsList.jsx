import { List, Progress, Tooltip } from "antd";
import {
  ButtonIconBorder,

  ButtonSelect,
  Div,
} from "../../../components";
import Search from "antd/es/transfer/search";
import { useState } from "react";
import { IoAddSharp,IoChevronForwardSharp,IoChevronBackOutline } from "react-icons/io5";
export default function ViewsList() {
  const allData = [
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
    "R",
  ];

  const itemsPerPage = 20; // Define la cantidad de elementos por página

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Div style={{backgroundColor:"white", borderRadius:12, marginLeft:10,padding:10, height:"auto"}}>
      <div
        style={{
          width: 360,
          marginTop: 5,
          marginBottom: 10,
          marginLeft: 10,
        }}
      >
        <h3>Proyectos en curso</h3>
      </div>
      <div
        style={{
          width: 350,
          marginLeft: 10,
          marginBottom: 10,
          display: "flex",
        }}
      >
        <Search
          placeholder="Buscar Proyecto"
          allowClear
          style={{ color:"red"}}
        />
        <div
          style={{
            marginInline: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
          }}
        >
          <Tooltip title="Crear proyecto" color={"blue"}>
            <ButtonIconBorder style={{ width: 50, height: 35 }}>
              <IoAddSharp size={22} />
            </ButtonIconBorder>
          </Tooltip>
        </div>
      </div>
      <List
        style={{ height: 680, overflow: "auto"  }}
        className="scroll-container"
        dataSource={currentData}
        renderItem={() => (
          <ButtonSelect>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 70, // Alto fijo
                margin: 5,
                padding: "10px 10px",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "justify",
                }}
              >
                <h4>Proyecto</h4>
                <p>Central Romana</p>
              </div>
              <div style={{ width: 150, marginInline: 30 }}>
                <Progress percent={30} size="small" />
              </div>
            </div>
          </ButtonSelect>
        )}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
        }}
      >
        <ButtonIconBorder
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoChevronBackOutline />
          Anterior
        </ButtonIconBorder>
        <ButtonIconBorder
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= allData.length}
        >
          Siguiente
          <IoChevronForwardSharp />
        </ButtonIconBorder>
      </div>
    </Div>
  );
}
