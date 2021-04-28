
var TSR = TSR || {};
TSR.Title = TSR.Title || {};

var Imported = Imported || {};
Imported.TSR_Title = true;


//== PARAMETERS ============================================================================

 TSR.Parameters = PluginManager.parameters('TSR_Title');



   ///Exit command parameters


 TSR.Title.exit_title    = String(TSR.Parameters['Show in Title screen']);
 TSR.Title.exit_title    = eval(TSR.Title.exit_title);
 TSR.Title.exit_menu     = String(TSR.Parameters['Show in Main menu']);
 TSR.Title.exit_menu     = eval(TSR.Title.exit_menu);


    ///Pre title window parameters

 TSR.Title.preTitle_text        = String(TSR.Parameters['Pre Title Text']) || null;
 TSR.Title.preTitle_x           = String(TSR.Parameters['Pre Title X']);
 TSR.Title.preTitle_x           = eval(TSR.Title.preTitle_x);
 TSR.Title.preTitle_y           = String(TSR.Parameters['Pre Title Y']);
 TSR.Title.preTitle_y           = eval(TSR.Title.preTitle_y);
 TSR.Title.preTitle_width       = String(TSR.Parameters['Pre Title Width']);
 TSR.Title.preTitle_width       = eval(TSR.Title.preTitle_width);
 TSR.Title.preTitle_color       = Number(TSR.Parameters['Pre Title Text Color']);
 TSR.Title.preTitle_fontSize    = Number(TSR.Parameters['Pre Title Font Size']);
 TSR.Title.preTitle_defCursor   = String(TSR.Parameters['Pre Title Default Cursor']);
 TSR.Title.preTitle_defCursor   = eval(TSR.Title.preTitle_defCursor);
 TSR.Title.preTitle_blink       = String(TSR.Parameters['Pre Title Blink']);
 TSR.Title.preTitle_blink       = eval(TSR.Title.preTitle_blink);
 TSR.Title.preTitle_blinkColor  = Number(TSR.Parameters['Pre Title Blink Color']);
 TSR.Title.preTitle_textEffect  = String(TSR.Parameters['Pre Title Text Effect']);
 TSR.Title.preTitle_bind        = String(TSR.Parameters['Pre Title Command']);

   ///Title window parameters

 TSR.Title.window_CmdList    = String(TSR.Parameters['Window Command List']) || null ;
 TSR.Title.window_type       = String(TSR.Parameters['Window Menu Type']);
 TSR.Title.window_BGtype     = String(TSR.Parameters['Window Background']);
 TSR.Title.window_x          = String(TSR.Parameters['Window X']);
 TSR.Title.window_x          = eval(TSR.Title.window_x);
 TSR.Title.window_y          = String(TSR.Parameters['Window Y']);
 TSR.Title.window_y          = eval(TSR.Title.window_y);
 TSR.Title.window_width      = String(TSR.Parameters['Window Width']);
 TSR.Title.window_width      = eval(TSR.Title.window_width);
 TSR.Title.window_rows       = Number(TSR.Parameters['Window Visible Rows']);
 TSR.Title.window_cols       = Number(TSR.Parameters['Window Visible Cols']);
 TSR.Title.window_color      = Number(TSR.Parameters['Window Text Color']);
 TSR.Title.window_fontStyle  = String(TSR.Parameters['Window Text Font']);
 TSR.Title.window_fontSize   = Number(TSR.Parameters['Window Font Size']);
 TSR.Title.window_align      = String(TSR.Parameters['Window Text Align']);



   ///Default cursor parameters

 TSR.Title.defCursor_enable      = String(TSR.Parameters['Enable Default Cursor']);
 TSR.Title.defCursor_enable      = eval(TSR.Title.defCursor_enable);
 TSR.Title.defCursor_blink       = String(TSR.Parameters['Outline Opacity Blink']);
 TSR.Title.defCursor_blink       = eval(TSR.Title.defCursor_blink);
 TSR.Title.defCursor_blinkColor  = Number(TSR.Parameters['Opacity Blink Color']);
 TSR.Title.defCursor_textEffect  = String(TSR.Parameters['Selected Text Effect']);



//press any key
  Input.isAnyKeyPressed = function() {
    for (let i in Input.keyMapper) {
      if (Input.isRepeated(Input.keyMapper[i])) return true;
    }
  };


//== Scene_Title =====================================

//done
  Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    if (!TSR.Title._titleStarted && TSR.Title.preTitle_text) {
      this.createPreTitleWindow();
    } else {
      let titleStarted = true;
      this.createCommandWindow();
    }
  };

  //done good
  Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this._frameCounter = 0;
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
  };

  //done good
  Scene_Title.prototype.update = function() {

      if (!this._sceneStarted) {
         this._sceneStarted = true;
         Graphics.setVideoVolume(0);
         this.start()
      }
      this._frameCounter++;

      if (this._preTitlePause === true && this._frameCounter >= this._startCounter + 40) {
        this._commandWindow.open();
        this._startCounter  = false;
        this._preTitlePause = false;
      }
      if (TSR.Title._titleStarted && !this._StartedAndOpen && !this._startCounter) {
        this._commandWindow.open();
        this._StartedAndOpen = true;
      }
    Scene_Base.prototype.update.call(this);
  };

  //done good
  Scene_Title.prototype.createPreTitleWindow = function() {
    this._preTitleWindow = new Window_preTitle();
    this._preTitleWindow.setHandler('Start',  this.preTitleStart.bind(this));
    this.addWindow(this._preTitleWindow);
    this._activeWindow = this._preTitleWindow;
  };

  //Done
  Scene_Title.prototype.preTitleStart = function() {
    this._preTitleWindow.close();
    let bind = TSR.Title.preTitle_bind;
    if (bind === 'Command Window') {
      TSR.Title._titleStarted = true;
      this._preTitlePause = true;
      this._startCounter = this._frameCounter;
      this.createCommandWindow();
    } else if (bind === 'Load Screen') {
        this.commandLoadGame();
    } else if (bind === 'Load or New') {
        if (DataManager.isAnySavefileExists()) {
            this.commandLoadGame();
        } else {
            this.commandNewGame();
        }
    }
  };

  //Done good
  Scene_Title.prototype.isBusy = function() {
    if (this._commandWindow) {
      return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    } else {
      return this._preTitleWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    } 
  };


  //commands good
Scene_Title.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_TitleCommand();
    let list = ['New Game','multiplayer', 'Load', 'Options', 'Exit'];
    for (let i = 0; i < list.length; i++) {
        let cmd = list[i].toLowerCase();
        if (cmd.includes('new game')) {
            this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
        } else if (cmd.includes('load')) {
            this._commandWindow.setHandler('continue', this.commandLoadGame.bind(this));
            this._commandWindow.setHandler('multiplayer', this.commandMulti.bind(this));
        } else if (cmd.includes('options')) {
            this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        } else if (cmd.includes('exit')) {
            this._commandWindow.setHandler('Exit', this.commandToQuit.bind(this));
        }
    }
    this.addWindow(this._commandWindow);
    this._activeWindow = this._commandWindow;
};

//Done good
  Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    if (this._commandWindow) this._commandWindow.close();
    if (this.TitleTransitionEnable()) {
      if (this.TitleTransitionMusicFadeOut()) AudioManager.fadeOutBgm(1);
    } else { 
      this.fadeOutAll();
    }
    SceneManager.goto(Scene_Map);
  };

  //Done good
  Scene_Title.prototype.commandLoadGame = function() {
    if (this._commandWindow) this._commandWindow.close();
    SceneManager.push(Scene_Load);
  };


  //done
DataManager.setupMultiGame = function() {
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(28, 9,  11);
    Graphics.frameCount = 0;
};

//Done
Scene_Title.prototype.commandMulti = function () {
    DataManager.setupMultiGame();
    if (this._commandWindow) this._commandWindow.close();
    if (this.TitleTransitionEnable()) {
        if (this.TitleTransitionMusicFadeOut()) AudioManager.fadeOutBgm(1);
    } else {
        this.fadeOutAll();
    }
    SceneManager.goto(Scene_Map);
};

  Scene_Title.prototype.LoadSuccess = function() {
    if (this._commandWindow) this._commandWindow.close();
    SoundManager.playLoad();
    this.fadeOutAll();
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  Scene_Title.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
  };
  
  Scene_Title.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
  };

  Scene_Title.prototype.TitleTransitionEnable = function() {
    return TSR.Title.transition;
  };
  
  Scene_Title.prototype.TitleTransitionMusicFadeOut = function() {
    return TSR.Title.transition_BGMfadeOut;
  };

  Scene_Title.prototype.commandToQuit = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.exit();
  };



//== Scene_GameOver ==================================

  Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        SceneManager.push(Scene_GameEnd);
    }
    Scene_Base.prototype.update.call(this);
  };


//== Scene_GameEnd ==================================
 
  Scene_GameEnd.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if ($gameParty.isAllDead()) {     
      this.setBackgroundOpacity(0);
    } else {
      this.setBackgroundOpacity(128);
    }
  };

  Scene_GameEnd.prototype.createCommandWindow = function() {
    if ($gameParty.isAllDead()) {
      this._commandWindow = new Window_GameEnd();
      this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
      this._commandWindow.setHandler('to Title',  this.commandToTitle.bind(this));
      this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
      this.addWindow(this._commandWindow);
    } else {
      this._commandWindow = new Window_GameEnd();
      this._commandWindow.setHandler('to Title',  this.commandToTitle.bind(this));
      this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
      this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
      this.addWindow(this._commandWindow);
    }
  };
  
  Scene_GameEnd.prototype.commandTrueContinue = function() {
    let LastSave = DataManager.latestSavefileId();
    if (DataManager.loadGame(LastSave)) {
        this.LoadSuccess();
    } else {
        this.LoadFailure();
    }
  };
  
  Scene_GameEnd.prototype.LoadSuccess = function() {
    this._commandWindow.close();
    SoundManager.playLoad();
    this.fadeOutAll();
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  Scene_GameEnd.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
  };
  
  Scene_GameEnd.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
  };

  Scene_GameEnd.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  };

  Scene_GameEnd.prototype.commandToQuit = function() {
    this.fadeOutAll();
    SceneManager.exit();
  };


//== Window_Selectable =====================================

  Window_Selectable.prototype.setAlign = function(name, x, width, align) {
    if (align === 'center') {
      x += width / 2 - this.textWidth(name) / 2;
    } else if (align === 'right') {
      x += width - this.textWidth(name);
    }
    return x;
  };


  Window_Selectable.prototype.accordeon = function(index, name, x, y, width, align) {
    let preWidth = this.textWidth(name);
    width = this.changeWidth(name, preWidth);
    x += (preWidth - width) / 2;

    this.drawText(name, x, y, width, align);
  }


  Window_Selectable.prototype.changeWidth = function(name, width) {
    if (this._textIncrease) {
      if (this._text_ratio < 1) {
        this._text_ratio += 0.01
        width *= this._text_ratio * this.textWidth(name) / width;
        if (this._text_ratio >= 0.99) this._textIncrease = false;
      }
    } else {
      if (this._text_ratio > 0.5) {
        this._text_ratio -= 0.01
        width *= this._text_ratio * this.textWidth(name) / width;
        if (this._text_ratio <= 0.7) this._textIncrease = true;
      }
    }
    return width;
  };



//== Window_TitleCommand =====================================

//Done
  function Window_TitleCommand() {
    this.initialize.apply(this, arguments);
  }

  //Done
  Window_TitleCommand.prototype = Object.create(Window_HorzCommand.prototype);
  Window_TitleCommand.prototype.constructor = Window_TitleCommand;

  //Done
  Window_TitleCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.updatePlacement();
    this.openness = 0;
    this.selectLast();
  };

  //done
  Window_TitleCommand.prototype.numVisibleRows = function() {
    return 1;
  };


  //done
  Window_TitleCommand.prototype.maxCols = function() {
    return 3;
  };

  //done
  Window_TitleCommand.prototype.itemTextAlign = function() {
    return 'center';
  };

  //Done
  Window_TitleCommand.prototype.windowWidth = function() {
    return TSR.Title.window_width * this.maxCols();
  };

  //Done
  if (Window_TitleCommand.prototype.numVisibleRows() === 1) {


    Window_TitleCommand.prototype.cursorUp = function(wrap) {
    };

    Window_TitleCommand.prototype.cursorDown = function(wrap) {
    };

    Window_TitleCommand.prototype.cursorRight = function(wrap) {
      var index = this.index();
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      if (index < maxItems - 1 - maxCols || (wrap && this.isHorizontal())) {
          this.select((index + 1) % maxItems);
      }
    };

    Window_TitleCommand.prototype.cursorLeft = function(wrap) {
      var index = this.index();
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      if (index > maxCols || (wrap && this.isHorizontal())) {
          this.select((index - 1 + maxItems) % maxItems);
      }
    };
  }

  //done
  Window_TitleCommand.prototype.playCursorSound = function(row) {
    if (row === this.row()) {
        SoundManager.playCursor();
      } else {
        if (Window_TitleCommand.prototype.numVisibleRows() === 1 &&
                                              this.maxCols() > 1) {
          SoundManager.playMagicEvasion();
        } else {
          SoundManager.playCursor();
        }    
      }
  };

  //done
  Window_TitleCommand.prototype.processOk = function() {
    if (this.isCurrentItemEnabled() && !this._cursorIsMoving) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
        Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
    } else {
        if (!this._cursorIsMoving) this.playBuzzerSound();
    }
};


  //done
Window_TitleCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
 };

 Window_TitleCommand._lastCommandSymbol = null;

//done
 Window_TitleCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
  }; 

 //Done
  Window_TitleCommand.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();

    this.resetCursorEffects(this._cursorRect);

  };

  //Done
  Window_TitleCommand.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = false;
  };

  //Done
  Window_TitleCommand.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.redrawItem(this.index());
  };

  //done
  Window_TitleCommand.prototype.resetCursorEffects = function(cursor) {
    this._text_ratio          = 1;
    this._textIncrease        = false;
    this._digitIndex          = 0;
    this._digitGoesLeft       = false;
    this._textIndex           = 0;
    this._outlineOpacity      = 0.2;
    this._cursor_ratio        = 1;
    this._cursorIsMoving      = false;
    this._cursor_xPos         = cursor.x
    cursor.index              = this.index();
    for (let i = 0; i < this.maxItems(); i++) {
      this.redrawItem(i)
    }
  };

  //Done
  Window_TitleCommand.prototype.drawItem = function(index) {
    let cursor = this._bitmapCursor;
    let rect = this.itemRectForText(index);
    let name = this.commandName(index);
    let x = rect.x;
    let width = rect.width;
    this.contents.fontFace = TSR.Title.window_fontStyle;
    this.contents.fontSize = TSR.Title.window_fontSize;
    this.contents.outlineWidth = 4;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    let pad = this.contents.fontSize / 4.66;
    if (TSR.Title.window_type === 'horizontal' && this.numVisibleRows() === 1) x += 12
    let color = TSR.Title.window_color;
    this.changeTextColor(this.textColor(color));
    this.changePaintOpacity(this.isCommandEnabled(index));
    let align = this.TitleTextAlign();
    if ((cursor && cursor.index === index && !this._cursorIsMoving) || (!cursor && this._cursorRect.index === index)) {

      let effect = TSR.Title.defCursor_textEffect
      if (effect !== 'none') x = this.setAlign(name, x, width, align);
      if (effect === 'accordeon') {
        this.accordeon(index, name, x, rect.y, width, align);
      } else {
        this.drawText(name, x, rect.y, width, align);
      }
    } else {
      this.drawText(name, x, rect.y, width, align);
    }
  };

  //Done
  Window_TitleCommand.prototype.TitleTextAlign = function() {
    return TSR.Title.window_align;
  };
  
  //done
  Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = TSR.Title.window_x - this.contents.width / 2;
    this.y = TSR.Title.window_y;
    let type = this.TitleWindowBackground()
    this.setBackgroundType(type);
  };

  //done
  Window_TitleCommand.prototype.TitleWindowBackground = function() {
   return 2
  };

  //done
Window_TitleCommand.prototype.makeCommandList = function () {
    let list = ['Continue', 'New Game', 'Load', 'multiplayer', 'Options', 'Exit'];
    for (let i = 0; i < list.length; i++) {
        let cmd = list[i].toLowerCase();
        if (cmd.includes('new game')) {
            this.addCommand("Novo jogo", 'newGame');
        } else if (cmd.includes('load')) {
            this.addCommand("Carregar", 'continue', this.isContinueEnabled());
            this.addCommand('Multiplayer', 'multiplayer');
        } else if (cmd.includes('options')) {
            this.addCommand("Options", 'options');
        } else if (cmd.includes('credits')) {
            this.addCommand("Credits", 'credits');
        } else if (cmd.includes('exit')) {
            if (this.EnableExitCommand()) {
                this.addCommand("Exit", 'Exit');
            }
        }
    }
};


  Window_TitleCommand.prototype.EnableExitCommand = function() {
    return TSR.Title.exit_title
  };
  
  Window_TitleCommand.prototype.selectLast = function() {
    if (Window_TitleCommand._lastCommandSymbol) {
        this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
    } else if (this.isContinueEnabled()) {
        this.selectSymbol('continue');
    }
  };

  Window_TitleCommand.prototype.isContinueEnabled = function() {
    return DataManager.isAnySavefileExists();
  };


//== Window_preTitle ==================================

//done
  function Window_preTitle() {
    this.initialize.apply(this, arguments);
  }

  //done
  Window_preTitle.prototype = Object.create(Window_Command.prototype);
  Window_preTitle.prototype.constructor = Window_preTitle;

  //done
  Window_preTitle.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.setBackgroundType(2)
    this.updatePlacement();
    this.openness = 0;
    this._text_ratio = 1;
    this._textIncrease = false;
    this._digitIndex = 0;
    this._digitGoesLeft = false;
    this._textIndex = 0;
    this._outlineOpacity = 0.2
    this._fontSize = TSR.Title.preTitle_fontSize;
  };

  //done
  Window_preTitle.prototype.windowWidth = function() {
    return TSR.Title.preTitle_width; 
  };

  //done
  Window_preTitle.prototype.lineHeight = function() {
    let fontSize = TSR.Title.preTitle_fontSize,
             pad = fontSize / 4.66
    return fontSize + pad * 2;
  };

  //Done
  Window_preTitle.prototype.updatePlacement = function() {
    this.x = TSR.Title.preTitle_x;
    this.y = TSR.Title.preTitle_y;
  };

  //done
  Window_preTitle.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = false;
  };

  //done
  Window_preTitle.prototype.makeCommandList = function() {
    this.addCommand(TSR.Title.preTitle_text, 'Start');
  };

  //done
 Window_preTitle.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.redrawItem(this.index());
    if (this._animationCount >= 60 && !this._windowIsOpen) {
       this.open()
       this._windowIsOpen = true;
    }
 };

 //done
 Window_preTitle.prototype.drawItem = function(index) {
    let rect  = this.itemRectForText(index),
       width  = rect.width,
       align  = this.itemTextAlign(),
        name  = this.commandName(index),
           x  = rect.x,
       color  = TSR.Title.preTitle_color;
    this.changeTextColor(this.textColor(color));
    this.contents.fontFace = TSR.Title.window_fontStyle;
    this.contents.fontSize = this._fontSize;

    this.contents.outlineWidth = 5;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    if (TSR.Title.preTitle_blink) {  
      let outlinecolor = this.textColor(TSR.Title.preTitle_blinkColor);
      this.setOutlineOpacity(outlinecolor); 
    }
    let effect = TSR.Title.preTitle_textEffect;
    if (effect !== 'none') x = this.setAlign(name, x, rect.width, align);
    if (effect === 'accordeon') {     
      this.accordeon(index, name, x, rect.y, rect.width, align);    
    } else {
      this.drawText(name, x, rect.y, width, align);
    }
 };

 //done
 Window_preTitle.prototype.itemTextAlign = function() {
    return 'center';
 };

 //done
  Window_preTitle.prototype.processHandling = function() {
    if (this.isOpenAndActive()) {
        if (this.isOkEnabled() && Input.isAnyKeyPressed()) {
            this.processOk();
        } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            this.processCancel();
        } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.processPagedown();
        } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.processPageup();
        }
    }
  };

  //done
  Window_preTitle.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        AudioManager.playSe({ name: "coin1", pan: 0, pitch: 100, volume: 100 });
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
  };



//== Window_GameEnd ==================================

  Window_GameEnd.prototype.makeCommandList = function() {
    if ($gameParty.isAllDead()) {
      if (this.isContinueEnabled()) {
        this.addCommand("Carregar jogo",   'continuer');
      }
      this.addCommand("Novo Jogo",   'newGame');
      this.addCommand("Sair pro menu", 'to Title');
      this.addCommand("Sair do jogo", 'Exit');
    } else {
      this.addCommand("Sair pro menu", 'to Title');
      if (this.EnableCommand()) this.addCommand("Sair do jogo", 'Exit');
      this.addCommand("Cancelar",  'cancel');
    }
  };

  Window_GameEnd.prototype.isContinueEnabled = function() {
    return DataManager.isAnySavefileExists();
  };

  Window_GameEnd.prototype.EnableCommand = function() {
    return TSR.Title.exit_menu
  };



