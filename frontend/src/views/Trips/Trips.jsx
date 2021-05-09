import React from 'react';
import { connect } from 'react-redux';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import TripCard from '../../components/TripCard/TripCard';
import Carousel from '../../components/Carousel/Carousel';

function Trips(props) {

    //Función para reordenar los viajes por fecha más próxima a realizarse
    const orderNextTrips = () => {
        let futureTrips = props.trip;
        futureTrips.sort((a, b) => {
            if (a.date < b.date) {
                return -1;
            }
            if (a.date > b.date) {
                return 1;
            }
            return 0;
        });
        return (
            <div className="trips-added-content-cards">
                {futureTrips.slice(0, 5).map(mytrips => {
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

    //Función para ordenar los viajes por última fecha de creación
    const orderLastCreatedTrips = () => {
        let lastTripsCreated = props.trip;
        lastTripsCreated.sort((a, b) => {
            if (a.created_at > b.created_at) {
                return -1;
            }
            if (a.created_at < b.created_at) {
                return 1;
            }
            return 0;
        });
        return (
            <div className="trips-added-content-cards">
                {lastTripsCreated.slice(0, 5).map(mytrips => {
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


    return (
        <div className="container-trips">
            <div className="trips-image">
                <LoguedHeader />
            </div>
            <div className="available-trips">
                <div className="last-trips-added">
                    <div className="trips-added-content">
                        <h2>Estos son los últimos viajes añadidos por viajeros</h2>
                        <div className="trips-added-content-cards">
                            {orderLastCreatedTrips()}
                        </div>
                    </div>

                </div>
                <div className="next-trips-to-be-done">
                    <div className="trips-added-content">
                        <h2>¡Corre que nos vamos! No te pierdas los viajes proximos a realizarse</h2>
                        <div className="trips-added-content-cards">
                            {orderNextTrips()}
                        </div>

                    </div>

                </div>
                <div className="all-trips">
                    <div className="trips-added-content">
                        <h2>¿No tienes prisa? Te mostramos todos los viajes disponibles</h2>
                    </div>

                    <Carousel/>
                    

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
