(function() {

    let sId = 4;
    let secondHud = 5;
    let hudPistol = 7;
    let hudCrowbar = 6;

    Window_Base.prototype.drawGauge = function(x, y, width, height,rate, color1, color2) {
        var fillW = Math.floor(width * rate);
        var gaugeY = y + this.lineHeight() - 8;
        this.contents.fillRect(x, gaugeY, width, height, this.gaugeBackColor());
        this.contents.gradientFillRect(x, gaugeY, fillW, height, color1, color2);
    };

    Window_Base.prototype.drawActorHp = function(actor, x, y, width = 186, height = 6) {

        var color1 = "#c40000";
        var color2 = "#f82d2d";
        this.drawGauge(x, y, width, height, actor.hpRate(), color1, color2);

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
        };
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
            this.drawPicture("heart", 0, 0, false);
            this.drawPicture("bar1", 25, -8, false);
            this.drawActorHp($gameParty.leader(), 50, -9.5, 205, 16);

            if ($gameSwitches.value(secondHud)) {
                if ($gameSwitches.value(hudCrowbar)) {
                    this.drawPicture("crowbar", 300, 0, false, 100, 200);
                } else if ($gameSwitches.value(hudPistol)) {

                }

            }
            //this.opacity = 0;
        }else{this.close();}
    };




})();