//=============================================================================
// Hacking.js
//=============================================================================
/*:
 * @plugindesc Code for the hacking minigame
 *
 * @fabian
 *
 * @help
 *
 * This file has the functions to connect two consecutives nodes and to complete te minigame if 3 are connected
 *
 *
 */

function connectNode(n1, n2) {
	if($gameSelfSwitches.value([$gameMap._mapId, n1, 'D']) && $gameSelfSwitches.value([$gameMap._mapId, n2, 'D'])) {
		return true;
	}
}

function winHack(n1, n2) {
	if ($gameSelfSwitches.value([$gameMap._mapId, n1, 'A']) || $gameSelfSwitches.value([$gameMap._mapId, n2, 'A'])) {
		return true;
	}
}

function winHack3(n1, n2, n3) {
	if ($gameSelfSwitches.value([$gameMap._mapId, n1, 'A']) || $gameSelfSwitches.value([$gameMap._mapId, n2, 'A']) || $gameSelfSwitches.value([$gameMap._mapId, n3, 'A'])) {
		return true;
	}
}
