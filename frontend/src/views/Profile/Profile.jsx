import axios from 'axios';
import React, {useEffect,useState} from 'react';

import { connect } from 'react-redux';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
// import {SAVING} from '../../redux/types/tripTypes';
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import TripCard from '../../components/TripCard/TripCard.jsx';


const Profile = (props) => {
    
    const [trip, setTrips] = useState({trips:[]});
    
    //funcion para traerse los viajes publicados por el usuario
    const getTrips = async () => {
        let endPointTrips = `http://127.0.0.1:8000/api/users/${props.user.id}/trips`;
        let tripsResponse = await axios.get(endPointTrips,{headers: {authorization:`Bearer ${props.user.api_token}`}});
        // props.dispatch({type:SAVING, payload: tripsResponse.data});
        console.log("soy el response.data", tripsResponse.data);
        setTrips({
            ...trip, trips:tripsResponse.data
        })
    }
    
    //USEEFFECTS
    useEffect(() => {
        getTrips();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container-profile">
            <div className="profile-image">
                <LoguedHeader />
                <img src={cabecera_profile} alt=""></img>
            </div>
            <div className="profile-my-trips">
                <div className="profile-my-trips-title">Mis viajes publicados</div>
                <div className="profile-my-trips-resum" >
                    {trip.trips.map(mytrips =>{
                        return(
                            <TripCard 
                                title={mytrips.title}
                                destination={mytrips.destination}
                                description ={mytrips.description}
                                date = {mytrips.date}
                                days = {mytrips.days}
                                link={mytrips.link}
                                id={mytrips.id}
                                username = {mytrips.username}
                            />
                            
                        )
                    })}
                </div>

            </div>
            <div className="profile-my-jointrips">
                <div className="profile-my-jointrips-title">Viajes a los que me he unido</div>
                <div className="profile-my-jointrips-resum"></div>
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