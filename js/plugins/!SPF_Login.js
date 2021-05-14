(function () {
    function Scene_Login() {
        this.initialize.apply(this, arguments);
    }

    Scene_Login.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Login.prototype.constructor = Scene_Login;

    Scene_Login.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);

    }

    Scene_Login.prototype.create = function () {
        Scene_MenuBase.prototype.create.call(this);
        this.createBackground();
        this._WindowsInput = new Window_NameInput(200, 300, 450, 300);

        this.addChild(this._WindowsInput);
    }

    Scene_Login.prototype.start = function () {
        Scene_MenuBase.prototype.start.call(this);

        AudioManager.playBgm({"name": "03_Chasing_Fortune", "volume": 60, "pitch": 100, "pan": 0});
    }


    Scene_Login.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);


    }


    Scene_Login.prototype.createBackground = function(){
        this._backgroundSprite = new Sprite();
        this._backgroundSprite.bitmap = ImageManager.loadPicture("PokerTable");
        this.addChild(this._backgroundSprite);
    };


    startLogin = function () {
        SceneManager.push(Scene_Login);
    }


    function Window_Login() {
        this.initialize.apply(this, arguments);
    }

    Window_Login.prototype = Object.create(Window_Base.prototype);
    Window_Login.prototype.constructor = Window_Login;

    Window_Login.prototype.initialize = function (x, y, w, h) {
        Window_Base.prototype.initialize.call(this, x, y, w, h);
    }

    function Window_Input() {
        this.initialize.apply(this, arguments);
    }

    Window_Input.prototype = Object.create(Window_NameInput.prototype);
    Window_Input.prototype.constructor = Window_Input;

    Window_Input.prototype.initialize = function (x, y, w, h) {
        Window_NameInput.prototype.initialize.call(this, x, y, w, h);
    }
})();