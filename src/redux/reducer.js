 import {NICKNAME_CHANGE,IMGURL_CHANGE,PEOPLE_CHANGE,TITLE_CHANGE,ALL_MESSAGE} from './action'
 const nickname= function(preState='',action){
    switch (action.type) {
        case NICKNAME_CHANGE:
            return action.data
        default:
            return preState
    }

}


const imgurl=function(preState='/assets/1.jpg',action){
    switch (action.type) {
        case IMGURL_CHANGE:
            return action.data
        default:
            return preState
    }
}



const currentPeople=function(preState=0,action) {
    switch (action.type) {
        case PEOPLE_CHANGE:
            return action.data
    
        default:
            return preState
    }
}


const title=function(preState=true,action){
    switch (action.type) {
        case TITLE_CHANGE:
            return action.data
    
        default:
            return preState
    }
};


const AllMessage=function(preState=[],action){
    switch (action.type) {
        case ALL_MESSAGE:
            return action.data
    
        default:
            return preState
    }
}
export {
    nickname,
    imgurl,
    currentPeople,
    title,
    AllMessage
}