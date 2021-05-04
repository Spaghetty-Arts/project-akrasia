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
        this._WindowsMsg = new Window_Black(200, 300, 450, 300);
        this.addChild(this._WindowsMsg);
        this._WindowsC = new Window_Cards(200, 100, 500, 400);
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

    let tP = 0;

    Scene_Black.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
        this._WindowsMsg.drawMsg(tP);
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
            tP = 1;
            this._betCommandWindow.activate();
        } else {
            let winV = $gameVariables.value(63) * 2;
            $gameVariables.setValue(66, winV);
            let cardV = Math.floor(Math.random() * 10) + 2;
            $gameVariables.setValue(64, cardV);
            card2 = true;
            tP = 2;
            this._betCommandWindow.close();
            this.createBet2Command();
        }
    };

    Scene_Black.prototype.refresh = function () {
        Scene_Base.prototype.refresh.call(this);
    }

    Scene_Black.prototype.cancelCommand = function () {

        AudioManager.stopBgm();
        this.popScene();
    };

    Scene_Black.prototype.createBet2Command = function () {
        this._bet2CommandWindow = new Window_Bet2Command(0, 550);
        this._bet2CommandWindow.setHandler('more', this.bet2Command.bind(this, 1));
        this._bet2CommandWindow.setHandler('less', this.bet2Command.bind(this, -1));
        this._bet2CommandWindow.setHandler('same', this.bet2Command.bind(this, 0));
        this.addChild(this._bet2CommandWindow);
    };

    Scene_Black.prototype.createExitCommand = function () {
        this._exit = new Window_Exit(0, 550);
        this._exit.setHandler('exit', this.cancelCommand.bind(this));
        this.addChild(this._exit);
    };

    Scene_Black.prototype.bet2Command = function (val) {
        card1 = false;
        let cardV = Math.floor(Math.random() * 10) + 2;
        let cardO = $gameVariables.value(64);
        $gameVariables.setValue(65, cardV);
        card3 = true;
        switch (val) {
            case -1:
                if (cardV < cardO) {
                    wonB();
                } else {
                    looseB();
                }
                break;
            case 0:
                if (cardV == cardO) {
                    wonB();
                } else {
                    looseB();
                }
                break;
            case 1:
                if (cardV > cardO) {
                    wonB();
                } else {
                    looseB();
                }
                break;
        }
        this._bet2CommandWindow.close();
        this.createExitCommand();
    };

    wonB = function () {
        let money = $gameVariables.value(26);
        $gameVariables.setValue(26, money + $gameVariables.value(63) * 2);
        tP = 3;
    }

    looseB = function () {
        let money = $gameVariables.value(26);
        $gameVariables.setValue(26, money - $gameVariables.value(63));
        tP = 4;
    }

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
                this.changeTextColor("#ffffff");

                this.drawText("Saiu " + getCard(64) +"!", 0, 0, "center");
                this.drawText("A próxima carta será maior, menor ou igual?", 0, 30, "center");
                break;
            case 3:
                this.changeTextColor("#ffffff");
                this.drawText("Saiu " + getCard(65) +"!", 0, 0, "center");
                this.changeTextColor("#32ff00");
                this.drawText("Parabéns! Ganhou", 0, 30, "center");
                break;
            case 4:
                this.changeTextColor("#ffffff");
                this.drawText("Saiu " + getCard(65) +"!", 0, 0, "center");
                this.changeTextColor("#ff0000");
                this.drawText("Perdeu! Boa sorte para a próxima", 0, 30, "center");
                break;
        }
    }

    getCard = function (val) {
        let card = $gameVariables.value(val);
        let cardN;
        switch (card) {
            case 8:
                cardN = "Dama";
                break;
            case 9:
                cardN = "Valete";
                break;
            case 10:
                cardN = "Rei";
                break;
            case 11:
                cardN = "Ás";
                break;
            default:
                cardN = card;
                break;
        }
        return cardN;
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
        this.contents.clear();
        this.setBackgroundType(2);
        if(card1) {
            this.drawPicture("cardB", 8, 20, false);
        }
        if (card2) {
            this.drawPicture("card_"+$gameVariables.value(64), 135, 20, false);
        }
        if (card3) {
            this.drawPicture("card_"+$gameVariables.value(65), 270, 20, false);
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


    function Window_Bet2Command() {
        this.initialize.apply(this, arguments);
    }

    Window_Bet2Command.prototype = Object.create(Window_HorzCommand.prototype);
    Window_Bet2Command.prototype.constructor = Window_Bet2Command;

    Window_Bet2Command.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    };

    Window_Bet2Command.prototype.makeCommandList = function () {
        this.addCommand("Maior", 'more');
        this.addCommand("Menor", 'less');
        this.addCommand("Igual", 'same');
    };

    Window_Bet2Command.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    }

    function Window_Exit() {
        this.initialize.apply(this, arguments);
    }

    Window_Exit.prototype = Object.create(Window_HorzCommand.prototype);
    Window_Exit.prototype.constructor = Window_Exit

    Window_Exit.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    };

    Window_Exit.prototype.makeCommandList = function () {
        this.addCommand("Sair", 'exit');
    };

    Window_Exit.prototype.windowWidth = function () {
        return Graphics.boxWidth /2;
    }

})();