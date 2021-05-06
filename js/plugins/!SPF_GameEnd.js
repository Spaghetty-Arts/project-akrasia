Scene_GameEnd.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
    this.addChild(this._backgroundSprite);
};

Scene_GameEnd.prototype.createCommandWindow = function() {
    if ($gameParty.isAllDead()) {
        this._commandWindow = new Window_GameEnd();
        this._commandWindow.setHandler('to Title',  this.commandToTitle.bind(this));
        this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
        this.addWindow(this._commandWindow);
    } else {
        this._commandWindow = new Window_GameEnd();
        this._commandWindow.setHandler('to Title',  this.commandToTitle.bind(this));
        this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
        this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    }
};


Scene_GameEnd.prototype.commandToQuit = function() {
    this.fadeOutAll();
    SceneManager.exit();
};

//== Window_GameEnd ==================================

Window_GameEnd.prototype.makeCommandList = function() {
    this.addCommand("Sair pro menu", 'to Title');
    this.addCommand("Sair do jogo", 'Exit');
    this.addCommand("Cancelar",  'cancel');
};
