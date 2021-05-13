import React from 'react'
import './css/index'
export default function index(props) {
    return (
        <div id='text-content-div'>
            <img id='img-header-talk' src={props.header} alt="header"/>
            <div className='message-item-content'>
                <p className='message-item-content-nickname'>{props.nickname}</p>
                <div className='message-item-content-bubble'>
                    {props.message}
                </div>
            </div>
        </div>
    )
}
