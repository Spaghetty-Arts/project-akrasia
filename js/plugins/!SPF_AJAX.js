
    ajaxResisterRequest = function(user, pass, mail) {

        // create a new Ajax request
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Conta criada com sucesso");
            } else if (this.readyState == 4 && this.status == 409) {
                alert("Username já existe");
            }
        };

        xhttp.open("POST", "http://localhost:8080/user/register", false);

        xhttp.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({"username": user, "password": pass, "email": mail});
        xhttp.send(data);

    }

    ajaxLoginRequest = function(mail, pass) {

        // create a new Ajax request
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Login com sucesso");
            } else if (this.readyState == 4 && this.status == 401) {
                alert("Autenticação sem sucesso");
            }
        };


        let url = encodeURI("http://localhost:8080/user/login?email="+mail+"&pass="+pass);
        xhttp.open("GET", url, false);

        xhttp.send();

    }

    ajaxResetRequest = function (mail) {
        // create a new Ajax request
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Reset enviado para o email " + mail);
            } else if (this.readyState == 4 && this.status == 401) {
                alert("Autenticação sem sucesso");
            }
        };


        let url = encodeURI("http://localhost:8080/user/reset?email="+mail);
        xhttp.open("GET", url, false);

        xhttp.send();
    }

