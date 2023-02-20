import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  IconButton,
  Modal,
  ButtonToolbar,
  InputGroup,
  Input as InputRsuite,
  Whisper,
  Tooltip,
} from "rsuite";
import PlusIcon from "@rsuite/icons/Plus";
import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import VisibleIcon from "@rsuite/icons/Visible";
import SearchIcon from "@rsuite/icons/Search";
import ReactToExcel from "react-html-table-to-excel";
import { FormGroup, Input, Label, Table as TableBoost } from "reactstrap";
const { Column, HeaderCell, Cell } = Table;

const styles = {
  width: 300,
  marginRight: 10,
};

function ModuleTableCRUD(props) {
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [openView, setOpen] = React.useState(false);
  const [openData, setopenData] = React.useState(false);
  const [typeModal, setTypeModal] = React.useState("false");
  const [clientModal, setClientModal] = React.useState(false);
  const [dataa, setDataa] = React.useState([]);
  const [search, setSearch] = React.useState({ state: false, result: [] });
  const dataBack = props.data;

  useEffect(() => {
    if (search.state) setDataa(search.result);
    else setDataa(props.data);
  });

  //Logicas modales de los botones
  //  -Corregir el llamado y reducir la cantidad para que solo sea uno
  //  -Cambiar el tipo de inputs para que estos sean homogeneos
  const handleOpenModal = (type) => {
    if (type === "view") {
      if (openView) setClientModal(false);
      setOpen(!openView);
    }
    if (type === "openData") {
      if (openData) setClientModal(false);
      setopenData(!openData);
    }
  };
  const ModalClientType = (type, cliente) => {
    setTypeModal(type);
    if (type === "new") {
      handleOpenModal("openData");
    } else if (type === "view") {
      setClientModal(cliente);
      handleOpenModal("view");
    } else if (type === "edit") {
      handleOpenModal("openData");
      setClientModal(cliente);
    }
  };
  const ModalViewData = () => {
    return (
      <>
        <Modal
          open={openView}
          onClose={handleOpenModal.bind(this, "view")}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>{props.modalTitle[typeModal]}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            classPrefix={typeModal ? typeModal : ""}
            className="justify-content-center d-flex flex-wrap"
          >
            {props.modalsInputs.map(
              (item, index) =>
                item.type !== "SL" &&
                ((item.form && item.form.view !== false) || !item.form) && (
                  <FormGroup floating key={index} style={{ margin: 10 }}>
                    <Input
                      disabled={typeModal === "view"}
                      id={item.id}
                      placeholder={item.placeholder}
                      defaultValue={
                        clientModal ? clientModal[item.columnData] : ""
                      }
                      readOnly={typeModal === "view"}
                      // type={item.type}
                    />
                    <Label for="InputName">{item.placeholder}</Label>
                  </FormGroup>
                )
            )}
          </Modal.Body>
          <Modal.Footer>
            {typeModal === "new" || typeModal === "edit" ? (
              <>
                <Button
                  onClick={handleOpenModal.bind(this, "view")}
                  appearance="primary"
                >
                  Guardar
                </Button>
                <Button
                  onClick={handleOpenModal.bind(this, "view")}
                  appearance="subtle"
                >
                  Cancel
                </Button>
              </>
            ) : (
              ""
            )}
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const ModalControlData = () => {
    function formDataAsing() {
      var type = false;
      // const valoresForm = new FormData();
      const valoresForm2 = [];
      props.modalsInputs.forEach((item) => {
        if (item.form) {
          if (!type && clientModal[item.columnData]) type = "edit";
          else if (!type) type = "new";
          if (item.type !== "SL" && item.form[type]) {
            let id = "input" + item.placeholder.replace(" ", "");
            let value = "";
            if (item.type === "timeRange") {
              value =
                document.getElementById(id + "r1").value +
                "-" +
                document.getElementById(id + "r2").value;
            } else if (item.type === "checkbox") {
              value = document.getElementById(id).checked;
            } else {
              value = document.getElementById(id).value;
            }
            valoresForm2.push([item.columnData, value]);
          }
        }
      });
      setSearch({ state: false });
      props.setDataForm(valoresForm2, type);
      ModalClientType("new");
    }
    return (
      <>
        <Modal
          open={openData}
          onClose={handleOpenModal.bind(this, "openData")}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title>{props.modalTitle[typeModal]}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            // classPrefix={typeModal}
            className="justify-content-center d-flex flex-wrap"
          >
            {props.modalsInputs.map((item, index) =>
              item.type === "SL" ? ( // Ver para que se uso SL
                <div style={{ width: 3000 }} key={index}></div>
              ) : (
                item.form &&
                item.form[typeModal] && (
                  <FormGroup
                    hidden={item.form[typeModal].hidden }
                    floating={item.type === "checkbox" ? false : true}
                    key={index}
                    style={{
                      margin: 10,
                      color: item.type === "checkbox" ? "white" : "",
                      height: item.type === "checkbox" ? 50 : "",
                      width: item.width ? item.width : 200,
                    }}
                    check={item.type === "checkbox" ? true : false}
                    className={
                      item.type === "checkbox"
                        ? "d-flex align-items-center"
                        : ""
                    }
                  >
                    {item.form[typeModal].type === "select" ? (
                      <>
                        <Input
                          type="select"
                          id={"input" + item.placeholder.replace(" ", "")}
                          defaultValue={clientModal[item.columnData]}
                        >
                          {item.form[typeModal].options.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Input>
                      </>
                    ) : item.type === "timeRange" ? (
                      <>
                        <Input
                          id={
                            "input" + item.placeholder.replace(" ", "") + "r1"
                          }
                          placeholder={item.placeholder}
                          type={"time"}
                          defaultValue={
                            typeModal &&
                            clientModal &&
                            clientModal[item.columnData].split(" - ")[0]
                          }
                        />
                        <Input
                          id={
                            "input" + item.placeholder.replace(" ", "") + "r2"
                          }
                          placeholder={item.placeholder}
                          type={"time"}
                          defaultValue={
                            typeModal &&
                            clientModal &&
                            clientModal[item.columnData].split(" - ")[1]
                          }
                        />
                      </>
                    ) : (
                      <>
                        <>
                          <Input
                            id={"input" + item.placeholder.replace(" ", "")}
                            placeholder={item.placeholder}
                            type={item.type}
                            defaultChecked={
                              item.type === "checkbox"
                                ? clientModal[item.columnData] === "Si" && true
                                : ""
                            }
                            defaultValue={
                              typeModal && clientModal
                                ? clientModal[item.columnData]
                                : ""
                            }
                            disabled={item.form[typeModal].option === "r"}
                          />
                        </>
                      </>
                    )}
                    <Label
                      for={"input" + item.placeholder.replace(" ", "")}
                      check={item.type === "checkbox" ? true : false}
                      style={{
                        marginLeft: item.type === "checkbox" ? 10 : false,
                      }}
                    >
                      {item.placeholder}
                    </Label>
                  </FormGroup>
                )
              )
            )}
          </Modal.Body>
          <Modal.Footer>
            <>
              <Button onClick={formDataAsing} appearance="primary">
                Guardar
              </Button>
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  //Ordenamiento sort de las columnas
  //  -Mejorar el ordenamiento porque solo lo hace en base al primer caracter
  const getData = () => {
    if (sortColumn && sortType) {
      return dataa.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === "string") {
          x = x.charCodeAt();
        }
        if (typeof y === "string") {
          y = y.charCodeAt();
        }
        if (sortType === "asc") {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return dataa;
  };
  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  //busqueda de los elementos que concuerden en data
  const buscador = () => {
    const query = document.getElementById("buscador").value;
    const results = dataBack.filter((item) =>
      String(item[props.searchColumn])
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setSearch({
      state: true,
      result: results,
    });
  };
  //Si el buscador se queda vacio lo vuelve a cargar con el respaldo de data
  const buscadorVacio = (e) => {
    e === "" && setSearch({ state: false });
  };

  //Cantidad de botones asignada por el usuario
  //  -Deberia generarse de manera automatica.
  var countButtons = props.countButtons;
  var BotonesSettings = {
    new: {
      view: false,
      dataDefault: null,
      functionVariable: "new",
      hover: "Crear Nuevo",
      function: (type, variable) => {
        ModalClientType(type, variable);
      },
      icon: <PlusIcon />,
      size: "xs",
      color: "blue",
      condicional: ["estado", "abierto"],
    },
    view: {
      view: false,
      hover: "Ver Más",
      functionVariable: "view",
      function: (type, variable) => {
        ModalClientType(type, variable);
      },
      icon: <VisibleIcon />,
      size: "xs",
      color: "blue",
      condicional: false,
    },
    delete: {
      view: false,
      hover: "Eliminar",
      functionVariable: "delete",
      function: (type, variable) => {
        alert(variable.id);
      },
      icon: <TrashIcon />,
      size: "xs",
      color: "red",
      condicional: false,
    },
    edit: {
      view: false,
      hover: "Editar",
      dataDefault: null,
      functionVariable: "edit",
      function: (type, variable) => {
        ModalClientType(type, variable);
      },
      icon: <EditIcon />,
      size: "xs",
      color: "blue",
      condicional: false,
    },
    extras: [],
  };
  // Si el usuario asigno botones aqui los recorremos para rescribir las propiedades que se asignaron
  if (props.buttons)
    Object.keys(BotonesSettings).forEach((key) => {
      BotonesSettings[key] =
        key !== "extras"
          ? { ...BotonesSettings[key], ...props.buttons[key] }
          : props.buttons[key]
          ? [...BotonesSettings[key], ...props.buttons[key]]
          : [];
    });

  //Componente para crear botones
  const Botones = (btn, valor, key) => {
    if (btn.view)
      return (
        <Whisper
          key={key}
          placement="top"
          controlId="control-id-hover"
          trigger="hover"
          speaker={<Tooltip>{btn.hover}</Tooltip>}
        >
          <IconButton
            onClick={btn.function.bind(this, btn.functionVariable, valor)}
            size={btn.size}
            icon={btn.icon}
            color={btn.color}
            appearance="primary"
            circle
          />
        </Whisper>
      );
  };

  if (true)
    return (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <div>
          
          {/* 
          Parte superior de la tabla para exportacion y busqueda
            -Agregar la posibilidad de buscar en mas de una columna  
          */}
          {(props.search !== false || props.exportable) && (
            <div
              style={{ width: "100%", height: 35 }}
              className="d-flex justify-content-center"
            >
              {props.search !== false && (
                <InputGroup style={styles}>
                  <InputRsuite
                    placeholder="Busqueda"
                    autoComplete="off"
                    id="buscador"
                    onChange={buscadorVacio}
                  />
                  <InputGroup.Button
                    style={{ background: "#087ad1" }}
                    onClick={buscador}
                    appearance="ghost"
                  >
                    <SearchIcon />
                  </InputGroup.Button>
                </InputGroup>
              )}

              {props.exportable && (
                <ReactToExcel
                  table="tableExport"
                  buttonText="Exportar"
                  filename={
                    props.exportable.filename
                      ? props.exportable.filename
                      : "export"
                  }
                  className="btn btn-primary btn-sm"
                />
              )}
            </div>
          )}

          {/* Modales del CRU */}
          <ModalViewData />
          <ModalControlData />

          {/* Impresion de tabla CRUD */}
          <Table
            width={props.width ? props.width : 1000}
            height={props.height ? props.height : 600}
            data={getData()}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            loading={loading}
            onRowClick={(rowData) => {
              // ModalClientType("view",rowData)
            }}
          >
            <Column width={(countButtons === 1 ? 55 : 35) * countButtons}>
              <HeaderCell>
                <div className="d-flex justify-content-center">
                  {Botones(BotonesSettings.new)}
                </div>
              </HeaderCell>
              <Cell>
                {/* Generacion de botones si son necesarios */}
                {(rowData) => (
                  <div className="d-flex justify-content-between">
                    {["edit", "view", "delete", "extras"].map((item, keypop) =>
                      item !== "extras"
                        ? BotonesSettings[item].condicional
                          ? rowData[
                              BotonesSettings[item].condicional.columna
                            ] !== BotonesSettings[item].condicional.valor &&
                            Botones(BotonesSettings[item], rowData, keypop)
                          : Botones(BotonesSettings[item], rowData, keypop)
                        : BotonesSettings[item].map((btnExtra) =>
                            Object.keys(btnExtra).map(
                              (key, key2) =>
                                rowData[btnExtra[key].condicional.columna] !==
                                  btnExtra[key].condicional.valor &&
                                Botones(btnExtra[key], rowData, key2)
                            )
                          )
                    )}
                  </div>
                )}
              </Cell>
            </Column>
            {props.modalsInputs.map(
              (item, index) =>
                item.table && (
                  <Column
                    flexGrow={!item.table.width ? 2 : 0}
                    width={item.table.width ? item.table.width : 100}
                    sortable={item.table.sortable}
                    key={index}
                  >
                    <HeaderCell>{item.placeholder}</HeaderCell>
                    <Cell dataKey={item.columnData} />
                  </Column>
                )
            )}
          </Table>

          {/* Tabla simple para exportacion de datos a excel */}
          {props.exportable && (
            <TableBoost id="tableExport" style={{ display: "none" }}>
              <thead>
                <tr>
                  {props.modalsInputs.map(
                    (item, index) =>
                      item.table && <th key={index}>{item.placeholder}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {props.data.map((dataT, key1) => (
                  <tr key={key1}>
                    {props.modalsInputs.map(
                      (item, index) =>
                        item.table && (
                          <td key={index}> {dataT[item.columnData]}</td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </TableBoost>
          )}
        </div>
      </div>
    );
}

// Defaults de props, aqui debemos agregar mas defaults para que se genere en caso de no mandar datos 
ModuleTableCRUD.defaultProps = {
  search: true,
  modalTitle: {
    new: "Crear",
    edit: "Editar",
    view: "Ver",
  },
  searchColumn: "id",
  data: [], 
  setDataForm: () => {},
};


export default ModuleTableCRUD;