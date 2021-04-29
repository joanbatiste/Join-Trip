import React from 'react';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types/userTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes } from '@fortawesome/free-solid-svg-icons';

const LoguedHeader = (props) =>{

    let history = useHistory();

    //Funcion para logout,
    const logout = async() =>{
        let confirmation = window.confirm('¿Seguro que quieres irte?');
        
        if(confirmation){
            
            setTimeout(()=>{
                
                props.dispatch({type:LOGOUT, payload: {}});
                history.push('/');
                
            },1000);
        }
    };

    //Funcion para ir a vista perfil
    const goToProfile = ()=>{
        setTimeout(()=>{
            history.push('/profile');
        },1000);
    };
    //Funcion para ir datos perfil
    const goToDataUser = ()=>{
        setTimeout(()=>{
            history.push('/profile/datauser');
        },1000);
    };
  
    return(
        <div className="header-container">
            <div className="header-container-logued">
                <div className="header-container-logued-logo">
                    <a href="/" className="logo-link">
                        <div className="logo-first">Join</div>
                        <div className="logo-second">Trip</div>
                    </a>
                </div>
                <div className="header-container-header-links">
                    <div className="header-container-header-links-inicio">inicio</div>
                    <div className="header-container-header-links-viajes">viajes</div>
                    <div className="header-container-header-links-actividades">actividades</div>
                    <div className="header-container-header-links-contacto" onClick={()=>goToDataUser()}>mis datos</div>

                </div>
                <div className="header-container-header-userdata" onClick={()=>goToProfile()}>
                    {props.user?.username}
                </div>
                <div className="header-container-header-logout"onClick={() => logout()}>
                    <FontAwesomeIcon icon={faUserTimes} />
                </div>

            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {
      user: state.userReducer.user
      
    }
};

export default connect(mapStateToProps)(LoguedHeader);