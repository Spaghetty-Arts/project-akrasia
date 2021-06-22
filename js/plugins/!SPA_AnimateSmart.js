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

    if (mapIDs.contains($gameMap._mapId) && npc._eventId === this._eventId) {
      var totalDist = getDistance(npc);
      
      if (totalDist <= shootingDistance) {
        this._moveType = 0;
        npc.setDirection(npc.findDirectionTo($gamePlayer.x, $gamePlayer.y));
        doAttack();

      } else if (totalDist < distance) {
        this.setMoveSpeed(4);
        this.setMoveFrequency(4);

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
        this.moveFrequency(4);

        this._moveType = 1;

      }
    }





  };


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function doAttack() {
    $gamePlayer.requestAnimation(0);
    iterationCounter++;

    if (iterationCounter % hit_random_num === 0) {
      hit_random_num = getRandomInt(min_hit_value, max_hit_value);
      $gamePlayer.requestAnimation(7);

      $gameActors.actor(1)._hp -= getRandomInt(1, 20);

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



})();
