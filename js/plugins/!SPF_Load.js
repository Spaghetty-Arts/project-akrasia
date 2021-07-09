//=============================================================================
// !SPF_Load.js
//=============================================================================

/*:
 * @plugindesc to add load option in menu screen.
 * @author fabian
 *
 * @help This plugin does not provide plugin commands.
 */
Scene_Menu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_MenuCommand(0, 0);
    this._commandWindow.setHandler('item',      this.commandItem.bind(this));
    this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
    this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
    this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
    this._commandWindow.setHandler('save',      this.commandSave.bind(this));
    this._commandWindow.setHandler('load',      this.commandLoad.bind(this));
    this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_Menu.prototype.commandLoad = function() {
    SceneManager.push(Scene_Load);
};

Window_MenuCommand.prototype.addLoadCommand = function() {
    this.addCommand('Carregar', 'load', true);
};

Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addLoadCommand();
    this.addGameEndCommand();
};

Scene_Load.prototype.createBackground = function () {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
    this.addChild(this._backgroundSprite);
}

Window_SavefileList.prototype.drawPlaytime = function(info, x, y, width) {
    if (info.playtime) {
        this.changeTextColor("#f8f800");
        let str = info.playtime;
        const myArr = str.split(":");
        //console.log(info.playtime);
        this.drawText("Tempo de jogo: " + myArr[0] + "H " + myArr[1] + "min", x, y, width, 'right');
    }
};

Window_SavefileList.prototype.drawFileId = function(id, x, y) {
    if (id == 1) {
        this.changeTextColor("#09e9f1");
        this.drawText("AutoSave", x, y, 180);
    } else {
        this.changeTextColor("#f10909");
        this.drawText("Manual", x, y, 180);
    }

    Window_SavefileList.prototype.drawGameTitle = function(info, x, y, width) {
        if (info.title) {
            this.changeTextColor("#cf06d5");
            this.drawText(info.title, x, y, width);
        }
    }
};
