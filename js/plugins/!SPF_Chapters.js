//=============================================================================
// !SPF_SaveSystem.js
//=============================================================================
/*:
 * @plugindesc Code for getting the chapter information
 *
 * @author fabian
 *
 * @help
 *
 * Code for getting the chapter information
 *
 *
 */

(function () {

    getChapter = function () {
        let chapter;
        switch ($gameVariables.value(7)) {
            case 1:
                chapter = "Capitulo 1 - Prologo";
                break;
            case 2:
                chapter = "Capitulo 2 - Aprisionamento"
                break;
            case 3:
                break;
            case 4:
                break;
        }
        return chapter;
    }

    setChapter = function (x) {
        $gameVariables.setValue(7, x);
    }

})();