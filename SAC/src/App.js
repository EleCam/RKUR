import React, { useState, useEffect } from 'react';
import ModuleHome from './ModuleHome';

function inicioSesion(guardarData) {
  if (getQueryVariable("id") !== false) {
    let quer = getQueryVariable("id");
    usuario_con(quer, guardarData);
  } else {
    window.location.replace("https://diniz.com.mx/");
  }
}
function usuario_con(numero, guardarData) {
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
  //console.log(data);
  fetch(
    "https://Diniz.com.mx/diniz/servicios/services/pn_sesion_con2.php",
    requestInfo
  )
    .then((response) => response.json())
    .then((DatosUsuario) => {
      //console.log(DatosUsuario);
      if (DatosUsuario[0].usuarios.noempl !== "x") {
        guardarData({
          nombre: DatosUsuario[0].usuarios.nombre,
          noempl: DatosUsuario[0].usuarios.noempl,
          curnoempl: DatosUsuario[0].usuarios.noempl,
          puesto: DatosUsuario[0].usuarios.puesto,
          DatosUsuario: DatosUsuario[0].usuarios,
          sesionid: DatosUsuario[0].usuarios.uniqueid
        })
        window.empl = DatosUsuario[0].usuarios.noempl;
      } else {
        this.setState({ DatosUsuario: [] });
        window.location.replace("https://Diniz.com.mx/index.html");
      }
      //console.log(DatosUsuario);
    })
    .catch((e) => console.log(e));
};
function getQueryVariable(variable) {
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
function App() {
  const [empleado, setEmpleado] = useState({
    nombre: "UserPrueba",
    noempl: "0",
    curnoempl: "UserPrueba",
    puesto: "Puesto",
    DatosUsuario: "Datos",
    sesionid: "SesionId"
  });
  useEffect(() => {
    inicioSesion();
    document.getElementById('ContenedorPrincipal').style.height = `${window.innerHeight}px`
    document.getElementById('ContenedorPrincipal').style.width = `${window.innerWidth}px`
    function handleResize() {
      document.getElementById('ContenedorPrincipal').style.height = `${window.innerHeight}px`
      document.getElementById('ContenedorPrincipal').style.width = `${window.innerWidth}px`
    }
    window.addEventListener('resize', handleResize)
  });
  return (
    <div id='ContenedorPrincipal' className="" style={{ overflow: "auto" }}>
      <div style={{ width: "100%", height: "", padding: 8, fontSize: 35, background: "#AED6F1" }} className="d-flex justify-content-center">
        <p style={{ margin: "auto", color: "white", fontWeight: 600 }}>Sistema de Admistracion de Cupones (SAC) </p>
      </div>
      <ModuleHome />
    </div>
  );
}

export default App;