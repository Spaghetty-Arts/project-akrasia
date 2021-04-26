Window_Options.prototype.addGeneralOptions = function() {
    this.addCommand("Keyboard Config", "Keyboad Config")
};

Window_Options.prototype.addVolumeOptions = function() {
    this.addCommand("Background Volume", 'bgmVolume');
    this.addCommand("Effects Volume", 'seVolume');

};