//=============================================================================
// Simple AI
// by Afonso Vitório
// Date: 04/23/2021  
//============================================================================= 
/*: 
* @plugindesc This plugin implements a simple AI in RPG Maker MV  
* @author Afonso Vitório
* @help This plugin gives life to the enemies by using a simple state
machine.

* In order for this plugin to work, you need to create an event running
in parallel in the map where the events you want to animate are. Then 
send a plugin command like this: simpleAiStart 1:12:3 8

* The command consist of:
simpleAiStart <The event ID separated by semicolons> <Range for detection>

* In the example above we want events 1, 12 and 3 to be animated
and detect the player in a range of 8 tiles.

*
*/  
 
(function() {  

    var distance = 8;
    var receivedPluginCommands = Game_Interpreter.prototype.pluginCommand;

    var iterationCounter = 0;

    var max_hit_value = 35; // Max value between hits
    var min_hit_value = 25; // Min value between hits
    var hit_random_num = getRandomInt(min_hit_value, max_hit_value);

    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        receivedPluginCommands.call(this, command, args);
        
        if (command === 'simpleAiStart') {
            var events = args[0]; // Events ID in the format x:y:z
            distance = Number(args[1]); // Distance for AI detection as a number x

            events = events.split(':');

            events.forEach(actionNPC);
        }
    }

    function actionNPC(npc){

        npc = $gameMap._events[npc];
        var totalDist = getDistance(npc);

        if(totalDist == 1){
            npc._moveType = 0;
            npc.setDirection(npc.findDirectionTo($gamePlayer.x, $gamePlayer.y));

            doAttack();

        } else if (totalDist < distance) {
            npc.setMoveSpeed(4.5);
            npc.setMoveFrequency(4.5);
            npc._moveType = 2;

        }else{
            npc.setMoveFrequency(4);
            npc.setMoveSpeed(3.5);
            npc._moveType = 1;

        }
            
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    function getDistance(npc){
        var xDist = $gamePlayer.x - npc.x;
        var yDist = $gamePlayer.y - npc.y;
        var totalDist = 0;

        if (xDist < 0) {
            xDist = -xDist;
        }

        if (yDist < 0) {
            yDist = -yDist;
        }

        totalDist = xDist + yDist;

        return totalDist;

    }
  
    function doAttack() {
        $gamePlayer.requestAnimation(0);
        iterationCounter++;

        if (iterationCounter % hit_random_num === 0) {
            hit_random_num = getRandomInt(min_hit_value, max_hit_value);
            $gamePlayer.requestAnimation(7);
                            
            $gameActors.actor(1)._hp -= getRandomInt(1, 20);

            changeDebugText("Player life: " + $gameActors.actor(1)._hp);

        }
    }

    function My_Window() {
        this.initialize.apply(this, arguments);
    }

    function debugWindow(debugText){
        var lh = Window_Base.prototype.lineHeight()*2;
        
        My_Window.prototype = Object.create(Window_Base.prototype);
        My_Window.prototype.constructor = My_Window;

        My_Window.prototype.initialize = function() {
            Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, lh);
            this.refresh();
        }

        My_Window.prototype.refresh = function() {
            this.contents.clear();
            this.drawText(debugText, 0, 0);
        }

        var smstart = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function() {
            smstart.apply(this, arguments);
            this.my_window = new My_Window();
            this.addChild(this.my_window);
        }
    }

    function changeDebugText(newText){
        My_Window.prototype.update = function() {
            this.contents.clear();
            this.drawText(newText, 0, 0);
            Window_Base.prototype.update.call(this);
        }

    }

    
          
})(); 
