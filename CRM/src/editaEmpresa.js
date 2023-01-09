import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";

const ModalEditaEmpresa = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  console.log(window.noempl);
  console.log(props.empresa.registro);
  return (
    <div>
      {window.superUs || props.empresa.registro === window.noempl ? (
        <Button
          title="Editar Empresa"
          color="btn btn-outline-info btn-sm"
          onClick={toggle}
          style={{ fontSize: 10 }}
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
          Edita Empresa{" "}
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
              <Input
                id="txtEd_Empresa"
                defaultValue={props.empresa.empresa}
              ></Input>
            </Col>
            <Col sm={4}>
              <Input id="txtEd_RFC" defaultValue={props.empresa.rfc}></Input>
            </Col>
            <Col sm={4}>
              <Input
                id="txtEd_RazonSocial"
                defaultValue={props.empresa.razon_social}
              ></Input>
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
              <Input
                id="txtEd_Calle"
                defaultValue={props.empresa.calle}
              ></Input>
            </Col>
            <Col sm={3}>
              <Input
                id="txtEd_Numero"
                defaultValue={props.empresa.numero}
              ></Input>
            </Col>
            <Col sm={3}>
              <Input id="txtEd_CP" defaultValue={props.empresa.cp}></Input>
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
              <Input
                id="txtEd_Colonia"
                defaultValue={props.empresa.colonia}
              ></Input>
            </Col>
            <Col sm={4}>
              <Input
                id="txtEd_Delegacion"
                defaultValue={props.empresa.delegacion}
              ></Input>
            </Col>
            <Col sm={4}>
              <Input
                id="txtEd_Estado"
                defaultValue={props.empresa.estado}
              ></Input>
            </Col>
          </Row>
          <Row style={{ paddingTop: "10px" }}>
            <Col sm={4}>
              <Label>Teléfono</Label>
            </Col>
            <Col sm={4}>
              <Label>Estatus</Label>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <Input
                id="txtEd_Telefono"
                defaultValue={props.empresa.telefono}
              ></Input>
            </Col>
            <Col sm={4}>
              <Input
                id="txtEd_Estatus"
                defaultValue={props.empresa.estatus}
                type="select"
              >
                <option key={0} value="Nuevo">
                  Nuevo
                </option>
                <option key={1} value="Contactado">
                  Contactado
                </option>
                <option key={2} value="Interesado">
                  Interesado
                </option>
                <option key={3} value="Califica">
                  Califica
                </option>
                <option key={4} value="En negociación">
                  En negociación
                </option>
                <option key={5} value="Cliente">
                  Cliente
                </option>
              </Input>
            </Col>
            <Col sm={4}>
              <Input
                hidden
                id="txtEd_Id"
                defaultValue={props.empresa.id}
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
              onClick={props.eliminaEmpresa}
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
            id={"desh"}
            color={props.empresa.activo === "1" ? "danger" : "success"}
            size="sm"
            outline
            onClickCapture={toggle}
            onClick={props.editaEmpresa}
          >
            {props.empresa.activo === "1" ? "Deshabilitar" : "Habilitar"}
          </Button>
          <Button
            id={"update" + props.empresa.activo}
            color="success"
            size="sm"
            outline
            onClickCapture={toggle}
            onClick={props.editaEmpresa}
          >
            Guardar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalEditaEmpresa;
