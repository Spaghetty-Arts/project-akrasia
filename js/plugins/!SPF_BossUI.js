(function () {

    let open = false;


    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._bossWindow = new Window_BossHud(618, 0, 200, 80);
    };

    let _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if(open) {
            this.addWindow(this._bossWindow);

        }
        this._bossWindow.refresh();
    };

    openBoss = function () {
        open = true;
    }

    closeBoss = function () {
        open = false;
    }



    function Window_BossHud() {
        this.initialize.apply(this, arguments);
    }

    Window_BossHud.prototype = Object.create(Window_Base.prototype);
    Window_BossHud.prototype.constructor = Window_BossHud;

    Window_BossHud.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    Window_BossHud.prototype.drawA = function () {
        this.drawPicture("skull", 0, 0, false);

        let bossH = $gameVariables.value(89);
        if (bossH > 100) {
            this.changeTextColor("#00ff17");
        } else if (bossH <= 100 && bossH > 50) {
            this.changeTextColor("#faf605");
        } else {
            this.changeTextColor("#ff0000");
        }


        this.drawText(bossH, 100, 5);

    }


    Window_BossHud.prototype.refresh = function(){
        this.contents.clear();
        if (open){
            this.open();
            this.drawA();
        }
        else{this.close();}
    };
})();