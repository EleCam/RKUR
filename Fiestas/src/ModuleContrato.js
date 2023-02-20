import "./Contratos.css";
import React, { useRef, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  usePDF,
  Image,
} from "@react-pdf/renderer";
import SignatureCanvas from "react-signature-canvas";
import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { Button, Input } from "rsuite";
// import cv from 'opencv.js/opencv';

const isDesktop = /Windows|Mac/i.test(navigator.userAgent); //Verificar si estamos en Escritorio
Font.register({
  family: "OpenSans",
  fonts: [
    {
      src: "../OpenSans-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});
// Create styles
const styles = StyleSheet.create({
  // page: {
  //   display: "block",
  //   flexDirection: "column",
  //   backgroundColor: "",
  //   fontSize: 8,
  //   textAlign: "justify",
  //   marginBottom: 50
  // },
  page : {
    fontSize: 9.5,
    textAlign: "justify",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  bold: {
    fontFamily: "OpenSans",
  },
  section: {
    // margin: "50px 30px",
    // flexGrow: 1,
    // backgroundColor:"red",
    // border: "1px solid black",
  },
  headerContato: {
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
  },
  parrafoM: {
    marginBottom: 5,
  },
  firma: {
    textAlign: "center",
  },
  margin100: {
    marginBottom: 100,
  },
  margin20: {
    marginBottom: 30,
  },
  table: { width: "100%", padding: 35 },
  row: {
    display: "flex",
    flexDirection: "row",
    borderTop: "1px solid #EEE",
    padding: "5px 10px",
  },
  header: {
    borderTop: "none",
  },
  row1: {
    width: "10%",
  },
  row2: {
    width: "40%",
  },
  row3: {
    width: "15%",
  },
  row4: {
    width: "15%",
  },
  row5: {
    width: "20%",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  borderYes: {
    borderTop: "1px solid #EEE",
  },
  parrafoC: {
    // margin: "0 10px"
  },
});
var datos = {
  fecha: "3 DE ENERO DEL 2023",
  duracion: "3 HORAS",
  folio: "TCM­22021­2023",
  fiestologo: "MIGUEL",
  fiesta: {
    invitados: "15",
    dia :"5",
    mes : "Enero",
    ano : "2023",
    folio: "TCM220212023",
    duracion: "3 HORAS",
    inicio: "13:00",
    fin: "16:00",
    fecha: "3 DE ENERO DEL 2023",
    ubicacion:
      " CALZADA ACOXPA 610, COAPA, EQUIPAMIENTO PLAZA COAPA, TLALPAN, 14390, CIUDAD DE MÉXICO, CDMX ",
    adelantoL: "CINCO MIL OCHOCIENTOS NOVENTA Y CINCO",
    adelantoN: "5,895",
    restanteL: "CINCO MIL OCHOCIENTOS NOVENTA Y CINCO",
    restanteN: "5,895",
    montoLetra: "CINCO MIL OCHOCIENTOS NOVENTA Y CINCO",
    montoNumero: "5,895",
  },
  cliente: {
    nombre: "ALEJANDRA BUSTAMANTES SANCHEZ",
    domicilio:
      "CALZADA ACOXPA AND 9, Delegación CDMX Código Postal 14390, CDMX",
    telefono: "55121254555",
    correo: "alejandrina2001@hotmail.com",
    calle: "Cda Manzano",
    numero : "5",
    colonia: "SANTA CATARINA",
    delegacion: "IZTAPALAPA",
    codigoPostal: "012250",
    estado: "CDMX",
    clave:"SCE147894CFD"
  },
};
const ModuleContrato = () => {
  const [image, setImage] = useState(null);
  const [fINE, setThumbnail] = useState(null);
  const [rINE, setThumbnail2] = useState(null);
  const [generar, setGenerar] = useState(false);
  const [firmar, setFirmar] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const [firmaCliente, setFirmaCliente] = useState(false);
  const [firmaFiestologo, setFirmaFiestologo] = useState(false);
  // const handleFileInputChange = ({ target }) => {
  // const file = target.files[0];
  // const reader = new FileReader();
  // reader.onload = () => {
  //   setImage(file);
  //   if (target.id === "fINE") {
  //     setThumbnail(reader.result);
  //     const image = cv.imread(reader.result);
  //     const gray = new cv.Mat();
  //     const edges = new cv.Mat();
  //     cv.cvtColor(image, gray, cv.COLOR_RGBA2GRAY, 0);
  //     cv.Canny(gray, edges, 100, 200, 3, false);
  //     const contours = new cv.MatVector();
  //     const hierarchy = new cv.Mat();
  //     cv.findContours(
  //       edges,
  //       contours,
  //       hierarchy,
  //       cv.RETR_LIST,
  //       cv.CHAIN_APPROX_SIMPLE
  //     );
  //     const contoursList = [];
  //     for (let i = 0; i < contours.size(); i++) {
  //       contoursList.push(contours.get(i));
  //     }
  //     const maxContour = contoursList.reduce(
  //       (acc, contour) => {
  //         const area = cv.contourArea(contour);
  //         if (area > acc.area) {
  //           return { area, contour };
  //         }
  //         return acc;
  //       },
  //       { area: 0, contour: null }
  //     ).contour;
  //     const rect = cv.boundingRect(maxContour);
  //     const cropped = image.roi(rect);
  //     const croppedSrc = cv.matToDataURL(cropped);
  //     setThumbnail(croppedSrc);
  //     gray.delete();
  //     edges.delete();
  //     contours.delete();
  //     hierarchy.delete();
  //     image.delete();
  //     cropped.delete();
  //   } else if (target.id === "rINE") {
  //     setThumbnail2(reader.result);
  //   }
  // };
  // reader.readAsDataURL(file);
  // };
  const handleFileInputChange = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(file);
      if (target.id === "fINE") setThumbnail(reader.result);
      else if (target.id === "rINE") setThumbnail2(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const [url, setUrl] = useState("");
  const DescargaPDF = () => {
    const [instance, updateInstance] = usePDF({ document: ContratoFiesta });
    const [enviado, setenviado] = useState(false);
    if (instance.loading) return <div>Generando contrato...</div>;
    if (instance.error) return <div>Error</div>;
    // console.log(instance.url);
    if (instance.url != null && enviado === false) {
      // setenviado(true);
      // fetch(instance.url)
      //   .then((response) => response.blob())
      //   .then((archivoBlob) => {
      //     const solicitud = new XMLHttpRequest();
      //     solicitud.open(
      //       "POST",
      //       "http://localhost/p.php?folio=" + datos.fiesta.folio
      //     );
      //     solicitud.setRequestHeader("Content-Type", "application/pdf");
      //     solicitud.send(archivoBlob);
      //   });
    }
    return (
      <a href={instance.url} download={datos.fiesta.folio + ".pdf"}>
        Ver Contrato
      </a>
    );
  };
  const B = (props) =>(
    <Text style={styles.bold} >
      {props.text.toString().toUpperCase()}
    </Text>
  )
  if (rINE !== null) {
    var ContratoFiesta = (
      <Document title={datos.fiesta.folio} >
        <Page size="A4" style={styles.page} >
          <View style={styles.section}>
            <Text style={styles.headerContato}>
              CONTRATO DE PRESTACIÓN DE SERVICIO DE EVENTOS SOCIALES
            </Text>
            <Text style={styles.headerContato}>
              Folio: <Text style={styles.bold}>{datos.folio}</Text>
            </Text>

            <Text >
              QUE CELEBRAN POR UNA PARTE LA SOCIEDAD MERCANTIL DENOMINADA{" "}
              <Text style={styles.bold}>RECREFAM, S.A. DE C.V.</Text>, EN LO
              SUCESIVO IDENTIFICADA COMO{" "}
              <Text style={styles.bold}><B text="EL PROVEEDOR" /></Text> , REPRESENTADA POR
              {datos.fiestologo} Y POR OTRO LADO{" "}
              <Text style={styles.bold}>C.{" " + datos.cliente.nombre} </Text>{" "}
              ,EN LO SUBSECUENTE DENOMINADO{" "}
              <Text style={styles.bold}><B text="EL CONSUMIDOR" /></Text>, EN LO SUCESIVO
              IDENTIFICADOS COMO <Text style={styles.bold}><B text="LAS PARTES" /></Text>, AL
              TENOR DE LAS SIGUIENTES DEFINICIONES, DECLARACIONES Y CLAUSULAS:
            </Text>
            <Text style={styles.headerContato}>DEFINICIONES</Text>

            <Text style={styles.bold}></Text>
            <Text wrap>
              Para todos los efectos legales derivados del presente contrato, se entiende por: {"\n"}
              1.	<B text="FIESTA RECÓRCHOLIS" />: Celebración organizada por ¡Recórcholis! ®. {"\n"}
              2. TARJETA RECORCARD PRECARGADA: Tarjeta necesaria para el acceso a las atracciones y juegos que hay en <B text="EL ESTABLECIMIENTO" />, cargadas con <B text="BONUS" />  de acuerdo con lo elegido y a un equivalente en pesos moneda nacional.{"\n"}
              3. <B text="KOSHER" /> : Alimentos que respetan las prescripciones rituales del judaísmo y, por tanto, se consideran apropiados para consumirse por la comunidad judía. Aplicado específicamente al pastel y a la pizza.{"\n"}
              4. <B text="BONUS" /> : Dinero electrónico, que se carga a la tarjeta Recorcard. Un Bonus equivale a un peso.{"\n"}
              5. <B text="ÁREA GAMES" /> : Espacio con videojuegos, juegos de destreza y simuladores.{"\n"}
              6. <B text="ÁREA KIDS" /> : Espacio de estimulación temprana, acondicionada para niños de 80 cm a 120 cm de estatura.{"\n"}
              7. <B text="ÁREA BOWLING" /> : Espacio conformado por pistas de boliche profesionales, recomendado para niños de 6 años en adelante.{"\n"}
              8. <B text="ÁREA ICE" /> : Espacio de pista de patinaje sobre hielo, recomendado para niños de 6 años en adelante.{"\n"}
              9. <B text="ÁREA UPA" /> : Espacio confirmado por trampolines profesionales, recomendado para niños de 6 años en adelante.{"\n"}
              10. <B text="RECORCHOLITA" /> : Caja pequeña de cartón exclusiva de ¡Recórcholis! ®, que contiene el menú infantil.{"\n"}
              11. <B text="FIESTÓLOGO(A)" /> : Experto en la animación y organización de la <B text="FIESTA RECÓRCHOLIS" />. {"\n"}
          </Text>
          <Text style={styles.headerContato}>DECLARACIONES</Text>
          <Text> 
            I.	Declara “EL PROVEEDOR” lo siguiente:{"\n"} 
            a)	Ser una Persona Moral constituida conforme a las leyes de los Estados Unidos Mexicanos, tal y como consta en el testimonio de la Escritura Pública número 62,621, de fecha 26 de agosto de 1998, otorgada ante la fe del Licenciado Armando Gálvez Pérez Aragón, Notario Público Número 103 del Distrito Federal, inscrita en el Registro Público de Comercio de la Ciudad de México, en el Folio Mercantil número 241,738, de fecha 15 de septiembre de 1998. {"\n"}
            b)	Que su representante interviene en este acto con las facultades conferidas por <B text="EL PROVEEDOR" />, en su calidad de factor y/o dependiente y/o gerente, facultades que se ratifican en la fecha de firma de este contrato.{"\n"}
            c)	Que su domicilio se ubica en Boulevard Adolfo López Mateos número 183-2, Lomas de San Ángel Inn, Código Postal 01790, Álvaro Obregón, en la Ciudad de México; el cual señala como domicilio convencional para los efectos legales del presente contrato, así como el teléfono de atención 01800 8818811 y mail eventos@grupodiniz.com.mx. {"\n"}
            d)	Que se encuentra inscrita en el Registro Federal de Contribuyentes con la clave REC 980827TR6.{"\n"}
            e)	Que cumple con las licencias, permisos, avisos, certificados y autorizaciones previstas en las disposiciones legales, normas vigentes y estatutarias que correspondan.{"\n"}
            f)	Para la atención de dudas, aclaraciones y reclamaciones, señala el teléfono 800 8818811 y correo electrónico: eventos@grupodiniz.com.mx, dentro de un horario de 9:00 a 20:00 horas, de lunes a viernes y sábado y domingo de 12:00 a 20:00 horas.{"\n"}
            II. Declara <B text="EL CONSUMIDOR" /> lo siguiente:{"\n"}
            En caso de Persona Física: {"\n"}
            a) Es una persona física de nacionalidad Mexicana, con suficiente capacidad para obligarse en los términos del presente Contrato.{"\n"}
            b) Su domicilio se encuentra ubicado en la calle <B text={datos.cliente.calle} />, número <B text={datos.cliente.numero} />, Colonia <B text={datos.cliente.colonia} />, Delegación <B text={datos.cliente.delegacion} />, Código Postal <B text={datos.cliente.codigoPostal} />, en <B text={datos.cliente.estado} />, el cual señala como domicilio convencional para todos los efectos legales del presente Contrato, número de teléfono <B text={datos.cliente.telefono} /> y correo electrónico <B text={datos.cliente.correo} />. {"\n"}
            c) Manifiesta contar con los recursos financieros suficientes para obligarse a lo estipulado en este contrato.{"\n"}
            d) Que se encuentra inscrita en el Registro Federal de Contribuyentes con la clave <B text={datos.cliente.clave} />.{"\n"}
            e) Que recibió de <B text="EL PROVEEDOR" /> toda la información, montos, descripción y especificaciones relativas al servicio objeto del presente Contrato.{"\n"}{"\n"}

            En caso de Persona Moral: {"\n"}
            a) Ser una persona moral constituida conforme a las leyes de los Estados Unidos Mexicanos, tal y como consta en la Escritura Pública número _-------_, de fecha _-------_, otorgada ante la fe del Licenciado (a) _-------_, Notario Público Número _-------_ de _-------_, inscrita en el Registro Público de Comercio de _-------_, en el Folio Mercantil número _-------_, de fecha _-------_.{"\n"}
            b) Que su apoderado cuenta con las facultades y poderes suficientes para celebrar el presente Contrato, tal y como se desprende de la Escritura Pública número _-------_ de fecha _-------_, otorgada ante la fe del Notario Público número __-------___ de _-------_, Licenciado (a) _-------_, los cuales, se encuentran vigentes, sin que hayan sido revocados o modificados.{"\n"}
            c) Su domicilio se encuentra ubicado en la calle _-------_, número _-------_, Colonia _-------_, Delegación _-------_, Código Postal _-------_, en _-------_, el cual señala como domicilio convencional para todos los efectos del presente Contrato.{"\n"}
            d) Que recibió de <B text="EL PROVEEDOR" /> toda la información, montos, descripción y especificaciones relativas al servicio objeto del presente Contrato.{"\n"}
            e) Manifiesta contar con los recursos financieros suficientes para obligarse a lo estipulado en este contrato.{"\n"}
            f) Que se encuentra inscrita en el Registro Federal de Contribuyentes con la clave _-------_.{"\n"}
          </Text>
            <Text style={styles.parrafoC}>
              <Text style={styles.bold}><B text="LAS PARTES" /></Text> reconocen que las
              anteriores Declaraciones son correctas y vinculativas, por lo que
              forman parte integrante del presente Contrato, en tal virtud,
              teniéndolas en consideración, así como, su libre voluntad en
              asumir obligaciones recíprocas, convienen en obligarse a las
              siguientes:
            </Text>
            <Text style={styles.headerContato}>CLAUSULAS</Text>
            <Text>
              <B text="PRIMERA. - CONSENTIMIENTO." /> {"\n"}
              <B text="LAS PARTES" /> manifiestan su voluntad para celebrar el presente Contrato, por lo que <B text="EL PROVEEDOR" /> se obliga a prestar el servicio de <B text="FIESTA RECÓRCHOLIS" /> a <B text="EL CONSUMIDOR" />, quién se obliga a pagar, como contraprestación, un precio cierto y determinado.{"\n"}{"\n"}

              <B text="SEGUNDA. - OBJETO." />{"\n"}
              El objeto del presente Contrato es la prestación de servicio de <B text="FIESTA RECÓRCHOLIS" />, para un número determinado de  <B text={datos.fiesta.invitados} /> personas; el cual se llevará a cabo el día <B text={datos.fiesta.dia} /> del mes de <B text={datos.fiesta.mes} /> del año <B text={datos.fiesta.ano} />, con una duración de <B text={datos.fiesta.duracion} /> horas, iniciando a las <B text={datos.fiesta.inicio} /> horas y terminando a las <B text={datos.fiesta.fin} /> horas, en <B text="EL ESTABLECIMIENTO" /> ubicado en <B text={datos.fiesta.ubicacion} />, precisando que <B text="EL CONSUMIDOR" /> e invitados dispondrán de un tiempo máximo de treinta minutos, contados a partir de la finalización de la <B text="FIESTA RECÓRCHOLIS" />, para desalojar el espacio donde tuvo verificativo. La <B text="FIESTA RECÓRCHOLIS" /> incluye lo estipulado en el <B text="ANEXO UNO" /> del presente Contrato, por lo que <B text="EL PROVEEDOR" />, no podrá incluir o hacer el cobro por algún otro concepto que no sea materia de este Contrato; salvo consentimiento del <B text="CONSUMIDOR" />. {"\n"}{"\n"}

              <B text="TERCERA. - PAGO DEL SERVICIO." />{"\n"}
              <B text="EL CONSUMIDOR" /> se obliga a pagar a favor del <B text="PROVEEDOR" /> como contraprestación de la <B text="FIESTA RECÓRCHOLIS" />, sin importar que el número de asistentes sea inferior al estipulado, la cantidad de $<B text={datos.fiesta.montoNumero} /> (<B text={datos.fiesta.montoLetra} /> 00/100 M.N.) Impuesto al Valor Agregado incluido, que será pagado en <B text="EL ESTABLECIMIENTO" />, o bien, en el domicilio convencional señalado por <B text="EL PROVEEDOR" /> en este Contrato, en Moneda Nacional, sin menoscabo de poderlo hacer en moneda extranjera al tipo de cambio publicado en el Diario Oficial de la Federación al día en que el pago se efectúe.{"\n"}{"\n"}

              <B text="" /><B text="EL CONSUMIDOR" /> se obliga a realizar el pago de la forma siguiente:{"\n"}
              a)	La cantidad de $<B text={datos.fiesta.adelantoN} /> (<B text={datos.fiesta.adelantoL} /> 00/100 M.N.) Impuesto al Valor Agregado incluido, a la firma del presente Contrato, por concepto de anticipo, el cual corresponde al 50% del precio del servicio.{"\n"}
              b)	La cantidad restante, es decir, la cantidad de $<B text={datos.fiesta.restanteN} /> (<B text={datos.fiesta.restanteL} /> 00/100 M.N.) Impuesto al Valor Agregado incluido, que corresponde al 50% del precio total del servicio, se pagará, por lo menos una hora antes de iniciar la <B text="FIESTA RECÓRCHOLIS" />..{"\n"}{"\n"}

              Por el pago del anticipo, <B text="EL PROVEEDOR" /> deberá expedir el comprobante respectivo, el que contendrá por lo menos la siguiente información: nombre completo, razón social o denominación social, fecha e importe del anticipo, nombre y firma de la persona debidamente autorizada que recibe el anticipo y el sello del ESTABLECIMIENTO, el nombre completo de <B text="EL CONSUMIDOR" />, la fecha, hora y tipo de <B text="FIESTA RECÓRCHOLIS" />.{"\n"}{"\n"}

              Independientemente de la entrega del anticipo, <B text="EL PROVEEDOR" /> deberá entregar al <B text="CONSUMIDOR" /> la factura o comprobante que ampare el pago total del servicio contratado, en la que se hará constar detalladamente el nombre y precio de cada uno de los servicios proporcionados, esto con la finalidad de que <B text="EL CONSUMIDOR" /> pueda verificarlos a detalle; documento que deberá cumplir los requisitos que señalen las leyes aplicables.{"\n"}{"\n"}

              Cualquier costo o servicio adicional, que <B text="EL CONSUMIDOR" /> consienta expresamente, lo pagará y entregará al <B text="PROVEEDOR" />, de forma previa y oportuna al inicio de la <B text="FIESTA RECÓRCHOLIS" />. {"\n"}{"\n"}

              <B text="CUARTA. - SERVICIOS ADICIONALES O EXCESO DE INVITADOS O PROLONGACIÓN DE LA FIESTA RECÓRCHOLIS." />{"\n"}
              <B text="EL PROVEEDOR" /> podrá cobrar al <B text="CONSUMIDOR" /> antes de iniciar la <B text="FIESTA RECÓRCHOLIS" /> y al momento de la liquidación, una cantidad adicional para el caso de que se prolongue la duración y/o el número de invitados o servicios excedan de acuerdo con las cantidades indicadas en el <B text="ANEXO UNO" /> de este Contrato, para el caso; por lo que <B text="EL CONSUMIDOR" /> se obliga a pagar a <B text="EL PROVEEDOR" />, el excedente de los conceptos en él indicados. {"\n"}{"\n"}

              <B text="EL PROVEEDOR" /> podrá prestar servicios adicionales, a la <B text="FIESTA RECORCHOLIS" /> contratada, siempre y cuando cuente con el consentimiento del <B text="CONSUMIDOR" />, de acuerdo con lo especificado en el <B text="ANEXO UNO" />. {"\n"}{"\n"}

              Montos que se adicionarán a la suma total estipulada en la Cláusula Tercera de este contrato; estos servicios adicionales están sujetos a la posibilidad de espacio en <B text="" /><B text="EL ESTABLECIMIENTO" />. {"\n"}
              <B text="QUINTA. - PROCEDIMIENTO DE CONTROL DEL SERVICIO." />{"\n"}
              A efecto de tener seguridad en cuanto al número de asistentes a la <B text="FIESTA RECORCHOLIS" /> contratada, <B text="EL PROVEEDOR" /> establece como procedimiento de control y verificación el siguiente:{"\n"}
              a) <B text="LAS PARTES" /> designarán, cada uno, a una persona a efecto de que sólo ingresen al lugar personas autorizadas por <B text="EL CONSUMIDOR" />, para lo cual, podrán pactar el uso de boleto, contraseña, listado y/o invitación.{"\n"}
              b) <B text="EL CONSUMIDOR" /> se responsabiliza del pago del excedente de personas que haya autorizado ingresar a la <B text="FIESTA RECORCHOLIS" /> contratada.{"\n"}{"\n"}

              <B text="SEXTA. - CANCELACIONES Y CAMBIOS." />{"\n"}
              <B text="EL CONSUMIDOR" /> cuenta con un plazo de cinco (5) días hábiles contados a partir de la fecha de firma del presente contrato, para cancelar la prestación del servicio contratado y sin responsabilidad alguna para <B text="LAS PARTES" />, siempre y cuando la fecha señalada para que tenga verificativo la celebración de la <B text="FIESTA RECORCHOLIS" />, se encuentre, por lo menos, a una distancia o espacio de diez (10) días hábiles de antelación. En este caso, <B text="EL PROVEEDOR" /> se obliga a reintegrar todas las cantidades que <B text="EL CONSUMIDOR" /> le haya entregado en un lapso no mayor a veinte (20) días hábiles posteriores a la fecha de la solicitud de la cancelación.  {"\n"}{"\n"}

              <B text="LAS PARTES" /> acuerdan que una vez transcurridos los (5) cinco días hábiles señalados en la presente Cláusula y en caso de que alguna de <B text="LAS PARTES" /> requiera cancelar la prestación del servicio fuera del tiempo señalado, la parte que solicite dicha cancelación deberá:{"\n"}{"\n"}

              1.	Pagar el 20% sobre la cantidad correspondiente al anticipo, en caso de que la cancelación se solicite hasta quince (15) días hábiles antes de la <B text="FIESTA RECÓRCHOLIS" />.{"\n"}
              2.	Pagar el 50% sobre la cantidad correspondiente al anticipo, en caso de que la cancelación se solicite hasta diez (10) días hábiles antes de la <B text="FIESTA RECÓRCHOLIS" />.{"\n"}
              3.	Pagar el 100% sobre la cantidad correspondiente al anticipo, en caso de que la cancelación se solicite hasta cinco (5) días hábiles antes de la <B text="FIESTA RECÓRCHOLIS" />.{"\n"}{"\n"}

              EL CLIENTE podrá, siempre y cuando exista, por lo menos, una distancia o espacio de cinco (5) días hábiles de antelación a la fecha de la <B text="FIESTA RECÓRCHOLIS" />, señalar diverso día y hora, inclusive, distinto ESTABLECIMIENTO y disponibilidad de día, hora y lugar y debiendo pagar, el 20% sobre el monto total del contrato, ello en atención de los gastos que se erogan para una nueva preparación y organización, pago que deberá hacer al momento en que sea confirmado el cambio por EL CLIENTE. {"\n"}{"\n"}

              Tanto las cancelaciones, como, los cambios señalados en esta cláusula deberán constar por escrito mediante formato que para tal efecto se proporcionará, debidamente firmado por <B text="EL CONSUMIDOR" /> y entregado a <B text="EL PROVEEDOR" />, en los plazos señalados, en el domicilio del <B text="PROVEEDOR" />, o bien, por correo registrado o certificado, tomando como fecha de revocación la recepción para su envío.   {"\n"}{"\n"}

              En caso de que la cancelación haya sido solicitada por <B text="EL CONSUMIDOR" /> en los términos estipulados en esta cláusula, <B text="EL PROVEEDOR" /> deberá reintegrar a <B text="EL CONSUMIDOR" />, la cantidad restante que resulte después de haber aplicado el cobro o pago de la pena correspondiente.{"\n"}{"\n"}

              <B text="SÉPTIMA. - DESIGNACIÓN DE PERSONAL." />{"\n"}
              <B text="EL CONSUMIDOR" /> se obliga a designar a una persona de su confianza, quién durante la <B text="FIESTA RECÓRCHOLIS" />, será quien trate los asuntos relacionados con ésta; asimismo, se obliga a abstenerse de dar instrucciones al personal del <B text="PROVEEDOR" />, que no tenga relación con el objeto del presente contrato y a procurar que sus invitados observen la misma conducta. Por su parte <B text="EL PROVEEDOR" /> se obliga a designar, de entre su personal, a una persona que será quien durante la <B text="FIESTA RECORCHOLIS" /> trate con el representante del <B text="CONSUMIDOR" /> o con él mismo, los asuntos relacionados con la <B text="FIESTA RECÓRCHOLIS" /> y se obliga a que su personal atienda con esmero y cortesía a los asistentes. {"\n"}{"\n"}

              <B text="OCTAVA. - REGLAMENTO DEL PROVEEDOR DEL SERVICIO." />{"\n"}
              <B text="EL CONSUMIDOR" /> se obliga a cumplir con las disposiciones reglamentarias que rijan <B text="EL ESTABLECIMIENTO" /> y a procurar que los asistentes a la <B text="FIESTA RECORCHOLIS" /> observen la misma conducta. Para tal efecto, <B text="EL PROVEEDOR" /> entrega, a la firma del presente Contrato, al <B text="CONSUMIDOR" /> una copia del reglamento respectivo en donde se fijan las disposiciones reglamentarias.{"\n"}{"\n"}

              <B text="NOVENA. - SUBCONTRATACIÓN." />{"\n"}
              <B text="EL PROVEEDOR" /> es responsable ante <B text="EL CONSUMIDOR" /> por el incumplimiento de los servicios contratados, aun cuando subcontrate con terceros dicha prestación.{"\n"}{"\n"}

              <B text="DÉCIMA. - GUARDAROPA. " />{"\n"}
              Toda vez que <B text="EL PROVEEDOR" /> no cuenta con el servicio conocido como “Guarda Ropa” o análogo, ni tampoco con vigilancia o resguardos para bienes muebles, equipos, insumos, aparatos electrónicos o eléctricos, teléfonos, valores, regalos, ropa o prenda de vestir, accesorios personales, entre otros, no es responsable, ni repondrá, pagará, restituirá o reembolsará, en todo o parte, el numerario generado por daños, robos, pérdidas o extravíos cualquiera. {"\n"}{"\n"}


              <B text="DÉCIMA PRIMERA. - GASTOS DE REPARACIÓN O REPOSICIÓN." />{"\n"}
              Si los bienes, insumos o instrumentos destinados para la <B text="FIESTA RECÓRCHOLIS" />, sufrieren un menoscabo o daño o pérdida por culpa o negligencia del <B text="CONSUMIDOR" /> o de sus invitados o asistentes, debidamente comprobada, éste se obliga a cubrir los gastos de reparación de los mismos, o en su caso, indemnizar al <B text="PROVEEDOR" /> hasta con un 50% (cincuenta por ciento) del valor comercial de los bienes afectados, considerando el desgaste habitual y estado actual de los bienes, así como del valor del bien dañado que sea fehacientemente comprobable por parte del <B text="CONSUMIDOR" /> o sus invitados; en caso de que el daño permita su cómoda reparación, <B text="EL CONSUMIDOR" /> se obliga a pagar el 60% (sesenta por ciento) de la reparación al <B text="PROVEEDOR" />. {"\n"}{"\n"}

              <B text="DÉCIMA SEGUNDA. - AVISO DE PRIVACIDAD." />{"\n"}
              Previo a la firma del presente Contrato y en cumplimiento a lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, <B text="EL PROVEEDOR" /> hizo del conocimiento al <B text="CONSUMIDOR" /> el aviso de privacidad, así como, el procedimiento para ejercer los derechos de acceso, rectificación, cancelación y oposición al tratamiento de sus datos personales.{"\n"}{"\n"}

              <B text="DÉCIMA TERCERA. - CASO FORTUITO Y/O FUERZA MAYOR." /> {"\n"}
              En caso de que <B text="EL PROVEEDOR" /> se encuentre imposibilitado para llevar a cabo la <B text="FIESTA RECÓRCHOLIS" />, por caso fortuito o fuerza mayor, como incendio, temblor, disposición gubernamental, interrupción del servicio de energía eléctrica u otros acontecimientos de la naturaleza o hechos del hombre ajenos a la voluntad del <B text="PROVEEDOR" />, no se incurrirá en incumplimiento, únicamente <B text="EL PROVEEDOR" /> reintegrará al <B text="CONSUMIDOR" />, el anticipo que le hubiera entregado, o en su defecto, reprogramar la <B text="FIESTA RECÓRCHOLIS" />, en posterior fecha disponible. {"\n"}{"\n"}

              <B text="DÉCIMA CUARTA. - JURISDICCIÓN Y COMPETENCIA." />{"\n"}
              <B text="LAS PARTES" /> determinan que la Procuraduría Federal del Consumidor será competente en la vía administrativa para resolver cualquier controversia que se suscite sobre la interpretación o cumplimiento del presente Contrato, en el mismo sentido, se someten expresamente a la jurisdicción y competencia de las leyes y Tribunales del Fuero Común de la Ciudad de México, renunciando al fuero o competencia que pudiere corresponderle por la ubicación de sus domicilios, presentes o futuros, o por cualquier otra causa.{"\n"}{"\n"}                        
            </Text>
            
            <Text style={styles.parrafoM}>
              "Este Contrato fue aprobado y registrado por la Procuraduría
              Federal del Consumidor bajo el número 158‐2022 de fecha 14 de
              Enero del 2022. Cualquier variación del presente Contrato en
              perjuicio del <B text="CONSUMIDOR" />, frente al Contrato de adhesión
              registrado, se tendrá por no puesta."
            </Text>
            <Text style={{ ...styles.parrafoM, ...styles.bold }}>
              LEÍDO, EXPLICADO Y ENTENDIDO QUE FUE EL CONTENIDO, ALCANCE Y
              FUERZA LEGAL DEL PRESENTE CONTRATO Y <B text="ANEXO UNO" />, <B text="LAS PARTES" /> LO
              FIRMAN DE CONFORMIDAD EN CADA UNA DE SUS____5___ HOJAS ÚTILES QUE
              LO INTEGRAN, POR DUPLICADO, EN LA CIUDAD DE ____Mexico____, EL DíA
              __09__ DEL MES DE __FEBRERO__ DEL AÑO __2023__.
            </Text>
            <Text style={{ ...styles.bold, ...styles.firma }}>
              <B text="EL CONSUMIDOR" />
            </Text>
            {firmaCliente && (
              <Image
                src={firmaCliente}
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "auto",
                }}
              ></Image>
            )}
            <Text style={{ ...styles.bold, ...styles.firma }}>
              C. {datos.cliente.nombre}
            </Text>
            <Text style={{ ...styles.parrafoM, ...styles.firma }}>
              FIRMA Y NOMBRE COMPLETO
            </Text>
            <Text style={{ ...styles.bold, ...styles.firma }}>
              <B text="EL PROVEEDOR" />
            </Text>
            {firmaFiestologo && (
              <Image
                src={firmaFiestologo}
                style={{
                  width: "100px",
                  height: "50px",
                  margin: "auto",
                }}
              ></Image>
            )}
            <Text style={{ ...styles.bold, ...styles.firma }}>
              C. {datos.fiestologo}
            </Text>
            <Text style={{ ...styles.parrafoM, ...styles.firma }}>
              FIRMA Y NOMBRE COMPLETO
            </Text>

            <Text style={styles.parrafoM}>
              AUTORIZACIÓN PARA LA UTILIZACIÓN DE INFORMACIÓN CON FINES MERCADOTÉCNICOS O PUBLICITARIOS.{"\n"}
              <B text="EL CONSUMIDOR" /> si (  ) no (  ) acepta que <B text="EL PROVEEDOR" /> ceda o transmita a terceros, con fines mercadotécnicos o publicitarios, la información proporcionada por él y con motivo del presente Contrato y, si (  ) no (  ) acepta que <B text="EL PROVEEDOR" /> le envíe publicidad sobre bienes, servicios y promociones; firma de autorización del Consumidor: __________________________________________.{"\n"}
 

            </Text>
           
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <Text style={styles.parrafoM}>DISPOSICIONES REGLAMENTARIAS</Text>
            <Text>
              1.	Por ningún motivo, introducir cualquier tipo de alimentos, bebidas, botanas, cohetes, pirotecnia, ajenos a <B text="EL ESTABLECIMIENTO" /> o <B text="FIESTA RECÓRCHOLIS" /> contratada, a excepción de globos, piñatas, pastel y/o dulces, que serán permitidos, siempre previo aviso y autorización del <B text="PROVEEDOR" />, salvo la goma de mascar (chicle) que en ningún caso se permitirán; en caso de piñatas, será en atención a la posibilidad del espacio en <B text="EL ESTABLECIMIENTO" />.{"\n"}
              2.	Cumplir con las normas y disposiciones reglamentarias de <B text="EL ESTABLECIMIENTO" /> en el cuál, tenga verificativo la <B text="FIESTA RECÓRCHOLIS" />, las que se encuentran visibles y a su disposición.{"\n"}
              3.	Mantener el orden, así como, una conducta adecuada y de acuerdo con las buenas costumbres. {"\n"}
              4.	Evitar cualquier acción o agresión que ponga en riesgo la integridad física y/o moral de los asistentes e invitados, incluidos, el personal del PROVEEDOR, clientes o visitantes del ESTABLECIMIENTO.{"\n"}
              5.	Realizar un adecuado uso de las instalaciones, mobiliario, insumos, máquinas, juegos y demás bienes que sean puestos a su disposición para la realización de la <B text="FIESTA RECÓRCHOLIS" />.{"\n"}
              6.	No realizar alteraciones o daño alguno a los bienes y/o instalaciones de <B text="EL ESTABLECIMIENTO" />.{"\n"}
              7.	Cumplir con las reglas de acceso y uso que se encuentran visibles en cada área, juego y/o atracción, entre otras, el uso de calcetas y bandas, estatura del niño(a); lo anterior por prevención en materia de seguridad y cuidados de la integridad física.{"\n"}
              8.	No promover o exigir ningún tipo de exclusividad de cualquier área que forme parte de <B text="EL ESTABLECIMIENTO" /> distinta a la reservada o destinada para la <B text="FIESTA RECÓRCHOLIS" />, o bien, a la que se tenga derecho por virtud del contrato de prestación de servicios, ni mucho menos, se podrá exigir exclusividad alguna en horarios, máquinas, juegos o cualquier otra atracción no incluida expresamente en la <B text="FIESTA RECÓRCHOLIS" /> contratada.{"\n"}
              9.	Vigilar y resguardar sus propios bienes, valores, pertenencias, vestimentas, regalos, obsequios o accesorios de uso personal, mientras se encuentre en <B text="EL ESTABLECIMIENTO" />, ya que no se cuenta con el servicio de resguardo de objetos personales, por lo que <B text="EL PROVEEDOR" /> no se hace responsable por ningún objeto perdido, entre otros, bolsas, zapatos, suéteres, cámaras de video y/o fotografía, celulares, regalos del festejado, y demás artículos de uso personal, quedando como único responsable el cliente. Incluyendo las pertenencias de los menores y/o invitados.{"\n"}
              10.	Entregar un documento que contenga la lista o relación de los nombres completos, legibles, de todos y cada uno de los invitados o asistentes, cuando menos, treinta minutos antes de iniciar la <B text="FIESTA RECÓRCHOLIS" /> contratada.{"\n"}
              11.	Cumplir, y hacer cumplir, estrictamente con el tiempo de duración de la <B text="FIESTA RECÓRCHOLIS" /> contratada, tanto en su inicio, como en su terminación, así como el tiempo establecido para la preparación y desalojo del área reservada, en caso contrario, resultará aplicable el pago de tiempo adicional señalado en el anexo del presente contrato, referido como hora de ampliación de duración, deslindando al <B text="PROVEEDOR" /> de cualquier responsabilidad por la negligencia o demora en que se incurra.{"\n"}
              12.	Para el caso de menores de edad y por razones de seguridad e integridad física, los padres y/o tutores permanecerán, vigilarán y los cuidarán durante todo el desarrollo de la <B text="FIESTA RECÓRCHOLIS" /> contratada.{"\n"}
              13.	Entregar la información y datos necesarios para la preparación y organización de la <B text="FIESTA RECÓRCHOLIS" /> contratada, que se señalan en el contrato de prestación de servicios.{"\n"}
              14.	Una vez finalizado la <B text="FIESTA RECÓRCHOLIS" /> contratada, desalojar y dejar libre el área reservada y destinada para su celebración, dentro del tiempo establecido en el presente contrato para llevar a cabo el desalojo del área reservada.{"\n"}
                              
            </Text> 
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.headerContato}>
              ANEXO UNO DE CONTRATO DE PRESTACIÓN DE SERVICIO DE FIESTA
            </Text>
            <View style={styles.table}>
              <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={[styles.row1, styles.textCenter]}>No.</Text>
                <Text style={[styles.row2, styles.textCenter]}>CONCEPTO</Text>
                <Text style={[styles.row3, styles.textCenter]}>CANTIDAD</Text>
                <Text style={[styles.row4, styles.textCenter]}>PRECIO</Text>
                <Text style={[styles.row5, styles.textCenter]}>SUBTOTAL</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.row1, styles.textCenter]}>1</Text>
                <Text style={styles.row2}>PAQUETE FIESTA 15 PERSONAS</Text>
                <Text style={[styles.row3, styles.textCenter]}>1</Text>
                <Text style={[styles.row4, styles.textRight]}>6,000</Text>
                <Text style={[styles.row5, styles.textRight]}>6,000</Text>
              </View>
              <View style={[styles.row]}>
                <Text style={[styles.row1, styles.textCenter]}></Text>
                <Text style={styles.row2}></Text>
                <Text style={[styles.row3, styles.textCenter]}></Text>
                <Text style={[styles.row4, styles.textCenter, styles.bold]}>
                  SUBTOTAL
                </Text>
                <Text style={[styles.row5, styles.textRight]}>5,400</Text>
              </View>
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.row1, styles.textCenter]}></Text>
                <Text style={styles.row2}></Text>
                <Text style={[styles.row3, styles.textCenter]}></Text>
                <Text style={[styles.row4, styles.textCenter, styles.bold]}>
                  IVA
                </Text>
                <Text style={[styles.row5, styles.textRight]}>600</Text>
              </View>
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.row1, styles.textCenter]}></Text>
                <Text style={styles.row2}></Text>
                <Text style={[styles.row3, styles.textCenter]}></Text>
                <Text style={[styles.row4, styles.textCenter, styles.bold]}>
                  ADELANTO
                </Text>
                <Text style={[styles.row5, styles.textRight]}>3,000</Text>
              </View>
              <View style={[styles.row, styles.header]}>
                <Text style={[styles.row1, styles.textCenter]}></Text>
                <Text style={styles.row2}></Text>
                <Text style={[styles.row3, styles.textCenter]}></Text>
                <Text style={[styles.row4, styles.textCenter, styles.bold]}>
                  RESTA
                </Text>
                <Text style={[styles.row5, styles.textRight]}>3,000</Text>
              </View>
            </View>
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
          <View>
            <Image
              src={fINE}
              style={{
                width: "3.375in",
                height: "2.125in",
                margin: "50px auto",
              }}
            />
            <Image
              src={rINE}
              style={{
                width: "3.375in",
                height: "2.125in",
                margin: "50px auto",
              }}
            />
          </View>
        </Page>
      </Document>
    );
  }
  var cliente = {};
  var fiestologo = {};
  function trim() {
    setFirmaCliente(cliente.getTrimmedCanvas().toDataURL("image/png"));
    setFirmaFiestologo(fiestologo.getTrimmedCanvas().toDataURL("image/png"));
    setTerminado(true);
  }
  return (
    <>
      <Formulario />
      {!generar ? (
        <div>
          <h2 style={{ textAlign: "center" }}>Captura de Documentos</h2>
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="fINE"
            onChange={handleFileInputChange}
            hidden
          />
          <input
            type="file"
            accept="image/*"
            capture="camera"
            id="rINE"
            onChange={handleFileInputChange}
            hidden
          />
          <div className="d-flex justify-content-center">
            {" "}
            <label for="fINE">
              <div className="seleccionaINE d-flex justify-content-center align-items-center">
                {fINE === null ? (
                  <p>Frontal INE</p>
                ) : (
                  <img
                    src={fINE}
                    alt="thumbnail"
                    style={{ width: "6.75in", height: "4.25in" }}
                  />
                )}
              </div>
            </label>
            <label for="rINE">
              <div className="seleccionaINE d-flex justify-content-center align-items-center">
                {rINE === null ? (
                  <p>Reverso INE</p>
                ) : (
                  <img
                    src={rINE}
                    alt="thumbnail"
                    style={{ width: "6.75in", height: "4.25in" }}
                  />
                )}
              </div>
            </label>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              appearance="primary"
              color="blue"
              size="lg"
              disabled={!(fINE && rINE)}
              onClick={setGenerar.bind(this, true)}
            >
              Generar Contrato
            </Button>
          </div>
        </div>
      ) : (
        <>
          {rINE !== null && firmar !== true ? (
            <>
              <div className="d-flex justify-content-center">
                {isDesktop ? (
                  <PDFViewer width={1500} height={800}>
                    {ContratoFiesta}
                  </PDFViewer>
                ) : (
                  <DescargaPDF />
                )}
              </div>
              <div className="d-flex justify-content-center ">
                <Button
                  appearance="primary"
                  color="blue"
                  size="lg"
                  disabled={!(fINE && rINE)}
                  onClick={setFirmar.bind(this, true)}
                >
                  Firmar Contrato
                </Button>
              </div>
            </>
          ) : !terminado ? (
            <>
              <div
                className="d-flex justify-content-center "
                style={{ height: 300 }}
              >
                <div style={{ width: 500, height: 200 }}>
                  <p style={{ color: "white", textAlign: "center" }}>
                    Firma del cliente
                  </p>

                  <div
                    style={{
                      background: "white",
                      border: "1px solid black",
                      boxSizing: "border-box",
                      width: 500,
                      height: 200,
                    }}
                  >
                    <SignatureCanvas
                      penColor="black"
                      ref={(ref) => {
                        cliente = ref;
                      }}
                      canvasProps={{
                        width: 500,
                        height: 200,
                        className: "sigCanvas",
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      appearance="primary"
                      color="cyan"
                      onClick={() => {
                        cliente.clear();
                      }}
                    >
                      Reintentar
                    </Button>
                  </div>
                </div>
                <div style={{ width: 500, height: 200 }}>
                  <p style={{ color: "white", textAlign: "center" }}>
                    Firma del fistologo
                  </p>

                  <div
                    style={{
                      background: "white",
                      border: "1px solid black",
                      boxSizing: "border-box",
                      width: 500,
                      height: 200,
                    }}
                  >
                    <SignatureCanvas
                      penColor="black"
                      ref={(ref) => {
                        fiestologo = ref;
                      }}
                      canvasProps={{
                        width: 500,
                        height: 200,
                        className: "sigCanvas",
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <Button
                      appearance="primary"
                      color="cyan"
                      onClick={() => {
                        fiestologo.clear();
                      }}
                    >
                      Reintentar
                    </Button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  appearance="primary"
                  color="blue"
                  size="lg"
                  onClick={trim}
                >
                  Terminar
                </Button>
              </div>
            </>
          ) : (
            <PDFViewer width={"100%"} height={800}>
              {ContratoFiesta}
            </PDFViewer>
          )}
        </>
      )}
    </>
  );
};
const Formulario = () => {
  const [cliente, setCliente] = useState({})
    var clienteR ={
    rfc:false,
    estado:false,
    delegacion : false, 
    colonia: false,
    codigoPostal:false,
    calle:false,
    numero:false} 
  const InputG = ({placeholder,type="text", onChange = () => {}, style = {} }) => {
    style = {...{width:250, margin: 10}, ...style}
    return (
    <div style={style} className="">
      <p className="" style={{textAlign : "center"}}>{placeholder}</p>
      <Input placeholder={placeholder} type={type} onChange={onChange} /> 
    </div>
  )}
  console.log(cliente)
  return (
  <>
    <h3 style={{textAlign:"center"}}>Informacion extra del cliente</h3>
    <div className="d-flex justify-content-center" style={{}}>
      <div className="d-flex flex-wrap justify-content-center" style={{maxWidth:550}}>
        <InputG placeholder="Estado" onChange={(a)=>{clienteR = {...clienteR, estado: a} ; } }  style={{}}/>
        <InputG placeholder="Delegacion" onChange={(a)=>{clienteR = {...clienteR, delegacion: a} ;} }  style={{}}/>
        <InputG placeholder="Colonia" onChange={(a)=>{clienteR = {...clienteR, colonia: a} ;} }  style={{}}/>
        <InputG placeholder="Codigo Postal" onChange={(a)=>{clienteR = {...clienteR, codigoPostal: a} ;} }  style={{}}/>
        <InputG placeholder="Calle" onChange={(a)=>{clienteR = {...clienteR, calle: a} ;} }  style={{}}/>
        <InputG placeholder="Numero" onChange={(a)=>{clienteR = {...clienteR, numero: a} ;} }  style={{}}/>
        <InputG placeholder="RFC" onChange={(a)=>{clienteR = {...clienteR, rfc: a} ;console.log(clienteR)}  }  style={{}}/>
      </div> 
     </div>
     <div className="d-flex justify-content-center">
        <Button appearance="primary" color="blue" onClick={setCliente.bind(this,clienteR)}>Siguiente </Button>
      </div>
     
 </>
)
};

function CapturaINE() {
  const [image, setImage] = useState(null);
  const [fINE, setThumbnail] = useState(null);
  const [thumbnail2, setThumbnail2] = useState(null);

  const handleFileInputChange = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(file);
      if (target.id === "fINE") setThumbnail(reader.result);
      else if (target.id === "rINE") setThumbnail2(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="camera"
        id="fINE"
        onChange={handleFileInputChange}
        hidden
      />
      <div className="d-flex">
        <label for="fINE">
          <div className="seleccionaINE d-flex justify-content-center align-items-center">
            {fINE === null ? (
              <p>Frontal INE</p>
            ) : (
              <img
                src={fINE}
                alt="thumbnail"
                style={{ width: "3.375in", height: "2.125in" }}
              />
            )}
          </div>
        </label>
      </div>
    </div>
  );
}

export default ModuleContrato;
