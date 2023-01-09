import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregaContacto = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 10 }}
        title="Agregar Evento"
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
          Agrega Evento
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Nombre</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input type="text" bsSize="sm" id="txtNombre"></Input>
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
            <Col sm={6} className="text-center">
              Inicio
            </Col>
            <Col sm={6} className="text-center">
              Final
            </Col>
            <Col sm={3}>
              <Label>Fecha</Label>
            </Col>
            <Col sm={3}>
              <Label>Hora</Label>
            </Col>
            <Col sm={3}>
              <Label>Fecha</Label>
            </Col>
            <Col sm={3}>
              <Label>Hora</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={3}>
              <Input type="date" bsSize="sm" id="txtInicio"></Input>
            </Col>
            <Col sm={3}>
              <Input type="time" bsSize="sm" id="txtInicioTime"></Input>
            </Col>
            <Col sm={3}>
              <Input type="date" bsSize="sm" id="txtFinal"></Input>
            </Col>
            <Col sm={3}>
              <Input type="time" bsSize="sm" id="txtFinalTime"></Input>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Tipo</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input type="select" 
              id="txtTipo"
                >
                {props.eventosLs.map((a) => (
                  <option value={a.id}>{a.tipoevento}</option>
                ))}
              </Input>
            </Col>
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.empresaid}
              id="txtpuesto"
            ></Input>
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
            onClick={props.agregaEvento}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaContacto;
