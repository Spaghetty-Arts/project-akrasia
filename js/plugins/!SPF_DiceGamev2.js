function Dice_Picture() {
    this.initialize.apply(this, arguments);
    this._durations = [];
    this._target_xs = [];
    this._target_ys = [];
    this._target_opacities = [];
}

(function () {

    //=============================================================================
    // Variable parameters
    //============================================================================
    var var_index_1 = 28;
    var var_index_2 = 29;
    var var_index_3 = 30;
    var var_index_4 = 31;
    var var_indices = [var_index_1, var_index_2, var_index_3, var_index_4];
    var picture_id_start = 2;

    //=============================================================================
    // Constant settings
    //=============================================================================
    const MAX_DICE_GROUP = 4;
    const MAX_DICE_NUM   = 5;
    const OFFSET_X = [0, 64, 32, 96, 64];
    const OFFSET_Y = [0, 0, 64, 64, 128];

    startDGame = function () {
        $gameSwitches.setValue(44, true);
        AudioManager.playBgm({"name": "DiceGame", "volume": 100, "pitch": 100, "pan": 0});
        $gameScreen.showPicture(1, "retro", 0, 0, 0, 100, 100, 255, 0);

    }

    startMGame = function () {
        AudioManager.playBgm({"name": "DiceGame", "volume": 100, "pitch": 100, "pan": 0});
        $gameScreen.showPicture(1, "diceG", 0, 0, 0, 100, 100, 255, 0);

    }

    endDGame = function () {
        $gameSwitches.setValue(44, false);
        $gamePlayer.reserveTransfer(20, $gamePlayer.x, $gamePlayer.y, 8, 2);
        $gameScreen.erasePicture(1);
        AudioManager.stopBgm();

    }

    endMGame = function () {

        $gameScreen.erasePicture(1);
        AudioManager.stopBgm();

    }



    showDice = function (x, y, z, w) {
        var x          = parseInt(x, 10) || 400;
        var y          = parseInt(y, 10) || 400;
        var dice_group = parseInt(z, 10) || 1;
        dice_group--;
        if(dice_group >= MAX_DICE_GROUP || dice_group < 0 )
        {
            console.log(dice_group);
            throw new Error;
        }
        var dice_num   = parseInt(w, 10).clamp(1, 400) || 1;
        if(dice_num > MAX_DICE_NUM || dice_num < 0 )
        {
            console.log(dice_num);
            throw new Error;
        }
        $gameScreen.showDice(x, y, dice_group, dice_num);
    }

    throwDice = function (x, y, z, w) {
        var dice_groups = [parseInt(x, 10),
            parseInt(y, 10),
            parseInt(z, 10),
            parseInt(w, 10)];

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
    }

    removeDice = function (x, y, z, w) {
        var dice_groups = [parseInt(x, 10),
            parseInt(y, 10),
            parseInt(z, 10),
            parseInt(w, 10)];
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
    }

    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._chipsWindow = new WindowDiceText(360, 160, 200, 100);
        this._textWindow = new WindowDiceText(260, 260, 300, 300);
        if ($gameSwitches.value(44)){
            this.addWindow(this._chipsWindow);
            this.addWindow(this._textWindow);
            this._chipsWindow.messageChips(getChips());
            this._textWindow.messageText($gameVariables.value(83));
        }
    };

    var _Scene_Map_update = Scene_Map.prototype.update;


    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);

        if ($gameSwitches.value(44)) {
            this.addWindow(this._chipsWindow);
            this.addWindow(this._textWindow);
            this._chipsWindow.messageChips(getChips());
            this._textWindow.messageText($gameVariables.value(83));
        }
    };

    function WindowDiceText() {
        this.initialize.apply(this, arguments);
    }


   WindowDiceText.prototype = Object.create(Window_Base.prototype);
    WindowDiceText.prototype.constructor = WindowDiceText;


    WindowDiceText.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    };

    WindowDiceText.prototype.messageChips = function (value) {
        this.setBackgroundType(2);
        this.contents.clear();
        this.contents.fontSize =20;
        this.changeTextColor("#fd5600");
        this.drawText(value + " Chips", 0, 0, "center");
    }

    WindowDiceText.prototype.messageText = function (msg, value = 0) {
        this.setBackgroundType(2);
        this.contents.clear();
        this.contents.fontSize =18;
        this.changeTextColor("#ffffff");
        switch (msg) {
            case 0:
                this.drawText("Bem vindo ao SlotPunk!", 0, 0, "center");
                this.drawText("Queres jogar?(10chips)", 0, 100, "center");
                break;
            case 1:
                this.drawText("Escolhe um valor(1-6)", 0, 0, "center");
                break;
            case 2:
                this.drawText("", 0, 0, "center");
                break;
            case 3:
                this.drawText("Saiu te " + $gameVariables.value(28)+"!", 0, 0, "center");
                break;
            case 4:
                this.changeTextColor("#52fa0e");
                this.drawText("Parabens! Ganhaste", 0, 100, "center");
                break;
            case 5:
                this.changeTextColor("#e90c0c");
                this.drawText("Ora bolas! Tenta de novo", 0, 100, "center");
                break;
            case 6:
                this.changeTextColor("#e90c0c");
                this.drawText("Não tens chips suficientes", 0, 100, "center");
                break;
        }
    }


    /*
    Dice
     */

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

    getChips = function () {
        return $gameVariables.value(26);
    }
})();