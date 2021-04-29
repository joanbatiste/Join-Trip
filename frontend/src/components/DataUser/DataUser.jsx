import React ,{ useState }from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import {UPDATE_USER} from '../../redux/types/userTypes';
import checkError from '../../utiles/utiles';
import cabecera_data from '../../img/grandes-viajes-2021.jpeg';

const ProfileHeader = (props) =>{

    let history = useHistory();

    const [user, setUser] = useState(props.user);
    const [message, setMessageUpdateData] = useState('');

    // Manejador de estado para actualizar datos de usuario
    const handleState = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const updateData = async () =>{

        //chequeamos errores del formulario
        setMessageUpdateData('');

        let notValidated = checkError(user)
        setMessageUpdateData(notValidated);

        if(notValidated){
            alert('No se pueden actualizar tus datos');
            return;
        };
        let endpointUserUpdate = `http://127.0.0.1:8000/api/users/${props.user?.id}`
        let response = await axios.put(endpointUserUpdate, user,{headers: {authorization:props.user.api_token}});
        
        console.log("respuesta de actualizar datos", response);

        if (!response.data.error){
            props.dispatch({type:UPDATE_USER, payload: user})
            alert('Datos actualizados con éxito');
            setTimeout(() => {
                history.push('/profile');

            }, 1000)
        }else{
            alert('Lo sentimos, no se han podido actualizar tus datos');
        };
        

        
    }
  
    return(
        <div className="container-datauser">
        <div className="datauser-image">
            <LoguedHeader/>
            <img src={cabecera_data} alt=""></img>
        </div>
        <div className="data-profile">
            <div className="data-profile-content">
                <p className='data-profile-content-title'>Mis datos de perfil</p>
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
                <input type='name' placeholder={props.email} name='email' className='form-update-data-input' value={user.email} onChange={handleState}></input>
                <label htmlFor="" className='form-update-data-label'>Password</label>
                <input type='password' name='password' className='form-update-data-input' value={user.password} onChange={handleState}></input>
                {message}
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

export default connect(mapStateToProps)(ProfileHeader);