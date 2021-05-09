//=============================================================================
// !SPF_Prologue_Office.js
//=============================================================================
/*:
 * @plugindesc Code for the events in office
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

    getFloor = function () {
        let floor = $gameVariables.value(22);
        return floor;
    }

    setFloor = function (floor) {
        $gameVariables.setValue(22, floor);
    }

    transferPlayerEle = function () {
        let floor = $gameVariables.value(22);
        switch (floor) {
            case -1:
                $gamePlayer.reserveTransfer(16, 14, 28, 8, 0);
                break;
            case 0:
                $gamePlayer.reserveTransfer(10, 14, 5, 2, 0);
                break;
            case 1:
                $gamePlayer.reserveTransfer(15, 15, 5, 2, 0);
                break;
            case 2:
                $gamePlayer.reserveTransfer(12, 3, 5, 2, 0);
                break;
        }
    }

})();