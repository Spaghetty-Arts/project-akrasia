let npcInMap = [];
(function () {

    clearNPC = function () {
        npcInMap = [];
    }

    attackE = function (id, damageW) {
        //console.log("crowbar");
        let npc = findByID(id);
        let damage = npc.health - damageW;
        npc.health = damage;
        if (damage <= 0) {
            $gameSelfSwitches.setValue([$gameMap._mapId, id, "B"], true);
            $gameSelfSwitches.setValue([$gameMap._mapId, id, "A"], false);
            AudioManager.playSe({name: "soliderD", pan: 0, pitch: 100, volume: 100});
        } else {
            AudioManager.playSe({name: "pain", pan: 0, pitch: 100, volume: 100});
        }
    }

    attackP = function (damageW) {
        playerLife -= damageW;
        AudioManager.playSe({name: "pain", pan: 0, pitch: 100, volume: 100});
    }

    pistolShoot = function () {
        console.log("PISTOL");
    }

    shotgunShoot = function () {
        console.log("Shotgun")
    }

    arShoot = function () {
        console.log("AR");
    }

    setNPCHealth = function (id, health) {
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
            SceneManager.goto(Scene_Gameover);
        }
    }
})();

