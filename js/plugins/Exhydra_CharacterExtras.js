// ╒══════════════════════════════════════════════════════════════════════════════════╕
// █▐▐  Character Extras
// ╞══════════════════════════════════════════════════════════════════════════════════╡
/*:
 *  @plugindesc Options to apply various properties to characters and events.
 *  @author Exhydra
 * 
 *  @help
 * ▄ Plugin          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ┌─ Version : 1.0
 *   ├─ Release : 24rd July 2016
 *   ├─ Updated : 24rd July 2016
 *   └─ License : Free for Commercial and Non-Commercial Usage
 *
 * ▄ Event Note Tags ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *        Place the following tag(s) into the 'note' box of an event.
 *
 *   <ceRotation:rotation>
 *   │
 *   │     Rotate the event to the desired degree value.
 *   │
 *   ├─degree
 *   ├ Value(s) ► 0 to 360
 *   └ Note     ► The default value is 0.
 *
 *   <ceTone:red,green,blue,gray>
 *   │
 *   │     Set the tone of the event.
 *   │
 *   ├─red
 *   ├ Value(s) ► -255 to 255
 *   │
 *   ├─green
 *   ├ Value(s) ► -255 to 255
 *   │
 *   ├─blue
 *   ├ Value(s) ► -255 to 255
 *   │
 *   ├─gray
 *   └ Value(s) ► 0 to 255
 *
 *   <ceColor:red,green,blue,alpha>
 *   │
 *   │     Set the color of the event.
 *   │
 *   ├─red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─blue
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─alpha
 *   └ Value(s) ► 0 to 255
 *  
 *   <ceOpacity:opacity>
 *   │
 *   │     Set the opacity of the event.
 *   │
 *   ├─opacity
 *   └ Value(s) ► 0 to 255
 *
 *   <ceBlendMode:mode>
 *   │
 *   │     Set the blend mode of the event.
 *   │
 *   ├─mode
 *   └ Value(s) ► 0, 1, 2, 3
 *
 *   <ceMapDxY:direction,xValue,yValue>
 *   │
 *   │     Set the direction, x, and y value of the event.
 *   │
 *   ├─direction
 *   ├ Value(s) ► 2, 4, 6, 8
 *   │
 *   ├─xValue
 *   ├ Value(s) ► Integer
 *   │
 *   ├─yValue
 *   └ Value(s) ► Integer
 *
 *   <ceFollow:leaderEventId>
 *   │
 *   │     Instruct an event to follow the lead event.
 *   │
 *   ├─leaderEventId
 *   └ Value(s) ► Integer
 *
 * ▄ Plugin Commands ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ▪ exaCE.setDashLean boolean degree
 *   │
 *   │     Enable or disable the dash lean visual effect. Once enabled, the
 *   │ player and follower sprites will be rotated to simulate running.
 *   │
 *   ├─boolean
 *   ├ Value(s) ► true, false
 *   │
 *   ├─degree
 *   ├ Value(s) ► 0 to 360
 *   └ Note     ► Entering a degree is optional. The default value is 4.
 *
 *   ▪ exaCE.setRotation target degree
 *   │
 *   │     Rotate the target to the desired degree value.
 *   │
 *   ├─target
 *   ├ Value(s) ► -1 (player), 0 and above (event), ceP (party), ceF:id (follower)
 *   │
 *   ├─degree
 *   ├ Value(s) ► 0 to 360
 *   └ Note     ► The default value is 0.
 *
 *   ▪ exaCE.eventFollower command leaderEventId followerEventId
 *   │
 *   │     Set or remove event follower data.
 *   │
 *   ├─command
 *   ├ Value(s) ► set, remove
 *   │
 *   ├─leaderEventId
 *   ├ Value(s) ► Integer
 *   ├ Note     ► The lead event you wish follower events to chase.
 *   │
 *   ├─followerEventId
 *   ├ Value(s) ► Integer
 *   └ Note     ► The follower event you wish to chase a leader event.
 *
 *   ▪ exaCE.toTone target red green blue gray duration wait 
 *   │
 *   │     Set or gradually change the tone of the target.
 *   │
 *   ├─target
 *   ├ Value(s) ► -1 (player), 0 and above (event), ceP (party), ceF:id (follower)
 *   │
 *   ├─red
 *   ├ Value(s) ► -255 to 255
 *   │
 *   ├─green
 *   ├ Value(s) ► -255 to 255
 *   │
 *   ├─blue
 *   ├ Value(s) ► -255 to 255
 *   │
 *   ├─gray
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─duration
 *   ├ Value(s) ► Integer
 *   │
 *   ├─wait
 *   ├ Value(s) ► true, false
 *   ├ Note     ► Once set, the interpreter will wait for the process to
 *   └            complete.
 *
 *   ▪ exaCE.toColor target red green blue alpha duration wait 
 *   │
 *   │     Set or gradually change the color of the target.
 *   │
 *   ├─target
 *   ├ Value(s) ► -1 (player), 0 and above (event), ceP (party), ceF:id (follower)
 *   │
 *   ├─red
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─green
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─blue
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─alpha
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─duration
 *   ├ Value(s) ► Integer
 *   │
 *   ├─wait
 *   ├ Value(s) ► true, false
 *   ├ Note     ► Once set, the interpreter will wait for the process to
 *   └            complete.
 *
 *   ▪ exaCE.toOpacity target opacity duration wait 
 *   │
 *   │     Set or gradually change the opacity of the target.
 *   │
 *   ├─target
 *   ├ Value(s) ► -1 (player), 0 and above (event), ceP (party), ceF:id (follower)
 *   │
 *   ├─opacity
 *   ├ Value(s) ► 0 to 255
 *   │
 *   ├─duration
 *   ├ Value(s) ► Integer
 *   │
 *   ├─wait
 *   ├ Value(s) ► true, false
 *   ├ Note     ► Once set, the interpreter will wait for the process to
 *   └            complete.
 *
 *   ▪ exaCE.toMoveSpeed target moveSpeed duration wait 
 *   │
 *   │     Set or gradually change the move speed of the target.
 *   │
 *   ├─target
 *   ├ Value(s) ► -1 (player), 0 and above (event), ceP (party), ceF:id (follower)
 *   │
 *   ├─moveSpeed
 *   ├ Value(s) ► Integer
 *   │
 *   ├─duration
 *   ├ Value(s) ► Integer
 *   │
 *   ├─wait
 *   ├ Value(s) ► true, false
 *   ├ Note     ► Once set, the interpreter will wait for the process to
 *   └            complete.
 *
 * ▄ Examples        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   exaCE.toTone ceP 255 0 0 0 120 true 
 *   └─Change the tone of the entire party in 120 frames and wait for completion.
 *
 *   exaCE.toColor 5 0 125 55 125 0 
 *   └─Change the color of the event with an ID of 5 in 0 frames and do not
 *     wait for completion.
 *
 *   exaCE.toOpacity ceF:1 185 360
 *   └─Change the opacity of the 2nd follower in 360 frames and do not wait
 *     for completion.
 *
 *   exaCE.toMoveSpeed -1 6 65 true  
 *   └─Change the move speed of the player in 65 frames and wait for completion.
 *
 */
// ╘══════════════════════════════════════════════════════════════════════════════════╛
 
// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Plugin
// ╘══════════════════════════════════════════════════════════════════════════════════╛

var Imported = Imported || {};
Imported.EXA_CharacterSpriteExtras = true;

var EXA = EXA     || {};
EXA.CE  = EXA.CE  || {};

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Interpreter
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] pluginCommand
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {

	EXA.CE.Game_Interpreter_pluginCommand.call(this, command, args);

	if (command === 'exaCE.setDashLean') {
		var leanLeft  = (args[1] ? 360 - Number(args[1]) : 356) * Math.PI / 180;
		var leanRight = (args[1] ? Number(args[1])       : 4)   * Math.PI / 180;
		var toggle    = (args[0] == 'true');
		
		var tmpParty = $gamePlayer._followers._data.clone();
		tmpParty.push($gamePlayer);
		
		tmpParty.forEach(function (tmpTarget) {
			tmpTarget._ceDashLean      = toggle;
			tmpTarget._ceDashLeanLeft  = leanLeft;
			tmpTarget._ceDashLeanRight = leanRight;
		});
	}

	if (command === 'exaCE.setRotation') {
		var target = this.character(args[0]);
		var degree = Number(args[1]);
		
		if (Array.isArray(target)) {
			target.forEach(function (tmpTarget) {
				tmpTarget.setRotation(degree);
			});
		} else {
			target.setRotation(degree);
		}
	}
	
	if (command === 'exaCE.eventFollower') {
		var leaderId   = args[1];
		var followerId = args[2];
		
		if (args[0] === 'set') {
			$gameMap.event(leaderId).setEventFollower(followerId);
		} else if (args[0] === 'remove') {
			$gameMap.event(leaderId).removeEventFollower(followerId);
		}
	}
	
	if (command === 'exaCE.toTone') {
		var target = this.character(args[0]);
		
		var red      = Number(args[1]);
		var green    = Number(args[2]);
		var blue     = Number(args[3]);
		var gray     = Number(args[4]);
		var duration = Number(args[5]);
		
		var toggle   = (args[6] == 'true');
		
		if (Array.isArray(target)) {
			target.forEach(function (tmpTarget) {
				tmpTarget.toTone([red, green, blue, gray], duration);
			});
		} else {
			target.toTone([red, green, blue, gray], duration);
		}
		
		if (toggle) {
			this._waitCount = duration;
		}
	}
	
	if (command === 'exaCE.toColor') {
		var target = this.character(args[0]);
		
		var red      = Number(args[1]);
		var green    = Number(args[2]);
		var blue     = Number(args[3]);
		var alpha    = Number(args[4]);
		var duration = Number(args[5]);
		
		var toggle   = (args[6] == 'true');
		
		if (Array.isArray(target)) {
			target.forEach(function (tmpTarget) {
				tmpTarget.toColor([red, green, blue, alpha], duration);
			});
		} else {
			target.toColor([red, green, blue, alpha], duration);
		}
		
		if (toggle) {
			this._waitCount = duration;
		}
	}
	
	if (command === 'exaCE.toOpacity') {
		var target   = this.character(args[0]);
		var opacity  = Number(args[1]);
		var duration = Number(args[2]);
		
		var toggle   = (args[3] == 'true');
		
		if (Array.isArray(target)) {
			target.forEach(function (tmpTarget) {
				tmpTarget.toOpacity(opacity, duration);
			});
		} else {
			target.toOpacity(opacity, duration);
		}
		
		if (toggle) {
			this._waitCount = duration;
		}
	}
	
	if (command === 'exaCE.toMoveSpeed') {
		var target = this.character(args[0]);
		var moveSpeed = Number(args[1]);
		var duration  = Number(args[2]);
		
		var toggle   = (args[3] == 'true');
		
		if (Array.isArray(target)) {
			target.forEach(function (tmpTarget) {
				tmpTarget.toMoveSpeed(moveSpeed, duration);
			});
		} else {
			target.toMoveSpeed(moveSpeed, duration);
		}
		
		if (toggle) {
			this._waitCount = duration;
		}
	}

}; // Game_Interpreter ‹‹ pluginCommand

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] character
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_Interpreter_character = Game_Interpreter.prototype.character;

Game_Interpreter.prototype.character = function(param) {

	if (isNaN(param)) {
		if (param.match(/ceP/i)) {
			var tmpParty = new Array;
			tmpParty = $gamePlayer._followers._data.clone();
			tmpParty.push($gamePlayer);
			
			return tmpParty;
		} else if (param.match(/ceF:(\d+)/i)) {
			var tmpFollowerId = param.match(/ceF:(\d+)/i)[1];
			var tmpFollower   = $gamePlayer._followers.follower(tmpFollowerId);

			return tmpFollower;
		}
    }

	return EXA.CE.Game_Interpreter_character.call(this, param);

}; // Game_Interpreter ‹‹ character

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Sprite_Character
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateOther
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;

Sprite_Character.prototype.updateOther = function(arguments) {
	
	EXA.CE.Sprite_Character_updateOther.call(this, arguments);

	this.setColorTone(this._character._ceColorTone);
	this.setBlendColor(this._character._ceBlendColor);
	
	this.rotation = this._character._ceRotation;

	if (this._character._ceDashLean) {
		if ($gamePlayer._dashing && Input.dir8 > 0) {
			switch (this._character._direction) {
			case 4:
				this.rotation += this._character._ceDashLeanLeft;
				break;
			case 6:
				this.rotation += this._character._ceDashLeanRight; 
				break;
			}
		}
	}
	
}; // Sprite_Character ‹‹ updateOther

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Map
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setupEvents
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_Map_setupEvents = Game_Map.prototype.setupEvents;

Game_Map.prototype.setupEvents = function() {
    
	EXA.CE.Game_Map_setupEvents.call(this);
	
    for (var i = 0; i < $dataMap.events.length; i++) {
		var dataEvent = $dataMap.events[i];
		var tmpEvent  = this._events[i];
		
        if (dataEvent) {
			if (!dataEvent.meta) continue;
			if (dataEvent.meta.ceRotation) {
				tmpEvent._ceRotation = Number(dataEvent.meta.ceRotation);
			}
			if (dataEvent.meta.ceTone) {
				var tone = dataEvent.meta.ceTone.split(',').map(Number);
				tmpEvent._ceColorTone = tone;
			}
			if (dataEvent.meta.ceColor) {
				var color = dataEvent.meta.ceColor.split(',').map(Number);
				tmpEvent._ceBlendColor = color;
			}
			if (dataEvent.meta.ceOpacity) {
				tmpEvent._opacity = Number(dataEvent.meta.ceOpacity);
			}
			if (dataEvent.meta.ceBlendMode) {
				tmpEvent._blendMode = Number(dataEvent.meta.ceBlendMode);
			}
			if (dataEvent.meta.ceMapDxY) {
				var mapDxY = dataEvent.meta.ceMapDxY.split(',').map(Number);
				if (mapDxY[0]) tmpEvent._direction = mapDxY[0];
				if (mapDxY[1] && mapDxY[2]) tmpEvent.setPosition(mapDxY[1], mapDxY[2]);
			}
			if (dataEvent.meta.ceFollow) {
				var eventId = Number(dataEvent.meta.ceFollow);
				this._events[eventId].setEventFollower(tmpEvent._eventId);
			}
        }
    }
	
}; // Game_Map ‹‹ setupEvents

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_CharacterBase
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initMembers
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;

Game_CharacterBase.prototype.initMembers = function(arguments) {
	
	EXA.CE.Game_CharacterBase_initMembers.call(this, arguments);
	
	this._ceColorTone       = [0,0,0,0];
    this._ceToneTarget      = null;
    this._ceToneDuration    = 0;
    this._ceBlendColor      = [0,0,0,0];
    this._ceColorTarget     = null;
    this._ceColorDuration   = 0;
    this._ceOpacityTarget   = null;
    this._ceOpacityDuration = 0;
    this._ceSpeedTarget     = null;
    this._ceSpeedDuration   = 0;
    this._ceRotation        = 0;
	this._ceDashLean        = false;
	this._ceDashLeanLeft    = 0;
	this._ceDashLeanRight   = 0;

}; // Game_CharacterBase ‹‹ initMembers

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] update
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_CharacterBase_update = Game_CharacterBase.prototype.update;

Game_CharacterBase.prototype.update = function() {
	
	EXA.CE.Game_CharacterBase_update.call(this);
	
	this.updateTone();
	this.updateColor();
	this.updateOpacity();
	this.updateMoveSpeed();
	
}; // Game_CharacterBase ‹‹ update

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setRotation
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.setRotation = function(rotation) {
	
    this._ceRotation = rotation * Math.PI / 180;
	
}; // Game_CharacterBase ‹‹ setRotation

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] toTone
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.toTone = function(tone, duration) {
	
    this._ceToneTarget    = tone.clone();
    this._ceToneDuration  = duration;
    if (this._ceToneDuration === 0) {
        this._ceColorTone = this._ceToneTarget.clone();
    }
	
}; // Game_CharacterBase ‹‹ toTone

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateTone
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.updateTone = function() {

    if (this._ceToneDuration > 0) {
        var d = this._ceToneDuration;
        for (var i = 0; i < 4; i++) {
            this._ceColorTone[i] = (this._ceColorTone[i] * (d - 1) + this._ceToneTarget[i]) / d;
        }
        this._ceToneDuration--;
    }

}; // Game_CharacterBase ‹‹ updateTone

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] toColor
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.toColor = function(color, duration) {

    this._ceColorTarget    = color.clone();
    this._ceColorDuration  = duration;
    if (this._ceColorDuration === 0) {
        this._ceBlendColor = this._ceColorTarget.clone();
    }
	
}; // Game_CharacterBase ‹‹ toColor

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateColor
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.updateColor = function() {

    if (this._ceColorDuration > 0) {
        var d = this._ceColorDuration;
        for (var i = 0; i < 4; i++) {
            this._ceBlendColor[i] = (this._ceBlendColor[i] * (d - 1) + this._ceColorTarget[i]) / d;
        }
        this._ceColorDuration--;
    }

}; // Game_CharacterBase ‹‹ updateColor

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] toOpacity
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.toOpacity = function(opacity, duration) {
	
    this._ceOpacityTarget    = opacity;
    this._ceOpacityDuration  = duration;
    if (this._ceOpacityDuration === 0) {
        this.setOpacity(this._ceOpacityTarget);
    }
	
}; // Game_CharacterBase ‹‹ toOpacity

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateOpacity
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.updateOpacity = function() {
	
    if (this._ceOpacityDuration > 0) {
        var d = this._ceOpacityDuration;
        this._opacity = (this._opacity * (d - 1) + this._ceOpacityTarget) / d;
        this._ceOpacityDuration--;
    }
	
}; // Game_CharacterBase ‹‹ updateOpacity

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] toMoveSpeed
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.toMoveSpeed = function(moveSpeed, duration) {

    this._ceSpeedTarget    = moveSpeed;
    this._ceSpeedDuration  = duration;
    if (this._ceSpeedDuration === 0) {
        this.setMoveSpeed(this._ceSpeedTarget);
    }
	
}; // Game_CharacterBase ‹‹ toMoveSpeed

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateMoveSpeed
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_CharacterBase.prototype.updateMoveSpeed = function() {
	
    if (this._ceSpeedDuration > 0) {
        var d = this._ceSpeedDuration;
        this._moveSpeed = (this._moveSpeed * (d - 1) + this._ceSpeedTarget) / d;
        this._ceSpeedDuration--;
    }
	
}; // Game_CharacterBase ‹‹ updateMoveSpeed

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Event
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initMembers
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_Event_initMembers = Game_Event.prototype.initMembers;

Game_Event.prototype.initMembers = function() {
	
	EXA.CE.Game_Event_initMembers.call(this);
	
	this._ceFollowers = [];

}; // Game_Event ‹‹ initMembers

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] moveStraight
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_Event_moveStraight = Game_Event.prototype.moveStraight;

Game_Event.prototype.moveStraight = function(d) {
	
	if (this._ceFollowers.length > 0) {
		if (this.canPass(this.x, this.y, d)) {
			this.updateEventFollowerMove();
		}
	}
	
    EXA.CE.Game_Event_moveStraight.call(this, d);
	
}; // Game_Event ‹‹ moveStraight

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] moveDiagonally
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.CE.Game_Event_moveDiagonally = Game_Event.prototype.moveDiagonally;

Game_Event.prototype.moveDiagonally = function(horz, vert) {
	
	if (this._ceFollowers.length > 0) {
		if (this.canPassDiagonally(this.x, this.y, horz, vert)) {
			this.updateEventFollowerMove();
		}
	}
	
    EXA.CE.Game_Event_moveDiagonally.call(this, horz, vert);
	
}; // Game_Event ‹‹ moveDiagonally

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateEventFollowerMove
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Event.prototype.updateEventFollowerMove = function() {

    for (var i = this._ceFollowers.length - 1; i >= 0; i--) {
        var precedingEvent = (i > 0 ? $gameMap.event(this._ceFollowers[i - 1]) : this);
        $gameMap.event(this._ceFollowers[i]).chaseEvent(precedingEvent);
		this.updateEventFollowerOther($gameMap.event(this._ceFollowers[i]));
    }

}; // Game_Event ‹‹ updateEventFollowerMove

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] setEventFollower
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Event.prototype.setEventFollower = function(followerId) {

	this._ceFollowers.push(followerId);
	$gameMap.event(followerId).setThrough(true);

}; // Game_Event ‹‹ setEventFollower

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] removeEventFollower
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Event.prototype.removeEventFollower = function(followerId) {

	var followerIndex = this._ceFollowers.indexOf(followerId);
	
	if (followerIndex != -1) {
		this._ceFollowers.splice(followerIndex, 1);
	}
	
	$gameMap.event(followerId).setThrough(false);

}; // Game_Event ‹‹ removeEventFollower

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateEventFollowerOther
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Event.prototype.updateEventFollowerOther = function(follower) {

	follower.setMoveSpeed(this.realMoveSpeed());
	follower.setOpacity(this.opacity());
	follower.setBlendMode(this.blendMode());
	follower.setWalkAnime(this.hasWalkAnime());
	follower.setStepAnime(this.hasStepAnime());
	follower.setDirectionFix(this.isDirectionFixed());
	follower.setTransparent(this.isTransparent());
	follower.setPriorityType(this._priorityType);

}; // Game_Event ‹‹ updateEventFollowerOther

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] chaseEvent
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Event.prototype.chaseEvent = function(event) {

	var sx = this.deltaXFrom(event.x);
	var sy = this.deltaYFrom(event.y);
	if (sx !== 0 && sy !== 0) {
		this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
	} else if (sx !== 0) {
		this.moveStraight(sx > 0 ? 4 : 6);
	} else if (sy !== 0) {
		this.moveStraight(sy > 0 ? 8 : 2);
	}

}; // Game_Event ‹‹ chaseEvent

// ▌▌██████████████████████████████████████ EOF █████████████████████████████████████▐▐