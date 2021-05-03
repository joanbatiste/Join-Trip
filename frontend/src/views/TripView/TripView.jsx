import React, { useEffect } from 'react'
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import cabecera_viaje from '../../img/Pareja-en-coche.jpeg';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


// import axios from 'axios';

function TripView(props) {

    let dataTrip = JSON.parse(localStorage.getItem('trip'));
    console.log('soy los datos de data', dataTrip);
    //Funcion para traer el nombre del usuario que ha publicado el viaje
    // const getUserName = async()=>{
    //     let endPointFindById = `http://127.0.0.1:8000/api/users/${dataTrip.user.id}`;
    //     console.log(endPointFindById);
    //     let response = await axios.get(endPointFindById);
    //     console.log(response);
    // }

    //Función para transformar la fecha a DD/MM/AAAA
    function convertDateFormat(string) {
        return string.split('-').reverse().join('/');
   }

    //USEEFFECTS
    useEffect(() => {
        // getUserName()
    }, []);
    return (
        <div className="container-tripview">

            <div className="tripview-image">
                <LoguedHeader />
                <img src={cabecera_viaje} alt=""></img>
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
                                <div className="user-name">{dataTrip.user.name}</div>
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
                            {dataTrip.user.name}
                        </div>
                        <button className="join-button">Unirme al viaje</button>

                    </div>

                </div>
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
                    </div>
                    <div className="trip-message-button">
                        <button className="publish-message">Publicar</button>
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