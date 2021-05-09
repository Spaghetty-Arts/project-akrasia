function Setup() {

    function VideoFix() {
        this.initialize.apply(this, arguments);
    }

    VideoFix.initialize = function() {
        this.setup();
    };

    VideoFix.setup = function() {
        this.update();
    };

    VideoFix.update = function() {
        this.requestUpdate();
    };

    VideoFix.requestUpdate = function() {
        requestAnimationFrame(this.update.bind(this));
    };

    VideoFix.initialize();

} Setup();


function loadVideo()  {
    var SPFabian = SPFabian || {};

    /**
     * Basic helper function to extend objects. Mainly used for inheritance and other prototype-related operations.
     */
    SPFabian._extend || (SPFabian._extend = function (b, e) {
        for (var k in e) {
            b[k] = e[k];
        }
        return b;
    });



    /**
     * Holds the HTML video element used to start/pause/rewind the loaded video.
     */
    var _video;

    /**
     * Holds the actual sprite, that gets added to Scene_Title.
     */
    var _videoSprite;


    /**
     * Create the video element, set it to auto-loop and creates the Sprite holding it. We also register a
     * callback to be executed, once the video has finished loading, so we can resize and center the sprite.
     */
    var _loadVideo = function () {
        if (_videoSprite != null) {
            return;
        }

        _video = document.createElement('video');
        _video.setAttribute('preload', 'auto');
        _video.src = 'movies/' + "intro2" + Game_Interpreter.prototype.videoFileExt();
        _video.loop = 'loop';
        _videoSprite = new PIXI.Sprite(PIXI.Texture.fromVideo(_video));
    };



    //variables needed to dont crash the stack call for some reason....
    var _sceneTitle_create = Scene_Title.prototype.create;
    var _sceneTitle_isReady = Scene_Title.prototype.isReady;
    var _sceneTitle_start = Scene_Title.prototype.start;
    var _sceneTitle_stop = Scene_Title.prototype.stop;
    var _sceneTitle_createBackground = Scene_Title.prototype.createBackground;

    SPFabian._extend(Scene_Title.prototype, {

        /**
         * On create, also create our video element to determine our current environment.
         */
        create: function () {
            _loadVideo();
            _sceneTitle_create.call(this);
        },

        isReady: function () {
            return _sceneTitle_isReady.call(this);
        },

        /**
         * On start, rewind the video to position 0 and start playing.
         */
        start: function () {
            _sceneTitle_start.call(this);
            _video.currentTime = 0;
            _video.play();
        },

        /**
         * On stop, pause the video, because otherwise it would continue playing, even through other scenes.
         */
        stop: function () {
            _video.pause();
            _sceneTitle_stop.call(this);
        },

        /**
         * Position the video sprite behind the background, so it's possible to put (semi)transparent images
         * above it.
         */
        createBackground: function () {
            this.addChild(_videoSprite);
            _sceneTitle_createBackground.call(this);
        }

    });
}

loadVideo();
