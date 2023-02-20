import React, { useRef, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  usePDF,
} from "@react-pdf/renderer";

import ReactPDF from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { Button } from "bootstrap";
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
  page: {
    display: "block",
    flexDirection: "column",
    backgroundColor: "",
    fontSize: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  bold: {
    fontFamily: "OpenSans",
  },
  section: {
    margin: "50px 30px",
    flexGrow: 1,
    border: "1px solid black",
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
});
var datos = {
  fecha: "3 DE ENERO DEL 2023",
  duracion: "3 HORAS",
  folio: "TCM­22021­2023",
  fiestologo: "MIGUEL",
  fiesta: {
    invitados: 15,
    folio: "TCM220212023",
    duracion: "3 HORAS",
    inicio: "13:00",
    fin: "16:00",
    fecha: "3 DE ENERO DEL 2023",
    ubicacion:
      " CALZADA ACOXPA 610, COAPA, EQUIPAMIENTO PLAZA COAPA, TLALPAN, 14390, CIUDAD DE MÉXICO, CDMX ",
    montoLetra: "CINCO MIL OCHOCIENTOS NOVENTA Y CINCO",
    montoNumero: "5,895",
  },
  cliente: {
    nombre: "ALEJANDRA BUSTAMANTES SANCHEZ",
    domicilio:
      "CALZADA ACOXPA AND 9, Delegación CDMX Código Postal 14390, CDMX",
    telefono: "55121254555",
    correo: "alejandrina2001@hotmail.com",
  },
};
const ContratoFiesta = (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.headerContato}>
          CONTRATO DE PRESTACIóN DE SERVICIO DE EVENTOS SOCIALES
        </Text>
        <Text style={styles.headerContato}>
          Folio: <Text style={styles.bold}>{datos.folio}</Text>
        </Text>

        <Text wrap={false}>
          QUE CELEBRAN POR UNA PARTE LA SOCIEDAD MERCANTIL DENOMINADA{" "}
          <Text style={styles.bold}>RECREFAM, S.A. DE C.V.</Text>, EN LO
          SUCESIVO IDENTIFICADA COMO{" "}
          <Text style={styles.bold}>EL PROVEEDOR</Text> , REPRESENTADA POR
          {datos.fiestologo} Y POR OTRO LADO{" "}
          <Text style={styles.bold}>C.{" " + datos.cliente.nombre} </Text> ,EN
          LO SUBSECUENTE DENOMINADO{" "}
          <Text style={styles.bold}>EL CONSUMIDOR</Text>, EN LO SUCESIVO
          IDENTIFICADOS COMO <Text style={styles.bold}>LAS PARTES</Text>, AL
          TENOR DE LAS SIGUIENTES DEFINICIONES, DECLARACIONES Y CLAUSULAS:
        </Text>
        <Text style={styles.headerContato}>DEFINICIONES</Text>
        <Text>
          Para todos los efectos legales derivados del presente contrato, se
          entiende por:
        </Text>

        <Text style={styles.bold}></Text>
        <Text>
          <Text style={styles.bold}>1. FIESTA RECÓRCHOLIS:</Text>
          Celebración organizada por Recórcholis!.
        </Text>
        <Text>
          <Text style={styles.bold}>2. TARJETA RECORCARD PRECARGADA:</Text>
          Tarjeta necesaria para el acceso a las atracciones y juegos que hay en
          EL ESTABLECIMIENTO, cargadas con BONUS de acuerdo con lo elegido y a
          un equivalente en pesos moneda nacional.
        </Text>
        <Text>
          <Text style={styles.bold}>3. KOSHER:</Text>
          Alimentos que respetan las prescripciones rituales del judaísmo y, por
          tanto, se consideran apropiados para consumirse por la comunidad
          judía. Aplicado específicamente al pastel y a la pizza.
        </Text>
        <Text>
          <Text style={styles.bold}>4. BONUS:</Text>
          Dinero electrónico, que se carga a la tarjeta Recorcard. Un Bonus
          equivale a un peso.
        </Text>
        <Text>
          <Text style={styles.bold}>5. ÁREA GAMES:</Text>
          Espacio con videojuegos, juegos de destreza y simuladores.
        </Text>
        <Text>
          <Text style={styles.bold}>6. ÁREA KIDS:</Text>
          Espacio de estimulación temprana, acondicionada para niños de 80 cm a
          120 cm de estatura.
        </Text>
        <Text>
          <Text style={styles.bold}>7.ÁREA BOWLING:</Text>
          Espacio conformado por pistas de boliche profesionales, recomendado
          para niños de 6 años en adelante.
        </Text>
        <Text>
          <Text style={styles.bold}>8. ÁREA ICE:</Text>
          Espacio de pista de patinaje sobre hielo, recomendado para niños de 6
          años en adelante.
        </Text>
        <Text>
          <Text style={styles.bold}> 9. AREA UPA: </Text>
          Espacio confirmado por trampolines profesionales, recomendado para
          niños de 6 años en adelante.
        </Text>
        <Text>
          <Text style={styles.bold}>10. RECORCHOLITA:</Text>
          Caja pequeña de cartón exclusiva de Recórcholis! ®, que contiene el
          menú infantil.
        </Text>
        <Text>
          <Text style={styles.bold}>11. FIESTÓLOG@:</Text>
          Experto en la animación y organización de la FIESTA RECÓRCHOLIS.
        </Text>
        <Text style={styles.headerContato}>DECLARACIONES</Text>
        <Text>I. Declara "EL PROVEEDOR" lo siguiente:</Text>
        <Text>
          <Text></Text>
          a) Ser una Persona Moral constituida conforme a las leyes de los
          Estados Unidos Mexicanos, tal y como consta en el testimonio de la
          Escritura Pública número 62,621, de fecha 26 de agosto de 1998,
          otorgada ante la fe del Licenciado Armando Gálvez Pérez Aragón,
          Notario Público Número 103 del Distrito Federal, inscrita en el
          Registro Público de Comercio de la Ciudad de México, en el Folio
          Mercantil número 241,738, de fecha 15 de septiembre de 1998.
        </Text>
        <Text>
          b) Que su representante interviene en este acto con las facultades
          conferidas por EL PROVEEDOR, en su calidad de factor y/o dependiente
          y/o gerente, facultades que se ratifican en la fecha de firma de este
          contrato.
        </Text>
        <Text>
          c Que su domicilio se ubica en Boulevard Adolfo López Mateos número
          1832, Lomas de San ángel Inn, Código Postal 01790, álvaro Obregón, en
          la Ciudad de México; el cual señala como domicilio convencional para
          los efectos legales del presente contrato, así como el teléfono de
          atención 01800 8818811 y mail eventos@grupodiniz.com.mx.
        </Text>
        <Text>
          d Que se encuentra inscrita en el Registro Federal de Contribuyentes
          con la clave REC 980827TR6
        </Text>
        <Text>
          e Que cumple con las licencias, permisos, avisos, certificados y
          autorizaciones previstas en las disposiciones legales, normas vigentes
          y estatutarias que correspondan.
        </Text>
        <Text>
          f) Para la atención de dudas, aclaraciones y reclamaciones, señala el
          teléfono 01800 8818811 y correo electrónico:
          eventos@grupodiniz.com.mxdentro de un horario de 9:00 a 20:00 horas,
          de lunes a viernes y sábado y domingo de 12:00 a 20:00 horas.
        </Text>
        <Text>II. Declara EL CONSUMIDOR lo siguiente:</Text>
        {/*Persona Fisica */}
        <>
          <Text>En caso de Persona Física:</Text>
          <Text>
            a) Es una persona física de nacionalidad Mexicana, con suficiente
            capacidad para obligarse en los términos del presente Contrato.
          </Text>
          <Text>
            b) Su domicilio se encuentra ubicado en la calle
            {" " + datos.cliente.domicilio + " "}, el cual señala como domicilio
            convencional para todos los efectos legales del presente Contrato,
            número de teléfono
            {" " + datos.cliente.telefono + " "}y correo electrónico
            {" " + datos.cliente.correo + " "}.
          </Text>
          <Text>
            c) Manifiesta contar con los recursos financieros suficientes para
            obligarse a lo estipulado en este contrato.
          </Text>
          <Text>
            d) Que se encuentra inscrita en el Registro Federal de
            Contribuyentes con la clave __.
          </Text>
          <Text>
            e) Que recibió de EL PROVEEDOR toda la información, montos,
            descripción y especificaciones relativas al servicio objeto del
            presente Contrato.
          </Text>
        </>
        {/* Personas morales */}
        <>
          <Text>En caso de Persona Moral:</Text>
          <Text>
            a) Ser una persona moral constituida conforme a las leyes de los
            Estados Unidos Mexicanos, tal y como consta en la Escritura Pública
            número ____, de fecha _____, otorgada ante la fe del Licenciado ﴾a﴿
            ________, Notario Público Número __ de _____, inscrita en el
            Registro Público de Comercio de ______, en el Folio Mercantil número
            ______, de fecha ______.
          </Text>
          <Text>
            b) Que su apoderado cuenta con las facultades y poderes suficientes
            para celebrar el presente Contrato, tal y como se desprende de la
            Escritura Pública número ___ de fecha _______, otorgada ante la fe
            del Notario Público número __ de ______, Licenciado a ______, los
            cuales, se encuentran vigentes, sin que hayan sido revocados o
            modificados.
          </Text>
          <Text>
            c) Su domicilio se encuentra ubicado en la calle _____, número __,
            Colonia ____, Delegación _____, Código Postal ______, en _____, el
            cual señala como domicilio convencional para todos los efectos del
            presente Contrato.
          </Text>
          <Text>
            d) Que recibió de EL PROVEEDOR toda la información, montos,
            descripción y especificaciones relativas al servicio objeto del
            presente Contrato.
          </Text>
          <Text>
            e) Manifiesta contar con los recursos financieros suficientes para
            obligarse a lo estipulado en este contrato.
          </Text>
          <Text>
            f) Que se encuentra inscrita en el Registro Federal de
            Contribuyentes con la clave ____
          </Text>
        </>
        <Text>
          <Text style={styles.bold}>LAS PARTES</Text> reconocen que las
          anteriores Declaraciones son correctas y vinculativas, por lo que
          forman parte integrante del presente Contrato, en tal virtud,
          teniéndolas en consideración, así como, su libre voluntad en asumir
          obligaciones recíprocas, convienen en obligarse a las siguientes:
        </Text>
        <Text style={styles.headerContato}>CLAUSULAS</Text>
        <Text style={styles.parrafoM}>
          <Text style={styles.bold}>
            PRIMERA. - CONSENTIMIENTO. LAS PARTES{" "}
          </Text>
          manifiestan su voluntad para celebrar el presente Contrato, por lo que
          <Text style={styles.bold}> EL PROVEEDOR</Text> se obliga a prestar el
          servicio de
          <Text style={styles.bold}> FIESTA RECÓRCHOLIS</Text> a
          <Text style={styles.bold}> EL CONSUMIDOR</Text>, quién se obliga a
          pagar, como contraprestación, un precio cierto y determinado.
        </Text>
        <Text style={styles.parrafoM}>
          <Text style={styles.bold}>SEGUNDA. - OBJETO. </Text>
          El objeto del presente Contrato es la prestación de servicio de{" "}
          <Text style={styles.bold}>FIESTA RECÓRCHOLIS</Text>, para un número
          determinado de {datos.fiesta.invitados} personas; el cual se llevará a
          cabo el día <Text style={styles.bold}>{datos.fecha}</Text> con una
          duración de {" " + datos.fiesta.duracion + " "}, iniciando a las{" "}
          {" " + datos.fiesta.inicio + " "} horas y terminando a las{" "}
          {" " + datos.fiesta.fin + " "} horas, en{" "}
          <Text style={styles.bold}>EL ESTABLECIMIENTO</Text> ubicado en
          {datos.fiesta.ubicacion} precisando que{" "}
          <Text style={styles.bold}>EL CONSUMIDOR</Text> e invitados dispondrán
          de un tiempo máximo de treinta minutos, contados a partir de la
          finalización de la <Text style={styles.bold}>FIESTA RECóRCHOLIS</Text>
          , para desalojar el espacio donde tuvo verificativo.
        </Text>
        <Text style={styles.parrafoM}>
          La <Text style={styles.bold}>FIESTA RECÓRCHOLIS</Text> incluye lo
          estipulado en el
          <Text style={styles.bold}>ANEXO UNO </Text> del presente Contrato, por
          lo que <Text style={styles.bold}>EL PROVEEDOR</Text>, no podrá incluir
          o hacer el cobro por algún otro concepto que no sea materia de este
          Contrato; salvo consentimiento del{" "}
          <Text style={styles.bold}>CONSUMIDOR</Text>.
        </Text>
        <Text style={styles.parrafoM}>
          <Text style={styles.bold}>TERCERA.- PAGO DEL SERVICIO.</Text>
          <Text style={styles.bold}>EL CONSUMIDOR</Text> se obliga a pagar a
          favor del <Text style={styles.bold}>PROVEEDOR</Text> como
          contraprestación de la{" "}
          <Text style={styles.bold}>FIESTA RECÓRCHOLIS</Text>, sin importar que
          el número de asistentes sea inferior al estipulado, la cantidad de $
          {datos.fiesta.montoNumero} ({}
          <Text style={styles.bold}>{datos.fiesta.montoLetra}</Text>) más el
          Impuesto al Valor Agregado, que será pagado en{" "}
          <Text style={styles.bold}>EL ESTABLECIMIENTO</Text>, o bien, en el
          domicilio convencional señalado por{" "}
          <Text style={styles.bold}>EL PROVEEDOR</Text> en este Contrato, en
          Moneda Nacional, sin menoscabo de poderlo hacer en moneda extranjera
          al tipo de cambio publicado en el Diario Oficial de la Federación al
          día en que el pago se efectúe.
        </Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.parrafoM}>
          a) La cantidad de{" "}
          <Text style={styles.bold}>
            ${datos.fiesta.montoNumero} ({datos.fiesta.montoLetra + " "}){" "}
          </Text>
          más el Impuesto al Valor Agregado, a la firma del presente Contrato,
          por concepto de anticipo, el cual corresponde al 50% del precio del
          servicio.
        </Text>
        <Text style={styles.parrafoM}>
          b) La cantidad restante, es decir, la cantidad de $2,992.50 ( DOS MIL
          NOVECIENTOS NOVENTA Y DOS PESOS 50/100 M.N.) más el Impuesto al Valor
          Agregado, que corresponde al 50% del precio total del servicio, se
          pagará , a más tardar, antes de iniciar la FIESTA RECÓRCHOLIS..
        </Text>
        <Text style={styles.parrafoM}>
          Por el pago del anticipo, EL PROVEEDOR deberá expedir el comprobante
          respectivo, el que contendrá por lo menos la siguiente información:
          nombre completo, razón social o denominación social, fecha e importe
          del anticipo, nombre y firma de la persona debidamente autorizada que
          recibe el anticipo y el sello del ESTABLECIMIENTO, el nombre completo
          de EL CONSUMIDOR, la fecha, hora y tipo de FIESTA RECÓRCHOLIS.
        </Text>
        <Text style={styles.parrafoM}>
          Independientemente de la entrega del anticipo, EL PROVEEDOR deberá
          entregar al CONSUMIDOR la factura o comprobante que ampare el pago
          total del servicio contratado, en la que se hará constar
          detalladamente el nombre y precio de cada uno de los servicios
          proporcionados, esto con la finalidad de que EL CONSUMIDOR pueda
          verificarlos a detalle; documento que deberá cumplir los requisitos
          que señalen las leyes aplicables. Cualquier costo o servicio
          adicional, que EL CONSUMIDOR consienta expresamente, lo pagará y
          entregará al PROVEEDOR, de forma previa y oportuna al inicio de la
          FIESTA RECÓRCHOLIS.
        </Text>
        <Text style={styles.parrafoM}>
          CUARTA. ‐ SERVICIOS ADICIONALES O EXCESO DE INVITADOS O PROLONGACIóN
          DE LA FIESTA RECÓRCHOLIS. EL PROVEEDOR podrá cobrar al CONSUMIDOR
          antes de iniciar la FIESTA RECÓRCHOLIS y al momento de la liquidación,
          cualquiera de las cantidades indicadas en el ANEXO UNO de este
          Contrato, para el caso; por lo que EL CONSUMIDOR se obliga a pagar a
          EL PROVEEDOR, el excedente de los conceptos en él indicados.
        </Text>
        <Text style={styles.parrafoM}>
          EL PROVEEDOR podrá prestar servicios adicionales, a la FIESTA
          RECORCHOLIS contratada, siempre y cuando cuente con el consentimiento
          del CONSUMIDOR, de acuerdo con lo especificado en el ANEXO UNO. Montos
          que se adicionarán a la suma total estipulada en la Cláusula Tercera
          de este contrato; estos servicios adicionales están sujetos a la
          posibilidad de espacio en EL ESTABLECIMIENTO.
        </Text>
        <Text style={styles.parrafoM}>
          QUINTA. ‐ PROCEDIMIENTO DE CONTROL DEL SERVICIO.
        </Text>
        <Text>
          A efecto de tener seguridad en cuanto al número de asistentes a la
          FIESTA RECORCHOLIS contratada, EL PROVEEDOR establece como
          procedimiento de control y verificación el siguiente:
        </Text>
        <Text>
          a﴿ LAS PARTES designarán, cada uno, a una persona a efecto de que sólo
          ingresen al lugar personas autorizadas por EL CONSUMIDOR, para lo
          cual, podrán pactar el uso de boleto, contraseña, listado y/o
          invitación.
        </Text>
        <Text>
          b﴿ EL CONSUMIDOR se responsabiliza del pago del excedente de personas
          que haya autorizado ingresar a la FIESTA RECORCHOLIS contratada.{" "}
        </Text>
        <Text>SEXTA. ‐ CANCELACIONES Y CAMBIOS.</Text>
        <Text style={styles.parrafoM}>
          EL CONSUMIDOR cuenta con un plazo de cinco ﴾5﴿ días hábiles contados a
          partir de la fecha de firma del presente contrato, para cancelar la
          prestación del servicio contratado y sin responsabilidad alguna para
          LAS PARTES, siempre y cuando la fecha señalada para que tenga
          verificativo la celebración de la FIESTA RECORCHOLIS, se encuentre,
          por lo menos, a una distancia o espacio de diez ﴾10﴿ días hábiles de
          antelación. En este caso, EL PROVEEDOR se obliga a reintegrar todas
          las cantidades que EL CONSUMIDOR le haya entregado en un lapso no
          mayor a cinco ﴾5﴿ días hábiles posteriores a la fecha de la solicitud
          de la cancelación.
        </Text>
        <Text style={styles.parrafoM}>
          LAS PARTES acuerdan que una vez transcurridos los ﴾5﴿ cinco días
          hábiles señalados en la presente Cláusula y en caso de que alguna de
          LAS PARTES requiera cancelar la prestación del servicio fuera del
          tiempo señalado, la parte que solicite dicha cancelación deberá:
        </Text>
        <Text style={styles.parrafoM} wrap={true}>
          1. Pagar el 20% sobre la cantidad correspondiente al anticipo, en caso
          de que la cancelación se solicite hasta quince ﴾15﴿ días hábiles antes
          de la FIESTA RECÓRCHOLIS.
        </Text>
        <Text style={styles.parrafoM}>
          2. Pagar el 50% sobre la cantidad correspondiente al anticipo, en caso
          de que la cancelación se solicite hasta diez ﴾10﴿ días hábiles antes
          de la FIESTA RECÓRCHOLIS.
        </Text>
        <Text style={styles.parrafoM}>
          3. Pagar el 100% sobre la cantidad correspondiente al anticipo, en
          caso de que la cancelación se solicite hasta cinco ﴾5﴿ días hábiles
          antes de la FIESTA RECÓRCHOLIS.
        </Text>
        <Text style={styles.parrafoM}>
          EL CLIENTE podrá, siempre y cuando exista, por lo menos, una distancia
          o espacio de cinco ﴾5﴿ días hábiles de antelación a la fecha de la
          FIESTA RECÓRCHOLIS, señalar diverso día y hora, inclusive, distinto
          ESTABLECIMIENTO y disponibilidad de día, hora y lugar y debiendo
          pagar, el 20% sobre el monto total del contrato, ello en atención de
          los gastos que se erogan para una nueva preparación y organización,
          pago que deberá hacer al momento en que sea confirmado el cambio por
          EL CLIENTE.
        </Text>
        <Text style={styles.parrafoM}>
          Tanto las cancelaciones, como, los cambios señalados en esta cláusula,
          deberán constar por escrito mediante formato que para tal efecto se
          proporcionará, debidamente firmado por EL CONSUMIDOR y entregado a EL
          PROVEEDOR, en los plazos señalados, en el domicilio del PROVEEDOR, o
          bien, por correo registrado o certificado, tomando como fecha de
          revocación la recepción para su envío.
        </Text>
        <Text style={styles.parrafoM}>
          En caso de que la cancelación haya sido solicitada por EL CONSUMIDOR
          en los términos estipulados en esta cláusula, EL PROVEEDOR deberá
          reintegrar a EL CONSUMIDOR, la cantidad restante que resulte después
          de haber aplicado el cobro o pago de la pena correspondiente.
        </Text>
        <Text>SÉPTIMA. ‐ DESIGNACIÓN DE PERSONAL.</Text>
        <Text style={styles.parrafoM}>
          EL CONSUMIDOR se obliga a designar a una persona de su confianza,
          quién durante la FIESTA RECÓRCHOLIS, será quien trate los asuntos
          relacionados con ésta; asimismo, se obliga a abstenerse de dar
          instrucciones al personal de EL PROVEEDOR, que no tenga relación con
          el objeto del presente contrato y a procurar que sus invitados
          observen la misma conducta. Por su parte EL PROVEEDOR se obliga a
          designar, de entre su personal, a una persona que será quien durante
          la FIESTA RECORCHOLIS trate con el representante del CONSUMIDOR o con
          él mismo, los asuntos relacionados con la FIESTA RECÓRCHOLIS y se
          obliga a que su personal atienda con esmero y cortesía a los
          asistentes.
        </Text>
        <Text>OCTAVA. ‐ REGLAMENTO DEL PROVEEDOR DEL SERVICIO.</Text>
        <Text style={styles.parrafoM}>
          EL CONSUMIDOR se obliga a cumplir con las disposiciones reglamentarias
          que rijan EL ESTABLECIMIENTO y a procurar que los asistentes a la
          FIESTA RECORCHOLIS observen la misma conducta. Para tal efecto, EL
          PROVEEDOR entrega, a la firma del presente Contrato, al CONSUMIDOR una
          copia del reglamento respectivo en donde se fijan las disposiciones
          reglamentarias.
        </Text>
        <Text>NOVENA. ‐ SUBCONTRATACIóN</Text>
        <Text style={styles.parrafoM}>
          EL PROVEEDOR es responsable ante EL CONSUMIDOR por el incumplimiento
          de los servicios contratados, aun cuando subcontrate con terceros
          dicha prestación.
        </Text>
        <Text>DÉCIMA. ‐ GUARDAROPA.</Text>
        <Text style={styles.parrafoM}>
          Toda vez que EL PROVEEDOR no cuenta con el servicio conocido como
          "Guarda Ropa" o análogo, ni tampoco con vigilancia o resguardos para
          bienes muebles, equipos, insumos, aparatos electrónicos o eléctricos,
          teléfonos, valores, regalos, ropa o prenda de vestir, accesorios
          personales, entre otros, no es responsable, ni repondrá, pagará,
          restituirá o reembolsará, en todo o parte, el numerario generado por
          daños, robos, pérdidas o extravíos cualquiera.
        </Text>
        <Text style={styles.parrafoM}>
          DÉCIMA PRIMERA. ‐ GASTOS DE REPARACIÓN O REPOSICIÓN. Si los bienes,
          insumos o instrumentos destinados para la FIESTA RECÓRCHOLIS,
          sufrieren un menoscabo o daño o pérdida por culpa o negligencia del
          CONSUMIDOR o de sus invitados o asistentes, debidamente comprobada,
          éste se obliga a cubrir los gastos de reparación de los mismos, o en
          su caso, indemnizar al PROVEEDOR hasta con un 50% ﴾cincuenta por
          ciento﴿ del valor comercial de los bienes afectados; en caso de que el
          daño permita su cómoda reparación, EL CONSUMIDOR se obliga a pagar el
          60% ﴾sesenta por ciento﴿ de la reparación al PROVEEDOR.
        </Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.bold}>DéCIMA SEGUNDA. ‐ AVISO DE PRIVACIDAD.</Text>
        <Text style={styles.parrafoM}>
          Previo a la firma del presente Contrato y en cumplimiento a lo
          dispuesto en la Ley Federal de Protección de Datos Personales en
          Posesión de los Particulares, EL PROVEEDOR hizo del conocimiento al
          CONSUMIDOR el aviso de privacidad, así como, el procedimiento para
          ejercer los derechos de acceso, rectificación, cancelación y oposición
          al tratamiento de sus datos personales. DéCIMA TERCERA. - CASO
          FORTUITO Y/O FUERZA MAYOR.
        </Text>
        <Text style={styles.parrafoM}>
          x En caso de que EL PROVEEDOR se encuentre imposibilitado para llevar
          a cabo la FIESTA RECÓRCHOLIS, por caso fortuito o fuerza mayor, como
          incendio, temblor, disposición gubernamental, interrupción del
          servicio de energía eléctrica u otros acontecimientos de la naturaleza
          o hechos del hombre ajenos a la voluntad dEL PROVEEDOR, no se
          incurrirá en incumplimiento, únicamente EL PROVEEDOR reintegrará al
          CONSUMIDOR, el anticipo que le hubiera entregado, o en su defecto,
          reprogramar la FIESTA RECÓRCHOLIS, en posterior fecha disponible.
        </Text>
        <Text style={styles.bold}>
          DÉCIMA CUARTA. - JURISDICCIÓN Y COMPETENCIA.
        </Text>
        <Text style={styles.parrafoM}>
          LAS PARTES determinan que la Procuraduría Federal del Consumidor será
          competente en la vía administrativa para resolver cualquier
          controversia que se suscite sobre la interpretación o cumplimiento del
          presente Contrato, en el mismo sentido, se someten expresamente a la
          jurisdicción y competencia de las leyes y Tribunales del Fuero Común
          de la Ciudad de México, renunciando al fuero o competencia que pudiere
          corresponderle por la ubicación de sus domicilios, presentes o
          futuros, o por cualquier otra causa.{" "}
        </Text>
        <Text style={styles.parrafoM}>
          "Este Contrato fue aprobado y registrado por la Procuraduría Federal
          del Consumidor bajo el número 158‐2022 de fecha 14 de Enero del 2022.
          Cualquier variación del presente Contrato en perjuicio del CONSUMIDOR,
          frente al Contrato de adhesión registrado, se tendrá por no puesta."
        </Text>
        <Text style={{ ...styles.parrafoM, ...styles.bold }}>
          LEÍDO, EXPLICADO Y ENTENDIDO QUE FUE EL CONTENIDO, ALCANCE Y FUERZA
          LEGAL DEL PRESENTE CONTRATO Y ANEXO UNO, LAS PARTES LO FIRMAN DE
          CONFORMIDAD EN CADA UNA DE SUS____5___ HOJAS ÚTILES QUE LO INTEGRAN,
          POR DUPLICADO, EN LA CIUDAD DE ____Mexico____, EL DíA __09__ DEL MES
          DE __FEBRERO__ DEL AÑO __2023__.
        </Text>
        <Text style={{ ...styles.margin20, ...styles.bold, ...styles.firma }}>
          EL CONSUMIDOR
        </Text>
        <Text style={{ ...styles.bold, ...styles.firma }}>
          C. {datos.cliente.nombre}
        </Text>
        <Text style={{ ...styles.parrafoM, ...styles.firma }}>
          FIRMA Y NOMBRE COMPLETO
        </Text>
        <Text style={styles.margin100}></Text>
        <Text style={{ ...styles.margin20, ...styles.bold, ...styles.firma }}>
          EL PROVEEDOR
        </Text>
        <Text style={{ ...styles.bold, ...styles.firma }}>
          C. {datos.fiestologo}
        </Text>
        <Text style={{ ...styles.parrafoM, ...styles.firma }}>
          FIRMA Y NOMBRE COMPLETO
        </Text>

        <Text style={styles.parrafoM}>
          AUTORIZACIÓN PARA LA UTILIZACIÓN DE INFORMACIÓN CON FINES
          MERCADOTÉCNICOS O PUBLICITARIOS. EL CONSUMIDOR si ﴾ ﴿ no ﴾ ﴿ acepta
          que EL PROVEEDOR ceda o transmita a terceros, con fines
          mercadotécnicos o publicitarios, la información proporcionada por él y
          con motivo del presente Contrato y, si ﴾ ﴿ no ﴾ ﴿ acepta que EL
          PROVEEDOR le envíe publicidad sobre bienes, servicios y promociones;
          firma de autorización del Consumidor:
          _________________________________________________.
        </Text>
        <Text style={styles.parrafoM}>DISPOSICIONES REGLAMENTARIAS</Text>
        <Text>
          1. Por ningún motivo, introducir cualquier tipo de alimentos, bebidas,
          botanas, cohetes, pirotecnia, ajenos a EL ESTABLECIMIENTO o FIESTA
          RECÓRCHOLIS contratada, a excepción de globos, piñatas, pastel y/o
          dulces, que serán permitidos, previo aviso y autorización del
          PROVEEDOR, salvo la goma de mascar﴾chicle﴿ en ningún caso se
          permitirán; en caso de piñ, serán en atención a la posibilidad del
          espacio en EL ESTABLECIMIENTO
        </Text>
        <Text>
          2. Cumplir con las normas y disposiciones reglamentarias de EL
          ESTABLECIMIENTO en el cuál, tenga verificativo la FIESTA RECÓRCHOLIS,
          las que se encuentran visibles y a su disposición.
        </Text>
        <Text>
          3. Mantener el orden, así como, una conducta adecuada y de acuerdo con
          las buenas costumbres.{" "}
        </Text>
        <Text>
          4. Evitar cualquier acción o agresión que ponga en riesgo la
          integridad física y/o moral de los asistentes e invitados, incluidos,
          el personal dEL PROVEEDOR, clientes o visitantes del ESTABLECIMIENTO.
        </Text>
        <Text>
          5. Realizar un adecuado uso de las instalaciones, mobiliario, insumos,
          máquinas, juegos y demás bienes que sean puestos a su disposición para
          la realización de la FIESTA RECÓRCHOLIS.
        </Text>
        <Text>
          6. No realizar alteraciones o daño alguno a los bienes y/o
          instalaciones de EL ESTABLECIMIENTO.
        </Text>
        <Text>
          7. Cumplir con las reglas de acceso y uso que se encuentran visibles
          en cada área, juego y/o atracción, entre otras, el uso de calcetas y
          bandas, estatura del niño﴾a﴿; lo anterior por prevención en materia de
          seguridad y cuidados de la integridad física.
        </Text>
        <Text>
          9. Vigilar y resguardar sus propios bienes, valores, pertenencias,
          vestimentas, regalos, obsequios o accesorios de uso personal, mientras
          se encuentre en EL ESTABLECIMIENTO, ya que no se cuenta con el
          servicio de resguardo de objetos personales, por lo que EL PROVEEDOR
          no se hace responsable por ningún objeto perdido, entre otros, bolsas,
          zapatos, suéteres, cámaras de video y/o fotografía, celulares, regalos
          del festejado, y demás artículos de uso personal, quedando como único
          responsable el cliente. Incluyendo las pertenencias de los menores y/o
          invitados.{" "}
        </Text>
        <Text>
          10. Entregar un documento que contenga la lista o relación de los
          nombres completos, legibles, de todos y cada uno de los invitados o
          asistentes, cuando menos, treinta minutos antes de iniciar la FIESTA
          RECÓRCHOLIS contratada.
        </Text>
        <Text>
          11. Cumplir, y hacer cumplir, estrictamente con el tiempo de duración
          de la FIESTA RECÓRCHOLIS contratada, tanto en su inicio, como en su
          terminación, así como el tiempo establecido para la preparación y
          desalojo del área reservada, en caso contrario, resultará aplicable el
          pago de tiempo adicional en términos del presente contrato y su anexo,
          deslindando al PROVEEDOR de cualquier responsabilidad por la
          negligencia o demora en que se incurra.
        </Text>
        <Text>
          12. Para el caso de menores de edad y por razones de seguridad e
          integridad física, los padres y/o tutores permanecerán, vigilarán y
          los cuidarán durante todo el desarrollo de la FIESTA RECóRCHOLIS
          contratada.
        </Text>
        <Text>
          13. Entregar la información y datos necesarios para la preparación y
          organización de la FIESTA RECóRCHOLIS contratada, que se señalan en el
          contrato de prestación de servicios.
        </Text>
        <Text>
          14. Una vez finalizado la FIESTA RECÓRCHOLIS contratada, desalojar y
          dejar libre el área reservada y destinada para su celebración, dentro
          del tiempo establecido en el presente contrato para llevar a cabo el
          desalojo del área reservada.
        </Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text style={styles.parrafoM}></Text>
        <Text></Text>
      </View>
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
  </Document>
);
const ModuleContrato = () => {
  const [url, setUrl] = useState("");
    const DescargaPDF = () => {
    const [instance, updateInstance] = usePDF({ document: ContratoFiesta });
    const [enviado, setenviado] = useState(false);
    if (instance.loading) return <div>Cargando ...</div>;
    if (instance.error) return <div>Error</div>;
    // console.log(instance.url);
    if (instance.url != null && enviado === false) {
      setenviado(true);
      fetch(instance.url)
        .then((response) => response.blob())
        .then((archivoBlob) => {
          const solicitud = new XMLHttpRequest();
          solicitud.open("POST", "http://localhost/p.php?folio="+datos.fiesta.folio);
          solicitud.setRequestHeader("Content-Type", "application/pdf");
          solicitud.send(archivoBlob);
        });
    }
    return (
      <a href={instance.url} download="test.pdf">
        Descargar
      </a>
    );
  };
  return (
    <>
      {/* <DescargaPDF />
      <PDFViewer width={1500} height={800}>
        {ContratoFiesta}
      </PDFViewer> */}
      <input type="file" accept="image/*" capture="camera"></input>
    </>
  );
}
