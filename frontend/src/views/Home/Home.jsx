import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import axios from 'axios';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import cabecera from '../../img/cabecera.jpeg';
import { connect } from 'react-redux';
import {SAVING} from '../../redux/types/tripTypes';
import TripCard from '../../components/TripCard/TripCard';
import trip1 from '../../img/trip1.jpeg'
import trip2 from '../../img/granada.jpg';
import trip3 from '../../img/rioja.jpeg';

const Home = (props) => {
    //Funcion para traerse todos los trips de la BD
    const [trip, setTrips] = useState([]);
    //Guardamos los datos de viajes en redux
    props.dispatch({type: SAVING, payload:trip});
    

    const getTrips = async () => {
        let endPointTrips = "http://127.0.0.1:8000/api/trips";
        let tripsResponse = await axios.get(endPointTrips);
        
        console.log(tripsResponse.data, "a ver si hago otro join");
        setTrips (tripsResponse.data)
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
                    <div className="last-trips-description"></div>
                    <div className="last-trips-publications">
                        <div className="last-trips-publications-1"></div>
                        <div className="last-trips-publications-2"></div>
                        <div className="last-trips-publications-3"></div>
                        <div className="last-trips-publications-4"></div>
                    </div>

                </div>
                <div className="suggestions">
                    <div className="suggestions-descriptions"></div>
                    <div className="suggestions-trips">
                        <div className="suggestions-trips-1"></div>
                        <div className="suggestions-trips-2"></div>
                        <div className="suggestions-trips-3"></div>
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
                        {trip.map(mytrips => {
                            return (
                                <TripCard
                                    title={mytrips.title}
                                    destination={mytrips.destination}
                                    description={mytrips.description}
                                    date = {mytrips.date}
                                    days = {mytrips.days}
                                    link={mytrips.link}
                                    id = {mytrips.id}
                                    username = {mytrips.username}
                                />
                            )
                        })}
                        {/* <div className="last-trips-publications-1"></div>
                        <div className="last-trips-publications-2"></div>
                        <div className="last-trips-publications-3"></div>
                        <div className="last-trips-publications-4"></div> */}
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