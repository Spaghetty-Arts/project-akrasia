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

    Scene_Boot.loadSystemImages = function() {
        ImageManager.reserveSystem('IconSet');
        ImageManager.reserveSystem('Balloon');
        ImageManager.reserveSystem('Shadow1');
        ImageManager.reserveSystem('Shadow2');
        ImageManager.reserveSystem('Damage');
        ImageManager.reserveSystem('States');
        ImageManager.reserveSystem('Weapons1');
        ImageManager.reserveSystem('Weapons2');
        ImageManager.reserveSystem('Weapons3');
        ImageManager.reserveSystem('ButtonSet');
        ImageManager.reserveSystem('WindowMenu');
    };
    Window_Command.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem('WindowMenu');
    }

    Window_SavefileList.prototype.loadWindowskin = function () {
        this.windowskin = ImageManager.loadSystem('WindowMenu');
    }

    /*
    Background
     */

    Scene_Menu.prototype.createBackground = function(){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
            this.addChild(this._backgroundSprite);
            return;
    };

    Scene_Options.prototype.createBackground = function(){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
            this.addChild(this._backgroundSprite);
            return;
    };


    Scene_Base.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
        this.addChild(this._backgroundSprite);
        return;
    };


    /*
    Music
     */

    var musicList = {
        Scene_Menu: "menuOst",
    };

    var _Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
        _Scene_Base_initialize.call(this);
        for (var key in musicList) {
            if (musicList.hasOwnProperty(key)) {
                if (this.constructor === eval(key))
                {
                    this._musicListKey = key;
                    var bgm = {
                        name: musicList[this._musicListKey],
                        pan: 0,
                        pitch: 100,
                        volume: 100
                    };
                    if (!AudioManager.isCurrentBgm(bgm)) {

                        AudioManager.saveMenuBgm(key, AudioManager.saveBgm());
                        AudioManager.playBgm(bgm);
                    }
                    break;
                }
            }
        }
    };

    var _Scene_Base_popScene = Scene_Base.prototype.popScene;
    Scene_Base.prototype.popScene = function() {

        if (this._musicListKey)
        {
            AudioManager.replayMenuBgmBgs(this._musicListKey);
        }
        _Scene_Base_popScene.call(this);
    };

    AudioManager.saveMenuBgm = function(key, bgm) {
        if (!this._savedMenuBgm) this._savedMenuBgm = {};
        this._savedMenuBgm[key] = bgm;
    };

    AudioManager.replayMenuBgmBgs = function(key) {
        if (!this._savedMenuBgm) this._savedMenuBgm = {};

        else AudioManager.stopBgm();
    };
})();