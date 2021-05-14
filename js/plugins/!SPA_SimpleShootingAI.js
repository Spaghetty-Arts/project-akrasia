//=============================================================================
// Simple AI
// by Afonso Vitório
// Date: 04/23/2021  
//============================================================================= 
/*: 
* @plugindesc This plugin implements a simple shooting AI in RPG Maker MV  
* @author Afonso Vitório
* @help This plugin gives life to the enemies by using a simple state
machine.

* In order for this plugin to work, you need to create an event running
in parallel in the map where the events you want to animate are. Then 
send a plugin command like this: simpleShootingAiStart 1:12:3 8 3

* The command consist of:
simpleAiStart <Events ID separated by semicolons> <Detection Range> <Shooting Range>

* In the example above we want events 1, 12 and 3 to be animated
and detect the player in a range of 8 tiles, and start shooting at
3 tiles distance to the player

*
*/  
 
(function() {  

    var distance = 8;
    var thePluginCommand = Game_Interpreter.prototype.pluginCommand;

    var debugCounter = 0;
    var hit_random_num = 25;

    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        thePluginCommand.call(this, command, args);
        if (command === 'simpleShootingAiStart') {
            var events = args[0]; // Events ID in the format x:y:z
            distance = Number(args[1]); // Distance for AI detection as a number x
            shootingDistance = Number(args[2]); // Distance for AI to shoot as a number x

            events = events.split(':');

            events.forEach(actionNPC);
        }
    }

    function actionNPC(npc){

        npc = $gameMap._events[npc];

        var totalDist = getDistance(npc);

        changeDebugText("Player life: " + $gameParty.leader().hp);
            

        if(totalDist <= shootingDistance){
            npc._moveType = 0;
            npc.setDirection(npc.findDirectionTo($gamePlayer.x, $gamePlayer.y));


            npc.requestAnimation(0);
            debugCounter++;
            
            if (debugCounter % hit_random_num === 0) {
                hit_random_num = getRandomInt(25, 35);
                $gamePlayer.requestAnimation(7);
                
                $gameActors.actor(1)._hp -= getRandomInt(1, 20);
            }


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