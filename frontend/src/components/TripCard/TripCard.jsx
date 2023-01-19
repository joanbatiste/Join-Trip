import React from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';



const TripCard = (props) => {

    let history = useHistory();

    
    const goToTripView = () => {
        localStorage.setItem('trip', JSON.stringify(props));
        setTimeout(() => {
            history.push('/trips/view');

        }, 1000);
    }



    return (
        <div className="container-card" onClick={goToTripView}>

            <div className="image-card">
                <FontAwesomeIcon icon={faSuitcaseRolling}></FontAwesomeIcon>
                
            </div>
            <div className="title-card">{props.title}</div>
            <div className="destination">
                <div className="destination-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon>
                </div>
                <div className="destination-place">
                    {props.destination}
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
export default connect(mapStateToProps)(TripCard)
