import { List, Progress, Tooltip, Input } from "antd";
import {
  BtnNavPro,
  ButtonIconBorder,
  ButtonSelectProyecto,
  Container,
  SpinnerTables,
} from "../../../components";
import PropTypes from "prop-types";

const { Search } = Input;
import { useEffect, useState } from "react";
import {
  IoAddSharp,
  IoChevronForwardSharp,
  IoChevronBackOutline,
} from "react-icons/io5";
import { useGetListaProyectoQuery } from "../../../redux/Api/proyectoApi";

export default function ViewsList({ setFormSee, seeState, setSee,selectProyecto, setSelectProyecto ,allData, setAllData}) {
 
  const itemsPerPage = 20; // Define la cantidad de elementos por página

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);
  const {
    data: data,
    isSuccess: isSuccessProyecto,
    isLoading: isLoading,
  } = useGetListaProyectoQuery("");
  
  useEffect(() => {
    if (data?.Result !== undefined && isSuccessProyecto) {
      setAllData(data?.Result);

    }
  }, [data,isSuccessProyecto]);
  
 

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const maxCharacters = 15;
  const renderText = (text) => {
    if (text.length > maxCharacters) {
      return `${text.slice(0, maxCharacters)}...`;
    }
    return text;
  };

  const handleSearch = (value) => {
    const searchTerm = value.toLowerCase();

    const filter = allData.filter((item) =>
      item.NombreProyecto.toLowerCase().includes(searchTerm)
    );
    setAllData(filter);
    if (value == "") {
      setAllData(data?.Result);
    }
  };

  ViewsList.propTypes = {
    setSee: PropTypes.bool.isRequired,
    seeState: PropTypes.bool.isRequired,
    setFormSee: PropTypes.func.isRequired,
    formSee: PropTypes.bool.isRequired,
    selectProyecto: PropTypes.array.isRequired,
    setSelectProyecto: PropTypes.func.isRequired,
    allData: PropTypes.array.isRequired,
    setAllData: PropTypes.func.isRequired,
  };

  return (
    <Container
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        padding: 10,
      }}
    >
      <div
        style={{
          width: 360,
          marginTop: 5,
          marginBottom: 18,
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
          placeholder="Buscar proyecto"
          onSearch={handleSearch}
          allowClear
          style={{
            width: 400,
          }}
        />
        <div
          style={{
            marginInline: 10,
            justifyContent: "center",
            alignItems: "center",
            width: "auto",
            height: 35,
          }}
        >
          {seeState && (
            <Tooltip title="Crear proyecto" color={"blue"}>
              <BtnNavPro
              style={{
                display: "flex",
                borderRadius: "12px",
                alignItems:"center",
                padding:0,
                paddingInline:4,
                margin: 0,
              }}
                onClick={() => {
                  setFormSee(true);
                  setSee(true);
                }}
              >
                <IoAddSharp size={25} />
              </BtnNavPro>
            </Tooltip>
          )}
        </div>
      </div>
      {isLoading ? (
        <SpinnerTables style={{ backgroundColor: "transparent" }} />
      ) : (
        <>
          <List
            style={{ height: 680, overflow: "auto" }}
            className="scroll-container"
            dataSource={currentData}
            renderItem={(item) => (
              <ButtonSelectProyecto
              isSelected={selectProyecto == item.IdProyecto ? true : false}
              style={{ width: "100%" }}
              onClick={() => {setSelectProyecto(item.IdProyecto); setFormSee(false);}}
              >
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    height: 70, // Alto fijo
                    margin: 5,
                    padding: "10px 10px",
                    borderRadius: 10,
                    justifyContent: "space-between",
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
                    <Tooltip title={item.NombreProyecto}>
                      <p>{renderText(item.NombreProyecto)}</p>
                    </Tooltip>
                  </div>

                  <div style={{ width: 150, marginInline: 30 }}>
                    <Progress
                      percent={item.PorcentajeCompletado}
                      size="small"
                    />
                  </div>
                </div>
              </ButtonSelectProyecto>
            )}
          />
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
        }}
      >
        {allData.length >= 20 ? (
          <>
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
          </>
        ) : null}
      </div>
    </Container>
  );
}
