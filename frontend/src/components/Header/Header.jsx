import React,{useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter, FormGroup,Input,Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


const Header = () =>{

    //Definimos el estado de la ventana modal para el registro
    const [openModal, setOpenModal] = useState(false);
    //Función para cambiar el estado y abrir la ventana modal del registro
    const openingModal =()=>{
        return setOpenModal(true);
    }

    return (
        <div className="header-container">
            <div className="header-container-header">
                <div className="header-container-header-logo">
                    <a href="/" className="logo-link">
                        <div className="logo-first">Join</div>
                        <div className="logo-second">Trip</div>
                    </a>
                </div>
                <div className="header-container-header-slogan">viajes y escapadas para compartir</div>
                <div className="header-container-header-register">
                    <button id="register" onClick={openingModal}>Regístrate</button>
                    </div>
                <div className="header-container-header-login">
                    <button id="login">Inicia sesión</button>
                    </div>
                
            </div>
            
            <Modal className="modal-register" isOpen={openModal}>
                <ModalHeader className="modal-register-header">
                    Registro de Usuario
                </ModalHeader>
                <ModalBody className="modal-register-body">
                    <FormGroup>
                        <Label for="usuario">Nombre</Label>
                        <Input type="text" id="usuario"></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Apellido</Label>
                        <Input type="text" id="surname"></Input>
                    </FormGroup>

                </ModalBody>
                <ModalFooter className="modal-register-footer">
                    <button id="confirm-register">Registrarse</button>
                    <button id="cancel-register" onClick={setOpenModal}>Cerrar</button>
                </ModalFooter>
            </Modal> 
           
        </div>
    )
};

export default Header;