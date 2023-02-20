import { format } from "date-fns";
import { isAfter } from "date-fns/esm";
import React, { useState } from "react";
import {
  Panel,
  Placeholder,
  Stack,
  ButtonGroup,
  Button,
  SelectPicker,
  DatePicker,
  DateRangePicker,
} from "rsuite";
import { fetchServer } from "./App";
import PeoplesIcon from "@rsuite/icons/Peoples";
import DoingRoundIcon from "@rsuite/icons/DoingRound";
import LineChartIcon from "@rsuite/icons/LineChart";
import CalendarIcon from "@rsuite/icons/Calendar";
import TimeIcon from '@rsuite/icons/Time';
function ModuleDashboard() {
  // console.log(window.empleado);
  const [selectsCefs, setSelectCefs] = useState([]);
  const [cef, setcef] = useState(0);
  const [date, setDate] = useState(false);
  function ObtenerCEFs() {
    let data = [["optionService", "SelectCefsOptions"]];
    fetchServer(data, "cefs").then((dataCefs) => {
      dataCefs = dataCefs.concat([{ label: "Todos", value: 0 }]);
      setSelectCefs(dataCefs);
    });
  }
  if (window.empleado.rol > 3) {
    if (selectsCefs.length === 0) ObtenerCEFs();
  }
  function consultarDashboard() {
    let data = [
      ["optionService", "SelectDashboard"],
      ["cef", cef],
      [
        "date",
        format(date[0], "yyyy-MM-dd") + "," + format(date[1], "yyyy-MM-dd"),
      ],
    ];
    fetchServer(data).then((response) => {
      console.log(response);
    });
  }
  const PanelDash = (props) => (
    <Panel
      bordered
      style={{ width: 350, margin: 25 }}
      header={
        <Stack justifyContent="center" style={{ color: "white" }}>
          {props.title}
        </Stack>
      }
    >
      <div className="d-flex">
        {props.icon}{" "}
        <p style={{ fontSize: 50, padding: "0 50px", margin: 0 }}>
          {props.value}
        </p>
      </div>
    </Panel>
  );
  var iconsSetting = {  style : { fontSize: 70, marginRight: 10, margin: 0, color : "#2599ea" }}
  var panelesDash = [
    {
      title: "Meta alcanzada",
      value: "62.47%",
      icon: (
        <LineChartIcon {...iconsSetting} />
      ),
    },
    {
      title: "Fiesta realizadas",
      value: "87",
      icon: (
        <PeoplesIcon {...iconsSetting}  />
      ),
    },
    {
      title: "Fiesta agendadas",
      value: "139",
      icon: (
        <CalendarIcon {...iconsSetting}  />
      ),
    },
    {
      title: "Cotizaciones abiertas",
      value: "63",
      icon: (
        <TimeIcon {...iconsSetting}  />
      ),
    },
  ];
  return (
    <div className="">
      {window.empleado.rol > 3 && (
        <div className="d-flex justify-content-center" style={{ height: 35 }}>
          <p className=" " style={{ padding: 10, fontSize: 12 }}>
            Selecciona CEF:{" "}
          </p>
          <SelectPicker data={selectsCefs} defaultValue={0} onChange={setcef} />
          <p className=" " style={{ padding: 10, fontSize: 12 }}>
            Selecciona Rango de fechas:{" "}
          </p>
          <DateRangePicker
            showOneCalendar
            placeholder="Selecciona el rango de fechas"
            disabledDate={(date) => isAfter(date, new Date())}
            ranges={[]}
            //   oneTap
            onChange={setDate}
          />
          <Button
            title="Buscar"
            appearance="primary"
            style={{ marginLeft: 20 , background: "#2599ea"  }}
            disabled={!(date && (cef || cef === 0))}
            onClick={consultarDashboard}
          >
            Consultar
          </Button>
        </div>
      )}
      <div className="d-flex justify-content-between">
        {panelesDash.map((item) => (
          <PanelDash {...item} />
        ))}
      </div>
    </div>
  );
}

export default ModuleDashboard;
