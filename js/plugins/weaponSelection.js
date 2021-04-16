(function( ){

    addCrowbar = function () {
        Input.keyMapper[49] = 'crowbar';
    }

    addPistol = function () {
        Input.keyMapper[50] = 'pistol';
    }

    weaponsSelection = function () {
        if (Input.isTriggered('pistol')) {
            $gameSwitches.setValue(34, true);
            $gameSwitches.setValue(35, false);
            AudioManager.playSe({name: "gunCock", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('crowbar')) {
            $gameSwitches.setValue(34, false);
            $gameSwitches.setValue(35, true);
            AudioManager.playSe({name: "crowbar", pan: 0, pitch: 100, volume: 100});
        }
    }
})();