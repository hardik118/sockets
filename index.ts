import express from "express";
import { WebSocket,WebSocketServer } from "ws";
const app= express();


const port = process.env.PORT || 3000;
function  onSocketError(e){
    console.log(e);

}
function  onSocketPostError(e){
    console.log(e);

}

const s= app.listen(port, ()=>{
    `The server has started at port ${port}`;

})

const wss= new WebSocketServer({noServer: true})

s.on('upgrade', (req,socket, head)=>{
    socket.on('error', onSocketError);
    // perform auht 
    wss.handleUpgrade(req, socket, head, (ws)=>{
        socket.removeAllListeners('error', onSocketError);
        wss.emit( 'connection',req, ws);
        
    })
});

wss.on('connection',(req, ws) =>{
    ws.on('error', onSocketPostError);
    ws.on('message', (msg, isBinary)=>{
        wss.clients.forEach((client)=>{
           if(client.readyState === WebSocket.OPEN){
            client.send(msg,{binary:isBinary});
           }
        })
    })
    ws.on('close', ()=>{
        console.log("the connection is closed ");
        
    })
});