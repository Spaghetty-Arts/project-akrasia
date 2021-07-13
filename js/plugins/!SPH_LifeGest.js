decrementaVida = function() {
  switch (armaAd) {
    case 1:
      //Instruções executadas quando o resultado da expressão for igual á valor1
    //  playerLife-=1;
        playerLife-=5;
      break;
    case 2:
      //Instruções executadas quando o resultado da expressão for igual á valor2
playerLife-=5;
      break;
    case 3:
      //Instruções executadas quando o resultado da expressão for igual á valorN
        playerLife-=5;
      break;
    case 4:
        //Instruções executadas quando o resultado da expressão for igual á valorN
        playerLife-=5;
      break;
    case 5:
          //Instruções executadas quando o resultado da expressão for igual á valorN
        playerLife-=5;
    break;
    default:
        playerLife-=5;
      //Instruções executadas quando o valor da expressão é diferente de todos os cases
      break;
  }
}

verificaVida = function(){
  if(playerLife<=0){
      $gameSelfSwitches.setValue([$gameMap._mapId, 6, "A"], true);
  }
}

looseMul = function () {
    swal("Perdeste!", {
        icon: "error",
        timer: 3000,
    });
    winLose(0);
}
