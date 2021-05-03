import React from 'react'
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';

function PostTrip() {
    return (
        <div className="container-post-trip">
            <div className="post-trip-image">
                <LoguedHeader />
                <img src={cabecera_profile} alt=""></img>
            </div>
            <div className="post-form-container">
                <div className="post-form-container-content">
                    
                </div>

            </div>
            
        </div>
    )
}

export default PostTrip
