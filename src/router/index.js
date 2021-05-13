import React,{lazy} from 'react'


const HomeRouter={
    component:lazy(()=>import('../page/home/index')),
    id:1,
    path:'/'
}

const TalkRoomRouter={
    component:lazy(()=>import('../page/talkroom/index')),
    id:2,
    path:'/talkroom'
}



const AllRouters=[HomeRouter,TalkRoomRouter]

export default AllRouters