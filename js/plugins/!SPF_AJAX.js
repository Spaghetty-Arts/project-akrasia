//=============================================================================
// Ajax.js
//=============================================================================/*:
/* @plugindesc A simple AJAX interface.
* @author Amy Pond @ www.HBGames.org. Created for Afar - the MMORPG
*
* @param URL
* @desc The URL to your actions php file.
* @default N/A
*
* @help To use this plugin you need a web server that can run PHP.
* On this server, host a PHP file.
* This file should check for GET variables, clean them (IMPORTANT),
* and return back a message using echo(). The function is called
* by ajaxRequest(parameters) where parameters takes the form:
*
* var1=data&var2=data&var3=data
*
* For example, I may wish to request the result of the equation 2+3.
* In game I call the function: ajaxRequest("action=add&number1=2&number2=3");
*
* Server side, using $_GET and cleaning it to an integer for security,
* I take these variables, add them together, and return the result:
*
* <?php *   //action.php
*   switch($_GET['action'])
*   {
*     case 'add': *       number1 = (int)$_GET['number1'];
*       number2 = (int)$_GET['number2'];
*       result = number1 + number2;
*       echo result;
*       break;
*     case 'login':
*       // code goes here
*       break; *   } * ?>
*
*/

ajaxRequest = function(args) {
    var retrievedData = "";
    var parameters = PluginManager.parameters('Ajax');
    var get_params = args;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            retrievedData = xhttp.responseText;
        }
    }

    if(get_params !== ""){
        xhttp.open("GET", parameters['URL'] + "?" + get_params, false);
    } else{
        xhttp.open("GET", parameters['URL'], false);
    }
    xhttp.send();

    return retrievedData;
};