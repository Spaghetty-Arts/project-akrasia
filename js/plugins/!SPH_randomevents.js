var para=0;
function inicia() {
 if (para==0){
  $gameMap.event(1).setPosition(getRandom(15,15), getRandom(15,15));
  $gameMap.event(4).setPosition(getRandom(15,15), getRandom(15,15));
  $gameMap.event(5).setPosition(getRandom(15,15), getRandom(15,15));
  $gamePlayer.hideFollowers();
  $gamePlayer.refresh();
  para=1;
}}
function getRandom(min, max) {
  return Math.floor(Math.random() * 15);
}
var para=0;
function obtemarma(id) {
  $gameSwitches.setValue(id, true);
  $gameSwitches.setValue(Math.randomInt(5) + 1, true);
  //$gameSwitches.setValue(id, false);
  
}

function criaevento() {
  $gameMap.createNormalEventAt('guns', 1, 2, 3, 2, 10, true);
  
}
