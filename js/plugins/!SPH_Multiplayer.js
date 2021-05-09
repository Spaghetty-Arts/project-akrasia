const ws = new WebSocket('ws://localhost:9990/chat');
var xpos=1;
var ypos=2;
//var id=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
var id=1;
var ida=2;
 function waitForSocketConnection(socket, callback){
         setTimeout(
             function(){
                 if (socket.readyState === 1) {
                     if(callback !== undefined){
                         callback();
                     }
                     return;
                 } else {
                     waitForSocketConnection(socket,callback);
                 }
             }, 5);
     };
function obterlocal(){
var x=$gamePlayer.x;
var y=$gamePlayer.y;
var dir=$gamePlayer.direction();
// Ao enviar uma mensagem

        // Objeto com os dados que serão trafegados
        data = {
            id:id,
            ida:ida,
            x: x,
            y: y,
            dir:dir,
        };
        console.log(data);
  /*      waitForSocketConnection(ws, function() {
      ws.send(JSON.stringify(data));
});
        */
     //  ws.onopen = function(response) {
        // Serializamos o objeto para json
        ws.send(JSON.stringify(data));
  //};


}

function receber(){

var charEvent = $gameMap._events[1];

  ws.addEventListener('message', function (event) {
    console.log('---'+data);
      // Deserializamos o objeto
       data = JSON.parse(event.data);
      // Escrevemos no DOM
      if (data.ida==id){
if(data.x<1 || data.x<100){
  
    // setpos(data.x, data.y);
      //$gameMap.event(1).x = data.x;
       //$gameMap.event(1).y = data.y;
       charEvent.moveStraight(charEvent.findDirectionTo(data.x, data.y));
      // $gameMap.event(1).moveStraight(data.dir);
       $gameMap.event(1).setDirection(data.dir);
    }}
    //console.log('x:' + data.x + " | y:" + data.y);
  });


}
function setpos(x,y){
$gameMap.event(1).setPosition(x, y);


}
/*
socket.on('message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});*/
