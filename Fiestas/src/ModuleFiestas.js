import React, { useState, useEffect } from "react";
import ModuleTableCRUD from "./ModuleTableCRUD";
import DetailIcon from "@rsuite/icons/Detail";
import PlusIcon from "@rsuite/icons/Plus";
import CloseIcon from "@rsuite/icons/Close";
import FunnelTimeIcon from "@rsuite/icons/FunnelTime";
import CreditCardPlusIcon from "@rsuite/icons/CreditCardPlus";
import ModulePagos from "./ModulePagos";
import { Button } from "rsuite";
// import { Button } from "reactstrap";
function ModuleFiestas() {
  const [pagosView, setPagosView] = useState();
  function asingFormData(data) {
    // setDataFetch(data);
  }
  function verContato(type, valor) {
    // console.log(type,valor);
    alert("Ver contrato " + valor.nofiesta);
  }
  function cancelarFiesta(type, valor) {
    // console.log(type, valor);
  }
  function contenidoFiesta(type, valor) {
    // console.log(type,valor);
    alert("contenido fiesta " + valor.nofiesta);
  }
  function gestionPagos(type, valor) {
    // alert('Gestion de pagos' + valor.nofiesta);
    setPagosView(valor);
  }
  const buttons = {
    view: { view: true },
    extras: [
      {
        verContrato: {
          view: true,
          hover: "Ver contrato",
          functionVariable: "verContrato",
          function: verContato,
          icon: <DetailIcon />,
          size: "xs",
          color: "",
          condicional: { columna: "estado", valor: "Cerrado" },
        },
        verContenido: {
          view: true,
          hover: "Ver contenido.",
          functionVariable: "verContenido",
          function: contenidoFiesta,
          icon: <FunnelTimeIcon />,
          size: "xs",
          color: "green",
          condicional: { columna: "estado", valor: "Cerrado" },
        },
        AgregarPago: {
          view: true,
          functionVariable: "Pagos",
          hover: "Gestionar pagos",
          function: gestionPagos,
          icon: <CreditCardPlusIcon />,
          size: "xs",
          color: "violet",
          condicional: { columna: "estado", valor: "REALIZADA" },
        },
        cancelar: {
          view: true,
          functionVariable: "cancelar",
          hover: "Cancelar Fiesta",
          function: cancelarFiesta,
          icon: <CloseIcon />,
          size: "xs",
          color: "red",
          condicional: { columna: "estado", valor: "REALIZADA" },
        },
      },
    ],
  };
  const modalTitle = {
    view: "Ver Fiesta",
  };
  const modalsInputs = [
    {
      placeholder: "No Fiesta",
      columnData: "nofiesta",
      table: { sortable: true, width: 100 },
    },
    { placeholder: "CEF", columnData: "cef" },
    { placeholder: "Fecha de Fiesta", columnData: "fechadefiesta", table: {} },
    {
      placeholder: "Invitados",
      columnData: "invitados",
      table: { width: 100 },
    },
    { placeholder: "Estatus", columnData: "estado", table: { width: 100 } },
    { placeholder: "Fecha de Registro", columnData: "fecaderegistro" },
    { placeholder: "Usuario", columnData: "usuario" },
  ];
  const data = [
    {
      nofiesta: 1,
      cef: "GTC	",
      fechadefiesta: "03/01/2023 03:00:00 p. m.",
      fechaderegistro: "27/12/2022 03:40:22 p. m.",
      estado: "PAGADO",
      usuario: "FIESTOLOGO TCM",
      invitados: "15",
      nombre: "Samuel Ruiz Martines",
    },
    {
      nofiesta: 2,
      cef: "CJN",
      fechadefiesta: "03/02/2023 03:00:00 p. m.",
      fechaderegistro: "27/12/2022 03:40:22 p. m.",
      estado: "PAGADO",
      nombre: "Jimena Sanchez",
      usuario: "FIESTOLOGO TCM",
      invitados: "15",
    },
  ];
  return (
    <>
      {pagosView ? (
        <>
          <Button onClick={setPagosView.bind(this,false)} appearance="primary" color="blue"> Regresar</Button>
          <ModulePagos noFiesta={pagosView.nofiesta} fiesta={pagosView} />
        </>
      ) : (
        <ModuleTableCRUD
          data={data}
          buttons={buttons}
          modalTitle={modalTitle}
          width={700}
          searchColumn={"nofiesta"}
          modalsInputs={modalsInputs}
          setDataForm={asingFormData}
          countButtons={5}
        />
      )}
    </>
  );
}
export default ModuleFiestas;
