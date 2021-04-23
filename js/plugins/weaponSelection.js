(function( ){

    addCrowbar = function () {
        Input.keyMapper[49] = 'crowbar';
        Input.keyMapper[83] = 'attack';
    }

    addPistol = function () {
        Input.keyMapper[50] = 'pistol';
        Input.keyMapper[72] = 'Holster';
        Input.keyMapper[82] = 'Reload';
    }

    addShotgun = function () {
        Input.keyMapper[51] = 'Shotgun';
    }

    addAr = function () {
        Input.keyMapper[52] = 'Ar';
    }

    weaponsSelection = function () {
        if (Input.isTriggered('pistol')) {
            let current = $gameVariables.value(33);
            let magazine = $gameVariables.value(34);
            getAmmo(current, magazine);

            $gameSwitches.setValue(34, true);
            $gameSwitches.setValue(39, true);
            setSwitchesIventory([35, 36, 37, 38, 40, 82], false);
            AudioManager.playSe({name: "gunCock", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('crowbar')) {
            $gameSwitches.setValue(35, true);
            setSwitchesIventory([34, 36, 37, 38, 39, 40, 82], false);
            AudioManager.playSe({name: "crowbar", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('Holster')) {
            setSwitchesIventory([34, 36, 37, 35, 39, 40, 82], false);
            $gameSwitches.setValue(38, true);
            AudioManager.playSe({name: "holster", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('Shotgun')) {
            let current = $gameVariables.value(35);
            let magazine = $gameVariables.value(36);
            getAmmo(current, magazine);

            $gameSwitches.setValue(40, true);
            $gameSwitches.setValue(39, true);
            setSwitchesIventory([35, 36, 37, 38, 34, 82], false);
            AudioManager.playSe({name: "shotGunCock", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('Ar')) {
            let current = $gameVariables.value(37);
            let magazine = $gameVariables.value(38);
            getAmmo(current, magazine);

            $gameSwitches.setValue(82, true);
            $gameSwitches.setValue(39, true);
            setSwitchesIventory([35, 36, 37, 38, 34, 40], false);
            AudioManager.playSe({name: "arCock", pan: 0, pitch: 100, volume: 100});
        }
    }

    shootProjectile = function () {
        if (Input.isTriggered('attack') && !$gameMap.isEventRunning() && $gameSwitches.value(82) == false) {
                if ($gameSwitches.value(34)) {
                    pistolProjectile();
                } else if ($gameSwitches.value(35)) {
                    attackCrowbar();
                } else if ($gameSwitches.value(40)) {
                    shotgunProjectile();
                }
            } else if (Input.isTriggered('Reload') && $gameSwitches.value(35) == false) {
                if ($gameSwitches.value(34)) {
                    reloadAmmo(0);
                } else if ($gameSwitches.value(40)) {
                    reloadAmmo(1);
                } else if ($gameSwitches.value(82)) {
                    reloadAmmo(2);
                }
            }
    }

    shootAr = function (event, weaponevent) {
        if (!$gameMap.isEventRunning() && $gameSwitches.value(82) == true && Input.isPressed('attack')&& $gameVariables.value(37) > 0) {
            $gameSelfSwitches.setValue([$gameMap._mapId, event, 'A'], true);
            $gameSelfSwitches.setValue([$gameMap._mapId, weaponevent, 'A'], true);
            arProjectile();

        } else if (!$gameMap.isEventRunning() && $gameSwitches.value(82) == true && Input.isTriggered('attack') && $gameVariables.value(37) <= 0) {
            AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
        } else {
            $gameSelfSwitches.setValue([$gameMap._mapId, weaponevent, 'A'], false);
        }
    }

    setSwitchesIventory = function (arrayS, valueS) {
        for (let i = 0; i < arrayS.length; i++) {
            $gameSwitches.setValue(arrayS[i], valueS);
        }
    }

    pistolProjectile = function () {
        if ($gameVariables.value(33) > 0) {
            Galv.PROJ.dir(-1,0,8,6,'bullet0',125,'c(7)|e',[5],[],3,1);
            AudioManager.playSe({name: "pistolShot", pan: 0, pitch: 100, volume: 100});
            decreaceAmmo(33);
        } else {
            AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
        }
    }

    attackCrowbar = function () {
        AudioManager.playSe({name: "crowHit", pan: 0, pitch: 100, volume: 100});
        Galv.PROJ.dir(-1,0,8,0.1,'bullet0',126,'c(7)|s(B:on)',[5],[],3,1);
    }

    shotgunProjectile = function () {
        if ($gameVariables.value(39) > 0) {
            Galv.PROJ.dir(-1,0,8,6,'shotgun',125,'c(7)|e',[5],[],3,1, 60);
            AudioManager.playSe({name: "shotgunShot", pan: 0, pitch: 100, volume: 100});
            decreaceAmmo(35);
        } else {
            AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
        }
    }

    arProjectile = function () {
            if ($gameVariables.value(37) > 0) {
                    Galv.PROJ.dir(-1, 0, 8, 6, 'bullet0', 125, 'c(7)|e', [5], [], 3, 1);
                    AudioManager.playSe({name: "arShot", pan: 0, pitch: 100, volume: 100});
                    decreaceAmmo(37);
                }
    }

    decreaceAmmo = function (type) {
        let ammo = $gameVariables.value(type);
        ammo--;
        $gameVariables.setValue(type, ammo);
        $gameVariables.setValue(39, ammo);
    }

    reloadAmmo = function (type) {
        switch (type) {
            case 0:
                if ($gameVariables.value(34) >= 7) {
                    AudioManager.playSe({name: "reloadGun", pan: 0, pitch: 100, volume: 100});
                    let ammo = $gameVariables.value(33);
                    let maxAmmo = $gameVariables.value(34);

                    ammo = 7;
                    maxAmmo -= 7;

                    $gameVariables.setValue(33, ammo);
                    $gameVariables.setValue(34, maxAmmo);
                    $gameVariables.setValue(39, ammo);
                    $gameVariables.setValue(40, maxAmmo);
                } else if ($gameVariables.value(34) > 0 && $gameVariables.value(34) < 7) {
                    AudioManager.playSe({name: "reloadGun", pan: 0, pitch: 100, volume: 100});
                    let ammo = $gameVariables.value(33);
                    let maxAmmo = $gameVariables.value(34);

                    ammo = maxAmmo;
                    maxAmmo = 0;

                    $gameVariables.setValue(33, ammo);
                    $gameVariables.setValue(34, maxAmmo);
                    $gameVariables.setValue(39, ammo);
                    $gameVariables.setValue(40, maxAmmo);
                } else {
                    AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
                }
                break;
            case 1:
                if ($gameVariables.value(36) >= 5) {
                    AudioManager.playSe({name: "shotgunReload", pan: 0, pitch: 100, volume: 100});
                    let ammo = $gameVariables.value(35);
                    let maxAmmo = $gameVariables.value(36);

                    ammo = 5;
                    maxAmmo -= 5;

                    $gameVariables.setValue(35, ammo);
                    $gameVariables.setValue(36, maxAmmo);
                    $gameVariables.setValue(39, ammo);
                    $gameVariables.setValue(40, maxAmmo);
                } else if ($gameVariables.value(36) > 0 && $gameVariables.value(36) < 5) {
                    AudioManager.playSe({name: "shotgunReload", pan: 0, pitch: 100, volume: 100});
                    let ammo = $gameVariables.value(33);
                    let maxAmmo = $gameVariables.value(34);

                    ammo = maxAmmo;
                    maxAmmo = 0;

                    $gameVariables.setValue(35, ammo);
                    $gameVariables.setValue(36, maxAmmo);
                    $gameVariables.setValue(39, ammo);
                    $gameVariables.setValue(40, maxAmmo);
                } else {
                    AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
                }
                break;
            case 2:
                if ($gameVariables.value(38) >= 30) {
                    AudioManager.playSe({name: "arReload", pan: 0, pitch: 100, volume: 100});
                    let ammo = $gameVariables.value(37);
                    let maxAmmo = $gameVariables.value(38);

                    ammo = 30;
                    maxAmmo -= 30;

                    $gameVariables.setValue(37, ammo);
                    $gameVariables.setValue(38, maxAmmo);
                    $gameVariables.setValue(39, ammo);
                    $gameVariables.setValue(40, maxAmmo);
                } else if ($gameVariables.value(38) > 0 && $gameVariables.value(38) < 30) {
                    AudioManager.playSe({name: "arReload", pan: 0, pitch: 100, volume: 100});
                    let ammo = $gameVariables.value(37);
                    let maxAmmo = $gameVariables.value(38);

                    ammo = maxAmmo;
                    maxAmmo = 0;

                    $gameVariables.setValue(37, ammo);
                    $gameVariables.setValue(38, maxAmmo);
                    $gameVariables.setValue(39, ammo);
                    $gameVariables.setValue(40, maxAmmo);
                } else {
                    AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
                }
                break;
        }
    }
    
    getAmmo = function (current, magazine) {
        $gameVariables.setValue(39, current);
        $gameVariables.setValue(40, magazine);
    }

    Game_Interpreter.prototype.wait = function(duration) {  this._waitCount = duration;};


})();