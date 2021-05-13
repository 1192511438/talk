import React ,{useState,useEffect}from 'react'
import './css/index'
import {throttle2} from '../../throttle'
import Upload from '../../component/Upload/index'
import {connect} from 'react-redux'
import {DispathNicknameChange,DispathImgUrlChange,DispathPeopleChange,DispatchAllMessage} from '../../redux/createAction'
import PublicAlert from '../../component/alert/index'
import {socket} from '../../socket'


 function index(props) {

    useEffect(()=>{
         props.Peoplechange()
         props.allmessages()
    },[])

        //昵称和图片
         const [nickename,setNickname] =useState(null)
         const [imgUrl,setimgUrl]=useState('/assets/1.jpg')
         //改变昵称
         const nickchange= function(env){
             props.nicknameChange(env.target.value)
             setNickname(()=>env.target.value)
         }
         //Alert的props
         const [propsMessage,setpropsMessage]=useState('请输入昵称')
         const [propsisAlert,setpropsisAlert]=useState(true)
 
       const   changeAlert=()=>{setpropsisAlert(()=>true)}
        
         //头像的切换
         const switchImg=function(env){
            let headSculpture=document.getElementsByClassName('headSculpture')[0]
            let imgs=headSculpture.getElementsByTagName('img')
            if(env.target===headSculpture){
                return
            }
            for(let key=0;key<imgs.length;key++){
                imgs[key].className=null
                if(env.target===imgs[key]){
                    imgs[key].className='img-foucs'
                    setimgUrl(()=>env.target.src)
                    props.imgurlchangeL(env.target.src)
                }
            }
           env.preventDefault()
         } 
         //子传父头像的改变
         const freeImg=function (imgUrl) {
            let headSculpture=document.getElementsByClassName('headSculpture')[0]
            let imgs=headSculpture.getElementsByTagName('img')
            for(let key=0;key<imgs.length;key++){
                imgs[key].className=null
            }
            setimgUrl(imgUrl)
            props.imgurlchangeL(imgUrl)
        }

        const onSumbit =function (env) {
            if(props.nickname==''){
                setpropsisAlert(false)
            }else if(props.imgurl==''){
                setpropsMessage(()=>'请选择头像')
                setpropsisAlert(false)
            }else if(props.nickname.length>10){
                setpropsMessage(()=>'昵称小于10位')
                setpropsisAlert(false)
            }
            else{
                socket.emit('adduser',{name:props.nickname,header:props.imgurl})
                
            }
            env.preventDefault()
            
            socket.on('userMessage', function (data) {
                if(!data){
                    setpropsMessage(()=>'昵称重复')
                    setpropsisAlert(false)
                }else{
                   props.history.replace('/talkroom')
                }
              });
           
        }
    return (
        <div id='home'>
            <p id='common-title'>请输入您的昵称</p>
            <div className='home-form'>
                <label htmlFor="nickname">昵称：</label>
                <input type="text" id='nickname' onChange={throttle2(nickchange,1000)}/>
            </div>
            <p id='common-title'>请选择您的头像:</p>
            <div className='headSculpture' onClick={switchImg} >
                <img src="/assets/1.jpg" className='img-foucs' alt=""/>
                <img src="/assets/2.jpg" alt=""/>
                <img src="/assets/3.jpg" alt=""/>
                <img src="/assets/4.jpg" alt=""/>
                <img src="/assets/5.jpg" alt=""/>
                <img src="/assets/6.jpg" alt=""/>
                <img src="/assets/7.jpg" alt=""/>
                <img src="/assets/8.jpg" alt=""/>
                <img src="/assets/9.jpg" alt=""/>
            </div>
            <Upload freeimg={freeImg}></Upload>
           <div id='button-div'>
               <button id='button' onClick={onSumbit}>提交</button>
           </div>
           <PublicAlert message={propsMessage} changeAlert={changeAlert} isAlert={propsisAlert} ></PublicAlert>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return{
        nicknameChange:(data)=>dispatch(DispathNicknameChange(data)),
        imgurlchangeL:(data)=>dispatch(DispathImgUrlChange(data)),
        Peoplechange:DispathPeopleChange(dispatch),
        allmessages:DispatchAllMessage(dispatch)
    }
}

function mapStateToProps(state) {
    return{
        nickname:state.nickname,
        imgurl:state.imgurl,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(index)