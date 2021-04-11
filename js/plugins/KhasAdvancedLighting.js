// This plugin was compiled from sapphirescript (v1.0 Beta)
// sapphirescript by Nilo K. - Khas (arcthunder.blogspot.com/p/sapphire-script.html)
//=====================================================================================================================
// * KhasAdvancedLighting
//=====================================================================================================================
if (!(Khas && Khas.Graphics && Khas.Graphics.version >= 1.1)) {
  var currentPlugin = "KhasAdvancedLighting";
  var missingPlugin = "KhasGraphics";
  var missingVersion = 1.1;
  alert("Please install " + (missingPlugin) + " v" + (missingVersion) + " in order to use " + (currentPlugin) + "");
};
Khas.Lighting = {};
Khas.Lighting.version = 3.2;
Khas.Lighting.cache = {};
Khas.Lighting.Settings = {};
Khas.Lighting.Addons = {};
/*:
 * @plugindesc [3.2] Adds lighting to your game.
 * 
 * @author Nilo K. (Khas - arcthunder.blogspot.com)
 * 
 * @param Custom Blending
 * @desc [ON/OFF] Uses a custom light blending equation.
 * This should match your game's graphic style.  
 * @default ON
 *
 * @param Transfer Reset
 * @desc [ON/OFF] Ambient light is set to 100/ffffff after transfering.
 * @default OFF
 * 
 * @param Auto Battle Lighting
 * @desc [ON/OFF] Battles' lighting will match the current
 * ambient light. Lights are added for battlers.
 * @default ON
 *
 * @requiredAssets img/lights/blue
 * @requiredAssets img/lights/candle
 * @requiredAssets img/lights/cyan
 * @requiredAssets img/lights/flashlight
 * @requiredAssets img/lights/fluorescent
 * @requiredAssets img/lights/green
 * @requiredAssets img/lights/halogen
 * @requiredAssets img/lights/pink
 * @requiredAssets img/lights/purple
 * @requiredAssets img/lights/red
 * @requiredAssets img/lights/test
 * @requiredAssets img/lights/torch
 * @requiredAssets img/lights/tungsten
 * @requiredAssets img/lights/white
 * @requiredAssets img/lights/yellow
 * 
 * @help - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * [MV] Khas Advanced Lighting
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * By Nilo K. (Khas)
 *  * Version 3.2
 *  * Released on 09.30.2017
 * 
 *  * Social Media
 * Blog: arcthunder.blogspot.com
 * Twitter: twitter.com/arcthunder
 * Youtube: youtube.com/c/khasarc
 *
 *  * Support for this plugin at RPG Maker Web forums
 * forums.rpgmakerweb.com/index.php?threads/khas-advanced-lighting.77679/
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Terms of Use
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * If you want to use this plugin with a free RPG Maker game, you can do it for 
 * free and there's no need to contact me. I only ask you to give credit to 
 * "Khas" or "Khas Custom Scripts" somewhere in your game. You may include my 
 * blog url if you want.
 * 
 * This plugin is NOT FREE for COMMERCIAL use. If you want to use it on a 
 * commercial title (any game that you may sell), you must pay a one-time 
 * $15 USD fee (payable via PayPal only - please send me an e-mail, see the
 * Contact page on my blog). This license covers commercial use for your
 * current and future projects, and it allows you to use all my plugins.
 * 
 * Please note that this plugin is provided “as is”, without warranty of any 
 * kind. You are responsible for testing it and checking if it’s compatible 
 * with your game. In no event shall the author of this plugin be liable for 
 * any claim, damages or other liability, whether in an action of contract, 
 * tort or otherwise, arising from, out of or in connection with the software 
 * or the use or other dealings in the software.
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Instructions
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Please check the complete tutorial at my blog:
 * arcthunder.blogspot.com/p/tutorial-advanced-lighting.html
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Share feedback / Get help
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * You may give feedback or get help at RPG Maker Web:
 * forums.rpgmakerweb.com/index.php?threads/khas-advanced-lighting.77679/
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Log
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  * Version 3.2 (09.30.2017)
 * Fixed "Cannot read property 'length' of undefined" after MV Update 1.5.1
 * 
 *  * Version 3.1 (08.19.2017)
 * SetEnemyLight and SetActorLight now accept light offset
 *
 *  * Version 3.0 (07.26.2017)
 * Added "Transfer Reset" parameter
 * Added "Auto Battle Lighting" parameter
 * Added SetEnemyLight ID LIGHT_ID/SetActorLight ID LIGHT_ID commands
 * Added size property to lights (size > 0, integer, default: 100)
 * Added [light_size x] command (x > 0, integer)
 * Added two new big lights: halogen_big, torch_big
 * Added requiredAssets tag to default lights
 * Fixed encrypted project problem
 * Added improved tinting
 * Added colored ambient light
 * Fixed offset bug (same offset in two pages)
 * Added [smooth_light id d] command 
 * Added save/load state commands (SaveAmbientLight X/LoadAmbientLight X [T])
 * Requires KhasGraphics 1.1 (updated)
 * Compatibility add-on with orange time system
 *
 *  * Version 2.0 (04.08.2017)
 * Plugin completely rewritten
 * Added safety check on plugin commands (prevent null/undefined)
 * Effects have been separated into layers (better parallax compatibility)
 * Improved shader management system
 * Now compatible with weather effects
 * Now compatible with MBS Zoom (zoomX == zoomY only, zoom in only)
 * Added [ambient_light lightId switchId] for conditional change
 * Access ambientlight intensity with $gameMap.lighting.ambientLight
 * Added [light_offset OX OY]
 * Removed [offset_x OX] and [offset_y OY]
 * Removed adaptative exposure
 *
 *  * Version 1.1 (03.03.2017)
 * MV updated to 1.3.5
 * Requires Khas Core 1.2 
 * Added compatibility with zoom controls (zoom in only!)
 * Added compatibility with different tile sizes
 * Added Pixi.js version checking (requires v3 or later)
 * Fixed event not turning off light on page switch
 * Added commands to create lights with region tags and terrain tags
 * Fixed lighting/fog being applied to pictures
 * Performance tweaks
 * Fixed shader problems with opacity and exposure
 * 
 *  * Version 1.0.1 (01.24.2017)
 * Fixed inverted lighting/fog on menu screen
 * 
 *  * Version 1.0 (01.20.2017)
 * First release!
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 */;
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Lights
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Khas.Lighting.LIGHTS = {
    // ARTIFICIAL
    halogen: {
        fileName: "halogen",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0
    },
    halogen_big: {
        fileName: "halogen",
        intensity: 100, variation: 0, size: 180,
        offset_x: 0, offset_y: 0
    },
    tungsten: {
        fileName: "tungsten",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    fluorescent: {
        fileName: "fluorescent",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    broken: {
        fileName: "halogen", 
        intensity: 60, variation: 30,
        offset_x: 0, offset_y: 0
    },
    flashlight: {
        fileName: "flashlight", 
        intensity: 100, variation: 0,
        offset_x: {2: -12, 4: -72, 6: 72, 8: 16 }, offset_y: {2: 72, 4: 0, 6: 16, 8: -72 },
        syncWithDirection: true
    },
    // CANDLE
    candle: {
        fileName: "candle",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    // TORCH
    torch: {
        fileName: "torch",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    torch_big: {
        fileName: "torch",
        intensity: 80, variation: 20, size: 150,
        offset_x: 0, offset_y: 0  
    },
    white_torch: {
        fileName: "white",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    red_torch: {
        fileName: "red",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    green_torch: {
        fileName: "green",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    blue_torch: {
        fileName: "blue",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    pink_torch: {
        fileName: "pink",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    cyan_torch: {
        fileName: "cyan",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    yellow_torch: {
        fileName: "yellow",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    purple_torch: {
        fileName: "purple",
        intensity: 80, variation: 20,
        offset_x: 0, offset_y: 0  
    },
    // COLORED 
    white: {
        fileName: "white",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    red: {
        fileName: "red",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    green: {
        fileName: "green",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    blue: {
        fileName: "blue",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    pink: {
        fileName: "pink",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    cyan: {
        fileName: "cyan",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    yellow: {
        fileName: "yellow",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    purple: {
        fileName: "purple",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
    // TEST
    test: {
        fileName: "test",
        intensity: 100, variation: 0,
        offset_x: 0, offset_y: 0  
    },
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Custom Lights - Begin
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
/*
In order to create custom lights, copy any of the lights above and add them below. Check the two templates 
explained here and edit the copied light to achieve the effect you're looking for. 

If you want to use new light images, make sure to add the following line after the other requiredAssets tags:
@requiredAssets img/lights/the_light_name
This line is responsible of importing the resource correctly into your project, including it when packaging.


Template 1:
How a simple light is created. Please note that the sum of intensity and variation must be equal or less than 100.

halogen: {               // This is the light name, must be lowercase. The name is used with the [light x] command.
    fileName: "halogen", // A String containing the name of the file in the img/lights folder.
    intensity: 100,      // The light's intensity, an integer from 0 to 100.
    variation: 0,        // The light's variation on intensity. A Random number from 0 to variation is added to the intensity.
    offset_x: 0,         // Offset the light's x position in pixels, use an integer.
    offset_y: 0          // Offset the light's y position in pixels, use an integer.
},


Template 2:
How a flashlight is created. The offsets for every direction are optional - if they are the same for all directions,
please use the offset as the template above.

flashlight: {
    fileName: "flashlight", 
    intensity: 100
    variation: 0,
    offset_x: {2: -12, 4: -72, 6: 72, 8: 16 }, // A Javascript object containing the x offset for each direction.
    offset_y: {2: 72, 4: 0, 6: 16, 8: -72 },   // A Javascript object containing the y offset for each direction.
    syncWithDirection: true                    // If you want the light's rotation to sync with the character's, use this as true.
},

Since version 2.1, a new parameter can be added: size
It must be an integer greater than 0 (default 100). See halogen_big or torch_big for an example.

PLACE YOUR CUSTOM LIGHTS HERE: */






// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Custom Lights - End
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
};

Khas.Lighting.PARAMETERS = PluginManager.parameters("KhasAdvancedLighting");
Khas.Lighting.Settings.CUSTOM_BLEND_MODE = Khas.Lighting.PARAMETERS["Custom Blending"].toLowerCase() == "on";
Khas.Lighting.Settings.TRANSFER_RESET = Khas.Lighting.PARAMETERS["Transfer Reset"].toLowerCase() == "on";
Khas.Lighting.Settings.AUTO_BATTLE_LIGHTING = Khas.Lighting.PARAMETERS["Auto Battle Lighting"].toLowerCase() == "on";
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * PixiOutOfDate Error
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function PixiOutOfDateError() { this.initialize.apply(this, arguments); }; 
PixiOutOfDateError.prototype = Object.create(Error.prototype);
PixiOutOfDateError.prototype.constructor = PixiOutOfDateError;
  PixiOutOfDateError.prototype.initialize = function() {
    this.name = "Pixi.js out of date!";
    this.message = "Please update your RPG Maker MV and your project js folder in order to use Khas Advanced Graphics. It requires Pixi.js v3 or later.";
    this.stack = (new Error()).stack;
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Image Manager
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  ImageManager.loadLight = function(filename) {
    return this.loadBitmap("img/lights/", filename, 0, true);;
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Graphics
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Graphics.kal_createRenderer = Graphics._createRenderer;
  Graphics._createRenderer = function() {
    this.kal_createRenderer();
    if (typeof PIXI.BLEND_MODES != 'undefined') {
      var gl = this._renderer.gl;
      PIXI.BLEND_MODES.KHAS_LIGHT = 31;   // change
      PIXI.BLEND_MODES.KHAS_LIGHTING = 32;
      this._renderer.state.blendModes[PIXI.BLEND_MODES.KHAS_LIGHT] = [gl.SRC_ALPHA, gl.ONE];
      this._renderer.state.blendModes[PIXI.BLEND_MODES.KHAS_LIGHTING] = [gl.ZERO, gl.SRC_COLOR];
    } else {
      throw new PixiOutOfDateError();
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Map
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Object.defineProperty(Game_Map.prototype, 'lighting', { get: function() { return this._lighting; }, });
  Object.defineProperty(Game_Map.prototype, 'battleLighting', { get: function() { return this._battleLighting; }, });
  Object.defineProperty(Game_Map.prototype, 'tileLights', { get: function() { return this._tileLights; }, });
  Game_Map.prototype.kal_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.kal_khasSetupMap = Game_Map.prototype.khasSetupMap;
  Game_Map.prototype.kal_callKhasCommand = Game_Map.prototype.callKhasCommand;
  Game_Map.prototype.kal_callKhasTilesetCommand = Game_Map.prototype.callKhasTilesetCommand;
  Game_Map.prototype.kal_khasPostScan = Game_Map.prototype.khasPostScan;
  Game_Map.prototype.initialize = function() {
    this._lighting = new Game_Lighting();
    this._battleLighting = new Game_Lighting();
    this.kal_initialize();
  };
  Game_Map.prototype.khasSetupMap = function() {
    this._terrainTagLights = {};
    this._regionTagLights = {};
    this._tileLights = [];
    if (Khas.Lighting.Settings.TRANSFER_RESET) this._lighting.setAmbientLight("ffffffff");
    this.kal_khasSetupMap();
  };
  Game_Map.prototype.callKhasCommand = function(command, value1, value2) {
    switch (command) {
    case "ambient_light": 
      var switchId = Number(value2 || "");
      var target = value1;
      if (!(target.length == 6 || target.length == 8)) target = Number(target);
      if (switchId > 0) {
        if ($gameSwitches.value(switchId)) this._lighting.setAmbientLight(target);
      } else {
        if (this._lighting.autoAmbientLight) this._lighting.setAmbientLight(target);
      };
      break;
    case "region_light": 
      this._regionTagLights[value1] = value2;
      break;
    default: 
      this.kal_callKhasCommand(command, value1, value2);
    };
  };
  Game_Map.prototype.callKhasTilesetCommand = function(command, value1, value2) {
    if (command == "tag_light") {
      this._terrainTagLights[value1] = value2;
    } else {
      this.kal_callKhasTilesetCommand(command, value1, value2);
    };
  };
  Game_Map.prototype.khasPostScan = function() {
    this.kal_khasPostScan();
    this.scanMapLights();
  };
  Game_Map.prototype.scanMapLights = function() {
    var width = $dataMap.width;
    var height = $dataMap.height;
    var lightId = "";
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        lightId = this._regionTagLights[this.regionId(x, y)];
        if (lightId) {
          if (Khas.Lighting.LIGHTS[lightId]) {
            this.addTileLight(x, y, lightId);
          } else {
            alert("Light not found: " + (lightId) + "\nCheck the region tags");
          };
        } else {
          lightId = this._terrainTagLights[this.terrainTag(x, y)];
          if (lightId) {
            if (Khas.Lighting.LIGHTS[lightId]) {
              this.addTileLight(x, y, lightId);
            } else {
              alert("Light not found: " + (lightId) + "\nCheck the tileset's terrain tags");
            };
          };
        };
      };
    };
  };
  Game_Map.prototype.addTileLight = function(x, y, lightId) {
    this._tileLights.push(new Game_LightTile(x, y, lightId));
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game CharacterBase
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Object.defineProperty(Game_CharacterBase.prototype, 'light_id', { get: function() { return this._light_id; }, });
  Object.defineProperty(Game_CharacterBase.prototype, 'light_ox', { get: function() { return this._light_ox; }, });
  Object.defineProperty(Game_CharacterBase.prototype, 'light_oy', { get: function() { return this._light_oy; }, });
  Object.defineProperty(Game_CharacterBase.prototype, 'light_size', { get: function() { return this._light_size; }, });
  Object.defineProperty(Game_CharacterBase.prototype, 'light_transition', { get: function() { return this._light_transition; }, });
  Game_CharacterBase.prototype.kal_initialize = Game_CharacterBase.prototype.initialize;
  Game_CharacterBase.prototype.initialize = function() {
    this.kal_initialize();
    this.clearLight();
  };
  Game_CharacterBase.prototype.setLight = function(lightId, transition) {
    this.clearLight();
    this._light_transition = (transition ? transition : null);
    if (lightId) {
      if (Khas.Lighting.LIGHTS[lightId]) {
        this.registerLight(lightId);
      } else {
        alert("Light not found: " + (lightId) + "");
      };
    };
  };
  Game_CharacterBase.prototype.registerLight = function(lightId) {
    this._light_id = lightId;
  };
  Game_CharacterBase.prototype.clearLight = function() {
    this._light_id = null;
    this._light_ox = null;
    this._light_oy = null;
    this._light_size = null;
    this._light_transition = null;
  };
  Game_CharacterBase.prototype.hasLight = function() {
    return this._light_id ? true : false;
  };
  Game_CharacterBase.prototype.lightScreenX = function() {
    return Math.round(($gameMap.adjustX(this._realX) + 0.5) * $gameMap.tileWidth() + $gameScreen.shake());
  };
  Game_CharacterBase.prototype.lightScreenY = function() {
    return Math.round(($gameMap.adjustY(this._realY) + 0.5) * $gameMap.tileHeight());
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Player
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Game_Player.prototype.registerLight = function(lightId) {
    Game_Character.prototype.registerLight.call(this, lightId);
    if ($khasGraphics.lighting) $khasGraphics.lighting.addPlayer();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Event
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Game_Event.prototype.kal_khasExtendSetup = Game_Event.prototype.khasExtendSetup;
  Game_Event.prototype.kal_callKhasCommand = Game_Event.prototype.callKhasCommand;
  Game_Event.prototype.khasExtendSetup = function() {
    this.kal_khasExtendSetup();
    this.clearLight();
  };
  Game_Event.prototype.callKhasCommand = function(command, value1, value2) {
    switch (command) {
    case "light": 
      this.setLight(value1);
      break;
    case "light_offset": 
      this._light_ox = Number(value1);
      this._light_oy = Number(value2);
      break;
    case "light_size": 
      this._light_size = Number(value1);
      break;
    case "smooth_light": 
      this.setLight(value1, Number(value2));
      break;
    default: 
      this.kal_callKhasCommand(command, value1, value2);
    };
  };
  Game_Event.prototype.registerLight = function(lightId) {
    Game_Character.prototype.registerLight.call(this, lightId);
    if ($khasGraphics.lighting) $khasGraphics.lighting.addEvent(this);
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Interpreter
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Game_Interpreter.prototype.kal_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    if (!(command)) return;
    args = args || [];
    switch (command.toLowerCase()) {
    case "lighting": 
      var state = (args[0] || "").toLowerCase();
      if (state == "on") $gameMap.lighting.enable();
      if (state == "off") $gameMap.lighting.disable();
      break;
    case "ambientlight": 
      var target = args[0] || "100";
      if (!(target.length == 6 || target.length == 8)) target = Number(target);
      var time = Number(args[1] || "0");
      $gameMap.lighting.setAmbientLight(target, time);
      //$gameMap.battleLighting.setAmbientLight(target) if Khas.Lighting.Settings.AUTO_BATTLE_AL
      break;
    case "autoambientlight": 
      var state =(args[0] || "").toLowerCase();
      if (state == "on") $gameMap.lighting.autoAmbientLight = true;
      if (state == "off") $gameMap.lighting.autoAmbientLight = false;
      break;
    case "saveambientlight": 
      var stateName = args[0] || "";
      $gameMap.lighting.saveState(stateName);
      break;
    case "loadambientlight": 
      var stateName = args[0] || "";
      var time = Number(args[1] || "0");
      $gameMap.lighting.loadState(stateName, time);
      break;
    case "playerlantern": 
      var lightId = args[0] || "";
      if (lightId.toLowerCase() == "off") {
        $gamePlayer.setLight(null) ;
      } else {
        $gamePlayer.setLight(lightId);
      };
      break;
    case "setactorlight": 
      var actorId = Number(args[0] || "0");
      var lightId = args[1] || null;
      var ox = Number(args[2] || "0");
      var oy = Number(args[3] || "0")      ;
      if (actorId && lightId) $gameMap.battleLighting.setBattlerLight("actor", actorId, lightId, ox, oy);
      break;
    case "setenemylight": 
      var enemyId = Number(args[0] || "0");
      var lightId = args[1] || null;
      var ox = Number(args[2] || "0");
      var oy = Number(args[3] || "0")   ;
      if (enemyId && lightId) $gameMap.battleLighting.setBattlerLight("enemy", enemyId, lightId, ox, oy);
      break;
    case "battlelighting": 
      var battleCommand = args[0] || "";
      switch (battleCommand.toLowerCase()) {
      case "reset": 
        $gameMap.battleLighting.resetLighting();
        break;
      case "ambientlight": 
        var target = args[1] || "100";
        if (!(target.length == 6 || target.length == 8)) target = Number(target);
        $gameMap.battleLighting.setAmbientLight(target);
        break;
      case "addlight": 
        var lightId = args[1] || "";
        var x = Number(args[2] || "");
        var y = Number(args[3] || "");
        if (Khas.Lighting.LIGHTS[lightId]) {
          $gameMap.battleLighting.addLightPoint(new Game_LightPoint(x, y, lightId));
        } else {
          alert("Light not found: " + (lightId) + "\nCheck your plugin commands.");
        };
        break;
      };
      break;
    default: 
      this.kal_pluginCommand(command, args);
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game Lighting
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Game_Lighting() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Game_Lighting.prototype, 'enabled', { get: function() { return this._enabled; }, });
  Object.defineProperty(Game_Lighting.prototype, 'ambientLight', { get: function() { return this._ambientLight; }, });
  Object.defineProperty(Game_Lighting.prototype, 'lightPoints', { get: function() { return this._lightPoints; }, });
  Object.defineProperty(Game_Lighting.prototype, 'battlerLightIds', { get: function() { return this._battlerLightIds; }, });
  Object.defineProperty(Game_Lighting.prototype, 'autoAmbientLight', { get: function() { return this._autoAmbientLight; }, set: function(value) { this._autoAmbientLight = value; }});
  Game_Lighting.prototype.initialize = function() {
    this._enabled = true;
    this._ambientLight = new Khas_AmbientLight();
    this._autoAmbientLight = true;
    this._savedStates = {};
    this._battlerLightIds = {"actor": {}, "enemy": {}};
    this.resetLighting();
  };
  Game_Lighting.prototype.resetLighting = function() {
    this._ambientLight.reset();
    this._lightPoints = [];
    this._lightBattlers = [];
  };
  Game_Lighting.prototype.update = function() {
    if (!(this._enabled)) return;
    this._ambientLight.update();
  };
  Game_Lighting.prototype.enable = function() {
    this.setState(true);
  };
  Game_Lighting.prototype.disable = function() {
    this.setState(false);
  };
  Game_Lighting.prototype.setState = function(enabled) {
    this._enabled = enabled;
  };
  Game_Lighting.prototype.setAmbientLight = function(target, time) {
    if (typeof target == "string") {
      color = /^#?([a-f\d]{2})?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(target);
      if (color) {
        var i = color[1] ? (parseInt(color[1], 16)) / 255 : null;
        var r = (parseInt(color[2], 16)) / 255;
        var g = (parseInt(color[3], 16)) / 255;
        var b = (parseInt(color[4], 16)) / 255;
        this._ambientLight.set(i, time, r, g, b);
      };
    } else {
      var i = target.clamp(0, 100) / 100;
      this._ambientLight.set(i, time);
    };
  };
  Game_Lighting.prototype.addLightPoint = function(lightPoint) {
    this._lightPoints.push(lightPoint);
  };
  Game_Lighting.prototype.clearLightPoints = function() {
    this._lightPoints = [];
  };
  Game_Lighting.prototype.saveState = function(stateName) {
    this._savedStates[stateName] = {
      "enabled": this._enabled,
      "ambientLight": {
          "intensity": this._ambientLight.intensity,
          "red": this._ambientLight.red,
          "green": this._ambientLight.green,
          "blue": this._ambientLight.blue
      },
      "autoAmbientLight": this._autoAmbientLight
    };
  };
  Game_Lighting.prototype.loadState = function(stateName, time) {
    if (stateName in this._savedStates) {
      this._enabled = this._savedStates[stateName]["enabled"];
      i = this._savedStates[stateName]["ambientLight"]["intensity"];
      r = this._savedStates[stateName]["ambientLight"]["red"];
      g = this._savedStates[stateName]["ambientLight"]["green"];
      b = this._savedStates[stateName]["ambientLight"]["blue"];
      this._ambientLight.set(i, time, r, g, b);
      this._autoAmbientLight = this._savedStates[stateName]["autoAmbientLight"];
    };
  };
  Game_Lighting.prototype.copyAmbientLight = function(gameLighting) {
    i = gameLighting.ambientLight.intensity;
    r = gameLighting.ambientLight.red;
    g = gameLighting.ambientLight.green;
    b = gameLighting.ambientLight.blue;
    this._ambientLight.set(i, 0, r, g, b);
  };
  Game_Lighting.prototype.addLightBattler = function(lightBattler) {
    this._lightBattlers.push(lightBattler);
  };
  Game_Lighting.prototype.clearLightBattlers = function() {
    this._lightBattlers = [];
  };
  Game_Lighting.prototype.updateLightBattlers = function() {
    for (var i = 0; i < this._lightBattlers.length; i++) {
      this._lightBattlers[i].update();
    };
  };
  Game_Lighting.prototype.setBattlerLight = function(type, battlerId, lightId, offset_x, offset_y) {
    this._battlerLightIds[type][battlerId] = {
      id: lightId,
      ox: offset_x,
      oy: offset_y
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game LightPoint
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Game_LightPoint() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Game_LightPoint.prototype, 'light_id', { get: function() { return this._light_id; }, });
  Object.defineProperty(Game_LightPoint.prototype, 'light_ox', { get: function() { return this._light_ox; }, });
  Object.defineProperty(Game_LightPoint.prototype, 'light_oy', { get: function() { return this._light_oy; }, });
  Object.defineProperty(Game_LightPoint.prototype, 'light_size', { get: function() { return this._light_size; }, });
  Object.defineProperty(Game_LightPoint.prototype, 'light_transition', { get: function() { return this._light_transition; }, });
  Game_LightPoint.prototype.initialize = function(screenX, screenY, light_id) {
    this._screenX = screenX;
    this._screenY = screenY;
    this._direction = 2;
    this._light_id = light_id;
    this._light_ox = null;
    this._light_oy = null;
    this._light_size = null;
    this._light_transition = null;
  };
  Game_LightPoint.prototype.lightScreenX = function() {
    return this._screenX;
  };
  Game_LightPoint.prototype.lightScreenY = function() {
    return this._screenY;
  };
  Game_LightPoint.prototype.khasType = function() {
    return "point";
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game LightTile
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Game_LightTile() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Game_LightTile.prototype, 'light_id', { get: function() { return this._light_id; }, });
  Object.defineProperty(Game_LightTile.prototype, 'light_ox', { get: function() { return this._light_ox; }, });
  Object.defineProperty(Game_LightTile.prototype, 'light_oy', { get: function() { return this._light_oy; }, });
  Object.defineProperty(Game_LightTile.prototype, 'light_size', { get: function() { return this._light_size; }, });
  Object.defineProperty(Game_LightTile.prototype, 'light_transition', { get: function() { return this._light_transition; }, });
  Game_LightTile.prototype.initialize = function(x, y, light_id) {
    this._realX = x + 0.5;
    this._realY = y + 0.5;
    this._direction = 2;
    this._light_id = light_id;
    this._light_ox = null;
    this._light_oy = null;
    this._light_size = null;
    this._light_transition = null;
  };
  Game_LightTile.prototype.lightScreenX = function() {
    return Math.round($gameMap.adjustX(this._realX) * $gameMap.tileWidth() + $gameScreen.shake());
  };
  Game_LightTile.prototype.lightScreenY = function() {
    return Math.round($gameMap.adjustY(this._realY) * $gameMap.tileHeight());
  };
  Game_LightTile.prototype.khasType = function() {
    return "tile";
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Game LightBattler
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Game_LightBattler() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Game_LightBattler.prototype, 'light_id', { get: function() { return this._light_id; }, });
  Object.defineProperty(Game_LightBattler.prototype, 'light_ox', { get: function() { return this._light_ox; }, });
  Object.defineProperty(Game_LightBattler.prototype, 'light_oy', { get: function() { return this._light_oy; }, });
  Object.defineProperty(Game_LightBattler.prototype, 'light_size', { get: function() { return this._light_size; }, });
  Object.defineProperty(Game_LightBattler.prototype, 'light_transition', { get: function() { return this._light_transition; }, });
  Game_LightBattler.prototype.initialize = function(battlerSprite, type) {
    this._battlerSprite = battlerSprite;
    this._type = type;
    this._battler = null;
    this._direction = 2;
    this._light_id = null;
    this._light_ox = null;
    this._light_oy = null;
    this._light_size = null;
    this._light_transition = 1;
  };
  Game_LightBattler.prototype.findLightProperties = function() {
    if (this._battler) {
      var id = 0;
      if (this._type == "actor") {
        id = this._battler._actorId;
      } else {
        id = this._battler._enemyId;
      };
      var lightProperties = $gameMap.battleLighting.battlerLightIds[this._type][id];
      if (lightProperties) {
        if (Khas.Lighting.LIGHTS[lightProperties.id]) {
          return lightProperties;
        } else {
          return null;
        };
      } else {
        return null;
      };
    } else {
      return null;
    };
  };
  Game_LightBattler.prototype.update = function() {
    if (this._battler != this._battlerSprite._battler) {
      this._battler = this._battlerSprite._battler;
      var lightProperties = this.findLightProperties();
      if (this._battler && lightProperties) {
        this._light_id = lightProperties.id;
        this._light_ox = lightProperties.ox;
        this._light_oy = lightProperties.oy;
        this.registerLight();
      };
    };
    if (this._battler && this._battler.hp <= 0) {
      this._light_id = null;
    };
  };
  Game_LightBattler.prototype.registerLight = function() {
    if ($khasGraphics.lighting && this._light_id) $khasGraphics.lighting.addCharacter(this);
  };
  Game_LightBattler.prototype.lightScreenX = function() {
    return this._battlerSprite.x;
  };
  Game_LightBattler.prototype.lightScreenY = function() {
    return this._battlerSprite.y;
  };
  Game_LightBattler.prototype.khasType = function() {
    return "battler";
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Sprite Light
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Sprite_Light() { this.initialize.apply(this, arguments); }; 
Sprite_Light.prototype = Object.create(Sprite.prototype);
Sprite_Light.prototype.constructor = Sprite_Light;
  Sprite_Light.DIRECTION_ANGLE = { 2: 0, 4: 1.5708, 6: 4.7124, 8: 3.1416 };
  Object.defineProperty(Sprite_Light.prototype, 'id', { get: function() { return this._id; }, });
  Object.defineProperty(Sprite_Light.prototype, 'character', { get: function() { return this._character; }, });
  Sprite_Light.prototype.initialize = function(character) {
    this._id = character.light_id;
    this._character = character;
    this._screenX = 0;
    this._screenY = 0;
    Sprite.prototype.initialize.call(this, Khas.Lighting.cache[this._id]);
    this.setLightProperties();
    this.setSpriteProperties();
  };
  Sprite_Light.prototype.setLightProperties = function() {
    this._character_ox = null;
    this._character_oy = null;
    this._character_size = null;
    var data = this.getData();
    this._intensity = data.intensity.clamp(0, 100);
    var c = 100 - (this._intensity + data.variation);
    this._variation = (c < 0 ? (data.variation + c) : data.variation);
    this._dynamic_intensity = (this._variation > 0);
    this._syncWithDirection = data.syncWithDirection ? true : false;
    this._ox = data.offset_x;
    this._oy = data.offset_y;
    if (this._syncWithDirection && typeof(this._ox) != "object") this._ox = {2: this._ox, 4: this._ox, 6: this._ox, 8: this._ox };
    if (this._syncWithDirection && typeof(this._oy) != "object") this._oy = {2: this._oy, 4: this._oy, 6: this._oy, 8: this._oy };
    this.setSize(Number(data.size ? data.size : 100));
    this._transition = this._character.light_transition;
    if (this._transition && this._transition <= 0) this._transition = null;
    this._target_intensity = this._intensity;
    if (this._transition) {
      this._intensity = 0;
      this._transition_up = true;
      this._dynamic_intensity = true;
    };
  };
  Sprite_Light.prototype.setSpriteProperties = function() {
    this.blendMode = Khas.Lighting.Settings.CUSTOM_BLEND_MODE ? PIXI.BLEND_MODES.KHAS_LIGHT : PIXI.BLEND_MODES.SCREEN;
    this.alpha = this.getIntensity() * 0.01;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
  };
  Sprite_Light.prototype.setSize = function(size) {
    if (!(size > 0)) size = 100;
    size /= 100.0;
    this.scale.x = size;
    this.scale.y = size;
  };
  Sprite_Light.prototype.deleted = function() {
    return this._id ? false : true;
  };
  Sprite_Light.prototype.getData = function() {
    return Khas.Lighting.LIGHTS[this._id];
  };
  Sprite_Light.prototype.getIntensity = function() {
    return this._intensity + Math.randomInt(this._variation);
  };
  Sprite_Light.prototype.refreshScreenPosition = function() {
    if (this._syncWithDirection) {
      var d = this._character._direction;
      this.rotation = Sprite_Light.DIRECTION_ANGLE[d];
      this._screenX = this._character.lightScreenX() + this._ox[d];
      this._screenY = this._character.lightScreenY() + this._oy[d];
    } else {
      this._screenX = this._character.lightScreenX() + this._ox;
      this._screenY = this._character.lightScreenY() + this._oy;
    };
  };
  Sprite_Light.prototype.refreshOffsets = function() {
    this._character_ox = this._character.light_ox;
    this._character_oy = this._character.light_oy;
    this._ox = this._character_ox;
    this._oy = this._character_oy;
    if (this._syncWithDirection) this._ox = {2: this._ox, 4: this._ox, 6: this._ox, 8: this._ox };
    if (this._syncWithDirection) this._oy = {2: this._oy, 4: this._oy, 6: this._oy, 8: this._oy };
  };
  Sprite_Light.prototype.refreshSize = function() {
    this._character_size = this._character.light_size;
    this.setSize(this._character_size);
  };
  Sprite_Light.prototype.refreshLight = function() {
    if (this._id != this._character.light_id) {
      if (this._transition) {
        if (this._target_intensity == 0) {
          if (!(this._intensity <= 0)) return;
        } else {
          this._target_intensity = 0;
          this._transition = -this._transition;
          this._transition_up = false;
          this._dynamic_intensity = true;
          return;
        };
      };
      this._id = this._character.light_id;
      if (this._id) {
        this.bitmap = Khas.Lighting.cache[this._id];
        this.setLightProperties();
      };
    };
  };
  Sprite_Light.prototype.refreshTransition = function() {
    this._intensity += this._transition;
    if (this._transition_up && this._intensity >= this._target_intensity) {
      this._intensity = this._target_intensity ;
      this.alpha = this.getIntensity() * 0.01;
      this._dynamic_intensity = (this._variation > 0);
    };
  };
  Sprite_Light.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.refreshLight();
    if (this._character_ox != this._character.light_ox ) this.refreshOffsets();
    if (this._character_size != this._character.light_size) this.refreshSize();
    if (this._intensity != this._target_intensity) this.refreshTransition();
    this.refreshScreenPosition();
    this.x = this._screenX;;
    this.y = this._screenY;;
    if (this._dynamic_intensity) this.alpha = this.getIntensity() * 0.01;
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Spriteset Battle
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  Spriteset_Battle.prototype.kal_initializeKhasGraphics = Spriteset_Battle.prototype.initializeKhasGraphics;
  Spriteset_Battle.prototype.kal_update = Spriteset_Battle.prototype.update;
  Spriteset_Battle.prototype.initializeKhasGraphics = function() {
    this.createLightBattlers();
    this.kal_initializeKhasGraphics();
  };
  Spriteset_Battle.prototype.createLightBattlers = function() {
    $gameMap.battleLighting.clearLightBattlers();
    if (Khas.Lighting.Settings.AUTO_BATTLE_LIGHTING) {
      for (var i = 0; i < this._actorSprites.length; i++) {
        this.addLightBattler(this._actorSprites[i], "actor");
      };
      for (var i = 0; i < this._enemySprites.length; i++) {
        this.addLightBattler(this._enemySprites[i], "enemy");
      };
    };
  };
  Spriteset_Battle.prototype.addLightBattler = function(battlerSprite, type) {
    var lightBattler = new Game_LightBattler(battlerSprite, type);
    $gameMap.battleLighting.addLightBattler(lightBattler);
  };
  Spriteset_Battle.prototype.update = function() {
    this.kal_update();
    $gameMap.battleLighting.updateLightBattlers();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Ambient Light
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Khas_AmbientLight() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Khas_AmbientLight.prototype, 'intensity', { get: function() { return this._intensity; }, });
  Object.defineProperty(Khas_AmbientLight.prototype, 'red', { get: function() { return this._red; }, });
  Object.defineProperty(Khas_AmbientLight.prototype, 'green', { get: function() { return this._green; }, });
  Object.defineProperty(Khas_AmbientLight.prototype, 'blue', { get: function() { return this._blue; }, });
  Khas_AmbientLight.prototype.initialize = function() {
    this.reset();
  };
  Khas_AmbientLight.prototype.reset = function() {
    this._intensity = 1.0;
    this._red = 1.0;
    this._green = 1.0;
    this._blue = 1.0;
    this._ti = this._intensity;
    this._tr = this._red;
    this._tg = this._green;
    this._tb = this._blue;
    this._di = 0.0;
    this._dr = 0.0;
    this._dg = 0.0;
    this._db = 0.0;
    this._timer = 0;
  };
  Khas_AmbientLight.prototype.update = function() {
    if (this._timer > 0) {
      this.processChanges();
      this._timer -= 1;
      if (!(this._timer > 0)) this.processTarget();
    };
  };
  Khas_AmbientLight.prototype.set = function(i, time, r, g, b) {
    this._timer = (typeof time == "number" ? time : 0);
    this._ti = (typeof i == "number" ? i : this._intensity);
    this._tr = (typeof r == "number" ? r : this._red);
    this._tg = (typeof g == "number" ? g : this._green);
    this._tb = (typeof b == "number" ? b : this._blue);
    if (this._timer > 0) {
      this._di = (this._ti - this._intensity) / this._timer;
      this._dr = (this._tr - this._red) / this._timer;
      this._dg = (this._tg - this._green) / this._timer;
      this._db = (this._tb - this._blue) / this._timer;
    } else {
      this.processTarget();
    };
  };
  Khas_AmbientLight.prototype.processChanges = function() {
    this._intensity += this._di;
    this._red += this._dr;
    this._green += this._dg;
    this._blue += this._db;
  };
  Khas_AmbientLight.prototype.processTarget = function() {
    this._intensity = this._ti;
    this._red = this._tr;
    this._green = this._tg;
    this._blue = this._tb;
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Graphics
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
  Object.defineProperty(Khas_Graphics.prototype, 'lighting', { get: function() { return this._lighting; }, });
  Khas_Graphics.prototype.kal_loadResources = Khas_Graphics.prototype.loadResources;
  Khas_Graphics.prototype.kal_newScene = Khas_Graphics.prototype.newScene;
  Khas_Graphics.prototype.kal_updateScene = Khas_Graphics.prototype.updateScene;
  Khas_Graphics.prototype.kal_clearScene = Khas_Graphics.prototype.clearScene;
  Khas_Graphics.prototype.loadResources = function() {
    this.kal_loadResources;
    var lightNames = Object.keys(Khas.Lighting.LIGHTS);
    for (var i = 0; i < lightNames.length; i++) {
      Khas.Lighting.cache[lightNames[i]] = ImageManager.loadLight(Khas.Lighting.LIGHTS[lightNames[i]].fileName);
    };
    Khas.Filters.LIGHTING = new Khas_LightingFilter();
  };
  Khas_Graphics.prototype.newScene = function() {
    this.kal_newScene();
    switch (this._spriteset.khasType()) {
    case "map": 
      $gameMap.battleLighting.clearLightBattlers();
      this._lighting = new Khas_Lighting($gameMap.lighting);
      this._lighting.addMapLights();
      break;
    case "battle": 
      if (Khas.Lighting.Settings.AUTO_BATTLE_LIGHTING) $gameMap.battleLighting.copyAmbientLight($gameMap.lighting);
      this._lighting = new Khas_Lighting($gameMap.battleLighting);
      this._lighting.addLightPoints();
      break;
    };
    this._spriteset.addChild(this._lighting.layerSprite);
  };
  Khas_Graphics.prototype.updateScene = function() {
    this.kal_updateScene();
    if (this._lighting) this._lighting.update();
  };
  Khas_Graphics.prototype.clearScene = function() {
    this._lighting = null;
    this.kal_clearScene();
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Lighting
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function Khas_Lighting() { this.initialize.apply(this, arguments); }; 
  Object.defineProperty(Khas_Lighting.prototype, 'layerSprite', { get: function() { return this._layerSprite; }, });
  Khas_Lighting.prototype.initialize = function(lightingState) {
    this._lights = [];
    this._events = [];
    this._player = false;
    this._lightingState = lightingState;
    this._enabled = this._lightingState.enabled;
    this._layer = new PIXI.Container();
    this._lightMap = new PIXI.RenderTexture.create(Graphics.width, Graphics.height);
    this._filter = Khas.Filters.LIGHTING;
    this._filter.setResolution(Graphics.width, Graphics.height);
    this._filter.blendMode = PIXI.BLEND_MODES.KHAS_LIGHTING;
    this._layerSprite = new Khas_Sprite(this._lightMap);
    this._layerSprite.addFilter(this._filter);
  };
  Khas_Lighting.prototype.update = function() {
    if (this._enabled != this._lightingState.enabled) {
      this._enabled = this._lightingState.enabled;
      this._layerSprite.visible = this._enabled;
    };
    if (!(this._enabled)) return;
    this._lightingState.update();
    for (var i = 0; i < this._lights.length; i++) {
      this._lights[i].update();
      if (this._lights[i].deleted()) {
        this.deleteLight(this._lights[i]);
        i -= 1;
      };
    };
    this._filter.setAmbientLight(this._lightingState.ambientLight);
    Graphics._renderer.render(this._layer, this._lightMap);
  };
  Khas_Lighting.prototype.addLight = function(spriteLight) {
    this._lights.push(spriteLight);
    this._layer.addChild(spriteLight);
  };
  Khas_Lighting.prototype.deleteLight = function(spriteLight) {
    switch (spriteLight.character.khasType()) {
    case "event": 
      this._events.remove(spriteLight.character.eventId());
      break;
    case "player": 
      this._player = false;
      break;
    };
    this._lights.remove(spriteLight);
    this._layer.removeChild(spriteLight);
  };
  Khas_Lighting.prototype.addEvent = function(event) {
    var id = event.eventId();
    if (!(this._events.include(id))) {
      this._events.push(id) ;
      this.addLight(new Sprite_Light(event));
    };
  };
  Khas_Lighting.prototype.addPlayer = function() {
    if (!(this._player)) {
      this._player = true;
      this.addLight(new Sprite_Light($gamePlayer));
    };
  };
  Khas_Lighting.prototype.addCharacter = function(character) {
    this.addLight(new Sprite_Light(character));
  };
  Khas_Lighting.prototype.addMapLights = function() {
    var events = $gameMap.events();
    for (var i = 0; i < events.length; i++) {
      if (events[i].hasLight()) this.addEvent(events[i]);
    };
    if ($gamePlayer.hasLight()) this.addPlayer();
    var tiles = $gameMap.tileLights;
    for (var i = 0; i < tiles.length; i++) {
      this.addCharacter(tiles[i]);
    };
  };
  Khas_Lighting.prototype.addLightPoints = function() {
    var points = this._lightingState.lightPoints;
    for (var i = 0; i < points.length; i++) {
      this.addCharacter(points[i]);
    };
  };
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// * Khas Filters
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Khas.Filters.Source.FRAGMENT_LIGHTING = "\n  varying vec2 vTextureCoord;\n\n  uniform vec2 screenResolution;\n  uniform sampler2D uSampler;\n  uniform vec4 ambientLight;\n\n  void main(void) {\n    vec4 light = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = light + ambientLight;\n  }\n";
function Khas_LightingFilter() { this.initialize.apply(this, arguments); }; 
Khas_LightingFilter.prototype = Object.create(Khas_Filter.prototype);
Khas_LightingFilter.prototype.constructor = Khas_LightingFilter;
  Khas_LightingFilter.prototype.initialize = function() {
    Khas_Filter.prototype.initialize.call(this, Khas.Filters.Source.VERTEX_GENERAL, Khas.Filters.Source.FRAGMENT_LIGHTING);
  };
  Khas_LightingFilter.prototype.setResolution = function(width, height) {
    this.uniforms.screenResolution.x = width;
    this.uniforms.screenResolution.y = height;
  };
  Khas_LightingFilter.prototype.setLightMap = function(lightMap) {
    this.uniforms.lightMap = lightMap;
  };
  Khas_LightingFilter.prototype.setAmbientLight = function(ambientLight) {
    this.uniforms.ambientLight[0] = ambientLight.red * ambientLight.intensity;
    this.uniforms.ambientLight[1] = ambientLight.green * ambientLight.intensity;
    this.uniforms.ambientLight[2] = ambientLight.blue * ambientLight.intensity;
    this.uniforms.ambientLight[3] = ambientLight.intensity;
  };
//=====================================================================================================================
// * End of Plugin
//=====================================================================================================================