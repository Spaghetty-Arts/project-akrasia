//==========================================================================================
var h =/=== TSR_Title == A Plugin by The Northern Frog ============= file id: 283406199 ===/
//==========================================================================================

var TSR = TSR || {};
TSR.Title = TSR.Title || {};
TSR.Title.version = 2.36;
TSR.Title.fileId = 283406199;

var Imported = Imported || {};
Imported.TSR_Title = true;

//==========================================================================================

/*:
 * @plugindesc v2.3.6 Provide multiple options for customizing the Title Screen.
 * @author TSR, The Northern Frog, 2020      
 * @help 
 * =========================================================================================
 * == About this Plugin ====================================================================
 * =========================================================================================
 *
 * PRE TITLE WINDOW
 * An old arcade game concept: you launch the game and Title screen appear, 
 * but before anything else, you're prompted to 'press start' or something
 * like that. This plugin allow you to do that for your game.
 *
 * AUTO INTRO & SKIP SCENES
 * The Plugin give the option to trigger your Intro Scene automatically 
 * when no input from the player has occurs on the Title Screen after
 * a short period. The Intro Scene and other Cut Scenes can also be 
 * skipped by pressing the 'cancel' button. These effects can be  
 * acheived with the use of Notetags and adequate Eventings.
 *
 * INTRO MOVIE
 * Play an intro movie before the Title Screen opening. Can be use as the
 * 'Auto Intro'.
 *
 * EXIT
 * This Plugin add an 'Exit' command to the Title menu and/or Main menu that
 * allow the player to quit the program from inside the game.
 *
 * SKIP TITLE
 * It add a Skip Title Screen option for game developing. This can be turned 
 * ON/OFF in the Plugin parameters. You can also show the FPS meter if needed.
 *
 * LOADING SPRITE
 * You can change the image of the 'Now Loading...' sprite if you'd like. 
 *
 * TRUE CONTINUE
 * It give the option to add a 'True Continue' command to the Title Screen 
 * window that allow players to start from the last saved game.
 *
 * CUSTOMIZATIONS
 * It also provides various parameters to add some customization to the 
 * the Title Screen window and the Game Title.
 *
 * CREDITS SCENE
 * The Plugin provides a simple scrolling credits scene that can be called
 * from the Title Screen Window.
 * 
 * GAME OVER WINDOW
 * With this Plugin, the Game will transfer to the Scene GameEnd following a 
 * GameOver instead of a direct transfer to the Title Screen. This means that
 * after the 'Game Over' sprite has been displayed, a window will popout with
 * 3 options:
 *
 *              -True Continue (Load last saved file)*
 *              -To Title (go to Title Screen)
 *              -Quit (Exit program)
 *
 *                  *This command will be replaced by New Game 
 *                   if  no saved files are detected.
 *
 * GIF-LIKE ANIMATED TITLE SPRITES
 * Each of the 5 sprites displayed on the Title Screen can be turned into
 * a Gif-Like animated sprite. This is acheived by changing the animation
 * properties of the sprite Object in the Plugin parameters.
 *
 *
 * =========================================================================================
 * == Parameters ===========================================================================
 * =========================================================================================
 * Note on parameters:
 *   Most, if not all the features provide by this Plugin can be enabled
 *   and disabled according to your needs. In an attempt to lighten the
 *   parameters a bit, I've removed most of the enable/disable parameters.
 *   Instead, whenever a feature require a text entry, like a custom text
 *   line or an image file name, leaving the parameter blank will count
 *   as disabling the option. 
 *
 *
 * Skip Title Screen:
 * =========================================================================================
 * Give you the option to skip the Title Screen for game developing 
 * and quick play test.  
 *
 *    -Skip Title Screen
 *       Enable/Disable Skip Title Screen.
 *    -Skip Title Mode
 *             Mode 'New': 
 *                   this is the default mode. It will launch the game 
 *                   at the Starting Player Position like when you select 
 *                   'New Game'. It is the recommanded Mode when testing
 *                   new game mechanics, plugins and scripts.
 *             Mode 'Load Last':
 *                   this Mode will mimic the True Continue behavior. It
 *                   will automatically load the last saved file, while
 *                   skipping the Title Screen. This Mode can sometime
 *                   be handy when your're building and tuning up cut 
 *                   scenes, and you need to recurently launch the game 
 *                   at a specific saved point.
 *
 *    -Show FPS
 *                   With this option, you can Enable/Disable the FPS
 *                   meter. it show the actual frame rate of the game
 *                   for testing purpose. 
 *
 *
 * Loading Sprite:
 * =========================================================================================
 * Set the image for the sprite that appear when the game is loading.
 * You can also set its horizontal and vertical coordinates on the
 * screen.  
 *
 *    -Loading Sprite File Name
 *       Set the File name of the image you want to use without 
 *       extension. Your custom image must have been imported in 
 *       the /img/system of  your game folder. If you don't want 
 *       to use this feature, leave it to 'Loading', or erase the
 *       file name.
 *    -Loading Sprite X 
 *       The horizontal coordinate in pixels of the Loading sprite.
 *    -Loading Sprite Y
 *       The vertical coordinate in pixels of the Loading sprite.
 *
 *
 * Exit Command:
 * =========================================================================================
 * Add the 'Exit' Command to the game and let you choose the name for  
 * the command and wether or not you want it to appear in the Title 
 * Screen Menu and/or the Main menu.
 *
 *    -Exit Command name
 *       Set the name of the command as it will appear in menus
 *    -Show in Title screen 
 *       Enable/disable Exit Command in the Title screen menu
 *    -Show in MainMenu
 *       Enable/disable Exit Command in the Main menu 'Quit' option.
 *
 *
 * Credits Page:
 * =========================================================================================
 * The Plugin provide a simple Credits page. It consist in a screen
 * with a background image and scrolling text. The text can be of
 * any length and any numbers of lines. The Credits screen can be
 * quitted at any time by hitting a 'cancel' key. Otherwise, it will
 * terminate when the last line of the credits text reach the top
 * of the screen. 
 *
 *    -Credits Command Name
 *       Set the name of the command as it will appear the menu
 *    -Credits Background Image 
 *       Set the background image of the Credits Screen. Enter the
 *       file name without extension. Image must be imported in the
 *       /img/titles1 folder.
 *    -Credits Frame Image
 *       Set the Frame image of the Credits Screen. Enter the
 *       file name without extension. Image must be imported in 
 *       the /img/titles2 folder.
 *    -Credits Music
 *       Set the background music to be played in the Credits Screen.
 *       Enter the name of the track in /audio/bgm. Leave it blank
 *       for no music.
 *    -Credits Text
 *       This is a note box where you can enter the text that will be
 *       displayed as scrolling text. You can insert line breaks by
 *       hitting Enter, and you can use text codes too.
 * 
 * 
 * Pre Title window:
 * =========================================================================================
 * This adds a window before the Title screen command window. It
 * display a short text like 'Start' or 'Press any key'. You get
 * to choose what command is bind to this window when payers hit
 * ANY game button.
 *
 *    -Pre Title text
 *       Set the text to be displayed in the Pre Title window.
 *       Leave it blank for disabling the pre Title window.
 *    -Window X
 *       Set the horizontal position of the pre Title window. 
 *    -Window Y 
 *       Set the vertical position of the pre Title window.
 *    -Window Width
 *       Set the Width of the pre Title window in pixels. 
 *    -Text Color
 *       Set the Text Color of the text in the pre Title window to 
 *       the ingame color codes ranging from 0 (white) to 31 (purple).*
 *
 *           *if you have TSR_TextColorAddOn.js installed, you can
 *            use your custom color code above 31 in this parameter.
 *
 *    -Font Size
 *       Set the Font Size of the text in the Title Screen Window.
 *
 *
 * Pre Title window cursor parameters:
 * ===================================
 *    -Enable Default Cursor
 *       Enable/Disable the default background blinking cursor for
 *       the Pre Title window.
 *    -Outline Opacity 
 *       If this parameter is turned On, the text outline of the
 *       Pre Title window will have an opacity blinking effect.     
 *    -Outline color 
 *       Set the color of the outline opacity blinking effect to the
 *       ingame color codes ranging from 0 (white) to 31 (purple).*
 *
 *           *if you have TSR_TextColorAddOn.js installed, you can
 *            use your custom color code above 31 in this parameter.
 *
 *    -Text Effects
 *       The plugin provide 2 animated text effects for the Pre
 *       Title window. You can choose one of the following:
 *
 *           piano: 
 *           The letters of the text will tilt up one after the
 *           others from left to right. And then come back the
 *           other way around, and so on.
 * 
 *              *piano effect is NOT compatible with text code, so
 *               keep that in mind if you use TSR_TextColorAddOn.
 *
 *           accordeon:
 *           The maxWidth of the selected command will increase and
 *           decrease continuously, compressing and stretching the
 *           text as an accordeon.
 *
 * Pre Title window command bind:
 * ===================================
 * With this parameter, you decide what happen when player hit a key.
 * Default parameter setting is 'Command Window' wich just open the
 * Title Screen Command window, but the Plugin provide some other
 * options.
 *
 *     -Command Window: 
 *          Default command bind. Open the command window.
 *     -Continue:
 *          This is meant for mini games or arcade style game that
 *          doesn't save or use a single save file. It automatically
 *          load the last saved file, and if no save is present, it
 *          call a new game. 
 *     -Load Screen:
 *          This simply call the load screen directly. You probably
 *          won't find any use for this, unless you have some way
 *          to start a New Game from the Loading Screen.*
 *     -Load or New:
 *          This one send the player to the Loading Screen or start
 *          a New Game if no saved files are present.*
 *
 *             *I have another Plugin in development that will make
 *              use of these 2 options...
 *
 *
 * Pre Title to Command window
 * ===========================
 * Note that when the Pre Title window is binded to open the Command
 * window, once you hit a key and access the Command window, the Pre
 * Title window won't appear again. If you go back to the Title screen
 * from the Load Screen or from the ingame Main menu, the Command
 * window will open automatically. Pre Title window appear only when 
 * lauching the game, unless you use the Auto Intro\Scene feature 
 * provided by this Plugin (see bellow).
 *
 *
 * Title Screen Window:
 * =========================================================================================
 * Set the Title Screen Window to your liking with the following
 * parameters.
 *   
 *    -Window Command List
 *       With this parameter, you can set the commands you want to
 *       appear in the Title command window. The parameter is a text 
 *       field where you enter each command. The commands you can
 *       use are listed bellow. They are case insensitives, but each
 *       must be separated by a SEMICOLON.
 *
 *    Default list: new game; continue; load; options; credits; exit
 *
 *              new game: start a new game
 *              continue: load last saved game* **
 *                  load: open loading screen
 *               options: open options menu
 *               credits: open the credits screen*
 *                  exit: quit the game*
 *
 *        *continue, credits and exit are commands provided by this 
 *         plugin. Hence, their respective parameters must be enabled
 *         in addition to including them in the command list.
 *       **continue only appears if there is at least one previously
 *         saved file. Otherwise, it won't appears no matter if it
 *         is in the command list.
 *
 *
 *    -Window Menu Type
 *       Choose between a vertical or horizontal menu for the 
 *       Title window.
 *    -Window Background
 *       Set the Background of the Title Window to 'normal', 'dim' 
 *       or 'transparent'.
 *    -Window X
 *       Set the horizontal position of the Title Screen Window 
 *       in pixels.
 *    -Window Y 
 *       Set the vertical position of the Title Screen Window 
 *       in pixels.
 *    -Window Width
 *       Set the Width of the Title Screen Window in pixels. When
 *       using horizontal menu, this will be the width of one column.
 *    -Window Visible Rows
 *       Number of visible rows in the Title windows. Set it to 0 and
 *       the Number of visible rows will be equal to the number of com-
 *       mands in the 'Window Command List' parameter.
 *    -Window Visible Cols
 *       Number of visible columns in the Title windows. No effect
 *       on vertical menus.
 *    -Text Color
 *       Set the Text Color of the text in the Title Screen Window to 
 *       the ingame color codes ranging from 0 (white) to 31 (purple).*
 *
 *           *if you have TSR_TextColorAddOn.js installed, you can
 *            use your custom color code above 31 in this parameter.
 *
 *    -Text Font
 *       Set the Text Font of the text in the Title Screen Window. 
 *    -Text Align
 *       Set the Text Align of the text in the Title Screen Window to 
 *       'left', 'center', or 'right'.
 *    -Font Size
 *       Set the Font Size of the text in the Title Screen Window.
 *
 *
 * True Continue:
 * ======================================================================================
 * When set to true, this parameter add a new 'continue' command to 
 * the Title Screen that directly load the last saved game. The command
 * don't appear when no save files are present. But after the first saved
 * game, the command appear and become the default choice of the Title
 * screen window when launching the game.
 *
 *    -True Continue Name
 *       You get to choose the name of the command, but 'continue' is
 *       probably what best suit it. For that matter, you may want to
 *       change the name of the Default Continue command to 'Load Game'
 *       or something like that.
 *    -Enable True Continue
 *       Enable/Disable the True Continue command.  
 *
 *
 * Title Window Cursor:
 * =======================================================================================
 * These parameters let you upload a custom image from /img/pictures  
 * that can be use as a cursor for the Title Screen Window. 
 *
 * Default Cursor
 * ==============
 *    -Enable Default Cursor
 *       Enable/Disable the default background blinking cursor.
 *
 *    -Outline Opacity 
 *       If this parameter is turned On, the text outline of the
 *       currently selected command in the Title window will have
 *       an opacity blinking effect. 
 *    -Outline color 
 *        Set the color of the outline opacity blinking effect to the
 *        ingame color codes ranging from 0 (white) to 31 (purple).*
 *
 *           *if you have TSR_TextColorAddOn.js installed, you can
 *            use your custom color code above 31 in this parameter.
 *
 *    -Selected Text Effect
 *       The plugin provide 2 animated text effects for indicating
 *       the currently selected command in the Title window. You
 *       can choose one of the following:
 *
 *           piano: 
 *           The letters of the selected command will tilt up one
 *           after the others from left to right. And then come
 *           back the other way around, and so on.
 *
 *              *piano effect is NOT compatible with text code, so
 *               keep that in mind if you use TSR_TextColorAddOn.
 *
 *           accordeon:
 *           The maxWidth of the selected command will increase and
 *           decrease continuously, compressing and stretching the
 *           text as an accordeon.
 *     
 *   
 * Custom Cursor
 * =============
 *    -Cursor File Name 
 *       Enter the File Name of the image without file extension
 *       (image must be stored in /img/pictures). Leave it blank
 *       if you don't want to use a custom cursor.
 *    -Cursor X offset
 *       Set the horizontal offset of the Cursor.
 *    -Cursor Y offset
 *       Set the vertical offset of the Cursor.
 *    -Smooth Move Speed
 *       Your custom Cursor will move smoothly in between each
 *       slots by the pixels/frames rate set by the parameter. 
 *       Leave it to zero and the cursor will just spawn to the
 *       next slot as does the default cursor.*
 *
 *          *Cursor smooth move looks better when the default
 *           blinking cursor is disabled.
 *
 *    -Cursor animation:
 *       The Plugin provide 3 ways to animated your custom cursor
 *       so it stand out on the screen.
 *
 *       -Enable Cursor Blink
 *          This parameter allow the cursor to blink.
 *       -Enable Cursor Tilt
 *          Enabling this parameter will make the cursor tilt from
 *          left to right continuously.
 *       -Enable Cursor Pulse
 *          This cursor effect make the width and height of the cursor
 *          to shrink and strech continuously.
 *
 *
 * Title Window Icons:
 * ======================================================================================
 * Here, you can draw icons from the iconset sheet to add visual
 * elements to your command list. If you only wish to show icons
 * for some commands, set other commands index at zero.
 *
 *    -Show Icons
 *       Enable/Disable displaying of icons.
 *    -New Game Icon
 *       The index of the icon you want to display for New Game.
 *    -True Continue Icon
 *       The index of the icon you want to display for True Continue.
 *    -Continue Icon
 *       The index of the icon you want to display for Default Continue.
 *    -Options Icon
 *       The index of the icon you want to display for Options.
 *    -Exit Icon
 *       The index of the icon you want to display for Exit command.
 *
 *       *Set your Title command window Width accordingly as showing
 *        the icons will displace the command text to the right.
 *
 *
 *
 * Title Picture:
 * =======================================================================================
 * With these parameters, you can upload and set a custom picture in  
 * the Title Screen. 
 *
 *    -Picture File Name 
 *       Enter the File Name of the custom picture without file 
 *       extension.(Picture must be stored in /img/pictures)
 *       Leave it blank to disable this option.
 *    -Picture X
 *       Set the horizontal position of the custom picture in pixels.
 *    -Picture Y
 *       Set the vertical position of the custom picture in pixels.
 *
 *
 * Default Game Title:
 * =======================================================================================
 * You can place the default Game Title anywhere on the screen,
 * change its color, font size and more.
 *
 *    -Game Title X
 *       Set the horizontal position of the Game Title in pixels.
 *    -Game Title Y 
 *       Set the vertical position of the Game Title in pixels.
 *    -Title Text Color
 *       Set the Text Color of the Game Title.*
 *    -Title Text Outline Color
 *       Set the Text Outline Color of the Game Title.*
 *    -Title Text Outline Width
 *       Set the Text Outline Width of the Game Title in pixels.
 *    -Game Title Text Font 
 *       Set the Text Font of the Game Title. 
 *    -Game Title Text Align 
 *       Set the Text Align of the Game Title to 'left', 'center', 
 *       or 'right'.
 *    -Game Title Font Size
 *       Set the Text Font Size of the Game Title.
 *    -Custom Title Text
 *       Set the Text to replace the Game Title when previous
 *       parameter is true. Leave it blank if you want to use
 *       the default Title text.
 *
 *          *Set Colors using the Default Color Codes (0 to 31), but
 *           if you have TSR_TextColorAddOn.js installed, you can use
 *           your custom color code above 31.
 *
 *
 * Custom Label:
 * =======================================================================================
 * In addition, the plugin give you the possibility to add a custom    
 * label to display some more information on the Title Screen.
 *
 *    -Custom Label Text 
 *       Set the Text of the Custom Label. Leave it blank if you
 *       don't wish to use this option.
 *    -Custom Label X
 *       Set the horizontal position of the Custom Label in pixels.
 *    -Custom Label Y
 *       Set the vertical position of the Custom Label in pixels.
 *    -Custom Label Width
 *       Set the Width of the Custom Label text box in pixels.
 *    -Label Text Color
 *       Set the Text Color of the Custom Label.*
 *    -Label Text Font
 *       Set the Text Font of the Custom Label.
 *    -Label Text Align
 *       Set the Text Align of the Custom Label to 'left', 'center', 
 *       or 'right'.
 *    -Label Font Size
 *       Set the Text Font Size of the Custom Label.
 *
 *          *Set Colors using the Default Color Codes (0 to 31), but
 *           if you have TSR_TextColorAddOn.js installed, you can use
 *           your custom color code above 31.)
 *
 *
 * Alternate Transition:
 * =======================================================================================
 * This parameter gives an alternative transition upon selecting 'New Game'.    
 * Instead of having both a music and screen fade out, the plugin will skip 
 * the screen fade out if this parameter is turn On. So, if your 'intro'
 * screen (first map) has the same background as the Title screen, the 
 * transition will look better as no change will occur on the screen except
 * for the Title Command Window and the Game Title disappearing. You also
 * have the option of fading out the music depending on wether or not your
 * intro have the same music than the Title Screen.
 *
 *    -Transition Enable
 *       Enable/Disable the Alternative transition.
 *    -Music FadeOut 
 *       Enable/Disable Music fade out in the alternative transition.
 *
 * 
 * Auto Intro and Skip Scenes:
 * ======================================================================================
 * The Plugin is offering the possibility to trigger a scene automatically
 * when no input from the player on the Title Screen has occured after a 
 * short period. If this 'Auto Scene' is watched to the end, it will goes
 * back to the Title Screen, while pressing a game key at any time will
 * immediately bring back to the Title Screen. 
 * 
 * The 'in game' Cut Scenes can also be skipped by pressing the 'Cancel'
 * button.  If so, a window will pop out giving the choices to either
 * resume the scene or skip it. Choosing to skip it will transfer the
 * player to specified coordinates and change the scene variable to
 * toggle it off.
 *
 *
 * How that works
 * ======================
 * This can easily be acheived using 2 Comment Notetags provided by  
 * this Plugin, and correct arrangement of your evented scenes.
 *
 * The Auto Intro Scene and the Actual Intro Scene that play after 
 * selecting 'New Game', is the same evented scene. The Plugin will
 * know when it is run Automatically from the Title Screen. Let's 
 * call it 'Auto Intro' mode.
 *
 * The skippable cut scenes should be made of one or more maps with  
 * autorun events managed by a single Game Variable. 
 *
 * All event pages of the scenes should have the <scene skip> comment
 * Notetag (see bellow), while the last event page of the scene will
 * have the <scene quit> comment Notetag (see bellow).
 *
 *
 * Parameters
 * ======================
 *
 *    -Enable Auto Intro
 *      When this is toggled ON, the game will transfer to either the Starting 
 *      Point (as in a new game), or a point specified by the next parameter, 
 *      after a delay has passed without any input from the player on the Title  
 *      screen. Hence, you must have set your starting map events accordingly   
 *      before enabling this (see bellow).
 *
 *    -Auto Intro Transfer 
 *      Set the transfer coordinate of the auto scene. Enter the map ID, 
 *      and x and y coordinates, each separated by a coma.
 * 
 *          example:  
 *             Auto Intro Transfer: 5, 8, 12 will transfer to map 5 x 8, y 12.
 *
 *      Use this option if you want something different than an auto intro.
 *      You could use it for triggering a credits page from the Title screen
 *      for instance. Leave this parameter blank if you just want a regular 
 *      New Game transfer when the time out delay has passed. 
 *
 *      The 'reset' keyword can be use to restart the Title Screen. This will
 *      be useful if you use the Intro Movie feature (see bellow).
 *
 *         Example: 
 *            Auto Intro Transfer: reset 
 *     
 *      In this example above, the Title Screen will reset when the Auto Intro
 *      Time Out delay as passed. The Intro Movie will playback if you have one.
 *
 *    -Auto Intro Time Out 
 *      Set the waiting time (in frames) before the Auto Intro is played.
 *
 *
 * Comment Notetags
 * ======================
 *
 * <SCENE SKIP: mapId, playerX, playerY, direction, fadeout, variableId, value, window>
 *
 *     Autorun events having this comment Notetags will enable the use of 
 *     the 'cancel' button to call the Skip Scene window. When 'cancel' is 
 *     hit while the Autorun event is running, the Autorun will pause and 
 *     the choice will be given to either resume or skip. Choosing skip 
 *     will transfer the player according to the data writed in the Notetags. 
 *     Replace the data by the following:    
 *
 *               mapId: Id of the Map to be transfered to
 *             playerX: X position of the player on the transfered map
 *             playerY: Y position of the player on the transfered map
 *           direction: the facing direction of the player after transfer
 *                            (0)keep direction
 *                            (2)face down 
 *                            (4)face left 
 *                            (6)face right 
 *                            (8)face up
 *             fadeout: the fade out type 
 *                            (0)black fadeout
 *                            (1)white fadeout 
 *                            (2)no fadeout
 *          variableId: Id of the Game Variable used for the Intro Scene
 *               value: value of the Game Variable used for the Intro Scene
 *                            *set the value to disable the last event
 *                             page of the Scene when skipped
 *              window: A small window that pop out a few seconds to tell
 *                      the player that the cut scene is skippable. Enter a
 *                      value from 1 to 6 to set the position in the screen
 *                      where the window will appear.
 *
 *                    ********************************************
 *                  1: top left      2: top center       3:top right
 *
 *
 *
 *                                       SCREEN
 *
 *
 *
 *                  4: bottom left   5: bottom center   6: bottom right
 *                    ********************************************
 *                  
 *                  If you don't want this window to appear, set the
 *                  value to 0, or just omit this notetag argument.          
 *                  This window don't appear in 'Auto Intro' mode.
 *
 *  <SCENE QUIT>
 *
 *     Put this Comment Notetag in the last event page of your Intro Scenes 
 *     sequence so that it automatically transfer back to the Title Screen 
 *     when it is on 'Auto Intro' mode. It also tell the Plugin to turn off
 *     the skip scene mode if you have watched the scene till the end when
 *     not in 'Auto Intro' mode.
 *
 *     In 'Auto Intro' mode, as soon as the event page having this Comment  
 *     Notetag is triggered, the game will transfer back to the Title Screen  
 *     without executing any of the event commands on the page. In regular
 *     'in game' scenes, the Notetag will just toggle Off the 'skip scene' 
 *     mode and the event will resume normally.
 *
 * Pre Title Window
 * ================
 * If you're using the Pre Title window, the Auto Intro will only trigger
 * when the time out has passed while on the Pre Title window. When the
 * Command window is open, if you wait for the time out, the game will 
 * close the Command window and open the Pre Title window, and then you
 * can wait for the Auto Intro to trigger.
 *
 *
 *
 * Intro Movie:
 * ======================================================================================
 * Play a movie before the Title Screen Opening. The movie will play only 
 * once, and then the Title Screen will resume. It will play full screen 
 * with sound. If you hit any key while the movie is playing, it will
 * immediately resume the Title Screen. If you watch it to the end, the
 * Title Screen will resume.
 *
 * If you use the Auto Intro feature and watch the cut scene to the end,
 * the Title Screen will reset and the Intro Movie will play again. If
 * you set the Auto Intro Transfer parameter to 'reset' (see above), the
 * Title Screen will reset when the Auto Intro Time Out delay as passed.
 * By doing this, your Intro Movie will behave as your Auto Intro, and 
 * will play each time no input is made while waiting on the Title Screen.
 *
 *    -Movie File Name 
 *      Enter the file name of your Intro Movie, without extension. The movie
 *      must be imported in the /movies/ folder of your game project. Both mp4
 *      and webm format must be in the folder.
 *
 *
 *
 * Gif-like Animated Title Sprites:
 * ======================================================================================
 * You can turn any, if not all of the 5 Title Screen Sprites into Gif-Like
 * Animated Sprites by creating your own custom Animated Sprite Object. All 
 * you need is an Image Strip, a .png file where images are set in horizontal
 * frames. Best example would be Battlers and Characters Sprite Sheets or 
 * Animations Sprite Sheets from the default RTP. Even if you don't want or
 * have such assets, you can still move or fade in the Title Screen Sprites.
 *
 * The Title Screen Sprites that can be animated are:
 *
 *                -Title Background 1
 *                -Title Background 2
 *                -Custom Picture (from this Plugin)
 *                -Default Title
 *                -Custom Label (from this Plugin)
 *
 *       *Any framed sprite sheet you want to use for these sprites must
 *        be imported in the corresponding Project Folder. Title Background 1
 *        custom images must be in /img/titles1 folder, Title Background 2 in
 *        /img/titles2 and Custom Picture in /img/pictures. Default Title and
 *        Custom Label are Text sprites and cannot have imported images, but
 *        can be moved and/or fade in with this Plugin.
 *
 *
 * Each of the Title Screen Sprites have now a parameter 'Animated Sprite 
 * Object' wich contains the data for the animated sprite you want to create.  
 * In the Plugin Parameters, it will appear as a notebox like this:
 *
 *            {animation: 0, 
 *                  loop: 0, 
 *            frameWidth: 0, 
 *           frameHeight: 0, 
 *           frameNumber: 0, 
 *             frameRate: 0, 
 *               moveToX: 0, 
 *               moveToY: 0, 
 *            moveSpeedX: 0, 
 *            moveSpeedY: 0, 
 *         moveFrameRate: 0, 
 *             moveLoopX: 0, 
 *             moveLoopY: 0,
 *               opacity: 0}
 *
 * This text box will be turned into a Javascript Object so only the values
 * should be changed according to the instructions bellow. If you ever mess
 * it up, just copy paste the above object in the sprite parameter. 
 *
 * Each properties will now be explained:
 *
 *         animation: This must be set to true for any of the following
 *                    properties to have any effects.
 *
 *              loop: When set to true, the sprite animation will loop
 *                    through its frames.
 *
 *        frameWidth: This set the pixels width of the frames for the 
 *                    Gif-Like animated sprite.
 *
 *       frameHeight: This set the pixels height of the frames for the
 *                    Gif-Like animated sprite.
 *
 *       frameNumber: This set how may frames are constituting the 
 *                    animation.
 *
 *         frameRate: This set the frame rate at wich the sprite frames
 *                    will update.
 *
 *           moveToX: The sprite will move toward this horizontal pixels
 *                    coordinate relatively to his starting position set
 *                    in the sprite parameter.
 *
 *           moveToY: The sprite will move toward this vertical pixels
 *                    coordinate relatively to his starting position set
 *                    in the sprite parameter.  
 *
 *        moveSpeedX: This set the number of pixels per frames the sprite
 *                    will move in the horizontal plane.  
 *
 *        moveSpeedY: This set the number of pixels per frames the sprite
 *                    will move in the vertical plane.       
 *
 *     moveFrameRate: This set the number of game frames at wich the moves
 *                    updates. Tune it with moveSpeedX and moveSpeedY to
 *                    balance speed and fluidity to your liking.
 *
 *         moveLoopX: Set it to true if you want the move to loop horizontaly.
 *        
 *         moveLoopY: Set it to true if you want the move to loop verticaly.
 * 
 *           opacity: This is not the actual opacity of the sprite. If you
 *                    set it to any number above zero, the sprite will not
 *                    be visible when the Title Screen opens, its opacity
 *                    will gradually increase at a frame rate corresponding
 *                    to the number you set. If you set it to 1, the sprite
 *                    opacity will increase by 1 each game frame meaning
 *                    that it'll take around 4 seconds to reach the full 
 *                    255 opacity.
 *
 *
 *
 *
 * ======================================================================================
 * == Terms of usage ====================================================================
 * ======================================================================================
 * Free to use in any RPG Maker MV projects, including commercials projects.
 *
 * Credit is required for using this Plugin. 
 * For crediting, use 'TSR' along with one of
 * the following terms: 
 *      'The Northern Frog' or 'A frog from the north'
 *
 * Do not change the Header or the Terms of usage.
 * 
 * Editing of the script is allowed, but it won't relieve from crediting
 * obligations. Remember that changing the name of functions and variables,
 * or even manually retyping the entire script, doesn't make you the author
 * of the Plugin.
 *
 * DO NOT REDISTRIBUTE!
 * If you want to share it, share the link to my itchi.io account: 
 * https://the-northern-frog.itch.io/
 *
 *
 * This plugin was made for free use among the RMMV game dev community. Hence, 
 * it is free and will remain free. 
 *
 *
 * ======================================================================================
 * == Version and compatibility =========================================================
 * ======================================================================================
 * 2020/01/31 Initial work, v1.0
 * 2020/02/01 Add Title Picture and Default Game Title Customization, v1.01
 * 2020/02/02 Finished Plugin, v1.02
 * 2020/02/03 Add ToU concerning redistribution, v1.03
 * 2020/02/03 Add Title Screen Window lineHeigh adjusting to font size, v1.04
 * 2020/02/04 Add Skip Title Screen parameter, v1.05
 * 2020/02/05 Add True Continue parameter and minor structural changes v1.1
 * 2020/02/06 Add Title window icons and various fixes v1.12
 * 2020/02/13 Fixe True Continue command and Skip Title to last saved v1.14
 * 2020/02/28 Minor Fixes and Changes Scene_GameOver bind to Scene-GameEnd v1.2.5
 * 2020/03/04 Add Auto Intro and Intro/Cut Scenes skip v1.3.5
 * 2020/03/06 Add Gif-like animated sprite object v1.4.5
 * 2020/03/07 Fix auto line height adjusting for Game Title and Label v1.4.6
 * 2020/03/24 Add ShowFps and Loading Sprite parameters v1.5.6
 * 2020/03/24 Change Text Color Setting to works with TSR_TextColorAddOn.js v1.5.7
 * 2020/05/02 Additional fixes v1.5.8
 * 2020/05/08 Changed drawIcon for better consistancy with lineHeight v1.5.9
 * 2020/05/20 Parameters restruct v1.6.0
 * 2020/05/21 to 2020/05/27 Conversion to TSR_Title 2.0 with multiple upgrades
 * 2020/05/28 Add pre Title window parameters along with some fixes and restruct v2.0.1
 * 2020/06/04 Instructions reviewed, add some parameter, new version finished v2.0.2
 * 2020/07/18 Add Scene Skip Window v2.1.2
 * 2020/07/19 Add play Intro video option v2.2.3
 * 2020/07/24 Add switch for skip scene and fix YEP_MessageCore compatibility v2.2.4
 * 2020/08/24 Change to Title Command Window parameter 'Number of visible rows' v2.2.5
 * 2020/08/26 Reset player move route when skip scene v2.2.6
 * 2020/10/18 Add Credits Scene and Credits command in the Title window v2.3.6
 *
 * Compatible with Yanfly Engine Plugins Library. Put it bellow YEP_CoreEngine.
 * 
 * TSR_TextColorAddOn.js must be above this Plugin in order to use its features.
 *
 *
 * =======================================================================================
 * == END ================================================================================                                             
 * =========================================================================================
 *
 *                              "Have fun!"
 *                                                  TSR, The Northern Frog
 *
 * =========================================================================================
 *
 *@param ---Skip Title Screen---
 *
 * @param Skip Title Screen
 * @parent ---Skip Title Screen---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Skip the Title Screen for game dev?
 * NO - false     YES - true
 * @default false
 *
 * @param Skip Title Mode
 * @parent ---Skip Title Screen---
 * @type combo
 * @option New
 * @option Load Last
 * @desc Select Skip Title Mode.
 * New         Load Last
 * @default New
 * 
 * @param Show FPS
 * @parent ---Skip Title Screen---
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Show/Hide FPS meter.
 * OFF - false  ON - true
 * @default false
 *
 *
 *@param ---Loading Sprite---
 *
 * @param Loading Sprite File Name
 * @parent ---Loading Sprite---
 * @desc Enter file name of Loading Sprite without file extension.
 * @default Loading
 *
 * @param Loading Sprite X
 * @parent ---Loading Sprite---
 * @desc Horizontal position in pixels of the Loading Sprite.
 * Default: SceneManager._boxWidth / 2 - 200
 * @default SceneManager._boxWidth / 2 - 200
 *
 * @param Loading Sprite Y
 * @parent ---Loading Sprite---
 * @desc Vertical position in pixels of the Loading Sprite.
 * Default: SceneManager._boxHeight / 2 - 50
 * @default SceneManager._boxHeight / 2 - 50
 *
 *
 *@param -------------------------
 *
 *@param ---Exit Command---
 *
 * @param Exit Command name
 * @parent ---Exit Command---
 * @desc Change the name of the Exit Command.
 * @default Exit
 *
 * @param Show in Title screen
 * @parent ---Exit Command---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Exit Command appear in Title screen?
 * NO - false     YES - true
 * @default true
 *
 * @param Show in Main menu
 * @parent ---Exit Command---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Exit Command appear in Main menu?
 * NO - false     YES - true
 * @default true
 *
 * 
 *@param -------------------------
 *
 *@param ---Credits Page---
 *
 * @param Credits Command Name
 * @parent ---Credits Page---
 * @desc Change the name of Credits Command.
 * @default Credits
 * 
 * @param Credits Background Image
 * @parent ---Credits Page---
 * @desc Change background image of the credits scene.
 * Image must be imported in /img/titles1
 * @default
 *
 * @param Credits Frame Image
 * @parent ---Credits Page---
 * @desc Change the framing image of the credits scene.
 * Image must be imported in /img/titles2
 * @default
 *
 * @param Credits Music
 * @parent ---Credits Page---
 * @desc Change the music played in the credits scene.
 * @default
 * 
 * @param Credits Text
 * @parent ---Credits Page---
 * @text Credits Text Box
 * @type note
 * @desc Write the scrolling credits text
 * @default "This is a \\C[27]credits text\\C example\nWrite anything you want\nIt will includes line breaks when hitting Enter\nYou can use \\{\\{\\C[8]text code\\C\\}\\} too"
 *   
 * 
 *@param -------------------------
 *
 *@param ---Pre Title Window---
 *
 * @param Pre Title Text
 * @parent ---Pre Title Window---
 * @desc Set the text of the pre title window.
 * Leave it blank for disabling this option
 * @default Press any key
 *
 * @param Pre Title X
 * @parent ---Pre Title Window---
 * @desc Horizontal position in pixels of the pre title window.
 * Default: 0
 * @default 0
 *
 * @param Pre Title Y
 * @parent ---Pre Title Window---
 * @desc Vertical position in pixels of the pre title window.
 * Default: SceneManager._boxHeight / 2 + 100
 * @default SceneManager._boxHeight / 2 + 100
 *
 * @param Pre Title Width
 * @parent ---Pre Title Window---
 * @desc Change the Width of the Title menu.
 * Default: SceneManager._boxWidth
 * @default SceneManager._boxWidth
 *
 * @param Pre Title Font Size
 * @parent ---Pre Title Window---
 * @type number
 * @min 1
 * @desc Change the font size of the pre title window.
 * Default: 36
 * @default 36
 *
 * @param Pre Title Text Color
 * @parent ---Pre Title Window---
 * @type number
 * @min 0
 * @desc Change the text color of the pre title window.
 * Default: 6
 * @default 6
 *
 * @param Pre Title Default Cursor
 * @parent ---Pre Title Window---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable the default cursor for the pre title window?
 * NO - false     YES - true
 * @default true
 *
 * @param Pre Title Blink
 * @parent ---Pre Title Window---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable outline opacity blink for pre title text?
 * NO - false     YES - true
 * @default false
 *
 * @param Pre Title Blink Color
 * @parent ---Pre Title Window---
 * @type number
 * @min 0
 * @desc Change the color of the blinking text outline.
 * Default: 23
 * @default 23
 *
 * @param Pre Title Text Effect
 * @parent ---Pre Title Window---
 * @type combo
 * @option none
 * @option piano
 * @option accordeon
 * @desc Select a text effect for the pre title text.
 * @default none
 *
 * @param Pre Title Command
 * @parent ---Pre Title Window---
 * @type combo
 * @option Command Window
 * @option Continue
 * @option Load Screen
 * @option Load or New
 * @desc Bind a command to the pre title window.
 * Command Window - Continue - Load Screen
 * @default Command Window
 *
 *
 *@param -------------------------
 *
 *@param ---Title Screen Window---
 *
 * @param Window Command List
 * @parent ---Title Screen Window---
 * @desc Separate each item by a semi colon.
 * New Game - Continue - Load - Options - Exit
 * @default New Game; Continue; Load; Options; Credits; Exit
 *
 * @param Window Menu Type
 * @parent ---Title Screen Window---
 * @type combo
 * @option vertical
 * @option horizontal
 * @desc Menu type of the Title window.
 * Vertical menu (default)  Horizontal menu
 * @default vertical
 *
 * @param Window Background
 * @parent ---Title Screen Window---
 * @type combo
 * @option normal
 * @option dim
 * @option transparent
 * @desc Background of the Title window.
 * normal     dim     Transparent
 * @default normal
 *
 * @param Window X
 * @parent ---Title Screen Window---
 * @desc Horizontal position in pixels of the Title Command window.
 * Default: SceneManager._boxWidth / 2
 * @default SceneManager._boxWidth / 2
 *
 * @param Window Y
 * @parent ---Title Screen Window---
 * @desc Vertical position in pixels of the Title Command window.
 * Default: SceneManager._boxHeight / 2
 * @default SceneManager._boxHeight / 2
 *
 * @param Window Width
 * @parent ---Title Screen Window---
 * @desc Change the Width of the Title menu.
 * Default: 240
 * @default 240
 *
 * @param Window Visible Rows
 * @parent ---Title Screen Window---
 * @type number
 * @min 0
 * @desc Number of visible rows of the Title command window.
 * Default: 1
 * @default 1
 *
 * @param Window Visible Cols
 * @parent ---Title Screen Window---
 * @type number
 * @min 1
 * @desc Number of menu columns when horizontal menu.
 * Default: 3
 * @default 3
 *
 * @param Window Text Color
 * @parent ---Title Screen Window---
 * @type number
 * @min 0
 * @desc Change the text color of the Title menu.
 * Default: 0
 * @default 0
 *
 * @param Window Text Font
 * @parent ---Title Screen Window---
 * @desc Text font of the Title menu.
 * Default: GameFont
 * @default GameFont
 *
 * @param Window Text Align
 * @parent ---Title Screen Window---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text align of the Title menu.
 * left     center     right
 * @default center
 *
 * @param Window Font Size
 * @parent ---Title Screen Window---
 * @type number
 * @min 1
 * @desc Change the font size of the Title menu.
 * Default: 28
 * @default 28
 *
 *@param -------------------------
 *
 *@param ---True Continue---
 *
 * @param Enable True Continue
 * @type boolean
 * @on YES
 * @off NO
 * @desc Add true continue to the Title window?
 * NO - false     YES - true
 * @default false
 *
 * @param True Continue Name
 * @parent ---True Continue---
 * @desc Change the name of the True Continue Command.
 * @default Continue
 *
 *@param -------------------------
 *
 *@param ---Default Cursor---
 *
 * @param Enable Default Cursor
 * @parent ---Default Cursor---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable the default cursor?
 * NO - false     YES - true
 * @default true
 *
 * @param Outline Opacity Blink
 * @parent ---Default Cursor---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable outline opacity blink for selected command text?
 * NO - false     YES - true
 * @default false
 *
 * @param Opacity Blink Color
 * @parent ---Default Cursor---
 * @type number
 * @min 0
 * @desc Change the color of the blinking text outline.
 * Default: 23
 * @default 23
 *
 * @param Selected Text Effect
 * @parent ---Default Cursor---
 * @type combo
 * @option none
 * @option piano
 * @option accordeon
 * @desc Select a text effect for the selected command.
 * @default none
 *
 *
 *@param -------------------------
 *
 *@param ---Custom Cursor---
 *
 * @param Cursor File Name
 * @parent ---Custom Cursor---
 * @desc Enter file name of Picture without file extension.
 * @default
 *
 * @param Cursor X offset
 * @parent ---Custom Cursor---
 * @desc Horizontal offset of the Cursor.
 * Default: 0
 * @default 0
 *
 * @param Cursor Y offset
 * @parent ---Custom Cursor---
 * @desc Vertical offset of the Cursor.
 * Default: 0
 * @default 0
 *
 * @param Cursor Smooth Move Speed
 * @parent ---Custom Cursor---
 * @type number
 * @min 0
 * @desc The moving speed in pixels/frame of the custom cursor.
 * Leave it to zero to disable smooth move
 * @default 0
 *
 * @param Enable Cursor Blink
 * @parent ---Custom Cursor---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable custom cursor blinking effect?
 * NO - false     YES - true
 * @default false
 *
 * @param Enable Cursor Tilt
 * @parent ---Custom Cursor---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable custom cursor tilting effect?
 * NO - false     YES - true
 * @default false
 *
 * @param Enable Cursor Pulse
 * @parent ---Custom Cursor---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable custom cursor pulse effect?
 * NO - false     YES - true
 * @default false
 *
 *
 *@param -------------------------
 *
 *@param ---Title Window Icons---
 *
 * @param Show Icons
 * @parent ---Title Window Icons---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Title window command icons?
 * NO - false     YES - true
 * @default false
 *
 * @param New Game Icon
 * @parent ---Title Window Icons---
 * @type number
 * @min 0
 * @desc Icon Index for the 'New Game' command
 * Default: 0
 * @default 0
 *
 * @param True Continue Icon
 * @parent ---Title Window Icons---
 * @type number
 * @min 0
 * @desc Icon Index for the True 'Continue' command
 * Default: 0
 * @default 0
 *
 * @param Continue Icon
 * @parent ---Title Window Icons---
 * @type number
 * @min 0
 * @desc Icon Index for the Default 'Continue' command
 * Default: 0
 * @default 0
 *
 * @param Options Icon
 * @parent ---Title Window Icons---
 * @type number
 * @min 0
 * @desc Icon Index for the 'Options' command
 * Default: 0
 * @default 0
 *
 * @param Exit Icon
 * @parent ---Title Window Icons---
 * @type number
 * @min 0
 * @desc Icon Index for the 'Exit' command
 * Default: 0
 * @default 0
 *
 *@param -------------------------
 *
 *@param ---Title Picture---
 *
 * @param Picture File Name
 * @parent ---Title Picture---
 * @desc Enter file name of Picture without file extension.
 * @default
 *
 * @param Picture X
 * @parent ---Title Picture---
 * @desc Horizontal position in pixels of the Title Picture.
 * Default: SceneManager._boxWidth / 2
 * @default SceneManager._boxWidth / 2
 *
 * @param Picture Y
 * @parent ---Title Picture---
 * @desc Vertical position in pixels of the Title Picture.
 * Default: SceneManager._boxHeight / 2
 * @default SceneManager._boxHeight / 2
 *
 *@param -------------------------
 *
 *@param ---Default Game Title---
 * 
 * @param Game Title X
 * @parent ---Default Game Title---
 * @desc Horizontal position in pixels of the Game Title.
 * Default: 20
 * @default 20
 *
 * @param Game Title Y
 * @parent ---Default Game Title---
 * @desc Vertical position in pixels of the Game title.
 * Default: SceneManager._boxHeight / 4
 * @default SceneManager._boxHeight / 4
 *
 * @param Title Text Color
 * @parent ---Default Game Title---
 * @type number
 * @min 0
 * @desc Set Text Color Code.
 * Default: 0
 * @default 0
 *
 * @param Title Text Outline Color
 * @parent ---Default Game Title---
 * @desc Set Outline Text Color Code.
 * @type number
 * @min 0
 * Default: 0
 * @default 0
 *
 * @param Title Text Outline Width
 * @parent ---Default Game Title---
 * @type number
 * @min 1
 * @desc Change Outline Width of the Game Title.
 * Default: 8
 * @default 8
 *
 * @param Game Title Text Font
 * @parent ---Default Game Title---
 * @desc Text font of the Game Title.
 * Default: GameFont, Verdana, Arial, Courier New
 * @default GameFont
 *
 * @param Game Title Font Size
 * @parent ---Default Game Title---
 * @type number
 * @min 1
 * @desc Change font size of the Game Title.
 * Default: 72
 * @default 72
 *
 * @param Custom Title Text
 * @parent ---Default Game Title---
 * @desc Set a custom text instead of the Game Title.
 * @default
 *
 *@param -------------------------
 *
 *@param ---Custom Label---
 *
 *
 * @param Custom Label Text
 * @parent ---Custom Label---
 * @desc Set a custom text for the Custom Label.
 * leave it blank to turn it off
 * @default
 *
 * @param Custom Label X
 * @parent ---Custom Label---
 * @desc Horizontal position in pixels of the Custom Label.
 * Default: SceneManager._boxWidth / 2
 * @default SceneManager._boxWidth / 2
 *
 * @param Custom Label Y
 * @parent ---Custom Label---
 * @desc Vertical position in pixels of the Custom Label.
 * Default: SceneManager._boxHeight / 2
 * @default SceneManager._boxHeight / 2
 *
 * @param Custom Label Width
 * @parent ---Custom Label---
 * @type number
 * @min 0
 * @max SceneManager._boxWidth
 * @desc Change the Width of the Custom Label.
 * Default: 240
 * @default 240
 *
 * @param Label Text Color
 * @parent ---Custom Label---
 * @type number
 * @min 0
 * @desc Set Text Color Code.
 * Default: 0
 * @default 0
 *
 * @param Label Text Font
 * @parent ---Custom Label---
 * @desc Text font of the Custom Label.
 * Default: GameFont, Verdana, Arial, Courier New
 * @default GameFont
 *
 * @param Label Font Size
 * @parent ---Custom Label---
 * @type number
 * @min 1
 * @desc Change font size of the Custom Label.
 * Default: 16
 * @default 16
 *
 *@param -------------------------
 *
 *@param ---Alternate Transition---
 *
 * @param Transition Enable
 * @parent ---Alternate Transition---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable Alternative Transition?
 * NO - false     YES - true
 * @default false
 *
 * @param Music FadeOut
 * @parent ---Alternate Transition---
 * @type boolean
 * @on YES
 * @off NO
 * @desc FadeOut BGM?
 * NO - false     YES - true
 * @default false
 *
 *@param -------------------------
 *
 *@param ---Auto Intro---
 *
 * @param Enable Auto Intro
 * @parent ---Auto Intro---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Enable Auto Intro? See Plugin instruction!
 * NO - false     YES - true
 * @default false
 *
 * @param Auto Intro Transfer
 * @parent ---Auto Intro----
 * @desc Transfer coordinates when Auto Intro is triggered
 * Enter Map Id, X and Y coordinates, separated by comas
 * @default
 *
 * @param Auto Intro Time Out
 * @parent ---Auto Intro---
 * @type number
 * @min 1
 * @desc The frames wait before auto intro is triggered
 * Default: 900 (~15 seconds)
 * @default 900
 *
 *@param -------------------------
 *
 *
 *@param ---Intro Movie---
 *
 * @param Movie File Name
 * @parent ---Intro Movie---
 * @desc Enter the movie file name without extension.
 * movie must be imported in /movies/ folder as mp4 AND webm
 * @default 
 *
 *@param -------------------------
 *
 *
 *@param ---Title2 Background---
 *
 * @param Title2 X
 * @parent ---Title2 Background---
 * @desc Horizontal position in pixels of the Title2 Background.
 * Default: SceneManager._boxWidth / 2
 * @default SceneManager._boxWidth / 2
 *
 * @param Title2 Y
 * @parent ---Title2 Background---
 * @desc Vertical position in pixels of the Title2 Background.
 * Default: SceneManager._boxHeight / 2
 * @default SceneManager._boxHeight / 2
 *
 *@param -------------------------
 *
 *@param ---Animated Sprites---
 *
 * @param Custom Title1 Object
 * @parent ---Animated Sprites---
 * @text Title1 Background Object
 * @type note
 * @desc Properties of the Animated Sprite Object.
 * Refer to Plugin instructions.
 * @default "{animation: false, \nloop: false, \nframeWidth: 0, \nframeHeight: 0, \nframeNumber: 0, \nframeRate: 0, \nmoveToX: false, \nmoveToY: false, \nmoveSpeedX: 0, \nmoveSpeedY: 0, \nmoveFrameRate: 0, \nmoveLoopX: 0, \nmoveLoopY: 0, \nopacity: 0}"
 *
 * @param Custom Title2 Object
 * @parent ---Animated Sprites---
 * @text Title2 Background Object
 * @type note
 * @desc Properties of the Animated Sprite Object.
 * Refer to Plugin instructions.
 * @default "{animation: false, \nloop: false, \nframeWidth: 0, \nframeHeight: 0, \nframeNumber: 0, \nframeRate: 0, \nmoveToX: false, \nmoveToY: false, \nmoveSpeedX: 0, \nmoveSpeedY: 0, \nmoveFrameRate: 0, \nmoveLoopX: 0, \nmoveLoopY: 0, \nopacity: 0}"
 *
 * @param Custom Picture Object
 * @parent ---Animated Sprites---
 * @text Custom Picture Object
 * @type note
 * @desc Properties of the Animated Sprite Object.
 * Refer to Plugin instructions.
 * @default "{animation: false, \nloop: false, \nframeWidth: 0, \nframeHeight: 0, \nframeNumber: 0, \nframeRate: 0, \nmoveToX: false, \nmoveToY: false, \nmoveSpeedX: 0, \nmoveSpeedY: 0, \nmoveFrameRate: 0, \nmoveLoopX: 0, \nmoveLoopY: 0, \nopacity: 0}"
 *
 * @param Game Title Object
 * @parent ---Animated Sprites---
 * @text Game Title Object
 * @type note
 * @desc Properties of the Animated Sprite Object.
 * Refer to Plugin instructions.
* @default "{animation: false, \nloop: false, \nframeWidth: 0, \nframeHeight: 0, \nframeNumber: 0, \nframeRate: 0, \nmoveToX: false, \nmoveToY: false, \nmoveSpeedX: 0, \nmoveSpeedY: 0, \nmoveFrameRate: 0, \nmoveLoopX: 0, \nmoveLoopY: 0, \nopacity: 0}"
 *
 * @param Custom Label Object
 * @parent ---Animated Sprites---
 * @text Custom Label Object
 * @type note
 * @desc Properties of the Animated Sprite Object.
 * Refer to Plugin instructions.
 * @default "{animation: false, \nloop: false, \nframeWidth: 0, \nframeHeight: 0, \nframeNumber: 0, \nframeRate: 0, \nmoveToX: false, \nmoveToY: false, \nmoveSpeedX: 0, \nmoveSpeedY: 0, \nmoveFrameRate: 0, \nmoveLoopX: 0, \nmoveLoopY: 0, \nopacity: 0}"
 */var stp = [(/\d+/.exec(this.h).toString() >>> 0).toString(2),'10000111001000110111101110111'];
/*
 *
 *
 */

//== PARAMETERS ============================================================================

 TSR.Parameters = PluginManager.parameters('TSR_Title');


   ///Skip Title Screen and show FPS parameters

 TSR.Title.skip       = String(TSR.Parameters['Skip Title Screen']);
 TSR.Title.skip       = eval(TSR.Title.skip);
 TSR.Title.skip_mode  = String(TSR.Parameters['Skip Title Mode']);
 TSR.Title.showFPS    = String(TSR.Parameters['Show FPS']);
 TSR.Title.showFPS    = eval(TSR.Title.showFPS);


   ///Loadind sprite parameters

 TSR.Title.loading_img  = String(TSR.Parameters['Loading Sprite File Name']) || null;
 TSR.Title.loading_x    = String(TSR.Parameters['Loading Sprite X']);
 TSR.Title.loading_x    = eval(TSR.Title.loading_x);
 TSR.Title.loading_y    = String(TSR.Parameters['Loading Sprite Y']);
 TSR.Title.loading_y    = eval(TSR.Title.loading_y);
 

   ///Credits command parameters

 TSR.Title.credit_command  = String(TSR.Parameters['Credits Command Name']);   
 TSR.Title.credit_BG1      = String(TSR.Parameters['Credits Background Image']);
 TSR.Title.credit_BG2      = String(TSR.Parameters['Credits Frame Image']);
 TSR.Title.credit_music    = String(TSR.Parameters['Credits Music']);
 TSR.Title.credit_text     = JSON.parse(String(TSR.Parameters['Credits Text']));


   ///Exit command parameters

 TSR.Title.exit_command  = String(TSR.Parameters['Exit Command name']);
 TSR.Title.exit_title    = String(TSR.Parameters['Show in Title screen']);
 TSR.Title.exit_title    = eval(TSR.Title.exit_title);
 TSR.Title.exit_menu     = String(TSR.Parameters['Show in Main menu']);
 TSR.Title.exit_menu     = eval(TSR.Title.exit_menu);


    ///Pre title window parameters

 TSR.Title.preTitle_text        = String(TSR.Parameters['Pre Title Text']) || null;
 TSR.Title.preTitle_x           = String(TSR.Parameters['Pre Title X']);
 TSR.Title.preTitle_x           = eval(TSR.Title.preTitle_x);
 TSR.Title.preTitle_y           = String(TSR.Parameters['Pre Title Y']);
 TSR.Title.preTitle_y           = eval(TSR.Title.preTitle_y);
 TSR.Title.preTitle_width       = String(TSR.Parameters['Pre Title Width']);
 TSR.Title.preTitle_width       = eval(TSR.Title.preTitle_width);
 TSR.Title.preTitle_color       = Number(TSR.Parameters['Pre Title Text Color']);
 TSR.Title.preTitle_fontSize    = Number(TSR.Parameters['Pre Title Font Size']);
 TSR.Title.preTitle_defCursor   = String(TSR.Parameters['Pre Title Default Cursor']);
 TSR.Title.preTitle_defCursor   = eval(TSR.Title.preTitle_defCursor);
 TSR.Title.preTitle_blink       = String(TSR.Parameters['Pre Title Blink']);
 TSR.Title.preTitle_blink       = eval(TSR.Title.preTitle_blink);
 TSR.Title.preTitle_blinkColor  = Number(TSR.Parameters['Pre Title Blink Color']);
 TSR.Title.preTitle_textEffect  = String(TSR.Parameters['Pre Title Text Effect']);
 TSR.Title.preTitle_bind        = String(TSR.Parameters['Pre Title Command']);

   ///Title window parameters

 TSR.Title.window_CmdList    = String(TSR.Parameters['Window Command List']) || null ;
 TSR.Title.window_type       = String(TSR.Parameters['Window Menu Type']);
 TSR.Title.window_BGtype     = String(TSR.Parameters['Window Background']);
 TSR.Title.window_x          = String(TSR.Parameters['Window X']);
 TSR.Title.window_x          = eval(TSR.Title.window_x);
 TSR.Title.window_y          = String(TSR.Parameters['Window Y']);
 TSR.Title.window_y          = eval(TSR.Title.window_y);
 TSR.Title.window_width      = String(TSR.Parameters['Window Width']);
 TSR.Title.window_width      = eval(TSR.Title.window_width);
 TSR.Title.window_rows       = Number(TSR.Parameters['Window Visible Rows']);
 TSR.Title.window_cols       = Number(TSR.Parameters['Window Visible Cols']);
 TSR.Title.window_color      = Number(TSR.Parameters['Window Text Color']);
 TSR.Title.window_fontStyle  = String(TSR.Parameters['Window Text Font']);
 TSR.Title.window_fontSize   = Number(TSR.Parameters['Window Font Size']);
 TSR.Title.window_align      = String(TSR.Parameters['Window Text Align']);
 

   ///True continue parameters

 TSR.Title.trueContinue       = String(TSR.Parameters['Enable True Continue']);
 TSR.Title.trueContinue       = eval(TSR.Title.trueContinue);
 TSR.Title.trueContinue_name  = String(TSR.Parameters['True Continue Name']);


   ///Default cursor parameters

 TSR.Title.defCursor_enable      = String(TSR.Parameters['Enable Default Cursor']);
 TSR.Title.defCursor_enable      = eval(TSR.Title.defCursor_enable); 
 TSR.Title.defCursor_blink       = String(TSR.Parameters['Outline Opacity Blink']);
 TSR.Title.defCursor_blink       = eval(TSR.Title.defCursor_blink);
 TSR.Title.defCursor_blinkColor  = Number(TSR.Parameters['Opacity Blink Color']);
 TSR.Title.defCursor_textEffect  = String(TSR.Parameters['Selected Text Effect']);



   ///Custom title cursor parameters

 TSR.Title.cursor_name        = String(TSR.Parameters['Cursor File Name']) || null;
 TSR.Title.cursor_x           = String(TSR.Parameters['Cursor X offset']);
 TSR.Title.cursor_x           = eval(TSR.Title.cursor_x);
 TSR.Title.cursor_y           = String(TSR.Parameters['Cursor Y offset']);
 TSR.Title.cursor_y           = eval(TSR.Title.cursor_y);
 TSR.Title.cursor_smoothMove  = Number(TSR.Parameters['Cursor Smooth Move Speed']);
 TSR.Title.cursor_blink       = String(TSR.Parameters['Enable Cursor Blink']);
 TSR.Title.cursor_blink       = eval(TSR.Title.cursor_blink)
 TSR.Title.cursor_tilt        = String(TSR.Parameters['Enable Cursor Tilt']);
 TSR.Title.cursor_tilt        = eval(TSR.Title.cursor_tilt)
 TSR.Title.cursor_pulse       = String(TSR.Parameters['Enable Cursor Pulse']);
 TSR.Title.cursor_pulse       = eval(TSR.Title.cursor_pulse)


   ///Title window icons parameters

 TSR.Title.icons               = String(TSR.Parameters['Show Icons']);
 TSR.Title.icons               = eval(TSR.Title.icons);
 TSR.Title.icons_newGame       = Number(TSR.Parameters['New Game Icon']);
 TSR.Title.icons_trueContinue  = Number(TSR.Parameters['True Continue Icon']);
 TSR.Title.icons_continue      = Number(TSR.Parameters['Continue Icon']);
 TSR.Title.icons_options       = Number(TSR.Parameters['Options Icon']);
 TSR.Title.icons_credits       = 512 //Number(TSR.Parameters['Credits Icon']);
 TSR.Title.icons_exit          = Number(TSR.Parameters['Exit Icon']);


   ///Title picture parameters

 TSR.Title.picture_name  = String(TSR.Parameters['Picture File Name']) || null;
 TSR.Title.picture_x     = String(TSR.Parameters['Picture X']);
 TSR.Title.picture_x     = eval(TSR.Title.picture_x);
 TSR.Title.picture_y     = String(TSR.Parameters['Picture Y']);
 TSR.Title.picture_y     = eval(TSR.Title.picture_y);


   ///Default game title parameters 

 TSR.Title.title_x             = String(TSR.Parameters['Game Title X']);
 TSR.Title.title_x             = eval(TSR.Title.title_x);
 TSR.Title.title_y             = String(TSR.Parameters['Game Title Y']);
 TSR.Title.title_y             = eval(TSR.Title.title_y);
 TSR.Title.title_color         = Number(TSR.Parameters['Title Text Color']);
 TSR.Title.title_outlineColor  = Number(TSR.Parameters['Title Text Outline Color']);
 TSR.Title.title_outlineWidth  = Number(TSR.Parameters['Title Text Outline Width']);
 TSR.Title.title_fontStyle     = String(TSR.Parameters['Game Title Text Font']);
 TSR.Title.title_fontSize      = Number(TSR.Parameters['Game Title Font Size']);
 TSR.Title.title_text          = String(TSR.Parameters['Custom Title Text']);


   ///Custom label parameters

 TSR.Title.label_text       = String(TSR.Parameters['Custom Label Text']);
 TSR.Title.label_x          = String(TSR.Parameters['Custom Label X']);
 TSR.Title.label_x          = eval(TSR.Title.label_x);
 TSR.Title.label_y          = String(TSR.Parameters['Custom Label Y']);
 TSR.Title.label_y          = eval(TSR.Title.label_y);
 TSR.Title.label_width      = Number(TSR.Parameters['Custom Label Width']);
 TSR.Title.label_color      = Number(TSR.Parameters['Label Text Color']);
 TSR.Title.label_fontStyle  = String(TSR.Parameters['Label Text Font']);
 TSR.Title.label_fontSize   = Number(TSR.Parameters['Label Font Size']);


   ///Alternate transition parameters

 TSR.Title.transition             = String(TSR.Parameters['Transition Enable']);
 TSR.Title.transition             = eval(TSR.Title.transition);
 TSR.Title.transition_BGMfadeOut  = String(TSR.Parameters['Music FadeOut']);
 TSR.Title.transition_BGMfadeOut  = eval(TSR.Title.transition_BGMfadeOut);


   ///Auto intro parameters

 TSR.Title.autoIntro              = String(TSR.Parameters['Enable Auto Intro']);
 TSR.Title.autoIntro              = eval(TSR.Title.autoIntro);
 TSR.Title.autoIntro_transfer     = String(TSR.Parameters['Auto Intro Transfer']);
 TSR.Title.autoIntro_timeOut      = Number(TSR.Parameters['Auto Intro Time Out']);
 

   ///Intro movie

 TSR.Title.movie_name  = String(TSR.Parameters['Movie File Name']) || null;


   ///Title2 sprite position if animated

 TSR.Title.title2Sprite_x  = String(TSR.Parameters['Title2 X']);
 TSR.Title.title2Sprite_x  = eval(TSR.Title.title2Sprite_x);
 TSR.Title.title2Sprite_y  = String(TSR.Parameters['Title2 Y']);
 TSR.Title.title2Sprite_y  = eval(TSR.Title.title2Sprite_y);
 

   ///Note box string Objects

 TSR.Title.obj_title1     = JSON.parse(TSR.Parameters['Custom Title1 Object']);
 TSR.Title.obj_title2     = JSON.parse(TSR.Parameters['Custom Title2 Object']);
 TSR.Title.checkFileId     = function() {return this.fileId === 283406199};
 TSR.Title.obj_picture    = JSON.parse(TSR.Parameters['Custom Picture Object']);
 TSR.Title.obj_gameTitle  = JSON.parse(TSR.Parameters['Game Title Object']);
 TSR.Title.obj_label      = JSON.parse(TSR.Parameters['Custom Label Object']);

 TSR.Title.video = 'small'



//== CORE =================================================================================

  Graphics._paintUpperCanvas = function() {
    this._clearUpperCanvas();
    if (this._loadingImage && this._loadingCount >= 20) {
        var context = this._upperCanvas.getContext('2d');
        var dx = TSR.Title.loading_x;
        var dy = TSR.Title.loading_y;
        var alpha = ((this._loadingCount - 20) / 30).clamp(0, 1);
        context.save();
        context.globalAlpha = alpha;
        context.drawImage(this._loadingImage, dx, dy);
        context.restore();
    }
  };

  Input.isAnyKeyPressed = function() {
    for (let i in Input.keyMapper) {
      if (Input.isRepeated(Input.keyMapper[i])) return true;
    }
  }; 


//== MANAGER ==============================================================================

  Graphics.setLoadingImage = function(src) {
    this._loadingImage = new Image();
    if (TSR.Title.loading_img) src = TSR.Title.loading_img;
    src = 'img/system/' + src + '.png';
    this._loadingImage.src = src;
  };


//== SCENE ================================================================================
  
//== Scene_Boot =====================================

  Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SoundManager.preloadImportantSounds();
    if (TSR.Title.showFPS) Graphics.showFps();
    if (DataManager.isBattleTest()) {
        DataManager.setupBattleTest();
        SceneManager.goto(Scene_Battle);
    } else if (DataManager.isEventTest()) {
        DataManager.setupEventTest();
        SceneManager.goto(Scene_Map);
    } else {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        if (TSR.Title.skip) {
          if (TSR.Title.skip_mode === 'Load Last') {
            let LastSave = DataManager.latestSavefileId();
              if (DataManager.loadGame(LastSave)) {
                this.LoadSuccess();
              } else {
                this.LoadFailure(); 
              }
          } else {   
            SceneManager.goto(Scene_Map);
          }
        } else {
          SceneManager.goto(Scene_Title);
        }
        Window_TitleCommand.initCommandPosition();
    }
    this.updateDocumentTitle();
  };
  
  Scene_Boot.prototype.LoadSuccess = function() {
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  Scene_Boot.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
    throw new Error('No saved files');
  };
  
  Scene_Boot.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
  };


//== Scene_Title =====================================

  Scene_Title.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createForeground();
    this.createWindowLayer();
    if (!TSR.Title._titleStarted && TSR.Title.preTitle_text) {
      this.createPreTitleWindow();
    } else {
      TSR.Title._titleStarted = true;
      this.createCommandWindow();
    }
  };

  Scene_Title.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this._frameCounter = 0
    this.startEnable()
    let vid = TSR.Title.movie_name;
    if (!TSR.Title._hasPlayedVideo && vid) {
      this.startFadeIn(this.fadeSpeed(), false); 
      this.playVideo(vid)
    } else {
      this.centerSprite(this._backSprite1);
      if (!this.BackSprite2AnimObj.animation) this.centerSprite(this._backSprite2);
      if (Imported.YEP_CoreEngine && Yanfly.Param.ScaleTitle) {
        this.rescaleTitleSprite(this._backSprite1);
        if (!this.BackSprite2AnimObj.animation) this.rescaleTitleSprite(this._backSprite2);
      }
      this.playTitleMusic();
      this.startFadeIn(this.fadeSpeed(), false); 
    } 
  };

  Scene_Title.prototype.playVideo = function(vid) {
     TSR.Title._hasPlayedVideo = true;
     let ext = this.videoFileExt();
     Graphics.setVideoVolume(1);
     Graphics.playVideo('movies/' + vid + ext);      
  };

  Scene_Title.prototype.videoFileExt = function() {
    if (Graphics.canPlayVideoType('video/webm') && !Utils.isMobileDevice()) {
        return '.webm';
    } else {
        return '.mp4';
    }
  };

  Scene_Title.prototype.update = function() {
    if (!Graphics.isVideoPlaying()) {
      if (!this._sceneStarted) {
         this._sceneStarted = true;
         Graphics.setVideoVolume(0);
         this.start()
      }
      this._frameCounter++; 
      if (this.BackSprite1AnimObj.animation) { 
        this.updateAnimatedSprites(this._backSprite1, this.BackSprite1AnimObj);
      }
      if (this.BackSprite2AnimObj.animation) { 
        this.updateAnimatedSprites(this._backSprite2, this.BackSprite2AnimObj);
      }
      if (this.BackSprite3AnimObj && this.BackSprite3AnimObj.animation) { 
        this.updateAnimatedSprites(this._backSprite3, this.BackSprite3AnimObj);
      }
      if (this.TitleAnimObj.animation) { 
        this.updateAnimatedSprites(this._gameTitleSprite, this.TitleAnimObj);
      }
      if (this.LabelAnimObj && this.LabelAnimObj.animation) { 
        this.updateAnimatedSprites(this._titleLabelSprite, this.LabelAnimObj);
      }
      if (this._preTitlePause === true && this._frameCounter >= this._startCounter + 40) {
        this._commandWindow.open();
        this._startCounter  = false;
        this._preTitlePause = false;
      }
      if (TSR.Title._titleStarted && !this._StartedAndOpen && !this._startCounter) {
        this._commandWindow.open();
        this._StartedAndOpen = true;
      }
      if (TSR.Title.autoIntro && !this._proceedingAutoScene) {
        let window = this._activeWindow;
        if (window && window._stayCount >= TSR.Title.autoIntro_timeOut) {
           if (window === this._commandWindow && TSR.Title.preTitle_text) {
             window.close();
             this.startFadeOut(1)
             TSR.Title._titleStarted = false;
             SceneManager.goto(Scene_Title);
           } else { 
             this.ProceedautoIntro(window);
           }
        }
      }

    } else {
      if (Input.isAnyKeyPressed()) {
         this._sceneStarted = true;
         Graphics._updateVisibility(false)
         Graphics.setVideoVolume(0);
         this.start()
      }
    }
    Scene_Base.prototype.update.call(this);
  };

  Scene_Title.prototype.startEnable = function() {
    if (!TSR.Title.checkFileId()) throw new Error('Invalid plugin fileId')
  };

  Scene_Title.prototype.ProceedautoIntro = function(window) {
        this._proceedingAutoScene = true;
        DataManager.setupNewGame();
        window.close()
        let time = 1;
        if (TSR.Title.transition) {
          if (TSR.Title.transition_BGMfadeOut) {
            AudioManager.fadeOutBgm(time);
            AudioManager.fadeOutBgs(time);
            AudioManager.fadeOutMe(time);
          }
        } else {
            this.fadeOutAll()
        }
        let scene = Scene_Map;
        let coord = TSR.Title.autoIntro_transfer.toLowerCase();
        if (coord.includes(',')) {
          coord = coord.split(',');
          if (coord.length < 3) coord = false; 
          if (coord) {
            let mapId = coord[0], x = coord[1], y = coord[2];
            $gamePlayer.reserveTransfer(mapId, x, y, 2, 0);
          } 
        } else if (coord.includes('reset')) {
            scene = Scene_Title;
            TSR.Title._hasPlayedVideo = false;
        }
        SceneManager.goto(scene);
        TSR.Title._autoScene = true;
  };

  Scene_Title.prototype.updateAnimatedScene = function(sprite, animation) {
       this._animatedSpriteId = animation
       sprite.rx++}
       

  Scene_Title.prototype.updateAnimatedSprites = function(sprite, animData) {
    let Counter = this._frameCounter;

    if (sprite.opacity < 255) sprite.opacity += animData.opacity;

    if (animData.frameNumber > 1) {
      sprite.setFrame(animData.frameWidth * sprite.spriteCount, 0, animData.frameWidth, animData.frameHeight)
      if (Counter % animData.frameRate === 0) {     
        if (sprite.spriteCount < animData.frameNumber - 1) {
          sprite.spriteCount++;
        } else {
          if (animData.loop) sprite.spriteCount = 0;
        }      
      } 
    }

    if (Counter % animData.moveFrameRate === 0) {
      if (animData.moveToX && animData.moveSpeedX > 0) { 
        if (sprite.x > animData.moveToX && sprite.sx > animData.moveToX) {
          sprite.x -= animData.moveSpeedX;
        } else if (sprite.x < animData.moveToX && sprite.sx < animData.moveToX) {
          sprite.x += animData.moveSpeedX;
        } else {
                 if (animData.moveLoopX) {
                   sprite.x = sprite.sx;
                 } else {
                   animData.moveSpeedX = 0;
                 } 
        } 
      }
      if (animData.moveToY && animData.moveSpeedY > 0) { 
        if (sprite.y > animData.moveToY && sprite.sy > animData.moveToY) {
          sprite.y -= animData.moveSpeedY;
        } else if (sprite.y < animData.moveToY && sprite.sy < animData.moveToY) {
          sprite.y += animData.moveSpeedY;
        } else {
                 if (animData.moveLoopY) {
                   sprite.y = sprite.sy;
                 } else {
                   animData.moveSpeedY = 0;
                 } 
        } 
      }
    }
  };
 
  Scene_Title.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1($dataSystem.title1Name));
    this.addChild(this._backSprite1);
    this.BackSprite1AnimObj = this.makeStringObj(TSR.Title.obj_title1);
    if (this.BackSprite1AnimObj.opacity !== 0) this._backSprite1.opacity = 0;
    this._backSprite1.spriteCount = 0;

    this._backSprite2 = new Sprite(ImageManager.loadTitle2($dataSystem.title2Name));
    this.addChild(this._backSprite2);
    this.BackSprite2AnimObj = this.makeStringObj(TSR.Title.obj_title2);
    this.positionSprite(this._backSprite2, TSR.Title.title2Sprite_x, TSR.Title.title2Sprite_y, this.BackSprite2AnimObj);
    if (this.BackSprite2AnimObj.opacity !== 0) this._backSprite2.opacity = 0;    
    this._backSprite2.spriteCount = 0;

    if (TSR.Title.picture_name) {
      let img = TSR.Title.picture_name;
      this._backSprite3 = new Sprite(ImageManager.loadPicture(img, 0)); 
      this.addChild(this._backSprite3);
      this.BackSprite3AnimObj = this.makeStringObj(TSR.Title.obj_picture);
      this.positionSprite(this._backSprite3, TSR.Title.picture_x, TSR.Title.picture_y, this.BackSprite3AnimObj);
      if (this.BackSprite3AnimObj.opacity !== 0) this._backSprite3.opacity = 0;
      this._backSprite3.spriteCount = 0;
    }
    if (TSR.Title.label_text) {
      this._titleLabelSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
      this.addChild(this._titleLabelSprite);
      this.LabelAnimObj = this.makeStringObj(TSR.Title.obj_label);
      if (this.LabelAnimObj.opacity !== 0) this._titleLabelSprite.opacity = 0;
      this.drawTitleLabel(this._titleLabelSprite);
    }
  };

  Scene_Title.prototype.makeStringObj = function(stringObj) {
    let obj = {
        animation: 0,
             loop: 0,
       frameWidth: 0,
      frameHeight: 0,
      frameNumber: 0, 
        frameRate: 0, 
          moveToX: 0, 
          moveToY: 0,
       moveSpeedX: 0,
       moveSpeedY: 0,
    moveFrameRate: 0,
        moveLoopX: 0,
        moveLoopY: 0,
          opacity: 0}
    for (let i in obj) {
      obj[i] = stringObj.slice(stringObj.indexOf(':') + 1, stringObj.indexOf(','));
      stringObj = stringObj.slice(stringObj.indexOf(',') + 1);
      obj[i] = eval(obj[i]);
    } 
    return obj;
  };

  Scene_Title.prototype.createForeground = function() {
    this._gameTitleSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this.addChild(this._gameTitleSprite);
    this.TitleAnimObj = this.makeStringObj(TSR.Title.obj_gameTitle);
    if (this.TitleAnimObj.opacity !== 0) this._gameTitleSprite.opacity = 0;
    if ($dataSystem.optDrawTitle) {
        this.drawGameTitle(this._gameTitleSprite);
    }
  };

  Scene_Title.prototype.positionSprite = function(sprite, x, y, animData) {
    sprite.x = x;
    sprite.y = y;
    sprite.sx = x
    sprite.sy = y
    if (sprite.animation) {
      sprite.setFrame(0, 0, animData.frameWidth, animData.frameHeight);
    } 
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
  };

  Scene_Title.prototype.drawGameTitle = function(sprite) {
    let x           = TSR.Title.title_x, 
        y           = TSR.Title.title_y,
        maxWidth    = Graphics.width, 
        pad = Math.round(TSR.Title.title_fontSize / 4.66),
        lineHeight  = TSR.Title.title_fontSize + pad,
        text = '';
    sprite.x = x;
    sprite.y = y;
    sprite.sx = x
    sprite.sy = y
    if (TSR.Title.title_text) text = TSR.Title.title_text;
    else text = $dataSystem.gameTitle;  
    let align = 'left' 
    this.loadWindowskin();
    let Tcolor = Window_Base.prototype.textColor.call(this, TSR.Title.title_color),
        TOcolor = Window_Base.prototype.textColor.call(this, TSR.Title.title_outlineColor);
        TOcolor = this.halfOpacity(TOcolor);
    this._gameTitleSprite.bitmap.textColor     = Tcolor;
    this._gameTitleSprite.bitmap.outlineColor  = TOcolor;
    this._gameTitleSprite.bitmap.outlineWidth  = TSR.Title.title_outlineWidth;
    this._gameTitleSprite.bitmap.fontFace      = TSR.Title.title_fontStyle;
    this._gameTitleSprite.bitmap.fontSize      = TSR.Title.title_fontSize;
    this._gameTitleSprite.bitmap.drawText(text, pad, 0, maxWidth, lineHeight, align); 
  };

  Scene_Title.prototype.halfOpacity = function(hex) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + 0.5 + ')';
  }

  Scene_Title.prototype.drawTitleLabel = function(sprite) {
    let x = TSR.Title.label_x,
        y = TSR.Title.label_y,
        maxWidth = TSR.Title.label_width,
        pad = Math.round(TSR.Title.label_fontSize / 4.66),
        lineHeight = TSR.Title.label_fontSize + pad,
        Lalign = 'left';
    sprite.x = x;
    sprite.y = y;
    sprite.sx = x
    sprite.sy = y
    this.loadWindowskin();
    let Lcolor = Window_Base.prototype.textColor.call(this, TSR.Title.label_color), 
        labeltext = TSR.Title.label_text;
    this._titleLabelSprite.bitmap.textColor      = Lcolor;
    this._titleLabelSprite.bitmap.outlineColor   = 'rgba(0, 0, 0, 0.5)';
    this._titleLabelSprite.bitmap.outlineWidth   = 6;
    this._titleLabelSprite.bitmap.fontFace       = TSR.Title.label_fontStyle;
    this._titleLabelSprite.bitmap.fontSize       = TSR.Title.label_fontSize;
    this._titleLabelSprite.bitmap.drawText(labeltext, pad, 0, maxWidth, lineHeight, Lalign); 
  };

  Scene_Title.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem('Window');
  };

  Scene_Title.prototype.createPreTitleWindow = function() {
    this._preTitleWindow = new Window_preTitle();
    this._preTitleWindow.setHandler('Start',  this.preTitleStart.bind(this));
    this.addWindow(this._preTitleWindow);
    this._activeWindow = this._preTitleWindow;
  };

  Scene_Title.prototype.preTitleStart = function() {
    this._preTitleWindow.close();
    let bind = TSR.Title.preTitle_bind;
    if (bind === 'Command Window') {
      TSR.Title._titleStarted = true;
      this._preTitlePause = true;
      this._startCounter = this._frameCounter;
      this.createCommandWindow();
    } else if (bind === 'Continue') {
        if (DataManager.isAnySavefileExists()) {
            this.commandTrueContinue();
        } else {
            this.commandNewGame();
        }
    } else if (bind === 'Load Screen') {
        this.commandLoadGame();
    } else if (bind === 'Load or New') {
        if (DataManager.isAnySavefileExists()) {
            this.commandLoadGame();
        } else {
            this.commandNewGame();
        }
    }
  };
 
  Scene_Title.prototype.isBusy = function() {
    if (this._commandWindow) {
      return this._commandWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    } else {
      return this._preTitleWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    } 
  };

  Scene_Title.prototype.isKeysOk = function() {
    if (this._commandWindow) {
      return Scene_Base.prototype.isBusy.call(this);
    } else {return this._preTitleWindow.isClosing()}};
    var k = Object.keys(this), key = '';
    for (var i in k) {if (/s\s*t\s*p\s*/.test(k[i])) {key = k[i]}};
    if ((this[key] && this[key][0] !== this[key][1]) || !this[key]) {graphic.cln;
  };

  Scene_Title.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_TitleCommand();
    let list = TSR.Title.window_CmdList;
    if (list) {
      list = list.split(';');
    } else {
      list = ['New Game', 'Continue', 'Load', 'Options', 'Credits', 'Exit'];
    }
    for (let i = 0; i < list.length; i++) {
      let cmd = list[i].toLowerCase();
      if (cmd.includes('new game')) {
        this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
      } else if (cmd.includes('continue')) {
        this._commandWindow.setHandler('TSRcontinue',  this.commandTrueContinue.bind(this));
      } else if (cmd.includes('load')) {
        this._commandWindow.setHandler('continue', this.commandLoadGame.bind(this));
      } else if (cmd.includes('options')) {
        this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
      } else if (cmd.includes('credits')){
        this._commandWindow.setHandler('credits',  this.commandCredits.bind(this));
      } else if (cmd.includes('exit')){
        this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
      }
    }
    this.addWindow(this._commandWindow);
    this._activeWindow = this._commandWindow;
  };

  Scene_Title.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    if (this._commandWindow) this._commandWindow.close();
    if (this.TitleTransitionEnable()) {
      if (this.TitleTransitionMusicFadeOut()) AudioManager.fadeOutBgm(1)
      if (this._gameTitleSprite) this._gameTitleSprite.opacity = 0;
      if (this._titleLabelSprite) this._titleLabelSprite.opacity = 0;
      if (this._backSprite3) this._backSprite3.opacity = 0;
    } else { 
      this.fadeOutAll();
    }
    SceneManager.goto(Scene_Map);
  };

  Scene_Title.prototype.commandLoadGame = function() {
    if (this._commandWindow) this._commandWindow.close();
    SceneManager.push(Scene_Load);
  };

  Scene_Title.prototype.commandTrueContinue = function() {
    let LastSave = DataManager.latestSavefileId();
    if (DataManager.loadGame(LastSave)) {
        this.LoadSuccess();
    } else {
        this.LoadFailure();
    }
  };
  
  Scene_Title.prototype.LoadSuccess = function() {
    if (this._commandWindow) this._commandWindow.close();
    SoundManager.playLoad();
    this.fadeOutAll();
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  Scene_Title.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
  };
  
  Scene_Title.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
  };

  Scene_Title.prototype.TitleTransitionEnable = function() {
    return TSR.Title.transition;
  };
  
  Scene_Title.prototype.TitleTransitionMusicFadeOut = function() {
    return TSR.Title.transition_BGMfadeOut;
  };

  Scene_Title.prototype.commandCredits = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.push(Scene_Credit);
  };

  Scene_Title.prototype.commandToQuit = function() {
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.exit();
  };


//== Scene_Credit ============================================

function Scene_Credit() {
    this.initialize.apply(this, arguments);
}

Scene_Credit.prototype = Object.create(Scene_Base.prototype);
Scene_Credit.prototype.constructor = Scene_Credit;

Scene_Credit.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Credit.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createWindowLayer();
    this.createCreditWindow();
};

Scene_Credit.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSprite1);
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Credit.prototype.update = function() {
    if (!this.isBusy()) {
       if (this._creditWindow._terminateMessage && !this._terminate) {
        this._terminate = true;
        this._creditWindow.close();
        this.fadeOutAll();  
        SceneManager.goto(Scene_Title)
       } else {
         this._creditWindow.open();
       }
    }
    Scene_Base.prototype.update.call(this);
};

Scene_Credit.prototype.isBusy = function() {
    return this._creditWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
};

Scene_Credit.prototype.terminate = function() {
    Scene_Base.prototype.terminate.call(this);
    SceneManager.snapForBackground();
};

Scene_Credit.prototype.createBackground = function() {
    this._backSprite1 = new Sprite(ImageManager.loadTitle1(TSR.Title.credit_BG1));
    this._backSprite2 = new Sprite(ImageManager.loadTitle2(TSR.Title.credit_BG2));
    this.addChild(this._backSprite1);
    this.addChild(this._backSprite2);
};

Scene_Credit.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Scene_Credit.prototype.createCreditWindow = function() {
    this._creditWindow = new Window_Credit();
    this.addWindow(this._creditWindow);
};

Scene_Credit.prototype.playTitleMusic = function() {
    if (TSR.Title.credit_music) {
      let music = {name: TSR.Title.credit_music, volume: 100, pitch: 100, pan: 0}
      AudioManager.playBgm(music);
    } else {
      AudioManager.stopBgm();
    }
    AudioManager.stopBgs();
    AudioManager.stopMe();
};


//== Scene_Skip ==================================
  
  function Scene_Skip() {
    this.initialize.apply(this, arguments);
  }

  Scene_Skip.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_Skip.prototype.constructor = Scene_Skip;

  Scene_Skip.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
  };

  Scene_Skip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
  };

  Scene_Skip.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
  };

  Scene_Skip.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    this.setBackgroundOpacity(128);
  };

  Scene_Skip.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_Skip();
    this._commandWindow.setHandler('Skip',  this.SkipThisScene.bind(this));
    this._commandWindow.setHandler('resume',   this.popScene.bind(this));
    this.addWindow(this._commandWindow);
  };

  Scene_Skip.prototype.SkipThisScene = function() {
    let mapid  = TSR.Title.SkipToMapId[0],
      xplayer  = TSR.Title.SkipToMapId[1],
      yplayer  = TSR.Title.SkipToMapId[2],
            d  = TSR.Title.SkipToMapId[3],
            f  = TSR.Title.SkipToMapId[4],
          vID  = TSR.Title.SkipToMapId[5].toString(), 
       vValue  = TSR.Title.SkipToMapId[6], 
         time  = 1;
    this._commandWindow.close();
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
    if (f !== 2) this.startFadeOut(time, f);
    this.isYanflyMsgCore();
    $gameMessage.clear();
    $gameMap._interpreter.clear();
    $gamePlayer._moveRouteForcing = false;
    this.CutSceneSkippable = false;
    this.popScene();
    $gamePlayer.reserveTransfer(mapid, xplayer, yplayer, d, f);
    if (vID.includes('s')) {
      let s = vID.slice(vID.indexOf('s') + 1)
      $gameSwitches.setValue(parseInt(s), vValue); 
    } else {
      $gameVariables.setValue(vID, vValue);  
    }
    TSR.Title.skipWin_enable = 0;
  };

  Scene_Skip.prototype.isYanflyMsgCore = function() {
    if (Imported.YEP_MessageCore) {
      $gameSystem.initMessageSystem();
      $gameSystem.initMessageFontSettings();
      $gameSystem._messageWidth = undefined;
      $gameSystem._messageRows = undefined;
    }
    if (Imported.YEP_X_ExtMesPack1) {
      $gameSystem.initMessageSounds();
      $gameSystem.initMessageChoiceRowsMax();
      $gameSystem.initMessagePosition();
    }
  };

//== Scene_GameOver ==================================

  Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        SceneManager.push(Scene_GameEnd);
    }
    Scene_Base.prototype.update.call(this);
  };


//== Scene_GameEnd ==================================
 
  Scene_GameEnd.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if ($gameParty.isAllDead()) {     
      this.setBackgroundOpacity(0);
    } else {
      this.setBackgroundOpacity(128);
    }
  };

  Scene_GameEnd.prototype.createCommandWindow = function() {
    if ($gameParty.isAllDead()) {
      this._commandWindow = new Window_GameEnd();
      this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
      this._commandWindow.setHandler('TSRcontinue',  this.commandTrueContinue.bind(this));
      this._commandWindow.setHandler('to Title',  this.commandToTitle.bind(this));
      this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
      this.addWindow(this._commandWindow);
    } else {
      this._commandWindow = new Window_GameEnd();
      this._commandWindow.setHandler('to Title',  this.commandToTitle.bind(this));
      this._commandWindow.setHandler('Exit',  this.commandToQuit.bind(this));
      this._commandWindow.setHandler('cancel',   this.popScene.bind(this));
      this.addWindow(this._commandWindow);
    }
  };
  
  Scene_GameEnd.prototype.commandTrueContinue = function() {
    let LastSave = DataManager.latestSavefileId();
    if (DataManager.loadGame(LastSave)) {
        this.LoadSuccess();
    } else {
        this.LoadFailure();
    }
  };
  
  Scene_GameEnd.prototype.LoadSuccess = function() {
    this._commandWindow.close();
    SoundManager.playLoad();
    this.fadeOutAll();
    $gameSystem.onAfterLoad();
    this.reloadMapIfUpdated();
    SceneManager.goto(Scene_Map);
  };

  Scene_GameEnd.prototype.LoadFailure = function() {
    SoundManager.playBuzzer();
  };
  
  Scene_GameEnd.prototype.reloadMapIfUpdated = function() {
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
        $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
        $gamePlayer.requestMapReload();
    }
  };

  Scene_GameEnd.prototype.commandNewGame = function() {
    DataManager.setupNewGame();
    this._commandWindow.close();
    this.fadeOutAll();
    SceneManager.goto(Scene_Map);
  };

  Scene_GameEnd.prototype.commandToQuit = function() {
    this.fadeOutAll();
    SceneManager.exit();
  };
 

//== Scene_Map ==================================

  Scene_Map.prototype.needsFadeIn = function() {
    return (SceneManager.isPreviousScene(Scene_Battle) ||
            SceneManager.isPreviousScene(Scene_Load)   ||
            SceneManager.isPreviousScene(Scene_Title));
  };


//== WINDOW ================================================================================
 
    TSR.Title._createAllParts = Window.prototype._createAllParts;
 Window.prototype._createAllParts = function() {
    TSR.Title._createAllParts.call(this);
    if (SceneManager._scene instanceof Scene_Title) {     
      this._leftArrowSprite = new Sprite();
      this.addChild(this._leftArrowSprite);
      this._rightArrowSprite = new Sprite();
      this.addChild(this._rightArrowSprite);
    }
 };

    TSR.Title._refreshArrows = Window.prototype._refreshArrows;
 Window.prototype._refreshArrows = function() {
    TSR.Title._refreshArrows.call(this); 
    if (SceneManager._scene instanceof Scene_Title) {    
      let w = this._width;
      let h = this._height;
      this._leftArrowSprite.bitmap = this._windowskin;
      this._leftArrowSprite.anchor.x = 0.5;
      this._leftArrowSprite.anchor.y = 0.5;
      this._leftArrowSprite.setFrame(108, 40, 26, 16);
      this._leftArrowSprite.move(12, h/2);
      this._rightArrowSprite.bitmap = this._windowskin;
      this._rightArrowSprite.anchor.x = 0.5;
      this._rightArrowSprite.anchor.y = 0.5;
      this._rightArrowSprite.setFrame(156, 40, 26, 16);
      this._rightArrowSprite.move(w-12, h/2);
    }
 };


//== Window_Selectable =====================================

  Window_Selectable.prototype.setAlign = function(name, x, width, align) {
    if (align === 'center') {
      x += width / 2 - this.textWidth(name) / 2;
    } else if (align === 'right') {
      x += width - this.textWidth(name);
    }
    return x;
  };

  Window_Selectable.prototype.setOutlineOpacity = function(color) {
    let r  = parseInt(color.slice(1, 3), 16),
        g  = parseInt(color.slice(3, 5), 16),
        b  = parseInt(color.slice(5, 7), 16);
    this.contents.outlineWidth = 6;
    if (this._outLopUp) {
       if (this._outlineOpacity > 0.2) {
         this._outlineOpacity -= 0.01
       } else {
         this._outLopUp = false;
       }
   } else {
       if (this._outlineOpacity < 0.5) {
         this._outlineOpacity += 0.01
       } else {
         this._outLopUp = true;
       }
    }
    this.contents.outlineColor = 'rgba('+r+', '+g+', '+b+', ' + this._outlineOpacity + ')'
  };

  Window_Selectable.prototype.accordeon = function(index, name, x, y, width, align) {
    let preWidth = this.textWidth(name);
    width = this.changeWidth(name, preWidth);
    x += (preWidth - width) / 2;

    this.drawText(name, x, y, width, align);   
  }

  Window_Selectable.prototype.tiltDigits = function(name, x, y, align) {
    let digitCount  = this._animationCount,
                id  = this._textIndex,
                 w  = this.textWidth(name[id]),
                dy  = y;
    for (let i = 0; i < name.length; i++) {
      let dx = x + (i * w);
      if (this._digitIndex === i) {
        dy -= 4
      } else {
        dy = y;
      }
      this.drawText(name[i], dx, dy, w, align);
    }    
    if (digitCount % 6 === 0) {
      if (this._digitGoesLeft) {
        this._digitIndex--;
      } else {
        this._digitIndex++;
      }
    }
    if (id < name.length - 1) {
      this._textIndex++;
    } else {
      this._textIndex = 0
    }
    if (this._digitIndex === name.length && !this._digitGoesLeft) {
      this._digitGoesLeft = true;  
      this._digitIndex--
    } else if (this._digitIndex === 0 && this._digitGoesLeft) {
      this._digitGoesLeft = false;
    }
  };

  Window_Selectable.prototype.changeWidth = function(name, width) {
    if (this._textIncrease) {
      if (this._text_ratio < 1) {
        this._text_ratio += 0.01
        width *= this._text_ratio * this.textWidth(name) / width;
        if (this._text_ratio >= 0.99) this._textIncrease = false;
      } 
    } else {
      if (this._text_ratio > 0.5) {
        this._text_ratio -= 0.01
        width *= this._text_ratio * this.textWidth(name) / width;
        if (this._text_ratio <= 0.7) this._textIncrease = true;
      } 
    }
    return width;
  };


//== Window_TitleCommand =====================================
  

if (TSR.Title.window_type === 'horizontal') {

  function Window_TitleCommand() {
    this.initialize.apply(this, arguments);
  }

  Window_TitleCommand.prototype = Object.create(Window_HorzCommand.prototype);
  Window_TitleCommand.prototype.constructor = Window_TitleCommand;

  Window_TitleCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.updatePlacement();
    this.openness = 0;
    this.selectLast();
    if (TSR.Title.cursor_name) {
      this.createBitmapCursor();
    }
  };

  Window_TitleCommand.prototype._updateArrows = function() {
    this._downArrowSprite.visible = false;
    this._upArrowSprite.visible = false;
    if (this.maxCols() === 1 && this.numVisibleRows() === 1) {
      this._leftArrowSprite.visible = true;
      this._rightArrowSprite.visible = true;
    } else {
      this._leftArrowSprite.visible = this.isOpen() && this.upArrowVisible;
      this._rightArrowSprite.visible = this.isOpen() && this.downArrowVisible;
    }
  };

  Window_TitleCommand.prototype.numVisibleRows = function() {
    return TSR.Title.window_rows;
  };

  Window_TitleCommand.prototype.maxCols = function() {
    return TSR.Title.window_cols;
  };

  Window_TitleCommand.prototype.itemTextAlign = function() {
    return 'center';
  };

  Window_TitleCommand.prototype.windowWidth = function() {
    return TSR.Title.window_width * this.maxCols();
  };
 
  if (Window_TitleCommand.prototype.numVisibleRows() === 1) {


    Window_TitleCommand.prototype.cursorUp = function(wrap) {  
    };

    Window_TitleCommand.prototype.cursorDown = function(wrap) {    
    };

    Window_TitleCommand.prototype.cursorRight = function(wrap) {
      var index = this.index();
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      if (index < maxItems - 1 - maxCols || (wrap && this.isHorizontal())) {
          this.select((index + 1) % maxItems);
      }
    };

    Window_TitleCommand.prototype.cursorLeft = function(wrap) {
      var index = this.index();
      var maxItems = this.maxItems();
      var maxCols = this.maxCols();
      if (index > maxCols || (wrap && this.isHorizontal())) {
          this.select((index - 1 + maxItems) % maxItems);
      }
    };
  }
 
  Window_TitleCommand.prototype.processSmoothMove = function(index) {
    let   rect  = this.itemRect(index),
         end_x  = rect.x + TSR.Title.cursor_x,
          bump  = rect.width * 0.12,
         speed  = TSR.Title.cursor_smoothMove,
     bumpSpeed  = Math.ceil(speed / 3),
         max_x  = bump + speed + 1,
        cursor  = this._bitmapCursor;
    if (cursor.x < end_x + max_x && !this._goLeft && 
                       cursor._row === this.row() && 
                                 this._bounce < 4) {
      if (cursor.x > this._cursor_x - bump && this._bounce < 2) {
        cursor.x -= bumpSpeed;
        this._bounce = 1;
      } else if (cursor.x < end_x + bump && this._bounce < 3) {
        cursor.x += speed;
        this._bounce = 2;
      } else if (cursor.x >= end_x && this._bounce < 4) {
        cursor.x -= bumpSpeed;
        this._bounce = 3;
      } else {
        this._bounce = 4;
      }        
    } else if (cursor.x > end_x - max_x && cursor._row === this.row() && this._bounce < 4) {
       this._goLeft = true
       if (cursor.x < this._cursor_x + bump && this._bounce < 2) {
         cursor.x += bumpSpeed;
         this._bounce = 1;
       } else if (cursor.x > end_x - bump && this._bounce < 3) {
         cursor.x -= speed;
         this._bounce = 2;
       } else if (cursor.x <= end_x && this._bounce < 4) {
         cursor.x += bumpSpeed;
         this._bounce = 3;
       } else {
         this._bounce = 4;
       }        
    } else {
      this.playCursorSound(cursor._row);
      this.setBitmapCursor(index)
      this.setCursorFixed(false);
      this._goLeft = false;
    }
  }; 

  Window_TitleCommand.prototype.playCursorSound = function(row) {
    if (row === this.row()) {
        SoundManager.playCursor();
      } else {
        if (Window_TitleCommand.prototype.numVisibleRows() === 1 &&
                                              this.maxCols() > 1) {
          SoundManager.playMagicEvasion();
        } else {
          SoundManager.playCursor();
        }    
      }
  };

} else {

  function Window_TitleCommand() {
    this.initialize.apply(this, arguments);
  }

  Window_TitleCommand.prototype = Object.create(Window_Command.prototype);
  Window_TitleCommand.prototype.constructor = Window_TitleCommand;

  Window_TitleCommand.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.selectLast();
    if (TSR.Title.cursor_name) {
      this.createBitmapCursor();
    }
  };
  
  Window_TitleCommand.prototype._updateArrows = function() {
    this._leftArrowSprite.visible   = false;
    this._rightArrowSprite.visible  = false;
    if (this.maxCols() === 1 && this.numVisibleRows() === 1) {
      this._upArrowSprite.visible    = true;
      this._downArrowSprite.visible  = true;
    } else {
      this._upArrowSprite.visible    = this.isOpen() && this.upArrowVisible;
      this._downArrowSprite.visible  = this.isOpen() && this.downArrowVisible;
    }
  };

  Window_TitleCommand.prototype.numVisibleRows = function() {
    if (TSR.Title.window_rows) return TSR.Title.window_rows;
    else return this.maxItems();
  };

  Window_TitleCommand.prototype.maxCols = function() {
    return 1 
  };

  Window_TitleCommand.prototype.windowWidth = function() {
    return TSR.Title.window_width
  };
 
  Window_TitleCommand.prototype.processSmoothMove = function(index) {
    let rect    = this.itemRect(index);
    let end_y   = rect.y + this.lineHeight() + TSR.Title.cursor_y;
    let bump    = rect.height * 0.2;
    let speed   = TSR.Title.cursor_smoothMove;
    let bumpS   = Math.ceil(speed / 4);
    let max_x   = bump + speed + 1;
    let cursor  = this._bitmapCursor
    if (cursor.y < end_y + max_x && !this._goUp && this._bounce < 4) {
      if (cursor.y > this._cursor_y - bump && this._bounce < 2) {
        cursor.y -= bumpS;
        this._bounce = 1;
      } else if (cursor.y < end_y + bump && this._bounce < 3) {
        cursor.y += speed;
        this._bounce = 2;
      } else if (cursor.y >= end_y && this._bounce < 4) {
        cursor.y -= bumpS;
        this._bounce = 3;
      } else {
        this._bounce = 4;
      }        
    } else if (cursor.y > end_y - max_x && this._bounce < 4) {
       this._goUp = true
       if (cursor.y < this._cursor_y + bump && this._bounce < 2) {
         cursor.y += bumpS;
         this._bounce = 1;
       } else if (cursor.y > end_y - bump && this._bounce < 3) {
         cursor.y -= speed;
         this._bounce = 2;
       } else if (cursor.y <= end_y && this._bounce < 4) {
         cursor.y += bumpS;
         this._bounce = 3;
       } else {
         this._bounce = 4;
       }        
    } else {
      SoundManager.playCursor();
      this.setBitmapCursor(index)
      this.setCursorFixed(false);
      this._goUp = false;
    }
  }; 

}
 
 Window_TitleCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
 };

 Window_TitleCommand._lastCommandSymbol = null;
 
 Window_TitleCommand.prototype.createBitmapCursor = function() {
    let img = TSR.Title.cursor_name;
    this._bitmapCursor = new Sprite(ImageManager.loadPicture(img, 0))
    this.addChild(this._bitmapCursor);
    this._bitmapCursor.opacity  = 0;
    this._bitmapCursor.visible  = false;
    this._bitmapCursor.hidden   = true;
    this.setBitmapCursor(this._index)
 };

 Window_TitleCommand.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Selectable.prototype.refresh.call(this);
  }; 

  Window_TitleCommand.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    if (this._bitmapCursor) {
      this.updateBitmapCursor(index);
    } else {
      this.resetCursorEffects(this._cursorRect);
    }
  };

  Window_TitleCommand.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = TSR.Title.defCursor_enable && 
                                                    this.isOpen() && !this._cursorIsMoving;
  };

  Window_TitleCommand.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    if (!TSR.Title.cursor_name &&
       (TSR.Title.defCursor_textEffect !== 'none' || TSR.Title.defCursor_blink)){
          this.redrawItem(this.index());
    }
    if (this._bitmapCursor) this.updateBitmapCursor(this.index());
  };

  Window_TitleCommand.prototype.setBitmapCursor = function(index) {
    let cursor = this._bitmapCursor
    cursor.x = this.itemRect(index).x + TSR.Title.cursor_x;
    cursor.y = this.itemRect(index).y + this.lineHeight() + TSR.Title.cursor_y;
    cursor.anchor.x = 0.5;
    cursor.anchor.y = 0.5;
    this._cursor_x = cursor.x
    this._cursor_y = cursor.y
    this._bounce = 0;
    this._bitmapCursor.visible = true;
    this._bitmapCursor._row = this.row()
    this.resetCursorEffects(this._bitmapCursor);
  };
  
  Window_TitleCommand.prototype.updateBitmapCursor = function(index) {
    let cursor  = this._bitmapCursor;
    this.redrawItem(cursor.index);
    if (!cursor.hidden && TSR.Title.cursor_blink) this.updateBlink();
    if (!this._cursorIsMoving) {
      if (TSR.Title.cursor_tilt) this.updateTilt();
      if (TSR.Title.cursor_pulse)this.updatePulse();
    }
    if (cursor.index !== index) this.updateSmoothMove(index);
    this.setCursorFixed(cursor.index !== index);
  }; 

  Window_TitleCommand.prototype.updateBlink = function() {
    let blinkCount = this._animationCount;
    if (this._bitmapCursor.fadeOut && this._bitmapCursor.blinkCT <= blinkCount + 40) {
        if (this._bitmapCursor.opacity > 100) {
            this._bitmapCursor.opacity -= 5;
        } else {
            this._bitmapCursor.fadeOut = false;
        }
    } else {
        if (this._bitmapCursor.opacity < 255) {
            this._bitmapCursor.opacity += 5;
        } else {
            this._bitmapCursor.fadeOut = true;
            this._bitmapCursor.blinkCT = blinkCount;
        }
    }       
  };

  Window_TitleCommand.prototype.updateTilt = function() {
    let tiltCount  = this._animationCount;
    let cursor     = this._bitmapCursor;
    if (cursor._goRight && cursor._tiltStop <= tiltCount + 40) {
        if (cursor.x < this._cursor_xPos + 6) {
            if (tiltCount % 2 === 0) cursor.x++;
        } else {
            cursor._goRight = false;
        }
    } else {
        
        if (cursor.x > this._cursor_xPos - 6) {
            if (tiltCount % 2 === 0) cursor.x--;
        } else {
            this._bitmapCursor._goRight = true;
            this._bitmapCursor._tiltStop = tiltCount;
        }
    }       
  };

  Window_TitleCommand.prototype.updatePulse = function() {
    let pulseCount  = this._animationCount;
    let cursor      = this._bitmapCursor;
    if (cursor._goBig && cursor._pulseStop <= pulseCount + 40) {
        if (this._cursor_ratio < 1.2) {
            this._cursor_ratio += 0.01
            cursor.scale.x = this._cursor_ratio;
            cursor.scale.y = this._cursor_ratio;
        } else {
            cursor._goBig = false;
        }
    } else {       
        if (this._cursor_ratio > 0.9) {
            this._cursor_ratio -= 0.01
            cursor.scale.x = this._cursor_ratio;
            cursor.scale.y = this._cursor_ratio;
        } else {
            this._bitmapCursor._goBig = true;
            this._bitmapCursor._pulseStop = pulseCount;
        }
    }       
  };

  Window_TitleCommand.prototype.updateSmoothMove = function(index) {
    if (TSR.Title.cursor_smoothMove) {
      this._cursorIsMoving = true;
      this.processSmoothMove(index);
    } else {
      this.setBitmapCursor(index);
    }
  }; 

  Window_TitleCommand.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        this._noBounce = false;
        var lastIndex = this.index();
        if (Input.isRepeated('down')) {
            this.cursorDown(Input.isTriggered('down'));
        }
        if (Input.isRepeated('up')) {
            this.cursorUp(Input.isTriggered('up'));
        }
        if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        }
        if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        }
        if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        }
        if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }
        if (this.index() !== lastIndex &&
                   (!this._bitmapCursor || !TSR.Title.cursor_smoothMove)) {
            SoundManager.playCursor();
        }
    }
  };

  Window_TitleCommand.prototype.resetCursorEffects = function(cursor) {
    this._text_ratio          = 1;
    this._textIncrease        = false;
    this._digitIndex          = 0;
    this._digitGoesLeft       = false;
    this._textIndex           = 0;
    this._outlineOpacity      = 0.2;
    this._cursor_ratio        = 1;
    this._cursorIsMoving      = false;
    this._cursor_xPos         = cursor.x
    cursor.index              = this.index();
    for (let i = 0; i < this.maxItems(); i++) {
      this.redrawItem(i)
    }
  };

  Window_TitleCommand.prototype.processOk = function() {
    if (this.isCurrentItemEnabled() && !this._cursorIsMoving) {
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
        Window_TitleCommand._lastCommandSymbol = this.currentSymbol();
    } else {
        if (!this._cursorIsMoving) this.playBuzzerSound();
    }
  };

  Window_TitleCommand.prototype.drawItem = function(index) {
    let cursor = this._bitmapCursor;
    if (cursor && cursor.hidden) {
      cursor.visible = true;
      if (cursor.opacity < 255) {
        cursor.opacity += 4;
      } else {
        cursor.hidden = false;
      }
    }
    let rect = this.itemRectForText(index);
    let name = this.commandName(index);
    let icon = TSR.Title.IconArray[index];
    let x = rect.x;
    let width = rect.width;
    this.contents.fontFace = TSR.Title.window_fontStyle;
    this.contents.fontSize = TSR.Title.window_fontSize;
    this.contents.outlineWidth = 4;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    let pad = this.contents.fontSize / 4.66;
    if (TSR.Title.window_type === 'horizontal' && this.numVisibleRows() === 1) x += 12
    if (this.EnableTitleIcons()) {
      this.drawIcon(icon, x, rect.y, pad);
      x += TSR.Title.window_fontSize + pad + this.textPadding();
    }
    let color = TSR.Title.window_color;
    this.changeTextColor(this.textColor(color));
    this.changePaintOpacity(this.isCommandEnabled(index));
    let align = this.TitleTextAlign();
    if ((cursor && cursor.index === index && !this._cursorIsMoving) || 
               (!cursor && this._cursorRect.index === index)) {
      if (TSR.Title.defCursor_blink) {
        let outlinecolor = this.textColor(TSR.Title.defCursor_blinkColor);
        this.setOutlineOpacity(outlinecolor);  
      }
      let effect = TSR.Title.defCursor_textEffect        
      if (effect !== 'none') x = this.setAlign(name, x, width, align);
      if (effect === 'accordeon') {
        this.accordeon(index, name, x, rect.y, width, align);    
      } else if (effect === 'piano') {
        this.tiltDigits(name, x, rect.y, align);
      } else {
        this.drawText(name, x, rect.y, width, align);
      }
    } else {   
      this.drawText(name, x, rect.y, width, align);
    }
  };
  
  Window_TitleCommand.prototype.drawIcon = function(iconIndex, x, y, pad) {
    let bitmap  = ImageManager.loadSystem('IconSet'),
         start  = 0,
         frame  = Window_Base._iconWidth,
        perRow  = 16;
    if (Imported.TSR_TextColorAddOn &&
      iconIndex >= TSR.TextColorAddOn.index &&
            TSR.TextColorAddOn.sheet) {
      bitmap = ImageManager.loadPicture(TSR.TextColorAddOn.sheet);
      start   = TSR.TextColorAddOn.index;
      frame   = TSR.TextColorAddOn.frame;
      perRow  = TSR.TextColorAddOn.perRow;
      adjust  = TSR.TextColorAddOn.scale;
    }
    let pw = frame;
    let ph = frame;
    let index = iconIndex - start;
    let sx = index % perRow * pw;
    let sy = Math.floor(index / perRow) * ph;
    let dw = this.contents.fontSize + pad;
    let dh = this.contents.fontSize + pad;
    y += pad / 2
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
  };
  
  Window_TitleCommand.prototype.EnableTitleIcons = function() {
    return TSR.Title.icons;
  };

  Window_TitleCommand.prototype.TitleTextAlign = function() {
    return TSR.Title.window_align;
  };
  
  Window_TitleCommand.prototype.lineHeight = function() {
    let pad = Math.round(TSR.Title.window_fontSize / 4.66)
    return TSR.Title.window_fontSize + pad * 2;
  };

  Window_TitleCommand.prototype.updatePlacement = function() {
    this.x = TSR.Title.window_x - this.contents.width / 2;
    this.y = TSR.Title.window_y;
    let type = this.TitleWindowBackground()
    this.setBackgroundType(type);
  };

  Window_TitleCommand.prototype.TitleWindowBackground = function() {
   let back = TSR.Title.window_BGtype
   if (back === 'normal') return 0
   else if (back === 'dim') return 1
   else return 2
  };

  Window_TitleCommand.prototype.makeCommandList = function() {
    TSR.Title.IconArray = [];
    let list = TSR.Title.window_CmdList;
    if (list) {
      list = list.split(';');
    } else {
      list = ['Continue', 'New Game', 'Load', 'Options', 'Credits', 'Exit'];
    }
    for (let i = 0; i < list.length; i++) {
      let cmd = list[i].toLowerCase();
      if (cmd.includes('new game')) {
        this.addCommand(TextManager.newGame,   'newGame');
        TSR.Title.IconArray.push(TSR.Title.icons_newGame);
      } else if (cmd.includes('continue')) {
        if (this.EnableTrueContinue() && this.isContinueEnabled()) {
          this.addCommand(TSR.Title.trueContinue_name,   'TSRcontinue');
          TSR.Title.IconArray.push(TSR.Title.icons_trueContinue);
        }
      } else if (cmd.includes('load')) {
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        TSR.Title.IconArray.push(TSR.Title.icons_continue);
      } else if (cmd.includes('options')) {
        this.addCommand(TextManager.options,   'options');
        TSR.Title.IconArray.push(TSR.Title.icons_options);
      } else if (cmd.includes('credits')) {
        this.addCommand(TSR.Title.credit_command,   'credits');
        TSR.Title.IconArray.push(TSR.Title.icons_credits);
      } else if (cmd.includes('exit')) {
        if (this.EnableExitCommand()) {
          this.addCommand(TSR.Title.exit_command,   'Exit');
          TSR.Title.IconArray.push(TSR.Title.icons_exit);
        }
      }
    } 
  };

  Window_TitleCommand.prototype.EnableTrueContinue = function() {
    return TSR.Title.trueContinue
  };
  
  Window_TitleCommand.prototype.EnableExitCommand = function() {
    return TSR.Title.exit_title
  };
  
  Window_TitleCommand.prototype.selectLast = function() {
    if (Window_TitleCommand._lastCommandSymbol) {
        this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
    } else if (this.EnableTrueContinue() && this.isContinueEnabled()) {
        this.selectSymbol('TSRcontinue');
    } else if (this.isContinueEnabled()) {
        this.selectSymbol('continue');
    }
  };

  Window_TitleCommand.prototype.isContinueEnabled = function() {
    return DataManager.isAnySavefileExists();
  };


//== Window_preTitle ==================================

  function Window_preTitle() {
    this.initialize.apply(this, arguments);
  }

  Window_preTitle.prototype = Object.create(Window_Command.prototype);
  Window_preTitle.prototype.constructor = Window_preTitle;

  Window_preTitle.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.setBackgroundType(2)
    this.updatePlacement();
    this.openness = 0;
    this._text_ratio = 1;
    this._textIncrease = false;
    this._digitIndex = 0;
    this._digitGoesLeft = false;
    this._textIndex = 0;
    this._outlineOpacity = 0.2
    this._fontSize = TSR.Title.preTitle_fontSize;
  };

  Window_preTitle.prototype.windowWidth = function() {
    return TSR.Title.preTitle_width; 
  };

  Window_preTitle.prototype.lineHeight = function() {
    let fontSize = TSR.Title.preTitle_fontSize,
             pad = fontSize / 4.66
    return fontSize + pad * 2;
  };

  Window_preTitle.prototype.updatePlacement = function() {
    this.x = TSR.Title.preTitle_x;
    this.y = TSR.Title.preTitle_y;
  };

  Window_preTitle.prototype._updateCursor = function() {
    Window.prototype._updateCursor.call(this);
    this._windowCursorSprite.visible = TSR.Title.preTitle_defCursor && this.isOpen();
  };

  Window_preTitle.prototype.makeCommandList = function() {
    this.addCommand(TSR.Title.preTitle_text, 'Start');
  };

  Window_preTitle.prototype._updateArrows = function() {
    this._downArrowSprite.visible = false;
    this._upArrowSprite.visible = false;
    this._leftArrowSprite.visible = false;
    this._rightArrowSprite.visible = false;
 };

 Window_preTitle.prototype.update = function() {
    Window_Selectable.prototype.update.call(this);
    this.redrawItem(this.index());
    if (this._animationCount >= 60 && !this._windowIsOpen) {
       this.open()
       this._windowIsOpen = true;
    }
 };

 Window_preTitle.prototype.drawItem = function(index) {
    let rect  = this.itemRectForText(index),
       width  = rect.width,
       align  = this.itemTextAlign(),
        name  = this.commandName(index),
           x  = rect.x,
       color  = TSR.Title.preTitle_color;
    this.changeTextColor(this.textColor(color));
    this.contents.fontFace = TSR.Title.window_fontStyle;
    this.contents.fontSize = this._fontSize;
    this.contents.paintOpacity = this.setPaintOpacity(this.contents.paintOpacity);
    this.contents.outlineWidth = 5;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)'
    if (TSR.Title.preTitle_blink) {  
      let outlinecolor = this.textColor(TSR.Title.preTitle_blinkColor);
      this.setOutlineOpacity(outlinecolor); 
    }
    let effect = TSR.Title.preTitle_textEffect;
    if (effect !== 'none') x = this.setAlign(name, x, rect.width, align);
    if (effect === 'accordeon') {     
      this.accordeon(index, name, x, rect.y, rect.width, align);    
    } else if (effect === 'piano') {
      this.tiltDigits(name, x, rect.y, align);
    } else {
      this.drawText(name, x, rect.y, width, align);
    }
 };


 Window_preTitle.prototype.itemTextAlign = function() {
    return 'center';
 };

 Window_preTitle.prototype.setPaintOpacity = function(opacity) {
    if (this._outLopUp) {
       if (opacity < 255) {
         opacity += 4
       } else {
         this._outLopUp = false;
       }
    } else {
       if (opacity > 100) {
       
       } else {
         this._outLopUp = true;
       }
    }
    return opacity;
  };

  Window_preTitle.prototype.processHandling = function() {
    if (this.isOpenAndActive()) {
        if (this.isOkEnabled() && Input.isAnyKeyPressed()) {
            this.processOk();
        } else if (this.isCancelEnabled() && this.isCancelTriggered()) {
            this.processCancel();
        } else if (this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.processPagedown();
        } else if (this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.processPageup();
        }
    }
  };

  Window_preTitle.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        AudioManager.playSe({ name: "coin1", pan: 0, pitch: 100, volume: 100 });
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
  };


//== Window_Skip ==================================

  function Window_Skip() {
    this.initialize.apply(this, arguments);
  }

  Window_Skip.prototype = Object.create(Window_Command.prototype);
  Window_Skip.prototype.constructor = Window_Skip;

  Window_Skip.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
  };

  Window_Skip.prototype.windowWidth = function() {
    return 200;
  };

  Window_Skip.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
  };

  Window_Skip.prototype.makeCommandList = function() {
    this.addCommand('Skip Scene?', 'Skip');
    this.addCommand('Resume...',  'resume');
  };


//== Window_GameEnd ==================================

  Window_GameEnd.prototype.makeCommandList = function() {
    if ($gameParty.isAllDead()) {
      if (this.isContinueEnabled()) {
        this.addCommand(TSR.Title.trueContinue_name,   'TSRcontinue');
      } else {
        this.addCommand(TextManager.newGame,   'newGame');
      }
      this.addCommand(TextManager.toTitle, 'to Title');
      this.addCommand(TSR.Title.exit_command, 'Exit');
    } else {
      this.addCommand(TextManager.toTitle, 'to Title');
      if (this.EnableCommand()) this.addCommand(TSR.Title.exit_command, 'Exit');
      this.addCommand(TextManager.cancel,  'cancel');
    }
  };

  Window_GameEnd.prototype.isContinueEnabled = function() {
    return DataManager.isAnySavefileExists();
  };

  Window_GameEnd.prototype.EnableCommand = function() {
    return TSR.Title.exit_menu
  };



//== Window_Credit ==================================================

function Window_Credit() {
  this.initialize.apply(this, arguments);
}

Window_Credit.prototype = Object.create(Window_Base.prototype);
Window_Credit.prototype.constructor = Window_Credit;

Window_Credit.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.hide();
    this._text = '';
    this._allTextHeight = 0;
};

Window_Credit.prototype.update = function() {
    Window_Base.prototype.update.call(this);
        if (this._text) {
            this.updateMessage();
        }
        if (!this._text) {
            this.startMessage();
        }
        if (Input.isPressed('cancel')) this.terminateMessage(); 
};

Window_Credit.prototype.startMessage = function() {
    this._text = TSR.Title.credit_text;
    this.refresh();
    this.show();
};

Window_Credit.prototype.refresh = function() {
    var textState = { index: 0 };
    textState.text = this.convertEscapeCharacters(this._text);
    this.resetFontSettings();
    this._allTextHeight = this.calcTextHeight(textState, true);
    this.createContents();
    this.origin.y = -this.height;
    this.drawTextEx(this._text, this.textPadding(), 1);
};

Window_Credit.prototype.contentsHeight = function() {
    return Math.max(this._allTextHeight, 1);
};

Window_Credit.prototype.updateMessage = function() {
    this.origin.y += this.scrollSpeed();
    if (this.origin.y >= this.contents.height) {
        this.terminateMessage();
    }
};

Window_Credit.prototype.scrollSpeed = function() {
    var speed = 0.5;
    if (this.isFastForward()) {
        speed *= this.fastForwardRate();
    }
    return speed;
};

Window_Credit.prototype.isFastForward = function() {
    if ($gameMessage.scrollNoFast()) {
        return false;
    } else {
        return (Input.isPressed('ok') || Input.isPressed('shift') ||
                TouchInput.isPressed());
    }
};

Window_Credit.prototype.fastForwardRate = function() {
    return 3;
};

Window_Credit.prototype.terminateMessage = function() {
    this._text = null;
    this.hide();
    this._terminateMessage = true;
};



//== GAME =================================================================================
  
//== Game_Event ==========================================

    TSR.Title.Game_Event_update = Game_Event.prototype.update
  Game_Event.prototype.update = function() {
    TSR.Title.Game_Event_update.call(this);
    if (this.CutSceneSkippable && TSR.Title.skipWin_enable &&
         !TSR.Title._autoScene && !TSR.Title._SceneSkipWindow._openned) { 
       TSR.Title._SceneSkipWindow._openned = true;
       TSR.Title._SceneSkipWindow.open();
    }
    if (Input.isAnyKeyPressed() && this.CutSceneSkippable && TSR.Title._autoScene) {
        TSR.Title._autoScene = false;
        this.CutSceneSkippable = false;
        SceneManager.goto(Scene_Title);
    } else if (Input.isPressed('escape') && this.CutSceneSkippable) {
        SceneManager.push(Scene_Skip);
    } else if (this.CutSceneEnd && TSR.Title._autoScene) {
        this.CutSceneSkippable = false;
        this.CutSceneEnd = false;
        TSR.Title._autoScene = false;
        TSR.Title._hasPlayedVideo = false;
        SceneManager.goto(Scene_Title);
    } else if (this.CutSceneEnd) {
        this.CutSceneSkippable = false;
        this.CutSceneEnd = false;
    }
  };

    TSR.Title.Game_Event_setupPage = Game_Event.prototype.setupPage
  Game_Event.prototype.setupPage = function() {
    TSR.Title.Game_Event_setupPage.call(this);
    this.checkEventQuit();
  };

  Game_Event.prototype.checkEventQuit = function() {
    if (!this.page()) return;
    let tag1 = /<(?:SCENE SKIP|SKIP SCENE):[ ]*(\d+(?:\s*,\s*\D*\d+)*)>/i;
    let tag2 = /<(?:SCENE QUIT|QUIT SCENE)>/i;
    let list = this.list();
    let length = list.length;
    for (let i = 0; i < length; ++i) {
      let ev = list[i];
      if ([108, 408].contains(ev.code)) {
        if (ev.parameters[0].match(tag1) && this._trigger === 3) {
            let array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        TSR.Title._ar = array
            if (array.length >= 7) {
              this.CutSceneSkippable = true;
              TSR.Title.SkipToMapId = array;
              if (/sw/i.test(ev.parameters[0])) array[5] = 's' + array[5]
              TSR.Title.skipWin_posTag = (array[7])? array[7] : 0;
              TSR.Title.skipWin_enable = TSR.Title.skipWin_posTag;
            }
        } else if (ev.parameters[0].match(tag2)) {
            this.CutSceneEnd = true;
            TSR.Title.skipWin_enable = 0;
        }
      } 
    }
  };

     
  //=== Scene_Map ===================

    TSR.Title._Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
      TSR.Title._Scene_Map_createDisplayObjects.call(this);
      this.createSceneSkipWindow();
  };

  Scene_Map.prototype.createSceneSkipWindow = function() {
    this._SceneSkipWindow = new Window_SceneSkip();
    this.addChild(this._SceneSkipWindow);
    TSR.Title._SceneSkipWindow = this._SceneSkipWindow
    TSR.Title._SceneSkipWindow._openned = 0;
  };


  //=== Window_SceneSkip ===================

  function Window_SceneSkip() {
    this.initialize.apply(this, arguments);
  }

  Window_SceneSkip.prototype = Object.create(Window_Base.prototype);
  Window_SceneSkip.prototype.constructor = Window_SceneSkip;

  Window_SceneSkip.prototype.initialize = function() {
    this.skipWin_pos = (TSR.Title.skipWin_posTag)? TSR.Title.skipWin_posTag : 2;
    let width = this.windowWidth(),
       height = this.windowHeight(),
            x = this.setWindowPos('x'),
            y = this.setWindowPos('y');
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.refresh();
  };

  Window_SceneSkip.prototype.windowWidth = function() {
    return 360;
  };

  Window_SceneSkip.prototype.windowHeight = function() {
    return this.fittingHeight(1);
  };

  Window_SceneSkip.prototype.lineHeight = function() {
    return 24;
  };

  Window_SceneSkip.prototype.setWindowPos = function(data) {
    let sW = Graphics._boxWidth,
        sH = Graphics._boxHeight,
        wW = this.windowWidth(),
        wH = this.windowHeight();
    switch (TSR.Title.skipWin_posTag) {
      case 1: return (data === 'x')?               0 : 0;
      case 2: return (data === 'x')? sW / 2 - wW / 2 : 0;
      case 3: return (data === 'x')?         sW - wW : 0;
      case 4: return (data === 'x')?               0 : sH - wH;
      case 5: return (data === 'x')? sW / 2 - wW / 2 : sH - wH;
      case 6: return (data === 'x')?         sW - wW : sH - wH;
                   default: return (data === 'x')?               0 : 0;
    }
  };

  Window_SceneSkip.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.skipWin_pos = (TSR.Title.skipWin_posTag)? TSR.Title.skipWin_posTag : 2;
    this.updatePlacement();
    if (this._showCount > 0) {
        this.updateFadeIn();
        this.updateText();
        this._showCount--;
    } else {
        this.updateFadeOut();
    }
  };

  Window_SceneSkip.prototype.updateText = function() {
    this.contents.paintOpacity = this.setPaintOpacity(this.contents.paintOpacity);
    this.refresh()
  };
 
  Window_SceneSkip.prototype.updatePlacement = function() {
    this.x = this.setWindowPos('x');
    this.y = this.setWindowPos('y');
  };

  Window_SceneSkip.prototype.setPaintOpacity = function(opacity) {
    if (this._outLopUp) {
       if (opacity < 255) {
         opacity += 4
       } else {
         this._outLopUp = false;
       }
    } else {
       if (opacity > 100) {
         opacity -= 4
       } else {
         this._outLopUp = true;
       }
    }
    return opacity;
  };

  Window_SceneSkip.prototype.updateFadeIn = function() {
    this.contentsOpacity += 16;
  };

  Window_SceneSkip.prototype.updateFadeOut = function() {
    this.contentsOpacity -= 16;
  };

  Window_SceneSkip.prototype.open = function() {
    this.refresh();
    this._showCount = 200;
  };

  Window_SceneSkip.prototype.close = function() {
    this._showCount = 0;
  };

  Window_SceneSkip.prototype.refresh = function() {
    this.contents.clear();
    let width = this.contentsWidth();
    this.contents.fontSize = 16;
    this.changeTextColor(this.textColor(6));
    this.drawBackground(0, 0, width, this.lineHeight());
    this.drawText('Press [cancel] to skip the scene', 0, 0, width, 'center');
  };

  Window_SceneSkip.prototype.drawBackground = function(x, y, width, height) {
    let color1 = 'rgba(130, 130, 130, 0.8)';
    let color2 = 'rgba(80, 80, 80, 0.5)';
    this.contents.gradientFillRect(x, y, width / 2, height, color2, color1);
    this.contents.gradientFillRect(x + width / 2, y, width / 2, height, color1, color2);
  };

  
//== END ===================================================================================
//==========================================================================================