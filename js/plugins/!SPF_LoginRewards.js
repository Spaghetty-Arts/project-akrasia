(function () {

    getNReward = function () {
        return playerReward;
    }

    loginReward = function (value) {
        let win;
        if(value < 7) {
            win = value * 100;
        } else {
            win = 700;
        }
        playerMoney += win;
        ajaxChangePlayerMoney();
    }

    ajaxChangePlayerMoney = function () {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //good
                } else if (this.readyState == 4 && this.status == 403) {
                    alert("Já recebeste o diario");
                }else if (this.readyState == 4 && this.status == 404) {
                    alert("Não existe esse user....");
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    SceneManager.exit();
                    window.close();
                }

            };

            xhttp.open("PUT", "http://localhost:8080/user/dailyReward/", true);
            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            var data = JSON.stringify({"id": playerID, "money": playerMoney});
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