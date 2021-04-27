(function () {
    /*
    Scene creation
     */
    Scene_Title.prototype.createCommandWindow = function () {
        this._commandWindow = new Window_TitleCommand();
        let list = ['New Game', 'Continue', 'multiplayer', 'Load', 'Options', 'Credits', 'Exit'];
        for (let i = 0; i < list.length; i++) {
            let cmd = list[i].toLowerCase();
            if (cmd.includes('new game')) {
                this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
            } else if (cmd.includes('continue')) {
                this._commandWindow.setHandler('TSRcontinue', this.commandTrueContinue.bind(this));
            } else if (cmd.includes('load')) {
                this._commandWindow.setHandler('continue', this.commandLoadGame.bind(this));
                this._commandWindow.setHandler('multiplayer', this.commandMulti.bind(this));
            } else if (cmd.includes('options')) {
                this._commandWindow.setHandler('options', this.commandOptions.bind(this));
            } else if (cmd.includes('credits')) {
                this._commandWindow.setHandler('credits', this.commandCredits.bind(this));
            } else if (cmd.includes('exit')) {
                this._commandWindow.setHandler('Exit', this.commandToQuit.bind(this));
            }
        }
        this.addWindow(this._commandWindow);
        this._activeWindow = this._commandWindow;
    };

    /*
    Create the multiplayer transistion
     */
    DataManager.setupMultiGame = function() {
        this.createGameObjects();
        this.selectSavefileForNewGame();
        $gameParty.setupStartingMembers();
        $gamePlayer.reserveTransfer(28, 9,  11);
        Graphics.frameCount = 0;
        //SceneManager.resetFrameCount();
    };

    /*
    Commands callbacks
     */
    Scene_Title.prototype.commandNewGame = function() {
        DataManager.setupNewGame();
        if (this._commandWindow) this._commandWindow.close();
        if (this.TitleTransitionEnable()) {
            if (this.TitleTransitionMusicFadeOut()) AudioManager.fadeOutBgm(1)
            if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;
            if (this._titleLabelSprite) this._titleLabelSprite.opacity = 0;
            if (this._backSprite3) this._backSprite3.opacity = 0;
        } else {
            this.fadeOutAll();
        }
        SceneManager.goto(Scene_Map);
    };

    Scene_Title.prototype.commandLoadGame = function() {
        if (this._commandWindow) this._commandWindow.close();
        SceneManager.push(Scene_Load);
    };

    Scene_Title.prototype.commandTrueContinue = function() {
        let LastSave = DataManager.latestSavefileId();
        if (DataManager.loadGame(LastSave)) {
            this.LoadSuccess();
        } else {
            this.LoadFailure();
        }
    };

    Scene_Title.prototype.commandMulti = function () {
        DataManager.setupMultiGame();
        if (this._commandWindow) this._commandWindow.close();
        if (this.TitleTransitionEnable()) {
            if (this.TitleTransitionMusicFadeOut()) AudioManager.fadeOutBgm(1)
            if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;
            if (this._titleLabelSprite) this._titleLabelSprite.opacity = 0;
            if (this._backSprite3) this._backSprite3.opacity = 0;
        } else {
            this.fadeOutAll();
        }
        SceneManager.goto(Scene_Map);
    };

    /*
    Windows title
     */
    Window_TitleCommand.prototype.makeCommandList = function () {
        let list = ['Continue', 'New Game', 'Load', 'multiplayer', 'Options', 'Credits', 'Exit'];
        for (let i = 0; i < list.length; i++) {
            let cmd = list[i].toLowerCase();
            if (cmd.includes('new game')) {
                this.addCommand(TextManager.newGame, 'newGame');
            } else if (cmd.includes('continue')) {
                if (this.EnableTrueContinue() && this.isContinueEnabled()) {
                    this.addCommand("Contine", 'TSRcontinue');
                }
            } else if (cmd.includes('load')) {
                this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
                this.addCommand('Multiplayer', 'multiplayer');
            } else if (cmd.includes('options')) {
                this.addCommand("Options", 'options');
            } else if (cmd.includes('credits')) {
                this.addCommand("Credits", 'credits');
            } else if (cmd.includes('exit')) {
                if (this.EnableExitCommand()) {
                    this.addCommand("Exit", 'Exit');
                }
            }
        }
    };
}());