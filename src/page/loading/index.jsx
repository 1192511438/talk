import React from 'react'
import './index.scss'
import { Spin } from 'antd';
import 'antd/lib/spin/style/css'
export default function () {
    return (
        <div id='loading'>
            <Spin size="large" />
            loading
        </div>
        
    )
}
