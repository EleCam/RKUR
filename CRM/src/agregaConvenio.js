import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregaConvenio = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 10 }}
        title="Agregar Deal"
      >
        <span className="fas fa-plus" />
      </Button>
      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
      >
        <ModalHeader toggle={toggle} className="bg-info text-white">
          Agregar Deal
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Nombre</Label>
            </Col>
            <Col sm={2}>
              <Label>Monto</Label>
            </Col>
            <Col sm={2}>
              <Label>Invitados</Label>
            </Col>
            <Col sm={2}>
              <Label>Tipo</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type="text" bsSize="sm" id="txtConvenionombre"></Input>
            </Col>
            <Col sm={2}>
              <Input type="number" bsSize="sm" id="montoConvenio"></Input>
            </Col>
            <Col sm={2}>
              <Input type="number" bsSize="sm" id="invitadosConvenio"></Input>
            </Col>
            <Col sm={2}>
              <Input type="select" bsSize="sm" id="tipodeal">
              <option value={"R!"}>R!</option> 
              <option value={"K!"}>K!</option> 
              </Input>
            </Col>
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.empresaid}
              id="txtContAgEmpresaId"
            ></Input>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Fecha de inicio</Label>
            </Col>
            <Col sm={6}>
              <Label>Fecha de termino</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type="date" bsSize="sm" id="txtConveniofecdel"></Input>
            </Col>
            <Col sm={6}>
              <Input type="date" bsSize="sm" id="txtConveniofecal" />
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={12}>
              <Label>Descripción</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input
                type="textarea"
                rows={4}
                bsSize="sm"
                id="txtConveniodescripcion"
              ></Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" size="sm" outline onClick={toggle}>
            Cancelar
          </Button>
          <Button
            color="success"
            size="sm"
            outline
            onClickCapture={toggle}
            onClick={props.agregaConvenio}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaConvenio;
