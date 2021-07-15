(function () {

    crash = function () {
        if (($gamePlayer.x == 29 && $gamePlayer.y == 13) && ($gameMap.event(1).x == 28 && $gameMap.event(1).y == 13)){
            crashEffect();
        } else if (($gamePlayer.x == 30 && $gamePlayer.y == 13) && ($gameMap.event(1).x == 29 && $gameMap.event(1).y == 13)){
            crashEffect();
        } else if (($gamePlayer.x == 22 && $gamePlayer.y == 13) && ($gameMap.event(1).x == 21 && $gameMap.event(1).y == 13)){
            crashEffect();
        } else if (($gamePlayer.x == 23 && $gamePlayer.y == 13) && ($gameMap.event(1).x == 22 && $gameMap.event(1).y == 13)){
            crashEffect();
        }

        if (($gamePlayer.x == 30 && $gamePlayer.y == 11) && ($gameMap.event(6).x == 31 && $gameMap.event(6).y == 11)){
            crashEffect();
        } else if (($gamePlayer.x == 29 && $gamePlayer.y == 11) && ($gameMap.event(6).x == 30 && $gameMap.event(6).y == 11)){
            crashEffect();
        } else if (($gamePlayer.x == 23 && $gamePlayer.y == 11) && ($gameMap.event(6).x == 24 && $gameMap.event(6).y == 11)){
            crashEffect();
        } else if (($gamePlayer.x == 22 && $gamePlayer.y == 11) && ($gameMap.event(6).x == 23 && $gameMap.event(6).y == 11)){
            crashEffect();
        }

    }

    crashEffect = function () {
        $gameScreen.startFlash([255, 255, 255, 170], 120);
        AudioManager.playSe({name: "carCrash", pan: 0, pitch: 100, volume: 100});
        $gameScreen.startTint([-255,-255,-255,0], 50);
        SceneManager.goto(Scene_Gameover);
    }
})();
