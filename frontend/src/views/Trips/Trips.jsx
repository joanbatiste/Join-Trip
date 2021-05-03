import React from 'react'
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';

function Trips() {
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
                    </div>

                </div>
                <div className="next-trips-to-be-done">
                    <div className="trips-added-content">
                        <h2>¡Corre que nos vamos! No te pierdas los viajes proximos a realizarse</h2>
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

export default Trips
