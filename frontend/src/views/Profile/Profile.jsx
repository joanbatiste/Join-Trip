import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import TripCard from '../../components/TripCard/TripCard.jsx';


const Profile = (props) => {

    let history = useHistory();

    //hook de los viajes publicados por el usuario
    const [trip, setTrips] = useState([]);

    //funcion para traerse los viajes publicados por el usuario
    const getTrips = async () => {
        let endPointTrips = `https://join-trip-backend.herokuapp.com/api/users/${props.user.id}/trips`;
        let tripsResponse = await axios.get(endPointTrips, { headers: { authorization: `Bearer ${props.user.api_token}` } });
        setTrips(tripsResponse.data)
    }

    //hook de los viajes a los que se ha unido el usuario
    const [joinedtrips, setJoinedtrips] = useState([]);
    //Renderizar si se ha apuntado a viajes o no
    const joinedTripsQuery = async () => {
        let endPointJoinedTrips = `https://join-trip-backend.herokuapp.com/api/users/${props.user.id}/memberships`;
        let joinedResponse = await axios.get(endPointJoinedTrips, { headers: { authorization: `Bearer ${props.user.api_token}` } });
        setJoinedtrips(joinedResponse.data)
    }

    //Funcion para llevar al usuario a vista publicar viajes
    const goToPostTrip = () => {
        setTimeout(() => {
            history.push('/trips/post')
        }, 1000);
    }

    //Funcion para llevar al usuario a vista publicar viajes
    const goToJoinTrip = () => {
        setTimeout(() => {
            history.push('/trips')
        }, 1000);
    }

    //USEEFFECTS
    useEffect(() => {
        getTrips();
        joinedTripsQuery();
        // eslint-disable-next-line
    }, []);

    //Funcion para renderizar si ha publicado viajes o no
    const postedTrips = () => {
        if (trip.length === 0) {
            return (
                <div className="no-trips-to-show">
                    Actualmente no tienes ningún viaje publicado. ¿Quieres hacerlo ahora?
                    <button className="no-trips-to-show-button" onClick={goToPostTrip}>Publicar mi viaje</button>
                </div>
            )
        } else {
            return (
                <div className="profile-my-trips-resum-show">
                    {trip.slice(0,5).map(mytrips => {
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
            )

        }
    }

    //Función para renderizar si  viajes a los que se ha unido
    const joinedTripsToDo = () => {
        if (joinedtrips.length === 0) {
            return (
                <div className="no-joinedtrips-to-show">
                    No te has unido a ningún viaje. ¿Quieres unirte ahora?
                    <button className="no-joinedtrips-to-show-button" onClick={goToJoinTrip}>Unirme a un viaje</button>
                </div>
            )
        } else {
            return (
                <div className="profile-my-jointrips-resum-show">
                    {joinedtrips.slice(0,5).map(mytrips => {
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
            )

        }
    }

    return (
        <div className="container-profile">
            <div className="profile-image">
                <LoguedHeader />
                <img src={cabecera_profile} alt=""></img>
            </div>
            <div className="profile-my-trips">
                <div className="profile-my-trips-title">
                    <h2>Mis viajes publicados</h2>
                </div>
                <div className="profile-my-trips-resum" >
                    {postedTrips()}
                </div>

            </div>
            <div className="profile-my-jointrips">
                <div className="profile-my-jointrips-title">
                    <h2>Viajes a los que me he unido</h2>
                </div>
                <div className="profile-my-jointrips-resum">
                    {joinedTripsToDo()}
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
export default connect(mapStateToProps)(Profile);