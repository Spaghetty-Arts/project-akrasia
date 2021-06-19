let npcInMap = [];
let eventID = -1;

(function () {

    clearNPC = function () {
        npcInMap = [];
    }

    attackE = function (id, damageW) {
        //console.log("crowbar");
        let npc = findByID(id);
        let damage = npc.health - damageW;
        npc.health = damage;
        $gameMap.event(id).requestAnimation(130);
        if (damage <= 0) {
            $gameSelfSwitches.setValue([$gameMap._mapId, id, "B"], true);
            $gameSelfSwitches.setValue([$gameMap._mapId, id, "A"], false);
            AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});

            if (checkAllDead()) {
                AudioManager.stopBgm();
                $gameSwitches.setValue(93, true);
            }

        } else {
            $gameSelfSwitches.setValue([$gameMap._mapId, eventID, "B"], true);
            AudioManager.playSe({name: "pain", pan: 0, pitch: 100, volume: 100});
        }
    }

    attackP = function (damageW) {
        playerLife -= damageW;
        $gameSelfSwitches.setValue([$gameMap._mapId, eventID, "B"], true);
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


    gameOver = function () {
        if (playerLife <= 0) {
            playerLife = 0;
            AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});
            SceneManager.goto(Scene_Gameover);
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
        $gamePlayer.requestAnimation(131);
        AudioManager.playSe({name: "Heal8", pan: 0, pitch: 100, volume: 100});
    }

    getID = function (id) {
        eventID = id;
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
})();

