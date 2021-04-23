(function() {

    var _SceneMenu_createStatusWindow = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _SceneMenu_createStatusWindow.call(this);
        this._statusWindow.visible = false;
        this._goldWindow.visible = false;
    };

    var _SceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _SceneMenu_createCommandWindow.call(this);
        this._commandWindow.x = eval("Graphics.boxWidth/2 - this._commandWindow.width/2");
        this._commandWindow.y = eval("Graphics.boxHeight/2 - this._commandWindow.height/2");
    };

    Window_Command.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem('WindowMenu');
    }

    Window_SavefileList.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem('WindowMenu');
    }

})();