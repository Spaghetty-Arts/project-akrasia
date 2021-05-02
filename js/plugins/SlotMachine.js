(function () {

var variableId = 26;

var scale = 10;
var expectation = 0.5;

//odds
//You can set the odds.
var odds = [];
odds.push([]);
odds[0].push(1); //000
odds[0].push(2); //111
odds[0].push(5); //222
odds[0].push(10); //333
odds[0].push(20); //444
odds[0].push(100); //555
odds.push([]);
odds[1].push(2); //0000
odds[1].push(10); //1111
odds[1].push(20); //2222
odds[1].push(100); //3333
odds[1].push(200); //4444
odds[1].push(1000); //5555
odds.push([]);
odds[2].push(20); //00000
odds[2].push(100); //11111
odds[2].push(200); //22222
odds[2].push(1000); //33333
odds[2].push(2000); //44444
odds[2].push(10000); //55555

//make reel
//You can rearrange the order of the reel.
//The number can not be changed.
var reel = [];
reel.push([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);
reel.push([5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0]);
reel.push([0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 0, 1, 2, 3, 4, 5]);
reel.push([0, 2, 4, 1, 3, 5, 0, 2, 4, 1, 3, 5, 0, 2, 4, 1, 3, 5]);
reel.push([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);

function getCoin() {
    return $gameVariables.value(variableId);
}

function setCoin(value) {
    return $gameVariables.setValue(variableId, value);
}


startSlot = function () {
    SceneManager.push(Scene_SlotMachine);
}

//-----------------------------------------------------------------------------
// SLTReelSprite
//
// Slot Machine Reel Sprite

function SLTReelSprite() {
    this.initialize.apply(this, arguments);
}

SLTReelSprite.prototype = Object.create(Sprite.prototype);
SLTReelSprite.prototype.constructor = SLTReelSprite;

SLTReelSprite.STOP = 0;
SLTReelSprite.SPINNING = 1;
SLTReelSprite.SPIN = 2;
SLTReelSprite.STOPPING = 3;
SLTReelSprite.FRAME_SPINNING = 40;
SLTReelSprite.FRAME_SPIN = 60;
SLTReelSprite.FRAME_STOPPING = 40;

SLTReelSprite.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
    this._numSpot = 18;
    this._spotHeight = 54;
    this._winSpot = 0;
    this._scrollY = 0;
    this._speedHigh = 30;
    this._speedLow = 4;
    this._status = 0;
    this._spinFrame = 0;
    this._spinEndFrame = SLTReelSprite.FRAME_SPIN;
};

Object.defineProperty(SLTReelSprite.prototype, 'status', {
    get: function () {
        return this._status;
    },
    configurable: true
});

SLTReelSprite.prototype.update = function () {
    Sprite.prototype.update.call(this);

    switch (this._status) {

        case SLTReelSprite.STOP:
            break;

        case SLTReelSprite.SPINNING:
            if (this._spinFrame > SLTReelSprite.FRAME_SPINNING) {
                this._status = SLTReelSprite.SPIN;
                break;
            }
            this._scrollY = (this._scrollY + this._speedLow) % (this._numSpot * this._spotHeight);
            this.setFrame(
                0,
                this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                116,
                this._spotHeight * 3
            );
            this._spinFrame++;
            break;

        case SLTReelSprite.SPIN:
            if (this._spinFrame > this._spinEndFrame + SLTReelSprite.FRAME_SPINNING) {
                this._status = SLTReelSprite.STOPPING;
                this._scrollY = this._winSpot * this._spotHeight - this._spotHeight * 3;
                break;
            }
            this._scrollY = (this._scrollY + this._speedHigh) % (this._numSpot * this._spotHeight);
            this.setFrame(
                0,
                this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                116,
                this._spotHeight * 3
            );
            this._spinFrame++;
            break;

        case SLTReelSprite.STOPPING:
            this._scrollY = (this._scrollY + this._speedLow) % (this._numSpot * this._spotHeight);
            if (this._scrollY > this._winSpot * this._spotHeight) {
                this._scrollY = this._winSpot * this._spotHeight;
                this._status = SLTReelSprite.STOP;
                AudioManager.playSe({"name": "Switch2", "volume": 90, "pitch": 100, "pan": 0});
            }
            this.setFrame(
                0,
                this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                116,
                this._spotHeight * 3
            );
            break;
    }
};

SLTReelSprite.prototype.setSpot = function (spot) {
    if (0 <= spot && spot < this._numSpot) {
        this._scrollY = this._spotHeight * spot;
        this.setFrame(
            0,
            this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
            116,
            this._spotHeight * 3
        );
    }
};

SLTReelSprite.prototype.setWinSpot = function (spot) {
    this._winSpot = spot;
};

SLTReelSprite.prototype.setSpinEndFrame = function (frame) {
    this._spinEndFrame = frame;
};

SLTReelSprite.prototype.spin = function () {
    if (this._status === SLTReelSprite.STOP) {
        this._status = SLTReelSprite.SPINNING;
        this._spinFrame = 0;
    }
};


// This Sprite is draw foreground in machine.
// Done

function ForegroundSprite() {
    this.initialize.apply(this, arguments);
}

ForegroundSprite.prototype = Object.create(Sprite.prototype);
ForegroundSprite.prototype.constructor = ForegroundSprite;

ForegroundSprite.prototype.initialize = function (bitmap) {
    Sprite.prototype.initialize.call(this, bitmap);
};




/**
 * @method drawImage
 * @param bitmap    source bitmap
 * @param sx        source x
 * @param sy        source y
 * @param sw        source width
 * @param sh        source height
 * @param dx        destination x
 * @param dy        destination y
 */
Bitmap.prototype.drawImage = function(bitmap, sx, sy, sw, sh, dx, dy) {
    this._context.drawImage(bitmap.canvas, sx, sy, sw, sh, dx, dy, sw, sh);
    this._setDirty();
};

//-----------------------------------------------------------------------------
// Scene_SlotMachine
//
// Will play the slot machine.

function Scene_SlotMachine() {
    this.initialize.apply(this, arguments);
}

Scene_SlotMachine.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SlotMachine.prototype.constructor = Scene_SlotMachine;

Scene_SlotMachine.COIN_MAX_VALUE = 99999999;
Scene_SlotMachine.ODDS_MAX_VALUE = 100000;

Scene_SlotMachine.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);

    this._bet = 0;
    this._coin = getCoin();
    this._winSpot = null;
    this._spinStart = false;
    this._rollCount = 0;
    this._winCoin = 0;
    this._correctCoin = 0;
    this._winStep = 0;
    this._winMessage = "";

    //Winning percentage is calculated by the odds
    this._probability = [];
    this._probability.push([]);
    this._probability[0].push(0.70); //00
    this._probability[0].push(0.63); //11
    this._probability[0].push(0.54); //22
    this._probability[0].push(0.44); //33
    this._probability[0].push(0.38); //44
    this._probability[0].push(0.31); //55

    this._probability.push([]);
    this._probability[1].push((1 / this._probability[0][0]) *
        expectation * (1 / odds[0][0])); //000
    this._probability[1].push((1 / this._probability[0][1]) *
        expectation * (1 / odds[0][1])); //111
    this._probability[1].push((1 / this._probability[0][2]) *
        expectation * (1 / odds[0][2])); //222
    this._probability[1].push((1 / this._probability[0][3]) *
        expectation * (1 / odds[0][3])); //333
    this._probability[1].push((1 / this._probability[0][4]) *
        expectation * (1 / odds[0][4])); //444
    this._probability[1].push((1 / this._probability[0][5]) *
        expectation * (1 / odds[0][5])); //555

    this._probability.push([]);
    this._probability[2].push((1 / (this._probability[0][0] * this._probability[1][0])) *
        expectation * (1 / odds[1][0])); //0000
    this._probability[2].push((1 / (this._probability[0][1] * this._probability[1][1])) *
        expectation * (1 / odds[1][1])); //1111
    this._probability[2].push((1 / (this._probability[0][2] * this._probability[1][2])) *
        expectation * (1 / odds[1][2])); //2222
    this._probability[2].push((1 / (this._probability[0][3] * this._probability[1][3])) *
        expectation * (1 / odds[1][3])); //3333
    this._probability[2].push((1 / (this._probability[0][4] * this._probability[1][4])) *
        expectation * (1 / odds[1][4])); //4444
    this._probability[2].push((1 / (this._probability[0][5] * this._probability[1][5])) *
        expectation * (1 / odds[1][5])); //5555

    this._probability.push([]);
    this._probability[3].push((1 / (this._probability[0][0] * this._probability[1][0] * this._probability[2][0])) *
        expectation * (1 / odds[2][0])); //00000
    this._probability[3].push((1 / (this._probability[0][1] * this._probability[1][1] * this._probability[2][1])) *
        expectation * (1 / odds[2][1])); //11111
    this._probability[3].push((1 / (this._probability[0][2] * this._probability[1][2] * this._probability[2][2])) *
        expectation * (1 / odds[2][2])); //22222
    this._probability[3].push((1 / (this._probability[0][3] * this._probability[1][3] * this._probability[2][3])) *
        expectation * (1 / odds[2][3])); //33333
    this._probability[3].push((1 / (this._probability[0][4] * this._probability[1][4] * this._probability[2][4])) *
        expectation * (1 / odds[2][4])); //44444
    this._probability[3].push((1 / (this._probability[0][5] * this._probability[1][5] * this._probability[2][5])) *
        expectation * (1 / odds[2][5])); //55555


    if (this._coin > Scene_SlotMachine.COIN_MAX_VALUE) {
        this._coin = Scene_SlotMachine.COIN_MAX_VALUE;
    }

};

//Creation of slot scene
Scene_SlotMachine.prototype.create = function () {
    AudioManager.playBgm({"name": "slotbgm", "volume": 100, "pitch": 100, "pan": 0});
    this.createBackground();
    this._backgroundSprite.bitmap = ImageManager.loadBitmap("img/slotmachine/", "bg");
    this.createReels();
    this.createbgRow();
    this.updateActor();
    this.createWindowLayer();

    this.createInstruction();
    this.createSlotMachine();
    this.createSlotCommand();
    this.createReplayCommand();
    this.refreshStatus();
    if (this._coin < scale) {
        this._slotCommandWindow.disableBet();
    }
};

Scene_SlotMachine.prototype.start = function() {
    this.makeReel();
    this._instructionWindow.messageDraw("Joga e Ganha!");
    this._instructionWindow.drawResult();
    this._slotMachineWindow.refresh();
};


//draw every symbol individually done
Scene_SlotMachine.prototype.makeReel = function() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 18; j++) {
            for (let k = 0; k < 3; k++) {
                this._reels[i].bitmap.drawImage(this._reelBitmap, reel[i][j] * 116 , 0, 116, 54, 0, (54 * 18 * 3) - j * 54 - k * (18 * 54) - 50);
            }
        }

        this._reels[i].setSpot(Math.random() * 18 >> 0);
    }
};

Scene_SlotMachine.prototype.isSpinning = function() {
    var returnValue = false;
    for (var i = 0; i < 5; i++) {
        returnValue = returnValue || this._reels[i].status !== SLTReelSprite.STOP;
    }
    return returnValue;
};

Scene_SlotMachine.prototype.isWinCounting = function() {
    return this._winCoin > 0;
};

Scene_SlotMachine.prototype.createInstruction = function () {
    this._instructionWindow = new Window_SlotInstruction(0, 0, Graphics.boxWidth, 26 * 6 + 18 * 2);
    this.addWindow(this._instructionWindow);
};

Scene_SlotMachine.prototype.createSlotMachine = function () {
    this._slotMachineWindow = new Window_SlotMachine(0, this._instructionWindow.height, Graphics.boxWidth, 200);
    this._slotMachineWindow.coin = this._coin;
    this._slotMachineWindow.bet = this._bet;
    this.addWindow(this._slotMachineWindow);
};

//slot scene command  creation done
Scene_SlotMachine.prototype.createSlotCommand = function () {
    this._slotCommandWindow = new Window_SlotCommand(0, 550);
    this._slotCommandWindow.setHandler('bet', this.betCommand.bind(this));
    this._slotCommandWindow.setHandler('spin', this.spinCommand.bind(this));
    this._slotCommandWindow.setHandler('cancel', this.cancelCommand.bind(this));
    this.addWindow(this._slotCommandWindow);
};

Scene_SlotMachine.prototype.createReplayCommand = function () {
    this._replayCommandWindow = new Window_ReplayCommand(0, 550);
    this._replayCommandWindow.setHandler('yes', this.replayCommand.bind(this));
    this._replayCommandWindow.setHandler('no', this.cancelCommand.bind(this));
    this._replayCommandWindow.setHandler('cancel', this.cancelCommand.bind(this));
    this.addWindow(this._replayCommandWindow);
};

Scene_SlotMachine.prototype.createReels = function () {
    this._reelBitmap = ImageManager.loadBitmap("img/slotmachine/", "reel");
    this._reels = [];
    for (var i = 0; i < 5; i++) {
        var sprite = new SLTReelSprite(new Bitmap(116, 54 * 18 * 3));
        this._reels.push(sprite);
        sprite.x = 110 + i * 120;
        sprite.y = 222;
        sprite.setSpinEndFrame(SLTReelSprite.FRAME_SPIN + i * 40);
        sprite.setFrame(0, 0, 116, 54 * 3);
        this.addChild(sprite);
    }
};


//Function that create foreground
Scene_SlotMachine.prototype.createbgRow = function () {
        var bitmap = ImageManager.loadBitmap("img/slotmachine/", "bgFg");
        this._bgreel = new ForegroundSprite(bitmap);
        this._bgreel.x = 0;
        this._bgreel.y = 0;
        this.addChild(this._bgreel);
    };

//command to cancel scene
Scene_SlotMachine.prototype.cancelCommand = function () {
    this._bet = 0;
    this.refreshStatus();
    setCoin(this._coin);
    AudioManager.stopBgm();

    this.popScene();
};

//command to make bet
Scene_SlotMachine.prototype.betCommand = function () {
    if (this._coin - this._bet * scale < scale) {
        this._slotCommandWindow.disableBet();
    }

    this._bet++;
    this._slotCommandWindow.enableSpin();
    this._slotCommandWindow.disableBet();

    this.refreshStatus();
    this._slotCommandWindow.activate();
};

//function after pressing sping
Scene_SlotMachine.prototype.spinCommand = function () {
    AudioManager.playSe({"name": "spinS", "volume": 100, "pitch": 100, "pan": 0});
    this._coin -= this._bet * scale;
    this._slotCommandWindow.deactivate();
    this._slotCommandWindow.close();

    this._winSpot = this.drawLot();

    var t = "";
    var i;
    for (i = 0; i < 5; i++) {
        t += reel[i][this._winSpot[i]];
    }

    this._rollCount++;

    this._spinStart = true;
    this._reels[0].setWinSpot(this._winSpot[0]);
    this._reels[1].setWinSpot(this._winSpot[1]);
    this._reels[2].setWinSpot(this._winSpot[2]);
    this._reels[3].setWinSpot(this._winSpot[3]);
    this._reels[4].setWinSpot(this._winSpot[4]);
    for (i = 0; i < 5; i++) {
        this._reels[i].spin();
    }
};

Scene_SlotMachine.prototype.result = function () {
    this._rollCount = 0;

    var win, tmp;
    win = this.judge(this._winSpot);
    tmp = win;
    if (this._coin + win > Scene_SlotMachine.COIN_MAX_VALUE) {
        win = Scene_SlotMachine.COIN_MAX_VALUE - this._coin;
    }
    this._winCoin = this._correctCoin = win;

    var time = 20 * 10; // reduce time
    if (this._winCoin < time) {
        this._winStep = 1;
    }
    else {
        this._winStep = this._winCoin / time >> 0;
    }

    if (this._winCoin > 0) {
        img = 2;
        this._instructionWindow.messageDraw("Parabéns!\nGanhaste " + tmp + " chips\nJoga de novo!", 30);
        AudioManager.playSe({"name": "WinA", "volume": 100, "pitch": 100, "pan": 0});
    }
    else {
        img = 1;
        this._instructionWindow.messageDraw("Perdeste!\nTenta de novo");
        this._replayCommandWindow.open();
        this._replayCommandWindow.activate();
        AudioManager.playSe({"name": "loseA", "volume": 100, "pitch": 100, "pan": 0});
    }
};

//result of the spin
Scene_SlotMachine.prototype.judge = function (spot) {
    var result2 = [];
    result2.push(reel[0][spot[0]]);
    result2.push(reel[1][spot[1]]);
    result2.push(reel[2][spot[2]]);
    result2.push(reel[3][spot[3]]);
    result2.push(reel[4][spot[4]]);

    var returnValue = 0;
    var cursorArray = this._makeCursorArray();


    //line2
    win = 0;
    base = result2[0];
    if (this._bet > 0) {
        for (i = 1; i < 5; i++) {
            if (base !== result2[i]) {
                break;
            }
        }
        i--;
        if (i > 1) {
            win = scale * odds[i - 2][base];
            cursorArray[i - 2][base] = true;
            returnValue += win;
        }
    }
    return returnValue;
};

Scene_SlotMachine.prototype.drawLot = function () {
    var i, j, l;
    var s;
    var spot = [];

    spot.push(Math.random() * reel[0].length >> 0);
    spot.push(Math.random() * reel[1].length >> 0);
    spot.push(Math.random() * reel[2].length >> 0);
    spot.push(Math.random() * reel[3].length >> 0);
    spot.push(Math.random() * reel[4].length >> 0);

    //2〜5reel
    var l1, l2, l3;
    var r;
    var target1 = true;
    var target2 = true;
    var target3 = true;
    for (i = 1; i < 5; i++) {

        for (j = 0; j < reel[i].length; j++) {
            if (this.isWin(spot, i)) {
                spot[i] = (spot[i] + 1) % reel[i].length;
            }
            else {
                break;
            }
        }

        l = reel[i - 1].length;
        l1 = reel[i - 1][(spot[i - 1] + 1 + l) % l];
        l2 = reel[i - 1][(spot[i - 1] + 0 + l) % l];
        l3 = reel[i - 1][(spot[i - 1] - 1 + l) % l];

        l = reel[i].length;

        r = Math.random();
        if (r < this._probability[i - 1][l2] && target2) {
            s = reel[i].indexOf(l2);
            if (s >= 0) {
                spot[i] = (s + 0 + l) % l;
                target1 = false;
                target3 = false;
            }
            else {
                console.error("Illegal lottery. r:", i,"l2:", l2);
            }
        }

        r = Math.random();
        if (r < this._probability[i - 1][l1] && target1) {
            s = reel[i].indexOf(l1);
            if (s >= 0) {
                spot[i] = (s - 1 + l) % l;
                target2 = false;
                target3 = false;
            }
            else {
                console.error("Illegal lottery. r:", i,"l1:", l1);
            }
        }

        r = Math.random();
        if (r < this._probability[i - 1][l3] && target3) {
            s = reel[i].indexOf(l3);
            if (s >= 0) {
                spot[i] = (s + 1 + l) % l;
                target1 = false;
                target2 = false;
            }
            else {
                console.error("Illegal lottery. r:", i,"l3:", l3);
            }
        }
    }

    return spot;
};

/**
 *
 * @param spot
 * @param r
 * @return {boolean}
 */
Scene_SlotMachine.prototype.isWin = function (spot, r) {
    return !!(
        reel[r - 1][(spot[r - 1] + 1) % reel[r - 1].length] === reel[r][(spot[r] + 1) % reel[r].length] ||
        reel[r - 1][(spot[r - 1] + 0) % reel[r - 1].length] === reel[r][(spot[r] + 0) % reel[r].length] ||
        reel[r - 1][(spot[r - 1] - 1) % reel[r - 1].length] === reel[r][(spot[r] - 1) % reel[r].length]
    );
};

Scene_SlotMachine.prototype.correct = function () {
    this._coin += this._correctCoin;
    this._correctCoin = 0;
    this._replayCommandWindow.open();
    this._replayCommandWindow.activate();
};

Scene_SlotMachine.prototype.replayCommand = function () {
    this._slotCommandWindow.enableBet();
    this._slotCommandWindow.disableSpin();
    if (this._coin < scale) {
        this._slotCommandWindow.disableBet();
    }
    this._slotCommandWindow.select(0);
    this._replayCommandWindow.close();
    this._slotCommandWindow.open();
    this._slotCommandWindow.activate();

    this._bet = 0;
    this._instructionWindow.messageDraw("Joga e Ganha!");
    img = 0;
    this.refreshStatus();
};

Scene_SlotMachine.prototype.refreshStatus = function () {
    this._slotMachineWindow.bet = this._bet * scale;
    this._slotMachineWindow.coin = this._coin - this._bet * scale;

};

Scene_SlotMachine.prototype.update = function () {
    Scene_MenuBase.prototype.update.call(this);

    var result = 0;
    if (this._spinStart && !this.isSpinning()) {
            this._spinStart = false;
            this.result();
    }
    else if (this.isWinCounting()) {
        if (this._winCoin <= this._winStep) {
            this._winCoin = 0;
            result = this._coin + this._correctCoin;
            this._slotMachineWindow.coin = result;
            this.correct();
        }
        else {
            this._winCoin -= this._winStep;
            result = this._coin + this._correctCoin - this._winCoin;
            this._slotMachineWindow.coin = result;
        }
    }
    this._instructionWindow.drawResult();
};

Scene_SlotMachine.prototype._makeCursorArray = function () {
    var returnValue = [];
    for (var i = 0; i < 3; i++) {
        returnValue.push([]);
        for (var j = 0; j < 6; j++) {
            returnValue[i].push(false);
        }
    }
    return returnValue;
};

//-----------------------------------------------------------------------------
// Window_SlotInstruction
//
// This window is instruction card for the slot machines.

function Window_SlotInstruction() {
    this.initialize.apply(this, arguments);
}

Window_SlotInstruction.prototype = Object.create(Window_Base.prototype);
Window_SlotInstruction.prototype.constructor = Window_SlotInstruction;

Window_SlotInstruction.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);

};

Window_SlotInstruction.prototype.lineHeight = function () {
    return 24;
};


Window_SlotInstruction.prototype.messageDraw = function (message, y = 50) {
    this.setBackgroundType(2);
    this.contents.clear();
    var x = 33;
    var w = 224;

    x += w + 20;

    this.drawTextEx(message, x, y, w, "center");
}

let img = 0;
Window_SlotInstruction.prototype.drawResult = function () {
    switch (img) {
        case 0:
            this.drawPicture("moneyS", 575, 30, false);
            break;
        case 1:
            this.drawPicture("fail", 575, 20, false);
            break;
        case 2:
            this.drawPicture("win", 595, 40, false);
            break;
    }
}



//-----------------------------------------------------------------------------
// Window_SlotMachine
//
// This window is the slot machine body.

function Window_SlotMachine() {
    this.initialize.apply(this, arguments);
}

Window_SlotMachine.prototype = Object.create(Window_Base.prototype);
Window_SlotMachine.prototype.constructor = Window_SlotMachine;

Window_SlotMachine.prototype.initialize = function(x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);

    this._lastCoin = 0;
    this._lastBet = 0;
    this._coin = 0;
    this._bet = 0;
    img = 0;
};

/**
 * The bitmap used for the coin.
 *
 * @property coinContents
 * @type Bitmap
 */
Object.defineProperty(Window_SlotMachine.prototype, 'coinContents', {
    get: function() {
        return this._windowCoinSprite.bitmap;
    },
    set: function(value) {
        this._windowCoinSprite.bitmap = value;
    },
    configurable: true
});

/**
 * The bitmap used for the bet.
 *
 * @property betContents
 * @type Bitmap
 */
Object.defineProperty(Window_SlotMachine.prototype, 'betContents', {
    get: function() {
        return this._windowBetSprite.bitmap;
    },
    set: function(value) {
        this._windowBetSprite.bitmap = value;
    },
    configurable: true
});

/**
 * The coin.
 *
 * @property coin
 * @type Number
 */
Object.defineProperty(Window_SlotMachine.prototype, 'coin', {
    get: function() {
        return this._coin;
    },
    set: function(value) {
        this._coin = value;
    },
    configurable: true
});

/**
 * The bet.
 *
 * @property bet
 * @type Number
 */
Object.defineProperty(Window_SlotMachine.prototype, 'bet', {
    get: function() {
        return this._bet;
    },
    set: function(value) {
        this._bet = value;
    },
    configurable: true
});

Window_SlotMachine.prototype.updateBackground = function() {
    Window_Base.prototype.updateBackground.call(this);
    this.setBackgroundType(2);
};

Window_SlotMachine.prototype.start = function() {
};

Window_SlotMachine.prototype.createContents = function() {
    Window_Base.prototype.createContents.call(this);

    this.coinContents = new Bitmap(this.contents.measureTextWidth("99999999"), this.lineHeight());
    this.betContents = new Bitmap(this.contents.measureTextWidth("999"), this.lineHeight());
};

/**
 * @method _createAllParts
 * @private
 */
Window_SlotMachine.prototype._createAllParts = function() {
    Window_Base.prototype._createAllParts.call(this);

    this._windowCoinSprite = new Sprite();
    this.addChild(this._windowCoinSprite);
    this._windowCoinSprite.move(250, 233);

    this._windowBetSprite = new Sprite();
    this.addChild(this._windowBetSprite);
    this._windowBetSprite.move(600, 233);
};

Window_SlotMachine.prototype.refresh = function() {
    this.setBackgroundType(2);
    this.refreshCoin();
    this.refreshBet();
};

Window_SlotMachine.prototype.update = function () {
    Window_Base.prototype.update.call(this);

    if (this._lastCoin !== this._coin) {
        this.refreshCoin();
        this._lastCoin = this._coin;
    }

    if (this._lastBet !== this._bet) {
        this.refreshBet();
        this._lastBet = this._bet;
    }
};

Window_SlotMachine.prototype.refreshCoin = function() {
    this.coinContents.clear();
    this.drawCoinText(this._coin, 0, 0, this.contents.measureTextWidth("99999999"), "right");
};

Window_SlotMachine.prototype.refreshBet = function() {
    this.betContents.clear();
    this.drawBetText(this._bet, 0, 0, this.contents.measureTextWidth("999"), "right");
};


Window_SlotMachine.prototype.drawCoinText = function(text, x, y, maxWidth, align) {
    this.coinContents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};

Window_SlotMachine.prototype.drawBetText = function(text, x, y, maxWidth, align) {
    this.betContents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
};

//-----------------------------------------------------------------------------
// Window_SlotCommand
//
// This window is command window for the slot machines.

function Window_SlotCommand() {
    this.initialize.apply(this, arguments);
}

Window_SlotCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_SlotCommand.prototype.constructor = Window_SlotCommand;

Window_SlotCommand.prototype.initialize = function (x, y) {
    this._betAllow = true;
    this._spinAllow = false;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
};

Object.defineProperty(Window_SlotCommand.prototype, 'isAllowBet', {
    get: function () {
        return this._betAllow;
    },
    configurable: true
});

Object.defineProperty(Window_SlotCommand.prototype, 'isAllowSpin', {
    get: function () {
        return this._spinAllow;
    },
    configurable: true
});

Window_SlotCommand.prototype.enableBet = function () {
    this._betAllow = true;
    this.refresh();
};

Window_SlotCommand.prototype.disableBet = function () {
    this._betAllow = false;
    this.refresh();
};

Window_SlotCommand.prototype.enableSpin = function () {
    this._spinAllow = true;
    this.refresh();
};

Window_SlotCommand.prototype.disableSpin = function () {
    this._spinAllow = false;
    this.refresh();
};

Window_SlotCommand.prototype.makeCommandList = function () {
    this.addCommand("Apostar", 'bet', this._betAllow);
    this.addCommand("Spin", 'spin', this._spinAllow);
    this.addCommand("Sair", 'cancel');
};

Window_SlotCommand.prototype.windowWidth = function () {
    return Graphics.boxWidth;
};

Window_SlotCommand.prototype.maxCols = function () {
    return 3;
};

//-----------------------------------------------------------------------------
// Window_ReplayCommand
//
// This window is replay command window for the slot machines.

function Window_ReplayCommand() {
    this.initialize.apply(this, arguments);
}

Window_ReplayCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_ReplayCommand.prototype.constructor = Window_ReplayCommand;

Window_ReplayCommand.prototype.initialize = function (x, y) {
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.openness = 0;
};

Window_ReplayCommand.prototype.makeCommandList = function () {
    this.addCommand("Sim", 'yes');
    this.addCommand("Não", 'no');
};

Window_ReplayCommand.prototype.windowWidth = function () {
    return Graphics.boxWidth;
}

})();
