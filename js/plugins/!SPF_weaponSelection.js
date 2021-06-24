(function( ){

    addCrowbar = function () {
       $gameSwitches.setValue(85, true);
        $gameSwitches.setValue(89, true);
    }

    addPistol = function () {
        $gameSwitches.setValue(86, true);
    }

    addShotgun = function () {
        $gameSwitches.setValue(87, true);
    }

    addAr = function () {
        $gameSwitches.setValue(88, true);
    }



    weaponsSelection = function () {
        if (Input.isTriggered('arm2') && $gameSwitches.value(86) && !$gameSwitches.value(34)) {
            $gameActors.actor(1).setCharacterImage("zeke_arma", 0);
            $gamePlayer.refresh();
            let current = $gameVariables.value(33);
            let magazine = $gameVariables.value(34);
            getAmmo(current, magazine);
            armaAtual=2;
            $gameSwitches.setValue(34, true);
            $gameSwitches.setValue(39, true);
            setSwitchesIventory([35, 36, 37, 38, 40, 82], false);
            AudioManager.playSe({name: "gunCock", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('arm1')  && $gameSwitches.value(85) && !$gameSwitches.value(35)) {
          armaAtual=1;
            $gameActors.actor(1).setCharacterImage("zeke_arma", 2);
            $gamePlayer.refresh();
            $gameSwitches.setValue(35, true);
            setSwitchesIventory([34, 36, 37, 38, 39, 40, 82], false);
            AudioManager.playSe({name: "crowbar", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('holster') && $gameSwitches.value(89) && !$gameSwitches.value(38)) {
          armaAtual=3;
            $gameActors.actor(1).setCharacterImage("zekePrisioner", 0);
            $gamePlayer.refresh();
            setSwitchesIventory([34, 36, 37, 35, 39, 40, 82], false);
            $gameSwitches.setValue(38, true);
            AudioManager.playSe({name: "holster", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('arm3')  && $gameSwitches.value(87) && !$gameSwitches.value(40)) {
          armaAtual=4;
            $gameActors.actor(1).setCharacterImage("zeke_arma", 1);
            $gamePlayer.refresh();
            let current = $gameVariables.value(35);
            let magazine = $gameVariables.value(36);
            getAmmo(current, magazine);

            $gameSwitches.setValue(40, true);
            $gameSwitches.setValue(39, true);
            setSwitchesIventory([35, 36, 37, 38, 34, 82], false);
            AudioManager.playSe({name: "shotGunCock", pan: 0, pitch: 100, volume: 100});
        } else if (Input.isTriggered('arm4')  && $gameSwitches.value(88) && !$gameSwitches.value(82)) {
          armaAtual=5;
            $gameActors.actor(1).setCharacterImage("zeke_arma", 3);
            $gamePlayer.refresh();
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
        if (Input.isTriggered('shoot') && !$gameMap.isEventRunning() && $gameSwitches.value(82) == false) {
                if ($gameSwitches.value(34)) {
                    pistolProjectile();
                } else if ($gameSwitches.value(35)) {
                    $gameActors.actor(1).setCharacterImage("zeke_arma", 6);
                    $gamePlayer.refresh();
                    crowbarAnimation();
                    attackCrowbar();
                } else if ($gameSwitches.value(40)) {
                    shotgunProjectile();
                }

        } else if (Input.isTriggered('reload') && $gameSwitches.value(35) == false) {
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
        if ($gameSwitches.value(82)) {
            $gameActors.actor(1).setCharacterImage("zeke_arma", 3);
            $gamePlayer.refresh();
        }
        if (!$gameMap.isEventRunning() && $gameSwitches.value(82) == true && Input.isPressed('shoot')&& $gameVariables.value(37) > 0) {
            $gameActors.actor(1).setCharacterImage("zeke_arma", 7);
            $gamePlayer.refresh();
            $gameSelfSwitches.setValue([$gameMap._mapId, event, 'A'], true);
            $gameSelfSwitches.setValue([$gameMap._mapId, weaponevent, 'A'], true);
            arProjectile();

        } else if (!$gameMap.isEventRunning() && $gameSwitches.value(82) == true && Input.isTriggered('shoot') && $gameVariables.value(37) <= 0) {
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
            disparo=1;
            shootAnimation(4, 0);
            Galv.PROJ.dir(-1,0,8,4,'bullet0(8,5)',130,'c(55)|c(2)',[5],[],3,1);
            AudioManager.playSe({name: "pistolShot", pan: 0, pitch: 100, volume: 100});
            decreaceAmmo(33);

        } else {
            AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
        }
    }

    attackCrowbar = function () {
        AudioManager.playSe({name: "crowHit", pan: 0, pitch: 100, volume: 100});
        Galv.PROJ.dir(-1,0,8,0.1,'',130,'c(7)|c(1)',[5],[],3,1);
    }

    shotgunProjectile = function () {
        if ($gameVariables.value(39) > 0) {
            let lProj = getDirProj();
            shootAnimation(5, 1);
            Galv.PROJ.dir(-1,0,8,3,'bullet0',130,'c(7)|c(3)',[5],[],3,1, 60);
            Galv.PROJ.dir(-1,lProj[0],8,3,'bullet0',130,'c(7)|c(3)',[5],[],3,1, 60);
            Galv.PROJ.dir(-1,lProj[1],8,3,'bullet0',130,'c(7)|c(3)',[5],[],3,1, 60);
            AudioManager.playSe({name: "shotgunShot", pan: 0, pitch: 100, volume: 100});
            decreaceAmmo(35);
        } else {
            AudioManager.playSe({name: "emptyMag", pan: 0, pitch: 100, volume: 100});
        }
    }

    arProjectile = function () {
            if ($gameVariables.value(37) > 0) {

                    Galv.PROJ.dir(-1, 0, 8, 6, 'bullet0', 130, 'c(7)|c(4)', [5], [], 3, 1);
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

    getDirProj = function () {
        let dir = $gamePlayer.direction();
        let lateralB = [];
        switch (dir) {
            case 2:
                lateralB = [1, 3];
                break;
            case 4:
                lateralB = [1, 7];
                break;
            case 8:
                lateralB = [7, 9];
                break;
            case 6:
                lateralB = [9, 3];
                break;
        }
        return lateralB;
    }

    Game_Interpreter.prototype.wait = function(duration) {  this._waitCount = duration;};

    crowbarAnimation = function () {
        var cMove = {code: 33};
        var cMove2 = {code: 15, parameters: [60]};
        var cMoveC = {code: 41, parameters: ['zeke_arma', 6]}
        var cMove3 = {code: 34};
        var cMoveC2 = {code: 41, parameters: ['zeke_arma', 2]}
        var cEnd = {code: 0}
        var cList = [cMove, cMove2, cMoveC, cMove3, cMoveC2, cEnd];
        var route = {list: cList, repeat: false, skippable: true, wait: true};
        $gamePlayer.forceMoveRoute(route);
    }
    shootAnimation = function (shoot, old) {
        var cMove = {code: 15, parameters: [20]};
        var cMoveC = {code: 41, parameters: ['zeke_arma', shoot]}
        var cMoveC2 = {code: 41, parameters: ['zeke_arma', old]}
        var cEnd = {code: 0}
        var cList = [ cMoveC, cMove, cMoveC2, cEnd];
        var route = {list: cList, repeat: false, skippable: true, wait: true};
        $gamePlayer.forceMoveRoute(route);
    }

})();
