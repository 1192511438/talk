import React,{useRef} from 'react'
import './css/index'
export default function index(props) {
    const fileInput =useRef()
    const uploadDiv=useRef()
    const Click=function(env){
        let file= env.target.files[0]
        const reader=new FileReader()
        reader.addEventListener('load',function(event){
            uploadDiv.current.style.backgroundImage=`url(${event.target.result})`
            uploadDiv.current.innerHTML=''
            props.freeimg(event.target.result)
        })
        reader.readAsDataURL(file)
       
    }
    return (
        <div id='upload'>
            <div ref={uploadDiv} className='upload-show' onClick={()=>{fileInput.current.click()}}>+</div>
            <input ref={fileInput} type="file" onChange={Click}/>
        </div>
    )
}
