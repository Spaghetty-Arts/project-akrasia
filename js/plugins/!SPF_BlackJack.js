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
        this._WindowsC = new Window_Cards(200, 90, 500, 400);
        this.addChild(this._WindowsC);
        this._WindowsChips = new Window_Cards(200, 390, 200, 200);
        this.addChild(this._WindowsChips);
        this.createBetCommand();
        this._WindowsMsgChips = new Window_Black(330, 40, 200, 100);
        this.addChild(this._WindowsMsgChips);
        this._apostaIn = 0;
        this._carta1V = 0;
        this._carta2V = 0;
        this._tP = 0;
        card1 = true;
        card2 = false;
        card3 = false;
    }

    Scene_Black.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        this._WindowsMsg.drawMsg(0, 0, 0);
        this._WindowsMsgChips.drawMsgC();

        this._WindowsC.drawImg();
        AudioManager.playBgm({"name": "03_Chasing_Fortune", "volume": 60, "pitch": 100, "pan": 0});
    }


    Scene_Black.prototype.update = function () {
        Scene_Base.prototype.update.call(this);

        this._WindowsMsg.drawMsg(this._tP, this._carta1V, this._carta2V, this._apostaIn *2);
        this._WindowsMsgChips.drawMsgC();

        this._WindowsC.drawImg(this._carta1V, this._carta2V);
        this._WindowsChips.drawChips(this._apostaIn);
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
        this._apostaIn = val;
        let money = checkMoney();
        if (!money) {
            this._tP = 1;
            this._betCommandWindow.activate();
            AudioManager.playSe({"name": "Cancel1", "volume": 100, "pitch": 100, "pan": 0});
        } else {
            let cardV = Math.floor(Math.random() * 10) + 2;
            AudioManager.playSe({"name": "chipsP", "volume": 100, "pitch": 100, "pan": 0});
            this._carta1V = cardV;
            AudioManager.playSe({"name": "card", "volume": 100, "pitch": 100, "pan": 0});
            card2 = true;
            this._tP = 2;
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
        let cardO = this._carta1V;
        this._carta2V = cardV;
        AudioManager.playSe({"name": "card", "volume": 100, "pitch": 100, "pan": 0});

        card3 = true;
        console.log(cardV);
        switch (val) {
            case -1:
                if (cardV < cardO) {
                    wonB(this._apostaIn * 2);
                    this._tP = 3;
                } else {
                    looseB(this._apostaIn);
                    this._tP = 4;
                }
                break;
            case 0:
                if (cardV == cardO) {
                    wonB(this._apostaIn * 2);
                    this._tP = 3;
                } else {
                    looseB(this._apostaIn);
                    this._tP = 4;
                }
                break;
            case 1:
                if (cardV > cardO) {
                    wonB(this._apostaIn * 2);
                    this._tP = 3;
                } else {
                    looseB(this._apostaIn);
                    this._tP = 4;
                }
                break;
        }
        this._bet2CommandWindow.close();
        this.createExitCommand();
    };

    wonB = function (value) {
        let money = $gameVariables.value(26);
        $gameVariables.setValue(26, money + value);
        AudioManager.playSe({"name": "WinB", "volume": 100, "pitch": 100, "pan": 0});
    }

    looseB = function (value) {
        let money = $gameVariables.value(26);
        $gameVariables.setValue(26, money - value);
        AudioManager.playSe({"name": "lostB", "volume": 100, "pitch": 100, "pan": 0});
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

    Window_Black.prototype.drawMsg = function (message, value1, value2, win) {
        this.setBackgroundType(2);
        this.contents.clear();
        this.contents.fontSize = 20;
        switch (message) {
            case 0:
                this.changeTextColor("#ffffff");
                this.drawText(" O jogo começou!", 0, 0, "center");
                this.drawText(" Quanto dejesa apostar?", 0, 30, "center");
                break;
            case 1:
                this.changeTextColor("#f10000");
                this.drawText(" Não tem dinheiro que chegeu!", 0, 0, "center");
                break;
            case 2:
                this.changeTextColor("#ffffff");

                this.drawText(" Saiu " + getCard(value1) +"!", 0, 0, "center");
                this.drawText(" A próxima carta será maior", 0, 30, "center");
                this.drawText(" menor ou igual?", 0, 50, "center");
                break;
            case 3:
                this.changeTextColor("#ffffff");
                this.drawText(" Saiu " + getCard(value2) +"!", 0, 0, "center");
                this.changeTextColor("#32ff00");
                this.drawText(" Parabéns! Ganhou " + win +" Chips!", 0, 30, "center");
                break;
            case 4:
                this.changeTextColor("#ffffff");
                this.drawText(" Saiu " + getCard(value2) +"!", 0, 0, "center");
                this.changeTextColor("#ff0000");
                this.drawText(" Perdeu! Boa sorte para a próxima", 0, 30, "center");
                break;
        }
    }

    Window_Black.prototype.drawMsgC = function () {
        this.setBackgroundType(2);
        this.contents.clear();
        this.contents.fontSize = 20;
        this.changeTextColor("#fde609");
        this.drawText("Chips " + $gameVariables.value(26), 0, 30, "center");
    }
    getCard = function (val) {
        let cardN;
        switch (val) {
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
                cardN = val;
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

    Window_Cards.prototype.drawImg = function (cartaV1, cartaV2, tCards) {
        this.contents.clear();
        this.setBackgroundType(2);
        if(card1) {
            this.drawPicture("cardB", 8, 20, false);
        }
        if (card2) {
            this.drawPicture("card_"+cartaV1, 135, 20, false);
        }
        if (card3) {
            this.drawPicture("card_"+cartaV2, 265, 20, false);
        }
    }

    Window_Cards.prototype.drawChips = function (chips) {
        this.setBackgroundType(2);
        this.contents.clear();
        if (chips > 0) {
            this.drawPicture("chip_"+chips, 0, 30, false);
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