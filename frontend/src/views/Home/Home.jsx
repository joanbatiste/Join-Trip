import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import axios from 'axios';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import cabecera from '../../img/cabecera.jpeg';
import { connect } from 'react-redux';
import { SAVING } from '../../redux/types/tripTypes';
import TripCard from '../../components/TripCard/TripCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import trip1 from '../../img/trip1.jpeg'
import trip2 from '../../img/granada.jpg';
import trip3 from '../../img/rioja.jpeg';
import { faComments, faIdCard, faSearchLocation, faSuitcase } from '@fortawesome/free-solid-svg-icons';


const Home = (props) => {

    //base url para hacer las peticiones a BD
    let base_url = "http://127.0.0.1:8000";

    //Funcion para traerse todos los trips de la BD
    const [trip, setTrips] = useState([]);
    //Guardamos los datos de viajes en redux
    props.dispatch({ type: SAVING, payload: trip });


    const getTrips = async () => {
        let endPointTrips =`${base_url}/api/trips`;
        let tripsResponse = await axios.get(endPointTrips);

        
        setTrips(tripsResponse.data)
    }

    //USEEFFECTS
    useEffect(() => {
        getTrips();
        // eslint-disable-next-line
    }, []);

    if (!props.user?.api_token) {

        return (
            <div className="container-home">
                <div className="header-image">
                    <Header />
                    <img src={cabecera} alt=""></img>

                </div>
                <div className="last-trips">
                    <div className="last-trips-instructions">
                        <h2>¿Te gusta viajar?</h2>
                        <h5>Si te encanta viajar y no te gusta hacerlo sol@ estás en el lugar indicado</h5>
                        <h5>Encontrar compañer@s de viaje es muy fácil:</h5>

                        <div className="last-trips-instructions-steps">
                            <div className="last-trips-instructions-steps-content">
                                <div className="step-icon">
                                    <FontAwesomeIcon icon={faIdCard} />
                                </div>
                                <div className="step-description">
                                    <h5>Regístrate en nuestro sitio e inicia sesión</h5>
                                </div>
                            </div>
                            <div className="last-trips-instructions-steps-content">
                                <div className="step-icon">
                                    <FontAwesomeIcon icon={faSearchLocation} />
                                </div>
                                <div className="step-description">
                                    <h5>Publica tu plan o encuentra el viaje que más te guste</h5>
                                </div>
                            </div>
                            <div className="last-trips-instructions-steps-content">
                                <div className="step-icon">
                                    <FontAwesomeIcon icon={faComments} />
                                </div>
                                <div className="step-description">
                                    <h5>Resuelve todas tus dudas preguntando al resto de viajeros</h5>
                                </div>
                            </div>
                            <div className="last-trips-instructions-steps-content">
                                <div className="step-icon">
                                    <FontAwesomeIcon icon={faSuitcase} />
                                </div>
                                <div className="step-description">
                                    <h5>¡Prepara la maleta y disfruta del viaje!</h5>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                <div className="suggestions">
                    <div className="suggestions-descriptions">
                        <h2>Sugerencias del mes</h2>
                        <p className="home-texts">¿Nos permites sugerencias?
Te mostramos algunos de los destinos de nuestro país que seguro te sorprenderán.</p>
                    </div>
                    <div className="suggestions-trips">

                        <div className="suggestions-trips-1">
                            <div className="suggestions-trips-1-image">
                                <img src={trip1} alt=""></img>
                                <p>Comillas, una de las localidades más bonitas de Cantabria</p>
                            </div>
                            <div className="suggestions-trips-1-description"></div>
                        </div>
                        <div className="suggestions-trips-2">
                            <div className="suggestions-trips-2-image">
                                <img src={trip2} alt=""></img>
                                <p>Granada y su majestuosa Alhambra</p>
                            </div>
                            <div className="suggestions-trips-2-description"></div>
                        </div>
                        <div className="suggestions-trips-3">
                            <div className="suggestions-trips-3-image">
                                <img src={trip3} alt=""></img>
                                <p>Conoce la Rioja y sus bodegas</p>
                            </div>
                            <div className="suggestions-trips-3-description"></div>
                        </div>
                    </div>
                </div>



            </div>
        )
    } else {
        return (
            <div className="container-home">
                <div className="header-image">
                    <LoguedHeader />
                    <img src={cabecera} alt=""></img>

                </div>
                <div className="last-trips">
                    <div className="last-trips-description">
                        <h2>Últimos viajes publicados</h2>
                        <p className="home-texts">Publica tu viaje y déjate acompañar por otros usuarios de JoinTrip.
Conoce todos los rincones de España y conecta con viajeros como tu. </p>
                    </div>
                    <div className="last-trips-publications">
                        {trip.slice(0, 5).map(mytrips => {
                            return (
                                <TripCard
                                    title={mytrips.title}
                                    destination={mytrips.destination}
                                    description={mytrips.description}
                                    date={mytrips.date}
                                    days={mytrips.days}
                                    link={mytrips.link}
                                    id={mytrips.id}
                                    username={mytrips.username}
                                />
                            )
                        })}

                    </div>

                </div>
                <div className="suggestions">
                    <div className="suggestions-descriptions">
                        <h2>Sugerencias del mes</h2>
                        <p className="home-texts">¿Nos permites sugerencias?
Te mostramos algunos de los destinos de nuestro país que seguro te sorprenderán.</p>
                    </div>
                    <div className="suggestions-trips">

                        <div className="suggestions-trips-1">
                            <div className="suggestions-trips-1-image">
                                <img src={trip1} alt=""></img>
                            </div>
                            <div className="suggestions-trips-1-description"></div>
                        </div>
                        <div className="suggestions-trips-2">
                            <div className="suggestions-trips-2-image">
                                <img src={trip2} alt=""></img>
                            </div>
                            <div className="suggestions-trips-2-description"></div>
                        </div>
                        <div className="suggestions-trips-3">
                            <div className="suggestions-trips-3-image">
                                <img src={trip3} alt=""></img>
                            </div>
                            <div className="suggestions-trips-3-description"></div>
                        </div>
                    </div>
                </div>


            </div>

        )

    }


};
const mapStateToProps = state => {
    return {
        user: state.userReducer.user

    }
};
export default connect(mapStateToProps)(Home);