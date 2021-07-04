//=============================================================================
// Cellular Automata Map Generator
// by Afonso Vitório
// Date: 05/07/2021  
//============================================================================= 
/*: 
* @plugindesc A map generator based on Cellular Automata
* @author Afonso Vitório
* @help This plugin lets you create create random maps, using cellular automatons, 
inspired by The Game of Life by John Conway.

* In the map you which the plugin to run, create a parallel event with
the command: mapGeneratorStart

* Map IDs: Lets you specify the map IDs in which you want the map generator
to work, separated by semicolons. Like so: 1:12:34, for maps 1, 12 and 34

* Alive Limit: If a cell has more alive neighbours cells than the alive limit
it becomes alive. 

* Dead Limit: If a cell has less alive neighbours cells than the dead limit
it becomes dead.

* Number of Iterations: The number of iterations you want the cellular
automata to run for, before devlivering the map

* Randomness: The likelihood for cells in the map to be alive initially
(before the algorithm does its job).

* Alive Cell Tile ID: The tileset ID of the alive cells. 

* Dead Cell Tile ID: Tileset ID of the dead cell

* Second Alive Cell Tile ID: A second tileset ID for the alive cells, can be
specified the same as Alive Cell Tile ID.

* Border Tile ID: Tileset ID of the cells on the border of the map

More info about Tilesets ID:
https://bit.ly/3vLVOHE (RPG Maker Foruns on Internet Archive)
*
*
* 
* @param Map IDs
* @desc Map IDs to Generate a Map separate by double collons e.g.: 1:23:4
* @default 28
*
* @param Alive Limit
* @desc If a cell has more than this number of alive neighbours it becomes alive.
* @default 2
* 
* @param Dead Limit
* @desc If a cell has less than this number of alive neighbours it becomes dead.
* @default 1
*
* @param Number of Iterations
* @desc Number of iterations to execute the cellular automata algorithm.
* @default 5
*
* @param Randomness
* @desc Value between 0 and 100. Lower less tiles ocupied. Bigger more tiles ocupied.
* @default 35
*
* @param Alive Cell Tile ID
* @desc Tileset ID of the alive cell, default: grass (2816)
* @default 2816
*
* @param Dead Cell Tile ID
* @desc Tileset ID of the dead cell, default: water (2096)
* @default 2096
*
* @param Second Alive Cell Tile ID
* @desc Tileset ID of the secondary alive cell, default: brighter grass (2912)
* @default 2912
*
* @param Border Tile ID
* @desc Tileset ID of the cell on the border of the map, default: water (2096)
* @default 2096
* 
*/


(function () {
    var parameters = PluginManager.parameters('!SPA_CAMapGenerator3');

    var mapIDs = parameters['Map IDs'];
    var aliveLimit = Number(parameters['Alive Limit']);
    var deadLimit = Number(parameters['Dead Limit']);
    var numberOfIterations = Number(parameters['Number of Iterations']);
    var randomness = Number(parameters['Randomness']);
    var aliveCellTileID = Number(parameters['Alive Cell Tile ID']);
    var deadCellTileID = Number(parameters['Dead Cell Tile ID']);
    var secondAliveCellTileID = Number(parameters['Second Alive Cell Tile ID']);
    var borderWallTileID = Number(parameters['Border Tile ID']);
    mapIDs = mapIDs.split(':');

    // Converter String em Numbers
    mapIDs = mapIDs.map(function (x) {
        return parseInt(x, 10);
    });

    var tilesArr = [];
    var transferCompleted = false;



    var receivedPluginCommands = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        receivedPluginCommands.call(this, command, args);

        if (command === 'mapGeneratorStart' && mapIDs.contains($gameMap._mapId)) {
            placeArrayTiles();

            if ($gameSwitches.value(45)) {
                getEventsOnAliveCells();
                transferPlayerRandom();
                $gameSwitches.setValue(45, false);

            }

        }
    }

    var oldGamePlayer_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function () {

        if (this.isTransferring() && !transferCompleted) {
            createMap();
            transferCompleted = true;
        }

        oldGamePlayer_performTransfer.call(this);
    };

    function createMap(){
        tilesArr = initializeTilesArray();
        RandomiseMap(tilesArr, randomness);
        tilesArr = runCellularAutomata(numberOfIterations, tilesArr, aliveLimit, deadLimit);
        tilesArr = addOtherTileToMainTile(tilesArr, aliveCellTileID, secondAliveCellTileID);
        tilesArr = placeBorderWall(tilesArr, borderWallTileID);
    }

    var getEventsOnAliveCells = (function () {
        return function () {
            eventIterator = 1;
            while ($gameMap.event(eventIterator) != null) {
                var randomX = getRandomInt(0, tilesArr.length);
                var randomY = getRandomInt(0, tilesArr[0].length);

                while (tilesArr[randomX][randomY] == deadCellTileID) {
                    randomX = getRandomInt(0, tilesArr.length);
                    randomY = getRandomInt(0, tilesArr[0].length);
                }

                $gameMap.event(eventIterator).setPosition(randomX, randomY);

                eventIterator++;
            }

        };
    })();

    var transferPlayerRandom = (function () {
        return function () {
            var randomX = getRandomInt(0, tilesArr.length);
            var randomY = getRandomInt(0, tilesArr[0].length);

            while (tilesArr[randomX][randomY] == deadCellTileID) {
                randomX = getRandomInt(0, tilesArr.length);
                randomY = getRandomInt(0, tilesArr[0].length);
            }

            $gamePlayer.reserveTransfer($gameMap._mapId, randomX, randomY, 2, 2);

        };
    })();

    function addOtherTileToMainTile(map, mainTileID, secondTileID) {
        var numberOfLandTilesInMap = countNumberOfTilesInMap(mainTileID, map);

        var randomX = getRandomInt(0, map.length);
        var randomY = getRandomInt(0, map[0].length);

        var numberOfTilesToPlace = Math.floor(numberOfLandTilesInMap/5);

        while (numberOfTilesToPlace > 0) {
            if (map[randomX][randomY] = mainTileID) {
                map[randomX][randomY] = secondTileID;
                numberOfTilesToPlace--;
            }
            randomX = getRandomInt(0, map.length);
            randomY = getRandomInt(0, map[0].length);


        }

        return map;

    }

    var transferPlayerQuadrants = (function () {
        var executed = false;
        return function (quadrant) {

            if (!executed) {
                var quadrantWeight = 0;
                var quadrantHeight = 0;

                if (quadrant == 2) {
                    quadrantWeight = Math.floor(tilesArr.length / 2);

                } else if (quadrant == 3) {
                    quadrantWeight = Math.floor(tilesArr.length / 2);
                    quadrantHeight = Math.floor(tilesArr[0].length / 2);

                } else if (quadrant == 4) {
                    quadrantHeight = Math.floor(tilesArr[0].length / 2);

                }

                centerTransfer:
                for (let i = quadrantWeight; i < tilesArr.length; i++) {
                    for (let j = quadrantHeight; j < tilesArr[i].length; j++) {
                        if (tilesArr[i][j] === aliveCellTileID) {
                            $gamePlayer.reserveTransfer($gameMap._mapId, i, j, 2, 2);
                            break centerTransfer;
                        }

                    }

                }

                executed = true;

            }
        };
    })();

    function placeArrayTiles() {
        for (let i = 0; i < tilesArr.length; i++) {
            for (let j = 0; j < tilesArr[i].length; j++) {
                placeTile(i, j, tilesArr[i][j]);
            }
        }
    }

    function initializeTilesArray() {
        let m = $dataMap.width;
        let n = $dataMap.height;

        let arr = new Array(m);
        for (var i = 0; i < m; i++) {
            arr[i] = new Array(n);
        }

        return arr;
    }

    function countNeighbourCells(x, y) {
        var nighboursCounter = 0;

        for (var xCounter = -1; xCounter < 2; xCounter++) {
            for (var yCounter = -1; yCounter < 2; yCounter++) {
                var xCell = x + xCounter;
                var yCell = y + yCounter;
                if (xCell < 0 || yCell < 0 || xCell >= $dataMap.width || yCell >= $dataMap.height) {

                    nighboursCounter++;
                }
                else if (xCounter == 0 && yCounter == 0) {
                    //Própria celula
                    continue;
                }
                else {
                    if (tilesArr[xCell][yCell] == aliveCellTileID) {
                        nighboursCounter++;
                    }
                }
            }
        }
        return nighboursCounter;

    }

    function generateNewMap(oldTilesArr, createLimit, destroyLimit) {
        var newTilesArr = initializeTilesArray();

        for (var xx = 0; xx < $dataMap.width; xx++) {
            for (var yy = 0; yy < $dataMap.height; yy++) {
                var neigboursCounter = countNeighbourCells(xx, yy, oldTilesArr);
                if (oldTilesArr[xx][yy] == aliveCellTileID) {
                    if (neigboursCounter < destroyLimit) {
                        newTilesArr[xx][yy] = deadCellTileID;

                    } else {
                        newTilesArr[xx][yy] = aliveCellTileID;

                    }
                } else {
                    if (neigboursCounter > createLimit) {
                        newTilesArr[xx][yy] = aliveCellTileID;

                    } else {
                        newTilesArr[xx][yy] = deadCellTileID;

                    }
                }
            }
        }

        return newTilesArr;
    }

    function RandomiseMap(map, spawnChance) {
        for (var xx = 0; xx < map.length; xx++) {
            for (var yy = 0; yy < map[0].length; yy++) {
                var randomNumber = getRandomInt(0, 100);

                if (randomNumber <= spawnChance) {
                    map[xx][yy] = aliveCellTileID;
                }
            }
        }
    }

    function placeBorderWall(map, borderWallTileID) {
        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (i == 0 || j == 0 || i == (map.length - 1) || j == (map[i].length - 1)) {
                    map[i][j] = borderWallTileID;
                }
            }
        }

        return map;
    }

    function runCellularAutomata(num_iterations, oldMap, createLimit, destroyLimit) {
        tempArr = initializeTilesArray();

        tempArr = oldMap;
        while (num_iterations > 0) {
            tempArr = generateNewMap(tempArr, createLimit, destroyLimit);
            num_iterations--;
        }

        return tempArr;
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    calcIndex = function (dataMap, x, y, z) {
        var w = dataMap.width;
        var h = dataMap.height;
        return (z * w * h) + (y * w) + x;
    };

    function countNumberOfTilesInMap(tileID, map) {
        var counter = 0;

        for (let i = 0; i < map.length; i++) {
            for (let j = 0; j < map[i].length; j++) {
                if (map[i][j] == tileID) {
                    counter++;
                }
            }
        }

        return counter;
    }

    function placeTile(xCoordinate, yCoordinate, tileID) {
        $dataMap.data[calcIndex($dataMap, xCoordinate, yCoordinate, 0)] = tileID;
    }

})();
