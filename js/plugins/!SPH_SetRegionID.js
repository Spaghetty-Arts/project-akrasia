(function() {
	
	var _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function()
	{
		_Game_System_initialize.call(this);
		this.initResRegions();
	};
	
	Game_System.prototype.initResRegions = function()
	{
		this._ResRegions = {};
	};
	
	Game_System.prototype.REDRegions = function()
	{
		if (this._ResRegions === undefined) {
			this.initResRegions();
		}
		return this._ResRegions;
	};

	let width = $dataMap.width;
	let height = $dataMap.height;

	Game_System.prototype.getREDRegion = function(mapId, x, y, z)
	{
		if (this._ResRegions === undefined) {
			this.initResRegions();
		}

		return this._ResRegions[mapId, (z * height + y) * width + x];
	};
	
	Game_System.prototype.isResRegion = function(mapId, x, y, z)
	{
		if (this._ResRegions === undefined) {
			this.initResRegions();
		}

		return this._ResRegions[mapId, (z * height + y) * width + x] !== undefined;
	};
	
	Game_System.prototype.setResRegion = function(mapId, x, y, z, regId)
	{

		this._ResRegions[mapId, (z * height + y) * width + x] = (regId || 0);
	};
	

	
	Game_Map.prototype.setTileId = function(x, y, regId) 
	{
		$gameSystem.setResRegion($gameMap._mapId, x, y, 5, regId);
	};

	
	var _Game_Map_tileId = Game_Map.prototype.tileId;
	Game_Map.prototype.tileId = function(x, y, z)
	{
		if ($gameSystem.isResRegion($gameMap._mapId, x, y, z))
		{
			return $gameSystem.getREDRegion($gameMap._mapId, x, y, z);
		} else {
			return _Game_Map_tileId.call(this, x, y, z);
		}
	};
	
}) ();
