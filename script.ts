(function (){
    let ws:WebSocket;
    const messages= <HTMLElement>document.getElementById('messages');
    const wsOpen= <HTMLButtonElement>document.getElementById("ws-open");
    const wsClose=<HTMLButtonElement> document.getElementById("ws-Close");
    const wsInput=<HTMLInputElement> document.getElementById("ws-input");
    const wsSend= <HTMLButtonElement>document.getElementById("ws-send");

function showMessage(msg:string){
    if(!messages){
        return;
    }
    messages.textContent+=`\n${msg}`;
    messages.scrollTop= messages?.scrollHeight;


}
wsOpen.addEventListener('click', ()=>{
    if(!!ws){
        ws.close;

    }
    ws= new WebSocket("ws://localhost:3000");

    ws.addEventListener('error', ()=>{
        showMessage("websocket Error");

    })
    ws.addEventListener('open', ()=>{
        showMessage("websocket connection established");
        
    })
    ws.addEventListener('close', ()=>{
        showMessage("websocket coonection closed");
        
    })
    ws.addEventListener('message', (msg:MessageEvent<string>)=>{
        showMessage(`message recieved: ${msg.data}`);
        
    })
});

wsClose.addEventListener('click', ()=>{
    if(!!ws){
        ws.close;

    }
});

wsSend.addEventListener('click', ()=>{
    const val= wsInput?.value;
    if(!val){
        return ;

    }else if (!ws){
        showMessage("NO web socket connection ");
        return;

    }
    ws.send(val);
    showMessage(`sent "${val}"`)
})



})();