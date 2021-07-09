(function() {

    let sId = 4;
    let secondHud = 5;
    let hudPistol = 34;
    let hudCrowbar = 35;
    let hudShotgun = 40;
    let hudAr = 82;
    let holster = 38;

    let thirdHud = 6;
    let hudTags = 84;


    Window_Base.prototype.drawGauge = function(x, y, width, height,rate, color1, color2, menuFix = false) {

        if (menuFix) {
            var fillW = Math.floor(width * rate);
            var gaugeY = y + this.lineHeight() - 8;
            this.contents.fillRect(x, gaugeY, width, height, this.gaugeBackColor());
            this.contents.gradientFillRect(x, gaugeY, fillW, height, color1, color2);
        }

    };

    Window_Base.prototype.drawActorHp = function(actor, x, y, width = 186, height = 6) {

        var color1 = "#c40000";
        var color2 = "#f82d2d";
        this.drawGauge(x, y, width, height, actor.hpRate(), color1, color2, true);
    };

    Window_Base.prototype.drawPicture = function(filename, x, y, custom, width = 0, height = 0) {
        var bitmap = ImageManager.loadPicture(filename);
        if (!custom) {
            width = bitmap._canvas.width;
            height = bitmap._canvas.height;
        }
        this.contents.blt(bitmap, 0, 0, width, height, x, y);
    };

    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._myWindow = new My_Window(0, 545, 816,80);
        if ($gameSwitches.value(sId)){
            this.addWindow(this._myWindow);}
    };

    var _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if ($gameSwitches.value(sId)){
            this.addWindow(this._myWindow);
        }
        this._myWindow.refresh();
    };



    function My_Window() {
        this.initialize.apply(this, arguments);
    }

    My_Window.prototype = Object.create(Window_Base.prototype);
    My_Window.prototype.constructor = My_Window;


    My_Window.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._value = -1;
        this.refresh();
    };

    My_Window.prototype.refresh = function(){
        this.contents.clear();
        if ($gameSwitches.value(sId)){
            this.open();
            //this.drawActorHp($gameParty.leader(), 30, 0, 200);
            if (!$gameSwitches.value(30)) {
                this.drawPicture("heart", 0, 0, false);


                if(typeof playerLife !== 'undefined') {
                    if (playerLife > 50) {
                        this.drawTextEx("\\c[11]"+playerLife, 60, 5);
                    } else if (playerLife <= 50 && playerLife > 15) {
                        this.drawTextEx("\\c[17]"+playerLife, 60, 5)
                    } else if (playerLife <= 15) {
                        this.drawTextEx("\\c[10]"+playerLife, 60, 5)
                    }

                } else {
                    this.drawPicture("bar1", 25, -8, false);
                    this.drawActorHp($gameParty.leader(), 50, -9.5, 205, 16);
                }

            }

            if ($gameSwitches.value(secondHud)) {
                if ($gameSwitches.value(hudCrowbar)) {
                    this.drawPicture("crowbar", 300, 0, false);
                } else if ($gameSwitches.value(hudPistol)) {
                    this.drawPicture("bulletPistol", 300, 0, false);
                    this.drawTextEx("\\c[17]"+$gameVariables.value(39) + "/" + $gameVariables.value(40), 340, 5);
                } else if($gameSwitches.value(hudShotgun)) {
                    this.drawPicture("shotgunShell", 300, 0, false);
                    this.drawTextEx("\\c[10]"+$gameVariables.value(39) + "/" + $gameVariables.value(40), 340, 5);
                } else if ($gameSwitches.value(hudAr)) {
                    this.drawPicture("arB", 300, 0, false);
                    this.drawTextEx("\\c[14]"+$gameVariables.value(39) + "/" + $gameVariables.value(40), 340, 5);
                } else if ($gameSwitches.value(holster)) {
                    this.drawPicture("hand", 300, -5, false);
                } else if ($gameSwitches.value(30)) {
                    this.drawPicture("money", 0, 0, false);
                    this.drawTextEx("\\c[11]"+$gameParty._gold, 40, 0);
                    if ($gameSwitches.value(29)) {
                        this.drawPicture("chips", 220, 0, false);
                        this.drawTextEx("\\c[10]"+$gameVariables.value(26), 260, 0);
                    }
                }

            }

            if ($gameSwitches.value(thirdHud)) {
                if ($gameSwitches.value(hudTags)) {
                    this.drawPicture("dogtag", 640, 0, false);
                    this.drawTextEx("\\c[22]"+$gameVariables.value(82), 680, 5);
                }
            }
            //this.opacity = 0;
        }else{this.close();}
    };




})();