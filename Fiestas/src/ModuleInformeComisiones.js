import { format } from "date-fns";
import { isAfter } from "date-fns/esm";
import React, { useState, useEffect } from "react";
import { DatePicker, DateRangePicker, SelectPicker } from "rsuite";
import ModuleTableCRUD from "./ModuleTableCRUD";
function ModuleInformeComisiones() {
  const [date, setDate] = useState([]);
  const [cef, setCEF] = useState(null);
  const [informe, setInforme] = useState("Ventas");
  const dataComisiones = [
    {
      id: 3,
      noempl: "37604",
      nombre: "Alan Vazquez Moreno",
      cef: "CJN",
      comision: "4,600",
    },
    {
      id: 4,
      noempl: "35405",
      nombre: "Oliva Julian Moreno",
      cef: "PPP",
      comision: "2,600",
    },
  ];
  const dataVenta = [
    {
      id: 3,
      cef: "CJN",
      nombre: "Ciudad Jardin Neza",
      venta: "18,000",
    },
    {
      id: 4,
      cef: "PPP",
      nombre: "Parque Puebla",
      venta: "20,000",
    },
  ];
  const settingCrudTableVenta = {
    data: dataVenta,
    buttons: {
      view: { view: true },
    },
    modalsInputs: [
      { placeholder: "CEF", columnData: "cef", table: { width: 100 } },
      {
        placeholder: "Nombre",
        columnData: "nombre",
        table: { width: 250, sortable: true },
      },
      {
        placeholder: "Total Venta",
        columnData: "venta",
        table: { width: 100 },
      },
    ],
    exportable: { filename: "Reporte Ventas" },
    searchColumn: "CEF",
    width: 550,
    countButtons: 1,
  };
  const settingCrudTableComisiones = {
    data: dataComisiones,
    buttons: {
      view: { view: true },
    },
    modalsInputs: [
      { placeholder: "Empleado", columnData: "noempl", table: { width: 100 } },
      { placeholder: "CEF", columnData: "cef", table: { width: 70 } },
      {
        placeholder: "Nombre",
        columnData: "nombre",
        table: { sortable: true, width: 300 },
      },
      { placeholder: "Comision", columnData: "comision", table: true },
    ],
    exportable: { filename: "Reporte comisiones" },
    searchColumn: "nombre",
    width: 700,
    countButtons: 1,
  };
  const selectCEFs = ["TODOS", "CJN", "KAT", "PPP", "QUEUP"].map((item) => ({
    label: item,
    value: item,
  }));
  return (
    <>
      <div className="d-flex justify-content-center">
        <div>
          <div className="d-flex">
            <p className=" " style={{ padding: 10, fontSize: 12 }}>
              Rango de fechas:{" "}
            </p>
            <DateRangePicker
              showOneCalendar
              placeholder="Selecciona el rango de fechas"
              disabledDate={(date) => isAfter(date, new Date())}
              ranges={[]}
              //   oneTap
              onChange={setDate}
            />
            <p className=" " style={{ padding: 10, fontSize: 12 }}>
              CEF:
            </p>
            <SelectPicker
              data={selectCEFs}
              style={{ width: 224 }}
              onChange={setCEF}
            />
            <p className=" " style={{ padding: 10, fontSize: 12 }}>
              Informe:
            </p>
            <SelectPicker
              searchable={false}
              defaultValue={"Ventas"}
              data={[
                { label: "Ventas", value: "Ventas" },
                { label: "Comisiones", value: "Comisiones" },
              ]}
              style={{ width: 224 }}
              onChange={setInforme}
            />
          </div>
        </div>
      </div>
      {date && cef && date.length > 0 && informe === "Comisiones" && (
        <ModuleTableCRUD {...settingCrudTableComisiones} />
      )}
      {date && cef && date.length > 0 && informe === "Ventas" && (
        <ModuleTableCRUD {...settingCrudTableVenta} />
      )}
    </>
  );
}
export default ModuleInformeComisiones;
