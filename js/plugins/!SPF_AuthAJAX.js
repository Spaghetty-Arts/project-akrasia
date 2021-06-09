
    ajaxResisterRequest = function(user, pass, mail) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Conta criada com sucesso");
                    Scene_InputDialog.prototype.afterResponse();
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("Já existe uma conta com esse username/email");
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }
                loadAjax(false);

            };

            xhttp.open("POST", "http://localhost:8080/auth/register", true);

            xhttp.setRequestHeader("Content-Type", "application/json");

            var data = JSON.stringify({"username": user, "password": pass, "email": mail});
            xhttp.send(data);
            loadAjax(true);
        } catch (e) {
            if(e.name == 'NetworkError'){
                alert("Existem problemas com o servidor tenta mais tarde");
            } else {
                alert("Existem problemas tenta mais tarde");
            }
        }
    }



    ajaxLoginRequest = function(mail, pass) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let obj = this.response;
                    saveData(obj);
                    //console.log(playerName);
                    swal({
                        title: "Sucesso!",
                        text: "O login ocorreu com sucesso!",
                        icon: "success",
                        button: "Ok",
                        timer: 5000,
                    });
                    DataManager.setupMultiGame();
                    SceneManager.goto(Scene_Map);

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

                loadAjax(false);
            };

            xhttp.onerror = function(e){
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            xhttp.open("PUT", "http://localhost:8080/auth/login", true);

            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            var data = JSON.stringify({"email": mail, "password": pass});
            xhttp.send(data);
            loadAjax(true);
        } catch (e) {
            if(e.name == 'NetworkError'){
                alert("Existem problemas com o servidor tenta mais tarde");
            }
            else {
                alert("Existem problemas tenta mais tarde");
            }
        }
    }

    ajaxResetRequest = function (mail) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Reset enviado para o email " + mail);
                    Scene_InputDialog.prototype.afterResponse();
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("Email não pertence a uma conta");
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }
                loadAjax(false);
            };


            let url = encodeURI("http://localhost:8080/auth/reset/"+mail);
            xhttp.open("POST", url, true);

            xhttp.send();
            loadAjax(true);
        } catch (e) {
            if(e.name == 'NetworkError'){
                alert("Existem problemas com o servidor tenta mais tarde");
            } else {
                alert("Existem problemas tenta mais tarde");
            }
        }
    }

    ajaxChangeRequest = function(user) {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Nome alterado com sucesso");
                    playerName = user;
                    Scene_InputDialog.prototype.afterResponse();
                } else if (this.readyState == 4 && this.status == 401) {
                    alert("Erro");
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    SceneManager.exit();
                    window.close();
                }

            };

            xhttp.open("PUT", "http://localhost:8080/user/changeName/", true);

            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            var data = JSON.stringify({"id": playerID, "username": user});
            xhttp.send(data);

        } catch (e) {
            if(e.name == 'NetworkError'){
                alert("Existem problemas com o servidor tenta mais tarde");
            } else {
                alert("Existem problemas tenta mais tarde");
            }
        }
    }

    //done but need to see again
    DataManager.setupMultiGame = function() {

        this.createGameObjects();
        $gameParty.removeActor(1);
        $gameParty.addActor(2);
        $gamePlayer.reserveTransfer(31, 5,  16);
        Graphics.frameCount = 0;
    };

saveData = function (obj) {
    playerID = obj.id;
    playerName = obj.username;
    playerToken = obj.user_token;
    playerGotReward = obj.got_reward;
    playerDaily = obj.login_reward;

    playerMoney = obj.money;
    playerALevel = obj.life;
    playerLife = playerALevel * 100;

    playerWin = obj.win;
    playerLose = obj.lose;
    playerRank = obj.rank;
}
