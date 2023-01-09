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
        title = "Agregar Contacto"
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
          Agrega Contacto2
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Nombre</Label>
            </Col>
            <Col sm={4}>
              <Label>Celular</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type="text" bsSize="sm" id="txtContAgNombre"></Input>
            </Col>
            <Col sm={4}>
              <Input type="text" bsSize="sm" id="txtContAgCelular"></Input>
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
              <Label>Email</Label>
            </Col>
            <Col sm={3}>
              <Label>Fec. Nacimiento</Label>
            </Col>
            <Col sm={3}>
              <Label>Rol</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input type="text" bsSize="sm" id="txtContAgEmail"></Input>
            </Col>
            <Col sm={3}>
              <Input type="date" bsSize="sm" id="txtContAgDOB"></Input>
            </Col>
            <Col sm={3}>
              <Input id="txtContAgRolId" bsSize="sm" type="select">
                {props.rolesLs.length > 0
                  ? props.rolesLs.map((pos, index) => (
                      <option key={index} value={pos.id}>
                        {pos.rol}
                      </option>
                    ))
                  : []}
              </Input>
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
            onClick={props.agregaContacto}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaContacto;
