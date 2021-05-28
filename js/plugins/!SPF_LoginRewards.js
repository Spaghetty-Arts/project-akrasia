(function () {

    getNReward = function () {
        return playerReward;
    }

    loginReward = function (value) {
        let win;
        if(value < 7) {
            win = value * 100;
        } else {
            win = 700 * 100;
        }
        playerMoney += win;
        ajaxChangePlayerStats();
    }

    ajaxChangePlayerStats = function () {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //good
                } else if (this.readyState == 4 && this.status == 409) {
                    alert("Já existe uma conta com esse username/email");
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                }

            };

            xhttp.open("PUT", "http://localhost:8080/user/updateStats/" + playerID, true);

            xhttp.setRequestHeader("Content-Type", "application/json");

            var data = JSON.stringify({"life": playerLife, "money": playerMoney});
            xhttp.send(data);

        } catch (e) {
            if(e.name == 'NetworkError'){
                alert("Existem problemas com o servidor tenta mais tarde");
            } else {
                alert("Existem problemas tenta mais tarde");
            }
        }
    }
})();