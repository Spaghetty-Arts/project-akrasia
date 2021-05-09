//=============================================================================
// !SPF_conversation.js
//=============================================================================
/*:
 * @plugindesc Code for conversation
 *
 * @fabian
 *
 * @help
 *
 * This file has the functions for the messaging system
 *
 *
 */


(function( ){

    showMsg = function (msg) {
        $gameMessage.add(msg);
    }

    showMsgChoice = function (msg, choice, defaultT = 0) {
        $gameMessage.add(msg);
        $gameMessage.setChoices(choice, defaultT, -1);
        $gameMessage.setChoiceCallback(function(responseIndex) {
            console.log(responseIndex)
            return responseIndex;
        });
        $gameMap._interpreter.setWaitMode('message');
    }
})();
