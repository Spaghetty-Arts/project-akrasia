(function () {

    /*
    Scene
     */
    function Scene_Lobby() {
        this.initialize.apply(this, arguments);
    }

    Scene_Lobby.prototype = Object.create(Scene_Base.prototype);
    Scene_Lobby.prototype.constructor = Scene_Lobby;

    Scene_Lobby.prototype.initialize = function () {
        Scene_Base.prototype.initialize.call(this);

    }

    Scene_Lobby.prototype.create = function () {
        Scene_Base.prototype.create.call(this);
        AudioManager.playBgm({"name": "multiplayer", "volume": 60, "pitch": 100, "pan": 0});
        this.createBackground();
        this.createLobbyCommand();
    }

    Scene_Lobby.prototype.update = function () {
        Scene_Base.prototype.update.call(this);
    }

    Scene_Lobby.prototype.createLobbyCommand = function () {
        this._lobbyCommandWindow = new Window_LobbyCommand(0, 550);
        this._lobbyCommandWindow.setHandler('login', this.lobbyCommand.bind(this, 1));
        this._lobbyCommandWindow.setHandler('register', this.lobbyCommand.bind(this, 0));
        this._lobbyCommandWindow.setHandler('reset', this.lobbyCommand.bind(this, 2));
        this._lobbyCommandWindow.setHandler('exit', this.cancelCommand.bind(this));
        this.addChild(this._lobbyCommandWindow);
    };

    Scene_Lobby.prototype.lobbyCommand = function (val) {
        openForm(val);
    };

    Scene_Lobby.prototype.cancelCommand = function () {
        AudioManager.stopBgm();
        this.popScene();
    };


    Scene_Lobby.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("computerM");
        this.addChild(this._backgroundSprite);
    };

    enterLobby = function () {
        SceneManager.push(Scene_Lobby);
    }
    /*
    Window
     */

    function Window_LobbyCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_LobbyCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_LobbyCommand.prototype.constructor = Window_LobbyCommand;

    Window_LobbyCommand.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    };

    Window_LobbyCommand.prototype.makeCommandList = function () {
        this.addCommand("Entrar", 'login');
        this.addCommand("Registar", 'register');
        this.addCommand("Reset Password", 'reset');
        this.addCommand("Sair", 'exit');
    };

    Window_LobbyCommand.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    }
})();