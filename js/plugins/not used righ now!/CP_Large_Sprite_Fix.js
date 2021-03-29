/*:
 * @plugindesc Fixes an issue with large sprites appearing under ☆ passability tiles.
 * @author Neon Black (fixed by Shaz) - Version 1.1
 *
 * @help Large Sprite ☆ Fix v1.1
 *
 * V1.0 - 8.11.2015
 * V1.1 - 10.28.2015 Shaz fixed issue with incorrect bitmap dimensions
 *
 * This plugin was created to fix an issue similar to the fix applied in Ace
 * where large sprites would display under ☆ passability tiles when they should
 * appear above them.  This plugin is for the most part non-intrusive but does
 * require a little bit of input from the user.
 *
 * By default, only the player is affected by this plugin.  To apply this fix to
 * an event, add the tag <large sprite> to a comment box in the page of the
 * event you would like to appear above ☆ tiles properly.
 *
 * This work by Neon Black is licensed under a Creative Commons Attribution 4.0
 * International License.  To view a copy of this license, visit
 * http://creativecommons.org/licenses/by/4.0/.  Permissions beyond the scope of
 * this license may be available at neonblack.moe/terms.
 *
 * @param Terrain ID
 * @desc This is the ID of the terrain to fix with ☆ tiles.  Terrain ID is set in the database.
 * @default 7
 *
 * @param Large Followers
 * @desc Enable this option to perform large sprite checking on followers.  Disabled by default.
 * @default No
 *
 * @param Large Vehicles
 * @desc Enable this option to perform large sprite checking on vehicles.  Enabled by default.
 * @default Yes
 */

/*:ja
 * @plugindesc すり抜け可能タイル(★タイル)の下側に
 * 大きなスプライトが出現する際の問題点を解決します。
 * @author Neon Black (修正 Shaz)- Version 1.1
 *
 * @help Large Sprite ☆ Fix v1.1
 *
 * V1.0 - 8.11.2015
 * V1.1 - 10.28.2015 Shaz による修正（ビットマップサイズの問題解決）
 *
 * このプラグインは、すり抜け可能タイル(★タイル)の上に表示されるべき
 * スプライトが、背面に表示されてしまうバグの修正を行います。
 * ほとんどが自動的な修正となりますが、多少のカスタムが必要となります。
 * 
 * デフォルト状態では、このプラグインが有効になるのはプレイヤーに対してだけです。
 * イベントに対してもこのプラグインを有効にしたい場合は、
 * 対象のイベントのコメントボックス内に<large sprite>タグを挿入してください。
 * これによって、★タイルの上にイベントを表示することができます。
 * 
 * ■ライセンスポリシー
 * This work by Neon Black is licensed under a Creative Commons Attribution 4.0
 * International License.  To view a copy of this license, visit
 * http://creativecommons.org/licenses/by/4.0/.  Permissions beyond the scope of
 * this license may be available at neonblack.moe/terms.
 *
 * @param Terrain ID
 * @desc ★タイルによって固定される地形IDです。
 * @default 7
 *
 * @param Large Followers
 * @desc YESにすることで、フォロワーキャラクターにも適用されます。
 * デフォルトではOFFになっています。　
 * @default No
 *
 * @param Large Vehicles
 * @desc YESにすることで、乗り物にも適用されます。
 * デフォルトではONになっています。
 * @default Yes
 */


//------
// The following lines are the actual core code of the plugin.  While you are
// certainly invited to look, modifying it may result in undesirable results.
// Modify at your own risk!
//------



//------
// Imported and namespace
//------
var Imported = Imported || {};
Imported.CP_LargeSpriteFix = 1.0;

var cpp = cpp || {};
cpp.yyt = ['yes', 'y', 'true'];
cpp.lsdf = cpp.lsdf || {};

cpp.lsdf.params    = PluginManager.parameters('CP_Large_Sprite_Fix');
cpp.lsdf.terrain   = cpp.lsdf.params['Terrain ID'];
cpp.lsdf.followers = cpp.yyt.indexOf(cpp.lsdf.params['Large Followers'].toLowerCase()) >= 0;
cpp.lsdf.vehicles  = cpp.yyt.indexOf(cpp.lsdf.params['Large Vehicles'].toLowerCase()) >= 0;

//------
// Alias functions
//------
var aliasUpdateBitmap081115a   = Sprite_Character.prototype.updateBitmap;
var aliasUpdatePosition081115a = Sprite_Character.prototype.updatePosition;
var aliasSetupPage081115a      = Game_Event.prototype.setupPage;

//------
// Destructive functions list
/*
 */


//------
// Sprite_Character
//------
Sprite_Character.prototype.setUpperAreaSprite = false;
Sprite_Character.prototype.forceGfxChange = false;
Sprite_Character.prototype.oldBitmap = null;
Sprite_Character.prototype.upperAreaSprite = null;

// Checks if the sprite has been changed.
Sprite_Character.prototype.updateBitmap = function() {
  if (this.isImageChanged() && this.setUpperAreaSprite)
    this.forceGfxChange = true;
  else
    this.forceGfxChange = false;
  aliasUpdateBitmap081115a.apply(this, arguments);
}

Sprite_Character.prototype.updatePosition = function() {
  aliasUpdatePosition081115a.apply(this, arguments);
  if (this.spriteIsOnscreen())
    this.checkEncompassedArea();
}

// 5 would be highest priority level for characters
Sprite_Character.prototype.spriteIsOnscreen = function() {
//  if (this._character.largeSprite() && this._character.screenZ() < 5) {
  if (this._character.screenZ() < 5) {
    var rectArray = this.getEdgeRect();
    if (rectArray[0] < Graphics._width && rectArray[1] < Graphics._height &&
        rectArray[2] > 0 && rectArray[3] > 0)
      return true;
  }
  return false;
}

Sprite_Character.prototype.getEdgeRect = function() {
  var x = this.x - Math.round(this.patternWidth() * this.anchor.x);
  var y = this.y - Math.round(this.patternHeight() * this.anchor.y);
  var w = x + this.patternWidth();
  var h = y + this.patternHeight();
  return [x, y, w, h];
}

Sprite_Character.prototype.checkEncompassedArea = function() {
  var tw = $gameMap.tileWidth();
  var th = $gameMap.tileHeight();
  if (this.setUpperAreaSprite && this.forceGfxChange)
    this.oldBitmap = this.bitmap;
  this.setUpperAreaSprite = false;
  var boxArray = this.getEdgeRect();
  var lastX = null;
  var lastY = null;
  var copyR = 0;
  var mapXD = $gameMap.displayX() * $gameMap.tileWidth();
  var mapYD = $gameMap.displayY() * $gameMap.tileHeight();
  var totalH = (this.patternHeight() + this._character.jumpHeight());
  var _bx = [false, 0, 0, 0];
  for (var x = 0; x < this.patternWidth(); x++) {
    var xp = Math.round(mapXD) + boxArray[0] + x;
    if (Math.floor(xp / tw) !== lastX) {
      lastX = Math.floor(xp / tw);
      lastY = null;
      copyR = 0;
      for (var y = 0; y < totalH; y++) {
        var yp = Math.round(mapYD) + boxArray[3] + this._character.jumpHeight() - y;
        while (Math.floor(yp / th) === lastY) { y++; yp--; };
        lastY = Math.floor(yp / th);
        if (lastY === Math.round((this._character.screenY() +
            this._character.jumpHeight() + mapYD) / th)) {
          if ($gameMap.terrainTag(lastX, lastY) === Number(cpp.lsdf.terrain))
            break;
          continue;
        }
        if ($gameMap.terrainTag(lastX, lastY) !== Number(cpp.lsdf.terrain))
          continue;
        var copyR = Math.min(this.patternHeight(), Math.round(totalH - y + 1));
        this.setUpperSprite();
        break;
      }
    }
    _bx = this.upperSpriteCopy(x, copyR, _bx);
  }
  _bx = this.upperSpriteCopy(x, 0, _bx);
  if (!this.setUpperAreaSprite && this.upperAreaSprite) {
    this.parent.removeChild(this.upperAreaSprite);
    this.upperAreaSprite = null;
    this.cpResetBitmapFrame();
  }
}

Sprite_Character.prototype.upperSpriteCopy = function(x, copyR, _bx) {
  if (_bx[3] === copyR) {
    _bx[2]++;
    return _bx;
  }
  if (_bx[0] && this.upperAreaSprite && _bx[3] > 0 && _bx[3] < this.patternHeight()) {
    var rect = new Rectangle();
    rect.x = this._frame.x + _bx[1];
    rect.y = this._frame.y;
    rect.width = _bx[2];
    rect.height = _bx[3];
    this.upperAreaSprite.bitmap.blt(this.bitmap, rect.x, rect.y, rect.width,
                                    rect.height, _bx[1], 0, rect.width, rect.height);
    this.bitmap.clearRect(rect.x, rect.y, rect.width, rect.height);
  }
  return [true, x, 1, copyR];
}

Sprite_Character.prototype.setUpperSprite = function() {
  if (this.setUpperAreaSprite) { return }
  if (this.upperAreaSprite) {
    this.upperAreaSprite.visible = true;
  } else {
    this.upperAreaSprite = new Sprite();
    this.parent.addChild(this.upperAreaSprite);
    this.oldBitmap = this.bitmap;
  }
  this.upperAreaSprite.bitmap = new Bitmap(this.patternWidth(), this.patternHeight());
  this.upperAreaSprite.x = this.x;
  this.upperAreaSprite.y = this.y;
  this.upperAreaSprite.anchor.x = this.anchor.x;
  this.upperAreaSprite.anchor.y = this.anchor.y;
  this.upperAreaSprite.opacity = this.opacity;
  this.upperAreaSprite.visible = this.visible;
  this.upperAreaSprite.z = 8;
  this.setUpperAreaSprite = true;
  var _oldFrame = new Rectangle();
  _oldFrame.x      = this._frame.x;
  _oldFrame.y      = this._frame.y;
  _oldFrame.width  = this.patternWidth();
  _oldFrame.height = this.patternHeight();
  this.bitmap = new Bitmap(this.oldBitmap.width, this.oldBitmap.height);
  this.bitmap.blt(this.oldBitmap, 0, 0, this.oldBitmap.width, this.oldBitmap.height,
                  0, 0, this.bitmap.width, this.bitmap.height);
  this.setFrame(_oldFrame.x, _oldFrame.y, _oldFrame.width, _oldFrame.height);
}

Sprite_Character.prototype.cpResetBitmapFrame = function() {
  var _oldFrame = new Rectangle();
  _oldFrame.x      = this._frame.x;
  _oldFrame.y      = this._frame.y;
  _oldFrame.width  = this.patternWidth();
  _oldFrame.height = this.patternHeight();
  this.bitmap = this.oldBitmap;
  this.setFrame(_oldFrame.x, _oldFrame.y, _oldFrame.width, _oldFrame.height);
}


//------
// Game_CharacterBase
//------
Game_CharacterBase.prototype.largeSprite = function() { return false }
Game_Player.prototype.largeSprite = function() { return true }
Game_Follower.prototype.largeSprite = function() { return cpp.lsdf.followers }
Game_Vehicle.prototype.largeSprite = function() { return cpp.lsdf.vehicles }
Game_Event.prototype.largeSprite = function() { return this._largeSprite }

Game_Event.prototype.setupPage = function() {
  aliasSetupPage081115a.apply(this, arguments);
  this._largeSprite = false;
  if (this._pageIndex >= 0) {
    for (var i = 0; i < this.list().length; i++) {
      if ([108, 408].indexOf(this.list()[i]['code']) >= 0) {
        var note = this.list()[i]['parameters'][0];
        if (note.match(/<large sprite>/i))
          this._largeSprite = true;
      }
    }
  }
}


//------
// End of plugin
//------
