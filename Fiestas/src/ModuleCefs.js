import React, { useState, useEffect } from "react";
import { fetchServer, fetchF } from "./App";
import ModuleTableCRUD from "./ModuleTableCRUD";
import TimeIcon from "@rsuite/icons/Time";
import { Button } from "rsuite";
function ModuleCefs() {
  const [data, setdata] = useState({
    inicial: true,
    cefs: [],
  });
  const [view, setView] = useState("CRUD");
  const [salonConcured, setSalonConcured] = useState(null);
  function asingFormData(data, type) {
    console.log(data);
    data.unshift(["optionService", "UpdateCef"]);
    fetchServer(data).then(() => obtenerCefs());
  }
  async function obtenerDataInicial() {
    let dataInicial = { ...data };
    const res1 = await fetchServer(
      [["optionService", "SelectCefsHorarios"]],
      "cefs"
    );
    dataInicial = { ...dataInicial, cefs: res1, inicial: false };
    setdata(dataInicial);
  }
  function obtenerCefs() {
    fetchServer([["optionService", "SelectCefsHorarios"]], "cefs").then(
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
  function viewGestionSalones(type, { id }) {
    setView("Salones");
    setSalonConcured(id);
  }
  const settingCrudTable = {
    exportable: true,
    buttons: {
      edit: { view: true },
      view: { view: true },
      extras: [
        {
          agendar: {
            view: true,
            functionVariable: "salones",
            function: viewGestionSalones,
            icon: <TimeIcon />,
            size: "xs",
            color: "green",
            condicional: { columna: "estado", valor: "Cerrado" },
            hover: "Gestionar Salones",
          },
        },
      ],
    },
    countButtons: 3,
    modalsInputs: [
      {
        placeholder: "id",
        width: 80,
        columnData: "id",
        form: {
          edit: {
            hidden: true,
            type: "number",
            option: "w",
          },
        },
      },
      {
        placeholder: "CEF",
        width: 80,
        columnData: "cef",
        table: { sortable: true, width: 120 },
      },
      {
        placeholder: "Descripcion",
        columnData: "descripcion",
        table: { sortable: true, width: 350 },
      },
      { placeholder: "Telefono", columnData: "telefono", table: true },
      {
        placeholder: "Fiestologo",
        columnData: "fiestologo",
        // type: "checkbox",
        table: true,
        // form: form,
      },
      {
        placeholder: "Salones",
        // type: "number",
        columnData: "salones",
        width: 100,
        table: true,
        // form: form,
      },
      {
        placeholder: "Cap. Salones",
        type: "number",
        columnData: "capacidadSalones",
        table: true,
        form: form,
      },
      { placeholder: "Lunes", type: "timeRange", columnData: "Lunes" },
      { placeholder: "Martes", type: "timeRange", columnData: "Martes" },
      { placeholder: "Miercoles", type: "timeRange", columnData: "Miercoles" },
      { placeholder: "Jueves", type: "timeRange", columnData: "Jueves" },
      { placeholder: "Viernes", type: "timeRange", columnData: "Viernes" },
      { placeholder: "Sabado", type: "timeRange", columnData: "Sabado" },
      { placeholder: "Domingo", type: "timeRange", columnData: "Domingo" },
      // { placeholder: "Direccion", columnData:"direccion" , table : true},},
      // { placeholder: "", type: "SL",columnData:"", },
    ],
    searchColumn: "cef",
    width: 1100,
    setDataForm: asingFormData,
    // exportable : {filename:"Clientes"}
  };
  const GestionSalones = ({ id }) => {
    const [salones, setSalones] = useState(null);
    function CRUDSalon(a, b) {
      let data = {
        optionService: b === "new" ? "InsertSalon" : "UpdateSalon",
        cef: id,
      };
      a.forEach((element, index) => {
        if (index !== 0)
          data[element[0]] =
            element[1] === false ? 0 : element[1] === true ? 1 : element[1];
      });
      fetchF(data).then(({ OK }) => OK && selectSalones(id));
    }
    const settingCrudTable = {
      buttons: {
        new: { view: true },
        edit: { view: true },
      },
      countButtons: 1,
      modalsInputs: [
        {
          placeholder: "id",
          columnData: "id",
          form: {
            edit: {
              option: "r",
              hidden: true,
            },
          },
        },
        {
          placeholder: "Codigo",
          width: 80,
          columnData: "codigo",
          table: { sortable: true, width: 100 },
          form: {
            new: {
              option: "w",
            },
            edit: {
              option: "r",
            },
          },
        },
        {
          placeholder: "Games",
          columnData: "games",
          table: {},
          type: "checkbox",
          form: {
            new: {
              option: "w",
            },
            edit: {
              option: "w",
            },
          },
        },
        {
          placeholder: "Kids",
          columnData: "kids",
          table: {},
          type: "checkbox",
          form: {
            new: {
              option: "w",
            },
            edit: {
              option: "w",
            },
          },
        },
        {
          placeholder: "Boliche",
          columnData: "bown",
          table: {},
          type: "checkbox",
          form: {
            new: {
              option: "w",
            },
            edit: {
              option: "w",
            },
          },
        },
        {
          placeholder: "ICE",
          columnData: "ice",
          table: {},
          type: "checkbox",
          form: {
            new: {
              option: "w",
            },
            edit: {
              option: "w",
            },
          },
        },
      ],
      search: false,
      width: 600,
      setDataForm: CRUDSalon,
      // exportable : {filename:"Clientes"}
    };
    function selectSalones(id) {
      let data = {
        optionService: "SelectSalonesCef",
        cef: id,
      };
      fetchF(data).then(({ salones }) => {
        setSalones(salones);
      });
    }
    if (salones === null) {
      selectSalones(id);
    }
    return (
      <div>
        <Button
          onClick={() => {
            obtenerCefs();
            setView("CRUD");
          }}
          appearance="primary"
          color="cyan"
        >
          Regresar
        </Button>
        <ModuleTableCRUD
          data={salones !== null ? salones : []}
          {...settingCrudTable}
        />
      </div>
    );
  };
  return (
    <>
      {view === "CRUD" ? (
        data.cefs.length > 0 && (
          <ModuleTableCRUD data={data.cefs} {...settingCrudTable} />
        )
      ) : (
        <GestionSalones id={salonConcured} />
      )}
    </>
  );
}
export default ModuleCefs;
