import React, { useState, useEffect } from "react";
import { Button } from "rsuite";
import ModuleCotizador from "./ModuleCotizador";
import ModuleTableCRUD from "./ModuleTableCRUD";
import TimeIcon from "@rsuite/icons/Time";
import { fetchServer } from "./App";
function ModuleCotizacionesFiestologo() {
  const [editCotizacion, setEditCotizacion] = useState(false);
  const [cotizacion, setCotizacion] = useState(null);
  const [data, setData] = useState(false);
  if (data === false) {
    fetchServer(
      [["optionService", "SelectCotizaciones"]],
      "fiestas"
    ).then((fiestas) => setData(fiestas));
  }
  function asingFormData(data) {
    console.log(data);
  }
  function handleEditCotizacion(a, b, c) {
    // a: typeEvent, b : element, c: event7
    setCotizacion(
      <ModuleCotizador type={a} cotizacion={a !== "new" && b.id} />
    );
  }
  const settingCrudTable = {
    buttons: {
      new: {
        view: true,
        function: handleEditCotizacion,
      },
      edit: {
        view: true,
        function: handleEditCotizacion,
        condicional:{columna: 'estado' , valor:"Cerrado"}
      },
      view: {
        view: true,
        function: handleEditCotizacion,

      },
      extras: [
        {
          agendar: {
            view: true,
            functionVariable: "agendar",
            function: handleEditCotizacion,
            icon: <TimeIcon />,
            size: "xs",
            color: "green",
            condicional:{columna: 'estado' , valor:"Cerrado"}
          },
        },
      ],
    },
    countButtons: 3,
    modalsInputs: [
      { placeholder: "Cliente",columnData:"cliente", table: { sortable: true, width: 280 } },
      { placeholder: "Costo",columnData:"costo", table: {} },
      { placeholder: "Cotizado",columnData:"cotizado", table: { } },
      { placeholder: "Estado",columnData:"estado", table: {  } },
    ],
    searchColumn: "combo",
    modalTitle: {
      new: "Crear Combo",
      edit: "Editar Combo",
      view: "Ver Combo",
    },
    width: 700,
  };
  return (
    <>
      {cotizacion ? (
        <>
          <Button onClick={setCotizacion.bind(this, false)} style = {{background:"#00a0bd"}}>
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
export default ModuleCotizacionesFiestologo;
