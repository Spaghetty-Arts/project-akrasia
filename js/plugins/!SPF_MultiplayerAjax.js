(function () {
    changeState = function (state) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                } else if (this.readyState == 4 && this.status == 401) {
                    alert("Autenticação sem sucesso");
                } else if (this.readyState == 4 && this.status == 403) {
                    alert("Dados Errados");
                }else if (this.readyState == 4 && this.status == 404) {
                    alert("Utilizador não existe");
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("Utilizador está a jogar de momento");
                }  else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }

            };

            xhttp.onerror = function(e){
                console.log(e);
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            let url = encodeURI("http://"+iprest+"/user/state/");
            xhttp.open("PUT", url, true);

            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            var data = JSON.stringify({"id": playerID, "userOnline": state});
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

    battleRecord = function (winner, loser) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                } else if (this.readyState == 4 && this.status == 401) {
                    alert("Autenticação sem sucesso");
                } else if (this.readyState == 4 && this.status == 403) {
                    alert("Dados Errados");
                }else if (this.readyState == 4 && this.status == 404) {
                    alert("Utilizador não existe");
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("Utilizador está a jogar de momento");
                }  else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }

            };

            xhttp.onerror = function(e){
                console.log(e);
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            let url = encodeURI("http://"+iprest+"/pvp/end/"+winner+"/"+loser);
            xhttp.open("POST", url, true);

            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            xhttp.send();

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

    winLose = function (result) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    $gamePlayer.reserveTransfer(31, 5,  16);
                } else if (this.readyState == 4 && this.status == 401) {
                    alert("Autenticação sem sucesso");
                } else if (this.readyState == 4 && this.status == 403) {
                    alert("Dados Errados");
                }else if (this.readyState == 4 && this.status == 404) {
                    alert("Utilizador não existe");
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("Utilizador está a jogar de momento");
                }  else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }

            };

            xhttp.onerror = function(e){
                console.log(e);
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            let url = encodeURI("http://"+iprest+"/pvp/result/"+result);
            xhttp.open("PUT", url, true);

            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            var data = JSON.stringify({"id": playerID});
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