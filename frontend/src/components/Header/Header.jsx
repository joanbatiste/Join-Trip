import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, FormFeedback} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import {checkField, validateFields, isValid} from '../../utiles/utiles';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types/userTypes';
import {BASE_URL_LOCAL} from '../../utiles/utiles.js';
// import LocationSearchInput from '../../components/InputLocation/InputLocation';

const Header = (props) => {

    //base url para hacer las peticiones a BD
    let base_url = BASE_URL_LOCAL;

    //Definimos el estado de la ventana modal para el registro y para el login
    const [registerModal, setRegisterModal] = useState({
        open: false,
    });
    const [loginModal, setLoginModal] = useState({
        open: false,
    });

    //Estado de valicación de los componentes del form
    const [validationResult, setValidationResult] = useState({
        validated: false,
        name: null
    });

    //Función para cambiar el estado y abrir la ventana modal del registro
    const openingModal = () => {
        setRegisterModal({open: !registerModal.open});
    }
    
    //Función para cambiar el estado y abrir la ventana modal del registro
    const openingLoginModal = () => {
        setLoginModal({open: !loginModal.open});
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

    const [avatar, setAvatar] = useState(null);
    console.log(avatar);
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

    const handleStateRegisterAvatar = (e) => {
        setAvatar(e.target.files[0]);
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

        let data = new FormData();
        data.append('name', user.name);
        data.append('surname', user.surname);
        data.append('username', user.username);
        data.append('birthday', user.birthday);
        data.append('city', user.city);
        data.append('email', user.email);
        data.append('password', user.password);
        data.append('avatarFile', avatar);

        //Endpoint para el registro de usuario
        let endpointUserRegister = `${base_url}/api/users`;
        let response =  await axios.post(endpointUserRegister, data, {
            headers: {'Content-type': 'multipart/form-data'}});
        
        if (!response.data.name) {
            alert('Lo sentimos, no se ha podido completar el registro. Inténtalo más tarde');
            
              
        } else {
            alert('Usuario registrado con éxito');
            setTimeout(() => {
                setRegisterModal({open: false});

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
        //Endpoint para login
        let login_url = `${base_url}/api/users/login`;
        let response = await axios.post(login_url, loginData);
        props.dispatch({type: LOGIN, payload: response.data[0]});
        
        
        if(response.data.error){
            alert('Nombre de usuario o contraseña incorrectos');
            
        } else {
            alert('Usuario logueado con éxito');
            setTimeout(() => {
                setLoginModal({open: false});

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

            <Modal className="modal-register" isOpen={registerModal.open}>

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
                    <FormGroup>
                        <Label for="avatarFile">Avatar</Label>
                        <Input type="file" name="avatarFile" onChange={handleStateRegisterAvatar}></Input>
                        <FormFeedback></FormFeedback>
                    </FormGroup>
                </ModalBody>

                <ModalFooter >
                    <button className="modal-register-footer-bt-register" onClick={sendData} >Registrarse</button>
                    <button className="modal-register-footer-bt-exit" onClick={openingModal}>Cerrar</button>
                </ModalFooter>
            </Modal>
            <Modal className="modal-login" isOpen={loginModal.open}>
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
                    <button className="modal-register-footer-bt-register" onClick={sendLoginData} >Login</button>
                    <button className="modal-register-footer-bt-exit" onClick={openingLoginModal}>Cerrar</button>
                </ModalFooter>

            </Modal>

        </div>
    )
};
export default connect()(Header)