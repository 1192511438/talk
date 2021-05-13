import React from 'react'

export default function index(props) {

    return (
        <div style={{fontSize:'0.35rem',color:props.color,textAlign:'center'}}>
            {props.children}
        </div>
    )
}
