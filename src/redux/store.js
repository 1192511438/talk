
import {createStore ,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {nickname,imgurl,currentPeople,title,AllMessage} from './reducer'


const AllReducers=combineReducers({
    nickname,
    imgurl,
    currentPeople,
    title,
    AllMessage
})

export default createStore(AllReducers,applyMiddleware(thunk))