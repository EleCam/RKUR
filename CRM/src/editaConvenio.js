import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalEditaConvenio = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
       {window.superUs || props.convenio.registro === global.noempl ?
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 10 }}
        title="Editar Deal"
      >
        <span className="fas fa-edit" />
      </Button>
      
      : "" }
      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
      >
        <ModalHeader
          toggle={toggle}
          className={
            props.convenio.estatus === "2"
              ? "bg-success"
              : props.convenio.estatus === "0"
              ? "bg-danger"
              : "bg-info text-white"
          }
        >
          Edita Convenio (
          {props.convenio.estatus === "2"
            ? "WIN"
            : props.convenio.estatus === "0"
            ? "LOSE"
            : "OPEN"}
          )
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={7}>
              <Label>Nombre</Label>
            </Col>
            <Col sm={3}>
              <Label>Monto</Label>
            </Col>
            <Col sm={2}>
              <Label>Invitados</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={7}>
              <Input
                type="text"
                defaultValue={props.convenio.nombre}
                bsSize="sm"
                id="txtEConvenionombre"
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                type="number"
                bsSize="sm"
                defaultValue={props.convenio.monto}
                id="txtEConveniotipo"
              ></Input>
            </Col>
            <Col sm={2}>
              <Input
                type="number"
                bsSize="sm"
                defaultValue={props.convenio.invitados}
                id="txtInvitados"
              ></Input>
            </Col>
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.convenio.id}
              id="txtEConvenioid"
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
              <Input
                type="date"
                bsSize="sm"
                defaultValue={props.convenio.fecha_inicio}
                id="txtEConveniofecdel"
              ></Input>
            </Col>
            <Col sm={6}>
              <Input
                type="date"
                bsSize="sm"
                defaultValue={props.convenio.fecha_fin}
                id="txtEConveniofecal"
              />
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.convenio.id}
              id="txtContEdId"
            />
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
                defaultValue={props.convenio.descripcion}
                rows={4}
                bsSize="sm"
                id="txtEConveniodescripcion"
              ></Input>
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
              onClick={props.eliminaDeal}
            >
              Eliminar
            </Button>
          ) : (
            ""
          )}
          
          {props.convenio.estatus === "1" ? (
            <>
              <Button
                id="lose"
                color="danger"
                size="sm"
                onClickCapture={toggle}
                onClick={props.editaConvenio}
              >
                Lose
              </Button>
              <Button
                id="win"
                color="success"
                size="sm"
                onClickCapture={toggle}
                onClick={props.editaConvenio}
              >
                Win
              </Button>
            </>
          ) : (
            ""
          )}

          <Button
            color="success"
            size="sm"
            outline
            onClickCapture={toggle}
            onClick={props.editaConvenio}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalEditaConvenio;
