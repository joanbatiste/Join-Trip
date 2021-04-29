import React from 'react';
import ubicacion from '../../img/ubicacion2.png';
import user_image from '../../img/icono_user.png';
import { useHistory} from 'react-router-dom';

const TripCard = (props) => {

    let history = useHistory();

    const tripView = () =>{
        setTimeout(() => {
            history.push('/trips/view');

        }, 1000);
    }

    return (
        <div className="container-card" onClick={tripView}>

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

export default TripCard
