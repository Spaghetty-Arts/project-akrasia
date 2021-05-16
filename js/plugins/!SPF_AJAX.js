
    ajaxRPostRequest = function(user, pass) {

        // create a new Ajax request
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Conta criada com sucesso");
            } else if (this.readyState == 4 && this.status == 409) {
                alert("Username já existe");
            }
        };

        xhttp.open("POST", "http://localhost:8080/user/register", true);

        xhttp.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({"username": user, "password": pass});
        xhttp.send(data);

    }

    ajaxLGetRequest = function(user, pass) {

        // create a new Ajax request
        var xhttp = new XMLHttpRequest();

        let url = encodeURI("http://localhost:8080/user/login?user="+user+"&pass="+pass);
        xhttp.open("GET", url, true);

        xhttp.send();

        if (xhttp.readyState == 4 && xhttp.status == 200) {
            alert("Login com sucesso");
        } else if (xhttp.readyState == 4 && xhttp.status == 400) {
            alert("Dados Inválidos");
        }
    }

