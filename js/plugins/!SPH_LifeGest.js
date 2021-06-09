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
      //Instruções executadas quando o valor da expressão é diferente de todos os cases
      break;
  }
}

verificaVida = function(){
  if(playerLife<=0){
    alert('Perdeste');
  }
}
