import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import TripCard from '../../components/TripCard/TripCard';

function Trips(props) {
    //Reordenamos los viajes por fecha más próxima a realizarse
    let nextTrips = props.trip;

    nextTrips.sort((a, b) => {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }
        return 0;
    });
    console.log(nextTrips);
    //Reordenamos los viajes por última fecha de creación
    let lastTripsCreated = props.trip;


    //USEEFFECTS
    useEffect(() => {

        // eslint-disable-next-line
    }, []);


    return (
        <div className="container-trips">
            <div className="trips-image">
                <LoguedHeader />
                <img src={cabecera_profile} alt=""></img>
            </div>
            <div className="available-trips">
                <div className="last-trips-added">
                    <div className="trips-added-content">
                        <h2>Estos son los últimos viajes añadidos por viajeros</h2>
                        <div className="trips-added-content-cards">

                        </div>
                    </div>

                </div>
                <div className="next-trips-to-be-done">
                    <div className="trips-added-content">
                        <h2>¡Corre que nos vamos! No te pierdas los viajes proximos a realizarse</h2>
                        <div className="trips-added-content-cards">
                            {nextTrips.map(mytrips => {
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

                </div>
                <div className="all-trips">
                    <div className="trips-added-content">
                        <h2>¿No tienes prisa? Te mostramos todos los viajes disponibles</h2>
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
export default connect(mapStateToProps)(Trips)
