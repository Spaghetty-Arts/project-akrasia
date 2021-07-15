(function () {

    sendInvite = function (username) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let obj = this.response;

                    //console.log(playerName);
                    swal({
                        title: "Sucesso!",
                        text: "Pedido enviado!",
                        icon: "info",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        $gameSelfSwitches.setValue([31, 12, 'A'], true);
                            enviaConvite(playerID, playerName, obj.username);
                        AudioManager.stopBgm();
                        SceneManager.pop();
                    });


                } else if (this.readyState == 4 && this.status == 401) {
                  swal({
                      title: "Erro!",
                      text: "Token de Sessão Inválido!",
                      icon: "error",
                      button: "Ok",
                      timer: 5000,
                  });
                } else if (this.readyState == 4 && this.status == 404) {

                    swal({
                        title: "Erro!",
                        text: "Utilizador não existe!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    });
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }else if (this.readyState == 4 && this.status == 409) {
                    swal({
                        title: "Erro!",
                        text: "O adversário não está disponível",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    });
                }
                else if (this.readyState == 4 && this.status == 400) {
                    swal({
                        title: "Erro!",
                        text: "Este é o seu username tente combater com outro jogador!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    });
                }
            };

            xhttp.onerror = function(e){
                console.log(e);
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            let url = encodeURI("http://"+iprest+"/pvp/play/"+playerID);
            xhttp.open("PUT", url, true);

            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            var data = JSON.stringify({"username": username});
            xhttp.send(data);

        } catch (e) {
            if(e.name == 'NetworkError'){
                alert("Existem problemas com o servidor tenta mais tarde");
            }
            else {
                console.log(e);
                alert("Existem problemas tenta mais tarde");
            }
        }
    }

})();
