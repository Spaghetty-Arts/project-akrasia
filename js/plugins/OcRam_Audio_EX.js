//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Core.js        (will be embedded in all of my plugins)
//=============================================================================
/* DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!     *
 * Copyright(c) 2020, Marko Paakkunainen // mmp_81 (at) hotmail.com         */
"use strict"; var ShaderTilemap = ShaderTilemap || false; var Imported = Imported || {}; var Yanfly = Yanfly || {}; // In case there's no Yanfly plugins in use
if (!Imported.OcRam_Core) { // OcRam_Core has only the functionality which are used widely in all OcRam plugins...
    Game_Interpreter.prototype.event = function () { /* Get Game_Event in event editor like: this.event(); */ return ($gameMap) ? $gameMap.event(this._eventId) : null; };
    Game_Map.prototype.getEventsByName = function (event_name) { /* Get Game_Map events by name */ return this._events.filter(function (ev) { return ev.event().name == event_name; }); };
    Game_Event.prototype.getComments = function () { /* Returns all comments + commandIndex from Game_Event as Array */ if (this._erased || this._pageIndex < 0) return []; var comments = []; var i = 0; this.list().forEach(function (p) { if (p.code == 108) { p.commandIndex = i; comments.push(p); } i++; }); return comments; };
    Game_Event.prototype.getStringComments = function () { /* Returns all comments from Game_Event as String Array */ if (this._erased || this._pageIndex < 0) return []; var comments = []; this.list().filter(function (c) { return c.code == 108; }).forEach(function (p) { p.parameters.forEach(function (s) { comments.push(s); }); }); return comments; };
    ImageManager.loadOcRamBitmap = function (filename, hue) {  /* Load bitmap from ./img/ocram folder */ return this.loadBitmap('img/ocram/', filename, hue, false); };
    Imported.OcRam_Core = true; var OcRam_Core = OcRam_Core || function () { /* OcRam core class */ this.initialize.apply(this, arguments); };
    OcRam_Core.prototype.initialize = function () { /* Initialize OcRam core */ this.name = "OcRam_Core"; this.version = "1.05"; this.twh = [48, 48]; this.twh50 = [24, 24]; this.radian = Math.PI / 180; this._isIndoors = false; this._screenTWidth = Graphics.width / 48; this._screenTHeight = Graphics.height / 48; this.plugins = []; this._menuCalled = false; this.Scene_Map_callMenu = Scene_Map.prototype.callMenu; this.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded; };
    OcRam_Core.prototype.debug = function () { /* Debug core? console.log("OcRam_Core", arguments); */ };
    OcRam_Core.prototype.getBoolean = function (s) { /* Get 'safe' boolean */ if (!s) return false; s = s.toString().toLowerCase(); return (s == "true" && s != "0") ? true : false; };
    OcRam_Core.prototype.getArray = function (a, b) { /* Get plugin param array */ return a ? eval(a) : b || []; };
    OcRam_Core.prototype.getFloat = function (n) { /* Get float */ return isNaN(n - parseFloat(n)) ? 0 : parseFloat(n); };
    OcRam_Core.prototype.regulateRGBG = function (obj) { /* Regulate RGBG value (used in tints) */ obj.Red = parseInt(obj.Red).clamp(-255, 255); obj.Green = parseInt(obj.Green).clamp(-255, 255); obj.Blue = parseInt(obj.Blue).clamp(-255, 255); obj.Gray = parseInt(obj.Gray).clamp(-255, 255); return obj; };
    OcRam_Core.prototype.regulateHexRGBA = function (p) { /* Regulate HEX RGBA value */ if (p.substr(0, 1) !== "#") p = "#" + p; if (p.length == 7) p = p + "ff"; return /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(p)[0] || "#ffffffff"; }
    OcRam_Core.prototype.getJSON = function (s) { /* Get 'safe' JSON */ try { return JSON.parse(s); } catch (ex) { return null; } };
    OcRam_Core.prototype.getJSONArray = function (a) { /* Get 'safe' JSON Array */ var tmp = []; if (a) { OcRam.getArray(a, []).forEach(function (s) { tmp.push(OcRam.getJSON(s)); }); } return tmp; };
    OcRam_Core.prototype.followers = function () { /* Only a shortcut to $gamePlayer._followers.visibleFollowers(); */ return $gamePlayer ? $gamePlayer._followers.visibleFollowers() : []; };
    OcRam_Core.prototype.setIndoorsFlag = function () { /* Set indoors flag - Each plugin will call this when needed */ if (DataManager.isEventTest()) return; if ($dataMap.meta["indoors"] !== undefined) { this.debug("Indoors meta tag found in MAP note field!", $dataMap.meta); this._isIndoors = true; } else { if ($dataTilesets[$dataMap.tilesetId].meta["indoors"] !== undefined) { this.debug("Indoors meta tag found in TILESET note field!", $dataTilesets[$dataMap.tilesetId].meta); this._isIndoors = true; } else { this.debug("Indoors meta tag was NOT found!", undefined); this._isIndoors = false; } } };
    OcRam_Core.prototype.isIndoors = function () { /* Get indoors flag */ return this._isIndoors; };
    OcRam_Core.prototype.runCE = function (pCE_Id) { /* Run common event */ if ($gameTemp.isCommonEventReserved()) { var tmpId = pCE_Id; var tc = this; setTimeout(function () { tc.runCE(tmpId); }, 17); } else { $gameTemp.reserveCommonEvent(pCE_Id); } };
    OcRam_Core.prototype.extendMethod = function (c, b, cb) { /* Extend/override any method */ c[b] = function () { return cb.apply(this, arguments); }; };
    OcRam_Core.prototype.extendProto = function (c, b, cb) { /* Extend/override any proto */ c.prototype[b] = function () { return cb.apply(this, arguments); }; };
    OcRam_Core.prototype.addPlugin = function (name, version) { /* Initialize new OcRam plugin */ this[name] = {}; var new_plugin = this[name]; Imported["OcRam_" + name] = true; this.plugins.push(name); this[name]._menuCalled = false; new_plugin.name = name; new_plugin.version = version; new_plugin.parameters = PluginManager.parameters("OcRam_" + new_plugin.name); if (this.getBoolean(new_plugin.parameters["Debug mode"])) { new_plugin.debug = function () { var args = [].slice.call(arguments); args.unshift("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", ":"); console.log.apply(console, args); }; console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Debug mode:", "Enabled"); console.log("OcRam_" + new_plugin.name + " (v" + new_plugin.version + ")", "Parameters:", new_plugin.parameters); } else { new_plugin.debug = function () { }; } var oc = this; new_plugin.extend = function (c, b, cb) { var cb_name = c.name + "_" + b; if (c[b]) { this[cb_name] = c[b]; oc.extendMethod(c, b, cb); } else { this[cb_name] = c.prototype[b]; oc.extendProto(c, b, cb); } }; }; var OcRam = new OcRam_Core(); // Create new OcRam_Core! (Below aliases)
    Scene_Map.prototype.callMenu = function () { /* Menu called? */ OcRam.Scene_Map_callMenu.call(this); OcRam.debug("Menu called:", true); OcRam._menuCalled = true; OcRam.plugins.forEach(function (p) { OcRam[p]._menuCalled = true; }); };
    Scene_Map.prototype.onMapLoaded = function () { /* Set and get tile dimensions and indoors flag */ OcRam.Scene_Map_onMapLoaded.call(this); if (!OcRam._menuCalled) { OcRam.twh = [$gameMap.tileWidth(), $gameMap.tileHeight()]; OcRam.twh50 = [OcRam.twh[0] * 0.5, OcRam.twh[1] * 0.5]; OcRam._screenTWidth = Graphics.width / OcRam.twh[0]; OcRam._screenTHeight = Graphics.height / OcRam.twh[1]; OcRam.debug("Tile w/h:", OcRam.twh); OcRam.setIndoorsFlag(); OcRam.menuCalled = false; } };
    CanvasRenderingContext2D.prototype.line = function (x1, y1, x2, y2) { /* Draw line to canvas context */ this.beginPath(); this.moveTo(x1, y1); this.lineTo(x2, y2); this.stroke(); };
    Game_Map.prototype.adjustX_OC = function (x) { /* Optimized core adjustX */ if (this.isLoopHorizontal()) { if (x < this._displayX - (this.width() - this.screenTileX()) * 0.5) { return x - this._displayX + $dataMap.width; } else { return x - this._displayX; } } else { return x - this._displayX; } };
    Game_Map.prototype.adjustY_OC = function (y) { /* Optimized core adjustY */ if (this.isLoopVertical()) { if (y < this._displayY - (this.height() - this.screenTileY()) * 0.5) { return y - this._displayY + $dataMap.height; } else { return y - this._displayY; } } else { return y - this._displayY; } };
    Game_CharacterBase.prototype.screenX_OC = function () { /* Optimized core screenX */ return Math.round($gameMap.adjustX_OC(this._realX) * OcRam.twh[0] + OcRam.twh50[0]); };
    Game_CharacterBase.prototype.screenY_OC = function () { /* Optimized core screenY */ return Math.round($gameMap.adjustY_OC(this._realY) * OcRam.twh[1] + OcRam.twh50[0] - this.shiftY() - this.jumpHeight()); };
} if (parseFloat(OcRam.version) < 1.05) alert("OcRam core v1.05 is required!");

//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Audio_EX.js
//=============================================================================

"use strict"; if (!Imported || !Imported.OcRam_Core) alert('OcRam_Core.js ' +
    'is required!'); OcRam.addPlugin("Audio_EX", "2.07");

/*:
 * @plugindesc v2.07 This plugin provides dynamic sound positioning and adds 2 'generic' BGS channels which will also play in battle. PLUGIN NAME MUST BE OcRam_Audio_EX.js
 * @author OcRam
 *
 * @param Default Distance (BGS/SE)
 * @desc Default distance in tiles on AEX BGS/SE?
 * @type number
 * @min 1
 * @max 255
 * @default 20
 * 
 * @param Default Radius (BGS/SE)
 * @desc Default radius in tiles on AEX BGS/SE?
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param Default create new (BGS)
 * @desc Default to always create new BGS?
 * @type boolean
 * @default false
 * 
 * @param Default fade (BGS)
 * @desc Default fade time for BGS in seconds
 * (will fade the BGS start and end)
 * @type number
 * @min 0
 * @max 120
 * @default 2
 *
 * @param Default forced play (BGS)
 * @desc Default to forced playback on AEX BGS?
 * (BGS will start playing immediatly on scene start)
 * @type boolean
 * @default true
 * 
 * @param Default autopan (BGS/SE)
 * @desc Default to autopanning? (true = Imitates surround)
 * @type boolean
 * @default true
 *
 * @param Default fade (BGM)
 * @desc Default fade time for BGM in seconds
 * (will fade the BGM start and end)
 * @type number
 * @min 0
 * @max 120
 * @default 2
 * 
 * @param BGS2/3 volume control
 * @desc true = Shown in options menu, false = Linked to main BGS
 * @type boolean
 * @default true
 * 
 * @param BGS2 option caption
 * @parent BGS2/3 volume control
 * @desc Caption for BGS2 shown in options menu
 * @type text
 * @default BGS2 Volume
 * 
 * @param BGS3 option caption
 * @parent BGS2/3 volume control
 * @desc Caption for BGS3 shown in options menu
 * @type text
 * @default BGS3 Volume
 *
 * @param Use linear curve
 * @desc Use linear curve on distance check instead of exponential. (Linear math is faster than curved)
 * @type boolean
 * @default true
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F8 or F12).
 * @default false
 * 
 * @help
 * ----------------------------------------------------------------------------
 * Introduction                                      (Embedded OcRam_Core v1.5)
 * ============================================================================
 * This plugin provides dynamic sound positioning via event comments (BGS/SE).
 * You may also play multiple BGS at the same time! All played BGS buffers will
 * be saved automatically on game save. And when game is loaded saved buffers
 * will start playing where they left.
 *
 * Plugin also adds 2 'static' BGS channels which will play also in battles.
 * Generic channels intended things like ambient / rain / storm / wind etc...
 * 
 * Import this plugin before OcRam_Weather_EX -plugin (if it's used)!
 *
 * Sources: W3Schools, http://www.w3.org/TR/webaudio/, RMMV and
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 * and maybe some https://stackoverflow.com :)
 *
 * ----------------------------------------------------------------------------
 * Comment guide for events
 * ============================================================================
 *
 * <aex:type:distance+radius:fade:pan:forced:new>
 * 
 * type     = Text      {x, y, d, bg}
 * (x = horizontal, y = vertical, d = dynamic, bg = background (everywhere))
 * 
 * distance = In tiles  {number} (From how long this BGS can be heard?)
 * radius   = In tiles  {number} (Radius of 100% volume)
 * fade     = Seconds   {number} (Fade in/out time in seconds)
 * pan      = Text      {pan/true, nopan/false} (Imitate surround?)
 * forced   = Text      {forced/true, default/false} (Play BGS on map start?)
 * new      = Text      {new/true, link/false} (Create always new BGS?)
 * 
 * Following examples are written with default plugin parameters:
 *
 * BackGround Sounds (BGS) - LOOPING 
 * Comment      <aex> is same as: <aex:d:25+0:0:pan:forced:new>
 * Play BGS     bgs_fire (90, 100, 0)
 *
 * Comment      <aex:::::default> is same as:
 *              <aex:d:25+0:0:pan:default:pan>
 * Play BGS     bgs_fire2 (90, 100, 0)
 *
 * Comment      <aex:x::0> is same as: <aex:x:25+0:0:pan:forced:new>
 * Play BGS     bgs_ocean (90, 100, 0)
 *
 * Comment      <aex:bg:0:3> is same as: <aex:bg:0+0:3:pan:forced:new>
 * Play BGS     bgs_rain (90, 100, 0)
 *
 * Sound Effects (SE) - NON-LOOPING
 * Comment      <aex> is same as: <aex:d:25+0:0:pan:default:new>
 * Play SE      big_bang (90, 100, 0)
 * 
 * Below are few notes:
 *
 * NOTE 1: ALL sounds created via <aex*> tags will be erased if player is
 *         transfered to another map.
 *
 * NOTE 2: "forced" parameter will execute BGS always, when scene is loaded
 *         (even if event trigger would be "Action button" or "on touch").
 *         If BGS isn't forced, parameter will execute BGS/SE ONLY, when
 *         event is triggered as intended.
 *
 * NOTE 3: AEX params will execute ONLY if they are on ACTIVE event page!
 *
 * ----------------------------------------------------------------------------
 * Plugin Commands
 * ============================================================================
 * 
 * Plugin command (to CLEAR all buffers with this event id)
 *   clear_aex [eventId] -OR- clear_aex this
 *   example: clear_aex 1
 *
 * You can also ommit 'this' because it is default
 *   example: clear_aex
 *
 * Plugin command (to control dedicated bgs2, which will play also in battle):
 *   play_bgs2 [bgs_name_here] [volume] [pitch] [pan]
 *   Example: play_bgs2 rain 90 100 0
 *   stop_bgs2
 *
 * Plugin command (to control dedicated bgs3, which will play also in battle):
 *   play_bgs3 [bgs_name_here] [volume] [pitch] [pan]
 *   Example: play_bgs3 wind 40 80 0
 *   stop_bgs3
 *
 * pause_bgs [name] [fade_time]
 * resume_bgs [name] [fade_time]
 * fadeout_bgs [name] [fade_time]
 * save_bgs [name]
 * erase_bgs [name]
 * (To erase all bgs use: erase_bgs *)
 *
 * fade [name] to [volume] in [fade_time] sec
 * Example: fade Wind to 20 in 6 sec
 * Same as: fade Wind to 20 in 6
 * BGM:     fade *bgm* to 0 in 4 sec
 * 
 * ----------------------------------------------------------------------------
 * JS calls
 * ============================================================================
 * 
 * // Full control for dynamic SE
 * AudioManager.playSe(
 *           { name: se_name, volume: 100, pitch: 100, pan: 0 },
 *           {
 *               "type": "d",
 *               "distance": 20,
 *               "radius": 1,
 *               "fade": 0,
 *               "pan": true,
 *               "forced": true,
 *               "new": true,
 *               "started": false,
 *               "dynamic": true,
 *               "commandIndex": 0,
 *               "eventId": 1,
 *               "linkedEvents": [1]
 *           }
 *       );
 *
 * // Simple dynamic SE
 * AudioManager.playDynamicSe(event_id, se_name, distance, radius, auto_pan);
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your game by ANY MEANS (inc. ads, crypto-mining,
 * micro-transactions etc..) it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 5 EUR, No-credits license: 40 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME(S) you are buying / ALL plugins and your PROJECT NAME(S).
 *
 * Licenses are purchased per project and standard license requires credits.
 * If you want to buy several licenses: Every license purhased will give you
 * discount of 2 EUR for the next license purchase until minimum price of
 * 2 EUR / license. License discounts can be used to any of my plugins!
 * ALL of my plugins for 1 project = 40 EUR (standard licenses)
 *
 * https://forums.rpgmakerweb.com/index.php?threads/ocram-audio_ex.108209
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2020, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2019/12/22 v2.00 - Initial release
 * 2019/12/23 v2.01 - Fixed SE pitch bug and aliased update BGS (compatibility)
 * 2020/01/05 v2.02 - Fixed SE volume and menu/map transfer bug 
 *                    (Thanks to Ace of Spades for bug reports)
 * 2020/02/16 v2.03 - OcRam core v1.02 + fixed dynamic audio on moving events
 *                    BGS volume will now effect all 3 BGS channels if
 *                    BGS2/3 volume controls are not in use
 *                    Default fadeout command is now working (w/o AEX notation)
 *                    + Other bug fixes related to non-AEX Audio
 *                    Fixed several Save/Load related issues
 *                    (Credits to: Mardin, Ace of Spades and Anyone)
 * 2020/03/14 v2.04 - OcRam core v1.04 (requirement for all of my plugins)
 *                    Fixed AEX SE audio bug
 * 2020/06/12 v2.05 - Fixed bug where "Test event" crashed game - Requires
 *                    OcRam_Core v1.5 (Credits to jjraymonds)
 * 2020/06/18 v2.06 - AudioManager.playSe(se, aex); // (Credits to Anyone)
 *                    AudioManager.playDynamicSe(event_id, 'se', d, rad, pan);
 *                    Fixed some buffer bugs related to forced AEX
 * 2020/09/05 v2.07 - BGM is now working properly after several re-plays even
 *                    if volume has been adjusted (Credits to 41728280)
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     AudioManager.checkErrors
 *     AudioManager.playBgm
 *     AudioManager.playBgs
 *     AudioManager.replayBgs
 *     AudioManager.saveBgs
 *     AudioManager.fadeOutBgs
 *     AudioManager.fadeInBgs
 *     AudioManager.playSe
 *     AudioManager.stopBgs
 *     ConfigManager.bgsVolume
 *     Scene_Title.playTitleMusic
 */

// ------------------------------------------------------------------------------
// ADDITIONAL DEDICATED BGS CHANNELS THAT ARE PLAYED EVEN IN BATTLE SCENE
// (intended usage for weather bgs >> rain, storm and wind etc...)
// ==============================================================================

var $OcRam_emptyAudio = AudioManager.makeEmptyAudioObject(); $OcRam_emptyAudio.AEX = null;

// ======================================== BGS channel 3 ========================================
AudioManager._bgsVolume2 = 100; AudioManager._currentBgs2 = null; AudioManager._bgs2Buffer = null;

Object.defineProperty(AudioManager, 'bgsVolume2', {
    get: function () {
        return this._bgsVolume2;
    },
    set: function (value) {
        this._bgsVolume2 = value;
        this.updateBgs2Parameters(this._currentBgs2);
    },
    configurable: true
});
AudioManager.playBgs2 = function (bgs2, pos) {
    if (this.isCurrentBgs2(bgs2)) {
        this.updateBgs2Parameters(bgs2);
    } else {
        this.stopBgs2();
        if (bgs2.name) {
            this._bgs2Buffer = this.createBuffer('bgs', bgs2.name);
            this.updateBgs2Parameters(bgs2);
            this._bgs2Buffer.play(true, pos || 0);
            this.fadeInBgs2(4);
        }
    }
    this.updateCurrentBgs2(bgs2, pos);
};
AudioManager.replayBgs2 = function (bgs2) {
    if (this.isCurrentBgs2(bgs2)) {
        this.updateBgs2Parameters(bgs2);
    } else {
        this.playBgs2(bgs2, bgs2.pos);
        if (this._bgs2Buffer) {
            this._bgs2Buffer.fadeIn(this._replayFadeTime);
        }
    }
};
AudioManager.isCurrentBgs2 = function (bgs2) {
    return (this._currentBgs2 && this._bgs2Buffer &&
        this._currentBgs2.name === bgs2.name);
};
AudioManager.updateCurrentBgs2 = function (bgs2, pos) {
    this._currentBgs2 = {
        name: bgs2.name,
        volume: bgs2.volume,
        pitch: bgs2.pitch,
        pan: bgs2.pan,
        pos: pos
    };
};
AudioManager.stopBgs2 = function () {
    if (this._bgs2Buffer) {
        this._bgs2Buffer.stop();
        this._bgs2Buffer = null;
        this._currentBgs2 = null;
    }
};
AudioManager.fadeOutBgs2 = function (duration) {
    if (this._bgs2Buffer && this._currentBgs2) {
        this._bgs2Buffer.fadeOut(duration);
        this._currentBgs2 = null;
    }
};
AudioManager.fadeInBgs2 = function (duration) {
    if (this._bgs2Buffer && this._currentBgs2) {
        this._bgs2Buffer.fadeIn(duration);
    }
};
AudioManager.saveBgs2 = function () {
    if (this._currentBgs2) {
        var bgs2 = this._currentBgs2;
        return {
            name: bgs2.name,
            volume: bgs2.volume,
            pitch: bgs2.pitch,
            pan: bgs2.pan,
            pos: this._bgs2Buffer ? this._bgs2Buffer.seek() : 0
        };
    } else {
        return $OcRam_emptyAudio;
    }
};
AudioManager.updateBgs2Parameters = function (bgs2) {
    this.updateBufferParameters(this._bgs2Buffer, this._bgsVolume2, bgs2);
};

// ======================================== BGS channel 3 ========================================
AudioManager._bgsVolume3 = 100; AudioManager._currentBgs3 = null; AudioManager._bgs3Buffer = null;

Object.defineProperty(AudioManager, 'bgsVolume3', {
    get: function () {
        return this._bgsVolume3;
    },
    set: function (value) {
        this._bgsVolume3 = value;
        this.updateBgs3Parameters(this._currentBgs3);
    },
    configurable: true
});
AudioManager.playBgs3 = function (bgs3, pos) {
    if (this.isCurrentBgs3(bgs3)) {
        this.updateBgs3Parameters(bgs3);
    } else {
        this.stopBgs3();
        if (bgs3.name) {
            this._bgs3Buffer = this.createBuffer('bgs', bgs3.name);
            this.updateBgs3Parameters(bgs3);
            this._bgs3Buffer.play(true, pos || 0);
            this.fadeInBgs3(4);
        }
    }
    this.updateCurrentBgs3(bgs3, pos);
};
AudioManager.replayBgs3 = function (bgs3) {
    if (this.isCurrentBgs3(bgs3)) {
        this.updateBgs3Parameters(bgs3);
    } else {
        this.playBgs3(bgs3, bgs3.pos);
        if (this._bgs3Buffer) {
            this._bgs3Buffer.fadeIn(this._replayFadeTime);
        }
    }
};
AudioManager.isCurrentBgs3 = function (bgs3) {
    return (this._currentBgs3 && this._bgs3Buffer &&
        this._currentBgs3.name === bgs3.name);
};
AudioManager.updateBgs3Parameters = function (bgs3) {
    this.updateBufferParameters(this._bgs3Buffer, this._bgsVolume3, bgs3);
};
AudioManager.updateCurrentBgs3 = function (bgs3, pos) {
    this._currentBgs3 = {
        name: bgs3.name,
        volume: bgs3.volume,
        pitch: bgs3.pitch,
        pan: bgs3.pan,
        pos: pos
    };
};
AudioManager.stopBgs3 = function () {
    if (this._bgs3Buffer) {
        this._bgs3Buffer.stop();
        this._bgs3Buffer = null;
        this._currentBgs3 = null;
    }
};
AudioManager.fadeOutBgs3 = function (duration) {
    if (this._bgs3Buffer && this._currentBgs3) {
        this._bgs3Buffer.fadeOut(duration);
        this._currentBgs3 = null;
    }
};
AudioManager.fadeInBgs3 = function (duration) {
    if (this._bgs3Buffer && this._currentBgs3) {
        this._bgs3Buffer.fadeIn(duration);
    }
};
AudioManager.saveBgs3 = function () {
    if (this._currentBgs3) {
        var bgs3 = this._currentBgs3;
        return {
            name: bgs3.name,
            volume: bgs3.volume,
            pitch: bgs3.pitch,
            pan: bgs3.pan,
            pos: this._bgs3Buffer ? this._bgs3Buffer.seek() : 0
        };
    } else {
        return $OcRam_emptyAudio;
    }
};

// Override
Object.defineProperty(ConfigManager, 'bgsVolume', {
    get: function () {
        return AudioManager.bgsVolume;
    },
    set: function (value) {
        AudioManager.bgsVolume = value;
        AudioManager.bgsVolume2 = value;
        AudioManager.bgsVolume3 = value;
        AudioManager.updateAEX_OC(); // Only for Audio_EX
    },
    configurable: true
}); AudioManager.checkErrors = function () {
    this.checkWebAudioError(this._bgmBuffer);
    this.checkWebAudioError(this._bgsBuffer);
    this.checkWebAudioError(this._bgs2Buffer);
    this.checkWebAudioError(this._bgs3Buffer);
    this.checkWebAudioError(this._meBuffer);
    this._seBuffers.forEach(function (buffer) {
        this.checkWebAudioError(buffer);
    }.bind(this));
    this._staticBuffers.forEach(function (buffer) {
        this.checkWebAudioError(buffer);
    }.bind(this));
};

(function () {

    // ------------------------------------------------------------------------------
    // Private Utility functions - Inherited to all sub scopes here
    // ==============================================================================

    var OcRam_Utils = {}; var _this = this; var distCurve = null;

    if (OcRam.getBoolean(this.parameters['Use linear curve'])) {
        this.debug("DISTANCE CURVE:", "Linear");
        distCurve = function distanceCurve(a, b, m) { // Linear curve with min limit
            a--; return (a > b) ? m : Math.abs(b - a) / b;
        };
    } else {
        this.debug("DISTANCE CURVE:", "Exponential");
        distCurve = function distanceCurve(a, b, m) { // Exponential curve with min limit
            var c = Math.pow(2, Math.log2(b) * -(a / b));
            if (c < m) { c = m; } return c;
        };
    }

    this.makeNewAEXObject = function (event_id, type, distance, radius, fade, pan, forced, force_new) {
        return {
            "type": type || "d",
            "distance": distance || _defaultDistance,
            "radius": radius || _defaultRadius,
            "fade": fade || _defaultFade,
            "pan": pan || _defaultAutoPan,
            "forced": forced || _defaultForced,
            "new": force_new || _defaultNewBGS,
            "started": false,
            "dynamic": true,
            "commandIndex": 0,
            "eventId": event_id || 0,
            "linkedEvents": event_id ? [event_id] : []
        };
    };

    OcRam_Utils.removeFromProcessedBGS = function (pitem) {
        _processedBGS = _processedBGS.filter(function (item) {
            return item !== pitem;
        });
    };

    OcRam_Utils.isInvalidBufferName = function (name, bfr) {
        return (name !== undefined && name !== null) && bfr._bgs.name !== name;
    };

    OcRam_Utils.parseComment = function (ev, indx, cl) {

        var ca = []; var aex_obj = null; ca = (cl + "::::::").split(":");

        /* *Comment* <aex:x::0:> == <aex:x:25+0:0:pan:forced:new>
        ca[0] = Has to be always '<aex'
        ca[1] = 'x', 'y', 'd' or 'bg'
        ca[2] = Distance+radius in tiles (number)
        ca[3] = Fade time in seconds (number)
        ca[4] = Autopan
        ca[5] = Forced play on scene load
        ca[6] = Always new BGS in boolean */

        if (ca[0] == "<aex" || ca[0] == "<aex>") {

            aex_obj = _this.makeNewAEXObject();

            switch (ca[1].toLowerCase()) {
                case "x": case "x>": aex_obj.type = "x"; break;
                case "y": case "y>": aex_obj.type = "y"; aex_obj.pan = false; break;
                case "d": case "d>": aex_obj.type = "d"; break;
                case "bg": case "bg>": aex_obj.type = "bg"; aex_obj.dynamic = false; aex_obj.pan = false; break;
            }

            if (aex_obj.type == "bg") {
                aex_obj.distance = 0; aex_obj.radius = 0;
            } else {
                aex_obj.distance = parseInt((ca[2] + "+").split("+")[0], 10);
                if (isNaN(aex_obj.distance)) aex_obj.distance = _defaultDistance;
                aex_obj.radius = parseInt((ca[2] + "+").split("+")[1], 10);
                if (isNaN(aex_obj.radius)) aex_obj.radius = _defaultRadius;
            }

            aex_obj.fade = parseInt(ca[3] + "", 10);
            if (isNaN(aex_obj.fade)) aex_obj.fade = _defaultFade;

            switch (ca[4].substr(0, 3).toLowerCase()) {
                case "fal": case "nop": aex_obj.pan = false; break;
                case "tru": case "pan": aex_obj.pan = true && aex_obj.dynamic && aex_obj.type != "y"; break;
            }
            
            switch (ca[5].substr(0, 3).toLowerCase()) {
                case "fal": case "def": aex_obj.forced = false; break;
                case "tru": case "for": aex_obj.forced = true; break;
            }

            switch (ca[6].substr(0, 3).toLowerCase()) {
                case "fal": case "lin": aex_obj.new = false; break;
                case "tru": case "new": aex_obj.new = true; break;
            }

            aex_obj.commandIndex = indx; aex_obj.eventId = ev.eventId();
            aex_obj.linkedEvents.push(ev.eventId());

        } ev.eventAEXData.push(aex_obj);

    };

    OcRam_Utils.parseComments = function (ev) {
        ev.eventAEXData = []; var cmts = ev.getComments();
        cmts.forEach(function (c) {
            c.parameters.forEach(function (s) {
                if (s.substr(0, 4) == "<aex") {
                    OcRam_Utils.parseComment(ev, c.commandIndex, s);
                }
            });
        });
    };

    OcRam_Utils.validateVPP = function (p) { // validate volume, pitch and pan
        if (p.volume !== undefined) p.volume = p.volume.clamp(0, 100);
        if (p.pitch !== undefined) p.pitch = p.pitch.clamp(50, 150);
        if (p.pan !== undefined) p.pan = p.pan.clamp(-100, 100);
    };

    OcRam_Utils.getAEXData = function (source) { // Get aexData for BGS and SE
        if (!source.AEX) {
            source.AEX = _this.makeNewAEXObject();
            source.AEX.type = "bg";
            source.AEX.dynamic = false;
            source.AEX.forced = false;
            source.AEX.pan = false;
        } return source;
    };

    OcRam_Utils.clearBuffers = function () {
        AudioManager._bgsBuffers_OC = AudioManager._bgsBuffers_OC.filter(function (buffer) {
            if (!!(buffer)) {
                buffer.stop(); return false;
            } else { return true; }
        });
        AudioManager._seBuffers = AudioManager._seBuffers.filter(function (buffer) {
            if (!!(buffer)) {
                buffer.stop(); return false;
            } else { return true; }
        }); _processedBGS = []; AudioManager.stopBgs(); AudioManager.stopMe();
    };

    OcRam_Utils.isInvalidBuffer = function (bfr, type) {
        if (bfr["_" + type] === undefined) return true;
        return (!bfr["_" + type].AEX.dynamic || bfr._paused || bfr._playing === false);
    };

    // Check player location vs. sound source
    if (Imported.OcRam_Local_Coop) { // If Local_Coop is in use > target nearest player!
        OcRam_Utils.getNewAEXData = function (sound_obj) {

            if (!sound_obj) return $OcRam_emptyAudio;
            if (!sound_obj.AEX.linkedEvents.length > 0) return $OcRam_emptyAudio;
            var ev = null; var pxd = 0; var dXY = 0; var nearestPlayer = null; var rv = 0; var rp = 0; var count = 0; var dr = 0;
            var ret = {
                "name": sound_obj.name,
                "pitch": sound_obj.pitch,
                "volume": 0,
                "pan": sound_obj.pan
            };

            sound_obj.AEX.linkedEvents.forEach(function (eid) {
                ev = $gameMap.event(eid); 
                nearestPlayer = ev.getClosestPlayer();
                pxd = nearestPlayer.x - ev.x; dXY = 0;
                if (sound_obj.AEX.dynamic) {
                    if (sound_obj.AEX.type != "y") dXY = Math.abs(pxd);
                    if (sound_obj.AEX.type != "x") dXY += Math.abs(nearestPlayer.y - ev.y);
                } dr = sound_obj.AEX.distance + sound_obj.AEX.radius;
                if (dXY <= dr) {
                    if (dXY < sound_obj.AEX.radius) {
                        rv = sound_obj.volume * distCurve(dXY, dr, 0.001);
                    } else {
                        rv = sound_obj.volume * distCurve(dXY - sound_obj.AEX.radius, sound_obj.AEX.distance, 0.001);
                    } if (sound_obj.AEX.pan) { // Pan only d and x AEX tags in radius
                        rp += -((100 / sound_obj.AEX.distance) * pxd).clamp(-100, 100); count++;
                    } if (ret.volume < rv) ret.volume = rv;
                }
            }); if (rp && count) rp = rp / count; ret.pan = rp;

            return ret;

        };
    } else { // If Local_Coop isn't used target $gamePlayer
        OcRam_Utils.getNewAEXData = function (sound_obj) {

            if (!sound_obj) return $OcRam_emptyAudio;
            if (!sound_obj.AEX.linkedEvents.length > 0) return $OcRam_emptyAudio;
            var ev = null; var pxd = 0; var dXY = 0; var rv = 0; var rp = 0; var count = 0; var dr = 0;
            var ret = {
                "name": sound_obj.name,
                "pitch": sound_obj.pitch,
                "volume": 0,
                "pan": sound_obj.pan
            };

            sound_obj.AEX.linkedEvents.forEach(function (eid) {
                ev = $gameMap.event(eid); pxd = $gamePlayer.x - ev.x; dXY = 0;
                if (sound_obj.AEX.dynamic) {
                    if (sound_obj.AEX.type != "y") dXY = Math.abs(pxd);
                    if (sound_obj.AEX.type != "x") dXY += Math.abs($gamePlayer.y - ev.y);
                } dr = sound_obj.AEX.distance + sound_obj.AEX.radius;
                if (dXY <= dr) {
                    if (dXY < sound_obj.AEX.radius) {
                        rv = sound_obj.volume * distCurve(dXY, dr, 0.001);
                    } else {
                        rv = sound_obj.volume * distCurve(dXY - sound_obj.AEX.radius, sound_obj.AEX.distance, 0.001);
                    } if (sound_obj.AEX.pan) { // Pan only d and x AEX tags in radius
                        rp += -((100 / sound_obj.AEX.distance) * pxd).clamp(-100, 100); count++;
                    } if (ret.volume < rv) ret.volume = rv;
                }
            }); if (rp && count) rp = rp / count; ret.pan = rp;

            return ret;

        };
    }

    OcRam_Utils.updateBgsPlayerPosVsEvent = function (buffer) {
        if (this.isInvalidBuffer(buffer, "bgs")) { // AEX BG BGS
            if (!buffer._fading) {
                _newVolume = (AudioManager._bgsVolume * buffer._bgs.volume) / 100;
                buffer.fadeTo_OC(1, _newVolume);
            } return true;
        } _newVolume = 0; _aexData = this.getNewAEXData(buffer._bgs);
        _newVolume = (AudioManager._bgsVolume * _aexData.volume) / 100;
        if (_aexData.pan && buffer._bgs.AEX.pan) buffer.pan = _aexData.pan / 100;
        buffer.fadeTo_OC(1, _newVolume);
    };

    OcRam_Utils.updateSePlayerPosVsEvent = function (buffer) {
        if (this.isInvalidBuffer(buffer, "se")) return true;
        // Allow empty panner node only for NEW buffers
        if (buffer._buffer && !buffer._pannerNode) return true;
        _newVolume = 0; _aexData = this.getNewAEXData(buffer._se);
        _newVolume = (AudioManager._seVolume * _aexData.volume) / 100;
        if (!buffer._se.AEX.pan) {
            buffer.pan = buffer._se.pan;
        } else {
            if (_aexData.pan) buffer.pan = _aexData.pan / 100;
        } buffer.fadeTo_OC(1, _newVolume);
    };

    OcRam_Utils.isEventProcessed = function (eid) {
        if (_processedBGS === undefined) { _processedBGS.push(0); }
        for (var i = 0; i < _processedBGS.length; i++) {
            if (_processedBGS[i] == eid) {
                _this.debug("Event already processed!", _processedBGS[i]);
                return true; // Event is already processed
            }
        } return false;
    };

    OcRam_Utils.playForcedAEX = function (ev_id) { // Find all forced AEX tags

        var i = 0;

        $gameMap.events().forEach(function(ev) {
            if (!ev_id || ev_id == ev.eventId()) { // Is ok event?
                if (ev._pageIndex > -1 && !ev._erased && ev.eventAEXData) { // Is this event valid?
                    if (ev.eventAEXData.length > 0) { // Do we got AEX data?
                        i = 0; ev.page().list.forEach(function (item) {
                            if (item.code == 245) { // Play BGS
                                if (!OcRam_Utils.isEventProcessed(ev._eventId)) {
                                    ev.eventAEXData.forEach(function (ev_aex_data) {
                                        if (ev_aex_data.commandIndex + 1 == i && ev_aex_data.forced) {
                                            _this.debug("PLAY FORCED BGS", ev);
                                            AudioManager.setupBGS_OC(item.parameters[0], ev, i);
                                            AudioManager.playBgs(item.parameters[0], 0); return;
                                        };
                                    });
                                }
                            } if (item.code == 250) { // Play SE
                                ev.eventAEXData.forEach(function (ev_aex_data) {
                                    if (ev_aex_data.commandIndex + 1 == i && ev_aex_data.forced) {
                                        _this.debug("PLAY FORCED SE", ev);
                                        AudioManager.setupSE_OC(item.parameters[0], ev, i);
                                        AudioManager.playSe(item.parameters[0]); return;
                                    };
                                });
                            } i++;
                        });
                    }
                }
            }
        });

    };

    OcRam_Utils.updateBGSBuffer = function (bfr, bgs, pos) {
        var result = true;
        if ((!bfr._paused && !bfr._playing)) {
            bfr.stop(); result = false;
        } else if (bfr._bgs.name === bgs.name && !bfr._bgs.AEX.dynamic) {
            AudioManager._isCurrent_OC = true;
            if (bfr._paused) {
                if (pos === null) pos = bfr._bgs.pos;
                AudioManager.playBuffer_OC(null, bfr, pos);
            } else {
                AudioManager.updateBgsParameters(bgs, bfr);
            }
        } return result;
    };

    OcRam_Utils.cleanAllBuffers = function () {
        _processedBGS = []; OcRam_Utils.clearBuffers(); _this._menuCalled = false;
        AudioManager._bgsBuffers_OC = []; AudioManager._seBuffers_OC = []; AudioManager.stopBgs();
        AudioManager.stopMe(); AudioManager.stopBgs2(); AudioManager.stopBgs3();
    };

    this.debug("$OcRam_emptyAudio:", $OcRam_emptyAudio);

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================

    var _defaultDistance = Number(this.parameters['Default Distance (BGS/SE)'] || 25);
    var _defaultRadius = Number(this.parameters['Default Radius (BGS/SE)'] || 0);
    var _defaultFade = Number(this.parameters['Default fade (BGS)'] || 2);
    var _defaultNewBGS = OcRam.getBoolean(this.parameters['Default create new (BGS)']);
    var _defaultForced = OcRam.getBoolean(this.parameters['Default forced play (BGS)']);
    var _defaultBgmFade = Number(this.parameters['Default fade (BGM)'] || 2);
    var _defaultAutoPan = OcRam.getBoolean(this.parameters['Default autopan (BGS/SE)']);
    var _showBGS23Volume = OcRam.getBoolean(this.parameters['BGS2/3 volume control']);
    var _bgs2Caption = this.parameters['BGS2 option caption'] || 'BGS2 Volume';
    var _bgs3Caption = this.parameters['BGS3 option caption'] || 'BGS3 Volume';

    var _pcFade; var _processedBGS = []; var _aexData = {}; var _newVolume = 0;
    AudioManager._bgsBuffers_OC = []; var _gameJustLoaded = false;

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    this.extend(Game_Interpreter, "pluginCommand", function (command, args) {
        switch (command) {
            case "play_bgs2":
                var tmp_bgs2 = {
                    name: args[0],
                    volume: args[1],
                    pitch: args[2],
                    pan: args[3],
                    pos: args[4]
                }; _this.debug("play_bgs2", tmp_bgs2); AudioManager.playBgs2(tmp_bgs2); break;
            case "play_bgs3":
                var tmp_bgs3 = {
                    name: args[0],
                    volume: args[1],
                    pitch: args[2],
                    pan: args[3],
                    pos: args[4]
                }; _this.debug("play_bgs3", tmp_bgs3); AudioManager.playBgs3(tmp_bgs3); break;
            case "stop_bgs2":
                _this.debug("stop_bgs2", args);
                AudioManager.stopBgs2(); break;
            case "stop_bgs3":
                _this.debug("stop_bgs3", args);
                AudioManager.stopBgs3(); break;
            case "save_bgs":
                _this.debug("save_bgs", args);
                if (!!(args[0])) {
                    AudioManager.saveBgs(args[0]);
                } break;
            case "pause_bgs":
                _this.debug("pause_bgs", args);
                if (!(args[1])) { _pcFade = _defaultFade; } else { _pcFade = Number(args[1]); }
                if (!(args[0])) { AudioManager.pauseBgs_OC(null, _pcFade); }
                else { AudioManager.pauseBgs_OC(String(args[0]), _pcFade); } break;
            case "resume_bgs":
                _this.debug("resume_bgs", args);
                if (!(args[1])) { _pcFade = _defaultFade; } else { _pcFade = Number(args[1]); }
                if (!(args[0])) { AudioManager.replayBgs(null, _pcFade); }
                else { AudioManager.replayBgs(String(args[0]), _pcFade); } break;
            case "fadeout_bgs":
                _this.debug("fadeout_bgs", args);
                if (!(args[1])) { _pcFade = _defaultFade; } else { _pcFade = Number(args[1]); }
                if (!(args[0])) { AudioManager.fadeOutBgs(_pcFade, null); }
                else { AudioManager.fadeOutBgs(_pcFade, String(args[0])); } break;
            case "erase_bgs":
                if (!(args[0])) {
                    _this.debug("erase_bgs", "ALL"); _processedBGS = []; AudioManager.stopBgs();
                } else {
                    _this.debug("erase_bgs", args); AudioManager.stopBgs(false, String(args[0]));
                } break;
            case "fade": // fade Wind to 20 in 6 sec
                _this.debug("fade", args);
                if (!(args[0]) || args.length < 3) { return false; } // Name and volume is required
                var tv = Number(args[2]).clamp(0, 100);
                tv = (AudioManager._bgmVolume * tv) / 100; tv = tv.clamp(0, 100);
                if (!(args[4])) {
                    _pcFade = (args[0] == "*bgm*") ? _defaultBgmFade : _defaultFade;
                } else {
                    _pcFade = Number(args[4]);
                } if (args[0] == "*bgm*") {
                    AudioManager.fadeToBgm_OC(_pcFade, tv);
                } else {
                    AudioManager.fadeToBgs_OC(String(args[0]), _pcFade, tv);
                } break;
            case "clear_aex": _this.debug("clear_aex", args);
                if (args[0] === undefined) args[0] = "this";
                var ev_id = ((args[0]).toLowerCase() == "this") ? this._eventId : parseInt(args[0]);
                AudioManager.clearAEXData(ev_id); break;
            default:
                _this["Game_Interpreter_pluginCommand"].apply(this, arguments);
        }
    });

    if (_showBGS23Volume) { // Re-define BGS2/3 getters and setters - if BGS2/3 volume control is shown
        Object.defineProperty(ConfigManager, 'bgsVolume2', {
            get: function () {
                return (_showBGS23Volume) ? AudioManager.bgsVolume2 : AudioManager.bgsVolume;
            },
            set: function (value) {
                AudioManager.bgsVolume2 = (_showBGS23Volume) ? value : AudioManager.bgsVolume;
            },
            configurable: true
        });
        Object.defineProperty(ConfigManager, 'bgsVolume3', {
            get: function () {
                return (_showBGS23Volume) ? AudioManager.bgsVolume3 : AudioManager.bgsVolume;
            },
            set: function (value) {
                AudioManager.bgsVolume3 = (_showBGS23Volume) ? value : AudioManager.bgsVolume;
            },
            configurable: true
        });
        Object.defineProperty(ConfigManager, 'bgsVolume', {
            get: function () {
                return AudioManager.bgsVolume;
            },
            set: function (value) {
                AudioManager.bgsVolume = value; AudioManager.updateAEX_OC();
            },
            configurable: true
        });
    }

    this.extend(ConfigManager, "makeData", function () {
        var config = _this["ConfigManager_makeData"].apply(this, arguments);
        config.bgsVolume2 = this.bgsVolume2;
        config.bgsVolume3 = this.bgsVolume3;
        return config;
    });

    this.extend(ConfigManager, "applyData", function (config) {
        _this["ConfigManager_applyData"].apply(this, arguments);
        if (_showBGS23Volume) {
            this.bgsVolume2 = this.readVolume(config, 'bgsVolume2');
            this.bgsVolume3 = this.readVolume(config, 'bgsVolume3');
        } else {
            this.bgsVolume2 = this.readVolume(config, 'bgsVolume');
            this.bgsVolume3 = this.readVolume(config, 'bgsVolume');
        }
    });

    this.extend(Window_Options, "addVolumeOptions", function () {
        _this["Window_Options_addVolumeOptions"].apply(this, arguments);
        if (_showBGS23Volume) {
            this.addCommand(_bgs2Caption, 'bgsVolume2');
            this.addCommand(_bgs3Caption, 'bgsVolume3');
        }
    });

    // Play BGS & SE commands
    this.extend(Game_Interpreter, "command245", function () {
        AudioManager.setupBGS_OC(this._params[0], this.event(), this._index);
        return _this["Game_Interpreter_command245"].apply(this, arguments);
    });

    this.extend(Game_Interpreter, "command250", function () {
        AudioManager.setupSE_OC(this._params[0], this.event(), this._index);
        return _this["Game_Interpreter_command250"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // RMMV core - Game_Player, Scene_Title & Scene_Map - Aliases
    // ==============================================================================

    // If moving event has AEX >> update it...
    this.extend(Game_CharacterBase, "refreshBushDepth", function () {
        _this["Game_CharacterBase_refreshBushDepth"].apply(this, arguments);
        if (this.eventAEXData) AudioManager.updateAEX_OC();
    });

    // On scene start >> play forced AEX tags // Triggered after onMapLoaded
    this.extend(Scene_Map, "start", function () {
        _this["Scene_Map_start"].apply(this, arguments);
        if (!_this._menuCalled) {
            _this.debug("Scene_Map.start() - should be called only when new map!");
            $gameMap.events().forEach(function (ev) {
                OcRam_Utils.parseComments(ev);
            }); OcRam_Utils.playForcedAEX(); // Play forced AEX sounds
            AudioManager.updateBgsAEX(); _gameJustLoaded = false;
        } _this._menuCalled = false;
    });

    this.extend(Game_Event, "setupPage", function () {
        _this["Game_Event_setupPage"].apply(this, arguments); OcRam_Utils.parseComments(this);
        if (!_gameJustLoaded && !_this._menuCalled) { // Play forced AEX sound
            if (!OcRam_Utils.isEventProcessed(this.eventId())) OcRam_Utils.playForcedAEX(this.eventId());
        }
    });

    // Clear buffers when transfered (called before Scene_Map.start)
    this.extend(Game_Player, "performTransfer", function () {
        if (!_gameJustLoaded) OcRam_Utils.clearBuffers();
        _this["Game_Player_performTransfer"].apply(this, arguments);
    });

    // Update sound position when increaseSteps is triggered (player moves 1 tile)
    this.extend(Game_Player, "increaseSteps", function () {
        AudioManager.updateAEX_OC(); _this["Game_Player_increaseSteps"].apply(this, arguments);
    });

    if (Imported.OcRam_Local_Coop) {
        this.extend(Game_Follower, "refreshBushDepth", function () {
            AudioManager.updateAEX_OC(); _this["Game_Follower_refreshBushDepth"].apply(this, arguments);
        });
    }

    // Clear Audio_EX when exited to title screen!
    this.extend(Scene_GameEnd, "commandToTitle", function () {
        OcRam_Utils.cleanAllBuffers(); _this["Scene_GameEnd_commandToTitle"].apply(this, arguments);
    });

    // Return to Title Screen
    this.extend(Game_Interpreter, "command354", function () {
        OcRam_Utils.cleanAllBuffers(); _this["Game_Interpreter_command354"].apply(this, arguments); return true;
    });

    // Game over
    this.extend(Scene_Gameover, "gotoTitle", function () {
        OcRam_Utils.cleanAllBuffers(); _this["Scene_Gameover_gotoTitle"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // RMMV core - Game_System - Aliases
    // ==============================================================================

    // (called before OC_Game_Player_performTransfer && OC_Scene_Map_start) 
    this.extend(Game_System, "onAfterLoad", function () {
        OcRam_Utils.cleanAllBuffers();
        _this.debug("_gameJustLoaded -flag set to true!"); _gameJustLoaded = true;
        _this["Game_System_onAfterLoad"].apply(this, arguments);
        if (this._currentBgs) AudioManager.playBgs(this._currentBgs);
        if (this._currentBgs2) AudioManager.playBgs2(this._currentBgs2);
        if (this._currentBgs3) AudioManager.playBgs3(this._currentBgs3);
        this.playSavedBGS_OC();
    });

    this.extend(Game_System, "onBeforeSave", function () {
        if (AudioManager._currentBgm && AudioManager._bgmBuffer) {
            AudioManager._currentBgm.volume = AudioManager._bgmBuffer._volume * 100;
            _this.debug("Saved BGM", AudioManager._bgmBuffer);
        } this._currentBgs = AudioManager._currentBgs;
        this._currentBgs2 = AudioManager._currentBgs2;
        this._currentBgs3 = AudioManager._currentBgs3;
        this._bgsBuffers_OC = AudioManager._bgsBuffers_OC;
        _this["Game_System_onBeforeSave"].apply(this, arguments);
        this._bgsOnSave = []; // We got our own BGS buffer...
    });

    this.extend(Game_System, "replayWalkingBgm", function () {
        this._walkingBgm.volume = AudioManager._savedVol_OC;
        _this["Game_System_replayWalkingBgm"].apply(this, arguments);
    });

    this.extend(DataManager, "setupNewGame", function () {
        AudioManager.fadeToBgm_OC(_defaultBgmFade, 0);
        _this["DataManager_setupNewGame"].apply(this, arguments);
    });

    // ------------------------------------------------------------------------------
    // RMMV core - AudioManager - Aliases
    // ==============================================================================

    this.extend(AudioManager, "saveBgm", function () {
        if (this._bgmBuffer != null) {
            this._savedVol_OC = ((this._bgmBuffer._volume / (AudioManager._bgmVolume / 100)) * 100);
        } else {
            this._savedVol_OC = 0;
        } return _this["AudioManager_saveBgm"].apply(this, arguments);
    });

    this.extend(AudioManager, "replayBgm", function (bgm) {
        bgm.volume = this._savedVol_OC; _this["AudioManager_replayBgm"].apply(this, arguments);
    });

    this.extend(AudioManager, "updateBgsParameters", function (bgs, buffer) {
        if (buffer !== undefined) {
            var new_bgs = (!bgs) ? OcRam_Utils.getAEXData(buffer._bgs) : OcRam_Utils.getAEXData(bgs);
            new_bgs.pitch = new_bgs.pitch || 100;
            if (buffer._bgs.AEX.dynamic) { // this is "dynamic" sound
                new_bgs = OcRam_Utils.getNewAEXData(buffer._bgs);
            } this.updateBufferParameters(buffer, this._bgsVolume, new_bgs);
        } else { // Current BGS, BGS2/3 and BG
            _this["AudioManager_updateBgsParameters"].apply(this, arguments);
        }
    });

    // ------------------------------------------------------------------------------
    // RMMV core - AudioManager - New methods
    // ==============================================================================
    // By default RMMV doesn't have possibility to play several BGS at the same time
    // ...so let us create buffer for multiple BGS! (RMMV already has _seBuffers)

    AudioManager.setupBGS_OC = function (bgs_obj, ev, cmd_index) {
        if (!ev) return; OcRam_Utils.validateVPP(bgs_obj); var eid = ev.eventId();
        // New BGS >> push it to array and set AEX data
        if (!bgs_obj.AEX || !OcRam_Utils.isEventProcessed(eid)) {
            if (ev && bgs_obj.name) {
                _processedBGS.push(eid);
                ev.eventAEXData.forEach(function (ev_aex_data) {
                    if (ev_aex_data.commandIndex + 1 == cmd_index) {
                        bgs_obj.AEX = ev_aex_data; _this.debug("New BGS (setupBGS_OC)", bgs_obj); return;
                    };
                });
            }
        }
    };

    AudioManager.prepareCurrentBGS_OC = function (bgs) {
        if (this._currentBgs) { // Stop old BGS and start new BGS, only if BGS is changed!
            if (this._currentBgs.name != bgs.name) {
                if (this._bgsBuffer) {
                    this._bgsBuffer.stop(); this._bgsBuffer = null; this._currentBgs = null;
                } this._currentBgs = bgs;
                if (bgs.name) {
                    this._bgsBuffer = this.createBuffer('bgs', bgs.name);
                    this.updateBgsParameters(bgs);
                    this._bgsBuffer.play(true, 0);
                } _this.debug("Current BGS is now ", bgs);
            }
        } else { // No current BGS playing... Create and play
            this._currentBgs = bgs;
            if (bgs.name) {
                this._bgsBuffer = this.createBuffer('bgs', bgs.name);
                this.updateBgsParameters(bgs);
                this._bgsBuffer.play(true, 0);
            } _this.debug("Current BGS is now ", bgs);
        }
    };

    AudioManager.clearAEXData = function (ev_id) {
        if (!ev_id) return;
        this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
            if (buffer._bgs.AEX && buffer._bgs.AEX.eventId == ev_id) {
                OcRam_Utils.removeFromProcessedBGS(ev_id);
                buffer.stop(); return false;
            } else { return true; }
        });
    };

    AudioManager.setupSE_OC = function (se_obj, ev, cmd_index) {
        OcRam_Utils.validateVPP(se_obj);
        if (ev && se_obj.name) {
            ev.eventAEXData.forEach(function (ev_aex_data) {
                if (ev_aex_data.commandIndex + 1 == cmd_index) {
                    se_obj.AEX = ev_aex_data; _this.debug("New SE (setupSE_OC)", se_obj); return;
                };
            });
            
        }
    };

    AudioManager.createAndPlayBGSBuffer_OC = function (bgs, pos) {
        if (bgs.name && bgs.AEX) {
            if (!bgs.AEX.new) {
                var found_bfr = null;
                this._bgsBuffers_OC.forEach(function (buffer) {
                    if (buffer._bgs.name == bgs.name && buffer._bgs.AEX) { found_bfr = buffer; return; }
                }); if (found_bfr) {
                    _this.debug("LINKED BGS FOUND", found_bfr);
                    found_bfr._bgs.AEX.linkedEvents.push(bgs.AEX.eventId);
                } else {
                    bgs.AEX.new = true;
                }
            } if (bgs.AEX.new) {
                if (!bgs.AEX.forced || (bgs.AEX.forced && !bgs.AEX.started)) {
                    bgs.AEX.started = true; // If was 'forced' BGS mark it as started so it won't be started again...
                    var buffer = this.createBuffer("bgs", bgs.name);
                    buffer._bgs = OcRam_Utils.getAEXData(bgs);
                    buffer._bgs.pos = pos || 0;
                    this.playBuffer_OC(bgs, buffer, pos);
                    this._bgsBuffers_OC.push(buffer);
                }
            }
        }
    };

    AudioManager.createAndPlaySeBuffer_OC = function (se, aex_data) {
        var buffer = this.createBuffer("se", se.name);
        if (aex_data) {
            buffer._se = se; buffer._se.AEX = aex_data;
        } else {
            buffer._se = OcRam_Utils.getAEXData(se);
        } buffer._pitch = se.pitch / 100;
        buffer._volume = ((AudioManager._seVolume / 100) * se.volume) / 100;
        OcRam_Utils.updateSePlayerPosVsEvent(buffer);
        buffer.play(false); this._seBuffers.push(buffer);
    };

    AudioManager.pauseBgs_OC = function (name, fade) {
        this.saveBgs(name); this.fadeOutBgs(fade, name);
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (!OcRam_Utils.isInvalidBufferName(name, buffer)) buffer._paused = true;
        });
    };

    AudioManager.fadeToBgs_OC = function (name, fade, tv) {
        tv = tv.clamp(0, 100); // Make target volume valid
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (OcRam_Utils.isInvalidBufferName(name, buffer)) {
                return true;
            } else if (!buffer._paused && buffer._playing) {
                if (fade === null) fade = buffer._bgs.AEX.fade || 0;
                buffer._bgs.volume = tv;
                buffer.fadeTo_OC(fade, tv);
            }
        });
    };

    AudioManager.fadeToBgm_OC = function (fade, tv) {
        if (this._bgmBuffer !== null) {
            tv = tv.clamp(0, 100); // Make target volume valid
            if (fade === null) fade = 0;
            this._bgmBuffer.fadeTo_OC(fade, tv);
        }
    };


    // Play desired BGS buffer
    AudioManager.playBuffer_OC = function (bgs_obj, bfr, pos) {
        this.updateBgsParameters(bgs_obj, bfr);
        bfr.play(true, pos || 0); bfr._playing = true; bfr._paused = false;
        if (bfr._bgs.AEX.fade > 0) bfr.fadeIn(bfr._bgs.AEX.fade);
    };

    // Bound to Scene_Map and called on increaseSteps
    AudioManager.updateAEX_OC = function () {
        this.updateSeAEX(); this.updateBgsAEX();
    };

    AudioManager.updateBgsAEX = function () {
        this._bgsBuffers_OC.forEach(function (buffer) {
            OcRam_Utils.updateBgsPlayerPosVsEvent(buffer);
        });
    };

    AudioManager.updateSeAEX = function () {
        this._seBuffers.forEach(function (buffer) {
            OcRam_Utils.updateSePlayerPosVsEvent(buffer);
        });
    };

    // ------------------------------------------------------------------------------
    // RMMV core - WebAudio and Game_System - New methods
    // ==============================================================================

    WebAudio.prototype.fadeTo_OC = function (duration, tv) {
        // Source: https://developer.mozilla.org/en-US/docs/Web/API/AudioParam
        if (this.isReady()) {
            if (this._gainNode) {
                tv = Math.abs(tv) / 100; if (tv > 1) tv = 1;
                var g = this._gainNode.gain;
                var currentTime = WebAudio._context.currentTime;
                g.cancelScheduledValues(currentTime); // If already used '...ValueAtTime'
                g.setValueAtTime(this._volume, currentTime); // Set start pos
                g.linearRampToValueAtTime(tv, currentTime + duration); // Init linear fade
                var tc = this; this._fading = true;
                if (this._timerHandle) clearTimeout(this._timerHandle);
                this._timerHandle = setTimeout(function () {
                    tc._fading = false;
                }, duration * 1000);
                this._volume = tv; // Start fade
            } else {
                this._startPlaying(); this.fadeTo_OC(duration, tv);
            }
        } else {
            // If WebAudio wasn't ready, attach fader to WebAudio load, 
            // which will call this function when ready.
            this.addLoadListener(function () {
                this.fadeTo_OC(duration, tv);
            }.bind(this));
        }
    };

    Game_System.prototype.playSavedBGS_OC = function () {
        AudioManager._bgsBuffers_OC = []; var tmp_bgs = {}; _processedBGS = [];
        if (this._bgsBuffers_OC.forEach !== undefined) {
            this._bgsBuffers_OC.forEach(function (buffer) {
                if (buffer._bgs.AEX) {
                    tmp_bgs = buffer._bgs;
                    if (!tmp_bgs.AEX.forced) { // Play only non-forced BGS!
                        _processedBGS.push(tmp_bgs.AEX.eventId);
                        AudioManager.playBgs(tmp_bgs, buffer.pos);
                    }
                }
            });
        }
    };

    // ------------------------------------------------------------------------------
    // RMMV core - AudioManager (rpg_managers.js) - Overrides (+ Scene_Title)
    // ==============================================================================

    AudioManager.playBgm = function (pbgm, pos) {

        let bgm = { ...pbgm };

        _this.debug("Play BGM", bgm);
        
        if (this.isCurrentBgm(bgm)) {
            this.updateBgmParameters(bgm);
        } else {
            this.stopBgm();
            if (bgm.name) {
                var target_vol = (AudioManager._bgmVolume * bgm.volume) / 100;
                target_vol = target_vol.clamp(0, 100); bgm.volume = 0;
                if (Decrypter.hasEncryptedAudio && this.shouldUseHtml5Audio()) {
                    this.playEncryptedBgm(bgm, pos);
                } else {
                    this._bgmBuffer = this.createBuffer('bgm', bgm.name);
                    this.updateBgmParameters(bgm);
                    if (!this._meBuffer) {
                        this._bgmBuffer.play(true, pos || 0);
                    }
                } bgm.volume = target_vol; this.fadeToBgm_OC(_defaultBgmFade, target_vol);
            }
        } this.updateCurrentBgm(bgm, pos);

    };

    AudioManager.playBgs = function (bgs, pos) {
        this._isCurrent_OC = false; _this.debug("Play BGS", bgs);
        if (!bgs.AEX) {
            _this.debug("Play 'current' BGS command!", bgs);
            this.prepareCurrentBGS_OC(bgs); return;
        } if (bgs.AEX.forced && pos) return; // START FORCED ONLY ONCE!
        if (!bgs.AEX.forced) AudioManager.clearAEXData(bgs.AEX.eventId); // CLEAR AEX IF NOT FORCED!
        if (bgs && bgs.name) {
            if (pos === undefined) pos = (!!(bgs.startTime)) ? bgs.startTime : null;
            this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
                return OcRam_Utils.updateBGSBuffer(buffer, bgs, pos);
            }); if (!AudioManager._isCurrent_OC) this.createAndPlayBGSBuffer_OC(bgs, pos);
        } else if (bgs) { // No name - Stop it...
            if (this._currentBgs != null) this.createAndPlayBGSBuffer_OC(bgs, pos);
            this.stopBgs(false, bgs.name); this._currentBgs = null;
        }
    };

    AudioManager.stopBgs = function (preserve_buffers, name) {
        this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
            if (buffer._bgs.name == name) {
                buffer.stop(); return false;
            } else { return true; }
        }); if (name === undefined || name == "*") {
            if (!preserve_buffers) { // Erase all
                _processedBGS = [];
                AudioManager._bgsBuffers_OC = AudioManager._bgsBuffers_OC.filter(function (buffer) {
                    if (!!(buffer)) {
                        buffer.stop(); return false;
                    } else { return true; }
                });
                AudioManager._seBuffers = AudioManager._seBuffers.filter(function (buffer) {
                    if (!!(buffer)) {
                        buffer.stop(); return false;
                    } else { return true; }
                }); _processedBGS = []; AudioManager.stopMe(); _this._menuCalled = false;
                AudioManager._bgsBuffers_OC = []; AudioManager._seBuffers_OC = [];
                AudioManager.stopMe(); AudioManager.stopBgs2(); AudioManager.stopBgs3();
            } if (this._bgsBuffer) { // Stop only current BGS
                this._bgsBuffer.stop();
            } this._bgsBuffer = null; this._currentBgs = null;
        }
    };

    AudioManager.replayBgs = function (bgs, fade) {
        this._bgsBuffers_OC.forEach(function (buffer) {
            if ((bgs && !!(bgs.name)) && buffer._bgs.name !== bgs.name) { return true; }
            if (!buffer._playing || buffer._paused) {
                if (!!(fade)) buffer._bgs.AEX.fade = fade;
                AudioManager.playBgs(buffer._bgs, buffer._bgs.pos);
            }
        });
    };

    AudioManager.saveBgs = function (name) {
        var bgs_buffers = [];
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (OcRam_Utils.isInvalidBufferName(name, buffer)) return true;
            buffer._bgs.pos = buffer.seek() || 0;
            _aexData = OcRam_Utils.getAEXData(buffer._bgs);
            bgs_buffers.push(_aexData);
        });
        if (bgs_buffers.length <= 0) {
            bgs_buffers[0] = $OcRam_emptyAudio;
        } return bgs_buffers;
    };

    AudioManager.fadeOutBgs = function (duration, name) {
        if (name) { // Fadeout specific BGS
            this._bgsBuffers_OC.forEach(function (buffer) {
                if (OcRam_Utils.isInvalidBufferName(name, buffer) || buffer._paused) {
                    return true;
                } else if (buffer._bgs) {
                    if (duration === null) duration = buffer._bgs.AEX.fade || 0;
                    buffer._playing = false; buffer.fadeOut(duration);
                }
            });
        } else { // 'Vanilla' fadeout command
            if (this._bgsBuffer && this._currentBgs) {
                this.fadeOutBgs(duration, this._currentBgs.name);
                this._bgsBuffer.fadeOut(duration);
                this._currentBgs = null;
            }
        }
    };

    AudioManager.fadeInBgs = function (duration, name) {
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (OcRam_Utils.isInvalidBufferName(name, buffer)) { return true; }
            buffer._playing = true; buffer._paused = false;
            buffer._bgs.volume = 0; buffer._fading = true;
            if (buffer._timerHandle) clearTimeout(buffer._timerHandle);
            buffer._timerHandle = setTimeout(function () {
                buffer._fading = false;
            }, duration * 1000); buffer.fadeIn(duration);
        });
    };

    AudioManager.playSe = function (se, aex_data) {
        if (se.name) {
            this._seBuffers = this._seBuffers.filter(function (audio) {
                return audio.isPlaying();
            }); this.createAndPlaySeBuffer_OC(se, aex_data);
        }
    };

    AudioManager.playDynamicSe = function (event_id, se_name, distance, radius, auto_pan) {
        this.playSe(
            { name: se_name, volume: 100, pitch: 100, pan: 0 },
            {
                "type": "d",
                "distance": distance || 20,
                "radius": radius || 1,
                "fade": 0,
                "pan": auto_pan || true,
                "forced": true,
                "new": true,
                "started": false,
                "dynamic": true,
                "commandIndex": 0,
                "eventId": event_id || 0,
                "linkedEvents": event_id ? [event_id] : []
            }
        );
    };

    Scene_Title.playTitleMusic = function () {
        AudioManager.playBgm($dataSystem.titleBgm);
    };

}.bind(OcRam.Audio_EX)());