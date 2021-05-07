//=============================================================================
// !SPF_Casino.js
//=============================================================================
/*:
 * @plugindesc Code for altering the palyer color
 *
 * @author fabian
 *
 * @help
 *
 * Code for  altering the palyer color
 *
 *
 */

(function () {

    changeMoneyChips = function () {
        let input = $gameVariables.value(27);
        if (input == 0) {
            return -1;
        } else if ($gameParty._gold >= input) {
            let chips = $gameVariables.value(26);
            chips += input;
            $gameVariables.setValue(26, chips);
            $gameParty._gold -= input;
            AudioManager.playSe({name: "Coin", pan: 0, pitch: 100, volume: 100});
            $gameVariables.setValue(27, 0);
            return 1;
        } else {
            return 0;
        }
    }

    changeChipsMoney = function () {
        let input = $gameVariables.value(27);
        let chips = $gameVariables.value(26);
        if (input == 0) {
            return -1;
        } else if (chips >= input) {
            let chips = $gameVariables.value(26);
            chips -= input;
            $gameVariables.setValue(26, chips);
            $gameParty._gold += input;
            AudioManager.playSe({name: "Coin", pan: 0, pitch: 100, volume: 100});
            $gameVariables.setValue(27, 0);
            return 1;
        } else {
            return 0;
        }
    }

    diceChips = function () {
        let chips = $gameVariables.value(26);
        if (chips < 10) {
            return 0;
        } else {
            return 1;
        }
    }

    winDice = function () {
        let bet = $gameVariables.value(32);
        let got = $gameVariables.value(28);

        if (bet == got) {
            AudioManager.playSe({name: "Coin", pan: 0, pitch: 100, volume: 100});
            setChips(10);
            return 1;
        } else {
            return 0;
        }
    }

    setChips = function (x) {
        let chips = $gameVariables.value(26);
        chips += x;
        $gameVariables.setValue(26, chips);
    }

})();