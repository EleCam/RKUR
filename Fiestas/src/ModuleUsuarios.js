import React, { useState, useEffect } from "react";
import { fetchServer } from "./App";
import ModuleTableCRUD from "./ModuleTableCRUD";
function ModuleUsuarios() {
  const [data2, setdata2] = useState({
    inicial: true,
    users: [],
    noempls: [],
    cefs: [],
  });
  const roles = [
    { label: "Fiestologo", value: 1 },
    { label: "Gerente", value: 2 },
    { label: "Administrador", value: 3 },
  ];
  function asingFormData(data, type) {
    data.push(["optionService", type === "new" ? "CreateUser" : "UpdateUser"]);
    fetchServer(data).then(() => obtenerUsers());
  }
  async function obtenerDataInicial() {
    let dataInicial = { ...data2 };
    const res1 = await fetchServer([["optionService", "SelectUsers"]], "users");
    dataInicial = { ...dataInicial, users: res1 };
    const res2 = await fetchServer(
      [["optionService", "SelectNoemplsOptions"]],
      "noempls"
    );
    dataInicial = { ...dataInicial, noempls: res2 };
    const res3 = await fetchServer(
      [["optionService", "SelectCefsOptions"]],
      "cefs"
    );
    dataInicial = { ...dataInicial, cefs: res3, inicial: false };
    setdata2(dataInicial);
  }
  function obtenerUsers() {
    fetchServer([["optionService", "SelectUsers"]], "users").then((users) =>
      setdata2({ ...data2, users })
    );
  }
  if (data2.inicial) obtenerDataInicial();
  function deleteUser(a, user) {
    fetchServer([
      ["optionService", "deleteUser"],
      ["noempl", user.noempl],
    ]).then(() => obtenerUsers());
  }
  const settingCrudTable = {
    buttons: {
      new: { view: true },
      edit: { view: true },
      view: { view: true },
      delete: { view: true, function: deleteUser },
    },
    countButtons: 3,
    modalsInputs: [
      {
        placeholder: "No Empleado",
        columnData: "noempl",
        table: { width: 100 },
        form: {
          new: {
            type: "select",
            options: data2.noempls,
            option: "w",
          },
          edit: { type: "text", option: "r" },
        },
      },
      {
        placeholder: "Nombre",
        columnData: "nombre",
        table: { sortable: true },
      },
      {
        placeholder: "CEF",
        columnData: "cef",
        form: {
          new: {
            type: "select",
            options: data2.cefs,
            option: "w",
          },
          edit: {
            type: "select",
            options: data2.cefs,
            option: "w",
          },
          view: false,
        },
      },
      { placeholder: "Rol", columnData: "rolDescripcion", table: true },
      {
        placeholder: "CEF",
        columnData: "codigoCef",
        table: { width: 70 },
        form: {},
      },
      { placeholder: "Correo", columnData: "correo", table: true },
      {
        placeholder: "Telefono",
        columnData: "telefono",
        table: { width: 150 },
      },
      {
        placeholder: "Rol",
        columnData: "rol",
        form: {
          new: {
            type: "select",
            options: roles,
            option: "w",
          },
          edit: {
            type: "select",
            options: roles,
            option: "w",
          },
          view: false,
        },
      },
    ],
    searchColumn: "nombre",
    modalTitle: {
      new: "Crear Cliente",
      edit: "Editar Cliente",
      view: "Ver Cliente",
    },
    width: 1100,
    setDataForm: asingFormData,
    // exportable : {filename:"Clientes"}
  };
  return (
    <>
      {data2.users.length > 0 && (
        <ModuleTableCRUD data={data2.users} {...settingCrudTable} />
      )}
    </>
  );
}
export default ModuleUsuarios;
