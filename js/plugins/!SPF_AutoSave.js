(function () {
    let aSaved = false;
    let mSaved = false;

    autoSave = function () {
        aSaved = true;
        save(1);
        AudioManager.playSe({"name": "Computer", "volume": 60, "pitch": 100, "pan": 0});

    }

    manSave = function () {
        mSaved = true;
        save(2);
        AudioManager.playSe({"name": "confirm", "volume": 60, "pitch": 100, "pan": 0});
    }

    endSave = function () {
        aSaved = false;
        mSaved = false;
    }

    let _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        this._sWindow = new Window_Save(0, 0, 250, 80);
        if (aSaved || mSaved){
            this.addWindow(this._sWindow);}
    };

    let _Scene_Map_update = Scene_Map.prototype.update;

    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);
        if (aSaved || mSaved){
            this.addWindow(this._sWindow);
        }
        this._sWindow.refresh();
    };

    DataManager.maxSavefiles = function() {
        return 2;
    };

    DataManager.makeSavefileInfo = function() {
        var info = {};
        info.globalId   = this._globalId;
        info.title      = getChapter() + " : " + $dataMapInfos[$gameMap._mapId].name;
        info.characters = $gameParty.charactersForSavefile();
        info.faces      = $gameParty.facesForSavefile();
        info.playtime   = $gameSystem.playtimeText();
        info.timestamp  = Date.now();
        return info;
    };

    save = function (x) {
        try {
            StorageManager.backup(x);
            $gameSystem.onBeforeSave();
            return DataManager.saveGameWithoutRescue(x);
        } catch (e) {
            console.error(e);
            try {
                StorageManager.remove(x);
                StorageManager.restoreBackup(x);
            } catch (e2) {
            }
            return false;
        }

    }

    function Window_Save() {
        this.initialize.apply(this, arguments);
    }

    Window_Save.prototype = Object.create(Window_Base.prototype);
    Window_Save.prototype.constructor = Window_Save;

    Window_Save.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }
    
    Window_Save.prototype.drawA = function () {
        if (aSaved) {
            this.drawTextEx("\\I[245] \\C[1]Auto Save", 0, 0, "center");
        } else if (mSaved) {
            this.drawTextEx("\\I[245] \\C[1]Save", 0, 0, "center");
        }

    }

    Window_Save.prototype.refresh = function(){
        this.contents.clear();
        if (aSaved || mSaved){
            this.open();
            this.drawA();
        }
        else{this.close();}
    };
})();