(function() {

    let customFonts = ['cyber.ttf', 'nokia.ttf'];
    var alias = SceneManager.initialize;
   SceneManager.initialize = function() {
        alias.call(this);
        for(let i = 0; i < customFonts.length; i++)
        {
            let font = 'fonts/'+customFonts[i];
            console.log(font);
            Graphics.loadFont(/([^\/]+)\..*$/.exec(font)[1], font);
        }
    };

})();