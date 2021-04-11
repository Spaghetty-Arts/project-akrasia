//=============================================================================
// Battle Mode
// by Shaz
// Last Updated: 2015.10.21
//=============================================================================

/*:
 * @plugindesc Allows side view and front view battles in the same game
 * @author Shaz
 *
 * @help This plugin does not provide plugin commands.
 *
 * Prefix a troop name with SV to set battles with that troop to side view
 * Prefix a troop name with FV to set battles with that troop to front view
 * Prefix a troop name with RV to set a random view for each battle with that troop
 * Leave out the prefix to take the system default
 *
 */

/*:ja
 * @plugindesc 同一ゲーム内で、戦闘時のサイドビューと
 * フロントビューの両方を提供します。
 * @author Shaz
 *
 * @help このプラグインは、プラグインコマンドを含みません。
 *
 * 部隊名の頭にSVとつけることで、その部隊との戦闘はサイドビューで展開されます。
 * 部隊名の頭にFVとつけることで、その部隊との戦闘はフロントビューで展開されます。
 * 部隊名の頭にRVとつけることで、その部隊との戦闘ビューはランダムに決定されます。 
 * 
 *上記を削除すれば、デフォルト設定に戻ります。
 *
 */

(function() {
  var _Game_System_isSideView = Game_System.prototype.isSideView;
  Game_System.prototype.isSideView = function() {
    if ($gameParty.inBattle) {
      var sv = $gameTroop.isSideView();
      if (sv === null) {
        return _Game_System_isSideView.call(this);
      } else {
        return sv;
      }
    } else {
      return _Game_System_isSideView.call(this);
    }
  };

  var _Game_Troop_setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    _Game_Troop_setup.call(this, troopId);

    if (this.troop().name.match(/^SV/)) {
      this._isSideView = true;
    } else if (this.troop().name.match(/^FV/)) {
      this._isSideView = false;
    } else if (this.troop().name.match(/^RV/)) {
      this._isSideView = Math.random() < 0.5;
    } else {
      this._isSideView = null;
    }
  };

  Game_Troop.prototype.isSideView = function() {
    return this._isSideView;
  };
})();
