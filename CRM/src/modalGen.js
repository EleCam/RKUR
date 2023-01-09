import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button, Col, Row, Label, Input } from "reactstrap";
import React, { useState } from "react";
function a(props) {
  let dataModal = [];
  switch (props.modalTip) {
    case "NuevoCliente":
      dataModal = {
        inputs: [
          [
            {
              text: "Nombre",
              size: "6",
              type: "text",
              name: "txtContAgNombre",
            },
            {
              text: "sss",
              size: "4",
              type: "text",
              name: "txtContAgEmpresaId",
              hidden: true,
              value: props.empresaid,
            },
            {
              text: "Celular",
              size: "4",
              type: "text",
              name: "txtContAgCelular",
            },
          ],
          [
            {
              text: "Email",
              size: "6",
              type: "text",
              name: "txtContAgEmail",
            },
            {
              text: "Fec. Nacimiento",
              size: "3",
              type: "date",
              name: "txtContAgDOB",
            },
            {
              text: "Rol",
              size: "3",
              type: "select",
              name: "txtContAgRolId",
              options: props.rolesLs,
            },
          ],
        ],
        BModal: {
          title: "Agregar Contacto",
          icon: "fas fa-plus",
        },
        HModal: {
          title: "Agregar Contacto",
        },
        FModal: [
          {
            text: "Agregar",
            action: props.agregaContacto,
            color: "success",
          },
        ],
      };
      break;
    case "EditarCliente":
      dataModal = {
        inputs: [
          [
            {
              text: "Nombre",
              size: "6",
              type: "text",
              name: "txtContEdNombre",
              value: props.contacto.nombre,
            },
            {
              text: "sss",
              size: "4",
              type: "text",
              name: "txtContEdId",
              hidden: true,
              value: props.contacto.id,
            },
            {
              text: "Celular",
              size: "4",
              type: "text",
              name: "txtContEdCelular",
              value: props.contacto.celular,
            },
          ],
          [
            {
              text: "Email",
              size: "6",
              type: "text",
              name: "txtContEdEmail",
              value: props.contacto.email,
            },
            {
              text: "Fec. Nacimiento",
              size: "3",
              type: "date",
              name: "txtContEdDOB",
              value: props.contacto.dob,
            },
            {
              text: "Rol",
              size: "3",
              type: "select",
              name: "txtContEdRolId",
              value: props.contacto.rolid,
              options: props.rolesLs,
            },
          ],
        ],
        BModal: {
          title: "Editar Contacto",
          icon: "fas fa-edit",
        },
        HModal: {
          title: "Editar Contacto",
        },
        FModal: [
          {
            text: "Eliminar",
            action: props.eliminaContacto,
            color: "danger",
          },
          {
            text: "Guardar",
            action: props.editaContacto,
            color: "success",
          },
        ],
      };
      break;
    case "AgregarNota":
      dataModal = {
        inputs: [
          [
            {
              text: "a",
              size: "12",
              type: "text",
              name: "txtOrigen",
              value: "contacto",
              hidden: true,
            },
            {
                text: "a",
                size: "12",
                type: "text",
                name: "txtOrigenid",
                value: props.contacto.id,
                hidden: true,
            },
            {
              text: "Nota para "+props.contacto.nombre,
              size: "12",
              type: "textarea",
              name: "txtNota",
              value: "",
            },
          ],
        ],
        BModal: {
          title: "Agrega Nota",
          icon: "fas fa-sticky-note",
        },
        HModal: {
          title: "Agregar Nota",
        },
        FModal: [
          {
            text: "Agregar",
            action: props.agregaNota,
            color: "success",
          },
        ],
      };
      break;
    default:
      break;
  }
  return dataModal;
}
const ModalGen = (props) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const data = a(props);
  return (
    <div>
      <Button
        color="btn btn-outline-info btn-sm"
        onClick={toggle}
        style={{ fontSize: 10, width: 26, height: 25 , margin : 0}}
        title={data.BModal.title}
      >
        <span className={data.BModal.icon} />
      </Button>
      <Modal
        id="ModalUser1"
        isOpen={modal}
        toggle={toggle}
        size="lg"
        className="small"
      >
        <ModalHeader toggle={toggle} className="bg-info text-white">
          {data.HModal.title}
        </ModalHeader>
        <ModalBody>
          {data.inputs.map((a, i) => (
            <div key={i}>
              <Row style={{ paddingTop: "10px" }}>
                {a.map((b, i) =>
                  b.hidden ? (
                    ""
                  ) : (
                    <Col sm={b.size} key={i}>
                      <Label>{b.text}</Label>
                    </Col>
                  )
                )}
              </Row>
              <Row style={{ paddingTop: "10px" }}>
                {a.map((b, i) =>
                  b.hidden ? (
                    <Input
                      key={i}
                      type={b.type}
                      bsSize="sm"
                      id={b.name}
                      hidden={b.hidden}
                      defaultValue={b.value}
                    ></Input>
                  ) : (
                    <Col sm={b.size} key={i}>
                      {b.type === "select" ? (
                        <Input
                          type={b.type}
                          bsSize="sm"
                          id={b.name}
                          defaultValue={b.value}
                        >
                          {b.options.map((pos, i) => (
                            <option key={i} value={pos.value}>
                              {pos.text}
                            </option>
                          ))}
                        </Input>
                      ) : (
                        <Input
                          type={b.type}
                          bsSize="sm"
                          id={b.name}
                          defaultValue={b.value}
                        ></Input>
                      )}
                    </Col>
                  )
                )}
              </Row>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" size="sm" outline onClick={toggle}>
            Cancelar
          </Button>
          {data.FModal.map((a, i) => (
            a.text === "Eliminar" ? 
            window.superUs ? <Button
              color={a.color}
              size="sm"
              outline
              onClickCapture={toggle}
              onClick={a.action}
              key={i}
            >
              {a.text}
            </Button> : "" 
          : <Button
          color={a.color}
          size="sm"
          outline
          onClickCapture={toggle}
          onClick={a.action}
          key={i}
        >
          {a.text}
        </Button>))}
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalGen;
