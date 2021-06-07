(function () {

    let open = false;

    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._ucWindow = new Window_MultiL(0, 0, 250, 80);
        this._uLWindow = new Window_MultiL(568, 0, 250, 80);
    };

    let _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if(open) {
            this.addWindow(this._ucWindow);
            this.addWindow(this._uLWindow);
        }
        this._ucWindow.refresh(1);
        this._uLWindow.refresh(2);
    };

    openU = function () {
        open = true;
    }

    closeU = function () {
        open = false;
    }

    function Window_MultiL() {
        this.initialize.apply(this, arguments);
    }

    Window_MultiL.prototype = Object.create(Window_Base.prototype);
    Window_MultiL.prototype.constructor = Window_MultiL;

    Window_MultiL.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    Window_MultiL.prototype.drawA = function (wind) {
        //this.contents.fontSize =20;
        if (wind == 1) {
            this.drawPicture("crypto", 0, 0, false);
            this.drawText(playerMoney, 50, 0);
        } else if (wind == 2) {
            this.drawPicture("armor", 0, 0, false);
            this.drawText(playerALevel, 60, 0);
        }
    }


    Window_MultiL.prototype.refresh = function(val){
        this.contents.clear();
        if (open){
            this.open();
            this.drawA(val);
        }
        else{this.close();}
    };
})();