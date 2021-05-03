import React,{ useState } from 'react'
import cabecera_profile from '../../img/Hombre-paisaje-Panoramica.jpeg';
import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import { connect } from 'react-redux';

function PostTrip(props) {
    console.log(props);
    const [postTrip, setPostTrip] = useState({
        title: "",
        destination: "",
        date: "",
        days: "",
        description:"",
        link: "",
        userId: props.user.id
    });

    //Manejador de estado de la publicacion de un trip
    const handleStatePostTrip = (e) => {
        setPostTrip({ ...postTrip, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-post-trip">
            <div className="post-trip-image">
                <LoguedHeader />
                <img src={cabecera_profile} alt=""></img>
            </div>
            <div className="post-form-container">
                <div className="post-form-container-content">
                    <p className='post-form-container-content-title'>Mis datos de perfil</p>
                    <label htmlFor="" className='post-form-container-content-label'>Título</label>
                    <input type='text' name='title' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Destino</label>
                    <input type='name' name='destination' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Fecha</label>
                    <input type='date' name='date' className='post-form-container-content-input'  onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Días</label>
                    <input type='name' name='days' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Descripción</label>
                    <input type='name' name='description' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    <label htmlFor="" className='post-form-container-content-label'>Links de interés</label>
                    <input type='name'  name='link' className='post-form-container-content-input' onChange={handleStatePostTrip}></input>
                    {/* {message} */}
                    {/* <input type="button" value="Publicar viaje" className='post-form-container-content-button' onClick={updateData} /> */}
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
export default connect(mapStateToProps)(PostTrip);
