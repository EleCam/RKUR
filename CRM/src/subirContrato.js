import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Button } from 'reactstrap';
import Swal from 'sweetalert2';

class ModalSubirContrato extends Component{
    constructor( props ) {
        super( props );
        this.state = {
            selectedFile: null
        };
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleUploadfile = (event) => {
        event.preventDefault();
        let idconvenio = this.props.idconvenio;
        const data = new FormData();
        data.append('contratoconvenio', document.getElementById('filecontrato').files[0] );
        data.append('convenioid', 1 );
        data.append('origen', this.props.origen );
        data.append('origenid', this.props.empresaid );
        data.append('registro', this.props.noempl );
        this.props.switchModal();
        fetch( this.props.services_url + 'subirArchivo.php', {
             method: 'POST',
             body: data,
             header: new Headers({
                'Content-Type': 'application/json',
            })
        })
        .then((response) => response.json())
        .then((response) =>  {

            if( response.exito === true ){

                Swal.fire({
                    icon: 'success',
                    title: 'Documentos guardado',
                    showConfirmButton: false,
                    timer: 1700
                  });
                 // this.props.getDocumentosConvenio(this.props.empresaid)

            }else{
                if( response.ext != "pdf" &&  
                response.ext != "png" && 
                response.ext != "jpg" && 
                response.ext != "jpeg"  ) Swal.fire('Tipo debe ser PDF,PNG,JPG', '', 'warning');
                else Swal.fire('Error al procesar', '', 'warning');
            }
           
        });

        this.setState({ selectedFile: null });
    }



    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <h5>Detalles:</h5>
                    <p>Nombre: {this.state.selectedFile.name}</p>
                    <p>
                        Última edición:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <Label>Elija un archivo (PDF, JPG, PNG)...</Label>
                </div>
            );
        }
    };

    cierraModal = () =>{
        this.props.switchModal();
        this.setState({ selectedFile: null });
    }


    render(){
        return(
            <>
            
             <Modal isOpen={this.props.modal} toggle={this.props.switchModal} size="md" >
            <ModalHeader toggle={ this.cierraModal.bind() } className="bg-info text-white"><p id='titulo_mod'>Subir contrato </p></ModalHeader>
            <ModalBody>
                {this.props.idconvenio}
                <Row style={{paddingTop:"15px"}}>
                    <Col sm={7}>{this.fileData()}</Col> 
                </Row>

                <Row>      
                    <Col sm={7}>
                        <input type="file" id='filecontrato' accept=".png, .jpg, .jpeg, .pdf" onChange={this.onFileChange} />          
                    </Col>             
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color='secondary' size='sm' outline onClick={this.cierraModal.bind()} >Cancelar</Button> 
                <Button color='success' size='sm' outline onClick={this.handleUploadfile } >Guardar</Button> 
            </ModalFooter>
        </Modal>
            
            
            </>
           
        )
    }

}

export default ModalSubirContrato;