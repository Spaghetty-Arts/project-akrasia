
(function () {

    let open = false;


    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._vrWindow = new Window_VRHud(0, 0, 200, 80);
    };

    let _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if(open) {
            this.addWindow(this._vrWindow);

        }
        this._vrWindow.refresh();
    };

    openVR = function () {
        open = true;
    }

    closeVr = function () {
        open = false;
    }



    function Window_VRHud() {
        this.initialize.apply(this, arguments);
    }

    Window_VRHud.prototype = Object.create(Window_Base.prototype);
    Window_VRHud.prototype.constructor = Window_VRHud;

    Window_VRHud.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    Window_VRHud.prototype.drawA = function () {
        this.drawPicture("dogtag", 0, 0, false);

        this.changeTextColor("#068bff");

        this.drawText($gameVariables.value(88), 100, 5);

    }


    Window_VRHud.prototype.refresh = function(){
        this.contents.clear();
        if (open){
            this.open();
            this.drawA();
        }
        else{this.close();}
    };
})();