import React, { Component } from "react";
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
import ModalAgregaNota from "./agregaNota";
import ModalAgregaConvenio from "./agregaConvenio";
import ModalEditaConvenio from "./editaConvenio";
import "react-multi-carousel/lib/styles.css";
import ModalSubirContrato from "./subirContrato";
import { FuncionesEstandar, Paneles } from "./funcionesNota";

class Deals extends FuncionesEstandar {
  constructor(props) {
    super(props);
    this.state = {
      docsLs: [],
      origen: "deals",
      currecord: [],
      sw_edit: false,
      sw_add: false,
      t1active: true,
      t2active: false,
      documento: "",
      notasLs: [],
      backData: null,
      serchReady: false,
    };
  }
  switchModalSubir = (info) => {
    let activeSubir = this.state.modalsubir;
    this.setState({
      modalsubir: !activeSubir,
      idconvenioact: info,
    });
  };
  agregaConvenio = () => {
    let data = {
      empresaid: this.props.empresaid,
      nombre: document.getElementById("txtConvenionombre").value,
      monto: document.getElementById("montoConvenio").value,
      fecdel: document.getElementById("txtConveniofecdel").value,
      fecal: document.getElementById("txtConveniofecal").value,
      descripcion: document.getElementById("txtConveniodescripcion").value,
      numeroInvitados: document.getElementById("invitadosConvenio").value,
      tipodeal: document.getElementById("tipodeal").value,
      noempl: this.props.noempl,
    };
    this.saveFetch("emp_agregaConvenio.php",data, this.props.getConveniosxempresa, this.props.empresaid)
  };
  eliminaDeal= () => {
    this.delFetch("emp_eliminaConvenio.php",document.getElementById("txtContEdId").value,this.props.getConveniosxempresa, this.props.empresaid)
  };
  editaConvenio = (e) => {
    let estatus = 1;
    switch (e.target.id) {
      case "win":
        estatus = 2;
        break;
      case "lose":
        estatus = 0;
        break;
      default:
        estatus = 1;
    }
    let data = {
      id: document.getElementById("txtEConvenioid").value,
      nombre: document.getElementById("txtEConvenionombre").value,
      monto: document.getElementById("txtEConveniotipo").value,
      fecdel: document.getElementById("txtEConveniofecdel").value,
      fecal: document.getElementById("txtEConveniofecal").value,
      invitados: document.getElementById("txtInvitados").value,
      descripcion: document.getElementById("txtEConveniodescripcion").value,
      estatus: estatus,
    };
    this.editFetch("emp_editaConvenio.php", data,this.props.getConveniosxempresa,this.props.empresaid )
  };
  getDataExtra = (convenio) => {
    if (this.props.tipo !== 1) {
      this.getNotas(convenio.id);
      this.setState({ currecord: convenio });
      this.getDocumentosConvenio(convenio.id);
      this.setState({ activepanel: "1" });
    }
  };
  getDocumentosConvenio = (id) => {
    this.setState({ conveniosLs: [] });
    let data = {
      origen: "dealsClientes",
      origenid: id,
    };
    this.getfetch("emp_getDocumentosconvenio.php",data,1 )
  };
  componentDidMount() {}
  cambiar = (e) => {
    if (e.target.id === "d1") this.props.getConveniosxempresa("Fecha");
    else if (e.target.id === "d2") this.props.getConveniosxempresa("Empresa");  
  };
  render() {
    return (
      <div>
        {this.props.verDeals ? (
          <Input
            style={{
              width: "20%",
              marginLeft: 20,
            }}
            onChange={this.props.getInputSearchDeals}
            type="select"
            id="SelecEstatusDeals"
          >
            <option value={1}>Open</option>
            <option value={2}>Win</option>
            <option value={0}>Lose</option>
            <option value={3}>All</option>
          </Input>
        ) : (
          ""
        )}

        <Row>
          <Col sm={this.props.tipo === 1 ? 12 : 7}>
            <div
              className="tableFixHead"
              style={{
                fontSize: 14,
                flex: 1,
                overflowY: "scroll",
                overflowX: "auto",
                padding: 10,
                maxHeight: "80vh",
              }}
            >
              <Table
                borderless
                className="table-bordered table-hover text-left small"
                responsive
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    {this.props.tipo === 1 ? (
                      ""
                    ) : (
                      <th style={{ width: 24 }}>
                        <ModalAgregaConvenio
                          empresaid={this.props.empresaid}
                          agregaConvenio={this.agregaConvenio}
                        />
                      </th>
                    )}
                    <th></th>
                    <th>Nombre</th>
                    <th>Descripción</th>  
                    <th
                      onClick={this.props.verEventos === "yes" ? this.cambiar : ""}
                      id="d2"
                      title="Ordenar por fecha"style={this.props.verEventos === "yes" ? {
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }:{}}
                    >
                      Inicio
                    </th>
                    <th>Fin</th>     
                    <th>Invitados</th>             
                    <th>Monto</th>
                    <th
                      onClick={this.props.verEventos === "yes" ? this.cambiar : ""}
                      id="d1"
                      title="Ordenar por empresa"style={this.props.verEventos === "yes" ? {
                        fontWeight: "bold",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }:{}}
                    >
                      {this.props.verDeals === "yes" ? "Empresa" : "Regitro"}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {this.props.conveniosLs
                    ? this.props.conveniosLs.map((convenio) => 
                    convenio.registro === window.noempl ||
                          window.superUs ? (
                        <tr
                          key={convenio.id}
                          onClick={this.getDataExtra.bind(this, convenio)}
                          className={
                            convenio.estatus === "2" && this.props.tipo === 1
                              ? "CWin"
                              : convenio.estatus === "0" &&
                                this.props.tipo === 1
                              ? "CLose"
                              : "COpen"
                          }
                          style={{
                            background:
                              convenio.estatus === "2" && this.props.tipo === 1
                                ? "#40E0D0"
                                : convenio.estatus === "0" &&
                                  this.props.tipo === 1
                                ? "#FFB6C1"
                                : "",
                          }}
                        >
                          {this.props.tipo === 1 ? (
                            ""
                          ) : (
                            <th style={{ width: 24 }}>
                              {convenio.estatus !== "1" ? (
                                
                                <ModalAgregaNota
                                agregaNota={this.agregaNota}
                                origen="deals"
                                origenid={convenio.id}
                                nombre={convenio.nombre}
                              />
                              ) : (
                                <>
                                  <ModalEditaConvenio
                                    convenio={convenio}
                                    empresaid={this.props.empresaid}
                                    editaConvenio={this.editaConvenio}
                                    eliminaDeal = {this.eliminaDeal}
                                  />
                                  <ModalAgregaNota
                                    agregaNota={this.agregaNota}
                                    origen="deals"
                                    origenid={convenio.id}
                                    nombre={convenio.nombre}
                                  />
                                </>
                              )}
                            </th>
                          )}
                          <td>{convenio.tipodeal}</td>
                          <td>{convenio.nombre}</td>
                          <td>{convenio.descripcion}</td>
                          <td>{convenio.fecha_inicio}</td>
                          <td>{convenio.fecha_fin}</td>

                          <td>{convenio.invitados}</td>
                          <td>{"$" + convenio.monto}</td>
                          <td>
                            {this.props.verDeals === "yes"
                              ? convenio.empresa
                              : convenio.fullname}{" "}
                          </td>
                        </tr>
                      ) : "" )
                    : this.props.conveniosLs.length > 0
                    ? this.props.conveniosLs.map((convenio) => (
                        <tr
                          key={convenio.id}
                          onClick={this.getDataExtra.bind(this, convenio)}
                          className={
                            convenio.estatus === "2" && this.props.tipo === 1
                              ? "CWin"
                              : convenio.estatus === "0" &&
                                this.props.tipo === 1
                              ? "CLose"
                              : "COpen"
                          }
                          style={{
                            background:
                              convenio.estatus === "2" && this.props.tipo === 1
                                ? "#40E0D0"
                                : convenio.estatus === "0" &&
                                  this.props.tipo === 1
                                ? "#FFB6C1"
                                : "",
                          }}
                        >
                          {this.props.tipo === 1 ? (
                            ""
                          ) : (
                            <th style={{ width: 24 }}>
                              <ModalEditaConvenio
                                convenio={convenio}
                                empresaid={this.props.empresaid}
                                editaConvenio={this.editaConvenio}
                              />
                              <ModalAgregaNota
                                agregaNota={this.agregaNota}
                                origen="contacto"
                                origenid={convenio.id}
                                nombre={convenio.nombre}
                              />
                            </th>
                          )}
                          <td>{convenio.nombre}</td>
                          <td>{"$" + convenio.monto}</td>
                          <td>{convenio.fecha_inicio}</td>
                          <td>{convenio.fecha_fin}</td>
                          <td>{convenio.descripcion}</td>

                          <td>
                            {this.props.verDeals === "yes"
                              ? convenio.empresa
                              : convenio.fullname}{" "}
                          </td>
                        </tr>
                      ))
                    : []}
                </tbody>
              </Table>
            </div>
          </Col>
          {this.props.tipo === 1 ? (
            ""
          ) : (
            <>
              <Col sm={5}>
                <Label>
                  {this.state.currecord.nombre != null
                    ? "Información relacionada a " + this.state.currecord.nombre
                    : "Selecciona un deal..."}
                </Label>
                <div
                  style={{ padding: 10 }}
                  hidden={this.state.currecord.nombre != null ? "" : "none"}
                >
                  <Nav
                    tabs
                    hidden={this.state.currecord.nombre != null ? "" : "none"}
                  >
                    <NavItem
                      className="crmChildNavLink"
                      style={{
                        backgroundColor:
                          this.state.t1active === true
                            ? "rgb(22, 187, 179)"
                            : "",
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
                          this.state.t2active === true
                            ? "rgb(22, 187, 179)"
                            : "",
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
                    origen = "dealsClientes"
                  ></Paneles>
                  </TabContent>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>
    );
  }
}
export default Deals;
