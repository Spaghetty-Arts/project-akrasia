Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        SceneManager.push(Scene_GameEnd);
    }
    Scene_Base.prototype.update.call(this);
};
