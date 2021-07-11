decrementaVida = function() {
  switch (armaAd) {
    case 1:
      //Instruções executadas quando o resultado da expressão for igual á valor1
    //  playerLife-=1;
      playerLife--;
      break;
    case 2:
      //Instruções executadas quando o resultado da expressão for igual á valor2
playerLife-=5;
      break;
    case 3:
      //Instruções executadas quando o resultado da expressão for igual á valorN
playerLife-=10;
      break;
    case 4:
        //Instruções executadas quando o resultado da expressão for igual á valorN
playerLife-=10;
      break;
    case 5:
          //Instruções executadas quando o resultado da expressão for igual á valorN
playerLife-=10;
    break;
    default:
      playerLife--;
      //Instruções executadas quando o valor da expressão é diferente de todos os cases
      break;
  }
}

verificaVida = function(){
  if(playerLife<=0){
      $gameSelfSwitches.setValue([$gameMap._mapId, 12, "A"], true);
  }
}

looseMul = function () {
    alert('Perdeste');
    $gameSwitches.setValue(4, false);
    playerLife = 100 + playerALevel * 10;
    winLose(0);
}