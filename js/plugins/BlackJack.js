(function () {

    function Scene_Black() {
        this.initialize.apply(this, arguments);
    }

    Scene_Black.prototype = Object.create(Scene_Base.prototype);
    Scene_Black.prototype.constructor = Scene_Black;

    Scene_Black.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);

    }

    Scene_Black.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this._WindowsMsg = new Window_Black(200, 300, 350, 300);
        this.addChild(this._WindowsMsg);
        this._WindowsC = new Window_Cards(200, 100, 400, 200);
        this.addChild(this._WindowsC);
        this.createBetCommand();
    }

    Scene_Black.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        this._WindowsMsg.drawMsg(0);
        this._WindowsC.drawImg();
        $gameVariables.setValue(63, 0);
        $gameVariables.setValue(64, 0);
        $gameVariables.setValue(65, 0);
        $gameVariables.setValue(66, 0);
    }

    Scene_Black.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this._WindowsMsg.drawMsg(0);
        this._WindowsC.drawImg();
    }


    Scene_Black.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("PokerTable");
        this.addChild(this._backgroundSprite);
    };


    startBGame = function () {
        SceneManager.push(Scene_Black);
    }



    Scene_Black.prototype.createBetCommand = function () {
        this._betCommandWindow = new Window_BetCommand(0, 550);
        this._betCommandWindow.setHandler('5', this.betCommand.bind(this, 5));
        this._betCommandWindow.setHandler('10', this.betCommand.bind(this, 10));
        this._betCommandWindow.setHandler('20', this.betCommand.bind(this, 20));
        this._betCommandWindow.setHandler('50', this.betCommand.bind(this, 50));
        this._betCommandWindow.setHandler('100', this.betCommand.bind(this, 100));
        this._betCommandWindow.setHandler('no', this.cancelCommand.bind(this));
        this.addChild(this._betCommandWindow);
    };

    Scene_Black.prototype.betCommand = function (val) {
        $gameVariables.setValue(63, val);
        let money = checkMoney();
        if (!money) {

        } else {
            this._WindowsMsg(1);
        }
    };

    Scene_Black.prototype.cancelCommand = function () {

        AudioManager.stopBgm();
        this.popScene();
    };


    checkMoney = function () {
        if ($gameVariables.value(26) < $gameVariables.value(63)) {
            return false;
        } else {
            return true;
        }
    }
    /*
    Windows
     */

    function Window_Black() {
        this.initialize.apply(this, arguments);
    }

    Window_Black.prototype = Object.create(Window_Base.prototype);
    Window_Black.prototype.constructor = Window_Black;

    Window_Black.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    Window_Black.prototype.drawMsg = function (message, value = 0) {
        this.setBackgroundType(2);
        this.contents.clear();
        this.contents.fontSize = 20;
        var x = 33;
        let y = 0;
        switch (message) {
            case 0:
                this.changeTextColor("#ffffff");
                this.drawText("O jogo começou!", 0, 0, "center");
                this.drawText("Quanto dejesa apostar", 0, 30, "center");
                break;
            case 1:
                this.changeTextColor("#f10000");
                this.drawText("Não tem dinheiro que chegeu!", 0, 0, "center");
                break;
            case 2:
                this.changeTextColor("#f10000");
                y = 50;
                this.drawText("Perdeste!", x, y, "center");
                y = 70;
                this.drawText("Tenta de novo!", x, y, "center");
                break;
        }
    }


    function Window_Cards() {
        this.initialize.apply(this, arguments);
    }

    Window_Cards.prototype = Object.create(Window_Base.prototype);
    Window_Cards.prototype.constructor = Window_Cards;

    Window_Cards.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    let card1 = true;
    let card2 = false;
    let card3 = false;

    Window_Cards.prototype.drawImg = function () {
        if(card1) {
            this.drawPicture("win", 0, 0, false);
        }
        if (card2) {
            this.drawPicture("win", 0, 0, false);
        }
        if (card3) {
            this.drawPicture("win", 0, 0, false);
        }
    }
    /*
    Commands
     */

    function Window_BetCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_BetCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_BetCommand.prototype.constructor = Window_BetCommand;

    Window_BetCommand.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    };

    Window_BetCommand.prototype.makeCommandList = function () {
        this.addCommand("5$", '5');
        this.addCommand("10$", '10');
        this.addCommand("20$", '20');
        this.addCommand("50$", '50');
        this.addCommand("100$", '100');
        this.addCommand("Cancelar", 'no');
    };

    Window_BetCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    }


})();