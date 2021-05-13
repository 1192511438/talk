
import {NICKNAME_CHANGE,IMGURL_CHANGE, PEOPLE_CHANGE,TITLE_CHANGE,ALL_MESSAGE} from './action'
import {socket} from '../socket'
function DispathNicknameChange(data){
        return {
            type:NICKNAME_CHANGE,
            data
        }
}

function DispathImgUrlChange(data){
    return {
        type:IMGURL_CHANGE,
        data
    }
}

function DispathTitleChange(data){
    return{
        type:TITLE_CHANGE,
        data
    }
}


function DispathPeopleChange(dispatch){
    return()=>{
        socket.on('currentPeople',function(data){
            dispatch({
                type:PEOPLE_CHANGE,
                data
            })
        })
        
    }
}

function DispatchAllMessage(dispatch){
    return ()=>{
        socket.on('allmessage',function (data) {
            dispatch(
               {type:ALL_MESSAGE,
                data
            } 
            )
        })
    }
}

export {
    DispathNicknameChange,
    DispathImgUrlChange,
    DispathPeopleChange,
    DispathTitleChange,
    DispatchAllMessage
}