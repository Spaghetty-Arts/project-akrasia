
    ajaxResisterRequest = function(user, pass, mail) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    swal({
                        title: "Sucesso!",
                        text: "Conta criada com sucesso!",
                        icon: "info",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                } else if (this.readyState == 4 && this.status == 409) {
                    swal({
                        title: "Erro!",
                        text: "Já existe um conta com esses dados!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    });
                } else if (this.readyState == 4 && this.status == 500) {
                    swal({
                        title: "Erro!",
                        text: "Ocorreu um erro no servidor!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                    Scene_InputDialog.prototype.afterResponse();
                }
                loadAjax(false);

            };

            xhttp.onerror = function(e){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro no servidor!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            };

            xhttp.open("POST", "http://"+iprest+"/auth/register", true);

            xhttp.setRequestHeader("Content-Type", "application/json");

            var data = JSON.stringify({"username": user, "password": pass, "email": mail});
            xhttp.send(data);
            loadAjax(true);
        } catch (e) {
            if(e.name == 'NetworkError'){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro no servidor!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            } else {
                swal({
                    title: "Erro!",
                    text: "Existem problemas tenta mais tarde!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
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
                        icon: "info",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                            DataManager.setupMultiGame();
                            SceneManager.goto(Scene_Map);
                    });


                } else if (this.readyState == 4 && this.status == 401) {
                    swal({
                        title: "Erro!",
                        text: "Autenticação sem sucesso!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                } else if (this.readyState == 4 && this.status == 403) {
                    swal({
                        title: "Erro!",
                        text: "Dados errados",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                }else if (this.readyState == 4 && this.status == 404) {
                    swal({
                        title: "Erro!",
                        text: "Utilizador não existe!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                } else if (this.readyState == 4 && this.status == 409) {
                    swal({
                        title: "Erro!",
                        text: "Já está aberta uma sessão, iremos fecha-la! Inice sessão novamente!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                }  else if (this.readyState == 4 && this.status == 500) {
                    swal({
                        title: "Erro!",
                        text: "Ocorreu um erro no servidor!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                }

                loadAjax(false);
            };

            xhttp.onerror = function(e){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro no servidor!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            };

            xhttp.open("PUT", "http://"+iprest+"/auth/login", true);

            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            var data = JSON.stringify({"email": mail, "password": pass});
            xhttp.send(data);
            loadAjax(true);
        } catch (e) {
            if(e.name == 'NetworkError'){
                swal({
                    title: "Erro!",
                    text: "Existem problemas com o servidor tenta mais tarde!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            }
            else {
                swal({
                    title: "Erro!",
                    text: "Existem problemas com o servidor tenta mais tarde!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            }
        }
    }

    ajaxResetRequest = function (mail) {
        try {
            // create a new Ajax request
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    swal({
                        title: "Sucesso!",
                        text: "Reset enviado para o email " + mail,
                        icon: "info",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });


                } else if (this.readyState == 4 && this.status == 409) {
                    swal({
                        title: "Erro!",
                        text: "Email não está associado a nenhuma conta",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    });
                } else if (this.readyState == 4 && this.status == 500) {
                    swal({
                        title: "Erro!",
                        text: "Ocorreu um erro no servidor!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                }
                loadAjax(false);
            };

            xhttp.onerror = function(e){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro no servidor!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            };

            let url = encodeURI("http://"+iprest+"/auth/reset/"+mail);
            xhttp.open("POST", url, true);

            xhttp.send();
            loadAjax(true);
        } catch (e) {
            if(e.name == 'NetworkError'){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro no servidor!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            } else {
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro tenta mais tarde!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            }
        }
    }

    ajaxChangeRequest = function(user) {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    swal({
                        title: "Sucesso!",
                        text: "Nome alterado com sucesso",
                        icon: "info",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        let obj = this.response;
                        saveData(obj);
                        Scene_InputDialog.prototype.afterResponse();
                    });

                } else if (this.readyState == 4 && this.status == 401) {
                    swal({
                        title: "Erro!",
                        text: "Username já existe!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });
                } else if (this.readyState == 4 && this.status == 500) {
                    swal({
                        title: "Erro!",
                        text: "Ocorreu um erro tenta mais tarde!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        Scene_InputDialog.prototype.afterResponse();
                    });

                } else if (this.readyState == 4 && this.status == 409) {
                    swal({
                        title: "Erro!",
                        text: "Username já existe",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    });
                }

            };

            xhttp.open("PUT", "http://"+iprest+"/user/changeName/", true);

            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            xhttp.responseType = 'json';

            var data = JSON.stringify({"id": playerID, "username": user});
            xhttp.send(data);

        } catch (e) {
            if(e.name == 'NetworkError'){
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro tenta mais tarde!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
            } else {
                swal({
                    title: "Erro!",
                    text: "Ocorreu um erro tenta mais tarde!",
                    icon: "error",
                    button: "Ok",
                    timer: 5000,
                }).then((value) => {
                    Scene_InputDialog.prototype.afterResponse();
                });
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
