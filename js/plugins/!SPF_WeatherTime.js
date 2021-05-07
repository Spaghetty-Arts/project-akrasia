//=============================================================================
// !SPF_WeatherTime.js
//=============================================================================
/*:
 * @plugindesc Code for altering the weather time
 *
 * @author fabian
 *
 * @help
 *
 * Code for  altering the screen color 0 - day, 1 - sundown, 2 - night
 *
 *
 */

(function () {

    changeTimeDay = function () {
        let time = $gameVariables.value(23);
        switch (time) {
            case 0:
                $gameScreen.startTint([0,0,0,0], 60);
                break;
            case 1:
                $gameScreen.startTint([0, -34, -68, 34], 120);
                break;
            case 2:
                $gameScreen.startTint([-102, -85, -34, 85], 60);
                break;
        }
    }

})();