import React from 'react';



const Header = () =>{


    return (
        <div className="header-container">
            <div className="header-container-header">
                <div className="header-container-header-logo">
                    <a href="/" className="logo-link">
                        <div className="logo-first">Join</div>
                        <div className="logo-second">Trip</div>
                    </a>
                </div>
                <div className="header-container-header-slogan">viajes y escapadas para compartir</div>
                <div className="header-container-header-login">Inicia sesión</div>
                <div className="header-container-header-register">Regístrate</div>
            </div>
            <div className="header-container-links">
                <div className="header-container-links-titles">
                    <div className="header-container-links-titles home">inicio</div>
                    <div className="header-container-links-titles travels">viajes</div>
                    <div className="header-container-links-titles activities">actividades</div>
                    <div className="header-container-links-titles contact">contacto</div>
                </div>
                
            </div>
           
        </div>
    )
};

export default Header;