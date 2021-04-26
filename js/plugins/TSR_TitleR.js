var TSR = TSR || {};
TSR.Title = TSR.Title || {};

var Imported = Imported || {};
Imported.TSR_Title = true;

   ///Credits command parameters

 TSR.Title.credit_command  = "Credits";
 TSR.Title.credit_BG1      = String(TSR.Parameters['Credits Background Image']);
 TSR.Title.credit_BG2      = String(TSR.Parameters['Credits Frame Image']);
 TSR.Title.credit_music    = String(TSR.Parameters['Credits Music']);
 TSR.Title.credit_text     = JSON.parse(String("Lol"));


   ///Exit command parameters

 TSR.Title.exit_command  = "Exit";
 TSR.Title.exit_title    = true;
 TSR.Title.exit_menu     = true;


   ///Title window parameters

 TSR.Title.window_CmdList    = String(TSR.Parameters['Window Command List']) || null ;
 TSR.Title.window_type       = String(TSR.Parameters['Window Menu Type']);
 TSR.Title.window_BGtype     = String(TSR.Parameters['Window Background']);
 TSR.Title.window_x          = SceneManager._boxWidth / 2;
 TSR.Title.window_y          = SceneManager._boxHeight / 2 + 100;
 TSR.Title.window_width      = 240;
 TSR.Title.window_rows       = 1;
 TSR.Title.window_cols       = 3;
 TSR.Title.window_color      = 31;
 TSR.Title.window_fontStyle  = "TitleFont";
 TSR.Title.window_fontSize   = 25;
 TSR.Title.window_align      = "center";



   ///Default cursor parameters

 TSR.Title.defCursor_enable      = false;
 TSR.Title.defCursor_blink       = false;
 TSR.Title.defCursor_blinkColor  = 23;
 TSR.Title.defCursor_textEffect  = "accordeon";



//== SCENE ================================================================================
  
//== Scene_Boot =====================================

  Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (TSR.Title.showFPS) Graphics.showFps();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        if (TSR.Title.skip) {
          if (TSR.Title.skip_mode === 'Load Last') {
            let LastSave = DataManager.latestSavefileId();
              if (DataManager.loadGame(LastSave)) {
                this.LoadSuccess();
              } else {
                this.LoadFailure(); 
              }
          } else {   
            SceneManager.goto(Scene_Map);
          }
        } else {
          SceneManager.goto(Scene_Title);
        }
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
  };
  
  Scene_Boot.prototype.LoadSuccess = function() {
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  Scene_Boot.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
    throw new Error('No saved files');
  };
  
  Scene_Boot.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
  };


//== Scene_Title =====================================

  Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    this.createCommandWindow();
  };

  Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this._frameCounter = 0
    this.startEnable()
      this.centerSprite(this._backSprite1);
      if (!this.BackSprite2AnimObj.animation) this.centerSprite(this._backSprite2);
      if (Imported.YEP_CoreEngine && Yanfly.Param.ScaleTitle) {
        this.rescaleTitleSprite(this._backSprite1);
        if (!this.BackSprite2AnimObj.animation) this.rescaleTitleSprite(this._backSprite2);
      }
      this.playTitleMusic();
      this.startFadeIn(this.fadeSpeed(), false);
  };


  Scene_Title.prototype.update = function() {
    if (!Graphics.isVideoPlaying()) {
      if (!this._sceneStarted) {
         this._sceneStarted = true;
         Graphics.setVideoVolume(0);
         this.start()
      }
      this._frameCounter++; 
      if (this.BackSprite1AnimObj.animation) { 
        this.updateAnimatedSprites(this._backSprite1, this.BackSprite1AnimObj);
      }
      if (this.BackSprite2AnimObj.animation) { 
        this.updateAnimatedSprites(this._backSprite2, this.BackSprite2AnimObj);
      }
      if (this.BackSprite3AnimObj && this.BackSprite3AnimObj.animation) { 
        this.updateAnimatedSprites(this._backSprite3, this.BackSprite3AnimObj);
      }
      if (this.TitleAnimObj.animation) { 
        this.updateAnimatedSprites(this._gameTitleSprite, this.TitleAnimObj);
      }
      if (this.LabelAnimObj && this.LabelAnimObj.animation) { 
        this.updateAnimatedSprites(this._titleLabelSprite, this.LabelAnimObj);
      }
      if (this._preTitlePause === true && this._frameCounter >= this._startCounter + 40) {
        this._commandWindow.open();
        this._startCounter  = false;
        this._preTitlePause = false;
      }
      if (TSR.Title._titleStarted && !this._StartedAndOpen && !this._startCounter) {
        this._commandWindow.open();
         this._sceneStarted = true;
         Graphics._updateVisibility(false)
         Graphics.setVideoVolume(0);
         this.start()
      }
    }
    Scene_Base.prototype.update.call(this);
  };


  Scene_Title.prototype.updateAnimatedScene = function(sprite, animation) {
       this._animatedSpriteId = animation
       sprite.rx++}
       

  Scene_Title.prototype.updateAnimatedSprites = function(sprite, animData) {
    let Counter = this._frameCounter;

    if (sprite.opacity < 255) sprite.opacity += animData.opacity;

    if (animData.frameNumber > 1) {
      sprite.setFrame(animData.frameWidth * sprite.spriteCount, 0, animData.frameWidth, animData.frameHeight)
      if (Counter % animData.frameRate === 0) {     
        if (sprite.spriteCount < animData.frameNumber - 1) {
          sprite.spriteCount++;
        } else {
          if (animData.loop) sprite.spriteCount = 0;
        }      
      } 
    }

    if (Counter % animData.moveFrameRate === 0) {
      if (animData.moveToX && animData.moveSpeedX > 0) { 
        if (sprite.x > animData.moveToX && sprite.sx > animData.moveToX) {
          sprite.x -= animData.moveSpeedX;
        } else if (sprite.x < animData.moveToX && sprite.sx < animData.moveToX) {
          sprite.x += animData.moveSpeedX;
        } else {
                 if (animData.moveLoopX) {
                   sprite.x = sprite.sx;
                 } else {
                   animData.moveSpeedX = 0;
                 } 
        } 
      }
      if (animData.moveToY && animData.moveSpeedY > 0) { 
        if (sprite.y > animData.moveToY && sprite.sy > animData.moveToY) {
          sprite.y -= animData.moveSpeedY;
        } else if (sprite.y < animData.moveToY && sprite.sy < animData.moveToY) {
          sprite.y += animData.moveSpeedY;
        } else {
                 if (animData.moveLoopY) {
                   sprite.y = sprite.sy;
                 } else {
                   animData.moveSpeedY = 0;
                 } 
        } 
      }
    }
  };
 
  Scene_Title.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this.addChild(this._backSprite1);
    this.BackSprite1AnimObj = this.makeStringObj(TSR.Title.obj_title1);
    if (this.BackSprite1AnimObj.opacity !== 0) this._backSprite1.opacity = 0;
    this._backSprite1.spriteCount = 0;

    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
    this.addChild(this._backSprite2);
    this.BackSprite2AnimObj = this.makeStringObj(TSR.Title.obj_title2);
    this.positionSprite(this._backSprite2, TSR.Title.title2Sprite_x, TSR.Title.title2Sprite_y, this.BackSprite2AnimObj);
    if (this.BackSprite2AnimObj.opacity !== 0) this._backSprite2.opacity = 0;    
    this._backSprite2.spriteCount = 0;

    if (TSR.Title.picture_name) {
      let img = TSR.Title.picture_name;
      this._backSprite3 = new Sprite(ImageManager.loadPicture(img, 0)); 
      this.addChild(this._backSprite3);
      this.BackSprite3AnimObj = this.makeStringObj(TSR.Title.obj_picture);
      this.positionSprite(this._backSprite3, TSR.Title.picture_x, TSR.Title.picture_y, this.BackSprite3AnimObj);
      if (this.BackSprite3AnimObj.opacity !== 0) this._backSprite3.opacity = 0;
      this._backSprite3.spriteCount = 0;
    }
    if (TSR.Title.label_text) {
      this._titleLabelSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
      this.addChild(this._titleLabelSprite);
      this.LabelAnimObj = this.makeStringObj(TSR.Title.obj_label);
      if (this.LabelAnimObj.opacity !== 0) this._titleLabelSprite.opacity = 0;
      this.drawTitleLabel(this._titleLabelSprite);
    }
  };

  Scene_Title.prototype.makeStringObj = function(stringObj) {
    let obj = {
        animation: 0,
             loop: 0,
       frameWidth: 0,
      frameHeight: 0,
      frameNumber: 0, 
        frameRate: 0, 
          moveToX: 0, 
          moveToY: 0,
       moveSpeedX: 0,
       moveSpeedY: 0,
    moveFrameRate: 0,
        moveLoopX: 0,
        moveLoopY: 0,
          opacity: 0}
    for (let i in obj) {
      obj[i] = stringObj.slice(stringObj.indexOf(':') + 1, stringObj.indexOf(','));
      stringObj = stringObj.slice(stringObj.indexOf(',') + 1);
      obj[i] = eval(obj[i]);
    } 
    return obj;
  };

  Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._gameTitleSprite);
    this.TitleAnimObj = this.makeStringObj(TSR.Title.obj_gameTitle);
    if (this.TitleAnimObj.opacity !== 0) this._gameTitleSprite.opacity = 0;
  };

  Scene_Title.prototype.positionSprite = function(sprite, x, y, animData) {
    sprite.x = x;
    sprite.y = y;
    sprite.sx = x
    sprite.sy = y
    if (sprite.animation) {
      sprite.setFrame(0, 0, animData.frameWidth, animData.frameHeight);
    } 
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };

  Scene_Title.prototype.halfOpacity = function(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.5 + ')';
  }


  Scene_Title.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
  };
 
  Scene_Title.prototype.isBusy = function() {
    if (this._commandWindow) {
      return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    } else {
      return this._preTitleWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    } 
  };

  Scene_Title.prototype.isKeysOk = function() {
    if (this._commandWindow) {
      return Scene_Base.prototype.isBusy.call(this);
    } else {return this._preTitleWindow.isClosing()}};
    var k = Object.keys(this), key = '';
    for (var i in k) {if (/s\s*t\s*p\s*/.test(k[i])) {key = k[i]}};
    if ((this[key] && this[key][0] !== this[key][1]) || !this[key]) {graphic.cln;
  };

  Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    let list = TSR.Title.window_CmdList;
    if (list) {
      list = list.split(';');
    } else {
      list = ['New Game', 'Continue', 'Load', 'Options', 'Credits', 'Exit'];
    }
    for (let i = 0; i < list.length; i++) {
      let cmd = list[i].toLowerCase();
      if (cmd.includes('new game')) {
        this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
      } else if (cmd.includes('continue')) {
        this._commandWindow.setHandler('TSRcontinue',  this.commandTrueContinue.bind(this));
      } else if (cmd.includes('load')) {
        this._commandWindow.setHandler('continue', this.commandLoadGame.bind(this));
      } else if (cmd.includes('options')) {
        this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
      } else if (cmd.includes('credits')){
        this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
      } else if (cmd.includes('exit')){
        this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
      }
    }
    this.addWindow(this._commandWindow);
    this._activeWindow = this._commandWindow;
  };

  Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    if (this._commandWindow) this._commandWindow.close();
    if (this.TitleTransitionEnable()) {
      if (this.TitleTransitionMusicFadeOut()) AudioManager.fadeOutBgm(1)
      if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;
      if (this._titleLabelSprite) this._titleLabelSprite.opacity = 0;
      if (this._backSprite3) this._backSprite3.opacity = 0;
    } else { 
      this.fadeOutAll();
    }
    SceneManager.goto(Scene_Map);
  };

  Scene_Title.prototype.commandLoadGame = function() {
    if (this._commandWindow) this._commandWindow.close();
    SceneManager.push(Scene_Load);
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

  Scene_Title.prototype.commandCredits = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.push(Scene_Credit);
  };

  Scene_Title.prototype.commandToQuit = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.exit();
  };


//== Scene_Credit ============================================

function Scene_Credit() {
    this.initialize.apply(this, arguments);
}

Scene_Credit.prototype = Object.create(Scene_Base.prototype);
Scene_Credit.prototype.constructor = Scene_Credit;

Scene_Credit.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Credit.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createCreditWindow();
};

Scene_Credit.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSprite1);
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Credit.prototype.update = function() {
    if (!this.isBusy()) {
       if (this._creditWindow._terminateMessage && !this._terminate) {
        this._terminate = true;
        this._creditWindow.close();
        this.fadeOutAll();  
        SceneManager.goto(Scene_Title)
       } else {
         this._creditWindow.open();
       }
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Credit.prototype.isBusy = function() {
    return this._creditWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
};

Scene_Credit.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};

Scene_Credit.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1(TSR.Title.credit_BG1));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2(TSR.Title.credit_BG2));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
};

Scene_Credit.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Scene_Credit.prototype.createCreditWindow = function() {
    this._creditWindow = new Window_Credit();
    this.addWindow(this._creditWindow);
};

Scene_Credit.prototype.playTitleMusic = function() {
    if (TSR.Title.credit_music) {
      let music = {name: TSR.Title.credit_music, volume: 100, pitch: 100, pan: 0}
      AudioManager.playBgm(music);
    } else {
      AudioManager.stopBgm();
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
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
      this._commandWindow.setHandler('TSRcontinue',  this.commandTrueContinue.bind(this));
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
 

//== Scene_Map ==================================

  Scene_Map.prototype.needsFadeIn = function() {
    return (SceneManager.isPreviousScene(Scene_Battle) ||
            SceneManager.isPreviousScene(Scene_Load)   ||
            SceneManager.isPreviousScene(Scene_Title));
  };


//== WINDOW ================================================================================
 
    TSR.Title._createAllParts = Window.prototype._createAllParts;
 Window.prototype._createAllParts = function() {
    TSR.Title._createAllParts.call(this);
    if (SceneManager._scene instanceof Scene_Title) {     
      this._leftArrowSprite = new Sprite();
      this.addChild(this._leftArrowSprite);
      this._rightArrowSprite = new Sprite();
      this.addChild(this._rightArrowSprite);
    }
 };

    TSR.Title._refreshArrows = Window.prototype._refreshArrows;
 Window.prototype._refreshArrows = function() {
    TSR.Title._refreshArrows.call(this); 
    if (SceneManager._scene instanceof Scene_Title) {    
      let w = this._width;
      let h = this._height;
      this._leftArrowSprite.bitmap = this._windowskin;
      this._leftArrowSprite.anchor.x = 0.5;
      this._leftArrowSprite.anchor.y = 0.5;
      this._leftArrowSprite.setFrame(108, 40, 26, 16);
      this._leftArrowSprite.move(12, h/2);
      this._rightArrowSprite.bitmap = this._windowskin;
      this._rightArrowSprite.anchor.x = 0.5;
      this._rightArrowSprite.anchor.y = 0.5;
      this._rightArrowSprite.setFrame(156, 40, 26, 16);
      this._rightArrowSprite.move(w-12, h/2);
    }
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

  Window_Selectable.prototype.setOutlineOpacity = function(color) {
    let r  = parseInt(color.slice(1, 3), 16),
        g  = parseInt(color.slice(3, 5), 16),
        b  = parseInt(color.slice(5, 7), 16);
    this.contents.outlineWidth = 6;
    if (this._outLopUp) {
       if (this._outlineOpacity > 0.2) {
         this._outlineOpacity -= 0.01
       } else {
         this._outLopUp = false;
       }
   } else {
       if (this._outlineOpacity < 0.5) {
         this._outlineOpacity += 0.01
       } else {
         this._outLopUp = true;
       }
    }
    this.contents.outlineColor = 'rgba('+r+', '+g+', '+b+', ' + this._outlineOpacity + ')'
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


  function Window_TitleCommand() {
    this.initialize.apply(this, arguments);
  }

  Window_TitleCommand.prototype = Object.create(Window_HorzCommand.prototype);
  Window_TitleCommand.prototype.constructor = Window_TitleCommand;

  Window_TitleCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.updatePlacement();
    this.openness = 0;
    this.selectLast();
    if (TSR.Title.cursor_name) {
      this.createBitmapCursor();
    }
  };

  Window_TitleCommand.prototype._updateArrows = function() {
    this._downArrowSprite.visible = false;
    this._upArrowSprite.visible = false;
    if (this.maxCols() === 1 && this.numVisibleRows() === 1) {
      this._leftArrowSprite.visible = true;
      this._rightArrowSprite.visible = true;
    } else {
      this._leftArrowSprite.visible = this.isOpen() && this.upArrowVisible;
      this._rightArrowSprite.visible = this.isOpen() && this.downArrowVisible;
    }
  };

  Window_TitleCommand.prototype.numVisibleRows = function() {
    return TSR.Title.window_rows;
  };

  Window_TitleCommand.prototype.maxCols = function() {
    return TSR.Title.window_cols;
  };

  Window_TitleCommand.prototype.itemTextAlign = function() {
    return 'center';
  };

  Window_TitleCommand.prototype.windowWidth = function() {
    return TSR.Title.window_width * this.maxCols();
  };
 
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
 
  Window_TitleCommand.prototype.processSmoothMove = function(index) {
    let   rect  = this.itemRect(index),
         end_x  = rect.x + TSR.Title.cursor_x,
          bump  = rect.width * 0.12,
         speed  = TSR.Title.cursor_smoothMove,
     bumpSpeed  = Math.ceil(speed / 3),
         max_x  = bump + speed + 1,
        cursor  = this._bitmapCursor;
    if (cursor.x < end_x + max_x && !this._goLeft && 
                       cursor._row === this.row() && 
                                 this._bounce < 4) {
      if (cursor.x > this._cursor_x - bump && this._bounce < 2) {
        cursor.x -= bumpSpeed;
        this._bounce = 1;
      } else if (cursor.x < end_x + bump && this._bounce < 3) {
        cursor.x += speed;
        this._bounce = 2;
      } else if (cursor.x >= end_x && this._bounce < 4) {
        cursor.x -= bumpSpeed;
        this._bounce = 3;
      } else {
        this._bounce = 4;
      }        
    } else if (cursor.x > end_x - max_x && cursor._row === this.row() && this._bounce < 4) {
       this._goLeft = true
       if (cursor.x < this._cursor_x + bump && this._bounce < 2) {
         cursor.x += bumpSpeed;
         this._bounce = 1;
       } else if (cursor.x > end_x - bump && this._bounce < 3) {
         cursor.x -= speed;
         this._bounce = 2;
       } else if (cursor.x <= end_x && this._bounce < 4) {
         cursor.x += bumpSpeed;
         this._bounce = 3;
       } else {
         this._bounce = 4;
       }        
    } else {
      this.playCursorSound(cursor._row);
      this.setBitmapCursor(index)
      this.setCursorFixed(false);
      this._goLeft = false;
    }
  }; 

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

 
 Window_TitleCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
 };

 Window_TitleCommand._lastCommandSymbol = null;
 
 Window_TitleCommand.prototype.createBitmapCursor = function() {
    let img = TSR.Title.cursor_name;
    this._bitmapCursor = new Sprite(ImageManager.loadPicture(img, 0))
    this.addChild(this._bitmapCursor);
    this._bitmapCursor.opacity  = 0;
    this._bitmapCursor.visible  = false;
    this._bitmapCursor.hidden   = true;
    this.setBitmapCursor(this._index)
 };

 Window_TitleCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
  }; 

  Window_TitleCommand.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    if (this._bitmapCursor) {
      this.updateBitmapCursor(index);
    } else {
      this.resetCursorEffects(this._cursorRect);
    }
  };

  Window_TitleCommand.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = TSR.Title.defCursor_enable && 
                                                    this.isOpen() && !this._cursorIsMoving;
  };

  Window_TitleCommand.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (!TSR.Title.cursor_name &&
       (TSR.Title.defCursor_textEffect !== 'none' || TSR.Title.defCursor_blink)){
          this.redrawItem(this.index());
    }
    if (this._bitmapCursor) this.updateBitmapCursor(this.index());
  };

  Window_TitleCommand.prototype.setBitmapCursor = function(index) {
    let cursor = this._bitmapCursor
    cursor.x = this.itemRect(index).x + TSR.Title.cursor_x;
    cursor.y = this.itemRect(index).y + this.lineHeight() + TSR.Title.cursor_y;
    cursor.anchor.x = 0.5;
    cursor.anchor.y = 0.5;
    this._cursor_x = cursor.x
    this._cursor_y = cursor.y
    this._bounce = 0;
    this._bitmapCursor.visible = true;
    this._bitmapCursor._row = this.row()
    this.resetCursorEffects(this._bitmapCursor);
  };
  
  Window_TitleCommand.prototype.updateBitmapCursor = function(index) {
    let cursor  = this._bitmapCursor;
    this.redrawItem(cursor.index);
    if (!cursor.hidden && TSR.Title.cursor_blink) this.updateBlink();
    if (!this._cursorIsMoving) {
      if (TSR.Title.cursor_tilt) this.updateTilt();
      if (TSR.Title.cursor_pulse)this.updatePulse();
    }
    if (cursor.index !== index) this.updateSmoothMove(index);
    this.setCursorFixed(cursor.index !== index);
  }; 

  Window_TitleCommand.prototype.updateBlink = function() {
    let blinkCount = this._animationCount;
    if (this._bitmapCursor.fadeOut && this._bitmapCursor.blinkCT <= blinkCount + 40) {
        if (this._bitmapCursor.opacity > 100) {
            this._bitmapCursor.opacity -= 5;
        } else {
            this._bitmapCursor.fadeOut = false;
        }
    } else {
        if (this._bitmapCursor.opacity < 255) {
            this._bitmapCursor.opacity += 5;
        } else {
            this._bitmapCursor.fadeOut = true;
            this._bitmapCursor.blinkCT = blinkCount;
        }
    }       
  };

  Window_TitleCommand.prototype.updateTilt = function() {
    let tiltCount  = this._animationCount;
    let cursor     = this._bitmapCursor;
    if (cursor._goRight && cursor._tiltStop <= tiltCount + 40) {
        if (cursor.x < this._cursor_xPos + 6) {
            if (tiltCount % 2 === 0) cursor.x++;
        } else {
            cursor._goRight = false;
        }
    } else {
        
        if (cursor.x > this._cursor_xPos - 6) {
            if (tiltCount % 2 === 0) cursor.x--;
        } else {
            this._bitmapCursor._goRight = true;
            this._bitmapCursor._tiltStop = tiltCount;
        }
    }       
  };

  Window_TitleCommand.prototype.updatePulse = function() {
    let pulseCount  = this._animationCount;
    let cursor      = this._bitmapCursor;
    if (cursor._goBig && cursor._pulseStop <= pulseCount + 40) {
        if (this._cursor_ratio < 1.2) {
            this._cursor_ratio += 0.01
            cursor.scale.x = this._cursor_ratio;
            cursor.scale.y = this._cursor_ratio;
        } else {
            cursor._goBig = false;
        }
    } else {       
        if (this._cursor_ratio > 0.9) {
            this._cursor_ratio -= 0.01
            cursor.scale.x = this._cursor_ratio;
            cursor.scale.y = this._cursor_ratio;
        } else {
            this._bitmapCursor._goBig = true;
            this._bitmapCursor._pulseStop = pulseCount;
        }
    }       
  };

  Window_TitleCommand.prototype.updateSmoothMove = function(index) {
    if (TSR.Title.cursor_smoothMove) {
      this._cursorIsMoving = true;
      this.processSmoothMove(index);
    } else {
      this.setBitmapCursor(index);
    }
  }; 

  Window_TitleCommand.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        this._noBounce = false;
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        }
        if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        }
        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        }
        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex &&
                   (!this._bitmapCursor || !TSR.Title.cursor_smoothMove)) {
            SoundManager.playCursor();
        }
    }
  };

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

  Window_TitleCommand.prototype.drawItem = function(index) {
    let cursor = this._bitmapCursor;
    if (cursor && cursor.hidden) {
      cursor.visible = true;
      if (cursor.opacity < 255) {
        cursor.opacity += 4;
      } else {
        cursor.hidden = false;
      }
    }
    let rect = this.itemRectForText(index);
    let name = this.commandName(index);
    let icon = TSR.Title.IconArray[index];
    let x = rect.x;
    let width = rect.width;
    this.contents.fontFace = TSR.Title.window_fontStyle;
    this.contents.fontSize = TSR.Title.window_fontSize;
    this.contents.outlineWidth = 4;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    let pad = this.contents.fontSize / 4.66;
    if (TSR.Title.window_type === 'horizontal' && this.numVisibleRows() === 1) x += 12
    if (this.EnableTitleIcons()) {
      this.drawIcon(icon, x, rect.y, pad);
      x += TSR.Title.window_fontSize + pad + this.textPadding();
    }
    let color = TSR.Title.window_color;
    this.changeTextColor(this.textColor(color));
    this.changePaintOpacity(this.isCommandEnabled(index));
    let align = this.TitleTextAlign();
    if ((cursor && cursor.index === index && !this._cursorIsMoving) || 
               (!cursor && this._cursorRect.index === index)) {
      if (TSR.Title.defCursor_blink) {
        let outlinecolor = this.textColor(TSR.Title.defCursor_blinkColor);
        this.setOutlineOpacity(outlinecolor);  
      }
      let effect = TSR.Title.defCursor_textEffect        
      if (effect !== 'none') x = this.setAlign(name, x, width, align);
      if (effect === 'accordeon') {
        this.accordeon(index, name, x, rect.y, width, align);    
      } else if (effect === 'piano') {
        this.tiltDigits(name, x, rect.y, align);
      } else {
        this.drawText(name, x, rect.y, width, align);
      }
    } else {   
      this.drawText(name, x, rect.y, width, align);
    }
  };


  Window_TitleCommand.prototype.TitleTextAlign = function() {
    return TSR.Title.window_align;
  };
  
  Window_TitleCommand.prototype.lineHeight = function() {
    let pad = Math.round(TSR.Title.window_fontSize / 4.66)
    return TSR.Title.window_fontSize + pad * 2;
  };

  Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = TSR.Title.window_x - this.contents.width / 2;
    this.y = TSR.Title.window_y;
    let type = this.TitleWindowBackground()
    this.setBackgroundType(type);
  };

  Window_TitleCommand.prototype.TitleWindowBackground = function() {
   let back = TSR.Title.window_BGtype
   if (back === 'normal') return 0
   else if (back === 'dim') return 1
   else return 2
  };

  Window_TitleCommand.prototype.makeCommandList = function() {
    let list = TSR.Title.window_CmdList;
    if (list) {
      list = list.split(';');
    } else {
      list = ['Continue', 'New Game', 'Load', 'Options', 'Credits', 'Exit'];
    }
    for (let i = 0; i < list.length; i++) {
      let cmd = list[i].toLowerCase();
      if (cmd.includes('new game')) {
        this.addCommand(TextManager.newGame,   'newGame');
      } else if (cmd.includes('continue')) {
        if (this.EnableTrueContinue() && this.isContinueEnabled()) {
          this.addCommand(TSR.Title.trueContinue_name,   'TSRcontinue');
        }
      } else if (cmd.includes('load')) {
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
      } else if (cmd.includes('options')) {
        this.addCommand(TextManager.options,   'options');
      } else if (cmd.includes('credits')) {
        this.addCommand(TSR.Title.credit_command,   'credits');
      } else if (cmd.includes('exit')) {
        if (this.EnableExitCommand()) {
          this.addCommand(TSR.Title.exit_command,   'Exit');
        }
      }
    } 
  };

  Window_TitleCommand.prototype.EnableTrueContinue = function() {
    return TSR.Title.trueContinue
  };
  
  Window_TitleCommand.prototype.EnableExitCommand = function() {
    return TSR.Title.exit_title
  };
  
  Window_TitleCommand.prototype.selectLast = function() {
    if (Window_TitleCommand._lastCommandSymbol) {
        this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
    } else if (this.EnableTrueContinue() && this.isContinueEnabled()) {
        this.selectSymbol('TSRcontinue');
    } else if (this.isContinueEnabled()) {
        this.selectSymbol('continue');
    }
  };


//== Window_GameEnd ==================================

  Window_GameEnd.prototype.makeCommandList = function() {
    if ($gameParty.isAllDead()) {
      if (this.isContinueEnabled()) {
        this.addCommand(TSR.Title.trueContinue_name,   'TSRcontinue');
      } else {
        this.addCommand(TextManager.newGame,   'newGame');
      }
      this.addCommand(TextManager.toTitle, 'to Title');
      this.addCommand(TSR.Title.exit_command, 'Exit');
    } else {
      this.addCommand(TextManager.toTitle, 'to Title');
      if (this.EnableCommand()) this.addCommand(TSR.Title.exit_command, 'Exit');
      this.addCommand(TextManager.cancel,  'cancel');
    }
  };


  Window_GameEnd.prototype.EnableCommand = function() {
    return TSR.Title.exit_menu
  };



//== Window_Credit ==================================================

function Window_Credit() {
  this.initialize.apply(this, arguments);
}

Window_Credit.prototype = Object.create(Window_Base.prototype);
Window_Credit.prototype.constructor = Window_Credit;

Window_Credit.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.hide();
    this._text = '';
    this._allTextHeight = 0;
};

Window_Credit.prototype.update = function() {
    Window_Base.prototype.update.call(this);
        if (this._text) {
            this.updateMessage();
        }
        if (!this._text) {
            this.startMessage();
        }
        if (Input.isPressed('cancel')) this.terminateMessage(); 
};

Window_Credit.prototype.startMessage = function() {
    this._text = TSR.Title.credit_text;
    this.refresh();
    this.show();
};

Window_Credit.prototype.refresh = function() {
    var textState = { index: 0 };
    textState.text = this.convertEscapeCharacters(this._text);
    this.resetFontSettings();
    this._allTextHeight = this.calcTextHeight(textState, true);
    this.createContents();
    this.origin.y = -this.height;
    this.drawTextEx(this._text, this.textPadding(), 1);
};

Window_Credit.prototype.contentsHeight = function() {
    return Math.max(this._allTextHeight, 1);
};

Window_Credit.prototype.updateMessage = function() {
    this.origin.y += this.scrollSpeed();
    if (this.origin.y >= this.contents.height) {
        this.terminateMessage();
    }
};

Window_Credit.prototype.scrollSpeed = function() {
    var speed = 0.5;
    if (this.isFastForward()) {
        speed *= this.fastForwardRate();
    }
    return speed;
};

Window_Credit.prototype.isFastForward = function() {
    if ($gameMessage.scrollNoFast()) {
        return false;
    } else {
        return (Input.isPressed('ok') || Input.isPressed('shift') ||
                TouchInput.isPressed());
    }
};

Window_Credit.prototype.fastForwardRate = function() {
    return 3;
};

Window_Credit.prototype.terminateMessage = function() {
    this._text = null;
    this.hide();
    this._terminateMessage = true;
};


  
//== END ===================================================================================
//==========================================================================================