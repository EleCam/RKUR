import { isAfter } from "date-fns/esm";
import React, { useState, useEffect } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import {
  Button,
  ButtonToolbar,
  DateRangePicker,
  Modal,
  Placeholder,
  SelectPicker,
} from "rsuite";
import { fetchServer } from "./App";
import ModuleTableCRUD from "./ModuleTableCRUD";
function ModulePagos(props) {
  const [data, setdata] = useState({
    inicial: true,
    clientes: [],
  });
  const [selectsCefs, setSelectCefs] = useState([]);
  const [openAddPago, setOpen] = useState(false);
  function asingFormData(data, type) {
    // data.unshift(["optionService", "UpdateCef"]);
    // fetchServer(data).then(() => obtenerClientes());
  }
  async function obtenerDataInicial() {
    let data = [["optionService", "SelectCefsOptions"]];
    fetchServer(data, "cefs").then((dataCefs) => {
      dataCefs = dataCefs.concat([{ label: "Todos", value: 0 }]);
      setSelectCefs(dataCefs);
    });
    let dataInicial = { ...data };
    const res1 = await fetchServer([["optionService", "SelectPagos"]], "pagos");
    dataInicial = { ...dataInicial, clientes: res1, inicial: false };
    setdata(dataInicial);
  }
  async function obtenerDataInicialFiesta() {
    console.log("aaa");
    let dataInicial = { ...data };
    const res1 = await fetchServer(
      [
        ["optionService", "SelectPagosFiesta"],
        ["noFiesta", props.noFiesta],
      ],
      "pagos"
    );
    dataInicial = { ...dataInicial, clientes: res1, inicial: false };
    setdata(dataInicial);
  }
  function obtenerPagos() {
    fetchServer([["optionService", "SelectPagos"]], "clientes").then(
      (clientes) => setdata({ ...data, clientes })
    );
  }
  function agregarPago() {
    setOpen(true);
  }
  if (data.inicial && !props.noFiesta) obtenerDataInicial();
  else if (data.inicial && props.noFiesta) obtenerDataInicialFiesta();
  const settingCrudTable = {
    modalsInputs: [
      {
        placeholder: "Fiesta",
        columnData: "cotizacion",
        table: !props.noFiesta && { sortable: true, width: 100 },
      },

      { placeholder: "CEF", columnData: "cef", table: { width: 100 } },
      { placeholder: "Cantidad", columnData: "monto", table: { width: 100 } },
      {
        placeholder: "Empleado",
        columnData: "noempl",
        table: !props.noFiesta && { width: 100 },
      },

      {
        placeholder: "Fecha de pago",
        columnData: "date",
        table: { width: 200 },
      },
      {
        placeholder: "Comisionado",
        columnData: "comisionado",
        table: { width: 100 },
      },
    ],
    buttons: {
      new: {
        view: props.noFiesta,
        hover: "Agregar Pago",
        function: agregarPago,
      },
    },
    countButtons: props.noFiesta && 1,
    searchColumn: "cotizacion",
    modalTitle: {
      edit: "Editar Cliente",
      view: "Ver detalle del Cliente",
    },
    search: !props.noFiesta && true,
    width: !props.noFiesta ? 770 : 555,
    setDataForm: asingFormData,
  };
  const ModalAddPago = () => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    function guardarpago() {
      let folio = document.getElementById("pagoFolio");
      let cantidad = document.getElementById("pagoCantidad");
      if (folio.value !== "" && cantidad.value !== "") {
        alert("Guardar pago");
        obtenerDataInicialFiesta();
        handleClose();
      } else {
        alert("Hacen falta datos");
      }
    }
    return (
      <>
        <Modal open={openAddPago} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>Agregar Pago.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p style={{ color: "white" }}>
              <b>Cliente </b> : {props.fiesta.nombre} <br />
              <b>Fiesta </b> : {props.noFiesta}
              <br />
              <b>CEF </b> : {props.fiesta.cef}
            </p>
            <div className="d-flex ">
              <FormGroup floating style={{ width: "70%" }}>
                <Input placeholder="Folio" type="text" id="pagoFolio" />
                <Label> Folio</Label>
              </FormGroup>
              <FormGroup floating style={{ width: "30%", marginLeft: 10 }}>
                <Input placeholder="Cantidad" type="number" id="pagoCantidad" />
                <Label> Cantidad</Label>
              </FormGroup>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={guardarpago} appearance="primary">
              Guardar
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  return (
    <>
      {props.noFiesta ? (
        <>
          <ModalAddPago />
          <h4 className="text-center" style={{ marginBottom: 35 }}>
            PAGOS DE LA FIESTA: {props.noFiesta}
          </h4>
        </>
      ) : (
        <>
          <div
            className="d-flex justify-content-center"
            style={{ height: 35, marginBottom: 45 }}
          >
            <p className=" " style={{ padding: 10, fontSize: 12 }}>
              Selecciona un CEF:{" "}
            </p>
            <SelectPicker
              data={selectsCefs}
              defaultValue={0}
              placeholder="Selecciona el rango de fechas"
              oneTap
            />
            <p className=" " style={{ padding: 10, fontSize: 12 }}>
              Selecciona Rango de fechas:{" "}
            </p>
            <DateRangePicker
              showOneCalendar
              placeholder="Selecciona el rango de fechas"
              disabledDate={(date) => isAfter(date, new Date())}
              ranges={[]}
            />
            <Button
              appearance="primary"
              color="blue"
              style={{ marginLeft: 25 }}
            >
              {" "}
              Consultar
            </Button>
          </div>
        </>
      )}
      {data.clientes.length > 0 && (
        <ModuleTableCRUD data={data.clientes} {...settingCrudTable} />
      )}
    </>
  );
}
export default ModulePagos;
