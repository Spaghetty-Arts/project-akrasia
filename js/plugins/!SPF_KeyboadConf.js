
    var SPFabian = SPFabian || {};
    SPFabian.KeyConf = SPFabian.KeyConf || {};

    let keyboardKeys= [];
    let typeKb = 0;

    //Input.keyMapper = keyboardKeys;
    /*
    Create keyboard Conf file
     */


         /*
       Window Options
        */

    //SPFabian.KeyConf.addOption = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        //SPFabian.KeyConf.addOption.call(this);
        this.addCommand("Configuração Teclado", "keyConf", true);
    };

    //drawing of the option
    SPFabian.KeyConf.drawOptionItem = Window_Options.prototype.drawItem;
    Window_Options.prototype.drawItem = function(index) {
        if (this.commandSymbol(index) === 'keyConf') {
            var rect = this.itemRectForText(index);
            var text = this.commandName(index);
            this.resetTextColor();
            this.changePaintOpacity(this.isCommandEnabled(index));
            this.drawText(text, rect.x, rect.y, rect.width, 'left');
        } else {
            SPFabian.KeyConf.drawOptionItem.call(this, index);
        }
    };

    //If correct option is hit
    //SPFabian.KeyConfig.OptionprocessOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        Window_Command.prototype.processOk.call(this);
    };

    /*
        Scene
    */

    //inherithance from the super class that handles scene drawing - MANDATORY
    function Scene_Test(){this.initialize.apply(this,arguments);}

    //Inherit Properties of menu base
    Scene_Test.prototype = Object.create(Scene_MenuBase.prototype);


    // tell the function constructor is Scene_Test
    Scene_Test.prototype.constructor = Scene_Test;


    // <"Sets the default values of the scene">
    Scene_Test.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    // <"it's set's the flag ready and start the scene always do inheritance.">
    Scene_Test.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
    }

    // <"Serve for create your scene contents and to load it in your scene.">
    Scene_Test.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);

        this._customWindow = new Window_Keys(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this.addWindow(this._customWindow);

        this._customCommandWindow = new Window_Conf(0, 555);
        this._customCommandWindow.setHandler("arrowC", this.defineArrow.bind(this));
        this._customCommandWindow.setHandler("arrowW", this.defineWASD.bind(this));
        this.addWindow(this._customCommandWindow);

    };

    //Button Function
    Scene_Test.prototype.defineArrow = function () {
        let confKeys = [
            ['up', 38], ['down', 40], ['left', 37], ['right', 39],
            ['shift', 16], ['shoot', 83], ['reload', 82], ['ok', 32],
            ['arm1', 49], ['arm2', 50], ['arm3', 51], ['arm4', 52],
            ['holster', 72], ['escape', 27], ['light', 76]
        ];
        window.MVNodeFS.writeFile("data", "keyboardKeys.json", confKeys);
        keyboardKeys = confKeys;
        typeKb = 0;
        let entered = false;
        if (!entered) {
            entered = true;
            if (entered) {
                Input.keyMapper = [];
            }
            for (let i = 0; i < keyboardKeys.length; i++) {
                let strPo = ""+keyboardKeys[i][0];
                Input.keyMapper[keyboardKeys[i][1]] = strPo;
            }
        }
        this.popScene();
        this.terminate();
    }

    Scene_Test.prototype.defineWASD = function () {
        let confKeys = [
            ['up', 87], ['down', 83], ['left', 65], ['right', 68],
            ['shift', 16], ['shoot', 101], ['reload', 102], ['ok', 13],
            ['arm1', 97], ['arm2', 98], ['arm3', 99], ['arm4', 100],
            ['holster', 103], ['escape', 110], ['light', 76]
        ];
        window.MVNodeFS.writeFile("data", "keyboardKeys.json", confKeys);
        keyboardKeys = confKeys;
        typeKb = 1;
        let entered2 = false;
        if (!entered2) {
            if (entered2) {
                Input.keyMapper = [];
            }
            entered2 = true;
            for (let i = 0; i < keyboardKeys.length; i++) {
                Input.keyMapper[keyboardKeys[i][1]] = ""+keyboardKeys[i][0];
            }
        }
        this.popScene();
        this.terminate();
    }

    Scene_Test.prototype.update = function() {
        if (!this.drawWindows) {
            this._customWindow.drawAllItems();
            this.drawWindows = true;
        }
        Scene_MenuBase.prototype.update.call(this);
        this.exit();
    };

    Scene_Test.prototype.terminate = function() {
        Scene_MenuBase.prototype.terminate.call(this);
    };


    Scene_Test.prototype.exit = function () {
        if (Input.isTriggered("cancel")) {
            this.popScene();
            this.terminate();
        }
    }

    Scene_Test.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("cpMenu");
        this.addChild(this._backgroundSprite);
        return;
    };

 /*
    Window Command
  */

    //this function will run whenever we make a new MyWindow object(a new window of this type)
    // arguments is a special keyword, which basically means all the arguments passed into MyWindow upon creation, will be sent to the initialize method
    function Window_Conf() {
        this.initialize.apply(this, arguments);
    }

    //This line of code gives us all the functionality provided in Window_Base, and makes it a part of our MyWindow class
    Window_Conf.prototype = Object.create(Window_HorzCommand.prototype);

    Window_Conf.prototype.constructor = Window_Conf;

    //This is the initialize method that's called above when my window is instantiated.
    //The argument keyword essentially passes the information you enter into the parameters x, y, width, height below
    Window_Conf.prototype.initialize = function (x, y) {
        //This call, calls the original code provided in the Window_Base.prototype function, allowing us to make use of it
        //This is only important, because we plan to add more code to when we initialize a window.
        Window_HorzCommand.prototype.initialize.call(this, x, y);
    }

    //Commands from the conf window
    Window_Conf.prototype.makeCommandList = function() {
        this.addCommand ("Comandos Originais", "arrowC");
        this.addCommand ("Comandos WASD", "arrowW");
    };

    //The core of any new window class; this is what handles processing for the window while the game is running
    //We call the Window_Base.prototype update method, so we can use that code and also add more to this function
    Window_Conf.prototype.update = function () {
        Window_HorzCommand.prototype.update.call(this);
    }

    Window_Conf.prototype.drawItem = function (index) {
        Window_HorzCommand.prototype.drawItem.call(this, index);
    }

    Window_Conf.prototype.windowWidth = function () {
        return Graphics.boxWidth;
    }


    /*
    Window keys
  */


    function Window_Keys() {
        this.initialize.apply(this, arguments);
    }


    Window_Keys.prototype = Object.create(Window_Base.prototype);

    Window_Keys.prototype.constructor = Window_Keys;


    Window_Keys.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.drawAllItems();
        this.opacity = 0;
    }



    Window_Keys.prototype.drawAllItems = function () {
        if (typeKb == 0) {
            this.drawPicture("kb", 0, 300, false);
        } else {
            this.drawPicture("kb2", 0, 300, false);
        }

        //this.drawText ("Andar para Cima", 0, 0, this.width - this.padding * 2, "center");

    }



    /*
    Scene Options
     */

    SPFabian.KeyConf.createOption = Scene_Options.prototype.createOptionsWindow;

    Scene_Options.prototype.createOptionsWindow = function () {
        SPFabian.KeyConf.createOption.call(this);
        this._optionsWindow.setHandler('keyConf', this.optionKey.bind(this));
    }

    Scene_Options.prototype.optionKey = function () {
        SceneManager.push(Scene_Test);
    }