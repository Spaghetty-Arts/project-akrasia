//=============================================================================
// !SPF_ChangeValues.js
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

    changeHPD = function (d) {
        let health = $gameParty.members()[0].hp;
        let dmg = health * d;
        $gameParty.members()[0].gainHp(-dmg);
    }

})();