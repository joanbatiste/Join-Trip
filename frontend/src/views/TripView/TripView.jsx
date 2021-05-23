import React, { useEffect, useState } from 'react'
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MessageBox from '../../components/MessageBox/MessageBox';

function TripView(props) {

    let history = useHistory();

    //base url para hacer las peticiones a BD
    let base_url = "http://127.0.0.1:8000";

    let dataTrip = JSON.parse(localStorage.getItem('trip'));
    
    //Hook para traer mensajes ya publicados
    const [postedMessages, setPostedMessages] = useState([]);

    //Hook para traer usuarios ya unidos
    const [joinedUsers, setJoinedUsers] = useState([]);
    
    //Hook de message a publicar
    const [message, setMessage] = useState('')

    //Manejador de estado publicar mensajes
    const handleStateMessage = (e) => {
        setMessage({ ...setMessage, [e.target.name]: e.target.value });
    }

    //Funcion para traer los mensajes del viaje
    const getMessagesPosted = async () => {
        let endPointGetMessages = `${base_url}/api/messages/${dataTrip.id}`;
        let responseMessages = await axios.get(endPointGetMessages);
        setPostedMessages(responseMessages.data);
    }

    //Funcion para traerse los usuarios que se han unido al viaje
    const getUsersJoined = async ()=>{
        let endPointUsersJoined = `${base_url}/api/memberships/${dataTrip.id}`;
        let response = await axios.get(endPointUsersJoined);
        setJoinedUsers (response.data)
    }

    //Funcion para enviar mensaje al back
    const sendMessage = async () => {
        let messagePost = {
            message: message.message,
            userId: props.user.id,
            tripId: dataTrip.id
        }

        //EndPoint para crear el mensaje en bd
        let endPointMessage = `${base_url}/api/users/${props.user.id}/messages`;
        let response = await axios.post(endPointMessage, messagePost, { headers: { authorization: `Bearer ${props.user?.api_token}` } })
        
        if (!response.data) {
            alert('Lo sentimos, el mensaje no ha podido publicarse');
        } else {
            alert('Tu mensaje se ha publicado correctamente');
            setTimeout(() => {
                history.push('/trips/view')

            }, 1500)
        }
    }

    //Función para transformar la fecha a DD/MM/AAAA
    function convertDateFormat(string) {
        return string.split('-').reverse().join('/');
    }

    //Función para unirse a un trip
    const joinTrip = async () =>{
        let membership ={
            userId: props.user.id,
            tripId: dataTrip.id
        }

        //endpoint para unirse al viaje
        let endPointMembership = `${base_url}/api/trips/login`;
        let response = await axios.post(endPointMembership,membership,{headers: { authorization: `Bearer ${props.user.api_token}` }})
        if (!response.data) {
            alert('Lo sentimos, el mensaje no te has podido unir al viaje');
        } else {
            alert('¡Enhorabuena! Te has unido a este viaje. ¡Disfrútalo!');
            setTimeout(() => {
                history.push('/trips/view')

            }, 1000)
        }
    }

    //USEEFFECTS
    useEffect(() => {
        getMessagesPosted()
        getUsersJoined()
        // eslint-disable-next-line
    }, [joinedUsers,postedMessages]);

    //Visualizar Mensajes posteados si los hay
    const messageTest = () => {
        if (postedMessages.length === 0) {
            return (
                <div></div>
            )

        } else {
            return (
                <div id="box-posted-messages">
                    <h1>Preguntas de los viajeros</h1>
                    {postedMessages?.map(message => {
                        return (
                            <MessageBox
                                message={message}
                            />
                        )
                    })}
                </div>
            )
        }
    }

    //Renderizado
    return (
        <div className="container-tripview">

            <div className="tripview-image">
                <LoguedHeader />
                
            </div>
            <div className="trip-content">
                <div className="trip-content-intro">
                    <h1>Información del viaje</h1>
                </div>
                <div className="trip-content-global">
                    <div className="trip-owner">
                        <div className="trip-owner-description">
                            <p className="p-trips-titles">Publicado por:</p>
                            <div className="name-and-avatar">
                                <div className="user-name">{dataTrip.username}</div>
                                <div className="avatar"><FontAwesomeIcon icon={faUser} /></div>
                            </div>
                        </div>
                    </div>
                    <div className="trip-info">
                        <div className="trip-info-field-first">
                            <div className="trip-info-field-title">
                                <p className="p-trips-titles">Título:</p>
                                {dataTrip.title}
                            </div>
                            <div className="trip-info-field-date">
                                <p className="p-trips-titles">Fecha:</p>
                                {convertDateFormat(dataTrip.date)}
                            </div>
                            <div className="trip-info-field-days">
                                <p className="days">Días:</p>
                                <div className="trip-info-field-days-days">
                                    {dataTrip.days}
                                </div>

                            </div>

                        </div>
                        <div className="trip-info-field">
                            <p className="p-trips-titles">Destino</p>
                            {dataTrip.destination}
                        </div>
                        <div className="trip-info-field-description">
                            <p className="p-trips-titles">Descripción</p>
                            {dataTrip.description}
                        </div>
                        <div className="trip-info-field">
                            <p className="p-trips-titles">Links de interés</p>
                            {dataTrip.link}

                        </div>
                    </div>
                    <div className="trip-joined-users">
                        <div className="trip-joined-users-content">
                            <p className="p-trips-titles">Viajeros que se han unido:</p>
                            {joinedUsers.map(joined=>{
                                return(
                                    <div className="joined-users-content">{joined.username}</div>
                                )
                            })}
                        </div>
                        <button className="join-button" onClick={joinTrip}>Unirme al viaje</button>

                    </div>

                </div>
                {messageTest()}

                <div className="trip-content-dude">
                    <h1>¿Todavía con dudas?</h1>
                    <h4>Pregunta al usuario que ha publicado el viaje y aclara fechas, lugares a visitar, actividades.... </h4>
                </div>
                <div className="trip-messages-box">
                    <div className="trip-messages-owner">
                        <p className="p-trips-titles">Publicado por:</p>
                    </div>
                    <div className="trip-message-text">
                        <p className="p-trips-titles">Mensaje:</p>
                        <textarea type="text" name="message" className="trip-message-text-content" onChange={handleStateMessage}></textarea>
                    </div>
                    <div className="trip-message-button">
                        <button className="publish-message" onClick={sendMessage}>Publicar</button>
                    </div>

                </div>



            </div>

        </div>
    )
}


const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        trip: state.tripReducer.trip
    }
};
export default connect(mapStateToProps)(TripView);