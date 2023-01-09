import React from "react";
import {
  Table,
  Row,
  Col,
  Nav,
  NavItem,
  Label,
  TabPane,
  TabContent,
  Input,
  Button,
} from "reactstrap";

import "./index.css";
import ModalAgregaEvento2 from "./agregaEvento";
import ModalAgregaNota from "./agregaNota";
//import ModalEditaContacto from "./editaContacto";
import { FuncionesEstandar, Paneles } from "./funcionesNota";
import ModalSubirContrato from "./subirContrato";

import ModalAgregarParticipantes from "./modalParticipantes";
import ModalEditarEvento from "./editarEvento";
class Eventos extends FuncionesEstandar {
  constructor() {
    super();
    this.state = {
      origen: "evento",
      docsLs: [],
      notasLs: [],
      currecord: [],
      t1active: true,
      t2active: false,
      activepanel: 0,
      empleadosLs: [],
      participantesLs: [],
    };
  }
  setDatosExtras = (contacto) => {
    this.setState({ activepanel: "1" });
    this.getNotas(contacto.id);
    this.getDocumentosConvenio(contacto.id);
    this.setState({ currecord: contacto });
    document.getElementById("idCound").value = contacto.id;
    setTimeout(this.obtenerParticipantes(), 200);
    this.changePanel("1");
    console.log(this.state.notasLs);
  };
  editarEvento = () => {
    let data = {
      id: document.getElementById("txtEventId").value,
      inicio:
        document.getElementById("txtInicio").value +
        " " +
        document.getElementById("txtInicioTime").value,
      termino:
        document.getElementById("txtInicio").value +
        " " +
        document.getElementById("txtInicioTime").value,
      nombre: document.getElementById("txtNombre").value,
      tipo: document.getElementById("txtTipo").value,
    };
    this.editFetch(
      "emp_editaEvento.php",
      data,
      this.props.getEventosxempresa,
      this.props.empresaid
    );
  };
  eliminaEvento = () => {
    this.delFetch(
      "emp_eliminaEvento.php",
      document.getElementById("txtContEdId").value,
      this.props.getEventosxempresa,
      this.props.empresaid
    );
  };
  agregaEvento = () => {
    let data = {
      id: document.getElementById("txtContAgEmpresaId").value,
      nombre: document.getElementById("txtNombre").value,
      inicio:
        document.getElementById("txtInicio").value +
        " " +
        document.getElementById("txtInicioTime").value,
      fin:
        document.getElementById("txtFinal").value +
        " " +
        document.getElementById("txtFinalTime").value,
      tipo: document.getElementById("txtTipo").value,
      origen: "prospect",
      registro: this.props.noempl,
    };
    this.saveFetch(
      "emp_agregaEvento.php",
      data,
      this.props.getEventosxempresa,
      this.props.empresaid
    );
  };
  switchModalSubir = (info) => {
    let activeSubir = this.state.modalsubir;
    this.setState({
      modalsubir: !activeSubir,
      idconvenioact: info,
    });
  };
  obtenerempleados() {
    this.getfetch("emp_getEmpleadosEventos.php", {}, 3);
  }
  obtenerParticipantes = () => {
    let data = {
      origen: "prospect",
      origenid: document.getElementById("idCound").value,
    };
    this.getfetch("emp_getParticipantes.php", data, 2);
  };
  agregarParticipante = () => {
    let data = {
      noempl: document.getElementById("txtNombre").value,
      caracter: document.getElementById("txtCaracter").value,
      idorigen: document.getElementById("txtidorigen").value,
      origen: "prospect",
      id: document.getElementById("txtidorigen").value,
    };
    this.saveFetch("emp_agregaParticipante.php", data, () => {
      this.setDatosExtras(this.state.currecord);
      this.changePanel("3");
    });
  };
  eliminarParticipante = (e) => {
    var id = e.target.id.split("-");
    if (id[0] === "") id = e.target.parentNode.parentNode.id.split("-");
    if (id[0] > 0)
      this.delFetch("emp_eliminarParticipante.php", id[0], () => {
        this.setDatosExtras(this.state.currecord);
        this.changePanel("3");
      });
  };
  getDocumentosConvenio = (id) => {
    let data = {
      origen: "eventos",
      origenid: id,
    };
    this.getfetch("emp_getDocumentosconvenio.php", data, 1);
  };
  cambiar = (e) => {
    this.props.getEventosxempresa(e.target.id);
  };
  componentDidMount() {
    this.obtenerempleados();
  }

  render() {
    const styletableFixHead = {
      fontSize: 14,
      flex: 1,
      overflowY: "scroll",
      overflowX: "auto",
      padding: 10,
      maxHeight: "80vh",
    };
    return (
      <div>
        <Row>
          <Input
            hidden
            type="text"
            bsSize="sm"
            defaultValue={0}
            id="idCound"
          ></Input>
          <Col
            sm={this.props.verEventos === "yes" ? 11 : 7}
            style={{
              margin: this.props.verEventos === "yes" ? "20px 0 0 50px" : 0,
            }}
          >
            <div
              className="tableFixHead "
              style={{
                styletableFixHead,
              }}
            >
              <Table
                borderless
                className="table-bordered table-hover text-left small"
                responsive
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    {this.props.verEventos == "yes" ? (
                      ""
                    ) : (
                      <th style={{ width: 24, textAlign: "center" }}>
                        <ModalAgregaEvento2
                          eventosLs={this.props.eventosLs}
                          empresaid={this.props.empresaid}
                          rolesLs={this.props.rolesLs}
                          agregaEvento={this.agregaEvento}
                        />
                      </th>
                    )}

                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th
                      onClick={
                        this.props.verEventos === "yes" ? this.cambiar : ""
                      }
                      id="d2"
                      title="Ordenar por fecha"
                      style={
                        this.props.verEventos === "yes"
                          ? {
                              fontWeight: "bold",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }
                          : {}
                      }
                    >
                      Inicio
                    </th>
                    <th>Fin</th>
                    <th
                      onClick={
                        this.props.verEventos === "yes" ? this.cambiar : ""
                      }
                      id="d1"
                      title="Ordenar por empresa"
                      style={
                        this.props.verEventos === "yes"
                          ? {
                              fontWeight: "bold",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }
                          : {}
                      }
                    >
                      {this.props.verEventos == "yes" ? "Empresa" : "Registro"}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {this.props.contactosLs.length > 0
                    ? this.props.contactosLs.map((evento) =>  
                    evento.registro === window.noempl ||
                          window.superUs ? (
                        <tr
                          key={evento.id}
                          onClick={this.setDatosExtras.bind(this, evento)}
                          id={"a" + evento.id}
                        >
                          {this.props.verEventos == "yes" ? (
                            ""
                          ) : (
                            <td>
                              <ModalAgregaNota
                                agregaNota={this.agregaNota}
                                origen="evento"
                                origenid={evento.id}
                                nombre={evento.fullname}
                              />
                              <ModalEditarEvento
                                eventosLs={this.props.eventosLs}
                                empresaid={evento.id}
                                agregaNota={this.agregaNota}
                                origen="evento"
                                evento={evento}
                                nombre={evento.nombre}
                                tipo={evento.tipoeventoid}
                                inicio={evento.inicio.split(" ")}
                                fin={evento.termino.split(" ")}
                                editarEvento={this.editarEvento}
                                eliminaEvento={this.eliminaEvento}
                              />
                            </td>
                          )}

                          <td>{evento.nombre}</td>
                          <td>{evento.evento}</td>
                          <td>{evento.inicio}</td>
                          <td>{evento.termino}</td>
                          <td>
                            {evento.empresa ? evento.empresa : evento.fullname}{" "}
                          </td>
                        </tr>
                      ): (""))
                    : []}
                </tbody>
              </Table>
            </div>
          </Col>

          {this.props.verEventos == "yes" ? (
            ""
          ) : (
            <Col sm={5}>
              <div style={{ padding: 10 }}>
                <div style={{ padding: 10, textAlign: "center" }}>
                  <Label>
                    {this.state.currecord.nombre == null
                      ? "Selecciona un contacto..."
                      : this.state.currecord.nombre}
                    <b></b>
                  </Label>
                </div>

                <Nav
                  tabs
                  className={
                    this.state.currecord.nombre == null ? "d-none" : ""
                  }
                >
                  <NavItem
                    className="crmChildNavLink"
                    style={{
                      backgroundColor:
                        this.state.t1active === true ? "rgb(22, 187, 179)" : "",
                    }}
                    onClick={this.changePanel.bind(this, "1")}
                  >
                    <Label
                      style={{
                        cursor: "pointer",
                        color: this.state.t1active === true ? "white" : "",
                      }}
                      onClick={this.changePanel.bind(this, "1")}
                    >
                      Notas
                    </Label>
                  </NavItem>
                  <NavItem
                    className="crmChildNavLink"
                    style={{
                      backgroundColor:
                        this.state.t2active === true ? "rgb(22, 187, 179)" : "",
                    }}
                    onClick={this.changePanel.bind(this, "2")}
                  >
                    <Label
                      style={{
                        cursor: "pointer",
                        color: this.state.t2active === true ? "white" : "",
                      }}
                      onClick={this.changePanel.bind(this, "2")}
                    >
                      Archivos
                    </Label>
                  </NavItem>
                  <NavItem
                    className="crmChildNavLink"
                    style={{
                      backgroundColor:
                        this.state.t3active === true ? "rgb(22, 187, 179)" : "",
                    }}
                    onClick={this.changePanel.bind(this, "3")}
                  >
                    <Label
                      id={"participantes"}
                      style={{
                        cursor: "pointer",
                        color: this.state.t3active === true ? "white" : "",
                      }}
                      onClick={this.changePanel.bind(this, "3")}
                    >
                      Participantes
                    </Label>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activepanel}>
                  <Paneles
                    notasLs={this.state.notasLs}
                    eliminaNota={this.eliminaNota}
                    switchModalSubir={this.switchModalSubir}
                    modalsubir={this.state.modalsubir}
                    currecord={this.state.currecord}
                    noempl={this.state.noempl}
                    nombre={this.state.nombre}
                    docsLs={this.state.docsLs}
                    getDocumentosConvenio={this.getDocumentosConvenio}
                    eliminarArchivo={this.eliminarArchivo}
                    empleadosLs={this.state.empleadosLs}
                    participantesLs={this.state.participantesLs}
                    eliminarParticipante={this.eliminarParticipante}
                    obtenerParticipantes={this.obtenerParticipantes}
                    agregarParticipante={this.agregarParticipante}
                    eventoView = {true}
                    origen = "eventos"
                  ></Paneles>
                </TabContent>
              </div>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
export default Eventos;
