import React, { useState, useEffect } from "react";
import { fetchServer } from "./App";
import ModuleTableCRUD from "./ModuleTableCRUD";
function ModuleMetasLocales() {
  const [data, setdata] = useState({
    inicial: true,
    cefs: [],
  });
  function asingFormData(data, type) {
    data.unshift(["optionService", "UpdateMetasCefs"]);
    console.log(data)
    fetchServer(data).then(() => obtenerCefs());
  }
  async function obtenerDataInicial() {
    let dataInicial = { ...data };
    const cefs = await fetchServer(
      [["optionService", "SelectMetasCefs"]],
      "metasCefs"
    );
    dataInicial = { ...dataInicial, cefs, inicial: false };
    setdata(dataInicial);
  }
  function obtenerCefs() {
    console.log('consulta')
    fetchServer([["optionService", "SelectMetasCefs"]], "metasCefs").then(
      (cefs) => setdata({ ...data, cefs })
    );
  }
  if (data.inicial) obtenerDataInicial();
  const form = {
    edit: {
      type: "number",
      option: "w",
    },
  };
  const settingCrudTable = {
    
    countButtons: 2,
    modalsInputs: [
      { placeholder: "ID", columnData:"localid", form : {edit :{option: "r", }} },
      { placeholder: "CEF", columnData:"cef", table: { sortable: true, width: 70 }, form : {edit :{option: "r", }} },
      { placeholder: "Enero",columnData:"ene",table: { sortable: true, width: 70 }, form  },
      { placeholder: "Febrero",columnData:"feb",table: { sortable: true, width: 70 } , form },
      { placeholder: "Marzo",columnData:"mar",table: { sortable: true, width: 70 } , form },
      { placeholder: "Abril",columnData:"abr",table: { sortable: true, width: 70 } , form },
      { placeholder: "Mayo",columnData:"may",table: { sortable: true, width: 70 }, form  },
      { placeholder: "Junio",columnData:"jun",table: { sortable: true, width: 70 } , form },
      { placeholder: "Julio",columnData:"jul",table: { sortable: true, width: 70 } , form },
      { placeholder: "Agosto",columnData:"ago",table: { sortable: true, width: 70 }, form  },
      { placeholder: "Septiembre",columnData:"sep",table: { sortable: true, width: 70 } , form },
      { placeholder: "Octubre",columnData:"oct",table: { sortable: true, width: 70 } , form },
      { placeholder: "Noviembre",columnData:"nov",table: { sortable: true, width: 70 } , form },
      { placeholder: "Diciembre",columnData:"dic",table: { sortable: true, width: 70 } , form },
    ],
    searchColumn: "cef",
    modalTitle: {
      edit: "Editar CEF",
      view: "Ver detalle CEF",
    },
    width: 1100,
    setDataForm: asingFormData,
    // exportable : {filename:"Clientes"}
  };
  //   console.log(data.cefs)
  return (
    <>
      {data.cefs.length > 0 && (
        <ModuleTableCRUD data={data.cefs} {...settingCrudTable} />
      )}
    </>
  );
}
export default ModuleMetasLocales;
