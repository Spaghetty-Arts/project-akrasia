//=============================================================================
// Simple AI
// by Afonso Vitório
// Date: 04/23/2021  
//============================================================================= 
/*: 
* @plugindesc This plugin implements a simple shooting AI in RPG Maker MV  
* @author Afonso Vitório
* @help This plugin gives life to the enemies by using a simple state
machine.

* In order for this plugin to work, you need to create an event running
in parallel in the map where the events you want to animate are. Then 
send a plugin command like this: simpleShootingAiStart 1:12:3 8 3

* The command consist of:
simpleAiStart <Events ID separated by semicolons> <Detection Range> <Shooting Range>

* In the example above we want events 1, 12 and 3 to be animated
and detect the player in a range of 8 tiles, and start shooting at
3 tiles distance to the player

*
*/

(function () {

    var distance = 8;
    var thePluginCommand = Game_Interpreter.prototype.pluginCommand;

    var debugCounter = 0;
    var hit_random_num = 25;

    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        thePluginCommand.call(this, command, args);
        if (command === 'simpleShootingAiStart') {
            var events = args[0]; // Events ID in the format x:y:z
            distance = Number(args[1]); // Distance for AI detection as a number x
            shootingDistance = Number(args[2]); // Distance for AI to shoot as a number x

            events = events.split(':');

            events.forEach(actionNPC);
        }
    }

    function actionNPC(npc) {

        if ($gameSelfSwitches.value([$gameMap.mapId(), npc, 'A'])) {
            npc = $gameMap._events[npc];

            var totalDist = getDistance(npc);
            var xDist = getxDistance(npc);
            var yDist = getyDistance(npc);

            if ((xDist <= shootingDistance && yDist == 0) || (yDist <= shootingDistance && xDist == 0)) {
                npc._moveType = 0;

                rangedAttack(npc);


                if (debugCounter % hit_random_num === 0) {


                }


            } else if (totalDist < distance) {
                npc.setMoveSpeed(4);
                npc.setMoveFrequency(5);
                npc._moveType = 2;

            } else {
                npc.setMoveFrequency(5);
                npc.setMoveSpeed(3);
                npc._moveType = 1;

            }
        }

    }

    function rangedAttack(npc) {
        let distY = npc.y - $gamePlayer.y;
        let distX = npc.x - $gamePlayer.x;
        npc.setDirection(npc.findDirectionTo($gamePlayer.x, $gamePlayer.y));

        npc.requestAnimation(0);
        debugCounter++;

        if (debugCounter % hit_random_num === 0) {

            switch (npc.direction()) {

                case 2:
                    distY = npc.y - $gamePlayer.y;
                    distX = npc.x - $gamePlayer.x;
                    if (distY <= 4 && distX == 0) {
                        if ($gameMap._mapId == 58 || $gameMap._mapId == 59) {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 6, 'bullet2', 130, 'c(7)|', [5], [], 3, 1);
                        } else {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
                        }

                        AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
                    } else {
                        npc.setMoveSpeed(4.5);
                        npc.setMoveFrequency(4.5);
                        npc._moveType = 2;
                    }
                    break;
                case 4:
                    distY = npc.y - $gamePlayer.y;
                    distX = $gamePlayer.x - npc.x;
                    if (distX <= 4 && distY == 0) {
                        if ($gameMap._mapId == 58 || $gameMap._mapId == 59) {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 6, 'bullet2', 130, 'c(7)|', [5], [], 3, 1);
                        } else {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
                        }
                        AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
                    }
                    break;
                case 6:
                    distY = npc.y - $gamePlayer.y;
                    distX = npc.x - $gamePlayer.x;
                    if (distX <= 4 && distY == 0) {
                        if ($gameMap._mapId == 58 || $gameMap._mapId == 59) {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 6, 'bullet2', 130, 'c(7)|', [5], [], 3, 1);
                        } else {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
                        }
                        AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
                    }
                    break;
                case 8:
                    distY = $gamePlayer.y - npc.y;
                    distX = npc.x - $gamePlayer.x;
                    if (distY <= 4 && distX == 0) {
                        if ($gameMap._mapId == 58 || $gameMap._mapId == 59) {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 6, 'bullet2', 130, 'c(7)|', [5], [], 3, 1);
                        } else {
                            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
                        }
                        AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
                    }
                    break;

            }
        }
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getDistance(npc) {
        var xDist = $gamePlayer.x - npc.x;
        var yDist = $gamePlayer.y - npc.y;
        var totalDist = 0;

        if (xDist < 0) {
            xDist = -xDist;
        }

        if (yDist < 0) {
            yDist = -yDist;
        }

        totalDist = xDist + yDist;

        return totalDist;

    }

    function getxDistance(npc) {
        var xDist = $gamePlayer.x - npc.x;

        if (xDist < 0) {
            xDist = -xDist;
        }

        return xDist;

    }

    function getyDistance(npc) {
        var yDist = $gamePlayer.y - npc.y;

        if (yDist < 0) {
            yDist = -yDist;
        }

        return yDist;

    }


})();