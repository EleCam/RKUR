import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row } from "reactstrap";
import React, { useState } from "react";
import "./index.css";

const ModalInfoColors = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        onClick={toggle}
        style={{
          fontSize: 10,
          background: "none",
          color: "white",
          border: "none",
        }}
      >
        <span className="fas fa-info-circle" />
      </Button>
      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
      >
        <ModalHeader toggle={toggle} className="bg-info text-white">
          Informacion de colores
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <span style={{ background: "#d6d4e0" }} className="ExColor">
                Nuevo
              </span>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <span style={{ background: "#ffeead" }} className="ExColor">
                Contactado
              </span>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <span style={{ background: "#eeac99" }} className="ExColor">
                Interesado
              </span>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <span style={{ background: "#e06377" }} className="ExColor">
                Califica
              </span>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <span style={{ background: "#c83349" }} className="ExColor">
                En negociacion
              </span>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" size="sm" outline onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalInfoColors;
