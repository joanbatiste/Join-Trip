import React from 'react';
import Header from '../../components/Header/Header.jsx';

import LoguedHeader from '../../components/LoguedHeader/LoguedHeader.jsx';
import cabecera from '../../img/cabecera.jpeg';
import { connect } from 'react-redux';


const Home = (props) => {

    

    

    if (!props.user?.api_token) {

        return (
            <div className="container-home">
                <div className="header-image">
                    <Header />
                    <img src={cabecera} alt=""></img>

                </div>
                <div className="last-trips">
                    <div className="last-trips-description"></div>
                    <div className="last-trips-publications">
                        <div className="last-trips-publications-1"></div>
                        <div className="last-trips-publications-2"></div>
                        <div className="last-trips-publications-3"></div>
                        <div className="last-trips-publications-4"></div>
                    </div>

                </div>
                <div className="suggestions">
                    <div className="suggestions-descriptions"></div>
                    <div className="suggestions-trips">
                        <div className="suggestions-trips-1"></div>
                        <div className="suggestions-trips-2"></div>
                        <div className="suggestions-trips-3"></div>
                    </div>
                </div>


            </div>
        )
    } else {
        return (
            <div className="container-home">
                <div className="header-image">
                    <LoguedHeader />
                    <img src={cabecera} alt=""></img>

                </div>
                <div className="last-trips">
                    <div className="last-trips-description"></div>
                    <div className="last-trips-publications">
                        <div className="last-trips-publications-1"></div>
                        <div className="last-trips-publications-2"></div>
                        <div className="last-trips-publications-3"></div>
                        <div className="last-trips-publications-4"></div>
                    </div>

                </div>
                <div className="suggestions">
                    <div className="suggestions-descriptions"></div>
                    <div className="suggestions-trips">
                        <div className="suggestions-trips-1"></div>
                        <div className="suggestions-trips-2"></div>
                        <div className="suggestions-trips-3"></div>
                    </div>
                </div>


            </div>

        )

    }


};
const mapStateToProps = state => {
    return {
        user: state.userReducer.user

    }
};
export default connect(mapStateToProps)(Home);