import React,{useEffect,useState,useRef} from 'react'
import {connect} from 'react-redux'
import './css/index'
import { DispathPeopleChange,DispathTitleChange,DispatchAllMessage} from '../../redux/createAction'
import {socket} from '../../socket'
import Common from '../../component/join/index'
import Talk from '../../component/talk/index'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import People from '../people/index'
import {
    SmileOutlined,
    AreaChartOutlined
  } from '@ant-design/icons';
function index(props) {
    
        const Text=useRef()

        const send=function(){
            if(Text.current.value==''){
                return
            }else{
                socket.emit('news',{message:Text.current.value,img:props.header,name:props.nickname})
                Text.current.value=''
            }
                
            }

        const [news,setNews]=useState([])
        let isMounted=false
        useEffect(()=>{
            if(!props.nickname){
                props.history.replace('/')
                props.titleChange(true)
            }else{
                props.titleChange(false)
            }
            
                props.Peoplechange()
                props.allmessages()
                setNews((state)=>{
                    state.push({type:'join',message:'"我"加入了聊天室'})
                    let Newstate =state.splice(0)
                    return Newstate
                })

                socket.on('broadcast',function(data){
                    if(!isMounted){
                        setNews((state)=>{
                            state.push(data)
                            let newState=state.splice(0)
                            return newState
                        })
                    }
                    
                })
                return ()=>{
                    isMounted=true
                }
            },[])

                //监听聊天的是否超过本身高度。是调用scrollView
               const talkContent= useRef()
            useEffect(()=>{
                talkContent.current.scrollTop=talkContent.current.scrollHeight-talkContent.current.offsetHeight
            },[news])
            
            //发送图片
            const ChartOutlined=useRef()
            const sendCharImg=function(env){
                let file= env.target.files[0]
                const reader=new FileReader()
                reader.onload=function(event){
                    socket.emit('receiveImg',{message:event.target.result,img:props.header,name:props.nickname})
                }
                if(file){
                    reader.readAsDataURL(file)
                }
                
            }

            //发送文件
            const FileUpload=useRef()
            const sendFile=function(env){
                let file= env.target.files[0]
               
                console.log(file)
                    socket.emit('receiveFile',{message:file,img:props.header,name:props.nickname})
                
              
            }
            //表情包
            const [emoji,setEmoji]=useState(false)
            const emojiClick=function(){
                
               if (emoji){
                setEmoji(()=>false)
               }else{
                setEmoji(()=>true)
               }
            }

            //名单界面
            const [isshowPeople,setisshowPeople]=useState(false)

            return (
        <div id='talk-room'>
            <div style={{flexShrink:0,position:'relative'}}>
                {isshowPeople?<People isshow={()=>{setisshowPeople((state)=>!state)}} />:null}
                <span className='menu-span' onClick={()=>{setisshowPeople((state)=>!state)}}>
                    <svg viewBox="0 0 1024 1024" focusable="false" data-icon="bars" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path></svg></span>
            <span className='talk-tag'>聊天室({props.currentPeople})</span>
          
            </div>
            {emoji?<Picker sheetSize={16}  style={{ zIndex:1000,width:320, position: 'absolute', bottom: '120px',left:'0%'}} onSelect={(a)=>{Text.current.value=Text.current.value+a.native;setEmoji(()=>false);Text.current.focus()}} />:null} 
            <div ref={talkContent} id='talk-content' onClick={()=>{setEmoji(()=>false)}}>
                {news.map((value,key)=>{
                    if(value.type==='join'){
                        if(value.message.includes(props.nickname)){
                            return
                        }
                        return(<Common color={'#975ec9'} key={key}>{value.message}</Common>)
                    }else if(value.type==='leave'){
                        return(<Common color={'#ff4d4f'} key={key}>{value.message}</Common>)
                    }else if(value.type==='talk'){
                        return(<Talk nickname={value.name} message={value.message} header={value.img} key={key}>{value.message}</Talk>)
                    }else if(value.type==='img'){
                        return(<Talk nickname={value.name} message={<img className='message-img' src={value.message}></img>} header={value.img} key={key}>{value.message}</Talk>)
                    }else{
                       return
                    }
                    
                    
                })}
            </div>
            <div id='talk-input-container'>
                <div id='message-system'>
                    <span style={{marginLeft:3}} onClick={emojiClick}>
                        <SmileOutlined></SmileOutlined>
                    </span>
                    <span style={{marginLeft:7}} onClick={()=>{ChartOutlined.current.click()}}>
                        <input accept='imgae/*' onChange={sendCharImg} ref={ChartOutlined} type="file" style={{width:0,height:0}}/>
                        <AreaChartOutlined />
                    </span>
                
                </div>
                <div id='talk-input'>
                <textarea ref={Text} type="text"></textarea>
                </div>
                <div id='enter' >
                        <button onClick={send} onTouchEnd={(env)=>{env.target.style.backgroundColor='#fff'}} onTouchStart={(env)=>{env.target.style.backgroundColor='#f5f5f5'}} className='btn-commit'>发送</button>
                </div>
            
            </div>
            

        </div>
    )
}

function mapStateToProps(state){
    return{
        nickname:state.nickname,
        header:state.imgurl,
        currentPeople:state.currentPeople
    }
}

function mapDispatchToProps(dispatch){
    return{
      Peoplechange:DispathPeopleChange(dispatch),
      titleChange:(data)=>dispatch( DispathTitleChange(data)),
      allmessages:DispatchAllMessage(dispatch)
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(index)