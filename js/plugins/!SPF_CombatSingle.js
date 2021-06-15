let npcInMap = [];
(function () {

    clearNPC = function () {
        npcInMap = [];
    }

    crowbarAttack = function (id) {
        console.log("crowbar");
        let npc = findByID(id);
        npc.health = npc.health - 10;
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
})();

