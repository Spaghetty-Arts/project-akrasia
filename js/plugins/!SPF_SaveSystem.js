//=============================================================================
// !SPF_SaveSystem.js
//=============================================================================
/*:
 * @plugindesc Code for the saving system
 *
 * @author fabian
 *
 * @help
 *
 * This file has the functions for the saving and loading mechanich
 *
 *
 */


(function( ){

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
})();