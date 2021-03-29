//=============================================================================
// More Escape Codes
// by Shaz
// Last Update: 2015.10.21
//=============================================================================

/*:
 * @plugindesc Extends the number of escape codes in the Show Text command
 * @author Shaz
 *
 * @param Face ID Index
 * @desc Escape code for ID of actor and index for face graphic
 * @default f
 *
 * @param Nickname/Handle
 * @desc Escape code for actor nickname/handle
 * @default h
 *
 * @help This plugin does not provide plugin commands.
 *
 * Hover the mouse over the text input box of the Show Text command to see
 * the default escape codes.  Do not use values that are already being used.
 *
 * ---Face Graphic---
 * if the Face ID Index value is 'f', use \f[1,2] in a Show Text command
 * to add the face at index 2 of Actor 1's face graphic.  Remember indexes
 * start at 0.  This escape code can be used multiple times within a
 * Show Text command to change expressions.
 *
 * ---Nickname/Handle---
 * if the Nickname/Handle value is 'h', use \h[1] to show Actor 1's nickname.
 *
 */

/*:ja
 * @plugindesc イベントコマンド[文章の表示]内で使える
 * エスケープコードの種類を拡張します。
 * @author Shaz
 *
 * @param Face ID Index
 * @desc アクターIDのエスケープコードおよび
 * 顔グラフィックのインデックスを指定します
 * @default f
 *
 * @param Nickname/Handle
 * @desc アクターのニックネーム/HNのエスケープコードを指定します
 * @default h
 *
 * @help このプラグインは、プラグインコマンドを含みません。
 *
 * イベントコマンド[文章の表示]のインプットボックスにマウスを重ねると
 * デフォルトのエスケープコードを確認することができます。
 * 既に使用されている値は、重複して使用しないようにしてください。
 * 
 * ---顔グラフィック---
 * 顔グラフィックのインデックス値を"f"としたとき、
 * [文章の表示]コマンド内で \f[1,2] を挿入することで、
 * アクター1の顔グラフィックに インデックス2の顔を使用することができます。
 * (インデックスは0から始まることに留意してください。)
 * このコードを、[文章の表示]コマンド内で何度も切り替えることで、
 * 会話中の表情の変化などを表現することができます。
 *
 * ---ニックネーム---
 * ニックネームのインデックス値を"h"としたとき、
 * \h[1] を挿入した部分で、アクター1のニックネームを表示することができます。
 *
 */

(function() {

  var parameters = PluginManager.parameters('MoreEscapeCodes');
  var reFace = String(parameters['Face ID Index'] || '');
  var reHandle = String(parameters['Nickname/Handle'] || null);
  var reHandlePattern = reHandle ? new RegExp('\\x1b' + reHandle + '\\[(\\d+)\\]', 'gi') : null;

  Window_Base.prototype.obtainMultiEscapeParams = function(textState) {
    var arr = /^\[(\d+,\d+)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
      textState.index += arr[0].length;
      return arr[1].split(',');
    } else {
      return '';
    }
  };

  var _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = _Window_Base_convertEscapeCharacters.call(this, text);
    if (reHandle) {
      text = text.replace(reHandlePattern, function() {
        return this.actorNickname(parseInt(arguments[1]));
      }.bind(this));
    }
    return text;
  };

  Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
  };


  var _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
  Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case reFace.toUpperCase():
        this.changeFace(textState);
        break;
      default:
        _Window_Message_processEscapeCharacter.call(this, code, textState);
        break;
    }
  };

  Window_Message.prototype.changeFace = function(textState) {
    newFace = this.obtainMultiEscapeParams(textState);
    if (newFace) {
      $gameMessage.setFaceImage($gameActors.actor(newFace[0]).faceName(), newFace[1]);
      this.contents.clearRect(0, 0, Window_Base._faceWidth, Window_Base._faceHeight);
      this.loadMessageFace();
      this.drawMessageFace();
    }
  };

  var _Window_Message_newLineX = Window_Message.prototype.newLineX;
  Window_Message.prototype.newLineX = function() {
    var pattern = new RegExp('\\\\' + reFace + '\\[(\\d+,\\d+)\\]', 'i');
    if ($gameMessage.allText().match(pattern)) {
      return 168;
    } else {
      return _Window_Message_newLineX.call(this);
    }
  };
})();
