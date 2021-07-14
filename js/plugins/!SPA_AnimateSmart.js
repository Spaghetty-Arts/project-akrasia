//=============================================================================
// Animate Smart - Enemy Animation using Finite State Machine and Pathfinding
// by Afonso Vitório
// Date: 21/06/2021
//=============================================================================

/*:
 * @plugindesc Allows events to be animated by a state 
machine with pathfinding
 * @author Afonso Vitório
 *
 * @help
 *
 * In order for this plugin to work, you need to create an event running
in parallel in the map where the events you want to animate are.
 *
 * Plugin Command:
 *  AnimateSmart eventId1 eventId2 detectionDistance shootingDistance     
 * - Makes event 1 animate for event 2, finding path when in detectionDistance
 * and attacking when at shootingDistance
 * 
 * Example usage: AnimateSmart 3 -1 8 1
 * Animates event id 3 for player when at range 8, attacking at range 1
 *
 * Event Options:
 *  event = number for specific event
 *  event = 0 for "this" event
 *  event = -1 for player
 *  event = $gameVariables.value(x) to get the event id from variable x
 *
 *  x, y = coordinates or $gameVariables.value(#) to use a variable coordinate
 *
 * 
 * @param Map IDs
 * @desc Map IDs to Animate Events separate by double collons e.g.: 1:23:4
 * @default 46
 * 
 */

(function () {
  var parameters = PluginManager.parameters('!SPA_AnimateSmart');

  var mapIDs = parameters['Map IDs'];
  mapIDs = mapIDs.split(':');

  // Converter String em Numbers
  mapIDs = mapIDs.map(function (x) {
    return parseInt(x, 10);
  });

  var npc = 0;
  var distance = 8;
  var shootingDistance = 1;
  var iterationCounter = 0;

  var debugCounter = 0;
  var max_hit_value = 35; // Max value between hits
  var min_hit_value = 25; // Min value between hits
  var hit_random_num = getRandomInt(min_hit_value, max_hit_value);

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);


    if (command.toUpperCase() === 'ANIMATESMART' && mapIDs.contains($gameMap._mapId)) {
      subject = this.character(eval(args[0]));
      npc = $gameMap._events[eval(args[0])];
      
      subject.setTarget(this.character(eval(args[1])));

      if (args[2] != null) {
        distance = Number(args[2]);
      }

      if (args[3] != null) {
        shootingDistance = Number(args[3]);
      }

    }

  };

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function () {
    _Game_CharacterBase_initMembers.call(this);
    this._target = null;
    this._targetX = null;
    this._targetY = null;
  };

  Game_CharacterBase.prototype.setTarget = function (target, targetX, targetY) {
    this._target = target;
    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    } else {
      this._targetX = targetX;
      this._targetY = targetY;
    }
  };

  var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
  Game_CharacterBase.prototype.updateStop = function () {
    _Game_CharacterBase_updateStop.call(this);

    if (mapIDs.contains($gameMap._mapId) && npc._eventId === this._eventId && $gameSelfSwitches.value([$gameMap.mapId(), npc._eventId, 'A'])) {
      var totalDist = getDistance(npc);
      var xDist = getxDistance(npc);
      var yDist = getyDistance(npc);

      if ((xDist <= shootingDistance && yDist == 0) || (yDist <= shootingDistance && xDist == 0)) {
        this._moveType = 0;
        npc.setDirection(npc.findDirectionTo($gamePlayer.x, $gamePlayer.y));

        if (shootingDistance == 1) {
          meleeAtack();

        } else {
          rangedAttack(npc);

        }

      } else if (totalDist < distance) {
        this.setMoveSpeed(5);
        this.setMoveFrequency(5);

        if (this._target) {
          this._targetX = this._target.x;
          this._targetY = this._target.y;
        }

        if (this._targetX != null) {
          direction = this.findDirectionTo(this._targetX, this._targetY);
          if (direction > 0) {
            this.moveStraight(direction);
          }
        }


      } else {
        this.setMoveSpeed(3.5);
        this.moveFrequency(5);

        this._moveType = 1;

      }
    }





  };


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function meleeAtack() {
    $gamePlayer.requestAnimation(0);
    iterationCounter++;

    if (iterationCounter % hit_random_num === 0) {
      hit_random_num = getRandomInt(min_hit_value, max_hit_value);
      $gamePlayer.requestAnimation(129);
      AudioManager.playSe({ name: "Paralyze2", pan: 0, pitch: 100, volume: 100 });

      playerLife -= 10;
      $gameVariables.setValue(86, playerLife);
      $gameSelfSwitches.setValue([$gameMap._mapId, eventID, "B"], true);
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
            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
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
            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
            AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
          }
          break;
        case 6:
          distY = npc.y - $gamePlayer.y;
          distX = npc.x - $gamePlayer.x;
          if (distX <= 4 && distY == 0) {
            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
            AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
          }
          break;
        case 8:
          distY = $gamePlayer.y - npc.y;
          distX = npc.x - $gamePlayer.x;
          if (distY <= 4 && distX == 0) {
            Galv.PROJ.dir(npc._eventId, 0, 8, 4, 'bullet0(8,5)', 130, 'c(5)|', [5], [], 3, 1);
            AudioManager.playSe({ name: "pistolShot", pan: 0, pitch: 100, volume: 100 });
          }
          break;

      }
    }
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
