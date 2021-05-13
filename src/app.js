import React,{useState,Suspense} from 'react'
import Head from './component/Head/index'
import Allrouter from './router/index'
import {Switch,HashRouter,Route} from 'react-router-dom'
import Load from './page/loading'
export default function app() {
    const  [title,setTitle] =useState('首页')
   
    return (
        <Suspense fallback={<Load></Load>}>
        <Head title={title}></Head>
            <HashRouter>
            <Switch>
                {Allrouter.map(value=>{
                    return(<Route exact path={value.path} key={value.id} component={value.component}></Route>)
                })}
            </Switch>
            </HashRouter> 
        </Suspense>
            
    )
}
