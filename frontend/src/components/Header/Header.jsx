import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, FormFeedback} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {checkField, validateFields, isValid} from '../../utiles/utiles';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types/userTypes';
// import LocationSearchInput from '../../components/InputLocation/InputLocation';

const Header = (props) => {

    //Definimos el estado de la ventana modal para el registro y para el login
    const [openModal, setOpenModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    //Estado de valicación de los componentes del form
    const [validationResult, setValidationResult] = useState({
        validated: false,
        name: null
    });

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

    //Manejador de estado de registro
    const handleStateRegister = (e) => {
        setValidationResult({
            ...validationResult, [e.target.name]: checkField(e.target.name, e.target.value)
        });
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    //Manejador de estado de login
    const handleStateLogin = (e) => {
        setValidationResult({
            ...validationResult, [e.target.name]: checkField(e.target.name, e.target.value)
        });
        setLogin({ ...login_user, [e.target.name]: e.target.value });
    };

    //Envío de datos de registro
    const sendData = async () => {

        let validationResult = validateFields(user);

        //Seteamos el estado de la validación
        setValidationResult({...validationResult, validated: true});

        //Comprobampos que podemos continuar con el post
        if(!isValid(validationResult)){
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
        let validationResult = validateFields(login_user);

        //Seteamos el estado de la validación
        setValidationResult({...validationResult, validated: true});

        //Comprobampos que podemos continuar con el post
        if(!isValid(validationResult)){
            return;
        }
        
        let loginData ={
            username: login_user.username,
            password: login_user.password
        }
        //Endpoin para login
        let login_url = 'http://127.0.0.1:8000/api/users/login';
        let response = await axios.post(login_url, loginData);
        console.log(response);
        props.dispatch({type: LOGIN, payload: response.data[0]});
        
        
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
                        <Input type="text" name="name" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.name} invalid={validationResult.validated && validationResult.name}></Input>
                        <FormFeedback>{validationResult.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Apellido</Label>
                        <Input type="text" name="surname" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.surname} invalid={validationResult.validated && validationResult.surname}></Input>
                        <FormFeedback>{validationResult.surname}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="username">Nombre de usuario</Label>
                        <Input type="text" name="username" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.username} invalid={validationResult.validated && validationResult.username}></Input>
                        <FormFeedback>{validationResult.username}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthday">Fecha nacimiento</Label>
                        <Input type="date" name="birthday" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.birthday} invalid={validationResult.validated && validationResult.birthday}></Input>
                        <FormFeedback>{validationResult.birthday}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">Ciudad</Label>
                        <Input type="text" name="city" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.city} invalid={validationResult.validated && validationResult.city}></Input>
                        <FormFeedback>{validationResult.city}</FormFeedback>
                        {/* <LocationSearchInput type="text" name="city" onChange={handleStateRegister}></LocationSearchInput> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.email} invalid={validationResult.validated && validationResult.email}></Input>
                        <FormFeedback>{validationResult.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" name="password" onChange={handleStateRegister} valid={validationResult.validated && !validationResult.password} invalid={validationResult.validated && validationResult.password}></Input>
                        <FormFeedback>{validationResult.password}</FormFeedback>
                    </FormGroup>

                </ModalBody>

                <ModalFooter className="modal-register-footer">
                    <button className="modal-register-footer-bt-register" onClick={sendData} >Registrarse</button>
                    <button className="modal-register-footer-bt-exit" onClick={closingModal}>Cerrar</button>
                </ModalFooter>
            </Modal>
            <Modal className="modal-login" isOpen={openLoginModal}>
                <ModalHeader className="modal-login-header">
                    Login de Usuario
                </ModalHeader>
                <ModalBody className="modal-login-body">
                    <FormGroup>
                        <Label for="username">Nombre de usuario</Label>
                        <Input type="text" name="username" onChange={handleStateLogin}valid={validationResult.validated && !validationResult.username} invalid={validationResult.validated && validationResult.username}></Input>
                        <FormFeedback>{validationResult.username}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" name="password" onChange={handleStateLogin}valid={validationResult.validated && !validationResult.password} invalid={validationResult.validated && validationResult.password}></Input>
                        <FormFeedback>{validationResult.password}</FormFeedback>
                    </FormGroup>
                </ModalBody>

                <ModalFooter className="modal-login-footer">
                    <button id="confirm-login" onClick={sendLoginData} >Login</button>
                    <button id="cancel-login" onClick={closingLoginModal}>Cerrar</button>
                </ModalFooter>

            </Modal>

        </div>
    )
};
export default connect()(Header)