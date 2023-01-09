import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregarParticipantes = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  return (
    <div>
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 10 }}
        title="Agregar participante"
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
          Agregar participantes
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={8}>
              <Label>Selecciona el empleado</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input type="select" bsSize="sm" id="txtNombre">
                {props.empleados
                  ? props.empleados.map((empleado,i) => (
                      <>
                        <option key={i} value={empleado.noempl}>
                          {empleado.noempl + "-" + empleado.fullname}
                        </option>
                      </>
                    ))
                  : []}
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
            <Col sm={12}>
              <Label>De caracter</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input type="select" id="txtCaracter">
                    <option value={"Requerido"}>Requerido</option>
                    <option value={"Opcional"}>Opcional</option>
              </Input>
              
              <Input type="text" id="txtidorigen" defaultValue={props.id} hidden></Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" size="sm" outline onClick={toggle}>
            Cancelar
          </Button>
          <Button
          id="guardarPart"
            color="success"
            size="sm"
            outline
            onClickCapture={toggle}
            onClick={props.agregarParticipante}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregarParticipantes;
