(function( ){

    addCrowbar = function () {
        Input.keyMapper[49] = 'crowbar';
    }

    addPistol = function () {
        Input.keyMapper[50] = 'pistol';
        Input.keyMapper[72] = 'Holster';
    }

    weaponsSelection = function () {
        if (Input.isTriggered('pistol')) {
            $gameSwitches.setValue(34, true);
            setSwitchesIventory([35, 36, 37, 38], false);
            AudioManager.playSe({name: "gunCock", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('crowbar')) {
            $gameSwitches.setValue(35, true);
            setSwitchesIventory([34, 36, 37, 38], false);
            AudioManager.playSe({name: "crowbar", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('Holster')) {
            setSwitchesIventory([34, 36, 37, 35], false);
            $gameSwitches.setValue(38, true);
            AudioManager.playSe({name: "holster", pan: 0, pitch: 100, volume: 100});
        }
    }

    shootProjectile = function () {
        if (Input.isTriggered('ok')) {
            if ($gameSwitches.value(34)) {
                pistolProjectile();
            }
        }
    }

    setSwitchesIventory = function (arrayS, valueS) {
        for (let i = 0; i < arrayS.length; i++) {
            $gameSwitches.setValue(arrayS[i], valueS);
        }
    }

    pistolProjectile = function () {
        if ($gameVariables.value(33) > 0) {
            Galv.PROJ.dir(-1,0,8,6,'bullet0',1,'c(7)|e',[5],[],3,1);
            AudioManager.playSe({name: "pistolShot", pan: 0, pitch: 100, volume: 100});
            decreaceAmmo(33);
        } else {
            AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
        }
    }

    decreaceAmmo = function (type) {
        let ammo = $gameVariables.value(type);
        ammo--;
        $gameVariables.setValue(type, ammo);
    }
})();