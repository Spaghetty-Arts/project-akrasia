//=============================================================================
// GereSwitches.js
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

    controllSwitch1 = function (eId, choice, onOff) {
        $gameSelfSwitches.setValue([$gameMap._mapId, eId, choice], onOff);
    }

})();
