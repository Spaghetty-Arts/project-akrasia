//=============================================================================
// !SPF_GereSwitches.js
//=============================================================================
/*:
 * @plugindesc Code for taking care of switches
 *
 * @author fabian
 *
 * @help
 *
 * This file has the functions for taking care of switches
 *
 *
 */

(function( ){

    controllSwitch = function (eId, choice, onOff) {
        for (i = 0; i < eId.length; i++) {
            $gameSelfSwitches.setValue([$gameMap._mapId, eId[i], choice], onOff);
        }
    }

    controllSingleSwitch = function (eID, choice, onOff) {
        $gameSelfSwitches.setValue([$gameMap._mapId, eID, choice], onOff);
    }
})();
