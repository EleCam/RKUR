import React, { useState, useEffect } from "react";
import { fetchServer } from "./App";
import ModuleTableCRUD from "./ModuleTableCRUD";
  function ModuleClientes() {
  const [data, setdata] = useState({
    inicial: true,
    clientes: [],
  });
  function asingFormData(data, type) {
    // data.unshift(["optionService", "UpdateCef"]);
    // fetchServer(data).then(() => obtenerClientes());
  }
  async function obtenerDataInicial() {
    let dataInicial = { ...data };
    const res1 = await fetchServer(
      [["optionService", "SelectClientes"]],
      "clientes"
    );
    dataInicial = { ...dataInicial, clientes: res1, inicial: false };
    setdata(dataInicial);
  }
  function obtenerClientes() {
    fetchServer([["optionService", "SelectClientes"]], "clientes").then(
      (clientes) => setdata({ ...data, clientes })
    );
  }
  if (data.inicial) obtenerDataInicial();
  const settingCrudTable = {
    buttons: {
      // edit: { view: true },
      view: { view: true },
    },
    countButtons: 2,
    modalsInputs: [
      {
        placeholder: "Nombre",
        columnData: "nombre",
        table: { sortable: true, width: 300 },
      },
      { placeholder: "Categoria", columnData: "tipo", table: true },
      {
        placeholder: "Correo",
        columnData: "correo",
        table: { sortable: true, width: 200 },
      },
      { placeholder: "Telefono", columnData: "telefono", table: true },
    ],
    searchColumn: "nombre",
    modalTitle: {
      edit: "Editar Cliente",
      view: "Ver detalle del Cliente",
    },
    width: 1100,
    setDataForm: asingFormData,
    // exportable : {filename:"Clientes"}
  };
  return (
    <>
      {data.clientes.length > 0 && (
        <ModuleTableCRUD data={data.clientes} {...settingCrudTable} />
      )}
    </>
  );
}
export default ModuleClientes;
