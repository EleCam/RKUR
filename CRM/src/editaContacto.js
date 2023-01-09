import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalAgregaEmpresa = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      {window.superUs || props.contacto.registro === global.noempl ? (
        <Button
          color="btn btn-outline-info btn-sm"
          onClick={toggle}
          style={{ fontSize: 14, width: 30, height: 30 }}
          title="Editar Contacto"
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
          Edita Contacto{" "}
        </ModalHeader>
        <ModalBody>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={6}>
              <Label>Nombre</Label>
            </Col>
            <Col sm={4}>
              <Label>Celular</Label>
            </Col>
            <Input
              type="text"
              bsSize="sm"
              hidden
              defaultValue={props.contacto.id}
              id="txtContEdId"
            />
          </Row>
          <Row>
            <Col sm={6}>
              <Input
                type="text"
                bsSize="sm"
                defaultValue={props.contacto.nombre}
                id="txtContEdNombre"
              ></Input>
            </Col>
            <Col sm={4}>
              <Input
                type="text"
                bsSize="sm"
                defaultValue={props.contacto.celular}
                id="txtContEdCelular"
              ></Input>
            </Col>
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
              <Input
                type="text"
                bsSize="sm"
                defaultValue={props.contacto.email}
                id="txtContEdEmail"
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                type="date"
                bsSize="sm"
                defaultValue={props.contacto.dob}
                id="txtContEdDOB"
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                id="txtContEdRolId"
                bsSize="sm"
                defaultValue={props.contacto.rolid}
                type="select"
              >
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
          {window.superUs ? (
            <Button
              color="danger"
              size="sm"
              outline
              onClickCapture={toggle}
              onClick={props.eliminaContacto}
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
            onClick={props.editaContacto}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalAgregaEmpresa;
