import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import chechError from '../../utiles/utiles';


const Header = (props) => {

    //Definimos el estado de la ventana modal para el registro y para el login
    const [openModal, setOpenModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    //Función para cambiar el estado y abrir la ventana modal del registro
    const openingModal = () => {
        return setOpenModal(true);
    }
    const closingModal = () => {
        return setOpenModal(false);
    }

    //Función para cambiar el estado y abrir la ventana modal del registro
    const openingLoginModal = () => {
        return setOpenLoginModal(true);
    }
    const closingLoginModal = () => {
        return setOpenLoginModal(false);
    }

    //Funcion para recoger datos de registro
    const [user, setUser] = useState({
        name: "",
        surname: "",
        username: "",
        birthday: "",
        city: "",
        email: "",
        password: ""

    });

    //Funcion para recoger datos de Login
    const [login_user, setLogin] =useState({
        username:"",
        password:""
    })
    //Estado de mensajes de error
    const [message, setMessage] = useState('');

    //Manejador de estado de registro
    const handleStateRegister = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    //Manejador de estado de login
    const handleStateLogin = (e) => {
        setLogin({ ...login_user, [e.target.name]: e.target.value });
    };

    //Envío de datos de registro
    const sendData = async () => {

        setMessage('');
        let notValidated = chechError(user);
        setMessage(notValidated);

        if (notValidated) {
            return;
        }
        //Datos de usuario a enviar al backend
        let userData = {
            name: user.name,
            surname: user.surname,
            username: user.username,
            birthday: user.birthday,
            city: user.city,
            email: user.email,
            password: user.password
        }
        
        //Endpoint para el registro de usuario
        let endpointUserRegister = 'http://127.0.0.1:8000/api/users';

        let response =  await axios.post(endpointUserRegister, userData);
        console.log(response);
        
        if (!response.data.name) {
            alert('Lo sentimos, no se ha podido completar el registro. Inténtalo más tarde');
            
              
        } else {
            alert('Usuario registrado con éxito');
            setTimeout(() => {
                closingModal();

            }, 1000)
        }

    }
    //Envío de datos de login
    const sendLoginData = async () =>{
        setMessage('');
        let notValidated = chechError(login_user);
        setMessage(notValidated);

        if (notValidated) {
            return;
        }
        let loginData ={
            username: login_user.username,
            password: login_user.password
        }
        //Endpoin para login
        let login_url = 'http://127.0.0.1:8000/api/users/login';
        let response = await axios.post(login_url, loginData);
        // console.log("soy el login", response);
        
        if(response.data.error){
            alert('Nombre de usuario o contraseña incorrectos');
            
        } else {
            alert('Usuario logueado con éxito');
            setTimeout(() => {
                closingLoginModal();

            }, 1000)
        }

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
                    <button id="login" onClick={openingLoginModal}>Inicia sesión</button>
                </div>

            </div>

            <Modal className="modal-register" isOpen={openModal}>

                <ModalHeader className="modal-register-header">
                    Registro de Usuario
                </ModalHeader>

                <ModalBody className="modal-register-body">
                    <FormGroup>
                        <Label for="name">Nombre</Label>
                        <Input type="text" name="name" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Apellido</Label>
                        <Input type="text" name="surname" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Nombre de usuario</Label>
                        <Input type="text" name="username" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthday">Fecha nacimiento</Label>
                        <Input type="date" name="birthday" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Ciudad</Label>
                        <Input type="text" name="city" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" name="password" onChange={handleStateRegister}></Input>
                    </FormGroup>
                    {message}

                </ModalBody>

                <ModalFooter className="modal-register-footer">
                    <button id="confirm-register" onClick={sendData} >Registrarse</button>
                    <button id="cancel-register" onClick={closingModal}>Cerrar</button>
                </ModalFooter>
            </Modal>
            <Modal className="modal-login" isOpen={openLoginModal}>
                <ModalHeader className="modal-login-header">
                    Login de Usuario
                </ModalHeader>
                <ModalBody className="modal-login-body">
                    <FormGroup>
                        <Label for="username">Nombre de usuario</Label>
                        <Input type="text" name="username" onChange={handleStateLogin}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" name="password" onChange={handleStateLogin}></Input>
                    </FormGroup>
                    {message}
                </ModalBody>

                <ModalFooter className="modal-login-footer">
                    <button id="confirm-login" onClick={sendLoginData} >Login</button>
                    <button id="cancel-login" onClick={closingLoginModal}>Cerrar</button>
                </ModalFooter>

            </Modal>

        </div>
    )
};

export default Header;