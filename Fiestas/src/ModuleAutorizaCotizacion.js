import React, { useState, useEffect } from "react";
import { Button } from "rsuite";
import ModuleCotizador from "./ModuleCotizador";
import ModuleTableCRUD from "./ModuleTableCRUD";
import TimeIcon from "@rsuite/icons/Time";
import { fetchServer } from "./App";
function ModuleAutorizaCotizacion() {
  const [editCotizacion, setEditCotizacion] = useState(false);
  const [cotizacion, setCotizacion] = useState(null);
  const [data, setData] = useState(false);
  if (data === false) {
    fetchServer(
      [["optionService", "SelectCotizacionesAutorizar"]],
      "fiestas"
    ).then((fiestas) => setData(fiestas));
  }
  function asingFormData(data) {}
  function handleEditCotizacion(a, b, c) {
    // a: typeEvent, b : element, c: event7
    setCotizacion(
      <ModuleCotizador type={a} cotizacion={a !== "new" && b.id} admin={true} />
    );
  }
  const settingCrudTable = {
    buttons: {
      extras: [
        {
          agendar: {
            view: true,
            functionVariable: "agendar",
            function: handleEditCotizacion,
            icon: <TimeIcon />,
            size: "xs",
            color: "green",
            condicional: { columna: "estado", valor: "Cerrado" },
          },
        },
      ],
    },
    countButtons: 1,
    modalsInputs: [
      {
        placeholder: "Cliente",
        columnData: "cliente",
        table: { sortable: true, width: 280 },
      },
      { placeholder: "Costo", columnData: "costo", table: {} },
      { placeholder: "Cotizado", columnData: "cotizado", table: {} },
      { placeholder: "Estado", columnData: "estado", table: {} },
    ],
    searchColumn: "cliente",
    width: 700,
  };
  return (
    <>
      {cotizacion ? (
        <>
          <Button
            onClick={setCotizacion.bind(this, false)}
            style={{ background: "#00a0bd" }}
          >
            Regresar
          </Button>
          {cotizacion}
        </>
      ) : (
        <ModuleTableCRUD
          {...settingCrudTable}
          data={data}
          setDataForm={asingFormData}
        />
      )}
    </>
  );
}
export default ModuleAutorizaCotizacion;
