/*:
 * @plugindesc Dynamically plays sound effects, while text messages are printed.
 * <Iavra Text Sound>
 * @author Iavra
 *
 * @param Enable Text Sounds
 * @desc Controls, if text sounds should be played at all. Default: true
 * @default true
 *
 * @param Sound Name
 * @desc Sound effect to be played, when text is displayed. Can be changed for each text individually.
 * @default Cursor1
 *
 * @param Sound Pan
 * @desc Value to be used as sound pan. Default: 0
 * @default 0
 *
 * @param Sound Pitch
 * @desc Value to be used as sound pitch. Default: 100
 * @default 100
 *
 * @param Sound Volume
 * @desc Volume of the played sound. Default: 100
 * @default 100
 *
 * @param Interval
 * @desc How often the sound effect should be played. Only specify a value of 1 or higher. Default: 1
 * @default 1
 *
 * @param Limit
 * @desc Only process the first X characters. A value less than 0 removes the limitation. Default: -1
 * @default -1
 *
 * @help
 * Plays sound effects when messages are displayed. The sound effect can be configured in the following ways:
 * 
 * sound    The name of the sound effect to be played (must match with a file in audio/se).
 * pan      Pan of the sound effect.
 * pitch    Pitch of the sound effect.
 * volume   Volume of the sound effect.
 * interval How often the sound effect should be played. "1" means every character.
 * limit    Only play sound effects for the first X characters. A value less than 0 removes the limitation.
 *
 * All options can be specified via plugin parameters or changed during the game by executing the following
 * script call.
 *
 * IAVRA.TEXTSOUND.setOptions(options);
 *
 * "options" is an object containing one or more of the options specified above and the new value to be set.
 * If you want to reset all options the their default values, you can do so by executing the following script:
 *
 * IAVRA.TEXTSOUND.resetOptions();
 *
 * If you want to (temporarily) enable or disable text sounds, you can do so by calling one of the following:
 *
 * IAVRA.TEXTSOUND.enable();
 * IAVRA.TEXTSOUND.disable();
 *
 * If you prefer plugin commands over script calls, you can use one of the following ones:
 *
 * TextSound set <option> <value>
 * TextSound reset
 * TextSound enable
 * TextSound disable
 *
 * For the "set" command, you need to specify one of the options specified above and the new value to be used.
 * If you want to set multiple options at the same time, you'll still need to use the script call, instead.
 */

var Imported = Imported || {};
Imported.iavra_text_sound = true;

//=============================================================================
// namespace IAVRA
//=============================================================================

var IAVRA = IAVRA || {};

(function() {
    "use strict";
    
    /**
     * Since PluginManager.parameters() breaks when the plugin file is renamed, we are using our own solution.
     */
    var _params = (function($) {
        return {
            enabled: $['Enable Text Sounds'].toLowerCase() === 'true', 
            sound: $['Sound Name'],
            pan: parseInt($['Sound Pan']) || 0,
            pitch: parseInt($['Sound Pitch']) || 0,
            volume: parseInt($['Sound Volume']) || 0, 
            interval: parseInt($['Interval']) || 1,
            limit: parseInt($['Limit']) || 0
        };
    })($plugins.filter(function(p) { return p.description.contains('<Iavra Text Sound>'); })[0].parameters);
    
    /**
     * The current options to be used when displaying a message. Can be changed at any time via script/plugin
     * commands or reset to their default values.
     */
    var _options = {};
    
    /**
     * Can be used to disable text sounds entirely.
     */
    var _enabled = _params.enabled;
    
    //=============================================================================
    // module IAVRA.TEXTSOUND
    //=============================================================================
    
    IAVRA.TEXTSOUND = {
        
        /**
         * Sets one or more options for sound effects.
         */
        setOptions: function(options) {
            console.log(options);
            options || (options = {});
            for(var key in _options) { (options[key] === undefined) || (_options[key] = options[key]); }
        },
        
        /**
         * Resets all options to their default values.
         */
        resetOptions: function() {
            _options = ['sound', 'pan', 'pitch', 'volume', 'interval', 'limit'].reduce(function(map, key) {
                map[key] = _params[key]; return map;
            }, {});
        },
        
        /**
         * Enables sound effects.
         */
        enable: function() { _enabled = true; },
        
        /**
         * Disables sound effects.
         */
        disable: function() { _enabled = false; }
        
    };
    
    /**
     * Initialize all options to their default values.
     */
    IAVRA.TEXTSOUND.resetOptions();
    
    //=============================================================================
    // class Window_Message
    //=============================================================================
    
    (function($) {
        
        /**
         * When starting a new page, we reset the character counter and set all options accordingly.
         */
        var _alias_newPage = $.prototype.newPage;
        $.prototype.newPage = function(textState) {
            _alias_newPage.apply(this, arguments);
            this._iavra_text_sound = {
                sound: {name: _options.sound, pan: _options.pan, pitch: _options.pitch, volume: _options.volume },
                interval: _options.interval, limit: _options.limit, counter: 0
            };
        };
        
        /**
         * When printing a normal character, sound effects are enabled and the configured limit and interval both
         * pass, we play our sound effect.
         */
        var _alias_processNormalCharacter = $.prototype.processNormalCharacter;
        $.prototype.processNormalCharacter = function(textState) {
            _alias_processNormalCharacter.apply(this, arguments);
            if(!_enabled) { return; }
            var counter = this._iavra_text_sound.counter++;
            var limit = this._iavra_text_sound.limit;
            var interval = this._iavra_text_sound.interval;
            if((limit < 0 || counter < limit) && (counter % interval) == 0) {
                AudioManager.playStaticSe(this._iavra_text_sound.sound);
            }
        };
        
    })(Window_Message);
    
    //=============================================================================
    // class Game_Interpreter
    //=============================================================================
    
    (function($) {
        
        /**
         * Calls setOptions() according to the given arguments.
         */
        var setOption = function(option, value) {
            var _options = {}, _option;
            switch(_option = option.toLowerCase()) {
                case 'sound':
                    _options[_option] = value || ''; break;
                case 'pan': case 'pitch': case 'volume':case 'interval': case 'limit':
                    _options[_option] = parseInt(value) || 0; break;
            }
            IAVRA.TEXTSOUND.setOptions(_options);
        };
        
        /**
         * We provide multiple plugin commands:
         * TextSound set <option> <value>   Set a single option for future messages.
         * TextSound reset                  Reset all options to their default values.
         * TextSound enable                 Enable text sounds.
         * TextSound diable                 Disable text sounds.
         */
        var _alias_pluginCommand = $.prototype.pluginCommand;
        $.prototype.pluginCommand = function(command, args) {
            _alias_pluginCommand.apply(this, arguments);
            if(command === 'TextSound') {
                console.log(args);
                switch(args.shift().toLowerCase()) {
                    case 'set': setOption(args[0], args[1]); break;
                    case 'reset': IAVRA.TEXTSOUND.resetOptions(); break;
                    case 'enable': IAVRA.TEXTSOUND.enable(); break;
                    case 'disable': IAVRA.TEXTSOUND.disable(); break;
                }
            }
        }
        
    })(Game_Interpreter);
    
})();