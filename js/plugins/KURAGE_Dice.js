//=============================================================================
// KURAGE_Dice.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 KURAGE
// Released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/08/03 Initial release
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/kurageya0307
//=============================================================================

/*:
 * @plugindesc Dice plugin
 * @author Y.KURAGE
 *
 * @param PicStart#
 * @desc Uses 120 pictures from picture # specified in parameter. Default: picture # 1-120.	
 * @default 1
 *
 * @param DiceVar1
 * @desc Specifies variable number for the result of rolling the dice group 1.
 * @default 1
 *
 * @param DiceVar2
 * @desc Specifies variable number for the result of rolling the dice group 2.
 * @default 2
 *
 * @param DiceVar3
 * @desc Specifies variable number for the result of rolling the dice group 3.
 * @default 3
 *
 * @param DiceVar4
 * @desc Specifies variable number for the result of rolling the dice group 4.
 * @default 4
 *
 * @help Roll the dice plugin
 * Show the dice from plugin command "showDice".
 * Then you roll the dice from plugin command "throwDice".
 * Dice result will be based on the variable you set in plugin parameter.
 *
 * Plugin commands:
 * ・"showDice X Y DiceVar# #ofDice"
 * 　Show the dice at coordinates specified by X Y.
 *　　Dice variable # is through 1 to 4.
 *　　Dices are independent compare to player and enemy by dice rolling.
 *　　Ex: showDice 300 600 1 2
 *
 * ・"throwDice DiceVar#"
 *　　 Roll dice for specified dice group number.
 *　　 If you ignore dice group number, dice roll goes to all dice groups.
 *
 * ・"removeDice DiceVar#"
 *　　 Removes dice from specified dice group number.
 *　　 If you ignore dice group number, all dices of dice group are deleted.
 *
 * License:
 * This plugin is licensed under the MIT License.
 *　You're free to modify and use it (non-commercial, commercial, R-18, etc.)
 */

function Dice_Picture() {
    this.initialize.apply(this, arguments);
    this._durations = [];
    this._target_xs = [];
    this._target_ys = [];
    this._target_opacities = [];
}

(function() {
    'use strict';

    //=============================================================================
    // Variable parameters
    //=============================================================================
    var parameters = PluginManager.parameters('KURAGE_Dice');
    var var_index_1 = Number(parameters['DiceVar1'] || 1);
    var var_index_2 = Number(parameters['DiceVar2'] || 2);
    var var_index_3 = Number(parameters['DiceVar3'] || 3);
    var var_index_4 = Number(parameters['DiceVar4'] || 4);
    var var_indices = [var_index_1, var_index_2, var_index_3, var_index_4];
    var picture_id_start = Number(parameters['PicStart#'] || 1);

    //=============================================================================
    // Constant settings
    //=============================================================================
    const MAX_DICE_GROUP = 4;
    const MAX_DICE_NUM   = 5;
    const OFFSET_X = [0, 64, 32, 96, 64];
    const OFFSET_Y = [0, 0, 64, 64, 128];
    //=============================================================================
    //  Plugin commands in effect
    //=============================================================================

    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        switch(command) {
            case 'showDice':
                var x          = parseInt(args[0], 10) || 400;
                var y          = parseInt(args[1], 10) || 400;
                var dice_group = parseInt(args[2], 10) || 1;
                dice_group--;
                if(dice_group >= MAX_DICE_GROUP || dice_group < 0 )
                {
                    console.log(dice_group);
                    throw new Error;
                }
                var dice_num   = parseInt(args[3], 10).clamp(1, 400) || 1;
                if(dice_num > MAX_DICE_NUM || dice_num < 0 )
                {
                    console.log(dice_num);
                    throw new Error;
                }
                $gameScreen.showDice(x, y, dice_group, dice_num);
                break;
            case 'throwDice':
                var dice_groups = [parseInt(args[0], 10),
                                   parseInt(args[1], 10),
                                   parseInt(args[2], 10),
                                   parseInt(args[3], 10)];
                if( !dice_groups[0] )
                {
                    for(var k=0; k<MAX_DICE_GROUP; k++) {
                        dice_group = k;
                        $gameScreen.throwDice(dice_group);
                    }
                } else {
                    for(var k=0; k<MAX_DICE_GROUP; k++) {
                        if( !dice_groups[k] )
                            break;
                        dice_group = dice_groups[k] - 1;
                        if(dice_group >= MAX_DICE_GROUP || dice_group < 0 )
                        {
                            console.log(dice_group);
                            throw new Error;
                        }
                        $gameScreen.throwDice(dice_group);
                    }
                }
                break;
            case 'removeDice':
                var dice_groups = [parseInt(args[0], 10),
                                   parseInt(args[1], 10),
                                   parseInt(args[2], 10),
                                   parseInt(args[3], 10)];
                if( !dice_groups[0] )
                {
                    for(var k=0; k<MAX_DICE_GROUP; k++) {
                        dice_group = k;
                        $gameScreen.removeDice(dice_group);
                    }
                } else {
                    for(var k=0; k<MAX_DICE_GROUP; k++) {
                        if( !dice_groups[k] )
                            break;
                        dice_group = dice_groups[k] - 1;
                        if(dice_group >= MAX_DICE_GROUP || dice_group < 0 )
                        {
                            console.log(dice_group);
                            throw new Error;
                        }
                        $gameScreen.removeDice(dice_group);
                    }
                }
                break;
        }
    };

    
    Dice_Picture.prototype = Object.create(Game_Picture.prototype);
    Dice_Picture.prototype.constructor = Dice_Picture;
    Dice_Picture.prototype.setMoves = function(array) {
        this._durations = [];
        this._target_xs = [];
        this._target_ys = [];
        this._target_opacities = [];
        for(var i=0; i<array.length; i++) {
            this._durations.push(array[i]._duration);
            this._target_xs.push(array[i]._target_x);
            this._target_ys.push(array[i]._target_y);
            this._target_opacities.push(array[i]._target_opacity);
        }
        this._move_index = 0;
            
    }
    
    var _Game_Picture_updateMove = Game_Picture.prototype.updateMove;
    Dice_Picture.prototype.updateMove = function() {
        if ( this._durations.length > 0 && this._durations[this._move_index] > 0) {
            var d = this._durations[this._move_index];
            this._x = (this._x * (d - 1) + this._target_xs[this._move_index]) / d;
            this._y = (this._y * (d - 1) + this._target_ys[this._move_index]) / d;
            this._scaleX  = (this._scaleX  * (d - 1) + this._targetScaleX)  / d;
            this._scaleY  = (this._scaleY  * (d - 1) + this._targetScaleY)  / d;
            this._opacity = (this._opacity * (d - 1) + this._target_opacities[this._move_index]) / d;
            this._durations[this._move_index]--;
            if(this._durations[this._move_index] <= 0) {
                this._durations.shift();
                this._target_xs.shift();
                this._target_ys.shift();
                this._target_opacities.shift();
            }
    
        }
        else {
            _Game_Picture_updateMove.call(this);
        }
    };
    
    var _Game_Screen_initialize = Game_Screen.prototype.initialize;
    Game_Screen.prototype.initialize = function() {
        _Game_Screen_initialize.call(this);
        this._dice_picture_3d_array = [];
        this._dice_indices = [];
        this._dice_throwings = [];
        for(var i=0; i<MAX_DICE_GROUP; i++) {
            this._dice_picture_3d_array[i] = [];
            this._dice_indices[i] = [];
            this._dice_throwings[i] = [];
        }
    };

    Game_Screen.prototype.showDice = function(x, y, dice_group, dice_num) {
        for(var j=0; j<MAX_DICE_NUM; j++) {
            this._dice_picture_3d_array[dice_group][j] = [];
        }
        for(var j=0; j<dice_num; j++) {
            for(var i=0; i<6; i++) {
                var realPictureId = this.realPictureId(picture_id_start + i + j*6 + dice_group*6*MAX_DICE_NUM);
                var name = "dice_" + String(i+1);
                this._dice_picture_3d_array[dice_group][j][i] = new Dice_Picture();
                this._dice_picture_3d_array[dice_group][j][i].show(name, 0, x + OFFSET_X[j], y + OFFSET_Y[j], 100, 100, 255, 0);
                this._pictures[realPictureId] = this._dice_picture_3d_array[dice_group][j][i];
            }
            this._dice_indices[dice_group][j]   = 0;
            this._dice_throwings[dice_group][j] = false;
        }
    };
    
    Array.prototype.shuffle = function() {
          return this.map(function(a){return [a, Math.random()]})
                     .sort(function(a, b){return a[1] - b[1]})
                     .map(function(a){return a[0]});
    }
    Game_Screen.prototype.throwDice = function(dice_group) {
        var final_value    = 0;
        if ( this._dice_picture_3d_array[dice_group].length > 0 ) {
            for(var j=0; j<MAX_DICE_NUM; j++) {
                if ( this._dice_picture_3d_array[dice_group][j].length <= 0 )
                    break;
                var shuffle_val = [1, 2, 3, 4, 5, 6].shuffle();
                var throwing_val_1 = shuffle_val[1];
                var throwing_val_2 = shuffle_val[2];
                var throwing_val_3 = shuffle_val[3];
                var throwing_val_4 = shuffle_val[0];
                this._dice_throwings[dice_group][j] = true;
                final_value += throwing_val_4;
                for(var i=0; i<6; i++) {
                    var tmp = [];
                    var x = this._dice_picture_3d_array[dice_group][j][i].x();
                    var y = this._dice_picture_3d_array[dice_group][j][i].y();
                    if( (i+1)==throwing_val_1 ) { 
                        tmp.push({_duration:1, _target_x:x, _target_y:y, _target_opacity:255});
                        tmp.push({_duration:6, _target_x:x-20, _target_y:y-150, _target_opacity:255});
                        tmp.push({_duration:8, _target_x:x-40, _target_y:y-180, _target_opacity:255});
                    } else {
                        tmp.push({_duration:1, _target_x:x, _target_y:y, _target_opacity:0});
                        tmp.push({_duration:6, _target_x:x-20, _target_y:y-150, _target_opacity:0});
                        tmp.push({_duration:8, _target_x:x-40, _target_y:y-180, _target_opacity:0});
                    }
                    if( (i+1)==throwing_val_2 ) { 
                        tmp.push({_duration:1, _target_x:x-40, _target_y:y-180, _target_opacity:255});
                        tmp.push({_duration:10, _target_x:x-60, _target_y:y-150, _target_opacity:255});
                        tmp.push({_duration:10, _target_x:x-80, _target_y:y-80, _target_opacity:255});
                    } else {
                        tmp.push({_duration:1, _target_x:x-40, _target_y:y-180, _target_opacity:0});
                        tmp.push({_duration:10, _target_x:x-60, _target_y:y-150, _target_opacity:0});
                        tmp.push({_duration:10, _target_x:x-80, _target_y:y-80, _target_opacity:0});
                    }
                    if( (i+1)==throwing_val_3 ) { 
                        tmp.push({_duration:1, _target_x:x-80, _target_y:y-80, _target_opacity:255});
                        tmp.push({_duration:8, _target_x:x-100, _target_y:y-140, _target_opacity:255});
                        tmp.push({_duration:8, _target_x:x-110, _target_y:y-160, _target_opacity:255});
                    } else {
                        tmp.push({_duration:1, _target_x:x-80, _target_y:y-80, _target_opacity:0});
                        tmp.push({_duration:8, _target_x:x-100, _target_y:y-140, _target_opacity:0});
                        tmp.push({_duration:8, _target_x:x-110, _target_y:y-160, _target_opacity:0});
                    }
                    if( (i+1)==throwing_val_4 ) { 
                        tmp.push({_duration:1, _target_x:x-110, _target_y:y-160, _target_opacity:255});
                        tmp.push({_duration:8, _target_x:x-120, _target_y:y-140, _target_opacity:255});
                    } else {
                        tmp.push({_duration:1, _target_x:x-110, _target_y:y-160, _target_opacity:0});
                        tmp.push({_duration:8, _target_x:x-120, _target_y:y-140, _target_opacity:0});
                    }
        
                    this._dice_picture_3d_array[dice_group][j][i].setMoves(tmp);
                }
            }
        }
        $gameVariables.setValue(var_indices[dice_group], final_value);
    };
    
    Game_Screen.prototype.removeDice = function(dice_group) {
        if ( this._dice_picture_3d_array[dice_group].length > 0 ) {
            for(var j=0; j<MAX_DICE_NUM; j++) {
                if ( this._dice_picture_3d_array[dice_group][j].length <= 0 )
                    break;
                for(var i=0; i<6; i++) {
                    this.erasePicture(picture_id_start + i + j*6 + dice_group*6*MAX_DICE_NUM);
                }
            }
        }
    };
    
    var _Game_Screen_updatePictures = Game_Screen.prototype.updatePictures;
    Game_Screen.prototype.updatePictures = function() {
        if(this._dice_picture_3d_array) {
            for(var k=0; k<MAX_DICE_GROUP; k++) {
                for(var j=0; j<MAX_DICE_NUM; j++) {
                    if( this._dice_picture_3d_array[k][j] && this._dice_picture_3d_array[k][j].length  > 0 && !this._dice_throwings[k][j]) {
                        var i = this._dice_indices[k][j];
                        var x = this._dice_picture_3d_array[k][j][i].x();
                        var y = this._dice_picture_3d_array[k][j][i].y();
                        this._dice_picture_3d_array[k][j][i].move(0, x, y, 100, 100, 0, 0, 1);
                        this._dice_indices[k][j] += 1;
                        if(this._dice_indices[k][j] >= 6){
                            this._dice_indices[k][j] = 0;
                        }
                        i = this._dice_indices[k][j];
                        this._dice_picture_3d_array[k][j][i].move(0, x, y, 100, 100, 255, 0, 1);
                    }
                }
            }
        }
        _Game_Screen_updatePictures.call(this);
      
    };

})();

