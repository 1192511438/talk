import React from 'react'
import  './css/index.scss'
import { UnorderedListOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
 function index(props) {
     if(props.title){
        return (
            <header id='head'>
                <div id='title'>
                    <span>首页</span>
                </div>
            </header>
        )
     }else{
         return(<div></div>)
     }
    
}

export default connect(function(state){return{title:state.title}},null)(index)
