const express=require("express");
const http=require("http");
const app=express();
const server=http.createServer(app);
const socket=require("socket.io");
const io=socket(server);


io.on("connection", socket =>{
    
    socket.emit("your id",socket.id);      // server emit event client emit event server lishen event client lishen event
    socket.emit("your password",1234);
    socket.on("send message", body => {
        
            io.emit("message",body)                              //  all teh client get this message 
    })


})



server.listen(8000,()=>console.log("your server is running on port :8000"));