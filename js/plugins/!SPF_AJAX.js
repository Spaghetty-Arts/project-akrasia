
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

            xhttp.open("POST", "http://localhost:8080/user/register", true);

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
                    playerID = obj.id;
                    playerName = obj.username;
                    console.log(playerName);
                    alert("Login com sucesso");
                    DataManager.setupMultiGame();
/*
                   AudioManager.playSe({"name": "linkStart", "volume": 100, "pitch": 100, "pan": 0});
                    if(!playVideo) {
                        playVideo = true;
                        Graphics.playVideo("movies/linkStart.webm");
                    }*/
                    SceneManager.goto(Scene_Map);

                } else if (this.readyState == 4 && this.status == 401) {
                    alert("Autenticação sem sucesso");
                }  else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }

                loadAjax(false);
            };

            xhttp.onerror = function(e){
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            let url = encodeURI("http://localhost:8080/user/login?email="+mail+"&pass="+pass);
            xhttp.open("PUT", url, true);
            xhttp.responseType = 'json';
            xhttp.send();
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


            let url = encodeURI("http://localhost:8080/user/reset?email="+mail);
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
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let obj = this.response;
                    playerName = obj.username;
                    alert("Username atualizado com sucesso");
                    Scene_InputDialog.prototype.afterResponse();

                } else if (this.readyState == 4 && this.status == 401) {
                    alert("Username já existe");
                }  else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    Scene_InputDialog.prototype.afterResponse();
                }

                loadAjax(false);
            };

            xhttp.onerror = function(e){
                alert("Existem problemas com o servidor tenta mais tarde");
            };

            let url = encodeURI("http://localhost:8080/user/changeName?id="+playerID+"&user="+user);
            xhttp.open("PUT", url, true);
            xhttp.responseType = 'json';
            xhttp.send();
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

    //done but need to see again
    DataManager.setupMultiGame = function() {

        this.createGameObjects();
        $gameParty.addActor(2);
        $gamePlayer.reserveTransfer(31, 4,  14);
        Graphics.frameCount = 0;
    };
