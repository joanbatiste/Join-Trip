import React , { useState } from 'react';
import { connect } from 'react-redux';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';

const Profile = (props) =>{

    const [user, setUser] = useState(props.user);

    // Manejador de estado para actualizar datos de usuario
    const handleState = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const updateData = async () =>{
        
    }
    return (
        <div className="container-profile">
            <div className="profile-image">
                <LoguedHeader/>
                {/* <img src={} alt=""></img> */}
            </div>
            <div className="data-profile">
                <div className="data-profile-content">
                    <p className='data-profile-content-title'>Datos de perfil</p>
                    <label htmlFor="" className='form-update-data-label'>Nombre</label>
                    <input type='name' placeholder={props.name} name='name' className='form-update-data-input' value={user.name} onChange={handleState}></input>
                    <label htmlFor="" className='form-update-data-label'>Apellido</label>
                    <input type='name' placeholder={props.surname} name='surname' className='form-update-data-input' value={user.surname} onChange={handleState}></input>
                    <label htmlFor="" className='form-update-data-label'>Nombre de usuario</label>
                    <input type='name' placeholder={props.username} name='username' className='form-update-data-input' value={user.username} onChange={handleState}></input>
                    <label htmlFor="" className='form-update-data-label'>Fecha de nacimiento</label>
                    <input type='name' placeholder={props.birthday} name='birthday' className='form-update-data-input' value={user.birthday} onChange={handleState}></input>
                    <label htmlFor="" className='form-update-data-label'>Ciudad</label>
                    <input type='name' placeholder={props.username} name='city' className='form-update-data-input' value={user.city} onChange={handleState}></input>
                    <label htmlFor="" className='form-update-data-label'>Email</label>
                    <input type='name' placeholder={props.username} name='email' className='form-update-data-input' value={user.email} onChange={handleState}></input>
                    <label htmlFor="" className='form-update-data-label'>Nombre de usuario</label>
                    <input type='name' placeholder={props.username} name='username' className='form-update-data-input' value={user.username} onChange={handleState}></input>
                    <input type="button" value="Actualizar datos" className='form-update-data-button' onClick={updateData}/>
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
export default connect (mapStateToProps)(Profile);