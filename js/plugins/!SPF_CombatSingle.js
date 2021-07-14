let npcInMap = [];
let eventID = -1;
let shootID = -1;

(function () {

    clearNPC = function () {
        npcInMap = [];
    }

    attackE = function (id, damageW) {
        //console.log("crowbar");
        let npc = findByID(id);
        let damage = npc.health - damageW;
        npc.health = damage;
        $gameVariables.setValue(89, npc.health);
        $gameMap.event(id).requestAnimation(130);
        if (damage <= 0) {
            $gameSelfSwitches.setValue([$gameMap._mapId, id, "B"], true);
            $gameSelfSwitches.setValue([$gameMap._mapId, id, "A"], false);
            AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});

            npc.health = 0;
            $gameVariables.setValue(89, 0);

            if (checkAllDead()) {
                AudioManager.stopBgm();
                $gameSwitches.setValue(93, true);
            }

        } else {
            $gameSelfSwitches.setValue([$gameMap._mapId, eventID, "B"], true);
            $gameSelfSwitches.setValue([$gameMap._mapId, shootID, "B"], true);
            AudioManager.playSe({name: "pain", pan: 0, pitch: 100, volume: 100});
        }
    }

    setBoss = function () {
        $gameVariables.setValue(89, 200);
    }

    attackP = function (damageW) {
        playerLife -= damageW;
        $gameSelfSwitches.setValue([$gameMap._mapId, shootID, "B"], true);
        $gameVariables.setValue(86, playerLife);
        $gamePlayer.requestAnimation(130);
        AudioManager.playSe({name: "pain", pan: 0, pitch: 100, volume: 100});
    }

    setNPCHealth = function (id, health) {
        $gameSwitches.setValue(93, false);
        let healthNPC = {id:id, health:health};
        npcInMap.push(healthNPC);
    }
    
    findByID = function (id) {
        return  npcInMap.find(npc => npc.id === id);
    }
    
    reward = function (id) {
        AudioManager.playSe({name: "loot", pan: 0, pitch: 100, volume: 100});
        let loot = Math.floor(Math.random() * 100) + 1;
        let old = $gameVariables.value(82);
        loot = loot + old;

        $gameVariables.setValue(82, loot);
        $gameSelfSwitches.setValue([$gameMap._mapId, id, "C"], true);
    }

    rewardVR = function (id) {
        AudioManager.playSe({name: "loot", pan: 0, pitch: 100, volume: 100});
        let loot = Math.floor(Math.random() * 100) + 1;
        let old = $gameVariables.value(88);
        loot = loot + old;

        $gameVariables.setValue(88, loot);
        $gameSelfSwitches.setValue([$gameMap._mapId, id, "C"], true);
    }


    gameOver = function () {
        if (playerLife <= 0) {
            playerLife = 0;
            AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});
            SceneManager.goto(Scene_Gameover);
        }
    }

    gameOverVR = function () {
        if (playerLife <= 0) {
            playerLife = 0;
            //AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});
            AudioManager.playSe({name: "off", pan: 0, pitch: 100, volume: 100});
            teleportSave();
            $gameVariables.setValue(88, 0);
            $gameVariables.setValue(86, 10);
            closeVr();

            closeBoss();
        }
    }

    teleportSave = function () {
        if ($gameVariables.value(92) == 3) {
            $gamePlayer.reserveTransfer(51, 29,  25, 8, 0);
        } else {
            $gamePlayer.reserveTransfer(45, 16,  5, 8, 0);
        }
    }

    startCombat = function () {
        AudioManager.playBgm({name: "combatOstr", pan: 0, pitch: 100, volume: 100});
    }
    
    endCombat = function () {
        AudioManager.stopBgm();
    }

    clearAutosave = function (npcArr) {
        for (let i = 0; i < npcArr.length; i++) {
            $gameSelfSwitches.setValue([$gameMap._mapId, npcArr[i], "A"], false);
            $gameSelfSwitches.setValue([$gameMap._mapId, npcArr[i], "B"], false);
            $gameSelfSwitches.setValue([$gameMap._mapId, npcArr[i], "C"], false);
        }
    }

    setPlayerSingle = function () {
        playerLife = $gameVariables.value(86);
    }

    healPlayer = function () {
        playerLife += 25;
        if (playerLife > $gameVariables.value(87)) {
            playerLife = $gameVariables.value(87);
        }
        $gameVariables.setValue(86, playerLife);
        $gamePlayer.requestAnimation(131);
        AudioManager.playSe({name: "Heal8", pan: 0, pitch: 100, volume: 100});
    }

    healTotal = function () {
        playerLife = $gameVariables.value(87);
        $gameVariables.setValue(86, playerLife);
    }

    getID = function (id, sID = -1) {
        eventID = id;
        shootID = sID;
    }

    checkAllDead = function () {
        for (let i = 0; i < npcInMap.length; i++) {
            let npc = npcInMap[i];
            if (npc.health > 0) {
                return false;
            }
        }
        return true;
    }

    getAmmoLevel2 = function () {
        let ammo = $gameVariables.value(34);
        ammo += 5;
        AudioManager.playSe({name: "pickammo", pan: 0, pitch: 100, volume: 100});
        $gameVariables.setValue(34, ammo);
        $gameVariables.setValue(40, ammo);
    }

    getAmmoG = function () {
        if (armaAtual == 4) {
            let ammo = $gameVariables.value(36);
            ammo += 10;
            AudioManager.playSe({name: "pickammo", pan: 0, pitch: 100, volume: 100});
            $gameVariables.setValue(36, ammo);
            $gameVariables.setValue(40, ammo);
        } else if (armaAtual == 5) {
            let ammo = $gameVariables.value(38);
            ammo += 30;
            AudioManager.playSe({name: "pickammo", pan: 0, pitch: 100, volume: 100});
            $gameVariables.setValue(38, ammo);
            $gameVariables.setValue(40, ammo);
        } else {
            let ammo = $gameVariables.value(34);
            ammo += 20;
            AudioManager.playSe({name: "pickammo", pan: 0, pitch: 100, volume: 100});
            $gameVariables.setValue(34, ammo);
            $gameVariables.setValue(40, ammo);
        }
    }

    turretDistance = function (id) {
        let dist = $gameMap.distance($gamePlayer.x, $gamePlayer.y, $gameMap.event(id).x, $gameMap.event(id).y);
        if (dist <= 5) {
            Galv.PROJ.quickTar(2, id);
            AudioManager.playSe({name: "shotTurret", pan: 0, pitch: 100, volume: 100});
        }
    }

    flashLight = function () {
        if (Input.isTriggered('light')) {
            if (!$gameSwitches.value(94)) {
                AudioManager.playSe({name: "flashlight", pan: 0, pitch: 100, volume: 100});
                console.log("on");
                return 1;
            } else {
                AudioManager.playSe({name: "flashlight", pan: 0, pitch: 100, volume: 100});
                console.log("off");
                return 0;
            }
        } else {
            return  -1;
        }

    }

    changeTactic = function () {
        if ($gameVariables.value(89) <= 100) {
            if ($gameMap._mapId == 58) {
                var character = $gameMap.event(10);
                character.requestAnimation(51);

                $gameSelfSwitches.setValue([$gameMap._mapId, 11, "A"], true);
                $gameSelfSwitches.setValue([$gameMap._mapId, 17, "A"], true);
                $gameSelfSwitches.setValue([$gameMap._mapId, 18, "A"], true);
            }

            if ($gameMap._mapId == 59){
                var character = $gameMap.event(31);
                character.requestAnimation(51);

                $gameSelfSwitches.setValue([$gameMap._mapId, 39, "A"], true);
                $gameSelfSwitches.setValue([$gameMap._mapId, 38, "A"], true);
                $gameSelfSwitches.setValue([$gameMap._mapId, 40, "A"], true);
            }
        }
    }

    healBoss = function (id) {
        let npc = findByID(id);
        npc.health += 50;
        $gameVariables.setValue(89, npc.health);
        $gameMap.event(id).requestAnimation(131);
        AudioManager.playSe({name: "Heal8", pan: 0, pitch: 100, volume: 100});
    }


    stopVR = function () {
        if (Input.isTriggered('escape')) {
            AudioManager.playSe({name: "off", pan: 0, pitch: 100, volume: 100});
            teleportSave();
            closeVr();
            closeBoss();
        }
    }

    restartNPC = function (level) {
        let npc;
        let npcH;
        switch (level) {
            case 1:
                npc = [7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 21];
                for (let i = 0; i < npc.length; i++) {
                    $gameSelfSwitches.setValue([47, npc[i], "A"], false);
                    $gameSelfSwitches.setValue([47, npc[i], "B"], false);
                    $gameSelfSwitches.setValue([47, npc[i], "C"], false);
                }
                break;
            case 2:
                npc = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
                for (let i = 0; i < npc.length; i++) {
                    $gameSelfSwitches.setValue([52, npc[i], "A"], false);
                    $gameSelfSwitches.setValue([52, npc[i], "B"], false);
                    $gameSelfSwitches.setValue([52, npc[i], "C"], false);

                }
                break;
            case 3:
                npc = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
                for (let i = 0; i < npc.length; i++) {
                    $gameSelfSwitches.setValue([53, npc[i], "A"], false);
                    $gameSelfSwitches.setValue([53, npc[i], "B"], false);
                    $gameSelfSwitches.setValue([53, npc[i], "C"], false);

                }
                break;
            case 4:
                $gameSelfSwitches.setValue([58, 10, "A"], false);
                $gameSelfSwitches.setValue([58, 10, "B"], false);
                $gameSelfSwitches.setValue([58, 10, "C"], false);
                break;
        }
    }
})();

