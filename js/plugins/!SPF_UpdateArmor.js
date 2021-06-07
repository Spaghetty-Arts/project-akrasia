(function () {

    getArmor = function () {
        $gameVariables.setValue(84, playerALevel);
        if (playerALevel < 10) {
            $gameVariables.setValue(85, 100 * playerALevel);
        }
    }

    checkCurr = function (val) {
        if(playerMoney >= val) {
            playerMoney = playerMoney - val;
            return true;
        }
        return false;
    }

    updateArmor = function () {
        playerALevel++;
        playerLife = playerALevel * 100;
    }

    ajaxChangePlayerArmor = function () {
        try {
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //good
                } else if (this.readyState == 4 && this.status == 400) {
                    alert("Aconteceu algo");
                }else if (this.readyState == 4 && this.status == 403) {
                    alert("Aconteceu algo");
                } else if (this.readyState == 4 && this.status == 500) {
                    alert("Ocorreu um erro no servidor");
                    SceneManager.exit();
                    window.close();
                }

            };

            xhttp.open("PUT", "http://localhost:8080/user/updateArmor/", true);
            xhttp.setRequestHeader("Authorization", "Bearer " + playerToken);
            xhttp.setRequestHeader("Content-Type", "application/json");

            var data = JSON.stringify({"id": playerID, "money": playerMoney, "life": playerALevel});
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