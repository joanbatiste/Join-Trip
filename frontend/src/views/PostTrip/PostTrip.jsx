import React,{ useState } from 'react'
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {checkField, validateFields, isValid} from '../../utiles/utiles';
import axios from "axios";
import { FormGroup, Input, Label, FormFeedback } from 'reactstrap';

function PostTrip(props) {
    let history = useHistory();

    //Estado del contenido de los campos del form para postear un trip
    const [postTrip, setPostTrip] = useState({
        title: "",
        destination: "",
        date: "",
        days: "",
        description:"",
        link: "",
    });

    //Estado de valicación de los componentes del form
    const [validationResult, setValidationResult] = useState({
        validated: false,
        name: null
    });

    //Manejador de estado de la publicacion de un trip
    const handleStatePostTrip = (e) => {
        setValidationResult({
            ...validationResult, [e.target.name]: checkField(e.target.name, e.target.value)
        });
        
        setPostTrip({ ...postTrip, [e.target.name]: e.target.value });
   
    }

    //Funcion para enviar datos al back y crear el trip
    const sendDataTrip = async()=>{
        let validationResult = validateFields(postTrip);

        //Seteamos el estado de la validación
        setValidationResult({...validationResult, validated: true});

        //Comprobampos que podemos continuar con el post
        if(!isValid(validationResult)){
            return;
        }
        
        //Datos a enviar
        let postTripData = {
            title: postTrip.title,
            destination: postTrip.destination,
            date: postTrip.date,
            days: postTrip.days,
            description: postTrip.description,
            link: postTrip.link,
            userId: props.user.id
        }

        //Endpoint para crear trip
        let endPoitCreateTrip = `http://127.0.0.1:8000/api/users/${props.user.id}/trips`;
        let response = await axios.post(endPoitCreateTrip, postTripData,{headers: {authorization:`Bearer ${props.user.api_token}`}});
        
        if(!response.data){
            alert('Lo sentimos. Tu viaje no se ha podido publicar')
        }else{
            alert('Tu viaje se ha publicado. Podrás verlo en tu perfil de usuario')
            setTimeout(() => {
                history.push('/profile')

            }, 1000)
        }
    }

    return (
        <div className="container-post-trip">
            <div className="post-trip-image">
                <LoguedHeader />
            </div>
            <div className="post-form-container">
                <div className="post-form-container-content">
                    <p className='post-form-container-content-title'>Rellena los datos de tu viaje</p>
                    <FormGroup>
                        <Label for='title'>Título</Label>
                        <Input type='text' name='title' className='post-form-container-content-input' onChange={handleStatePostTrip} valid={validationResult.validated && !validationResult.title} invalid={validationResult.validated && validationResult.title}></Input>
                        <FormFeedback>{validationResult.title}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='destination'>Destino</Label>
                        <Input type='text' name='destination' className='post-form-container-content-input' onChange={handleStatePostTrip} valid={validationResult.validated && !validationResult.destination} invalid={validationResult.validated && validationResult.destination}></Input>
                        <FormFeedback>{validationResult.destination}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='date'>Fecha</Label>
                        <Input type='date' name='date' className='post-form-container-content-input' onChange={handleStatePostTrip} valid={validationResult.validated && !validationResult.date} invalid={validationResult.validated && validationResult.date}></Input>
                        <FormFeedback>{validationResult.date}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='days'>Días</Label>
                        <Input type='text' name='days' className='post-form-container-content-input' onChange={handleStatePostTrip} valid={validationResult.validated && !validationResult.days} invalid={validationResult.validated && validationResult.days}></Input>
                        <FormFeedback>{validationResult.title}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for='description'>Descripción</Label>
                        <Input type='textarea' name='description' className='post-form-container-content-input' onChange={handleStatePostTrip} valid={validationResult.validated && !validationResult.description} invalid={validationResult.validated && validationResult.description}></Input>
                        <FormFeedback>{validationResult.description}</FormFeedback>
                    </FormGroup>
                    <input type="button" value="Publicar viaje" className='post-form-container-content-button' onClick={sendDataTrip} />
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
export default connect(mapStateToProps)(PostTrip);