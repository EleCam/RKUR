import React, { Component } from "react";
import { Button, Input } from "reactstrap";

class Presupuesto extends Component {
  constructor() {
    super();
    this.state = {
      readyData: false,
      empresasLs: [],
    };
  }

  getData = () => {
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_getPresupuesto.php"
    )
      .then((response) => response.json())
      .then((r) => {
        if (r.length) {
          //document.getElementById("btnSubir").remove();
          this.setState({ empresasLs: r, readyData: true, });
        }
      })
      .catch((e) => console.log(e));
  };
  SetData = () => {
    let dataForm = [];
    for (let i = 0; i < 12; i++)
      dataForm.push(document.getElementById("mes" + i).value);
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(dataForm),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_agregaPresupuesto.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((r) => this.getData())
      .catch((e) => console.log(e));
    console.log(dataForm);
  };
  UpdateData = (e) => {
    let dataButtom = e.target.id.split("-");
    let monto = document.getElementById("mes" + dataButtom[1]).value;
    let data = { id: dataButtom[0], monto: monto };
    const requestInfo = {
      method: "POST",
      body: JSON.stringify(data),
      header: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };
    fetch(
      "https://diniz.com.mx/diniz/servicios/services/emp_editaPresupuesto.php",
      requestInfo
    )
      .then((response) => response.json())
      .then((r) => this.getData())
      .catch((e) => console.log(e));
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return (
      <div className="d-flex w-100 justify-content-center">
        <div style={{ width: "550px", background: "white", padding: "50px" }}>
          <div
            className="d-flex w-100"
            style={{ margin: "0 20px", fontWeight: "bold" }}
          >
            <div style={{ width: "150px", textAlign: "center" }}>MES</div>
            <p style={{ width: "250px", textAlign: "center" }}>META</p>
          </div>
          {meses.map((a, i) => {
            return (
              <div className="d-flex" style={{ marginBottom: "10px" }}>
                <p
                  style={{
                    width: "200px",
                    textAlign: "right",
                    margin: "0 10px",
                  }}
                >
                  {a}:
                </p>
                <Input
                  style={{ width: "" }}
                  id={"mes" + i}
                  type="number"
                  required
                  defaultValue={
                    this.state.readyData ? this.state.empresasLs[i].meta : ""
                  }
                  readOnly={true}
                />
                {this.state.readyData ? (
                  <div>
                   
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default Presupuesto;
