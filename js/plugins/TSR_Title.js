
var SAF = SAF || {};
SAF.Title = SAF.Title || {};

var Imported = Imported || {};
Imported.TSR_Title = true;


//== PARAMETERS ============================================================================

 SAF.Parameters = PluginManager.parameters('TSR_Title');



   ///Title window parameters

 SAF.Title.window_CmdList    = String(SAF.Parameters['Window Command List']) || null ;
 SAF.Title.window_type       = String(SAF.Parameters['Window Menu Type']);
 SAF.Title.window_BGtype     = String(SAF.Parameters['Window Background']);
 SAF.Title.window_x          = String(SAF.Parameters['Window X']);
 SAF.Title.window_x          = eval(SAF.Title.window_x);
 SAF.Title.window_y          = String(SAF.Parameters['Window Y']);
 SAF.Title.window_y          = eval(SAF.Title.window_y);
 SAF.Title.window_width      = String(SAF.Parameters['Window Width']);
 SAF.Title.window_width      = eval(SAF.Title.window_width);
 SAF.Title.window_rows       = Number(SAF.Parameters['Window Visible Rows']);
 SAF.Title.window_cols       = Number(SAF.Parameters['Window Visible Cols']);
 SAF.Title.window_color      = Number(SAF.Parameters['Window Text Color']);
 SAF.Title.window_fontStyle  = String(SAF.Parameters['Window Text Font']);
 SAF.Title.window_fontSize   = Number(SAF.Parameters['Window Font Size']);
 SAF.Title.window_align      = String(SAF.Parameters['Window Text Align']);



   ///Default cursor parameters

 SAF.Title.defCursor_enable      = String(SAF.Parameters['Enable Default Cursor']);
 SAF.Title.defCursor_enable      = eval(SAF.Title.defCursor_enable);
 SAF.Title.defCursor_blink       = String(SAF.Parameters['Outline Opacity Blink']);
 SAF.Title.defCursor_blink       = eval(SAF.Title.defCursor_blink);
 SAF.Title.defCursor_blinkColor  = Number(SAF.Parameters['Opacity Blink Color']);
 SAF.Title.defCursor_textEffect  = String(SAF.Parameters['Selected Text Effect']);



//press any key
  Input.isAnyKeyPressed = function() {
    for (let i in Input.keyMapper) {
      if (Input.isRepeated(Input.keyMapper[i])) return true;
    }
  };


//== Scene_Title =====================================

//done good
  Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    if (!SAF.Title._titleStarted && SAF.Title.preTitle_text) {
      this.createPreTitleWindow();
    } else {
        SAF.Title._titleStarted = true;
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
      if (SAF.Title._titleStarted && !this._StartedAndOpen && !this._startCounter) {
        this._commandWindow.open();
        this._StartedAndOpen = true;
      }
    Scene_Base.prototype.update.call(this);
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
    let list = ['new game','multiplayer', 'load', 'options', 'exit'];
    for (let i = 0; i < list.length; i++) {
        let command = list[i];
        if (command.includes('new game')) {
            this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
        } else if (command.includes('load')) {
            this._commandWindow.setHandler('continue', this.commandLoadGame.bind(this));
            this._commandWindow.setHandler('multiplayer', this.commandMulti.bind(this));
        } else if (command.includes('options')) {
            this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        } else if (command.includes('exit')) {
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

      this.fadeOutAll();

    SceneManager.goto(Scene_Map);
  };

  //Done good
  Scene_Title.prototype.commandLoadGame = function() {
    if (this._commandWindow) this._commandWindow.close();
    SceneManager.push(Scene_Load);
  };


  //done but need to see again
DataManager.setupMultiGame = function() {
    this.createGameObjects();
    this.selectSavefileForNewGame();
    $gameParty.setupStartingMembers();
    $gamePlayer.reserveTransfer(28, 9,  11);
    Graphics.frameCount = 0;
};

//Done good
Scene_Title.prototype.commandMulti = function () {
    DataManager.setupMultiGame();
    if (this._commandWindow) this._commandWindow.close();
    this.fadeOutAll();

    SceneManager.goto(Scene_Map);
};

    //Done good
  Scene_Title.prototype.LoadSuccess = function() {
    if (this._commandWindow) this._commandWindow.close();
    SoundManager.playLoad();
    this.fadeOutAll();
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  //done good
  Scene_Title.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
  };

  //Done good
  Scene_Title.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
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


  //Done good
  Window_Selectable.prototype.accordeon = function(index, name, x, y, width, align) {
    let preWidth = this.textWidth(name);
    width = this.changeWidth(name, preWidth);
    x += (preWidth - width) / 2;
    this.drawText(name, x, y, width, align);
  }


  //done good i guess
  Window_Selectable.prototype.changeWidth = function(name, width) {
    if (this._textIncrease) {
      if (this._text_ratio < 1) {
        this._text_ratio += 0.01;
        width *= this._text_ratio * this.textWidth(name) / width;
        if (this._text_ratio >= 0.99) this._textIncrease = false;
      }
    } else {
      if (this._text_ratio > 0.5) {
        this._text_ratio -= 0.01;
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
    return SAF.Title.window_width * this.maxCols();
  };

  //Done
  function checkCursor() {
    Window_TitleCommand.prototype.cursorUp = function(wrap) {
    };

    Window_TitleCommand.prototype.cursorDown = function(wrap) {
    };

    Window_TitleCommand.prototype.cursorRight = function(wrap) {
      var index = this.index();
      var maxItems = this.maxItems();
      var maxCols = 3;
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
  checkCursor();

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
    this.contents.fontFace = SAF.Title.window_fontStyle;
    this.contents.fontSize = SAF.Title.window_fontSize;
    this.contents.outlineWidth = 4;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    x += 12
    let color = SAF.Title.window_color;
    this.changeTextColor(this.textColor(color));
    this.changePaintOpacity(this.isCommandEnabled(index));
    let align = "center";
    if ((cursor && cursor.index === index && !this._cursorIsMoving) || (!cursor && this._cursorRect.index === index)) {

      let effect = SAF.Title.defCursor_textEffect
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


  
  //done
  Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = SAF.Title.window_x - this.contents.width / 2;
    this.y = SAF.Title.window_y;
    this.setBackgroundType(2);
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
        } else if (cmd.includes('exit')) {
            this.addCommand("Exit", 'Exit');
        }
    }
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


//== Window_GameEnd ==================================

  Window_GameEnd.prototype.makeCommandList = function() {
    if ($gameParty.isAllDead()) {
      if (this.isContinueEnabled()) {
        this.addCommand("Carregar jogo",   'load');
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
    return SAF.Title.exit_menu
  };



