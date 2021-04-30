import React from 'react';
import ubicacion from '../../img/ubicacion2.png';
import user_image from '../../img/icono_user.png';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';

const TripCard = (props) => {

    let history = useHistory();
    
    localStorage.setItem('trip', JSON.stringify(props));
    const goToTripView = () =>{
        
        setTimeout(() => {
            history.push('/trips/view');

        }, 1000);
    }

    

    return (
        <div className="container-card" onClick={goToTripView}>

            <div className="image-card">
                <img id="avatar" src={user_image} alt=''></img>
            </div>
            <div className="title-card">{props.title}</div>
            <div className="destination">
                <img src={ubicacion} alt=''></img>
                {props.destination}
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
export default connect(mapStateToProps) (TripCard)
