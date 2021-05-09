//=============================================================================
// !SPF_SaveSystem.js
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

    changingHue = function (hex1, hex2, hex3, int) {
        let tmp = SceneManager._scene._spriteset._characterSprites;
        let playerSprite = tmp[tmp.length - 1];
        //console.log(playerSprite)
        playerSprite.setBlendColor([hex1, hex2, hex3, int]);  // darken
        //SceneManager._scene._spriteset._characterSprites[playerSprite].setBlendColor([hex1, hex2, hex3, int]);
    }

})();