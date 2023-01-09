import React, { Component } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function ModalVerDocumento() {
  const docs = [
    { uri: "https://diniz.com.mx/diniz/servicios/services/leerArchivo.php?file=25" },
  ];

  return <DocViewer documents={docs} />;
}

export default ModalVerDocumento;
