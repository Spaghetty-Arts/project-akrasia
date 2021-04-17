(function( ){

    setEHealth = function (value, id) {
        Game_Interpreter.prototype.set_self_variable("eHP",value, id, $gameMap._mapId);
    }

    getEHealth = function (id) {
        let health = Game_Interpreter.prototype.get_self_variable("eHP", id, $gameMap._mapId);
        return health;
    }

    decreaceHealth = function (id) {
        let currentH = getEHealth(id);
        if ($gameSwitches.value(35)) {
            currentH -= 25;
        }
        if (currentH > 0) {
            AudioManager.playSe({name: "pain", pan: 0, pitch: 100, volume: 100});
        } else {
            AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});
        }
        setEHealth(currentH, id);
    }
})();