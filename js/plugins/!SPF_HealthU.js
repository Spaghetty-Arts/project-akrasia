(function () {
    let open = false;


    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._huWindow = new Window_HUHud(500, 0, 320, 80);
    };

    let _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if(open) {
            this.addWindow(this._huWindow);

        }
        this._huWindow.refresh();
    };

    openHU = function () {
        open = true;
    }

    closeHU = function () {
        open = false;
    }



    function Window_HUHud() {
        this.initialize.apply(this, arguments);
    }

    Window_HUHud.prototype = Object.create(Window_Base.prototype);
    Window_HUHud.prototype.constructor = Window_HUHud;

    Window_HUHud.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    Window_HUHud.prototype.drawA = function () {
        switch ($gameVariables.value(90)) {
            case 0:
                this.drawPicture("healthU0", 0, 0, false);
                break;
            case 1:
                this.drawPicture("healthU1", 0, 0, false);
                break;
            case 2:
                this.drawPicture("healthU2", 0, -5, false);
                break;
            case 3:
                this.drawPicture("healthU3", 0, 0, false);
                break;
            case 4:
                this.drawPicture("healthU4", 0, 0, false);
                break;
        }


    }


    Window_HUHud.prototype.refresh = function(){
        this.contents.clear();
        if (open){
            this.open();
            this.drawA();
        }
        else{this.close();}
    };
})();