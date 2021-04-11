// This plugin was compiled from sapphirescript (v1.0 Beta)
// sapphirescript by Nilo K. - Khas (arcthunder.blogspot.com/p/sapphire-script.html)
//=====================================================================================================================
// * KhasGraphics
//=====================================================================================================================
if (!(Khas && Khas.Core && Khas.Core.version >= 2.0)) {
  var current_plugin = "KhasGraphics";
  var missing_plugin = "KhasCore";
  var missingVersion = 2.0;
  alert("Please install " + (missing_plugin) + " v" + (missingVersion) + " in order to use " + (current_plugin) + "");
};
Khas.Graphics = {};
Khas.Graphics.version = 1.1;
/*:
 * 
 * @plugindesc [1.1] Required by Khas graphics plugins.
 * 
 * @author Nilo K. (Khas - arcthunder.blogspot.com)
 * 
 * @help - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * [MV] Khas Graphics
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * By Nilo K. (Khas)
 *  * Version 1.1
 *  * Released on 07.05.2017
 * 
 *  * Social Media
 * Blog: arcthunder.blogspot.com
 * Patreon: patreon.com/khas
 * Facebook: facebook.com/khasarc
 * Twitter: twitter.com/arcthunder
 * Youtube: youtube.com/c/khasarc
 * 
 *  * Khas Scripts at RPG Maker Web forums (official support!)
 * forums.rpgmakerweb.com/index.php?/forum/132-khas-scripts
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Support my work
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you find my plugins useful and you would like to support my work, now
 * you can do it by becoming my patron! 
 * 
 * Please check my page at patreon.com/khas
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Terms of Use
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you want to use this plugin with a free RPG Maker game, you can do it for
 * free and there's no need to contact me. I only ask you to give credit to
 * "Khas" or "Khas Custom Scripts" somewhere in your game. You may include 
 * my blog url if you want.
 * 
 * This plugin is NOT FREE for COMMERCIAL use. If you want to use it on a
 * commercial title, please email me (see "Contact" on my blog). Alternatively, 
 * you may help me to achieve a Patreon goal to make all of them free for 
 * commercial use!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Instructions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Just place this plugin after KhasCore and before all the other Khas plugins. 
 * It requires no configuration.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Log
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Version 1.1 (07.05.2017)
 * Added resource cache management
 * Added pre rendering interface
 *
 *  * Version 1.0 (04.08.2017)
 * First release!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 */;
Khas.Filters = {};
Khas.Filters.Source = {};
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Sprite
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Sprite.prototype.addFilter = function(filter) {
    var current_filters = this.filters;
    if (current_filters) {
      current_filters.push(filter);
      this.filters = current_filters;
    } else {
      this.filters = [filter];
    };
  };
  Sprite.prototype.removeFilter = function(filter) {
    var current_filters = this.filters;
    current_filters.remove(filter);
    if (current_filters.length <= 0) {
      this.clearFilters();
    } else {
      this.filters = current_filters;
    };
  };
  Sprite.prototype.clearFilters = function() {
    this.filters = null;
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Spriteset Battle
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Spriteset_Battle.prototype.kg_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
  Spriteset_Battle.prototype.kg_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.createLowerLayer = function() {
    this.kg_createLowerLayer();
    this.initializeKhasGraphics();
  };
  Spriteset_Battle.prototype.update = function() {
    this.kg_update();
    this.updateKhasGraphics();
  };
  Spriteset_Battle.prototype.khasType = function() {
    return "battle";
  };
  Spriteset_Battle.prototype.initializeKhasGraphics = function() {
    $khasGraphics.prepareScene(this);
    $khasGraphics.newScene();
  };
  Spriteset_Battle.prototype.updateKhasGraphics = function() {
    $khasGraphics.updateScene();
  };
  Spriteset_Battle.prototype.terminateKhasGraphics = function() {
    $khasGraphics.clearScene();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Spriteset Map
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Spriteset_Map.prototype.kg_createWeather = Spriteset_Map.prototype.createWeather;
  Spriteset_Map.prototype.kg_update = Spriteset_Map.prototype.update;
  Spriteset_Map.prototype.createWeather = function() {
    this.kg_createWeather();
    this.initializeKhasGraphics();
  };
  Spriteset_Map.prototype.update = function() {
    this.kg_update();
    this.updateKhasGraphics();
  };
  Spriteset_Map.prototype.khasType = function() {
    return "map";
  };
  Spriteset_Map.prototype.initializeKhasGraphics = function() {
    $khasGraphics.prepareScene(this);
    $khasGraphics.newScene();
  };
  Spriteset_Map.prototype.updateKhasGraphics = function() {
    $khasGraphics.updateScene();
  };
  Spriteset_Map.prototype.terminateKhasGraphics = function() {
    $khasGraphics.clearScene();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Scene Battle
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Scene_Battle.prototype.kg_terminate = Scene_Battle.prototype.terminate;
  Scene_Battle.prototype.terminate = function() {
    this.kg_terminate();
    this._spriteset.terminateKhasGraphics();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Scene Map
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Scene_Map.prototype.kg_terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this.kg_terminate();
    this._spriteset.terminateKhasGraphics();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Filter
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Khas.Filters.Source.VERTEX_GENERAL = "\n\n  attribute vec2 aVertexPosition;\n  attribute vec2 aTextureCoord;\n  \n  varying vec2 vTextureCoord;\n  \n  uniform mat3 projectionMatrix;\n  \n  void main(void) {\n    vTextureCoord = aTextureCoord;\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n  }\n";
Khas.Filters.Source.VERTEX_FLIP_Y = "\n\n  attribute vec2 aVertexPosition;\n  attribute vec2 aTextureCoord;\n\n  varying vec2 vTextureCoord;\n  varying float flipY;\n\n  uniform mat3 projectionMatrix;\n\n  void main(void) {\n    flipY = projectionMatrix[1][1] < 0.0 ? 1.0 : 0.0;\n    vTextureCoord = aTextureCoord;\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n  }\n";
function Khas_Filter() { this.initialize.apply(this, arguments); }; 
Khas_Filter.prototype = Object.create(PIXI.Filter.prototype);
Khas_Filter.prototype.constructor = Khas_Filter;
  Khas_Filter.prototype.initialize = function(vertexSource, fragmentSource) {
    PIXI.Filter.call(this, vertexSource, fragmentSource);
  };
  Khas_Filter.prototype.copyUniforms = function(filter) {
    for (var uniform in filter.uniforms) {
      if (filter.uniforms.hasOwnProperty(uniform) && this.uniforms.hasOwnProperty(uniform)) this.uniforms[uniform] = filter.uniforms[uniform];
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Graphics
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Khas_Graphics() { this.initialize.apply(this, arguments); }; 
  Khas_Graphics.prototype.initialize = function() {
    this._scene = false;
    this._cached = false;
  };
  Khas_Graphics.prototype.prepareScene = function(spriteset) {
    this._spriteset = spriteset;
    if (!(this._cached)) this.loadResources();
  };
  Khas_Graphics.prototype.loadResources = function() {
    this._cached = true;
  };
  Khas_Graphics.prototype.newScene = function() {
    this._scene = true;
  };
  Khas_Graphics.prototype.clearScene = function() {
    this._scene = false;
    this._spriteset = null;
  };
  Khas_Graphics.prototype.updateScene = function() {
  };
$khasGraphics = new Khas_Graphics();
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Sprite
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Khas_Sprite() { this.initialize.apply(this, arguments); }; 
Khas_Sprite.prototype = Object.create(PIXI.Sprite.prototype);
Khas_Sprite.prototype.constructor = Khas_Sprite;
  Khas_Sprite.prototype.initialize = function(texture) {
    PIXI.Sprite.call(this, texture);
  };
  Khas_Sprite.prototype.addFilter = function(filter) {
    var current_filters = this.filters;
    if (current_filters) {
      current_filters.push(filter);
      this.filters = current_filters;
    } else {
      this.filters = [filter];
    };
  };
  Khas_Sprite.prototype.removeFilter = function(filter) {
    var current_filters = this.filters;
    current_filters.remove(filter);
    if (current_filters.length <= 0) {
      this.clearFilters();
    } else {
      this.filters = current_filters;
    };
  };
  Khas_Sprite.prototype.clearFilters = function() {
    this.filters = null;
  };
  Khas_Sprite.prototype._renderWebGL = function(renderer) {
    this.prepareRender();
    PIXI.Sprite.prototype._renderWebGL.call(this, renderer);
  };
  Khas_Sprite.prototype.prepareRender = function() {
  };
//=====================================================================================================================
// * End of Plugin
//=====================================================================================================================