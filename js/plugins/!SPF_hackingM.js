//=============================================================================
// Hacking.js
//=============================================================================
/*:
 * @plugindesc Code for the hacking minigame
 *
 * @author fabian
 *
 * @help
 *
 * This file has the functions for the hacking minigame
 *
 *
 */


(function( ){

	connectNode = function (n1, n2){
		if($gameSelfSwitches.value([$gameMap._mapId, n1, 'D']) && $gameSelfSwitches.value([$gameMap._mapId, n2, 'D'])) {
			return true;
		}
	}

	winHack = function (n1, n2) {
		if ($gameSelfSwitches.value([$gameMap._mapId, n1, 'A']) || $gameSelfSwitches.value([$gameMap._mapId, n2, 'A'])) {
			return true;
		}
	}

	winHack3 = function (n1, n2, n3) {
		if ($gameSelfSwitches.value([$gameMap._mapId, n1, 'A']) || $gameSelfSwitches.value([$gameMap._mapId, n2, 'A']) || $gameSelfSwitches.value([$gameMap._mapId, n3, 'A'])) {
			return true;
		}
	}

	hackStart = function (x) {
		let hackState = Math.floor(Math.random() * 3);
		let ice = $gameVariables.value(2);
		let fail = $gameVariables.value(3);
		let choice = "";
		if (hackState == 0) {
			choice = "A";
		} else if (hackState == 1) {
			if (ice < 3) {
				choice = "B";
				ice += 1;
				$gameVariables.setValue(2, ice);
			}
		}
		else {
			if (fail < 3) {
				choice = "C";
				fail += 1;
				$gameVariables.setValue(3, fail);
			}
		}
		$gameSelfSwitches.setValue([$gameMap._mapId, x, choice], true);
		return true;
	}

	resetS = function () {
		let resetN = $gameVariables.value(5);

		$gameVariables.setValue(2, 0);
		$gameVariables.setValue(3, 0);
		$gameVariables.setValue(4, 0);
		$gameSwitches.setValue(17, true);
		$gamePlayer.reserveTransfer(2, 7, 6, 8, 0);
		resetN -=1;
		$gameVariables.setValue(5, resetN);
		$gameSwitches.setValue(2, false);

	}

	resetSP = function () {
		let resetN = $gameVariables.value(5);

		$gameVariables.setValue(2, 0);
		$gameVariables.setValue(3, 0);
		$gameVariables.setValue(4, 0);
		$gameSwitches.setValue(17, true);
		$gamePlayer.reserveTransfer(13, 7, 6, 8, 0);
		resetN -=1;
		$gameVariables.setValue(5, resetN);
		$gameSwitches.setValue(2, false);

	}

	resetSP2 = function () {
		let resetN = $gameVariables.value(5);

		$gameVariables.setValue(2, 0);
		$gameVariables.setValue(3, 0);
		$gameVariables.setValue(4, 0);
		$gameSwitches.setValue(17, true);
		$gamePlayer.reserveTransfer(54, 7, 6, 8, 0);
		resetN -=1;
		$gameVariables.setValue(5, resetN);
		$gameSwitches.setValue(2, false);

	}

	clearH = function () {
		$gameVariables.setValue(2, 0);
		$gameVariables.setValue(3, 0);
		$gameVariables.setValue(4, 0);
		$gameSwitches.setValue(17, true);
	}

	restoreH = function () {
		$gameSwitches.setValue(17, false);
		$gameSwitches.setValue(2, true);
	}

	damageHack = function () {
		playerLife -= 10;
		$gameVariables.setValue(86, playerLife);
	}

	hackFail = function () {
		AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
		$gameMessage.add("Failed");
	}

	hackOff = function (x) {
		AudioManager.playSe({name: "block", pan: 0, pitch: 100, volume: 100});
		Game_Interpreter.prototype.set_self_variable("off", 1, x, $gameMap._mapId);
	}

	hackSucc = function (x) {
		AudioManager.playSe({name: "confirm", pan: 0, pitch: 100, volume: 100});
		$gameSelfSwitches.setValue([$gameMap._mapId, x, "D"], true);
	}

	resetW = function () {

		$gameVariables.setValue(2, 0);
		$gameVariables.setValue(3, 0);
		$gameVariables.setValue(4, 0);
		$gameSwitches.setValue(17, true);

		$gameSwitches.setValue(2, false);

	}
})();
