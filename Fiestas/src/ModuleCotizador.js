import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputGroup,
  InputNumber,
  Message,
  Modal,
  Notification,
  Placeholder,
  SelectPicker,
  useToaster,
  Whisper,
  Popover,
} from "rsuite";
import isBefore from "date-fns/isBefore";
import ModuleTableCRUD from "./ModuleTableCRUD";
import ToolsIcon from "@rsuite/icons/Tools";
import PlusIcon from "@rsuite/icons/Plus";
import { CarouselItem, Table as TableReact } from "reactstrap";
import { fetchServer } from "./App";
import html2canvas from "html2canvas";
// next = flujo[flujo.index("type")+1]
const tipFiesta = ["Games", "Kids", "Bownling"].map((item) => ({
  label: item,
  value: item,
}));
const saboresPastel = [
  "PASTEL DE 2KG",
  "PASTEL DE CHOCOLATE CON RELLENO DE FRESA 2KG CON VELITAS",
  "PASTEL DE CHOCOLATE CON RELLENO DE DURAZNO 2KG CON VELITAS",
  "PASTEL DE VAINILLA CON RELLENO DE FRESA 2KG CON VELITAS",
  "PASTEL DE VAINILLA CON RELLENO DE DURAZNO 2KG CON VELITAS",
].map((item) => ({
  label: item,
  value: item,
}));
const horasFiestas = ["13:00:00", "18:00:00"].map((item) => ({
  label: item,
  value: item,
}));

function ModuleCotizador(props) {
  const [viewsFiestas, setViewsFiesta] = useState({
    info:
      props.type !== "agendar" && props.type !== "view" && props.type
        ? true
        : !props.type && true,
    comida: false,
    bebida: false,
    extras: false,
    cotizacion: props.type === "view",
    agendar: props.type === "agendar",
  });
  const [infoFiesta, setinfoFiesta] = useState({
    folio: false,
    invitado: {
      id: null,
      nombre: null,
      domicilio: "",
      telefono: null,
      correo: "",
      calle: "",
      numero: "",
      colonia: "",
      delegacion: "",
      codigoPostal: "",
      estado: "",
      clave: "",
    },
    inFiesta: {
      festejados: "",
      festejado1: "",
      festejado2: "",
      tipoFiesta: false, //*v
      invitados: 15, //*v
      precioPaquete: 6000,
      pastel: "PASTEL DE 2KG",
    },
    date: false,
    time: false,
    extras: [],
    paquetes: {
      comida: [
        {
          descripcion: "Hamburgesa",
          codigo: "SP0012",
          cantidad: 0,
          precio: 15,
        },
        { descripcion: "Nugget", codigo: "SP0013", cantidad: 0, precio: 15 },
        { descripcion: "Hot Dog", codigo: "SP0014", cantidad: 0, precio: 15 },
        { descripcion: "Pizza", codigo: "SP0015", cantidad: 0, precio: 15 },
        { descripcion: "ICE", codigo: "SP0016", cantidad: 0, precio: 15 },
      ],
      bebida: [
        { descripcion: "Refresco", codigo: "SP0020", cantidad: 0, precio: 15 },
        { descripcion: "Agua", codigo: "SP0021", cantidad: 0, precio: 15 },
        { descripcion: "Jugo", codigo: "SP0022", cantidad: 0, precio: 15 },
      ],
    },

    //Paquetes para fiesta.
    fiesta: [
      {
        descripcion: "Invitacion Electronica",
        codigo: "",
        cantidad: 1,
        precio: 0,
      },
      { descripcion: "Regalo Sorpresa", codigo: "", cantidad: 1, precio: 0 },
      { descripcion: "Horas de evento", codigo: "", cantidad: 3, precio: 0 },
      {
        descripcion: "Tarjetas Recordcard con 369 BONUS GAME",
        codigo: "",
        cantidad: 15,
        precio: 0,
      },
    ],
    invitadosExtras: [],
  });
  const [imgCotizacion, setImgCotizacion] = useState(null)
  const bebidasHeaders = infoFiesta.paquetes.bebida.map(
    ({ descripcion }) => descripcion
  );
  console.log(imgCotizacion)
  const comidaHeaders = infoFiesta.paquetes.comida.map(
    ({ descripcion }) => descripcion
  );
  const flujo = Object.entries(viewsFiestas).map((item) => item[0]);
  const [refresh, setRefresh] = useState(false);
  // console.log(infoFiesta);

  const captureElement = (ref, setState) => {
    const table = ref.current;
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      // console.log(imgData);
      setState(imgData);
    });
  };
  if (props.cotizacion) {
    let options = [
      ["optionService", "SelectCotizador"],
      ["cotizacion", props.cotizacion],
    ];
    fetchServer(options, "cotizacion").then((cotizacion) => {
      console.log(cotizacion);
      console.log(infoFiesta);
    });
    return <></>;
  }
  //Guarda la info del cotizador en el estado para despues guardarlo en DB
  function saveTipoFiesta(type, value, padre = false) {
    if (!value) value = false;
    setRefresh(!refresh);
    if (type === "extras") {
      if (value.producto && value.cantidad > 0 && !value.length) {
        let posicion = infoFiesta.extras.findIndex((e) => e.id === value.id);
        if (posicion !== -1) {
          let back = infoFiesta["extras"];
          value.cantidad += back[posicion].cantidad;
          value.preciototal += back[posicion].preciototal;
          back[posicion] = value;
          setinfoFiesta({ ...infoFiesta, [type]: back });
        } else
          setinfoFiesta({
            ...infoFiesta,
            [type]: infoFiesta[type].concat(value),
          });
      } else if (value.length >= 0) {
        setinfoFiesta({
          ...infoFiesta,
          [type]: value,
        });
      }
    } else if (padre)
      setinfoFiesta({
        ...infoFiesta,
        [padre]: { ...infoFiesta[padre], [type]: value },
      });
    else setinfoFiesta({ ...infoFiesta, [type]: value });
  }

  //Condiciona el btn de next para controlar y validad el flujo
  function evaluacionBtnNext() {
    let type = Object.entries(viewsFiestas).find(
      ([clave, valor]) => valor === true
    );
    type = type ? type[0] : "";
    let sumaComida = 0;
    if (type === "comida" || type === "bebida") {
      sumaComida = infoFiesta.paquetes[type].reduce(
        (acc, cur) => acc + parseInt(cur.cantidad),
        0
      );
    }
    if (type === "info")
      return (
        ["nombre", "telefono"].every(
          (property) => infoFiesta.invitado[property] !== false
        ) &&
        ["tipoFiesta", "invitados"].every(
          (property) => infoFiesta.inFiesta[property] !== false
        )
      );
    return (
      (sumaComida === parseInt(infoFiesta.inFiesta.invitados) &&
        (type === "comida" || type === "bebida")) ||
      type === "extras" ||
      type === "cotizacion" ||
      (type === "agendar" &&
        ["date", "time"].every((property) => infoFiesta[property] !== false))
    );
  }

  function managerViews(type, dir) {
    let index = flujo.indexOf(type);
    index += dir === "n" ? 1 : -1;
    let next = flujo[index];
    let update = evaluacionBtnNext();
    if (update || dir === "r") {
      setViewsFiesta({ ...viewsFiestas, [type]: false, [next]: true });
    }
    setRefresh(!refresh);
  }

  //Captura de primeros datos para la fiesta, nombre invitado, telefono invitado, tipo de fiesta =, num invitadsos, nombre de festejados, correo
  function InfoFiesta() {
    const [cliente, setCliente] = useState(infoFiesta.invitado.nombre);
    const [ws, setWs] = useState(infoFiesta.invitado.telefono);
    return (
      <>
        <h2>
          Datos Generales
          <Form.HelpText>
            Selecciona, día, horario e invitados totales.
          </Form.HelpText>
        </h2>
        <div className="d-flex">
          <Form.Group controlId="invitados" style={{ width: "50%", margin: 0 }}>
            <Form.ControlLabel style={{ width: "100%", textAlign: "center" }}>
              WhatsApp
            </Form.ControlLabel>
            <Input
              autoComplete="off"
              placeholder="Numero de WhatsApp"
              onChange={setWs}
              onBlur={() => {
                var invitadoVacio = {
                  id: false,
                  nombre: false,
                  domicilio: "",
                  telefono: false,
                  correo: "",
                  calle: "",
                  numero: "",
                  colonia: "",
                  delegacion: "",
                  codigoPostal: "",
                  estado: "",
                  clave: "",
                };
                fetchServer(
                  [
                    ["optionService", "SelectInvitadoWTS"],
                    ["wts", ws],
                  ],
                  "invitado"
                ).then((invitado) => {
                  if (invitado) {
                    setinfoFiesta({
                      ...infoFiesta,
                      invitado: {
                        ...infoFiesta.invitado,
                        ...invitado,
                      },
                    });
                  } else {
                    setinfoFiesta({
                      ...infoFiesta,
                      invitado: {
                        ...invitadoVacio,
                        telefono: ws,
                      },
                    });
                  }
                });
              }}
              defaultValue={
                infoFiesta.invitado.telefono
                  ? infoFiesta.invitado.telefono
                  : null
              }
            />
          </Form.Group>
          <Form.Group
            controlId="invitados"
            style={{ width: "50%", marginRight: 10 }}
          >
            <Form.ControlLabel style={{ width: "100%", textAlign: "center" }}>
              Invitado
            </Form.ControlLabel>
            <Input
              disabled={infoFiesta.invitado.id}
              id="hola"
              autoComplete="off"
              placeholder="Nombre Completo"
              onChange={setCliente.bind(this)}
              onBlur={saveTipoFiesta.bind(this, "nombre", cliente, "invitado")}
              defaultValue={
                infoFiesta.invitado.nombre ? infoFiesta.invitado.nombre : null
              }
            />
          </Form.Group>
        </div>
        <div className="d-flex">
          <Form.Group
            controlId="invitados"
            style={{ width: "50%", marginRight: 10 }}
          >
            <Form.ControlLabel style={{ width: "100%", textAlign: "center" }}>
              Tipo de fiesta
            </Form.ControlLabel>
            <SelectPicker
              onChange={(e) => {
                saveTipoFiesta("tipoFiesta", e, "inFiesta");
              }}
              searchable={false}
              data={tipFiesta}
              placeholder="Tipo de Fiesta"
              defaultValue={
                infoFiesta.inFiesta.tipoFiesta
                  ? infoFiesta.inFiesta.tipoFiesta
                  : null
              }
              style={{ width: "100%" }}
            />
          </Form.Group>
          <Form.Group controlId="invitados" style={{ width: "50%", margin: 0 }}>
            <Form.ControlLabel style={{ width: "100%", textAlign: "center" }}>
              Invitados
            </Form.ControlLabel>
            <InputNumber
              value={
                infoFiesta.inFiesta.invitados && infoFiesta.inFiesta.invitados
              }
              max={25}
              min={15}
              onSelect={(e) => {
                e.target.readOnly = true;
              }}
              onChange={(e) => {
                saveTipoFiesta("invitados", e, "inFiesta");
              }}
            />
            <Form.HelpText>Invitados max. 25</Form.HelpText>
          </Form.Group>
        </div>
      </>
    );
  }

  //Seleccion de paquetes comida y bebida
  function PaquetesFiesta(props) {
    const [backPaquetes, setBackPaquetes] = useState([
      ...infoFiesta.paquetes[props.type],
    ]);
    var seleccionada = 0;
    backPaquetes.forEach((item) => (seleccionada += item.cantidad));
    const [maxComida, setmaxComida] = useState(
      parseInt(infoFiesta.inFiesta.invitados - seleccionada)
    );
    function asignarCantidad(index, cantidad) {
      let respaldo = [...backPaquetes];
      respaldo[index].cantidad = parseInt(cantidad);
      setBackPaquetes(respaldo);
      let seleccionada = 0;
      backPaquetes.forEach((item) => (seleccionada += item.cantidad));
      setmaxComida(infoFiesta.inFiesta.invitados - seleccionada);
      setRefresh(!refresh);
    }
    const FormNumber = (props) => {
      return (
        <Form.Group controlId={props.name}>
          <Form.ControlLabel style={{ width: "100%", textAlign: "center" }}>
            {props.name[0].toUpperCase() + props.name.slice(1)}
          </Form.ControlLabel>
          <div className="d-flex">
            <InputNumber
              value={backPaquetes[props.index].cantidad}
              max={maxComida + backPaquetes[props.index].cantidad}
              min={0}
              onSelect={(e) => {
                e.target.readOnly = true;
              }}
              onChange={asignarCantidad.bind(this, props.index)}
            />
            <Button
              style={{ borderTopLeftRadius: "none", borderRadius: "none" }}
              onClick={asignarCantidad.bind(
                this,
                props.index,
                maxComida + backPaquetes[props.index].cantidad
              )}
              color="blue"
              appearance="primary"
              disabled={maxComida <= 0}
            >
              Max.
            </Button>
          </div>
        </Form.Group>
      );
    };
    return (
      <>
        <h2>
          Selecciona la {props.type} de tus invitados
          <Form.HelpText>Aun restan {maxComida}</Form.HelpText>
        </h2>
        {props.type === "comida" ? (
          <>
            <div style={{ marginBottom: 25 }}>
              <p style={{ width: "100%", textAlign: "center" }}>Pastel</p>
              <SelectPicker
                style={{ width: "100%" }}
                onChange={(e) => {
                  saveTipoFiesta("pastel", e, "inFiesta");
                }}
                defaultValue={
                  infoFiesta.inFiesta.pastel ? infoFiesta.inFiesta.pastel : null
                }
                searchable={false}
                data={saboresPastel}
                placeholder="Hora Fiesta"
              />
            </div>
            {comidaHeaders.map((item, index) => (
              <FormNumber name={item} index={index} key={index} />
            ))}
          </>
        ) : (
          props.type === "bebida" &&
          bebidasHeaders.map((item, index) => (
            <FormNumber name={item} index={index} key={index} />
          ))
        )}
      </>
    );
  }

  function CotizacionFiesta() {
    const tableRef = useRef(null);
    function moneda(number) {
      return parseFloat(number).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      });
    }
    const monedaStyle = {
      textAlign: "right",
    };
    const cantidadFormat = {
      textAlign: "center",
    };
    const totalesStyle = {
      borderBottom: "1px solid white",
      textAlign: "right",
    };
    let paquetes = {
      ...infoFiesta.paquetes,
      comida: infoFiesta.paquetes.comida.filter((item) => item.cantidad > 0),
      bebida: infoFiesta.paquetes.bebida.filter((item) => item.cantidad > 0),
    };
    var arrPaqFiesta = [];
    var arrPaqExtras = [];
    let contenidoFiesta = { comida: 0, bebida: 0 };
    ["comida", "bebida"].forEach((type) =>
      paquetes[type].forEach((item) => {
        if (contenidoFiesta[type] < 15) {
          contenidoFiesta[type] += item.cantidad;
          if (contenidoFiesta[type] > 15) {
            let restante = contenidoFiesta[type] - 15;
            arrPaqExtras.push({ ...item, cantidad: restante });
            restante = item.cantidad - restante;
            arrPaqFiesta.push({ ...item, cantidad: restante });
          } else arrPaqFiesta.push(item);
        } else {
          arrPaqExtras.push(item);
        }
      })
    );
    let cotizacion = {
      ...infoFiesta,
      paquetes: { ...paquetes },
      fiesta: [...infoFiesta.fiesta.concat(arrPaqFiesta)],
      invitadosExtras: arrPaqExtras,
    };
    var totalCotizacion = 0;
    var totalInvitadosExtras = 0;
    var totalProductosExtras = 0;
    function viewTotal() {
      cotizacion.extras.map((item) => {
        totalCotizacion += item.preciototal;
        totalProductosExtras += item.preciototal;
      });
      cotizacion.invitadosExtras.map((item) => {
        totalInvitadosExtras += item.precio * item.cantidad;
        totalCotizacion += item.precio * item.cantidad;
      });
      return totalCotizacion + cotizacion.precioFiesta;
    }
    var totalCotizacion = viewTotal();
    const desglose = (texto, cantidad) => (
      <tr style={{ border: "0px solid #1a1d24" }}>
        <td colSpan={2}></td>
        <td style={totalesStyle}>{texto}:</td>
        <td style={totalesStyle}>{moneda(cantidad)}</td>
      </tr>
    );
    function almacenamientoDBCotizacion() {
      if (!cotizacion.invitado.id) {
        let invitado = [
          ["optionService", "InsertInvitado"],
          ["telefono", cotizacion.invitado.telefono],
          ["nombre", cotizacion.invitado.nombre],
          ["correo", cotizacion.invitado.correo],
          ["cef", window.empleado.cef],
        ];
        fetchServer(invitado, "invitado").then((id) => {
          saveTipoFiesta("id", id, "invitado");
        });
      }
      if (infoFiesta.inFiesta.folio && infoFiesta.invitado.id) {
        // console.log(cotizacion.fiesta);
        var arrayContenido = "";
        cotizacion.fiesta.forEach((item) => {
          arrayContenido +=
            "('" +
            item.codigo +
            "'," +
            item.cantidad +
            "," +
            item.precio +
            ",3," +
            cotizacion.inFiesta.folio +
            "),";
        });
        cotizacion.extras.forEach((item) => {
          arrayContenido +=
            "('" +
            item.codigo +
            "'," +
            item.cantidad +
            "," +
            item.preciounidad +
            ",1," +
            cotizacion.inFiesta.folio +
            "),";
        });
        cotizacion.invitadosExtras.forEach((item) => {
          arrayContenido +=
            "('" +
            item.codigo +
            "'," +
            item.cantidad +
            "," +
            item.precio +
            ",2," +
            cotizacion.inFiesta.folio +
            "),";
        });
        arrayContenido = arrayContenido.substring(0, arrayContenido.length - 1);
        // console.log(arrayContenido);
        let options = [
          ["optionService", "InsertContenido"],
          ["contenido", arrayContenido],
          ["fiesta", cotizacion.inFiesta.folio],
        ];
        fetchServer(options, "folio").then((folio) => {
          // saveTipoFiesta("folio", 1, "inFiesta");
        });
      } else if (infoFiesta.invitado.id && !infoFiesta.inFiesta.folio) {
        let options = [
          ["optionService", "InsertFiesta"],
          ["invitados", cotizacion.inFiesta.invitados],
          ["costo", cotizacion.inFiesta.precioPaquete],
          ["cef", window.empleado.cef],
          ["invitado", cotizacion.invitado.id],
          ["tipo", cotizacion.inFiesta.tipoFiesta],
        ];
        fetchServer(options, "folio").then((folio) => {
          saveTipoFiesta("folio", folio, "inFiesta");
        });
      }
    }
    const captureTable = () => {
      tableRef.current.style.color = "black";
      captureElement(tableRef,setImgCotizacion);
      tableRef.current.style.color = "white";
    };
    almacenamientoDBCotizacion();
    return (
      <>
        <h2>
          Cotizacion
          <Form.HelpText>
            Cotizacion final, si requieres cambios regresa y modifica lo que
            necesites antes de cerrar la cotizacion.
          </Form.HelpText>
        </h2>
        <p style={{ margin: 0 }}>
          Cotizacion para: {cotizacion.invitado.nombre}
        </p>
        <TableReact style={{ color: "white" }} innerRef={tableRef}>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Precio por Unidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={cantidadFormat}>1</td>
              <td>
                PAQUETE DE FIESTA PARA 15 INVITADOS. <br /> INCLUYE:
                <ul>
                  <li>1 {infoFiesta.inFiesta.pastel}</li>
                  {cotizacion.fiesta.map((item, key) => (
                    <li kye={key}>
                      {item.cantidad} {item.descripcion.toUpperCase()}
                      {item.cantidad > 1 &&
                        item.descripcion != "Horas de evento" &&
                        "S"}
                    </li>
                  ))}
                </ul>
              </td>
              <td style={monedaStyle}>
                {moneda(cotizacion.inFiesta.precioPaquete)}
              </td>
              <td style={monedaStyle}>
                {moneda(cotizacion.inFiesta.precioPaquete)}
              </td>
            </tr>
            {cotizacion.invitadosExtras.length > 0 && (
              <tr
                style={{
                  textAlign: "center",
                  background: "#F0F8FF",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <td colSpan={4}>INVITADOS EXTRAS</td>
              </tr>
            )}
            {cotizacion.invitadosExtras.map((item, index) => (
              <tr key={index}>
                <td style={cantidadFormat}>{item.cantidad}</td>
                <td>{item.descripcion.toUpperCase()}</td>
                <td style={monedaStyle}>{moneda(item.precio)}</td>
                <td style={monedaStyle}>
                  {moneda(item.cantidad * item.precio)}
                </td>
              </tr>
            ))}
            {cotizacion.extras.length > 0 && (
              <tr
                style={{
                  textAlign: "center",
                  background: "#F0F8FF",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <td colSpan={4}>PRODUCTOS EXTRAS</td>
              </tr>
            )}
            {cotizacion.extras.map((item, index) => (
              <tr key={index}>
                <td style={cantidadFormat}>{item.cantidad}</td>
                <td>{item.producto.toUpperCase()}</td>
                <td style={monedaStyle}>{moneda(item.preciounidad)}</td>
                <td style={monedaStyle}> {moneda(item.preciototal)}</td>
              </tr>
            ))}
            {desglose("Sub Total ", totalCotizacion - totalCotizacion * 0.16)}
            {desglose("IVA ", totalCotizacion * 0.16)}
            {desglose("Total ", totalCotizacion)}
          </tbody>
        </TableReact>
        <p onClick={captureTable}>
          Nuestro invitado {infoFiesta.invitado.nombre} tendria que pagar el
          total de{" "}
          <b>
            {moneda(
              infoFiesta.precioFiesta / 2 +
                totalInvitadosExtras / 2 +
                totalProductosExtras
            )}
          </b>{" "}
          para poder apartar la fiesta.
        </p>
        <TableReact style={{ color: "white" }}>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>50% Paquete Fiesta para 15 personas</td>
              <td>{moneda(infoFiesta.precioFiesta / 2)}</td>
            </tr>
            {totalInvitadosExtras > 0 && (
              <tr>
                <td>50% Consumo de invitados extras</td>
                <td>{moneda(totalInvitadosExtras / 2)}</td>
              </tr>
            )}
            {totalProductosExtras > 0 && (
              <tr>
                <td>100% Productos Extras</td>
                <td>{moneda(totalProductosExtras)}</td>
              </tr>
            )}
          </tbody>
        </TableReact>
      </>
    );
  }

  function ExtrasFiesta() {
    const modalsInputs = [
      {
        placeholder: "Producto",
        columnData: "producto",
        table: { sortable: true, width: 350 },
      },
      {
        placeholder: "Cantidad",
        columnData: "cantidad",
        table: { width: 100 },
      },
      {
        placeholder: "Precio Unidad",
        columnData: "preciounidad",
        table: { width: 100 },
      },
      {
        placeholder: "Precio Total",
        columnData: "preciototal",
        table: { width: 100 },
      },
    ];
    const productosLs = [
      { id: 1, producto: "100 Bonus Extra 15 paquetes", preciounidad: 100 },
      { id: 2, producto: "Charolazo Alitas BBQ", preciounidad: 150 },
      { id: 3, producto: "Charola Alitas Mango Habanero", preciounidad: 60 },
    ];
    const productoSelect = productosLs.map((item) => ({
      label: " $" + item.preciounidad + " - " + item.producto,
      value: item.id,
    }));
    var extraNew = {};
    function extraNewAsing(type, e) {
      let producto = productosLs.find((element) => element.id === e);
      extraNew =
        type === "cantidad"
          ? {
              ...extraNew,
              cantidad: parseInt(e),
              preciototal: parseInt(extraNew.preciounidad) * parseInt(e),
            }
          : { ...producto, cantidad: 1, preciototal: producto.preciounidad };
      if (type === "id") document.getElementById("inputCantidadNew").value = 1;
    }
    function eliminarExtra(a, b) {
      let newExtras = infoFiesta.extras.filter(
        (item) => item.id != b.id && item
      );
      saveTipoFiesta("extras", newExtras);
    }
    console.log(infoFiesta.extras);
    return (
      <>
        <h2>
          Agrega Extras
          <Form.HelpText>
            Agrega productos extras a la fiesta, con un 20% de descuento
          </Form.HelpText>
        </h2>
        <div style={{ maxWidth: 600 }}>
          <InputGroup>
            <SelectPicker
              data={productoSelect}
              style={{ width: 2000 }}
              width={300}
              onChange={extraNewAsing.bind(this, "id")}
            />
            <InputGroup>
              <InputNumber
                defaultValue={1}
                style={{}}
                id="inputCantidadNew"
                // value={infoFiesta.invitados && infoFiesta.invitados}
                min={1}
                onChange={extraNewAsing.bind(this, "cantidad")}
                onSelect={(e) => {
                  e.target.readOnly = true;
                }}
              />
              <InputGroup.Button
                color="blue"
                style={{ background: "#00a0bd" }}
                onClick={() => {
                  saveTipoFiesta("extras", extraNew);
                  extraNew = {};
                }}
              >
                Agregar
              </InputGroup.Button>
            </InputGroup>
          </InputGroup>
        </div>
        <ModuleTableCRUD
          data={infoFiesta["extras"]}
          buttons={{ delete: { view: true, function: eliminarExtra } }}
          countButtons={1}
          width={800}
          height={500}
          search={false}
          modalsInputs={modalsInputs}
        />
      </>
    );
  }
  function Agendar() {
    var horasFiestas = [];
    var disabledTime = true;
    var toaster = useToaster();
    const message = (
      <Notification
        type={"warning"}
        header={"¡Atencion!"}
        closable
        duration={8000}
      >
        ¡Atención! Existen dos cotizaciones agendadas con la misma fecha y hora.
        El invitado debería esperar a que las cotizaciones caduquen para poder
        realizar el apartado.
      </Notification>
    );
    if (infoFiesta.date) {
      var backFiesta = {};
      if (infoFiesta.date.getDay() > 0 && infoFiesta.date.getDay() < 6)
        backFiesta = {
          ...infoFiesta,
          fiesta: infoFiesta.fiesta.map((item) =>
            item.descripcion.includes("evento")
              ? { ...item, cantidad: 4 }
              : item
          ),
        };
      else backFiesta = { ...infoFiesta };

      horasFiestas = ["13:00:00", "18:00:00"].map((item) => ({
        label: item,
        value: item,
      }));
      disabledTime = false;
    }
    if (infoFiesta.time) {
      document.getElementById("tostada") &&
        document.getElementById("tostada").click();
      setTimeout(() => {
        toaster.remove();
      }, 1);
    }
    const diasLlenos = {
      ["20230128"]: true,
      ["20230129"]: true,
      ["20230201"]: true,
    };
    console.log(infoFiesta);
    return (
      <>
        <div>
          <h2>
            Agendar Cotizacion
            <Form.HelpText>
              Una vez agendada, el cliente cuenta con 24hrs para realizar el
              pago.
            </Form.HelpText>
          </h2>
          <Button
            onClick={() => {
              toaster.push(message, "topCenter");
            }}
            id="tostada"
            hidden
          />
          <div className="d-flex justify-content-center">
            <DatePicker
              style={{ width: "50%" }}
              placeholder="Fecha de la Fiesta"
              defaultValue={infoFiesta.date ? infoFiesta.date : null}
              onChange={saveTipoFiesta.bind(this, "date")}
              oneTap
              calendarDefaultDate={
                new Date(
                  new Date().getTime() +
                    24 * 60 * 60 * 1000 * (props.admin ? 1 : 6)
                )
              }
              disabledDate={(date) => {
                let a = new Date(
                  new Date().getTime() +
                    24 * 60 * 60 * 1000 * (props.admin ? 0 : 5)
                );
                if (isBefore(date, a)) return true;
                else
                  return diasLlenos[
                    date
                      .toISOString()
                      .slice(0, 10)
                      .replace("-", "")
                      .replace("-", "")
                  ];
              }}
            />
            <SelectPicker
              style={{ width: "50%" }}
              onChange={saveTipoFiesta.bind(this, "time")}
              defaultValue={infoFiesta.time ? infoFiesta.time : ""}
              searchable={false}
              data={horasFiestas}
              placeholder="Hora Fiesta"
              disabled={disabledTime}
            />
          </div>
        </div>
      </>
    );
  }

  function BotonesInferiores() {
    var disabled = evaluacionBtnNext();
    const primerValorTrue = Object.entries(viewsFiestas).find(
      ([clave, valor]) => valor === true
    );
    const Boton = (props) => (
      <Button
        onClick={props.funcion}
        style={{ marginRight: 10 }}
        color={props.color}
        appearance="primary"
        disabled={props.disabled}
      >
        {props.texto}
      </Button>
    );
    // console.log(props);
    return (
      <div style={{ marginTop: 40 }} className="d-flex justify-content-center">
        {primerValorTrue[0] !== "info" && props.type !== "agendar" && (
          <Boton
            funcion={managerViews.bind(this, primerValorTrue[0], "r")}
            texto={"Regresar"}
            disabled={false}
            color={"cyan"}
          />
        )}
        {primerValorTrue[0] !== "cotizacion" &&
        primerValorTrue[0] !== "agendar" ? (
          <Boton
            funcion={managerViews.bind(this, primerValorTrue[0], "n")}
            texto={"Siguiente"}
            color={"blue"}
            disabled={!disabled}
          />
        ) : primerValorTrue[0] === "cotizacion" ? (
          <>
            <Boton
              funcion={managerViews.bind(this, primerValorTrue[0], "n")}
              texto={"Agendar"}
              color={"green"}
              disabled={false}
            />
            <Boton
              funcion={() => {}}
              texto={"Terminar"}
              color={"orange"}
              disabled={false}
            />
          </>
        ) : (
          <>
            <Whisper
              followCursor
              speaker={
                <Popover style={{ background: "white" }}>
                  Para poder asignar una fecha deshabilitada, se tiene que
                  autorizar.
                </Popover>
              }
            >
              <Button
                disabled={disabled}
                color={"yellow"}
                style={{ marginRight: 10 }}
                appearance="primary"
              >
                Pedir Autorizacion
              </Button>
            </Whisper>
            <Boton
              funcion={() => {}}
              texto={"Pago"}
              color={"green"}
              disabled={!disabled}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <div>
        {viewsFiestas.info && <InfoFiesta />}
        {viewsFiestas.comida && <PaquetesFiesta type="comida" />}
        {viewsFiestas.bebida && <PaquetesFiesta type="bebida" />}
        {viewsFiestas.extras && <ExtrasFiesta />}
        {viewsFiestas.cotizacion && <CotizacionFiesta />}
        {viewsFiestas.agendar && <Agendar />}
        {props.type === "view" ? "" : <BotonesInferiores />}
      </div>
    </div>
  );
}
export default ModuleCotizador;
