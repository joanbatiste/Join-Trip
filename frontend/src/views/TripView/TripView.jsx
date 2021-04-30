import React, { useEffect } from 'react'
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import cabecera_viaje from '../../img/Pareja-en-coche.jpeg';
import { connect } from 'react-redux';

function TripView(props) {
    console.log(props);
    let dataTrip = JSON.parse(localStorage.getItem('trip'));
    console.log("soy el data trip", dataTrip);
    //USEEFFECTS
    useEffect(() => {

    }, []);
    return (
        <div className="container-tripview">

            <div className="tripview-image">
                <LoguedHeader />
                <img src={cabecera_viaje} alt=""></img>
            </div>
            <div className="trip-content">
                <div className="trip-info">
                    <div className="trip-info-title">
                        <p className="">Título</p>
                        {dataTrip.title}
                        
                    </div>
                    <div className="trip-info-destination"></div>
                    <div className="trip-info-description"></div>
                    <div className="trip-info-link"></div>
                </div>
                <div className="trip-messages-box">
                    <div className="trip-messages-owner"></div>
                    <div className="trip-message-text"></div>
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