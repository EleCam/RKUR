import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Table, Button, FormGroup, Input, Label, InputGroup } from "reactstrap";
import ReactToExcel from "react-html-table-to-excel";

function ModuleHome() {
  const [viewModal, setViewModal] = useState(false);
  const [contenidoModal, setContenidoModal] = useState("");
  const [consultaLoading, setConsultaLoading] = useState(false);
  const [queryTable, setQueryTable] = useState([]);
  const [CEF, setCEF] = useState([]);
  function obtenerCupon() {
    setConsultaLoading(false);
    const data = new FormData();
    data.append("optionService", "Cupon");
    data.append("cupon", document.getElementById("cupon").value);
    setDataFetch(data).then((response) => {
      setConsultaLoading(true);
      setQueryTable(response.Cupon);
    });
  }
  function obtenerCefs() {
    setConsultaLoading(false);
    const data = new FormData();
    data.append("optionService", "CEF");
    setDataFetch(data).then((response) => {
      setCEF(response.CEFs);
    });
  }
  function obtenerInforme() {
    setConsultaLoading(false);
    const data = new FormData();
    data.append("optionService", "Informe");
    data.append("dateStart", document.getElementById("dateStart").value);
    data.append("dateEnd", document.getElementById("dateEnd").value);
    data.append("cef", document.getElementById("cef").value);
    setDataFetch(data).then((response) => {
      setConsultaLoading(true);
      setQueryTable(response.Informe);
    });
  }
  function close() {
    setConsultaLoading(false);
    setViewModal(false);
  }
  function verModal(type) {
    obtenerCefs();
    setConsultaLoading(false);
    setViewModal(true);
    setContenidoModal(type);
  }
  const setDataFetch = async (data) => {
    const response = await fetch(
      "https://diniz.com.mx/diniz/servicios/services/microS/tesoreriaServices.php",
      {
        method: "POST",
        body: data,
        header: new Headers({
          "Content-Type": "application/json",
        }),
      }
    );
    // console.log("a");
    return await response.json();
  };
  useEffect(() => {});
  return (
    <div>
      <div className="d-flex justify-content-center">
        <Button
          color="info"
          style={{ height: 58, margin: 25 }}
          onClick={verModal.bind(this, "Informe")}
        >
          Informe
        </Button>
        <Button
          color="info"
          style={{ height: 58, margin: 25 }}
          onClick={verModal.bind(this, "Cupon")}
        >
          Cupon
        </Button>
      </div>
      {viewModal && contenidoModal === "Cupon" ? (
        <>
          <ModalR
            title="Consulta de Cupon"
            view={viewModal}
            onCl={obtenerCupon}
            close={close}
            type={contenidoModal}
          ></ModalR>
        </>
      ) : viewModal && contenidoModal === "Informe" ? (
        <>
          <ModalR
            title="Fechas de Informe"
            view={viewModal}
            onCl={obtenerInforme}
            close={close}
            type={contenidoModal}
            CEF={CEF}
          ></ModalR>
        </>
      ) : (
        ""
      )}

      {consultaLoading ? (
        <>
          <ReactToExcel
            id="btnExpSolicitudes"
            title="Exportar consulta a Excel."
            className="btn-info btnReactToExcel"
            table="reporte"
            filename="Reporte_Cupones"
            sheet="sheet"
            buttonText="Exportar"
            // hidden={true}
          />
          <Table id="reporte">
            <thead>
              {contenidoModal === "Informe" ? (
                <tr>
                  <th>CEF canje</th>
                  <th>Codigo Cupon</th>
                  <th>Fecha Redimido</th>
                  <th>Valor Cupon</th>
                  <th>Tipo de Cupon</th>
                  <th>Promocion</th>
                </tr>
              ) : contenidoModal === "Cupon" ? (
                <tr>
                  <th>Cupon</th>
                  <th>Convenio</th>
                  <th>Vencimiento</th>
                  <th>Valor</th>
                  <th>Habilitado</th>
                  <th>Redimido</th>
                  <th>CEF</th>
                </tr>
              ) : (
                ""
              )}
            </thead>
            <tbody>
              {queryTable.map((cupon, index) => (
                <tr key={index}>
                  {contenidoModal === "Informe" ? (
                    <>
                      <td>{cupon.cef}</td>
                      <td>{cupon.cupon}</td>
                      <td>{cupon.fecha}</td>
                      <td>{cupon.valor}</td>
                      <td>{cupon.producto}</td>
                      <td>{cupon.convenio}</td>
                    </>
                  ) : contenidoModal === "Cupon" ? (
                    <>
                      <td>{cupon.cupon}</td>
                      <td>{cupon.convenio}</td>
                      <td>{cupon.vencimiento}</td>
                      <td>{cupon.valor}</td>
                      <td>{cupon.habilitado}</td>
                      <td>{cupon.redimido}</td>
                      <td>{cupon.cef}</td>
                    </>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
function ModalR(props) {
  const [view, setView] = useState(props.view);
  const [stateModal, setStateModal] = useState(["visible", "hidden"]);
  var children;
  if (props.type === "Cupon") {
    children = (
      <div className="d-flex" style={{ width: 600 }}>
        <InputGroup>
          <FormGroup floating style={{ height: 60 }}>
            <Input id="cupon" placeholder="Cupon" type="input" />
            <Label for="cupon">Cupon</Label>
          </FormGroup>
          <Button color="primary" style={{ height: 58 }} onClick={onClFunction}>
            Consultar
          </Button>
        </InputGroup>
      </div>
    );
  } else if (props.type === "Informe") {
    children = (
      <div className="d-flex" style={{ width: "auto" }}>
        <InputGroup>
          <FormGroup floating style={{ width: 300 }}>
            <Input id="dateStart" placeholder="Fecha de inicio" type="date" />
            <Label for="dateStart">Fecha de inicio</Label>
          </FormGroup>
          <FormGroup floating style={{ width: 300 }}>
            <Input id="dateEnd" placeholder="Fecha de fin" type="date" />
            <Label for="dateEnd">Fecha de fin</Label>
          </FormGroup>
          <FormGroup floating style={{ width: 100 }}>
            <Input id="cef" placeholder="CEF" type="select">
              <option value={"all"}>Todos </option>
              {props.CEF.map((cef, index) => (
                <option value={cef.cef} key={index}>
                  {cef.cef}{" "}
                </option>
              ))}
            </Input>
            <Label for="cef">CEF</Label>
          </FormGroup>

          <Button color="primary" style={{ height: 58 }} onClick={onClFunction}>
            Consultar
          </Button>
        </InputGroup>
      </div>
    );
  }
  function exit() {
    setStateModal(["hidden", "dead"]);
    setTimeout(() => {
      setView(false);
      props.close();
    }, 300);
  }
  function onClFunction() {
    props.onCl();
    exit();
  }
  useEffect(() => {
    if (view) {
      document.getElementById(
        "ModalShadow"
      ).style.height = `${window.innerHeight}px`;
      document.getElementById(
        "ModalShadow"
      ).style.width = `${window.innerWidth}px`;
      function handleResize() {
        document.getElementById(
          "ModalShadow"
        ).style.height = `${window.innerHeight}px`;
        document.getElementById(
          "ModalShadow"
        ).style.width = `${window.innerWidth}px`;
      }
      window.addEventListener("resize", handleResize);
    }
  });
  const modal = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
    dead: {
      opacity: 0,
      scale: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
      },
    },
  };
  if (view)
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "rgba(0,0,0,0.4",
        }}
        id="ModalShadow"
        className="d-flex justify-content-center align-items-center"
      >
        <motion.div
          initial={stateModal[1]}
          animate={stateModal[0]}
          variants={modal}
        >
          <div
            style={{
              background: "white",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{ padding: 15, background: "#AED6F1" }}
              className="d-flex justify-content-between"
            >
              <p style={{ margin: "auto", width: "auto" }}>{props.title}</p>
              <div
                onClick={exit}
                style={{
                  background: "#EC7063",
                  height: 25,
                  width: 25,
                  borderRadius: 100,
                  fontWeight: "bold",
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <div style={{ fontSize: 15, height: 25, color: "white" }}>
                  <span>x</span>
                </div>
              </div>
            </div>
            <div style={{ padding: 15 }}>{children}</div>
          </div>
        </motion.div>
      </div>
    );
  else {
    return <></>;
  }
}

export default ModuleHome;
