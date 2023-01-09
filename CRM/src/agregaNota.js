import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregaNota = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  return (
    <div>
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 14, width: 30, height: 30 }}
        title = "Agregar Nota"
      >
        <span className="fas fa-sticky-note" />
      </Button>
      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
      >
        <ModalHeader toggle={toggle} className="bg-info text-white">
          Agrega Nota{" "}
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <Label style={{ fontSize: 16, fontWeight: "bold" }}>
                {props.origen} - {props.nombre}
              </Label>
            </Col>
            <Input id="txtOrigen" defaultValue={props.origen} hidden />
            <Input id="txtOrigenid" defaultValue={props.origenid} hidden />
          </Row>
          <Row>
            <Col sm={12}>
              <Input id="txtNota" type="textarea" rows={4} />
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
            onClick={props.agregaNota}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaNota;
