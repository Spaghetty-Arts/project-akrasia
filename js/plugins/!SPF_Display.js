(function(){
    Window_MapName.prototype.initialize = function() {
        var wight = this.windowWidth();
        var height = this.windowHeight();

        /* Edit X variable to position Map name display */
        var x = 500;
        /* -------------------------------------------- */

        Window_Base.prototype.initialize.call(this, x, 0, wight, height);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;
        this.refresh();
    };

    Window_MapName.prototype.refresh = function() {
        this.contents.clear();
        if ($gameMap.displayName()) {
            var width = this.contentsWidth();
            this.drawBackground(0, 0, width, this.lineHeight());
            this.changeTextColor("#fda700");
            this.drawText($gameMap.displayName(), 0, 0, width, 'center');
        }
    };

    Window_MapName.prototype.drawBackground = function(x, y, width, height) {
        var color1 = this.dimColor1();
        var color2 = this.dimColor2();
        this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
        this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
    };

})();