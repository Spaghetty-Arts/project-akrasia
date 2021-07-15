(function () {

    logout = function () {
            try {
                var xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        //good
                        resetVar();
                    } else if (this.readyState == 4 && this.status == 401) {
                        alert("Erro");
                    } else if (this.readyState == 4 && this.status == 500) {
                        alert("Ocorreu um erro no servidor");
                        SceneManager.exit();
                        window.close();
                    }

                };

                xhttp.open("PUT", "http://"+iprest+"/user/logout/", true);
                xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
                xhttp.setRequestHeader("Content-Type", "application/json");

                var data = JSON.stringify({"id": playerID});
                xhttp.send(data);

            } catch (e) {
                if(e.name == 'NetworkError'){
                    alert("Existem problemas com o servidor tenta mais tarde");
                } else {
                    alert("Existem problemas tenta mais tarde");
                }
            }
    }

    resetVar = function () {
        playerID = null;
        playerName = null;
        playerReward = null;
        playerDaily = null;
        playerToken = null;
        playerGotReward = null;

        playerLife = null;
        playerMoney = null;
        playerALevel = null;

        playerWin = null;
        playerLose = null;
        playerRank = null;

    }

    closeG = function () {
        SceneManager.exit();
        window.close();
    }
})();
