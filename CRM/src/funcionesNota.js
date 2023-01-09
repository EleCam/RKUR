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
import ModalAgregarParticipantes from "./modalParticipantes";
import ModalSubirContrato from "./subirContrato";

export class Paneles extends Component {
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
      <>
        <TabPane tabId="1" style={{ border: " solid 1px white" }}>
          <Row style={{ height: 250 }}>
            <Col sm="12">
              <div className="tableFixHead">
                {!this.props.notasLs ? (
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
                        {this.props.notasLs
                          ? this.props.notasLs.map((nota) => (
                              <tr key={nota.id}>
                                <td>
                                  {window.superUs ? <Button
                                    id={nota.id + "-" + nota.origenid}
                                    onClick={this.props.eliminaNota}
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
                                  </Button> : ""}
                                  
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
          <Button
            color="btn btn-outline-info btn-sm"
            onClick={this.props.switchModalSubir.bind(this, 1)}
          >
            Agregar documento
          </Button>
          <ModalSubirContrato
            switchModal={this.props.switchModalSubir}
            modal={this.props.modalsubir}
            services_url={"https://diniz.com.mx/diniz/servicios/services/"}
            idconvenio={1}
            manejaConvenio={1}
            getDocumentosConvenio={this.props.getDocumentosConvenio}
            empresaid={this.props.currecord.id}
            origen={this.props.origen}
            noempl={this.props.noempl}
            nombre={this.props.nombre}
          />

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
                <Table
                  borderless
                  className="table-bordered table-hover text-left small"
                  responsive
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <td style={{ width: 24 }}></td>
                      <th>Documento</th>
                    </tr>
                  </thead>
                  <tbody className="bg-light">
                    {this.props.docsLs
                      ? this.props.docsLs.map((doc) => (
                          <tr key={doc.id}>
                            <td style={{ width: 24 }}>
                              {window.superUs ?  <Button
                                id={doc.id}
                                onClick={this.props.eliminarArchivo.bind(
                                  this,
                                  doc.id
                                )}
                                style={{
                                  fontSize: "14",
                                  width: 30,
                                  height: 30,
                                }}
                                outline
                                color="danger"
                                size="sm"
                              >
                                <span className="fas fa-trash" />
                              </Button> :""}
                             
                            </td>
                            <td>
                              <a
                                href={
                                  "https://diniz.com.mx/diniz/servicios/services/leerArchivo.php?file=" +
                                  doc.id
                                }
                                target="_blank"
                              >
                                {doc.nombre}
                              </a>
                            </td>
                          </tr>
                        ))
                      : []}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </TabPane>
        {this.props.eventoView ? (
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
                            empleados={this.props.empleadosLs}
                            agregarParticipante={this.props.agregarParticipante}
                            obtenerParticipantes={
                              this.props.obtenerParticipantes
                            }
                            id={this.props.currecord.id}
                          />
                        </th>
                        <th>Participante</th>
                        <th>De carácter</th>
                      </tr>
                    </thead>
                    <tbody className="bg-light">
                      {this.props.participantesLs
                        ? this.props.participantesLs.map((participante) => (
                            <tr key={participante.id}>
                              <td style={{ width: 24 }}>
                                {window.superUs ? (
                                  <Button
                                    id={
                                      participante.id +
                                      "-" +
                                      participante.eventoid
                                    }
                                    onClick={this.props.eliminarParticipante}
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
                                      id={
                                        participante.id +
                                        "-" +
                                        participante.eventoid
                                      }
                                      className="fas fa-trash"
                                    />
                                  </Button>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>{participante.fullname}</td>
                              <td>{participante.caracter}</td>
                            </tr>
                          ))
                        : []}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </TabPane>
        ) : (
          ""
        )}
      </>
    );
  }
}
class FuncionesFetch extends Component {
  requestInfo = (data) => {
    let requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    return requestInfo;
  };
  delFetch(services, id, getfunction, dat = "") {
    let data = {
      id: id,
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/" + services,
      this.requestInfo(data)
    )
      .then((response) => response.json())
      .then(() => {
        getfunction(dat);
      })
      .catch((e) => console.log(e));
  }
  editFetch(services, data, getfunction, dat) {
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/" + services,
      this.requestInfo(data)
    )
      .then((response) => response.json())
      .then(() => {
        getfunction(dat);
      })
      .catch((e) => console.log(e));
  }
  saveFetch(services, data, getfunction, dat) {
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/" + services,
      this.requestInfo(data)
    )
      .then((response) => response.json())
      .then(() => {
        getfunction(dat);
      })
      .catch((e) => console.log(e));
  }
  getfetch = (services, data, state) => {
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/" + services,
      this.requestInfo(data)
    )
      .then((response) => response.json())
      .then((response) => {
        switch (state) {
          case 1:
            this.setState({ docsLs: response });
            break;
          case 2:
            this.setState({ participantesLs: response });
            break;
          case 3:
            this.setState({ empleadosLs: response });
            break;
          default:
            break;
        }
      });
  };
  changePanel = (pan) => {
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
}
export class FuncionesEstandar extends FuncionesFetch {
  eliminaNota = (nota) => {
    var dataNota = nota.target.id.split("-");
    if (dataNota[0] === "")
      //usamos esta validacion en caso de que el dom identifique el span y no el buttom
      dataNota = nota.target.parentNode.parentNode.id.split("-");
    if (dataNota[0] > 0) {
      this.delFetch(
        "emp_eliminaNota.php",
        dataNota[0],
        this.getNotas,
        dataNota[1]
      );
    }
  };
  agregaNota = () => {
    let data = {
      origen: document.getElementById("txtOrigen").value,
      origenid: document.getElementById("txtOrigenid").value,
      nota: document.getElementById("txtNota").value,
      noempl: this.props.noempl,
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
      "https://diniz.com.mx/diniz/servicios/services/emp_agregaNota.php",
      requestInfo
    )
      .then((response) => response.json())
      .then(() => {
        this.getNotas(data.origenid);
      })
      .catch((e) => console.log(e));
  };
  getNotas = (id) => {
    let data = {
      origen: this.state.origen,
      origenid: id,
    };
    //let service = "emp_getNotas.php";
    //this.getfetch(data,service).then(()=> {console.log(this.state.responseData)})
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getNotas.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((notasLs) => {
        if (notasLs !== null) {
          this.setState({ notasLs });
        } else {
          this.setState({ notasLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };
  eliminarArchivo = (id) => {
    this.delFetch(
      "emp_eliminaDocs.php",
      id,
      this.getDocumentosConvenio,
      this.state.currecord.id
    );
  };
}
