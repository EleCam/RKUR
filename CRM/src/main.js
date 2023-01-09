import React, { Component } from "react";
import { Button } from "reactstrap";
import Dashboard from "./dasboard";
import Empresas from "./empresas";
import "./index.css";
import Calendar from "./calendar";
import Presupuesto from "./presupuesto";
var moment = require("moment");
//window.noempl = "36704";
//window.superUs = true;
class Main extends Component {
  constructor() {
    super();
    this.state = {
      curnoempl: "",
      perfilid: 0,
      clicked: false,
      loading: false,
      todaydate: moment().format("YYYY-MM-DD"),
      modulo: { title: "" },
      curempresa: "",
      nombre: "",
      noempl: "",
      puesto: "",
      DatosUsuario: [],
      sesionid: "",
      eventsFetch: [],
      dealsTotales: [],
      conveniosLs: [],
      eventosLs: [],
      modalsubir: false,
      superUs: false,
    };
  }

  goSalir = () => {
    let myurl = "https://diniz.com.mx/index.html?id=" + this.state.sesionid;
    window.location.replace(myurl);
  };

  usuario_con = (numero) => {
    let data = {
      sesionid: numero,
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
      "https://diniz.com.mx/diniz/servicios/services/pn_sesion_con2.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((DatosUsuario) => {
        if (DatosUsuario[0].usuarios.noempl !== "x") {
          this.setState({ nombre: DatosUsuario[0].usuarios.nombre });
          this.setState({ noempl: DatosUsuario[0].usuarios.noempl });
          this.setState({ puesto: DatosUsuario[0].usuarios.puesto });
          this.setState({ DatosUsuario: DatosUsuario[0].usuarios });
          this.setState({ sesionid: DatosUsuario[0].usuarios.uniqueid });
          if(DatosUsuario[0].usuarios.noempl === "36704" || DatosUsuario[0].usuarios.noempl === "20705" || DatosUsuario[0].usuarios.noempl === "37604")  window.superUs = true;
          window.noempl = DatosUsuario[0].usuarios.noempl;
        } else {
          this.setState({ DatosUsuario: [] });
          window.location.replace("https://diniz.com.mx");
        }
      })
      .catch((e) => console.log(e));
  };

  showModulo = (mod) => {
    //console.log(mod.title);
    this.setState({ modulo: "-" });
    setTimeout(() => {
      this.setState({ modulo: mod });
    }, 50); //Para lograr que al apretar el btn se pueda regresar al inicio de cada modulo
  };

  getQueryVariable = (variable) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] === variable) {
        return pair[1];
      }
    }
    return false;
  };
  getEventosxempresa = (id) => {
    this.setState({ eventosLs: [] });
    let data = {
      origenid: id,
      tipo: 2,
      registro  : window.superUs ? 0 : this.state.noempl,
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
        console.log(eventosLs);
        if (eventosLs !== null) {
          this.setState({ eventosLs });
        } else {
          this.setState({ eventosLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };
  componentDidMount = () => {
   if (this.getQueryVariable("id") !== false) {
      let quer = this.getQueryVariable("id");
      this.usuario_con(quer);
      this.getConveniosGen();
      this.getEventosxempresa(1);
    } else {
      window.location.replace("https://diniz.com.mx/");
    }
  };

  getConveniosGen = () => {
    this.setState({ conveniosLs: [] });
    let data = {
      tipo: 1,
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
      "https://diniz.com.mx/diniz/servicios/services/emp_getConveniosxempresa.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((conveniosLs) => {
        if (conveniosLs !== null) {
          this.setState({ conveniosLs });
        } else {
          this.setState({ conveniosLs: [] });
        }
      })
      .catch((e) => console.log(e));
  };
  render() {
    const menuButtons = [
      {
        title: "Dashboard",
        icon: "fas fa-chart-line",
      },
      {
        title: "Prospectos",
        icon: "fas fa-bullseye",
      },
      {
        title: "Clientes",
        icon: "fas fa-industry",
      },
      {
        title: "Deals",
        icon: "fas fa-handshake",
      },
      {
        title: "Calendario",
        icon: "fas fa-calendar",
      },
      {
        title: "Contactos",
        icon: "fas fa-users",
      },
      {
        title: "Presupuesto",
        icon: "fas fa-dollar-sign",
      },
      ,
      /*{
        title: "Lista Eventos",
        icon: "fas fa-dollar-sign",
      },*/
    ];
    return (
      <div className="main" >
        <div className="sideBar" onClick={""}>
          {menuButtons.map((a) => {
            return (
              <>
                <br />
                <br />
                <Button
                  title={a.title}
                  style={{ width: 32, height: 32, padding: 0, borderRadius: 5 }}
                  outline
                  color="info"
                  onClick={this.showModulo.bind(this, a)}
                >
                  <span className={a.icon} />
                </Button>
              </>
            );
          })}
          <br />
          <br />

          <Button
            style={{ width: 32, height: 32, padding: 0, borderRadius: 5 }}
            outline
            color="danger"
            onClick={this.goSalir}
          >
            <span className="fas fa-door-open" />
          </Button>
        </div>
        <br />
        <div className="crmTitle">
          <h1>Customer Relationship Management</h1>
        </div>

        <div style={{ paddingTop: 20, paddingLeft: 60, paddingRight: 20 }}>
          {this.state.modulo.title === "Dashboard" || this.state.modulo.title === ""  ? (
            <Dashboard dealsTotales={this.state.dealsTotales} />
          ) : this.state.modulo.title === "Prospectos" ? (
            <Empresas
              navIdentificador={this.state.modulo}
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              tipo={false}
              prospe = {true}
            />
          ) : this.state.modulo.title === "Clientes" ? (
            <Empresas
              navIdentificador={this.state.modulo}
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              tipo={true}
              prospe = {false}
            />
          ) : this.state.modulo.title === "Calendario" ? (
            <Calendar eventsFetch={this.state.eventosLs} showModulo = {this.showModulo} />
          ) : this.state.modulo.title === "Contactos" ? (
            <Empresas
              navIdentificador={this.state.modulo}
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              tipo={1}
              verContactos={"yes"}
            />
          ) : this.state.modulo.title === "-" ? ( //Reseteamos para cada vista
            ""
          ) : this.state.modulo.title === "Deals" ? ( //Reseteamos para cada vista
            <Empresas
              navIdentificador={this.state.modulo}
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              tipo={1}
              verDeals={"yes"}
            />
          ) : this.state.modulo.title === "Lista Eventos" ? ( //Reseteamos para cada vista
          <Empresas navIdentificador={{}} tipo={1} verEventos={"yes"}  showModulo = {this.showModulo}/>
          ) : this.state.modulo.title === "-" ? ( //Reseteamos para cada vista
            ""
          ) : this.state.modulo.title === "Presupuesto" ? ( //Reseteamos para cada vista
            <Presupuesto
              navIdentificador={this.state.modulo}
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              tipo={1}
            />
          ) : (
          ""
          )}
        </div>
      </div>
    );
  }
}
export default Main;

/*<Deals
              noempl={this.state.noempl}
              nombre={this.state.nombre}
              getConveniosxempresa={""}
              empresaid={""}
              conveniosLs={this.state.conveniosLs}
              tipo={1}
          />*/
