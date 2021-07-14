
function Scene_InputDialog() {
    this.initialize.apply(this, arguments);
}

(function () {



    //============================================================================
    // Global Variables in RS.InputDialog
    //============================================================================

    let loginRegister;
    let userN;

    let textBoxWidth = 488;
    let textBoxHeight = 36;

    let nMaxLength = 6;

    let szTextBoxId = 'md_textBox';
    let szFieldId = 'md_inputField';

    let nCheckScreenLock = 8000;


    //============================================================================
    // public methods in InputDialog
    //============================================================================



    getScreenWidth = function (value) {
        return value;
    };

    getScreenHeight = function (value) {
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




        switch (loginRegister) {
            case 0:
                var divInnerHTML = `
                                    <link rel="stylesheet" type="text/css" href="css/form.css">
                                    <form autocomplete="off">
                                     <table class="inputDialogContainer resL" style="margin-bottom: 1000px">
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog res" type="email" id="email" placeholder="Digite um email" title="O email têm de ser válido e único" autocomplete="off">
                                            
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog res" type="text" id="user" placeholder="Digite um username" title="O username têm de ter pelo menos 8 caraters e ser único" autocomplete="off">
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username" autocomplete="off" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog res" type="password" id="pass" placeholder="Digite uma passowrd" title="A password têm de ter pelo menos 8 caraters, 1 letra mínuscula, 1 letra maiscula e 1 número" autocomplete="off">
                                            </td>
                                        </tr>
                                        <tr class="row" align="bottom">
                                            <td class="col" align="center">
                                                <input class="lol" id="inputDialog-OkBtn" type="button" value="Confirmar" name="">
                                                <input class="lol2" id="inputDialog-CancelBtn" type="button" value="Cancelar" name="">
                                            </td>
                                        </tr>
                                    <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
                                    </table>
                                    </form>
                                   
                                    `;
                break;
            case 1:
                var divInnerHTML = `
                                  <link rel="stylesheet" type="text/css" href="css/form.css">
                                   
                                    <table class="inputDialogContainer">
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog cyberpunk" type="email" id="email" placeholder="Digite um email" title="O email têm de estar registado" autocomplete="off">
                                                <input class="inputDialog" type="email" id="email" placeholder="Digite um email" autocomplete="off" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog cyberpunk" type="password" id="pass" placeholder="Digite uma passowrd" title="A password associada a conta"  autocomplete = 'new-password'>
                                            </td>
                                        </tr>
                                        <tr class="row" align="bottom">
                                            <td class="col" align="center">
                                                <input class="lol" id="inputDialog-OkBtn" type="button" value="Confirmar" name="">
                                                <input class="lol2" id="inputDialog-CancelBtn" type="button" value="Cancelar" name="">
                                            </td>
                                        </tr>
                                    <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
                                    </table>
                                    `;
                break;
            case 2:
                var divInnerHTML = `
                                    <link rel="stylesheet" type="text/css" href="css/form.css">
                                    <table class="inputDialogContainer">
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="email" id="email" placeholder="Digite um email" title="O email têm de estar registado" autocomplete="off">
                                                <input class="inputDialog" type="text" id="user" placeholder="" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="password" id="pass" placeholder="Digite uma passowrd" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row" align="bottom">
                                            <td class="col" align="center">
                                                <input class="lol" id="inputDialog-OkBtn" type="button" value="Confirmar" name="">
                                                <input class="lol2" id="inputDialog-CancelBtn" type="button" value="Cancelar" name="">
                                            </td>
                                        </tr>
                                    <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
                                    </table>
                                    `;
                break;
            case 3:
                var divInnerHTML = `
                                    <link rel="stylesheet" type="text/css" href="css/form.css">
                                    <table class="inputDialogContainer">
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="email" id="email" placeholder="Digite um email" title="O email têm de estar registado" autocomplete="off" hidden>
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username">
                                                <input class="inputDialog" type="text" id="user" placeholder="" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="password" id="pass" placeholder="Digite uma passowrd" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row" align="bottom">
                                            <td class="col" align="center">
                                                <input class="lol" id="inputDialog-OkBtn" type="button" value="Confirmar" name="">
                                                <input class="lol2" id="inputDialog-CancelBtn" type="button" value="Cancelar" name="">
                                            </td>
                                        </tr>
                                    <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
                                    </table>
                                    `;
                break;
            case 3:
                var divInnerHTML = `
                                    <link rel="stylesheet" type="text/css" href="css/form.css">
                                    <table class="inputDialogContainer">
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="email" id="email" placeholder="Digite um email" title="O email têm de estar registado" autocomplete="off" hidden>
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username">
                                                <input class="inputDialog" type="text" id="user" placeholder="" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="text" id="user" placeholder="Digite um username" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row">
                                            <td class="col">
                                                <input class="inputDialog" type="password" id="pass" placeholder="Digite uma passowrd" hidden>
                                            </td>
                                        </tr>
                                        <tr class="row" align="bottom">
                                            <td class="col" align="center">
                                                <input class="lol" id="inputDialog-OkBtn" type="button" value="Confirmar" name="">
                                                <input class="lol2" id="inputDialog-CancelBtn" type="button" value="Cancelar" name="">
                                            </td>
                                        </tr>
                                    <img src='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' onload='TextBox.onLoadAfterInnerHTML();this.parentNode.removeChild(this);'>
                                    </table>
                                    `;
                break;
        }


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
            var query = `div#${szFieldId} table.inputDialogContainer tr td input[type=email][id=email]`;
        } else if (uP == 1) {
            var query = `div#${szFieldId} table.inputDialogContainer tr td input[type=text][id=user]`;
        } else {
            var query = `div#${szFieldId} table.inputDialogContainer tr td input[type=password][id=pass]`;
        }
        return document.querySelector(query);
    };


    TextBox.prototype.getDefaultButtonId = function (id) {
        "use strict";
        id = id || "inputDialog-OkBtn";
        var query = `div#${szFieldId} table.inputDialogContainer tr td input[type=button][id=${id}]`;
        return document.querySelector(query);
    };

    TextBox.prototype.getMainContainer = function () {
        "use strict";
        var query = `div#${szFieldId} table.inputDialogContainer`;
        return document.querySelector(query);
    };

    TextBox.prototype.addAllEventListener = function () {

        this._textBox = this.getTextBoxId(0);


      
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
        var textBox3 = this.getTextBoxId(2);
        var OkButton = this.getDefaultButtonId("inputDialog-OkBtn");
        var CancelButton = this.getDefaultButtonId("inputDialog-CancelBtn");

        if(OkButton) OkButton.style.fontSize = (1 * Graphics._realScale) + "em";
        if(CancelButton) CancelButton.style.fontSize = (1 * Graphics._realScale) + "em";


        textBox.style.width = getScreenWidth(textBoxWidth * Graphics._realScale) + 'px';

        textBox2.style.width = getScreenWidth(textBoxWidth * Graphics._realScale) + 'px';

        textBox3.style.width = getScreenWidth(textBoxWidth * Graphics._realScale) + 'px';

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
    };

    TextBox.prototype.onBlur = function (e) {
        var text = this.getTextBoxId(0);
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
            if(x > Graphics.boxWidth - textBoxWidth) {
                x = Graphics.boxWidth - textBoxWidth;
            }
            if(y < 0) {
                y = 0;
            }
            if(y > Graphics.boxHeight - textBoxHeight) {
                y = Graphics.boxHeight - textBoxHeight;
            }
            mainContainer.style.left = Graphics._canvas.getBoundingClientRect().left + x + "px";
            if (loginRegister == 0) {
                mainContainer.style.top = 255 + "px";
            } else {
                mainContainer.style.top = Graphics._canvas.getBoundingClientRect().top + y + "px";
            }

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
            console.log(Graphics.boxWidth);
            if(window.innerWidth == 816) {
                var px = (Graphics.boxWidth / 2) - (textBoxWidth / 2); // (Graphics.boxWidth / 2) - (textBoxWidth / 2)
                var py = (Graphics.boxHeight / 2) - (textBoxHeight / 2); //(Graphics.boxHeight / 2) - (textBoxHeight / 2)
            } else if (window.innerWidth == 1920) {
                var px = 300; // (Graphics.boxWidth / 2) - (textBoxWidth / 2)
                var py = 500; //(Graphics.boxHeight / 2) - (textBoxHeight / 2)
            } else {
                var px = (Graphics.boxWidth / 2) - (textBoxWidth / 2); // (Graphics.boxWidth / 2) - (textBoxWidth / 2)
                var py = (Graphics.boxHeight / 2) - (textBoxHeight / 2); //(Graphics.boxHeight / 2) - (textBoxHeight / 2)
            }

            console.log(px + " " + py);
            this.setPosition(px, py);

        }
    };

    TextBox.prototype.isScreenLock = function () {
        var val = parseInt(performance.now() - this._lastInputTime);
        var ret = false;
        if(val >= nCheckScreenLock && this.isBusy()) ret = true;
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
        var textBox = this.getTextBoxId(val);
        textBox.value = text || '';
        return textBox;
    };

    TextBox.prototype.getText = function (type) {
        var textBox = this.getTextBoxId(type);
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
        Scene_Base.prototype.create.call(this);
        this.createBackground();
        this.createTextBox();
        this._WindowsL = new Window_Loading(200, 200, 450, 100);
        this.addChild(this._WindowsL);
        this._WindowsL.drawLoad(false);
    }

    let loading = false;
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
    };

    Scene_InputDialog.prototype.isScreenLock = function () {
        return this._textBox.isScreenLock();
    };

    Scene_InputDialog.prototype.createBackground = function() {
        this._backgroundSprite = new Sprite();
        if (loginRegister == 0) {
            this._backgroundSprite.bitmap = ImageManager.loadPicture("computerR");
        } else if (loginRegister == 1) {
            this._backgroundSprite.bitmap = ImageManager.loadPicture("computerL");
        } else if (loginRegister == 2) {
            this._backgroundSprite.bitmap = ImageManager.loadPicture("computerReset");
        } else if (loginRegister == 3) {
            if (userN == 0) {
                this._backgroundSprite.bitmap = ImageManager.loadPicture("computerUser");
            } else {
                this._backgroundSprite.bitmap = ImageManager.loadPicture("computerPVP");
            }

        }

        this.addChild(this._backgroundSprite);
    };

    Scene_InputDialog.prototype.createTextBox = function () {
        this._textBox = new TextBox(szFieldId, szTextBoxId);
        this._textBox.setEvent(this.okResult.bind(this), this.cancelResult.bind(this));
        this._textBox.show();

    };

    Scene_InputDialog.prototype.okResult = function () {
        let user = this._textBox.getText(1) || '';
        let pass = this._textBox.getText(2) || '';
        let mail = this._textBox.getText(0) || '';
        this.loaText(true);
        if(SceneManager._stack.length > 0) {
            if (loginRegister == 0) {
                if (checkEmpty(user) || checkEmpty(mail) || checkEmpty(pass)) {
                    AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
                    swal({
                        title: "Erro!",
                        text: "Deixou campos em branco!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        this.loaText(false);
                    });
                } else {
                    if (checkUsername(user)) {
                        if(checkPassword(pass)) {
                            ajaxResisterRequest(user, pass, mail);
                        }
                    } else {
                        AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
                        swal({
                            title: "Erro!",
                            text: "O username têm de ter pelo menos 8 caraters!",
                            icon: "error",
                            button: "Ok",
                            timer: 5000,
                        }).then((value) => {
                            this.loaText(false);
                        });
                    }
                }
            } else if (loginRegister == 1){
                if (checkEmpty(mail) || checkEmpty(pass)) {

                    AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
                    swal({
                        title: "Erro!",
                        text: "Deixou campos em branco!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        this.loaText(false);
                    });
                } else {
                    ajaxLoginRequest(mail, pass);
                }
            } else if (loginRegister == 2) {
                if (checkEmpty(mail)) {
                    AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
                    swal({
                        title: "Erro!",
                        text: "Deixou campos em branco!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        this.loaText(false);
                    });
                } else {
                    ajaxResetRequest(mail);
                }
            } else if (loginRegister == 3) {
                if(checkEmpty(user)) {
                    AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
                    swal({
                        title: "Erro!",
                        text: "Deixou campos em branco!",
                        icon: "error",
                        button: "Ok",
                        timer: 5000,
                    }).then((value) => {
                        this.loaText(false);
                    });
                } else {
                    if(checkUsername(user)) {
                        if (userN == 1) {
                            sendInvite(user)
                        } else {
                            ajaxChangeRequest(user);
                        }

                    } else {
                        AudioManager.playSe({name: "error", pan: 0, pitch: 100, volume: 100});
                        swal({
                            title: "Erro!",
                            text: "O username têm de ter pelo menos 8 caraters!",
                            icon: "error",
                            button: "Ok",
                            timer: 5000,
                        }).then((value) => {
                            this.loaText(false);
                        });
                    }
                }
            }
        }
    };

    Scene_InputDialog.prototype.cancelResult = function () {
        if(SceneManager._stack.length > 0) {
            TouchInput.clear();
            Input.clear();
            this.popScene();
        };
    };

    checkEmpty = function (text) {
        if (text == "") {
            return true;
        }
        return false;
    }

    checkPassword = function (passowrd) {
        if (passowrd.length < 8) {
            swal({
                title: "Erro!",
                text: "O username têm de ter pelo menos 8 caraters!",
                icon: "error",
                button: "Ok",
                timer: 5000,
            });
            return false;
        }
        var lowerCaseLetters = /[a-z]/g;
        if (!passowrd.match(lowerCaseLetters)) {
            swal({
                title: "Erro!",
                text: "A password tem de ter 1 minuscula",
                icon: "error",
                button: "Ok",
                timer: 5000,
            });
            return false;
        }
        var upperCaseLetters = /[A-Z]/g;
        if(!passowrd.match(upperCaseLetters)) {
            swal({
                title: "Erro!",
                text: "A password têm de ter 1 maiscula!",
                icon: "error",
                button: "Ok",
                timer: 5000,
            });
            return false;
        }
        var numbers = /[0-9]/g;
        if(!passowrd.match(numbers)) {
            swal({
                title: "Erro!",
                text: "A password têm de ter pelo menos 8 caraters!",
                icon: "error",
                button: "Ok",
                timer: 5000,
            });
            return false;
        }
        return true;
    }

    checkUsername = function (user) {
        if(user.length < 2) {
            return false;
        }
        return true;
    }

    loadAjax = function (value) {
        document.getElementById("inputDialog-OkBtn").disabled = value;
        document.getElementById("inputDialog-CancelBtn").disabled = value;
        document.getElementById("email").disabled = value;
        document.getElementById("user").disabled = value;
        document.getElementById("pass").disabled = value;
    }

    Scene_InputDialog.prototype.afterResponse = function () {
        Input.clear();
        this.popScene();
    }

    Scene_InputDialog.prototype.loaText = function (value) {
            this._WindowsL.drawLoad(value);
    }

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


    openForm = function (value, user = 0) {
        SceneManager.push(Scene_InputDialog);
        loginRegister = value;
        userN = user;

        if (user == 1) {
            AudioManager.playBgm({name: "multiBG", pan: 0, pitch: 100, volume: 100});
        }
    }

    window.TextBox = TextBox;

    /*
    Loading window
     */

    function Window_Loading() {
        this.initialize.apply(this, arguments);
    }


    Window_Loading.prototype = Object.create(Window_Base.prototype);
    Window_Loading.prototype.constructor = Window_Loading;

    Window_Loading.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
        ImageManager.reservePicture("server");
        this.refresh();
    }


    Window_Loading.prototype.drawLoad = function (loading) {
        this.contents.clear();
        this.setBackgroundType(2);
        if(loading) {
            this.contents.fontSize = 20;
            this.drawText("Comunicando com o servidor...", 0, 0, "center");
            this.drawPicture("server", 350, 0, false);
        }
    }

    Window_Loading.prototype.refresh = function () {
        if(loading) {
            this.drawLoad();
        }
    }

})();
