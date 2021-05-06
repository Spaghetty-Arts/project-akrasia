//=============================================================================
// !SPF_Prologue_Metro.js
//=============================================================================
/*:
 * @plugindesc Code for the events in metro
 *
 * @author fabian
 *
 * @help
 *
 * This file has the functions for the events in the prologue part
 *
 *
 */

(function () {

    getPlayerPositionX = function () {
        return $gamePlayer.x;
    }

    getPlayerPositionY = function () {
        return $gamePlayer.y;
    }

    screenCenter = function (x, y) {
        $gameVariables.setValue(9, Math.round(x));
        $gameVariables.setValue(8, Math.round(y));
    }


    sitHarper = function () {
        let x = getPlayerPositionX();
        let y = getPlayerPositionY();
        if (y == 10 && x == 20) {
            return 0;
        } else if (x == 21 && y == 9) {
            return 1;
        } else if (x == 19 && y == 9) {
            return 2;
        }
    }

    hoboCitizen = function () {
        $gameSelfSwitches.setValue([$gameMap._mapId, 14, "A"], true);
        $gameSelfSwitches.setValue([$gameMap._mapId, 16, "A"], true);
        $gameSelfSwitches.setValue([$gameMap._mapId, 17, "A"], true);
    }

    hoboPolice = function () {
        $gameSelfSwitches.setValue([$gameMap._mapId, 9, "A"], true);
        $gameSelfSwitches.setValue([$gameMap._mapId, 15, "A"], true);
    }
})();