import React,{useState} from 'react'
import './css/index'
import PropTypes from 'prop-types'
export default function index(props) {

    if(props.isAlert){
        return(<div style={{display:'none'}}></div>)
    }else{
        return (
            <div id='alert' >
                <div className='alert-content'>
                    <div className='alert-content-detail'>{props.message}</div>
                    <div className='confirm-btn' onClick={()=>{props.changeAlert()}}>确认</div>
                </div>
            </div>
        )
    }
    
}
index.propTypes={
    message:PropTypes.string,
    isAlert:PropTypes.bool,
    changeAlert:PropTypes.func
}
