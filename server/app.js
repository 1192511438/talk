
var express = require('express');
var app=express()
var server = require('http').Server(app);
var io = require('socket.io')(server,{ cors: true });



server.listen(80);


const name=[]//只存名字
const allMessage=[]//存名字和对应的头像
io.on('connection', function (socket) {
  socket.on('adduser', function (data) {
    if(!name.includes(data.name)){
        name.push(data.name)
        allMessage.push(data)
        io.emit('broadcast',{type:'join',message:data.name+'加入了聊天室'})//广播加入聊天室
        io.emit('currentPeople',name.length) //广播人数
        socket.emit('userMessage',true)
        io.emit('allmessage',allMessage)
    }else{
        socket.emit('userMessage',false)
    }

    socket.on('news',function(data){
      io.emit('broadcast',{type:'talk',message:data.message,img:data.img,name:data.name})
    })

    socket.on('receiveImg',function(data){
      io.emit('broadcast',{type:'img',message:data.message,img:data.img,name:data.name})
    })


    socket.on('disconnect',function(){
      name.splice(name.findIndex((value)=>{return value===data}),1)
      allMessage.splice(allMessage.findIndex((value)=>{return value.name===data.name}),1)
      io.emit('broadcast',{type:'leave',message:data.name+'离开了聊天室'})
      io.emit('currentPeople',name.length)
      io.emit('allmessage',allMessage)
    })
  });
});