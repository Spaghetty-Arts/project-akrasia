Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
      //  SceneManager.push(Scene_GameEnd);
         location.reload();
    }
    Scene_Base.prototype.update.call(this);
};
