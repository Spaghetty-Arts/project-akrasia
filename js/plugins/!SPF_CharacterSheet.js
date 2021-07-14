(function () {
    /*
    Scene
     */
    function Scene_Sheet() {
        this.initialize.apply(this, arguments);
    }

    Scene_Sheet.prototype = Object.create(Scene_Base.prototype);
    Scene_Sheet.prototype.constructor = Scene_Sheet;

    Scene_Sheet.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);

    }

    Scene_Sheet.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        AudioManager.playBgm({"name": "hacker", "volume": 70, "pitch": 100, "pan": 0});
        this.createBackground();
        this.createLobbyCommand();
        this._textWindow = new Window_Text(40, 50, 740, 500);
        this.addChild(this._textWindow);
    }

    Scene_Sheet.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this._textWindow.drawA();
    }

    Scene_Sheet.prototype.createLobbyCommand = function () {
        this._lobbyCommandWindow = new Window_SheetCommand(0, 550);
        this._lobbyCommandWindow.setHandler('exit', this.cancelCommand.bind(this));
        this.addChild(this._lobbyCommandWindow);
    };


    Scene_Sheet.prototype.cancelCommand = function () {
        AudioManager.stopBgm();
        this.popScene();
    };

    Scene_Sheet.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("characterScreen");
        this.addChild(this._backgroundSprite);
    };

    openSheet = function () {
        SceneManager.push(Scene_Sheet);
    }


    /*
   Window
    */

    function Window_SheetCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_SheetCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SheetCommand.prototype.constructor = Window_SheetCommand;

    Window_SheetCommand.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this.setBackgroundType(2);
    };

    Window_SheetCommand.prototype.makeCommandList = function () {
        this.addCommand("Sair", 'exit');
    };

    Window_SheetCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth / 2;
    }


    function Window_Text() {
        this.initialize.apply(this, arguments);
    }

    Window_Text.prototype = Object.create(Window_Base.prototype);
    Window_Text.prototype.constructor = Window_Text;

    Window_Text.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    };

    Window_Text.prototype.drawA = function () {
        this.setBackgroundType(2);
        this.contents.fontSize =20;
        this.drawText(playerName, 150, 45);
        this.drawText(playerALevel, 195, 120);
        this.drawText(playerMoney, 460, 120);
        this.drawText(playerWin, 260, 250);
        this.drawText(playerLose, 570, 250);

        switch (playerRank) {
            case 1:
                this.drawPicture("bronze", 150, 340, false);
                break;
            case 2:
                this.drawPicture("silver", 150, 340, false);
                break;
            case 3:
                this.drawPicture("gold", 150, 340, false);
                break;
        }
    }
})();