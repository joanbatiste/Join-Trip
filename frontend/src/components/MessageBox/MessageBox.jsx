import React from 'react'

function MessageBox(props) {

    let message = props.message;
    console.log("soy lo que llega a message", message);
    return (
        <div className="container-message-box">
             <div className="message-box-owner">
                <p className="message-box-owner-title">Publicado por:</p>
                <div className="message-box-owner-name">
                    {message.users.username}
                </div>
                
            </div>
            <div className="message-box-content">
                <p className="message-box-content-title">Mensaje:</p>
                <div className="message-box-content-text">
                    {message.message}
                </div>
            </div>
        </div>
    )
}

export default MessageBox
