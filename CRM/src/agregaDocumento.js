import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregaDocumento = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 14, width: 30, height: 30 }}
        title = "Agregar Documento"
      >
        <span className="fas fa-file-pdf" />
      </Button>
      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
        title = "Agregar Documento"
      >
        <ModalHeader toggle={toggle} className="bg-info text-white">
          Agrega Documento{" "}
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={2}>
              <Label>Documento</Label>
            </Col>
            <Col sm={10}>
              <Input id="txtPDF" type="text" bsSize="sm" />
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={10}>
              <Input
                outline
                color="info"
                style={{ textAlign: "center", fontSize: 12 }}
                type="file"
                id="file"
                name="file"
                onClick={props.onChangeHandler1}
                accept=".pdf"
                required
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="secondary" outline onClick={toggle}>
            Cancelar
          </Button>
          <Button
            size="sm"
            color="success"
            outline
            onClickCapture={toggle}
            onClick={props.carga_enviar.bind(this)}
          >
            Cargar documento
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaDocumento;
