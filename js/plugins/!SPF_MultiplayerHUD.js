(function () {

    let open = false;

    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._muhWindow = new Window_MultiHud(0, 0, 350, 80);
    };

    let _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if(open) {
            this.addWindow(this._muhWindow);
        }
        this._muhWindow.refresh(0);
    };

    openMU = function () {
        open = true;
    }

    closeMU = function () {
        open = false;
    }

    function Window_MultiHud() {
        this.initialize.apply(this, arguments);
    }

    Window_MultiHud.prototype = Object.create(Window_Base.prototype);
    Window_MultiHud.prototype.constructor = Window_MultiHud;

    Window_MultiHud.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    Window_MultiHud.prototype.drawA = function (user) {
        this.contents.fontSize = 20;
        this.changeTextColor("#08e500");
        this.drawPicture("heart", 0, -5, false);
        this.drawText("Inimigo - ", 50, 5);

        this.changeTextColor("#e50000");

        this.drawText(enemieHealth, 200, 5);
    }


    Window_MultiHud.prototype.refresh = function(user){
        this.contents.clear();
        if (open){
            this.open();
            this.drawA(user);
        }
        else{this.close();}
    };
})();