
var SAF = SAF || {};
SAF.Title = SAF.Title || {};

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
    this.createCommandWindow();
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

      if (!this._StartedAndOpen && !this._startCounter) {
        this._commandWindow.open();
        this._StartedAndOpen = true;
      }
    Scene_Base.prototype.update.call(this);
  };

  //Done good
  Scene_Title.prototype.isBusy = function() {
    if (this._commandWindow) {
      return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    }
  };


  //commands good
Scene_Title.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_TitleCommand();
    let list = ['new game','multiplayer', 'load', 'options','Credits', 'exit'];
    for (let i = 0; i < list.length; i++) {
        let command = list[i];
        if (command.includes('new game')) {
            this._commandWindow.setHandler('newGame', this.commandNewGame.bind(this));
        } else if (command.includes('load')) {
            this._commandWindow.setHandler('continue', this.commandLoadGame.bind(this));
            this._commandWindow.setHandler('multiplayer', this.commandMulti.bind(this));
        } else if (command.includes('options')) {
            this._commandWindow.setHandler('options', this.commandOptions.bind(this));
        } else if (command.includes('Credits')) {
            this._commandWindow.setHandler('Credits', this.commandCredit.bind(this));
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



//Done good
Scene_Title.prototype.commandMulti = function () {
    enterLobby();
};

Scene_Title.prototype.commandCredit = function () {
    if (this._commandWindow) this._commandWindow.close();
    this.fadeOutAll();
    enterCredits();
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



//== Window_Selectable =====================================

//done good
  Window_Selectable.prototype.setAlign = function(name, x, width, align) {
    if (align === 'center') {
      x += width / 2 - this.textWidth(name) / 2;
    }
    return x;
  };


  //Done good
  Window_Selectable.prototype.inOut = function(index, name, x, y, width, align) {
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

  //Done good
  Window_TitleCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.updatePlacement();
    this.selectLast();
  };

  //done good
  Window_TitleCommand.prototype.numVisibleRows = function() {
    return 1;
  };


  //done good
  Window_TitleCommand.prototype.maxCols = function() {
    return 3;
  };

  //done
  Window_TitleCommand.prototype.itemTextAlign = function() {
    return 'center';
  };

  //Done
  Window_TitleCommand.prototype.windowWidth = function() {
    return 240 * this.maxCols();
  };

  //Done good
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

  //done good
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

  //done good
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


  //done good
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

  //Done good
  Window_TitleCommand.prototype.drawItem = function(index) {
    let cursor = this._bitmapCursor;
    let rect = this.itemRectForText(index);
    let name = this.commandName(index);
    let x = rect.x;
    let width = rect.width;
    this.contents.fontFace = "TitleFont";
    this.contents.fontSize = 25;
    this.contents.outlineWidth = 4;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    x += 12
    let color = 31;
    this.changeTextColor(this.textColor(color));
    this.changePaintOpacity(this.isCommandEnabled(index));
    let align = "center";
    if ((cursor && cursor.index === index && !this._cursorIsMoving) || (!cursor && this._cursorRect.index === index)) {

      let effect = "inOut";
      x = this.setAlign(name, x, width, align);
      if (effect === 'inOut') {
        this.inOut(index, name, x, rect.y, width, align);
      }
    } else {
      this.drawText(name, x, rect.y, width, align);
    }
  };


  //done good
  Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = (SceneManager._boxWidth / 2) - this.contents.width / 2;
    this.y = (SceneManager._boxHeight / 2) + 100;
    this.setBackgroundType(2);
  };


  //done
Window_TitleCommand.prototype.makeCommandList = function () {
    let list = ['Continue', 'New Game', 'Load', 'multiplayer', 'Options', 'Credits','Exit'];
    for (let i = 0; i < list.length; i++) {
        let cmd = list[i].toLowerCase();
        if (cmd.includes('new game')) {
            this.addCommand("Novo jogo", 'newGame');
        } else if (cmd.includes('load')) {
            this.addCommand("Carregar", 'continue', this.isContinueEnabled());
            this.addCommand('Multiplayer', 'multiplayer');
        } else if (cmd.includes('options')) {
            this.addCommand("Options", 'options');
            this.addCommand("Creditos", 'Credits');
        } else if (cmd.includes('exit')) {
            this.addCommand("Exit", 'Exit');
        }
    }
};


//Done
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




