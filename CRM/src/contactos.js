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
  Button,
} from "reactstrap";
import "./index.css";
import ModalSubirContrato from "./subirContrato";
import ModalGen from "./modalGen";
import { FuncionesEstandar, Paneles } from "./funcionesNota";

class Contactos extends FuncionesEstandar {
  constructor() {
    super();
    this.state = {
      docsLs: [],
      notasLs: [],
      currecord: [],
      t1active: true,
      t2active: false,
      activepanel: 0,
      origen: "contacto",
    };
  }
  switchModalSubir = (info) => {
    let activeSubir = this.state.modalsubir;
    this.setState({
      modalsubir: !activeSubir,
      idconvenioact: info,
    });
  };
  setDatosExtras = (contacto) => {
    this.setState({ activepanel: "1" });
    this.getNotas(contacto.id);
    this.setState({ currecord: contacto });
    this.getDocumentosConvenio(contacto.id)
  };
  getDocumentosConvenio = (id) => {
    let data = {
      origen: "contactos",
      origenid: id,
    };
    this.getfetch("emp_getDocumentosconvenio.php", data,1)
  };
  agregaContacto = () => {
    let data = {
      empresaid: document.getElementById("txtContAgEmpresaId").value,
      nombre: document.getElementById("txtContAgNombre").value,
      celular: document.getElementById("txtContAgCelular").value,
      email: document.getElementById("txtContAgEmail").value,
      rolid: document.getElementById("txtContAgRolId").value,
      dob: document.getElementById("txtContAgDOB").value,
      noempl: this.props.noempl,
    };
    this.saveFetch(
      "emp_agregaContacto.php",
      data,
      this.props.getContactosxempresa,
      this.props.empresaid
    );
  };
  editaContacto = () => {
    let data = {
      id: document.getElementById("txtContEdId").value,
      nombre: document.getElementById("txtContEdNombre").value,
      celular: document.getElementById("txtContEdCelular").value,
      email: document.getElementById("txtContEdEmail").value,
      rolid: document.getElementById("txtContEdRolId").value,
      dob: document.getElementById("txtContEdDOB").value,
    };
    this.editFetch(
      "emp_editaContacto.php",
      data,
      this.props.getContactosxempresa,
      this.props.empresaid
    );
  };
  eliminaContacto = () => {
    this.delFetch(
      "emp_eliminaContacto.php",
      document.getElementById("txtContEdId").value,
      this.props.getContactosxempresa,
      this.props.empresaid
    );
  };
  componentDidMount() {}

  render() {
    const styletableFixHead = {
      fontSize: 14,
      flex: 1,
      overflowY: "scroll",
      overflowX: "auto",
      padding: 10,
      maxHeight: "80vh",
    };
    const space4 = { margin: 4 };
    return (
      <div>
        <Row>
          <Col sm={this.props.tipo ? 12 : 7}>
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
                    <th
                      style={{
                        width: 24,
                        textAlign: "center",
                        display: this.props.tipo === 1 ? "none" : "",
                      }}
                    >
                      <ModalGen
                        modalTip="NuevoCliente"
                        empresaid={this.props.empresaid}
                        rolesLs={this.props.rolesLs}
                        cerrar={this.cerrar}
                        agregaContacto={this.agregaContacto}
                      />
                    </th>

                    <th>Nombre</th>
                    <th>Celular</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>DOB</th>
                    <th>
                      {this.props.verContactos == "yes"
                        ? "Empresa"
                        : "Registro"}{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {this.props.contactosLs.length > 0
                    ? this.props.contactosLs.map((contacto) => 
                    contacto.registro === window.noempl ||
                          window.superUs ? (
                        <tr
                          key={contacto.id}
                          onClick={this.setDatosExtras.bind(this, contacto)}
                        >
                          <td
                            className=""
                            style={{
                              width: 80,
                              display: this.props.tipo === 1 ? "none" : "flex",
                            }}
                          >
                            <>
                              <ModalGen
                                modalTip="EditarCliente"
                                rolesLs={this.props.rolesLs}
                                eliminaContacto={this.eliminaContacto}
                                editaContacto={this.editaContacto}
                                contacto={contacto}
                              />
                              <span style={space4} />
                              {this.props.tipo ? (
                                ""
                              ) : (
                                <ModalGen
                                  modalTip="AgregarNota"
                                  agregaNota={this.agregaNota}
                                  origen="contacto"
                                  contacto={contacto}
                                />
                              )}
                              <span style={space4} />
                            </>
                          </td>
                          <td>{contacto.nombre}</td>
                          <td>{contacto.celular}</td>
                          <td>{contacto.email}</td>
                          <td>{contacto.rol}</td>
                          <td>{contacto.dob}</td>
                          <td>
                            {contacto.empresa
                              ? contacto.empresa
                              : contacto.fullname}{" "}
                          </td>
                        </tr>)
                      : "")
                    : []}
                </tbody>
              </Table>
            </div>
          </Col>
          {this.props.tipo ? (
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
                    origen = "contactos"
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
export default Contactos;
