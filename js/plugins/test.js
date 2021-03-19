//=============================================================================
// Hacking.js
//=============================================================================
/*:
 * @plugindesc Description of your plugin
 *
 * @fabian
 *
 * @help
 *
 * Anything users might need to know about using your plugin.
 *
 * TERMS OF USE
 * What people who use your plugin are allowed to do with it.
 *
 * COMPATIBILITY
 * Any compatibility issues you know of or that have been brought to your attention, such as not being able to use this plugin with one of Galv's for example. This will be most common when you have a plugin that does the same or a similar thing to someone else's.
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
