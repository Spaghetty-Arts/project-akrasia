(function () {

    function setup() {


        //Filesystem
        MVNodeFS.fs = require("fs");

        function MVNodeFS() {

        }

        //Wrapper for Node.js writeFileSync
        MVNodeFS.writeFile = function (filePath, filename, data) {
            let dataS = JSON.stringify(data);
            console.log("nice");
            filePath = this.createPath("/" + filePath +"/");
            let correctPath = "." + filePath;
            this.fs.writeFileSync(correctPath + filename, dataS);
            console.log("Wrote File: " + filename);
        };

        //Wrapper for Node.js readFileSync
        MVNodeFS.readFile = function (filePath, filename) {
            console.log("nice");
            filePath = this.createPath("/" + filePath +"/");
            console.log("Read File:", filename);
            let correctPath = "." + filePath;
            let url = correctPath + filename;
            //Returning the file we read using utf8 encoding; this means it will be in text
            return this.fs.readFileSync(url, "utf8");
        };

        //Method for creating the proper file path from the relative file path
        MVNodeFS.createPath = function (relativePath) {
            console.log("nice");
            //Checks if MV is in dev mode, or production, then decides the appropriate path
            relativePath = (Utils.isNwjs() && Utils.isOptionValid("test")) ? relativePath : "/www/" + relativePath;
            //Creates the path using the location pathname of the window and replacing certain characters
            var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, relativePath);
            if(path.match(/^\/([A-Z]\:)/)) {
                path = path.slice(1);
            }
            //Decode URI component and finally return the path
            path = decodeURIComponent(path);
            console.log(path);
            return path;
        };

        MVNodeFS.fileExists = function (url) {
            if (this.fs.existsSync(url)) {
                return true;
            } else {
                return false;
            }
        };

        //Export Our Class so it can be used anywhere
        window.MVNodeFS = MVNodeFS;
    }

    //Execute setup function to run our code after setup
    setup();

    // The file exists, do stuff.} else {  // The file does not exist, do other stuff.}
    let confExists = MVNodeFS.fileExists("./data/keyboardKeys.json");
    if (confExists) {
        console.log("Already exists");
        let confKeys = JSON.parse(MVNodeFS.readFile("data", "keyboardKeys.json"));
        keyboardKeys = confKeys;
        if (confKeys[0][1] == 87) {
            typeKb = 1;
        }
    } else {
        console.log("Creating");
        let confKeys = [
            ['up', 38], ['down', 40], ['left', 37], ['right', 39],
            ['shift', 16], ['shoot', 83], ['reload', 82], ['ok', 32],
            ['arm1', 49], ['arm2', 50], ['arm3', 51], ['arm4', 52],
            ['holster', 72], ['escape', 27]
        ];
        MVNodeFS.writeFile("data", "keyboardKeys.json", confKeys);
        keyboardKeys = confKeys;
    }

    //configure keyboard inputs
    setKeyBindings = function () {
        Input.keyMapper = [];
        for (let i = 0; i < keyboardKeys.length; i++) {
            let strPo = ""+keyboardKeys[i][0];
            Input.keyMapper[keyboardKeys[i][1]] = strPo;
        }
    }

    setKeyBindings();

})();