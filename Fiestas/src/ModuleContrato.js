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
  folio: "TCM??22021??2023",
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
      " CALZADA ACOXPA 610, COAPA, EQUIPAMIENTO PLAZA COAPA, TLALPAN, 14390, CIUDAD DE M??XICO, CDMX ",
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
      "CALZADA ACOXPA AND 9, Delegaci??n CDMX C??digo Postal 14390, CDMX",
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
              CONTRATO DE PRESTACI??N DE SERVICIO DE EVENTOS SOCIALES
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
              1.	<B text="FIESTA REC??RCHOLIS" />: Celebraci??n organizada por ??Rec??rcholis! ??. {"\n"}
              2. TARJETA RECORCARD PRECARGADA: Tarjeta necesaria para el acceso a las atracciones y juegos que hay en <B text="EL ESTABLECIMIENTO" />, cargadas con <B text="BONUS" />  de acuerdo con lo elegido y a un equivalente en pesos moneda nacional.{"\n"}
              3. <B text="KOSHER" /> : Alimentos que respetan las prescripciones rituales del juda??smo y, por tanto, se consideran apropiados para consumirse por la comunidad jud??a. Aplicado espec??ficamente al pastel y a la pizza.{"\n"}
              4. <B text="BONUS" /> : Dinero electr??nico, que se carga a la tarjeta Recorcard. Un Bonus equivale a un peso.{"\n"}
              5. <B text="??REA GAMES" /> : Espacio con videojuegos, juegos de destreza y simuladores.{"\n"}
              6. <B text="??REA KIDS" /> : Espacio de estimulaci??n temprana, acondicionada para ni??os de 80 cm a 120 cm de estatura.{"\n"}
              7. <B text="??REA BOWLING" /> : Espacio conformado por pistas de boliche profesionales, recomendado para ni??os de 6 a??os en adelante.{"\n"}
              8. <B text="??REA ICE" /> : Espacio de pista de patinaje sobre hielo, recomendado para ni??os de 6 a??os en adelante.{"\n"}
              9. <B text="??REA UPA" /> : Espacio confirmado por trampolines profesionales, recomendado para ni??os de 6 a??os en adelante.{"\n"}
              10. <B text="RECORCHOLITA" /> : Caja peque??a de cart??n exclusiva de ??Rec??rcholis! ??, que contiene el men?? infantil.{"\n"}
              11. <B text="FIEST??LOGO(A)" /> : Experto en la animaci??n y organizaci??n de la <B text="FIESTA REC??RCHOLIS" />. {"\n"}
          </Text>
          <Text style={styles.headerContato}>DECLARACIONES</Text>
          <Text> 
            I.	Declara ???EL PROVEEDOR??? lo siguiente:{"\n"} 
            a)	Ser una Persona Moral constituida conforme a las leyes de los Estados Unidos Mexicanos, tal y como consta en el testimonio de la Escritura P??blica n??mero 62,621, de fecha 26 de agosto de 1998, otorgada ante la fe del Licenciado Armando G??lvez P??rez Arag??n, Notario P??blico N??mero 103 del Distrito Federal, inscrita en el Registro P??blico de Comercio de la Ciudad de M??xico, en el Folio Mercantil n??mero 241,738, de fecha 15 de septiembre de 1998. {"\n"}
            b)	Que su representante interviene en este acto con las facultades conferidas por <B text="EL PROVEEDOR" />, en su calidad de factor y/o dependiente y/o gerente, facultades que se ratifican en la fecha de firma de este contrato.{"\n"}
            c)	Que su domicilio se ubica en Boulevard Adolfo L??pez Mateos n??mero 183-2, Lomas de San ??ngel Inn, C??digo Postal 01790, ??lvaro Obreg??n, en la Ciudad de M??xico; el cual se??ala como domicilio convencional para los efectos legales del presente contrato, as?? como el tel??fono de atenci??n 01800 8818811 y mail eventos@grupodiniz.com.mx. {"\n"}
            d)	Que se encuentra inscrita en el Registro Federal de Contribuyentes con la clave REC 980827TR6.{"\n"}
            e)	Que cumple con las licencias, permisos, avisos, certificados y autorizaciones previstas en las disposiciones legales, normas vigentes y estatutarias que correspondan.{"\n"}
            f)	Para la atenci??n de dudas, aclaraciones y reclamaciones, se??ala el tel??fono 800 8818811 y correo electr??nico: eventos@grupodiniz.com.mx, dentro de un horario de 9:00 a 20:00 horas, de lunes a viernes y s??bado y domingo de 12:00 a 20:00 horas.{"\n"}
            II. Declara <B text="EL CONSUMIDOR" /> lo siguiente:{"\n"}
            En caso de Persona F??sica: {"\n"}
            a) Es una persona f??sica de nacionalidad Mexicana, con suficiente capacidad para obligarse en los t??rminos del presente Contrato.{"\n"}
            b) Su domicilio se encuentra ubicado en la calle <B text={datos.cliente.calle} />, n??mero <B text={datos.cliente.numero} />, Colonia <B text={datos.cliente.colonia} />, Delegaci??n <B text={datos.cliente.delegacion} />, C??digo Postal <B text={datos.cliente.codigoPostal} />, en <B text={datos.cliente.estado} />, el cual se??ala como domicilio convencional para todos los efectos legales del presente Contrato, n??mero de tel??fono <B text={datos.cliente.telefono} /> y correo electr??nico <B text={datos.cliente.correo} />. {"\n"}
            c) Manifiesta contar con los recursos financieros suficientes para obligarse a lo estipulado en este contrato.{"\n"}
            d) Que se encuentra inscrita en el Registro Federal de Contribuyentes con la clave <B text={datos.cliente.clave} />.{"\n"}
            e) Que recibi?? de <B text="EL PROVEEDOR" /> toda la informaci??n, montos, descripci??n y especificaciones relativas al servicio objeto del presente Contrato.{"\n"}{"\n"}

            En caso de Persona Moral: {"\n"}
            a) Ser una persona moral constituida conforme a las leyes de los Estados Unidos Mexicanos, tal y como consta en la Escritura P??blica n??mero _-------_, de fecha _-------_, otorgada ante la fe del Licenciado (a) _-------_, Notario P??blico N??mero _-------_ de _-------_, inscrita en el Registro P??blico de Comercio de _-------_, en el Folio Mercantil n??mero _-------_, de fecha _-------_.{"\n"}
            b) Que su apoderado cuenta con las facultades y poderes suficientes para celebrar el presente Contrato, tal y como se desprende de la Escritura P??blica n??mero _-------_ de fecha _-------_, otorgada ante la fe del Notario P??blico n??mero __-------___ de _-------_, Licenciado (a) _-------_, los cuales, se encuentran vigentes, sin que hayan sido revocados o modificados.{"\n"}
            c) Su domicilio se encuentra ubicado en la calle _-------_, n??mero _-------_, Colonia _-------_, Delegaci??n _-------_, C??digo Postal _-------_, en _-------_, el cual se??ala como domicilio convencional para todos los efectos del presente Contrato.{"\n"}
            d) Que recibi?? de <B text="EL PROVEEDOR" /> toda la informaci??n, montos, descripci??n y especificaciones relativas al servicio objeto del presente Contrato.{"\n"}
            e) Manifiesta contar con los recursos financieros suficientes para obligarse a lo estipulado en este contrato.{"\n"}
            f) Que se encuentra inscrita en el Registro Federal de Contribuyentes con la clave _-------_.{"\n"}
          </Text>
            <Text style={styles.parrafoC}>
              <Text style={styles.bold}><B text="LAS PARTES" /></Text> reconocen que las
              anteriores Declaraciones son correctas y vinculativas, por lo que
              forman parte integrante del presente Contrato, en tal virtud,
              teni??ndolas en consideraci??n, as?? como, su libre voluntad en
              asumir obligaciones rec??procas, convienen en obligarse a las
              siguientes:
            </Text>
            <Text style={styles.headerContato}>CLAUSULAS</Text>
            <Text>
              <B text="PRIMERA. - CONSENTIMIENTO." /> {"\n"}
              <B text="LAS PARTES" /> manifiestan su voluntad para celebrar el presente Contrato, por lo que <B text="EL PROVEEDOR" /> se obliga a prestar el servicio de <B text="FIESTA REC??RCHOLIS" /> a <B text="EL CONSUMIDOR" />, qui??n se obliga a pagar, como contraprestaci??n, un precio cierto y determinado.{"\n"}{"\n"}

              <B text="SEGUNDA. - OBJETO." />{"\n"}
              El objeto del presente Contrato es la prestaci??n de servicio de <B text="FIESTA REC??RCHOLIS" />, para un n??mero determinado de  <B text={datos.fiesta.invitados} /> personas; el cual se llevar?? a cabo el d??a <B text={datos.fiesta.dia} /> del mes de <B text={datos.fiesta.mes} /> del a??o <B text={datos.fiesta.ano} />, con una duraci??n de <B text={datos.fiesta.duracion} /> horas, iniciando a las <B text={datos.fiesta.inicio} /> horas y terminando a las <B text={datos.fiesta.fin} /> horas, en <B text="EL ESTABLECIMIENTO" /> ubicado en <B text={datos.fiesta.ubicacion} />, precisando que <B text="EL CONSUMIDOR" /> e invitados dispondr??n de un tiempo m??ximo de treinta minutos, contados a partir de la finalizaci??n de la <B text="FIESTA REC??RCHOLIS" />, para desalojar el espacio donde tuvo verificativo. La <B text="FIESTA REC??RCHOLIS" /> incluye lo estipulado en el <B text="ANEXO UNO" /> del presente Contrato, por lo que <B text="EL PROVEEDOR" />, no podr?? incluir o hacer el cobro por alg??n otro concepto que no sea materia de este Contrato; salvo consentimiento del <B text="CONSUMIDOR" />. {"\n"}{"\n"}

              <B text="TERCERA. - PAGO DEL SERVICIO." />{"\n"}
              <B text="EL CONSUMIDOR" /> se obliga a pagar a favor del <B text="PROVEEDOR" /> como contraprestaci??n de la <B text="FIESTA REC??RCHOLIS" />, sin importar que el n??mero de asistentes sea inferior al estipulado, la cantidad de $<B text={datos.fiesta.montoNumero} /> (<B text={datos.fiesta.montoLetra} /> 00/100 M.N.) Impuesto al Valor Agregado incluido, que ser?? pagado en <B text="EL ESTABLECIMIENTO" />, o bien, en el domicilio convencional se??alado por <B text="EL PROVEEDOR" /> en este Contrato, en Moneda Nacional, sin menoscabo de poderlo hacer en moneda extranjera al tipo de cambio publicado en el Diario Oficial de la Federaci??n al d??a en que el pago se efect??e.{"\n"}{"\n"}

              <B text="" /><B text="EL CONSUMIDOR" /> se obliga a realizar el pago de la forma siguiente:{"\n"}
              a)	La cantidad de $<B text={datos.fiesta.adelantoN} /> (<B text={datos.fiesta.adelantoL} /> 00/100 M.N.) Impuesto al Valor Agregado incluido, a la firma del presente Contrato, por concepto de anticipo, el cual corresponde al 50% del precio del servicio.{"\n"}
              b)	La cantidad restante, es decir, la cantidad de $<B text={datos.fiesta.restanteN} /> (<B text={datos.fiesta.restanteL} /> 00/100 M.N.) Impuesto al Valor Agregado incluido, que corresponde al 50% del precio total del servicio, se pagar??, por lo menos una hora antes de iniciar la <B text="FIESTA REC??RCHOLIS" />..{"\n"}{"\n"}

              Por el pago del anticipo, <B text="EL PROVEEDOR" /> deber?? expedir el comprobante respectivo, el que contendr?? por lo menos la siguiente informaci??n: nombre completo, raz??n social o denominaci??n social, fecha e importe del anticipo, nombre y firma de la persona debidamente autorizada que recibe el anticipo y el sello del ESTABLECIMIENTO, el nombre completo de <B text="EL CONSUMIDOR" />, la fecha, hora y tipo de <B text="FIESTA REC??RCHOLIS" />.{"\n"}{"\n"}

              Independientemente de la entrega del anticipo, <B text="EL PROVEEDOR" /> deber?? entregar al <B text="CONSUMIDOR" /> la factura o comprobante que ampare el pago total del servicio contratado, en la que se har?? constar detalladamente el nombre y precio de cada uno de los servicios proporcionados, esto con la finalidad de que <B text="EL CONSUMIDOR" /> pueda verificarlos a detalle; documento que deber?? cumplir los requisitos que se??alen las leyes aplicables.{"\n"}{"\n"}

              Cualquier costo o servicio adicional, que <B text="EL CONSUMIDOR" /> consienta expresamente, lo pagar?? y entregar?? al <B text="PROVEEDOR" />, de forma previa y oportuna al inicio de la <B text="FIESTA REC??RCHOLIS" />. {"\n"}{"\n"}

              <B text="CUARTA. - SERVICIOS ADICIONALES O EXCESO DE INVITADOS O PROLONGACI??N DE LA FIESTA REC??RCHOLIS." />{"\n"}
              <B text="EL PROVEEDOR" /> podr?? cobrar al <B text="CONSUMIDOR" /> antes de iniciar la <B text="FIESTA REC??RCHOLIS" /> y al momento de la liquidaci??n, una cantidad adicional para el caso de que se prolongue la duraci??n y/o el n??mero de invitados o servicios excedan de acuerdo con las cantidades indicadas en el <B text="ANEXO UNO" /> de este Contrato, para el caso; por lo que <B text="EL CONSUMIDOR" /> se obliga a pagar a <B text="EL PROVEEDOR" />, el excedente de los conceptos en ??l indicados. {"\n"}{"\n"}

              <B text="EL PROVEEDOR" /> podr?? prestar servicios adicionales, a la <B text="FIESTA RECORCHOLIS" /> contratada, siempre y cuando cuente con el consentimiento del <B text="CONSUMIDOR" />, de acuerdo con lo especificado en el <B text="ANEXO UNO" />. {"\n"}{"\n"}

              Montos que se adicionar??n a la suma total estipulada en la Cl??usula Tercera de este contrato; estos servicios adicionales est??n sujetos a la posibilidad de espacio en <B text="" /><B text="EL ESTABLECIMIENTO" />. {"\n"}
              <B text="QUINTA. - PROCEDIMIENTO DE CONTROL DEL SERVICIO." />{"\n"}
              A efecto de tener seguridad en cuanto al n??mero de asistentes a la <B text="FIESTA RECORCHOLIS" /> contratada, <B text="EL PROVEEDOR" /> establece como procedimiento de control y verificaci??n el siguiente:{"\n"}
              a) <B text="LAS PARTES" /> designar??n, cada uno, a una persona a efecto de que s??lo ingresen al lugar personas autorizadas por <B text="EL CONSUMIDOR" />, para lo cual, podr??n pactar el uso de boleto, contrase??a, listado y/o invitaci??n.{"\n"}
              b) <B text="EL CONSUMIDOR" /> se responsabiliza del pago del excedente de personas que haya autorizado ingresar a la <B text="FIESTA RECORCHOLIS" /> contratada.{"\n"}{"\n"}

              <B text="SEXTA. - CANCELACIONES Y CAMBIOS." />{"\n"}
              <B text="EL CONSUMIDOR" /> cuenta con un plazo de cinco (5) d??as h??biles contados a partir de la fecha de firma del presente contrato, para cancelar la prestaci??n del servicio contratado y sin responsabilidad alguna para <B text="LAS PARTES" />, siempre y cuando la fecha se??alada para que tenga verificativo la celebraci??n de la <B text="FIESTA RECORCHOLIS" />, se encuentre, por lo menos, a una distancia o espacio de diez (10) d??as h??biles de antelaci??n. En este caso, <B text="EL PROVEEDOR" /> se obliga a reintegrar todas las cantidades que <B text="EL CONSUMIDOR" /> le haya entregado en un lapso no mayor a veinte (20) d??as h??biles posteriores a la fecha de la solicitud de la cancelaci??n.  {"\n"}{"\n"}

              <B text="LAS PARTES" /> acuerdan que una vez transcurridos los (5) cinco d??as h??biles se??alados en la presente Cl??usula y en caso de que alguna de <B text="LAS PARTES" /> requiera cancelar la prestaci??n del servicio fuera del tiempo se??alado, la parte que solicite dicha cancelaci??n deber??:{"\n"}{"\n"}

              1.	Pagar el 20% sobre la cantidad correspondiente al anticipo, en caso de que la cancelaci??n se solicite hasta quince (15) d??as h??biles antes de la <B text="FIESTA REC??RCHOLIS" />.{"\n"}
              2.	Pagar el 50% sobre la cantidad correspondiente al anticipo, en caso de que la cancelaci??n se solicite hasta diez (10) d??as h??biles antes de la <B text="FIESTA REC??RCHOLIS" />.{"\n"}
              3.	Pagar el 100% sobre la cantidad correspondiente al anticipo, en caso de que la cancelaci??n se solicite hasta cinco (5) d??as h??biles antes de la <B text="FIESTA REC??RCHOLIS" />.{"\n"}{"\n"}

              EL CLIENTE podr??, siempre y cuando exista, por lo menos, una distancia o espacio de cinco (5) d??as h??biles de antelaci??n a la fecha de la <B text="FIESTA REC??RCHOLIS" />, se??alar diverso d??a y hora, inclusive, distinto ESTABLECIMIENTO y disponibilidad de d??a, hora y lugar y debiendo pagar, el 20% sobre el monto total del contrato, ello en atenci??n de los gastos que se erogan para una nueva preparaci??n y organizaci??n, pago que deber?? hacer al momento en que sea confirmado el cambio por EL CLIENTE. {"\n"}{"\n"}

              Tanto las cancelaciones, como, los cambios se??alados en esta cl??usula deber??n constar por escrito mediante formato que para tal efecto se proporcionar??, debidamente firmado por <B text="EL CONSUMIDOR" /> y entregado a <B text="EL PROVEEDOR" />, en los plazos se??alados, en el domicilio del <B text="PROVEEDOR" />, o bien, por correo registrado o certificado, tomando como fecha de revocaci??n la recepci??n para su env??o.   {"\n"}{"\n"}

              En caso de que la cancelaci??n haya sido solicitada por <B text="EL CONSUMIDOR" /> en los t??rminos estipulados en esta cl??usula, <B text="EL PROVEEDOR" /> deber?? reintegrar a <B text="EL CONSUMIDOR" />, la cantidad restante que resulte despu??s de haber aplicado el cobro o pago de la pena correspondiente.{"\n"}{"\n"}

              <B text="S??PTIMA. - DESIGNACI??N DE PERSONAL." />{"\n"}
              <B text="EL CONSUMIDOR" /> se obliga a designar a una persona de su confianza, qui??n durante la <B text="FIESTA REC??RCHOLIS" />, ser?? quien trate los asuntos relacionados con ??sta; asimismo, se obliga a abstenerse de dar instrucciones al personal del <B text="PROVEEDOR" />, que no tenga relaci??n con el objeto del presente contrato y a procurar que sus invitados observen la misma conducta. Por su parte <B text="EL PROVEEDOR" /> se obliga a designar, de entre su personal, a una persona que ser?? quien durante la <B text="FIESTA RECORCHOLIS" /> trate con el representante del <B text="CONSUMIDOR" /> o con ??l mismo, los asuntos relacionados con la <B text="FIESTA REC??RCHOLIS" /> y se obliga a que su personal atienda con esmero y cortes??a a los asistentes. {"\n"}{"\n"}

              <B text="OCTAVA. - REGLAMENTO DEL PROVEEDOR DEL SERVICIO." />{"\n"}
              <B text="EL CONSUMIDOR" /> se obliga a cumplir con las disposiciones reglamentarias que rijan <B text="EL ESTABLECIMIENTO" /> y a procurar que los asistentes a la <B text="FIESTA RECORCHOLIS" /> observen la misma conducta. Para tal efecto, <B text="EL PROVEEDOR" /> entrega, a la firma del presente Contrato, al <B text="CONSUMIDOR" /> una copia del reglamento respectivo en donde se fijan las disposiciones reglamentarias.{"\n"}{"\n"}

              <B text="NOVENA. - SUBCONTRATACI??N." />{"\n"}
              <B text="EL PROVEEDOR" /> es responsable ante <B text="EL CONSUMIDOR" /> por el incumplimiento de los servicios contratados, aun cuando subcontrate con terceros dicha prestaci??n.{"\n"}{"\n"}

              <B text="D??CIMA. - GUARDAROPA. " />{"\n"}
              Toda vez que <B text="EL PROVEEDOR" /> no cuenta con el servicio conocido como ???Guarda Ropa??? o an??logo, ni tampoco con vigilancia o resguardos para bienes muebles, equipos, insumos, aparatos electr??nicos o el??ctricos, tel??fonos, valores, regalos, ropa o prenda de vestir, accesorios personales, entre otros, no es responsable, ni repondr??, pagar??, restituir?? o reembolsar??, en todo o parte, el numerario generado por da??os, robos, p??rdidas o extrav??os cualquiera. {"\n"}{"\n"}


              <B text="D??CIMA PRIMERA. - GASTOS DE REPARACI??N O REPOSICI??N." />{"\n"}
              Si los bienes, insumos o instrumentos destinados para la <B text="FIESTA REC??RCHOLIS" />, sufrieren un menoscabo o da??o o p??rdida por culpa o negligencia del <B text="CONSUMIDOR" /> o de sus invitados o asistentes, debidamente comprobada, ??ste se obliga a cubrir los gastos de reparaci??n de los mismos, o en su caso, indemnizar al <B text="PROVEEDOR" /> hasta con un 50% (cincuenta por ciento) del valor comercial de los bienes afectados, considerando el desgaste habitual y estado actual de los bienes, as?? como del valor del bien da??ado que sea fehacientemente comprobable por parte del <B text="CONSUMIDOR" /> o sus invitados; en caso de que el da??o permita su c??moda reparaci??n, <B text="EL CONSUMIDOR" /> se obliga a pagar el 60% (sesenta por ciento) de la reparaci??n al <B text="PROVEEDOR" />. {"\n"}{"\n"}

              <B text="D??CIMA SEGUNDA. - AVISO DE PRIVACIDAD." />{"\n"}
              Previo a la firma del presente Contrato y en cumplimiento a lo dispuesto en la Ley Federal de Protecci??n de Datos Personales en Posesi??n de los Particulares, <B text="EL PROVEEDOR" /> hizo del conocimiento al <B text="CONSUMIDOR" /> el aviso de privacidad, as?? como, el procedimiento para ejercer los derechos de acceso, rectificaci??n, cancelaci??n y oposici??n al tratamiento de sus datos personales.{"\n"}{"\n"}

              <B text="D??CIMA TERCERA. - CASO FORTUITO Y/O FUERZA MAYOR." /> {"\n"}
              En caso de que <B text="EL PROVEEDOR" /> se encuentre imposibilitado para llevar a cabo la <B text="FIESTA REC??RCHOLIS" />, por caso fortuito o fuerza mayor, como incendio, temblor, disposici??n gubernamental, interrupci??n del servicio de energ??a el??ctrica u otros acontecimientos de la naturaleza o hechos del hombre ajenos a la voluntad del <B text="PROVEEDOR" />, no se incurrir?? en incumplimiento, ??nicamente <B text="EL PROVEEDOR" /> reintegrar?? al <B text="CONSUMIDOR" />, el anticipo que le hubiera entregado, o en su defecto, reprogramar la <B text="FIESTA REC??RCHOLIS" />, en posterior fecha disponible. {"\n"}{"\n"}

              <B text="D??CIMA CUARTA. - JURISDICCI??N Y COMPETENCIA." />{"\n"}
              <B text="LAS PARTES" /> determinan que la Procuradur??a Federal del Consumidor ser?? competente en la v??a administrativa para resolver cualquier controversia que se suscite sobre la interpretaci??n o cumplimiento del presente Contrato, en el mismo sentido, se someten expresamente a la jurisdicci??n y competencia de las leyes y Tribunales del Fuero Com??n de la Ciudad de M??xico, renunciando al fuero o competencia que pudiere corresponderle por la ubicaci??n de sus domicilios, presentes o futuros, o por cualquier otra causa.{"\n"}{"\n"}                        
            </Text>
            
            <Text style={styles.parrafoM}>
              "Este Contrato fue aprobado y registrado por la Procuradur??a
              Federal del Consumidor bajo el n??mero 158???2022 de fecha 14 de
              Enero del 2022. Cualquier variaci??n del presente Contrato en
              perjuicio del <B text="CONSUMIDOR" />, frente al Contrato de adhesi??n
              registrado, se tendr?? por no puesta."
            </Text>
            <Text style={{ ...styles.parrafoM, ...styles.bold }}>
              LE??DO, EXPLICADO Y ENTENDIDO QUE FUE EL CONTENIDO, ALCANCE Y
              FUERZA LEGAL DEL PRESENTE CONTRATO Y <B text="ANEXO UNO" />, <B text="LAS PARTES" /> LO
              FIRMAN DE CONFORMIDAD EN CADA UNA DE SUS____5___ HOJAS ??TILES QUE
              LO INTEGRAN, POR DUPLICADO, EN LA CIUDAD DE ____Mexico____, EL D??A
              __09__ DEL MES DE __FEBRERO__ DEL A??O __2023__.
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
              AUTORIZACI??N PARA LA UTILIZACI??N DE INFORMACI??N CON FINES MERCADOT??CNICOS O PUBLICITARIOS.{"\n"}
              <B text="EL CONSUMIDOR" /> si (  ) no (  ) acepta que <B text="EL PROVEEDOR" /> ceda o transmita a terceros, con fines mercadot??cnicos o publicitarios, la informaci??n proporcionada por ??l y con motivo del presente Contrato y, si (  ) no (  ) acepta que <B text="EL PROVEEDOR" /> le env??e publicidad sobre bienes, servicios y promociones; firma de autorizaci??n del Consumidor: __________________________________________.{"\n"}
 

            </Text>
           
          </View>
        </Page>
        <Page size="A4" style={styles.page}>
            <Text style={styles.parrafoM}>DISPOSICIONES REGLAMENTARIAS</Text>
            <Text>
              1.	Por ning??n motivo, introducir cualquier tipo de alimentos, bebidas, botanas, cohetes, pirotecnia, ajenos a <B text="EL ESTABLECIMIENTO" /> o <B text="FIESTA REC??RCHOLIS" /> contratada, a excepci??n de globos, pi??atas, pastel y/o dulces, que ser??n permitidos, siempre previo aviso y autorizaci??n del <B text="PROVEEDOR" />, salvo la goma de mascar (chicle) que en ning??n caso se permitir??n; en caso de pi??atas, ser?? en atenci??n a la posibilidad del espacio en <B text="EL ESTABLECIMIENTO" />.{"\n"}
              2.	Cumplir con las normas y disposiciones reglamentarias de <B text="EL ESTABLECIMIENTO" /> en el cu??l, tenga verificativo la <B text="FIESTA REC??RCHOLIS" />, las que se encuentran visibles y a su disposici??n.{"\n"}
              3.	Mantener el orden, as?? como, una conducta adecuada y de acuerdo con las buenas costumbres. {"\n"}
              4.	Evitar cualquier acci??n o agresi??n que ponga en riesgo la integridad f??sica y/o moral de los asistentes e invitados, incluidos, el personal del PROVEEDOR, clientes o visitantes del ESTABLECIMIENTO.{"\n"}
              5.	Realizar un adecuado uso de las instalaciones, mobiliario, insumos, m??quinas, juegos y dem??s bienes que sean puestos a su disposici??n para la realizaci??n de la <B text="FIESTA REC??RCHOLIS" />.{"\n"}
              6.	No realizar alteraciones o da??o alguno a los bienes y/o instalaciones de <B text="EL ESTABLECIMIENTO" />.{"\n"}
              7.	Cumplir con las reglas de acceso y uso que se encuentran visibles en cada ??rea, juego y/o atracci??n, entre otras, el uso de calcetas y bandas, estatura del ni??o(a); lo anterior por prevenci??n en materia de seguridad y cuidados de la integridad f??sica.{"\n"}
              8.	No promover o exigir ning??n tipo de exclusividad de cualquier ??rea que forme parte de <B text="EL ESTABLECIMIENTO" /> distinta a la reservada o destinada para la <B text="FIESTA REC??RCHOLIS" />, o bien, a la que se tenga derecho por virtud del contrato de prestaci??n de servicios, ni mucho menos, se podr?? exigir exclusividad alguna en horarios, m??quinas, juegos o cualquier otra atracci??n no incluida expresamente en la <B text="FIESTA REC??RCHOLIS" /> contratada.{"\n"}
              9.	Vigilar y resguardar sus propios bienes, valores, pertenencias, vestimentas, regalos, obsequios o accesorios de uso personal, mientras se encuentre en <B text="EL ESTABLECIMIENTO" />, ya que no se cuenta con el servicio de resguardo de objetos personales, por lo que <B text="EL PROVEEDOR" /> no se hace responsable por ning??n objeto perdido, entre otros, bolsas, zapatos, su??teres, c??maras de video y/o fotograf??a, celulares, regalos del festejado, y dem??s art??culos de uso personal, quedando como ??nico responsable el cliente. Incluyendo las pertenencias de los menores y/o invitados.{"\n"}
              10.	Entregar un documento que contenga la lista o relaci??n de los nombres completos, legibles, de todos y cada uno de los invitados o asistentes, cuando menos, treinta minutos antes de iniciar la <B text="FIESTA REC??RCHOLIS" /> contratada.{"\n"}
              11.	Cumplir, y hacer cumplir, estrictamente con el tiempo de duraci??n de la <B text="FIESTA REC??RCHOLIS" /> contratada, tanto en su inicio, como en su terminaci??n, as?? como el tiempo establecido para la preparaci??n y desalojo del ??rea reservada, en caso contrario, resultar?? aplicable el pago de tiempo adicional se??alado en el anexo del presente contrato, referido como hora de ampliaci??n de duraci??n, deslindando al <B text="PROVEEDOR" /> de cualquier responsabilidad por la negligencia o demora en que se incurra.{"\n"}
              12.	Para el caso de menores de edad y por razones de seguridad e integridad f??sica, los padres y/o tutores permanecer??n, vigilar??n y los cuidar??n durante todo el desarrollo de la <B text="FIESTA REC??RCHOLIS" /> contratada.{"\n"}
              13.	Entregar la informaci??n y datos necesarios para la preparaci??n y organizaci??n de la <B text="FIESTA REC??RCHOLIS" /> contratada, que se se??alan en el contrato de prestaci??n de servicios.{"\n"}
              14.	Una vez finalizado la <B text="FIESTA REC??RCHOLIS" /> contratada, desalojar y dejar libre el ??rea reservada y destinada para su celebraci??n, dentro del tiempo establecido en el presente contrato para llevar a cabo el desalojo del ??rea reservada.{"\n"}
                              
            </Text> 
        </Page>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.headerContato}>
              ANEXO UNO DE CONTRATO DE PRESTACI??N DE SERVICIO DE FIESTA
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
