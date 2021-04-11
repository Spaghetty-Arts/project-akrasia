/*:
-------------------------------------------------------------------------
@title Menu Music
@author Hime
@date Nov 11, 2015
@url http://himeworks.com/2015/11/menu-music-mv/
-------------------------------------------------------------------------
@plugindesc Allows you to set custom BGM to play whenever the player
enters the menu.
@help 
-------------------------------------------------------------------------
== Description ==

Ever wanted to play some music when you open up the menu? For example,
on the map, you might have the regular map music playing, but then
when you go to the menu, you have a separate BGM specifically for
when players are going through the menu.

With this plugin, you can do that just that!

Not only can you choose what BGM to play, you can also change it
at anytime during the game with events.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

Nov 11, 2015 - navigating menus inside the menu overwrites stored BGM
Nov  9, 2015 - added support for continuing map BGM after closing menu
Nov  8, 2015 - initial release

== Usage ==

By default, there is no menu music. To set a menu bgm, start by
creating a plugin command and write

  set_menu_bgm

Followed by a "Play BGM" command, where you can select the BGM to play.

-- Replaying Map BGM ---

By default, any BGM on the map will continue from where it was before
you opened the menu. If you would like it to restart from the beginning,
use the following command:

  set_menu_bgm replay=true

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.MenuMusic = 1;
TH.MenuMusic = TH.MenuMusic || {};

(function ($) {

  /* When entering menu, store the bgm and bgs from the map */
  $.storeMapMusic = function() {
    this._mapBgm = AudioManager.saveBgm();
    this._mapBgs = AudioManager.saveBgs();
  };
  
  /* When going back to the map, stop menu bgm and play map music.
   * Assumes you can't access menu from battle or other scenes.
   */
  $.replayMapBgm = function() {   
    if ($gameSystem.replayMapBgmOnMenuClose()) {
      $gameMap.autoplay();
    }
    else {
      if (this._mapBgm) {
        AudioManager.replayBgm(this._mapBgm);
      } else {
          AudioManager.stopBgm();
      }
      if (this._mapBgs) {
          AudioManager.replayBgs(this._mapBgs);
      }
    }
  }
  
  var TH_MenuMusic_GameSystem_initialize = Game_System.prototype.initialize
  Game_System.prototype.initialize = function() {
    TH_MenuMusic_GameSystem_initialize.call(this);
    this.initMenuMusic();
  };
  
  /* No music by default */
  Game_System.prototype.initMenuMusic = function() {
    this._menuBgm = {"name":"","pan":0,"pitch":100,"volume":80};
  };
  
  Game_System.prototype.menuBgm = function() {
    return this._menuBgm;
  }
  
  Game_System.prototype.setMenuBgm = function(bgm, replay) {
    this._replayMapBgmOnMenuClose = replay;
    this._menuBgm = bgm;
  }
  
  Game_System.prototype.replayMapBgmOnMenuClose = function() {
    return this._replayMapBgmOnMenuClose;
  }
  
  
  Scene_Menu.prototype.stopAudioOnMenuStart = function() {
    if (!AudioManager.isCurrentBgm($gameSystem.menuBgm())) {
        AudioManager.stopBgm();
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
    AudioManager.stopSe();
  };
  
  /* Play our menu music when menu begins */
  var TH_MenuMusic_SceneMenu_create = Scene_Menu.prototype.create;
  Scene_Menu.prototype.create = function() {
    this.stopAudioOnMenuStart();
    AudioManager.playBgm($gameSystem.menuBgm());
    TH_MenuMusic_SceneMenu_create.call(this);
  };
  
  var TH_MenuMusic_Scene_Map_callMenu = Scene_Map.prototype.callMenu;
  Scene_Map.prototype.callMenu = function() {
    $.storeMapMusic();
    TH_MenuMusic_Scene_Map_callMenu.call(this);
  };
    
  var TH_MenuMusic_SceneMenu_terminate = Scene_Menu.prototype.terminate;
  Scene_Menu.prototype.terminate = function() {
    TH_MenuMusic_SceneMenu_terminate.call(this);
    if (SceneManager.isNextScene(Scene_Map)) {
      $.replayMapBgm();
    }
  };
  
  var TH_MenuMusic_SceneItemBase_terminate = Scene_ItemBase.prototype.terminate;
  Scene_MenuBase.prototype.terminate = function() {
    TH_MenuMusic_SceneItemBase_terminate.call(this);
    if (SceneManager.isNextScene(Scene_Map)) {
      $.replayMapBgm();
    }
  };
  
  var TH_MenuMusic_GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    TH_MenuMusic_GameInterpreter_pluginCommand.call(this, command, args);
    if (command.toLowerCase() === "set_menu_bgm") {
      var replayOnClose = false;
      if (args.length > 0) {
        var tokens = args[0].split("=");        
        if (tokens[1].toLowerCase() === "true") {
          replayOnClose = true;
        }
      }
      this._index++;
      var cmd = this.currentCommand();
      if (cmd.code === 241) {
        var params = cmd.parameters;
        $gameSystem.setMenuBgm(params[0], replayOnClose);
      }
    }
  };
})(TH.MenuMusic);