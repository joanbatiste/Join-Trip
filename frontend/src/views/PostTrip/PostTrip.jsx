import React,{ useState } from 'react'
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import chechError from '../../utiles/utiles';
import axios from "axios";

function PostTrip(props) {
    let history = useHistory();

    const [postTrip, setPostTrip] = useState({
        title: "",
        destination: "",
        date: "",
        days: "",
        description:"",
        link: "",
    });

    //Manejador de estado de la publicacion de un trip
    const handleStatePostTrip = (e) => {
        setPostTrip({ ...postTrip, [e.target.name]: e.target.value });
    };
    //Estado de mensajes de error
    // const [message, setMessage] = useState('');

    //Funcion para enviar datos al back y crear el trip
    const sendDataTrip = async()=>{
        // setMessage('');
        // let notValidated = chechError(user);
        // setMessage(notValidated);

        // if (notValidated) {
        //     return;
        // }
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
        console.log("soy el response del trip", response);
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
                <img src={cabecera_profile} alt=""></img>
            </div>
            <div className="post-form-container">
                <div className="post-form-container-content">
                    <p className='post-form-container-content-title'>Rellena los datos de tu viaje</p>
                    <label htmlFor="" className='post-form-container-content-label'>Título</label>
                    <input type='text' name='title' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Destino</label>
                    <input type='text' name='destination' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Fecha</label>
                    <input type='date' name='date' className='post-form-container-content-input'  onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Días</label>
                    <input type='text' name='days' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label-description' >Descripción</label>
                    <input type='text' name='description' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Links de interés</label>
                    <input type='text'  name='link' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    {/* {message} */}
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
