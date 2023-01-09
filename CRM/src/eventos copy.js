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
  InputGroup,
  Button,
} from "reactstrap";

import "./index.css";

import "react-multi-carousel/lib/styles.css";
import ModalAgregaEvento from "./agregarEvento";
import ModalAgregaNota from "./agregaNota";
import { FuncionesNotas } from "./funcionesNota";
import ModalAgregarParticipantes from "./modalParticipantes";
class Eventos extends FuncionesNotas {
  constructor(props) {
    super(props);
    this.state = {
      notasLs: [],
      participantesLs: [],
      t1active: true,
      t2active: false,
      t3active: false,
      docsLs: [],
      isReady: false,
      currecord: [],
      empleadosLs: [],
    };
    
  }
  obtenerParticipantes() {
    let data = {
      origen: "prospect",
      origenid: 1,
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getParticipantes.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((participantesLs) => {
        if (participantesLs !== null) {
          this.setState({ participantesLs: participantesLs });
        } else {
          this.setState({ participantesLs: [] });
        }
      })
      .catch((e) => console.log(e));
  }
  agregarParticipante() {
    let data = {
      noempl: document.getElementById("txtNombre").value,
      caracter: document.getElementById("txtCaracter").value,
      idorigen: document.getElementById("txtidorigen").value,
      origen: "prospect",
    };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_participante.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {})
      .catch((e) => console.log(e));
  }
  changePanelEvents = (pan) => {
    this.setState({ t1active: false });
    this.setState({ t2active: false });
    this.setState({ t3active: false });
    switch (pan) {
      case "1":
        this.setState({ t1active: true });
        break;
      case "2":
        this.setState({ t2active: true });
        break;
      case "3":
        this.setState({ t3active: true });
        break;
      default:
        this.setState({ t1active: true });
        break;
    }
    this.setState({ activepanel: pan });
  };
 
  eliminarParticipante = (id) => {
    var dataNota = id.target.id.split("-");
    if (dataNota[0] == "")
      //usamos esta validacion en caso de que el dom identifique el span y no el buttom
      dataNota = nota.target.parentNode.parentNode.id.split("-");
    if (dataNota[0] > 0) {
      let data = {
        id: dataNota[0],
      };
      const requestInfo = {
        method: "POST",
        body: JSON.stringify(data),
        header: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      };
      fetch(
        "https://diniz.com.mx/diniz/servicios/services/emp_eliminarParticipante.php",
        requestInfo
      )
        .then((response) => response.json())
        .then((response) => {
          this.props.getEvento(dataNota[1]);
        })
        .catch((e) => console.log(e));
    }
  };
  setDatosExtras = (evento) => {
    this.setState({ activepanel: "1" });
    this.getNotas(evento.id);
    this.setState({ currecord: evento });
  };
  obtenerempleados() {
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getEmpleadosEventos.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((empleadosLs) => {
        if (empleadosLs !== null) {
          this.setState({ empleadosLs: empleadosLs });
          console.log(empleadosLs);
        } else {
          this.setState({ empleadosLs: [] });
        }
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    this.obtenerempleados();
    this.obtenerParticipantes();
  }
  render() {
    const space4 = { margin: 4 };
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
          <Col sm={7}>
            <div className="tableFixHead" style={styletableFixHead}>
              <Table
                borderless
                className="table-bordered table-hover text-left small"
                responsive
              >
                <thead>
                  <tr style={{ textAlign: "center" }}>
                    <th style={{ width: 24, textAlign: "center" }}>
                      <ModalAgregaEvento
                        empresaid={this.props.empresaid}
                        rolesLs={this.props.rolesLs}
                        agregarEvento={this.agregarEvento}
                      />
                    </th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Inicio</th>
                    <th>Fin</th>
                    <th>Registró</th>
                  </tr>
                </thead>
                <tbody className="bg-light">
                  {true
                    ? this.props.eventosLs.map((evento) => (
                        <tr
                          key={evento.id}
                          onClick={this.setDatosExtras.bind(this, evento)}
                        >
                          <td>
                            <ModalAgregaNota
                              agregaNota={this.agregaNota}
                              origen="evento"
                              origenid={evento.id}
                              nombre={evento.fullname}
                            />
                          </td>
                          <td>{evento.nombre}</td>
                          <td>{evento.tipoeventoid}</td>
                          <td>{evento.inicio}</td>
                          <td>{evento.termino}</td>
                          <td>{evento.fullname}</td>
                        </tr>
                      ))
                    : []}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col sm={5}>
            <div style={{ padding: 10 }}>
              <Nav tabs>
                <NavItem
                  className="crmChildNavLink"
                  style={{
                    backgroundColor:
                      this.state.t1active === true ? "rgb(22, 187, 179)" : "",
                  }}
                  onClick={this.changePanelEvents.bind(this, "1")}
                >
                  <Label
                    style={{
                      cursor: "pointer",
                      color: this.state.t1active === true ? "white" : "",
                    }}
                    onClick={this.changePanelEvents.bind(this, "1")}
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
                  onClick={this.changePanelEvents.bind(this, "2")}
                >
                  <Label
                    style={{
                      cursor: "pointer",
                      color: this.state.t2active === true ? "white" : "",
                    }}
                    onClick={this.changePanelEvents.bind(this, "2")}
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
                  onClick={this.changePanelEvents.bind(this, "3")}
                >
                  <Label
                    style={{
                      cursor: "pointer",
                      color: this.state.t3active === true ? "white" : "",
                    }}
                    onClick={this.changePanelEvents.bind(this, "3")}
                  >
                    Participantes
                  </Label>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activepanel}>
                <TabPane tabId="1" style={{ border: " solid 1px white" }}>
                  <Row style={{ height: 250 }}>
                    <Col sm="12">
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
                        {!this.state.notasLs.length ? (
                          "No existen notas..."
                        ) : (
                          <>
                            <Table
                              borderless
                              className="table-bordered table-hover text-left small"
                              responsive
                            >
                              <thead>
                                <tr style={{ textAlign: "center" }}>
                                  <th style={{ width: 24 }}></th>
                                  <th>Fecha</th>
                                  <th>Registró</th>
                                  <th>Nota</th>
                                </tr>
                              </thead>
                              <tbody className="bg-light">
                                {this.state.notasLs.length > 0
                                  ? this.state.notasLs.map((nota) => (
                                      <tr key={nota.id}>
                                        <td>
                                          <Button
                                            id={nota.id + "-" + nota.origenid}
                                            onClick={this.eliminaNota}
                                            style={{
                                              fontSize: "14",
                                              width: 30,
                                              height: 30,
                                            }}
                                            outline
                                            color="danger"
                                            size="sm"
                                          >
                                            <span
                                              id={nota.id + "-" + nota.origenid}
                                              className="fas fa-trash"
                                            />
                                          </Button>
                                        </td>
                                        <td>{nota.fecha}</td>
                                        <td>{nota.fullname}</td>
                                        <td>{nota.nota}</td>
                                      </tr>
                                    ))
                                  : []}
                              </tbody>
                            </Table>
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2" style={{ border: " solid 1px white" }}>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={2}>
                      <Label>Documento</Label>
                    </Col>
                    <Col sm={10}>
                      <Input id="txtPDF" type="text" bsSize="sm" />
                    </Col>
                  </Row>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={10}>
                      <Input
                        outline
                        color="info"
                        style={{ textAlign: "center", fontSize: 12 }}
                        type="file"
                        id="file"
                        name="file"
                        onChange={this.onChangeHandler1}
                        accept=".pdf"
                        required
                      />
                    </Col>
                    <Col sm={2}>
                      <Button
                        style={{ width: 30, textAlign: "center", fontSize: 10 }}
                        outline
                        color="success"
                        size="sm"
                      >
                        <i className="fa fas fa-upload"></i>
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ height: 250 }}>
                    <Col sm="12">
                      <div className="tableFixHead" style={styletableFixHead}>
                        <Table
                          borderless
                          className="table-bordered table-hover text-left small"
                          responsive
                        >
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th style={{ width: 24 }}></th>
                              <th>Documento</th>
                            </tr>
                          </thead>
                          <tbody className="bg-light">
                            {this.state.docsLs.length > 0
                              ? this.props.docsLs.map((doc) => (
                                  <tr key={doc.id}>
                                    <td style={{ width: 24 }}></td>
                                    <td>{doc.nombre}</td>
                                  </tr>
                                ))
                              : []}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3" style={{ border: " solid 1px white" }}>
                  <Row style={{ height: 250 }}>
                    <Col sm="12">
                      <div className="tableFixHead" style={styletableFixHead}>
                        <Table
                          borderless
                          className="table-bordered table-hover text-left small"
                          responsive
                        >
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th style={{ width: 24 }}>
                                <ModalAgregarParticipantes
                                  empresaid={this.props.empresaid}
                                  empleados={this.state.empleadosLs}
                                  agregarParticipante={this.agregarParticipante}
                                  id={this.state.currecord.id}
                                />
                              </th>
                              <th>Participante</th>
                              <th>De carácter</th>
                            </tr>
                          </thead>
                          <tbody className="bg-light">
                            {this.state.participantesLs.length > 0
                              ? this.state.participantesLs.map(
                                  (participante) => (
                                    <tr key={participante.id}>
                                      <td style={{ width: 24 }}>
                                        <Button
                                          id={participante.id + "-" + participante.origenid}
                                          onClick={this.eliminarParticipante}
                                          style={{
                                            fontSize: "14",
                                            width: 30,
                                            height: 30,
                                          }}
                                          outline
                                          color="danger"
                                          size="sm"
                                        >
                                          <span
                                            id={participante.id + "-" + participante.origenid}
                                            className="fas fa-trash"
                                          />
                                        </Button>
                                      </td>
                                      <td>{participante.fullname}</td>
                                      <td>{participante.caracter}</td>
                                    </tr>
                                  )
                                )
                              : []}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Eventos;
