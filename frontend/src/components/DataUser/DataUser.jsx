import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import { UPDATE_USER } from '../../redux/types/userTypes';
import { checkField, validateFields, isValid } from '../../utiles/utiles';
import cabecera_data from '../../img/grandes-viajes-2021.jpeg';
import {FormFeedback, FormGroup, Label, Input} from 'reactstrap';

const ProfileHeader = (props) => {

    let history = useHistory();

    const [user, setUser] = useState(props.user);

    //Estado de valicación de los componentes del form
    const [validationResult, setValidationResult] = useState({
        validated: false,
        name: null
    });

    // Manejador de estado para actualizar datos de usuario
    const handleState = (e) => {
        setValidationResult({
            ...validationResult, [e.target.name]: checkField(e.target.name, e.target.value)
        });
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const updateData = async () => {
        let validationResult = validateFields(user);

        //Seteamos el estado de la validación
        setValidationResult({ ...validationResult, validated: true });

        //Comprobampos que podemos continuar con el post
        if (!isValid(validationResult)) {
            return;
        }
        
        let endpointUserUpdate = `http://127.0.0.1:8000/api/users/${props.user?.id}`
        let response = await axios.put(endpointUserUpdate, user, { headers: { authorization: props.user.api_token } });

        console.log("respuesta de actualizar datos", response);

        if (!response.data.error) {
            props.dispatch({ type: UPDATE_USER, payload: user })
            alert('Datos actualizados con éxito');
            setTimeout(() => {
                history.push('/profile');

            }, 1000)
        } else {
            alert('Lo sentimos, no se han podido actualizar tus datos');
        };

    }

    return (
        <div className="container-datauser">
            <div className="datauser-image">
                <LoguedHeader />
                <img src={cabecera_data} alt=""></img>
            </div>
            <div className="data-profile">
                <div className="data-profile-content">
                    <p className='data-profile-content-title'>Mis datos de perfil</p>
                    <FormGroup>
                        <Label for='name'>Nombre</Label>
                        <Input type='text' name='name' className='post-form-container-content-input' placeholder={props.user.name}  onChange={handleState} valid={validationResult.validated && !validationResult.name} invalid={validationResult.validated && validationResult.name}></Input>
                        <FormFeedback>{validationResult.name}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='surname'>Apellido</Label>
                        <Input type='text'  name='surname' className='post-form-container-content-input' placeholder={props.user.surname} onChange={handleState} valid={validationResult.validated && !validationResult.surname} invalid={validationResult.validated && validationResult.surname}></Input>
                        <FormFeedback>{validationResult.surname}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='username'>Nombre de usuario</Label>
                        <Input type='text' name='username' className='post-form-container-content-input' placeholder={props.user.username} onChange={handleState} valid={validationResult.validated && !validationResult.username} invalid={validationResult.validated && validationResult.username}></Input>
                        <FormFeedback>{validationResult.username}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='birthday'>Nacimiento</Label>
                        <Input type='date'  name='birthday' className='post-form-container-content-input' onChange={handleState} valid={validationResult.validated && !validationResult.birthday} invalid={validationResult.validated && validationResult.birthday}></Input>
                        <FormFeedback>{validationResult.birthday}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='city'>Ciudad</Label>
                        <Input type='text' name='city' className='post-form-container-content-input' placeholder={props.user.city} onChange={handleState} valid={validationResult.validated && !validationResult.city} invalid={validationResult.validated && validationResult.city}></Input>
                        <FormFeedback>{validationResult.city}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='email'>Email</Label>
                        <Input type='text' name='email' className='post-form-container-content-input' placeholder={props.user.email} onChange={handleState} valid={validationResult.validated && !validationResult.email} invalid={validationResult.validated && validationResult.email}></Input>
                        <FormFeedback>{validationResult.email}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='password'>Contraseña</Label>
                        <Input type='password' name='password' className='post-form-container-content-input' onChange={handleState} valid={validationResult.validated && !validationResult.password} invalid={validationResult.validated && validationResult.password}></Input>
                        <FormFeedback>{validationResult.password}</FormFeedback>
                    </FormGroup>
                    
                    <input type="button" value="Actualizar datos" className='form-update-data-button' onClick={updateData} />
                </div>
            </div>



        </div>
    )

}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user

    }
};

export default connect(mapStateToProps)(ProfileHeader);