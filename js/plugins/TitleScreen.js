
    function Setup() {
        'use strict';
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



(function($) {
    "use strict";

    /**
     * Basic helper function to extend objects. Mainly used for inheritance and other prototype-related operations.
     */
    $._extend || ($._extend = function(b, e) { for(var k in e) { b[k] = e[k]; } return b; });

    /**
     * Load plugin parameters.
     */

    var _param_video = "intro2";

    /**
     * Holds the HTML video element used to start/pause/rewind the loaded video.
     */
    var _video;

    /**
     * Holds the actual sprite, that gets added to Scene_Title.
     */
    var _videoSprite;

    /**
     * Gets set to true, once the video has been loaded and causes Scene_Title to wait, beforehand.
     */
    var _ready;

    /**
     * Create the video element, set it to auto-loop and creates the Sprite holding it. We also register a
     * callback to be executed, once the video has finished loading, so we can resize and center the sprite.
     */
    var _loadVideo = function() {
        if(!!_videoSprite) { return; }
        _video = document.createElement('video');
        _video.setAttribute('preload', 'auto');
        _video.src = _getFilePath();
        _video.loop = 'loop';
        _videoSprite = new PIXI.Sprite(PIXI.Texture.fromVideo(_video));
        _video.onloadeddata = _onLoad;
    };

    /**
     * Gets called, once the video has finished loading and scales the sprite. It also gets centered.
     */
    var _onLoad = function() {
        _ready = true;

    };


    var _getFilePath = function() {
        return 'movies/' + _param_video + Game_Interpreter.prototype.videoFileExt();
    };

    //=============================================================================
    // Scene_Title
    //=============================================================================

    var _sceneTitle_create = Scene_Title.prototype.create;
    var _sceneTitle_isReady = Scene_Title.prototype.isReady;
    var _sceneTitle_start = Scene_Title.prototype.start;
    var _sceneTitle_stop = Scene_Title.prototype.stop;
    var _sceneTitle_createBackground = Scene_Title.prototype.createBackground;

    $._extend(Scene_Title.prototype, {

        /**
         * On create, also create our video element. We must do this here, because otherwise we wouldn't
         * be able to determine our current environment, which defines the file extension we have to load.
         */
        create: function() {
            _loadVideo();
            _sceneTitle_create.call(this);
        },

        /**
         * We wait, until the video has finished loading. This must only be done once, since the video is
         * cached in memory (better don't use big videos ^^).
         */
        isReady: function() {
            return _ready && _sceneTitle_isReady.call(this);
        },

        /**
         * On start, rewind the video to position 0 and start playing. It will automatically loop, once it
         * has finished.
         */
        start: function() {
            _sceneTitle_start.call(this);
            _video.currentTime = 0;
            _video.play();
        },

        /**
         * On stop, pause the video, because otherwise it would continue playing, even through other scenes.
         */
        stop: function() {
            _video.pause();
            _sceneTitle_stop.call(this);
        },

        /**
         * Position the video sprite behind the background, so it's possible to put (semi)transparent images
         * above it.
         */
        createBackground: function() {
            this.addChild(_videoSprite);
            _sceneTitle_createBackground.call(this);
        }

    });

})(this.IAVRA || (this.IAVRA = {}));

Window_TitleCommand.prototype.create = function () {

}
