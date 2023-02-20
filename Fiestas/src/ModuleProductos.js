import React, { useState, useEffect } from "react";
import { fetchF } from "./App";
import ModuleTableCRUD from "./ModuleTableCRUD";
function ModuleProductos() {
  const [productos, setProductos] = useState(null);
  function selectProductos() {
    let data = {
      optionService: "SelectProductos",
    };
    fetchF(data).then(({ productos }) => setProductos(productos));
  }
  function asingFormData(data, type) {
    data.unshift(["optionService",  "InsertProducto" ]);
    fetchF(data).then(() => selectProductos());
  }
  if (productos === null) selectProductos();
  const data = [
    {
      id: 1,
      codigo: "",
      producto: "Palomitas pequeñas",
      precio: "30.00",
    },
    {
      id: 2,
      codigo: "",
      producto: "Paquete de Alitas BBQ",
      precio: "120.00",
    },
  ];
  const settingCrudTable = {
    buttons: {
      edit: { view: true },
      new: { view: true },
    },
    countButtons: 1,
    modalsInputs: [
      {
        placeholder: "codigo",
        columnData: "codigo",
        table: { sortable: true, width: 100 },
        form: {
          new: {
            view: true,
          },
          edit: {
            view: true,
            option: "r",
          },
        },
      },
      {
        placeholder: "Producto",
        columnData: "producto",
        table: { sortable: true, width: 400 },
        form: {
          new: {
            view: true,
          },
          edit: {
            view: true,
          },
        },
      },
      {
        placeholder: "Precio",
        columnData: "precio",
        table: { sortable: false, format: "moneda" },
        type: "number",
        form: {
          new: {
            view: true,
          },
          edit: {
            view: true,
          },
        },
      },
    ],
    searchColumn: "producto",
    width: 650,
    setDataForm: asingFormData,
  };
  return (
    <>
      <ModuleTableCRUD
        {...settingCrudTable}
        data={productos !== null ? productos : []}
      />
    </>
  );
}
export default ModuleProductos;
