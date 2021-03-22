//=============================================================================
// MenuSubMember.js (Ver1.2.2)
//=============================================================================
// 更新履歴
// 2015.10.27 1.0 初公開(準公式プラグイン)
// 2017.06.03 1.1 マップ画面でも同行者を表示
// 2017.06.04 1.1.1 後方互換性対応。プラグイン導入前のセーブデータも読み込み可
// 2017.06.05 1.1.2 連続でメニューを開閉するとフリーズする不具合を修正
// 2017.06.17 1.2 ひきも記さんの隊列歩行プラグイン「TMFollowerEx.js」との併用が
//                可能になりました。
// 2017.06.19 1.2.1 「TMFollowerEx.js」プラグイン導入前にセーブしたデータを
//                読み込んでも、正しく隊列が表示されるようになりました。
//                逆（「TMFollowerEx.js」導入後にセーブしたデータを、導入前の
//                環境で読み込む）の場合も、正しく表示されます。
// 2018.09.18 1.2.2 メニュー画面での同行者の表示のタイプを追加

/*:
 * @plugindesc display sub member at menu window and field (Ver1.2.2)
 * @author Sasuke KANNAZUKI (thanks to Yoji Ojima)
 *
 * @param subMemberIdVal1
 * @desc variable id for actor id of sub member 1
 * @default 11
 *
 * @param subMemberIdVal2
 * @desc variable id for actor id of sub member 2
 * @default 12
 *
 * @param subMemberIdVal3
 * @desc variable id for actor id of sub member 3
 * @default 13
 *
 * @param subMemberIdVal4
 * @desc variable id for actor id of sub member 4
 * @default 14
 * 
 * @param displayIfNone
 * @desc when no sub members, whether display the window or not.
 * (1=display, 0=not display)
 * @default 0
 * 
 * @param subMemberText
 * @desc display text that means sub member
 * @default Sub Members
 *
 * @param subMemberNoneText
 * @desc text display when no sub members
 * @default None
 *
 * @param DisplayOnMap
 * @desc whether to display sub members on map at tail of party (1:yes, 0:no)
 * @default 1
 *
 * @param MenuSubMember Display Mode
 * @desc set display mode on window. 0=default, 1=without name
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 * 
 * this plugin displays sub members under the menu commands.
 * sub member is an actor that not attend battle.
 *
 * [Ver1.1 additional feature]
 * At map scene, it displays sub members after actors.
 * *note* by option setting, this function can invalidate.
 *
 * if no sub members, set variables value be 0.
 *
 * the actors appeared on map are top 4, that attends the battle.
 * sub members in the party appear always every one on map.
 * 
 * [Ver1.2 additional feature]
 * _Enables to utilize this plugin with "TMFollowerEx.js".
 * http://hikimoki.sakura.ne.jp/plugin/plugin_system.html#TMFollowerEx
 *
 * In the case, be sure to put MenuSubMember.js below TMFollowerEx.js.
 *
 * *** Check points to utilize 2 plugins:
 * ・You can insert NPC actor(s) either/both top or tail.
 *   This function is independent from MenuSubMember. 
 * ・You can set the max length of the followers.
 *   It enables you to display all actors and sub members on the map scene.
 * ・"TMFollower.js" suppose menu sub members as the tail of actors.
 *    So you can run plugin commands for followers also to menu sub members.
 * ・If the player obtain more character(actors, NPCs, and menu sub members),
 *   truncate actors and menu sub members from the tail.
 *
 * note: this plugin is only for default menu.
 *  it cannot use on changed layout menu(ex. AltMenuScreen.js).
 * 
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @plugindesc メニュー画面と隊列の最後尾に同行者を表示します(ver1.2.2)
 * @author 神無月サスケ (thanks to Yoji Ojima)
 *
 * @param subMemberIdVal1
 * @desc 同行者1のアクターIDを入れる変数ID
 * @default 11
 *
 * @param subMemberIdVal2
 * @desc 同行者2のアクターIDを入れる変数ID
 * @default 12
 *
 * @param subMemberIdVal3
 * @desc 同行者3のアクターIDを入れる変数ID
 * @default 13
 *
 * @param subMemberIdVal4
 * @desc 同行者4のアクターIDを入れる変数ID
 * @default 14
 * 
 * @param displayIfNone
 * @desc 同行者がいない場合でも、ウィンドウを表示するか
 * (する=1, しない=0)
 * @default 0
 * 
 * @param subMemberText
 * @desc 「同行者」の意味で表示するテキスト
 * @default 同行者
 *
 * @param subMemberNoneText
 * @desc 同行者がいない時に表示するテキスト
 * @default なし
 *
 * @param DisplayOnMap
 * @desc 隊列歩行の最後尾に同行者を表示するか(1:する, 0:しない)
 * @default 1
 *
 * @param MenuSubMember Display Mode
 * @desc メニュー画面での同行者の表示方法。0=通常 1=キャラのみで名前なし
 * @default 0
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * 
 * このプラグインは、同行者リストを、メニューコマンドの下に表示します。
 * 同行者とは、戦闘に参加しないアクターです。
 *
 * [Ver1.1 追加要素]
 * 同行者は、マップ上での隊列歩行で、アクターの最後尾に表示されます。
 * オプションでマップ上で非表示にすることも可能です。
 * 
 * 同行者を設定しない場合は、該当する変数の値を 0 にしてください。
 *
 * アクターが５人以上の場合でも、隊列に現れるアクターは先頭の４人だけです。
 * 一方同行者は、全員（最大４人）が表示されます。
 *
 * [Ver1.2 追加要素]
 * ひきも記さんの隊列歩行プラグイン「TMFollowerEx.js」との連携が可能に。
 * http://hikimoki.sakura.ne.jp/plugin/plugin_system.html#TMFollowerEx
 *
 * 連携する場合、本プラグインMenuSubMember.js を、必ず下に配置してください。
 *
 * 連携により、例えば以下のようなことが可能になります。
 * ・隊列の先頭や末尾に、メニューに現れないアクターを挿入可能です。
 *   この機能は、同行者とは完全に独立しています。
 * ・隊列の長さを指定可能です。これにより、本プラグイン単体では先頭４人のみ
 *   ですが、連携することで、全てのアクター、同行者を表示することも可能です。
 * ・『TMFollower.js』側から見ると同行者は「最後尾にいるフォロワー達」と
 *   認識されます。このため、『TMFollower.js』側のプラグインコマンドで
 *   フォロワーに関する処理が同行者に対しても施されます。
 * ・仮に指定した隊列表示人数より、アクターと同行者の方が多くなった場合、
 *   同行者の最後尾から順に表示が省略されていきます。
 *
 * ■注意：このプラグインはデフォルトのメニュー画面専用です。
 * プラグイン(AltMenuScreen.jsなど)でレイアウトを変更したケースでは使えません。
 * 
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  //
  // process parameters
  //
  var parameters = PluginManager.parameters('MenuSubMember');
  var submemberVar1 = Number(parameters['subMemberIdVal1'] || 11);
  var submemberVar2 = Number(parameters['subMemberIdVal2'] || 12);
  var submemberVar3 = Number(parameters['subMemberIdVal3'] || 13);
  var submemberVar4 = Number(parameters['subMemberIdVal4'] || 14);
  var subMemberText = parameters['subMemberText'] || 'Sub Members';
  var subMemberNoneText = parameters['subMemberNoneText'] || 'None';
  var displayIfNone = !!Number(parameters['displayIfNone']);
  var DisplayOnMap = !!Number(parameters['DisplayOnMap'] || 1);
  var menuDisplayMode = Number(parameters['MenuSubMember Display Mode'] || 0);

  //
  // process TMFollowerEx parameters
  //
  var tmParams = PluginManager.parameters('TMFollowerEx');
  var additionalFollower = tmParams ? Number(tmParams['additionalFollower'] ||
   4) : 4;

  // ----------------------------------------------------------------------
  // add window to menu scene (V1.0 section)
  //
  var _Scene_Menu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    _Scene_Menu_create.call(this);
    this.createSubMemberWindow();
  };

  Scene_Menu.prototype.createSubMemberWindow = function() {
    var x = 0;
    var y = this._commandWindow.height;
    var width = this._commandWindow.width;
    var height = Graphics.height - y - this._goldWindow.height;
    switch (menuDisplayMode) {
    case 0:
      this._subMemberWindow = new Window_SubMember(x, y, width, height);
      break;
    default:
      this._subMemberWindow = new Window_SubMember2(x, y, width, height);
      break;
    }
    this.addWindow(this._subMemberWindow);
  };

  var _Scene_Menu_start = Scene_Menu.prototype.start;
  Scene_Menu.prototype.start = function() {
    _Scene_Menu_start.call(this);
    this._subMemberWindow.refresh();
  };

  //
  // sub member window
  //
  function Window_SubMember() {
    this.initialize.apply(this, arguments);
  }

  Window_SubMember.prototype = Object.create(Window_Base.prototype);
  Window_SubMember.prototype.constructor = Window_SubMember;

  Window_SubMember.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.setSubMember();
    this.refresh();
  };

  Window_SubMember.prototype.setSubMember = function() {
    this.subMember1 = $gameActors.actor($gameVariables.value(submemberVar1));
    this.subMember2 = $gameActors.actor($gameVariables.value(submemberVar2));
    this.subMember3 = $gameActors.actor($gameVariables.value(submemberVar3));
    this.subMember4 = $gameActors.actor($gameVariables.value(submemberVar4));
  };

  Window_SubMember.prototype.refresh = function() {
    var y = 0;
    var numLines = 0;
    var isVisible = true;
    var width = this.width - 80;
    var lineHeight = this.lineHeight();
    this.contents.clear();
    // draw the text "sub member"
    this.changeTextColor(this.systemColor());
    this.drawText(subMemberText, 4, 0, width);
    numLines++;
    // draw sub members
    this.resetTextColor();
    y += lineHeight;
    if(this.subMember1){
      this.drawActorName(this.subMember1, 44 , y, width);
      this.drawActorCharacter(this.subMember1, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    if(this.subMember2){
      this.drawActorName(this.subMember2, 44, y, width);
      this.drawActorCharacter(this.subMember2, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    if(this.subMember3){
      this.drawActorName(this.subMember3, 44, y, width);
      this.drawActorCharacter(this.subMember3, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    if(this.subMember4){
      this.drawActorName(this.subMember4, 44, y, width);
      this.drawActorCharacter(this.subMember4, 24, y + 40);
      y += lineHeight;
      numLines++;
    }
    // if no sub members
    if(y === lineHeight){
      this.drawText(subMemberNoneText, 4, y, width);
      numLines++;
      if(!displayIfNone){
        isVisible = false;
      }
    }
    // fitting height
    if(numLines < 5 || this.y != 324){
      this.height = this.fittingHeight(numLines) + 4;
      this.y = Graphics.height - 72 - this.height;
    };
    // set visible status
    this.visible = isVisible;
  };

  //
  // sub member window 2 (without name)
  //
  function Window_SubMember2() {
    this.initialize.apply(this, arguments);
  }

  Window_SubMember2.prototype = Object.create(Window_SubMember.prototype);
  Window_SubMember2.prototype.constructor = Window_SubMember2;

  Window_SubMember2.prototype.initialize = function(x, y, width, height) {
    Window_SubMember.prototype.initialize.call(this, x, y, width, height);
  };

  Window_SubMember2.prototype.refresh = function() {
    var x = 24;
    var y = this.lineHeight() * 2 + 16;
    var charSize = $gameMap.tileWidth();
    var numMembers = 0;
    var isVisible = true;
    var width = this.width - 80;
    this.contents.clear();
    // draw the text "sub member"
    this.changeTextColor(this.systemColor());
    this.drawText(subMemberText, 4, 0, width);
    if(this.subMember1){
      this.drawActorCharacter(this.subMember1, x, y);
      x += charSize;
      numMembers++;
    }
    if(this.subMember2){
      this.drawActorCharacter(this.subMember2, x, y);
      x += charSize;
      numMembers++;
    }
    if(this.subMember3){
      this.drawActorCharacter(this.subMember3, x, y);
      x += charSize;
      numMembers++;
    }
    if(this.subMember4){
      this.drawActorCharacter(this.subMember4, x, y);
      x += charSize;
      numMembers++;
    }
    // draw sub members
    this.resetTextColor();
    // if no sub members
    if(x === 24){
      this.drawText(subMemberNoneText, 4, this.lineHeight() + 16);
      if(!displayIfNone){
        isVisible = false;
      }
    }
    // fitting height
    this.height = this.fittingHeight(2) + 20;
    this.y = Graphics.height - 72 - this.height;
    // set visible status
    this.visible = isVisible;
  };

  // ----------------------------------------------------------------------
  // display sub member at screen
  //
  // added parameters Ver.1.1
  //
  var subMemberVarList = [submemberVar1, 
    submemberVar2, submemberVar3, submemberVar4];
  var subMembers = [];

  //
  // sub members definition
  //
  var _Game_Followers_initialize = Game_Followers.prototype.initialize;
  Game_Followers.prototype.initialize = function() {
    _Game_Followers_initialize.call(this);
    this.createSubMembers();
  };

  Game_Followers.prototype.createSubMembers = function () {
    for (var i = 0; i < 4 ; i++) {
      var follower = new Game_Follower(this._data.length + 1);
      this._data.push(follower);
      subMembers.push(follower);
    }
  };

  //
  // at each loading, recreate followers.
  //
  var _DataManager_loadGame = DataManager.loadGame;
  DataManager.loadGame = function(savefileId) {
    var isSuccess = _DataManager_loadGame.call(this, savefileId)
    if (isSuccess) {
      $gamePlayer._followers.recreateFollowers();
    }
    return isSuccess;
  };

  Game_Followers.prototype.recreateFollowers = function () {
    this._data = [];
    for (var i = 1; i < $gameParty.maxBattleMembers(); i++) {
      this._data.push(new Game_Follower(i));
    }
    $gameSystem._touchFollowerIncluded = null;
    if ($gameSystem.TMFollowerIncluded()) {
      for (i = 0; i < additionalFollower; i++) {
        this._data.push(new Game_Follower($gameParty.maxBattleMembers() + i));
      }
    }
    this.createSubMembers();
  };

  //
  // sub members display (Game_Follower)
  //
  var parameterToSubMemberActor = function (index) {
    var varId = subMemberVarList[index];
    var subMemberID = $gameVariables.value(varId);
    var subMember = $gameActors.actor(subMemberID);
    if (varId > 0 && subMemberID && subMember) {
      return subMember;
    }
    return null;
  };

  // skip subMember whose actorId is 0.
  var subMemberPosition = function (index) {
    for (var newIndex = 0, i = 0; i < 4; i++) {
      var actor = parameterToSubMemberActor(i);
      if (actor) {
        if (newIndex++ === index) {
          return actor;
        }
      } else {
        continue;
      }
    }
    return null;
  };

  //
  // change subPlayer display when specified variable changes
  //
  var _Game_Variables_setValue = Game_Variables.prototype.setValue;
  Game_Variables.prototype.setValue = function(variableId, value) {
    _Game_Variables_setValue.call(this, variableId, value);
    if (DisplayOnMap) {
      if (subMemberVarList.contains(variableId)) {
        $gameTemp.needFollowerRefresh = true;
      }
    }
  };

  var _Scene_Map_update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    if ($gameTemp.needFollowerRefresh) {
      $gamePlayer._followers.refresh();
      $gameTemp.needFollowerRefresh = false;
    }
    _Scene_Map_update.call(this);
  };

  //
  // sub members display (Spriteset_Map)
  //
  var _Spriteset_Map_createCharacters =
    Spriteset_Map.prototype.createCharacters;
  Spriteset_Map.prototype.createCharacters = function() {
    _Spriteset_Map_createCharacters.call(this);
    for (var i = 0; i < 4; i++) {
      var newCharacterSprite = new Sprite_Character(subMembers[i]);
      this._characterSprites.push(newCharacterSprite);
      this._tilemap.addChild(newCharacterSprite);
    }
  };

  // ----------------------------------------------------------------------
  // add compatibility with TMFollowerEx.js
  //
  // added features Ver.1.2

  //
  // read hikimoki's plugin parameters
  //
  Game_System.prototype.TMFollowerIncluded = function() {
    if (this._touchFollowerIncluded == null) {
      this._touchFollowerIncluded = ("isTouchFollowerEnabled" in $gameSystem);
    }
    return this._touchFollowerIncluded;
  };

  //
  // find the number of each component
  //
  var followerMaxSize = function () {
    return $gameParty.maxBattleMembers() - 1 +
     ($gameSystem.TMFollowerIncluded() ? additionalFollower : 4);
  };

  var hasHeader = function () {
    return $gameSystem.TMFollowerIncluded() &&
     $gamePlayer.headerFollower() > 0;
  };

  var hasFooter = function () {
    return $gameSystem.TMFollowerIncluded() &&
      $gamePlayer.footerFollower() > 0;
  };

  var numDispActor = function () {
    var actorFollowerNum = $gameParty.size() - 1 + (hasHeader() ? 1 : 0);
    var ceil = $gameSystem.TMFollowerIncluded() ? followerMaxSize() :
      $gameParty.maxBattleMembers() - 1;
    return actorFollowerNum.clamp(0, ceil);
  };

  var numSubMembers = function () {
    var num = 0;
    if (DisplayOnMap) {
      for (var i = 0; i < 4; i++) {
        if (subMemberPosition(i)) {
          num++;
        }
      }
    }
    return num.clamp(0, followerMaxSize() - numDispActor());
  };

  //
  // find followers' character
  //
  // (overwritten)
  Game_Follower.prototype.actor = function() {
    var lastId = 0;
    var headerNum = hasHeader() ? 1 : 0;
    var footerNum = hasFooter() ? 1 : 0;
    // footer
    if (hasFooter() &&
     this._memberIndex === Math.min(followerMaxSize(),
      numDispActor() + numSubMembers() + 1)) {
      return $gameActors.actor($gamePlayer.footerFollower());
    }
    // normal followers.
    if (this._memberIndex <= (lastId = numDispActor())) {
      return $gameParty.allMembers()[this._memberIndex - headerNum];
    }
    // menu sub member
    if (DisplayOnMap && this._memberIndex <= (lastId += numSubMembers())) {
      return subMemberPosition(this._memberIndex +
       numSubMembers() - lastId - 1);
    }
    return null;
  };

})();
