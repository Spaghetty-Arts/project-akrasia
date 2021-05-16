var Imported = Imported || {};
Imported.RS_InputDialog = true;

var RS = RS || {};
RS.InputDialog = RS.InputDialog || {};
RS.InputDialog.Params = RS.InputDialog.Params || {};
RS.Utils = RS.Utils || {};

function Scene_InputDialog() {
    this.initialize.apply(this, arguments);
}

(function () {

    var parameters = $plugins.filter(function (i) {
        return i.description.contains('<RS_InputDialog>');
    });

    parameters = (parameters.length > 0) && parameters[0].parameters;



    //============================================================================
    // Global Variables in RS.InputDialog
    //============================================================================

    RS.InputDialog.Params.textBoxWidth = 488;
    RS.InputDialog.Params.textBoxHeight = 36;
    RS.InputDialog.Params.variableID = Number(parameters['variable ID'] || 3);

    RS.InputDialog.Params.debug = Boolean(parameters['debug'] === 'true');

    let passHint = "Digita uma password";
    let loginHint = "Digita um username";

    RS.InputDialog.Params.inputDirection = String(parameters['direction'] || 'ltr');

    RS.InputDialog.Params.nMaxLength = parseInt(parameters['Max Length'] || '6');

    RS.InputDialog.Params.szTextBoxId = 'md_textBox';
    RS.InputDialog.Params.szFieldId = 'md_inputField';

    RS.InputDialog.Params.nCheckScreenLock = 8000;

    RS.InputDialog.Params.okButtonName = "Ok";
    RS.InputDialog.Params.cancelButtonName = "Cancelar";


    RS.InputDialog.Params.pos = new PIXI.Point(0, 0);
    RS.InputDialog.Params.isCenterAlignment = true;

    //============================================================================
    // public methods in RS.InputDialog
    //============================================================================

    RS.InputDialog.createInstance = function() {
        SceneManager.push(Scene_InputDialog);
    };

    RS.InputDialog.setRect = function () {
        "use strict";

        var query, textBox, OkButton, CancelButton, textBox2;

        query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text][id=user]`;
        textBox = document.querySelector(query);

        query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=password][id=pass]`;
        textBox2 = document.querySelector(query);

        query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-OkBtn]`;
        OkButton = document.querySelector(query);

        query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=inputDialog-CancelBtn]`;
        CancelButton = document.querySelector(query);

        if(textBox) {
            textBox.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(2 * Graphics._realScale) + "em";
            textBox.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
            textBox.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';
        }

        if(textBox2) {
            textBox2.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(2 * Graphics._realScale) + "em";
            textBox2.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
            textBox2.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';
        }

        if(OkButton) OkButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(1 * Graphics._realScale) + "em";
        if(CancelButton) CancelButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(1 * Graphics._realScale) + "em";

    };

    RS.InputDialog.getScreenWidth = function (value) {
        return value;
    };

    RS.InputDialog.getScreenHeight = function (value) {
        return value;
    };

    //============================================================================
    // Input
    //============================================================================

    var original_Input_shouldPreventDefault = Input._shouldPreventDefault;
    var dialog_Input_shouldPreventDefault = function(keyCode) {
        switch (keyCode) {
            case 33:    // pageup
            case 34:    // pagedown
            // case 37:    // left arrow
            case 38:    // up arrow
            // case 39:    // right arrow
            case 40:    // down arrow
                return true;
        }
        return false;
    };

    //============================================================================
    // TextBox
    //============================================================================

    function TextBox() {
        this.initialize.apply(this, arguments);
    };

    TextBox.BACK_SPACE = 8;
    TextBox.ENTER = 13;
    TextBox.ESC = 27;
    TextBox.IS_NOT_CHAR = 32;
    TextBox.KEYS_ARRAY = 255;

    TextBox.prototype.initialize = function(fieldID, textBoxID)  {
        this._fieldId = fieldID;
        this._textBoxID = textBoxID;
        this._lastInputTime = performance.now();
        this._ready = false;
        this.prepareElement(fieldID);
        this.createTextBox();
    };

    TextBox.prototype.startToConvertInput = function () {
        Input._shouldPreventDefault = dialog_Input_shouldPreventDefault;
    };

    TextBox.prototype.startToOriginalInput = function () {
        Input._shouldPreventDefault = original_Input_shouldPreventDefault;
    };

    TextBox.prototype.createTextBox = function() {

        "use strict";

        var field = document.getElementById(this._fieldId);

        var style = `
    .inputDialogContainer {
      min-width : 10em;
      max-width : 2.5em;
      top : 0em;
      left : 0em;
      width : 10em;
      height : 2.5em;
      display : flex;
      flex-flow : column wrap;
      align-items : left;
      justify-content : left;
      padding : 0;
      margin : 0;
      box-sizing : border-box;
      resize : both;
      font-size: 16px!important;
  }
  
  .inputDialog {
      top : 0em;
      left : 0em;
      right : 0em;
      bottom : 0em;
      z-index : 1000;
      opacity : 0.8;
      position : relative;
      background-color : #ffffff;
      border : 2px solid #414141;
      border-radius : 10px;
      text-shadow : 0px 1px 3px #696969;
      font-family : arial;
      color : #1a1a1a;
      outline : none;
      font-size: 1rem!important;
  }
  
  .defaultButton {
      opacity : 0.8;
      font-family : arial;
      border : 1px solid rgb(73, 73, 73);
      background-image: -webkit-linear-gradient(top, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 100%);
      color : rgb(19, 19, 19);
      text-shadow : rgba(105, 105, 105, 0.7) 0 1px 0;
      cursor : pointer;
      border-radius : 0.5em;
      box-sizing : border-box;
      box-shadow : 0 1px 4px rgba(78, 78, 78, 0.6);
      font-size : 1rem!important;
  }
  
  .row {
      width : 70%;
      height: 1rem;
  }
  
  .col {
      width : 70%;
      height: 1rem;
  }
  

  @media screen and (min-width : 768px) and (max-width : 1000px) {
      .defaultButton {
          font-size : 1rem!important;
      }
      .row {
          width : 100%;
          height: 2rem;
      }
      .col {
          width : 100%;
          height: 2rem;
      }
      .inputDialog {
          font-size : 1rem!important;
      }
  }
	  `;


        var divInnerHTML = `
    <style>
    ${style}
    </style>
    <table class="inputDialogContainer">
  		<tr class="row">
  			<td class="col">
  				<input class="inputDialog" type="text" id="user" placeholder="${loginHint}">
  				<input class="inputDialog" type="text" id="user" placeholder="${loginHint}" hidden>
  			</td>
  		</tr>
  		<tr class="row">
  			<td class="col">
  				<input class="inputDialog" type="password" id="pass" placeholder="${passHint}">
  			</td>
  		</tr>
  		<tr class="row" valign="bottom">
  			<td class="col" align="right">
  				<input class="defaultButton" id="inputDialog-OkBtn" type="button" value="Confirmar" name="">
                <input class="defaultButton" id="inputDialog-CancelBtn" type="button" value="Cancelar" name="">
  			</td>
  		</tr>
    <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
  	</table>
    `;

        field.innerHTML = divInnerHTML;

    };

    TextBox.onLoadAfterInnerHTML = function () {
        if(SceneManager._scene) {
            if( (SceneManager._scene instanceof Scene_InputDialog)) {
                if(SceneManager._scene._textBox) {
                    SceneManager._scene._textBox.addAllEventListener();
                }
            }
        }
    };

    TextBox.prototype.getTextBoxId = function (uP) {
        "use strict";
        if (uP == 0) {
            var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=text][id=user]`;
        } else {
            var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=password][id=pass]`;
        }
        return document.querySelector(query);
    };


    TextBox.prototype.getDefaultButtonId = function (id) {
        "use strict";
        id = id || "inputDialog-OkBtn";
        var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer tr td input[type=button][id=${id}]`;
        return document.querySelector(query);
    };

    TextBox.prototype.getMainContainer = function () {
        "use strict";
        var query = `div#${RS.InputDialog.Params.szFieldId} table.inputDialogContainer`;
        return document.querySelector(query);
    };

    TextBox.prototype.addAllEventListener = function () {

        this._textBox = this.getTextBoxId(0);
        this._textBox.maxLength = RS.InputDialog.Params.nMaxLength;
        this._textBox.max = RS.InputDialog.Params.nMaxLength;

        this._textBox.addEventListener('keydown', this.onKeyDown.bind(this), false);
        if(!Utils.isMobileDevice()) {
            this._textBox.addEventListener('focus', this.onFocus.bind(this), false);
        }
        this._textBox.addEventListener('blur', this.onBlur.bind(this), false);
        this._textBox.addEventListener('touchstart', this.getFocus.bind(this), false);
        this._textBox.addEventListener('autosize', this.onResize.bind(this), false);

        window.addEventListener('resize', this.onResize.bind(this), false);

        this.startToConvertInput();
        this.setRect();
        this.onResize();

        if(SceneManager._scene instanceof Scene_InputDialog) {
            this.getFocus();
            this.show();
        }

        this._ready = true;

    };

    TextBox.prototype.setRect = function () {
        var textBox = this.getTextBoxId(0);
        var textBox2 = this.getTextBoxId(1);
        var OkButton = this.getDefaultButtonId("inputDialog-OkBtn");
        var CancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");

        if(OkButton) OkButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(1 * Graphics._realScale) + "em";
        if(CancelButton) CancelButton.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(1 * Graphics._realScale) + "em";

        textBox.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(2 * Graphics._realScale) + "em";
        textBox.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
        textBox.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';

        textBox2.style.fontSize = (Utils.isMobileDevice()) ? '1rem':(2 * Graphics._realScale) + "em";
        textBox2.style.width = RS.InputDialog.getScreenWidth(RS.InputDialog.Params.textBoxWidth * Graphics._realScale) + 'px';
        textBox2.style.height = RS.InputDialog.getScreenHeight(RS.InputDialog.Params.textBoxHeight * Graphics._realScale) + 'px';

    };

    TextBox.prototype.prepareElement = function(id) {
        var field = document.createElement('div');
        field.id = id;
        field.style.position = 'absolute';
        field.style.left = '0';
        field.style.top = '0';
        field.style.right = '0';
        field.style.bottom = '0';
        field.style.width = '100%';
        field.style.height = '100%';
        field.style.zIndex = "0";
        field.style.display = "none"; // there is a bug occurs in nwjs 0.33.4
        document.body.appendChild(field);
        Graphics._centerElement(field);

        return field;
    };

    TextBox.prototype.setEvent = function(okFunc, cancelFunc) {
        var okButton = this.getDefaultButtonId("inputDialog-OkBtn");
        var cancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");
        okButton.addEventListener('click', function (e) {
            okFunc();
            e.preventDefault();
        }, false);
        cancelButton.addEventListener('click', function (e) {
            cancelFunc();
            e.preventDefault();
        }, false);
        okButton.addEventListener('touchend', function (e) {
            okFunc();
            e.preventDefault();
        }, false);
        cancelButton.addEventListener('touchend', function (e) {
            cancelFunc();
            e.preventDefault();
        }, false);

        this._okFunc = okFunc;
        this._cancelFunc = cancelFunc;
    };

    TextBox.prototype.terminateTextBox = function() {
        var field = document.getElementById(this._fieldId);

        if(field) {
            document.body.removeChild(field);
        }

        this.startToOriginalInput();
    };

    TextBox.prototype.onKeyDown = function(e) {
        var keyCode = e.which;
        if (keyCode < TextBox.IS_NOT_CHAR) {
            if(keyCode === TextBox.ENTER) {
                if(this._okFunc instanceof Function) this._okFunc();
            }
            if(keyCode === TextBox.ESC) {
                if(this._cancelFunc instanceof Function) this._cancelFunc();
            }
        }

        this._lastInputTime = performance.now();

    };

    TextBox.prototype.onFocus = function (e) {
        var text = this.getTextBoxId(0);
        if(text && Utils.isMobileDevice()) {
            text.style.bottom = RS.InputDialog.getScreenHeight(Graphics.boxHeight / 2) + 'px';
        }
    };

    TextBox.prototype.onBlur = function (e) {
        var text = this.getTextBoxId(0);
        if(text && Utils.isMobileDevice()) {
            text.style.bottom = '0';
            text.focus();
        }
        e.preventDefault();
    };

    TextBox.prototype.setPosition = function(x, y) {
        var self = this;
        var field = document.getElementById(self._fieldId);
        var mainContainer = self.getMainContainer();
        if(field) {
            field.style.margin = "0";
            mainContainer.style.margin = "0";
            if(x < 0) {
                x = 0;
            }
            if(x > Graphics.boxWidth - RS.InputDialog.Params.textBoxWidth) {
                x = Graphics.boxWidth - RS.InputDialog.Params.textBoxWidth;
            }
            if(y < 0) {
                y = 0;
            }
            if(y > Graphics.boxHeight - RS.InputDialog.Params.textBoxHeight) {
                y = Graphics.boxHeight - RS.InputDialog.Params.textBoxHeight;
            }
            mainContainer.style.left = Graphics._canvas.getBoundingClientRect().left + x + "px";
            mainContainer.style.top = Graphics._canvas.getBoundingClientRect().top + y + "px";
        }
    };

    TextBox.prototype.onResize = function () {
        var self = this;
        var field = document.getElementById(self._fieldId);
        var textBox = self.getTextBoxId(0);
        var mainContainer = self.getMainContainer();
        if(field && textBox) {
            Graphics._centerElement(field);
            Graphics._centerElement(mainContainer);
            this.setRect();

            var px = (Graphics.boxWidth / 2) - (RS.InputDialog.Params.textBoxWidth / 2);
            var py = (Graphics.boxHeight / 2) - (RS.InputDialog.Params.textBoxHeight / 2);
            this.setPosition(px, py);

        }
    };

    TextBox.prototype.isScreenLock = function () {
        var val = parseInt(performance.now() - this._lastInputTime);
        var ret = false;
        if(val >= RS.InputDialog.Params.nCheckScreenLock && this.isBusy()) ret = true;
        this._lastInputTime = performance.now();
        return ret;
    };

    TextBox.prototype.getTextLength = function() {
        var textBox = this.getTextBoxId(0);
        return textBox.value.length;
    };

    TextBox.prototype.getFocus = function() {
        var textBox = this.getTextBoxId(0);
        textBox.focus();
    };

    TextBox.prototype.setText = function (text, val) {
        if (val == 0) {
            var textBox = this.getTextBoxId(0);
            textBox.value = text || '';
        } else {
            textBox = this.getTextBoxId(1);
            textBox.value = text || '';
        }
        return textBox;
    };

    TextBox.prototype.getText = function (type) {
        if (type == 0) {
            var textBox = this.getTextBoxId(0);
        } else {
            textBox = this.getTextBoxId(1);
        }

        return textBox.value;
    };

    TextBox.prototype.hide = function () {
        var field = document.getElementById(this._fieldId);
        field.style.zIndex = 0;
        field.style.display = "none"; // for 0.33.4
    };

    TextBox.prototype.show = function () {
        var field = document.getElementById(this._fieldId);
        field.style.zIndex = 1000;
        field.style.display = "block"; // for 0.33.4
    };

    TextBox.prototype.isBusy = function () {
        var field = document.getElementById(this._fieldId);
        return field.style.zIndex > 0;
    };

    TextBox.prototype.removeAllEventListener = function () {
        this._okFunc = null;
        this._cancelFunc = null;

        if(this._textBox) {
            this._textBox.outerHTML = this._textBox.outerHTML;
        }

        window.removeEventListener('resize', this.onResize.bind(this), false);

    };

    TextBox.prototype.terminate =  function() {
        this.removeAllEventListener();
        this.terminateTextBox();
    };

    //============================================================================
    // Scene_InputDialog
    //============================================================================

    Scene_InputDialog.prototype = Object.create(Scene_Base.prototype);
    Scene_InputDialog.prototype.constructor = Scene_InputDialog;

    Scene_InputDialog.prototype.initialize = function() {
        Scene_Base.prototype.initialize.call(this);
    };

    Scene_InputDialog.prototype.create = function () {
        AudioManager.playBgm({"name": "multiplayer", "volume": 60, "pitch": 100, "pan": 0});
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createTextBox();
    }

    let lol = true;
    var alias_Scene_InputDialog_update = Scene_InputDialog.prototype.update;
    Scene_InputDialog.prototype.update = function () {
        alias_Scene_InputDialog_update.call(this);
        if(this.isScreenLock() && TouchInput.isTriggered()) {
            this.okResult();
        }
    };

    Scene_InputDialog.prototype.terminate = function () {
        Scene_Base.prototype.terminate.call(this);
        this._textBox.terminate();
        this._textBox = null;
        AudioManager.stopBgm();
    };

    Scene_InputDialog.prototype.isScreenLock = function () {
        return this._textBox.isScreenLock();
    };

    Scene_InputDialog.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
        this.addChild(this._backgroundSprite);
    };

    Scene_InputDialog.prototype.createTextBox = function () {
        this._textBox = new TextBox(RS.InputDialog.Params.szFieldId, RS.InputDialog.Params.szTextBoxId);
        this._textBox.setEvent(this.okResult.bind(this), this.cancelResult.bind(this));
        this._textBox.show();

    };

    Scene_InputDialog.prototype.okResult = function () {
        let user = this._textBox.getText(0) || '';
        let pass = this._textBox.getText(1) || '';

        $gameVariables.setValue(RS.InputDialog.Params.variableID, user);
        if(SceneManager._stack.length > 0) {
            TouchInput.clear();
            console.log(user + " " + pass);
            Input.clear();
            ajaxPostRequest(user, pass);
            this.popScene();
        };
    };

    Scene_InputDialog.prototype.cancelResult = function () {
        if(SceneManager._stack.length > 0) {
            TouchInput.clear();
            Input.clear();
            this.popScene();
        };
    };


    //============================================================================
    // Game_Interpreter
    //============================================================================

    var alias_Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if(this._waitMode === 'IME Mode') {
            return true;
        } else {
            return alias_Game_Interpreter_updateWaitMode.call(this);
        }
    };

    RS.InputDialog.isEqual = function(eq) {
        var data = String($gameVariables.value(RS.InputDialog.Params.variableID));
        eq = String(eq);
        return (data === eq);
    };

    Game_Interpreter.prototype.isEqualInputData = function(eq) {
        return RS.InputDialog.isEqual(eq);
    };

    var alias_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        alias_Game_Interpreter_pluginCommand.call(this, command, args);
        if(command === "InputDialog") {
            switch(args[0]) {
                case 'open':
                    RS.InputDialog.createInstance();
                    break;
            }
        }
    };

    window.TextBox = TextBox;

})();