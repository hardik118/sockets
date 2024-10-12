const express= require("express");
const path= require("path");
const { Socket } = require("socket.io");
const port= 3000;
const app =express();
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine", "ejs")


app.get("/", (req, res)=>{
    res.render("chatRoom");
})
const server= app.listen(port, ()=>{
    console.log("the server has starte don port"+port)
})
const io= require("socket.io")(server);

let socketsConnected= new Set();

io.on('connection', onConnected)


function onConnected(socket){
  socketsConnected.add(socket.id);

  console.log(socket.id);
  console.log(socketsConnected.size);

  io.emit('Total-Client',socketsConnected.size);

  socket.on('disconnect', ()=>{
    socketsConnected.delete(socket.id);

    io.emit('Total-Client',socketsConnected.size);
})

socket.on("message", (data)=>{
    console.log(data);
    socket.broadcast.emit("userMessage", data);
})
socket.on('feedback', (data)=>{
    socket.broadcast.emit("feedback", data);
  
})
}



