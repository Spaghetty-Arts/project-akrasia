const ws = new WebSocket('ws://84.90.189.228:70/chat');

var xpos=2;
var ypos=1;
var disparo=0;

//var id=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
var id;  //id player var

var ida; // id do adversario

var dispok=1;

var parastart=0;
function startgame() {
 if (parastart==0){
  if(id>=ida){
    console.log('----------------------------VERMELHO');
  //  $gameActors.actor(1).setCharacterImage("zeke_arma", 0);
  //  $gamePlayer.refresh();
    $gameMap.event(1).setImage("zeke_arma2", 0);
    $gameMap.event(1).setPosition(13, 19);
    $gamePlayer.locate(27, 19);
  }else{
    console.log('----------------------------VERDE');
  //  $gameActors.actor(1).setCharacterImage("zeke_arma", 0);
  //  $gamePlayer.refresh();
    $gameMap.event(1).setImage("zeke_arma2", 0);
    $gameMap.event(1).setPosition(27, 19);
    $gamePlayer.locate(13, 19);
  }

parastart=1;
openMU();
}
}

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
            disparo:disparo,
            lifead:playerLife,
            arma:armaAtual,
        };
      //  console.log(data);
  /*      waitForSocketConnection(ws, function() {
      ws.send(JSON.stringify(data));
});
        */
  // ws.onopen = function(response) {
        // Serializamos o objeto para json
        ws.send(JSON.stringify(data));
        disparo=0;
  //};

  $gameSelfSwitches.setValue([$gameMap._mapId, 7, "A"], true);

}

function receber(){

var charEvent = $gameMap._events[1];

  ws.addEventListener('message', function (event) {
  //  console.log('---'+data);
      // Deserializamos o objeto
       data = JSON.parse(event.data);
      // Escrevemos no DOM
      if (data.ida==id){
        armaAd=data.arma;
        enemieID = data.id;
        enemieHealth = data.lifead;
        if(enemieHealth<=0){
            $gameSelfSwitches.setValue([$gameMap._mapId, 5, "A"], true);
        }
if(data.x<100){
    // setpos(data.x, data.y);
      //$gameMap.event(1).x = data.x;
       //$gameMap.event(1).y = data.y;
       charEvent.moveStraight(charEvent.findDirectionTo(data.x, data.y));
      // $gameMap.event(1).moveStraight(data.dir);
       $gameMap.event(1).setDirection(data.dir);
       if(data.disparo==1){
verifica();


       }
    }


  }
    //console.log('x:' + data.x + " | y:" + data.y);
  });

  $gameSelfSwitches.setValue([$gameMap._mapId, 10, "A"], true);
}
function setpos(x,y){
$gameMap.event(1).setPosition(x, y);


}


function verifica(){
if(dispok==1){

                shootAnimation(4, 0);
                Galv.PROJ.dir(1,0,8,4,'bullet0(8,5)',130,'c(55)|c(2)',[5],[],3,1);
                AudioManager.playSe({name: "pistolShot", pan: 0, pitch: 100, volume: 100});
                dispok=0;
                $gameSelfSwitches.setValue([$gameMap._mapId, 19, "A"], true);


              }
}
/*
socket.on('message', function(msg) {
  var item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});*/


function wonMul() {
    swal("Ganhaste!", {
        icon: "info",
        timer: 3000,
    });
    winLose(1);
}
