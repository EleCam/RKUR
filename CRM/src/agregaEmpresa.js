import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregaEmpresa = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
      title="Agregar Empresa"
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 10 }}
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
          Agrega Empresa{" "}
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={4}>
              <Label>Empresa</Label>
            </Col>
            <Col sm={4}>
              <Label>RFC</Label>
            </Col>
            <Col sm={4}>
              <Label>Razon Social</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Input id="txtEmpresa"></Input>
              <Input id="noempl" defaultValue={props.noempl} hidden></Input>
            </Col>
            <Col sm={4}>
              <Input id="txtRFC"></Input>
            </Col>
            <Col sm={4}>
              <Input id="txtRazonSocial"></Input>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Calle</Label>
            </Col>
            <Col sm={3}>
              <Label>Número</Label>
            </Col>
            <Col sm={3}>
              <Label>C.P.</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Input id="txtCalle"></Input>
            </Col>
            <Col sm={3}>
              <Input id="txtNumero"></Input>
            </Col>
            <Col sm={3}>
              <Input id="txtCP"></Input>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={4}>
              <Label>Colonia</Label>
            </Col>
            <Col sm={4}>
              <Label>Del. / Municipio</Label>
            </Col>
            <Col sm={4}>
              <Label>Estado</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Input id="txtColonia"></Input>
            </Col>
            <Col sm={4}>
              <Input id="txtDelegacion"></Input>
            </Col>
            <Col sm={4}>
              <Input id="txtEstado"></Input>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={4}>
              <Label>Teléfono</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Input id="txtTelefono"></Input>
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
            onClick={props.agregaEmpresa}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaEmpresa;
