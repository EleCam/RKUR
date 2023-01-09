import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalEditarEvento = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div>
      {window.superUs || props.evento.registro === global.noempl ? (
        <Button
          color="btn btn-outline-info btn-sm"
          onClick={toggle}
          style={{ fontSize: 10 }}
          title="Agregar Evento"
        >
          <span className="fas fa-edit" />
        </Button>
      ) : (
        ""
      )}

      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
      >
        <ModalHeader toggle={toggle} className="bg-info text-white">
          Editar evento
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Nombre</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input
                type="text"
                bsSize="sm"
                id="txtNombre"
                defaultValue={props.nombre}
              ></Input>
            </Col>
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.empresaid}
              id="txtEventId"
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
              <Input
                type="date"
                bsSize="sm"
                id="txtInicio"
                defaultValue={props.inicio[0]}
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                type="time"
                bsSize="sm"
                id="txtInicioTime"
                defaultValue={props.inicio[1]}
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                type="date"
                bsSize="sm"
                id="txtFinal"
                defaultValue={props.fin[0]}
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                type="time"
                bsSize="sm"
                id="txtFinalTime"
                defaultValue={props.fin[1]}
              ></Input>
              
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.evento.id}
              id="txtContEdId"
            />
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Tipo</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Input type="select" id="txtTipo" defaultValue={props.tipo}>
                {props.eventosLs.map((a) => (
                  <option value={a.id}>{a.tipoevento}</option>
                ))}
              </Input>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
        {window.superUs ? (
            <Button
              color="danger"
              size="sm"
              outline
              onClickCapture={toggle}
              onClick={props.eliminaEvento}
            >
              Eliminar
            </Button>
          ) : (
            ""
          )}
          <Button color="secondary" size="sm" outline onClick={toggle}>
            Cancelar
          </Button>
          <Button
            color="success"
            size="sm"
            outline
            onClickCapture={toggle}
            onClick={props.editarEvento}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalEditarEvento;
