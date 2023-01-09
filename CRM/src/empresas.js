import React, { Component } from "react";
import {
  Table,
  Label,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import { Input, InputGroup } from "reactstrap";
import "./index.css";
import ModalAgregaEmpresa from "./agregaEmpresa";
import ModalEditaEmpresa from "./editaEmpresa";
import Contactos from "./contactos";
import Deals from "./deals";
import Eventos from "./eventos";
import ModalInfoColors from "./infocolors";
import { Button } from "bootstrap";
import ModalSubirContrato from "./subirContrato";
import { Calendar } from "reactstrap-date-picker/lib/calendar/Calendar";

class Empresas extends Component {
  constructor() {
    super();
    this.state = {
      empresasLs: [],
      empresasLsBack: [], //respaldo para buscador
      rolesLs: [],
      eventotiposLs: [],
      contactosLs: [],
      conveniosLs: [],
      eventosLs: [],
      tareasLs: [],
      currecord: [],
      curempresa: "",
      participantesLs: [],
      curempresaid: 0,
      sw_edit: false,
      sw_add: false,
      activepanel: "1",
      t1active: true,
      t2active: false,
      t3active: false,
      t4active: false,
      backData: [],
    };
  }

  ssGet() {
    // let selectEts = document.getElementById("InSearch").value;
    //console.log(selectEts);
  }
  getInputSearch = (e) => {
    let backData = this.state.empresasLsBack;
    let inputVal = e.target.value.toLowerCase();
    let arrayReturn = [];
    let selectEts = document.getElementById("SelecEstatus").value; //Con esta linea cuando se cambia el tipo se actualiza la lista
    if (selectEts.toLowerCase() === inputVal) inputVal = "";
    backData.forEach(function(a) {
      if (
        a.empresa.toLowerCase().includes(inputVal) &&
        (a.estatus === selectEts || a.activo === selectEts || selectEts === "a")
      )
        arrayReturn.push(a);
    });
    this.setState({ empresasLs: arrayReturn });
  };

  abreAdd = () => {
    this.setState({ sw_add: true });
  };

  abreEdit = (curr) => {
    this.setState({ currecord: curr });
    this.setState({ sw_edit: true });
    console.log(curr);
  };

  getEmpresas = () => {
    let prospects = this.props.tipo ? "?tip=1" : "?tip=0";
    const requestInfo = {
      method: "POST",
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    // console.log(this.props.tipo);
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getEmpresas.php" +
        prospects,
      requestInfo
    )
      .then((response) => response.json())
      .then((empresasLs) => {
        if (empresasLs !== null) {
          this.setState({ empresasLs });
          this.setState({ empresasLsBack: empresasLs });
        } else {
          this.setState({ empresasLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };

  cierraEdit = () => {
    this.setState({ sw_edit: false });
  };

  cierraAdd = () => {
    this.setState({ sw_add: false });
  };

  getContactosxempresa = (id) => {
    this.setState({ contactosLs: [] });
    let data = {
      empresaid: id,
      tipo: this.props.verContactos === "yes" ? 1 : "",
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
      "https://diniz.com.mx/diniz/servicios/services/emp_getContactosxempresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((contactosLs) => {
        if (contactosLs !== null) {
          this.setState({ contactosLs });
        } else {
          this.setState({ contactosLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };
  getConveniosxempresa = (id) => {
    var tipo = 1;
    if (this.props.verDeals === "yes") var r = true;
    if (id === "Fecha") tipo = 3;
    if (id === "Empresa") tipo = 2;
    if (tipo > 1) {
      // = 1;
    }
    this.setState({ conveniosLs: [] });
    let data = {
      empresaid: id,
      tipo: this.props.verDeals === "yes" ? tipo : "",
    };
    //console.log(data);
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getConveniosxempresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((conveniosLs) => {
        if (conveniosLs !== null) {
          let arrayReturn = [];
          this.setState({ backData: conveniosLs });

          conveniosLs.forEach(function(a) {
            // console.log(a.estatus);
            if (r) {
              console.log("yes");
              if (a.estatus === "1") arrayReturn.push(a);
            } else arrayReturn.push(a);
          });

          if (tipo > 1) {
            let backData = this.state.backData;
            this.setState({ backData: backData });
            let inputVal = document.getElementById("SelecEstatusDeals").value;
            console.log(inputVal);
            let arrayReturn = [];
            backData.forEach(function(a) {
              console.log(a);
              if (a.estatus === inputVal || inputVal === "3")
                arrayReturn.push(a);
            });
            this.setState({ conveniosLs: arrayReturn });
          } else this.setState({ conveniosLs: arrayReturn });
        } else {
          this.setState({ conveniosLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };
  getEventosxempresa = (id) => {
    let tipo = 1;
    if (id === "d1") tipo = 3;
    if (id === "d2") tipo = 4;
    if (tipo > 1) {
      // document.getElementById("SelecEstatusDeals").value = 1;
    }
    this.setState({ eventosLs: [] });
    let data = {
      origenid: id,
      tipo: this.props.verEventos === "yes" ? tipo : "",
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
      "https://diniz.com.mx/diniz/servicios/services/emp_getEventosxempresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((eventosLs) => {
        if (eventosLs !== null) {
          this.setState({ eventosLs });
        } else {
          this.setState({ eventosLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };

  getRoles = () => {
    const requestInfo = {
      method: "POST",
      // body:JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getRoles.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((rolesLs) => {
        if (rolesLs.length > 0) {
          this.setState({ rolesLs });
        } else {
          this.setState({ rolesLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };

  getEventoTipos = () => {
    const requestInfo = {
      method: "POST",
      // body:JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getEventoTipos.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((eventotiposLs) => {
        if (eventotiposLs.length > 0) {
          this.setState({ eventotiposLs });
        } else {
          this.setState({ eventotiposLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };

  agregaEmpresa = () => {
    let data = {
      empresa: document.getElementById("txtEmpresa").value,
      registro: document.getElementById("noempl").value,
      rfc: document.getElementById("txtRFC").value,
      razon_social: document.getElementById("txtRazonSocial").value,
      calle: document.getElementById("txtCalle").value,
      numero: document.getElementById("txtNumero").value,
      cp: document.getElementById("txtCP").value,
      colonia: document.getElementById("txtColonia").value,
      delegacion: document.getElementById("txtDelegacion").value,
      estado: document.getElementById("txtEstado").value,
      telefono: document.getElementById("txtTelefono").value,
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
      "https://diniz.com.mx/diniz/servicios/services/emp_agregaEmpresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getEmpresas();
      })
      .catch((e) => console.log(e));
  };

  editaEmpresa = (e) => {
    let activo = "";
    if (e.target.id === "update1" || e.target.id === "desh0") activo = 1;
    else if (e.target.id === "update0" || e.target.id === "desh1") activo = 0;
    console.log(activo);
    let data = {
      id: document.getElementById("txtEd_Id").value,
      empresa: document.getElementById("txtEd_Empresa").value,
      rfc: document.getElementById("txtEd_RFC").value,
      razon_social: document.getElementById("txtEd_RazonSocial").value,
      calle: document.getElementById("txtEd_Calle").value,
      numero: document.getElementById("txtEd_Numero").value,
      cp: document.getElementById("txtEd_CP").value,
      colonia: document.getElementById("txtEd_Colonia").value,
      delegacion: document.getElementById("txtEd_Delegacion").value,
      estado: document.getElementById("txtEd_Estado").value,
      telefono: document.getElementById("txtEd_Telefono").value,
      estatus: document.getElementById("txtEd_Estatus").value,
      activo: activo,
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
      "https://Diniz.com.mx/diniz/servicios/services/emp_editaEmpresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        document.getElementById("SelecEstatus").value = "a";
        this.getEmpresas();
      })
      .catch((e) => console.log(e));
  };

  eliminaEmpresa = () => {
    let data = {
      id: document.getElementById("txtEd_Id").value,
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
      "https://Diniz.com.mx/diniz/servicios/services/emp_eliminaEmpresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        this.getEmpresas();
      })
      .catch((e) => console.log(e));
  };

  changePanel = (pan) => {
    this.setState({ t1active: false });
    this.setState({ t2active: false });
    this.setState({ t3active: false });
    this.setState({ t4active: false });
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
      case "4":
        this.setState({ t4active: true });
        break;
      default:
        this.setState({ t1active: true });
        break;
    }
    this.setState({ activepanel: pan });
  };

  getDatosEmpresa = (empresa) => {
    this.setState({ curempresa: empresa.empresa });
    this.setState({ curempresaid: empresa.id });
    this.getContactosxempresa(empresa.id);
    this.getConveniosxempresa(empresa.id);
    this.getEventosxempresa(empresa.id);
  };

  regresa = () => {
    this.setState({ curempresa: "" });
    this.setState({ curempresaid: "" });
  };

  showEstatus = () => {};

  componentDidMount() {
    this.setState({ curempresa: "" });
    this.getEmpresas();
    this.getRoles();
    this.getEventoTipos();
    if (this.props.verDeals === "yes") this.getDatosEmpresa({});
    if (this.props.verContactos === "yes") this.getDatosEmpresa({});
    if (this.props.verEventos === "yes") this.getDatosEmpresa({});
  }
  cambiar = () => {
    this.props.showModulo({
      title: "Calendario",
      icon: "fas fa-dollar-sign",
    });
  };
  getInputSearchDeals = (e) => {
    let backData = this.state.backData;
    this.setState({ backData: backData });
    let inputVal = e.target.value;
    console.log(inputVal);
    let arrayReturn = [];
    backData.forEach(function(a) {
      console.log(a);
      if (a.estatus === inputVal || inputVal === "3") arrayReturn.push(a);
    });
    this.setState({ conveniosLs: arrayReturn });
  };
  render() {
    if (this.props.verDeals === "yes") {
      return (
        <div>
          <div className="w-100 text-center crmHeader">
            <span
              className={this.props.navIdentificador.icon}
              style={{ fontSize: "45px" }}
            />
            <p style={{ fontWeight: "bold" }}>
              {this.props.navIdentificador.title}
            </p>
          </div>
          <Deals
            noempl={this.props.noempl}
            nombre={this.props.nombre}
            getConveniosxempresa={this.getConveniosxempresa}
            empresaid={this.state.curempresaid}
            conveniosLs={this.state.conveniosLs}
            verDeals={this.props.verDeals}
            getInputSearchDeals={this.getInputSearchDeals}
            tipo={1}
          />
        </div>
      );
    } else if (this.props.verContactos === "yes") {
      return (
        <div>
          <div className="w-100 text-center crmHeader">
            <span
              className={this.props.navIdentificador.icon}
              style={{ fontSize: "45px" }}
            />
            <p style={{ fontWeight: "bold" }}>
              {this.props.navIdentificador.title}
            </p>
          </div>
          <Contactos
            noempl={this.props.noempl}
            nombre={this.props.nombre}
            rolesLs={this.state.rolesLs}
            getContactosxempresa={this.getContactosxempresa}
            empresaid={this.state.curempresaid}
            contactosLs={this.state.contactosLs}
            verContactos={this.props.verContactos}
            tipo={1}
          />
        </div>
      );
    } else if (this.props.verEventos === "yes") {
      return (
        <div>
          <div className="w-100 d-flex justify-content-center ">
            <div onClick={this.cambiar} className="btn btn-danger">
              Cambiar a calendario
            </div>
          </div>
          <Eventos
            getEventosxempresa={this.getEventosxempresa}
            noempl={this.props.noempl}
            nombre={this.props.nombre}
            rolesLs={this.state.rolesLs}
            getContactosxempresa={this.getContactosxempresa}
            empresaid={this.state.curempresaid}
            contactosLs={this.state.eventosLs}
            verEventos={this.props.verEventos}
            tipo={1}
          />
        </div>
      );
    } else
      return (
        <div>
          <div className="w-100 text-center crmHeader">
            <span
              className={this.props.navIdentificador.icon}
              style={{ fontSize: "45px" }}
            />
            <p style={{ fontWeight: "bold" }}>
              {this.props.navIdentificador.title}
            </p>
          </div>
          {this.state.curempresa === "" ? (
            <>
              <div className="crmHeader">
                <InputGroup>
                  <>
                    <div
                      style={{
                        background: "#E9ECEF",
                        padding: "5px 10px",
                        fontSize: 25,
                      }}
                    >
                      <span className="fas fa-search" />
                    </div>
                    <Input
                      style={{
                        width: "20%",
                      }}
                      onChange={this.getInputSearch}
                      type="select"
                      id="SelecEstatus"
                    >
                      {this.props.tipo ? (
                        <>
                          <option value={"a"}>All</option>
                          <option value={1}>Habilitados</option>
                          <option value={0}>Deshabilitados</option>
                        </>
                      ) : (
                        <>
                          <option value={"a"}>All</option>
                          <option key={1} value={"Nuevo"}>
                            Nuevo{" "}
                          </option>
                          <option key={2} value={"Contactado"}>
                            Contactado
                          </option>
                          <option key={3} value={"Interesado"}>
                            Interesado
                          </option>
                          <option key={4} value={"Califica"}>
                            Califica
                          </option>
                          <option key={5} value={"En negociación"}>
                            En negociación
                          </option>
                        </>
                      )}
                    </Input>
                    <Input
                      style={{ width: "50%" }}
                      onChange={this.getInputSearch}
                      type="text"
                      id="InSearch"
                    ></Input>
                  </>
                </InputGroup>
              </div>
              <br />
              <div
                className="tableFixHead"
                style={{
                  fontSize: 16,
                  flex: 1,
                  overflowY: "scroll",
                  maxHeight: "80vh",
                  paddingLeft: 20,
                  paddingRight: 10,
                }}
              >
                <Table
                  borderless
                  className="table-bordered table-hover text-left small"
                  responsive
                >
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ width: 24 }}>
                        {this.props.prospe ? (
                          <ModalAgregaEmpresa
                            agregaEmpresa={this.agregaEmpresa.bind(this)}
                            noempl={this.props.noempl}
                          />
                        ) : (
                          ""
                        )}
                      </th>
                      <th>RFC</th>
                      <th>Empresa</th>
                      <th>Razón Social</th>
                      <th>Calle</th>
                      <th>Número</th>
                      <th>Colonia</th>
                      <th>Delegación</th>
                      <th>Estado</th>
                      <th>CP</th>
                      <th>Teléfono</th>
                      <th
                        style={{
                          display: this.props.tipo ? "none" : "",
                        }}
                      >
                        <ModalInfoColors
                          empresa={""}
                          editaEmpresa={this.editaEmpresa.bind(this)}
                          eliminaEmpresa={this.eliminaEmpresa.bind(this)}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-light">
                    {this.state.empresasLs.length > 0
                      ? this.state.empresasLs.map((empresa, index) =>
                          empresa.registro === window.noempl ||
                          window.superUs ? (
                            <tr key={empresa.id}>
                              <td style={{ width: 24 }}>
                                <ModalEditaEmpresa
                                  empresa={empresa}
                                  editaEmpresa={this.editaEmpresa.bind(this)}
                                  eliminaEmpresa={this.eliminaEmpresa.bind(
                                    this
                                  )}
                                />
                              </td>

                              <td>{empresa.rfc}</td>
                              <td
                                title="Ver Datos"
                                style={{
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                                onClick={this.getDatosEmpresa.bind(
                                  this,
                                  empresa
                                )}
                              >
                                {empresa.empresa}
                              </td>
                              <td>{empresa.razon_social}</td>
                              <td>{empresa.calle}</td>
                              <td>{empresa.numero}</td>
                              <td>{empresa.colonia}</td>
                              <td>{empresa.delegacion}</td>
                              <td>{empresa.estado}</td>
                              <td>{empresa.cp}</td>
                              <td>{empresa.telefono}</td>
                              <td
                                style={{
                                  width: 5,
                                  display: this.props.tipo ? "none" : "",
                                  backgroundColor:
                                    empresa.estatus === "Nuevo"
                                      ? "#d6d4e0"
                                      : empresa.estatus === "Contactado"
                                      ? "#ffeead"
                                      : empresa.estatus === "Interesado"
                                      ? "#eeac99"
                                      : empresa.estatus === "Califica"
                                      ? "#e06377"
                                      : empresa.estatus === "En negociación"
                                      ? "#c83349"
                                      : empresa.estatus === "Cliente"
                                      ? "#5b9aa0"
                                      : "",
                                }}
                              ></td>
                            </tr>
                          ) : (
                            ""
                          )
                        )
                      : []}
                  </tbody>
                </Table>
              </div>
              <br />
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", color: "black" }}>
                <h2
                  style={{ cursor: "pointer" }}
                  title="Clic para regresar al listado de empresas"
                  onClick={this.regresa.bind(this)}
                >
                  {this.state.curempresa}
                </h2>
              </div>

              <div style={{ paddingLeft: 20 }}>
                <Nav tabs>
                  <NavItem
                    className="crmNavLink"
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
                      Contactos
                    </Label>
                  </NavItem>
                  <NavItem
                    className="crmNavLink"
                    style={{
                      backgroundColor:
                        this.state.t2active === true ? "rgb(22, 187, 179)" : "",
                      display: this.props.tipo ? "" : "none",
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
                      Deals
                    </Label>
                  </NavItem>
                  <NavItem
                    className="crmNavLink"
                    style={{
                      backgroundColor:
                        this.state.t4active === true ? "rgb(22, 187, 179)" : "",
                    }}
                    onClick={this.changePanel.bind(this, "4")}
                  >
                    <Label
                      style={{
                        cursor: "pointer",
                        color: this.state.t4active === true ? "white" : "",
                      }}
                      onClick={this.changePanel.bind(this, "4")}
                    >
                      Eventos
                    </Label>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activepanel}>
                  <TabPane tabId="1" style={{ border: " solid 1px white" }}>
                    <Row style={{ height: 350 }}>
                      <Col sm="12">
                        <Contactos
                          noempl={this.props.noempl}
                          nombre={this.props.nombre}
                          rolesLs={this.state.rolesLs}
                          getContactosxempresa={this.getContactosxempresa}
                          empresaid={this.state.curempresaid}
                          contactosLs={this.state.contactosLs}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane
                    tabId="2"
                    style={{
                      border: " solid 1px white",
                      display: this.props.tipo ? "" : "none",
                    }}
                  >
                    <Row style={{ height: 350 }}>
                      <Col sm="12">
                        <Deals
                          noempl={this.props.noempl}
                          nombre={this.props.nombre}
                          getConveniosxempresa={this.getConveniosxempresa}
                          empresaid={this.state.curempresaid}
                          conveniosLs={this.state.conveniosLs}
                          verDeals={this.props.verDeals}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4" style={{ border: " solid 1px white" }}>
                    <Row style={{ height: 350 }}>
                      <Col sm="12">
                        <Eventos
                          noempl={this.props.noempl}
                          nombre={this.props.nombre}
                          rolesLs={this.state.rolesLs}
                          eventosLs={this.state.eventotiposLs}
                          getEventosxempresa={this.getEventosxempresa}
                          empresaid={this.state.curempresaid}
                          contactosLs={this.state.eventosLs}
                          participantesLs={this.state.participantesLs}
                          agregarParticipante={this.agregarParticipante}
                          obtenerParticipantes={this.obtenerParticipantes}
                        />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
            </>
          )}
        </div>
      );
  }
}
export default Empresas;

/*<Deals
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              getConveniosxempresa={""}
              empresaid={""}
              conveniosLs={this.state.conveniosLs}
              tipo={1}
          />*/
