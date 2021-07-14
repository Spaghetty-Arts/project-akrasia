var iprest="project-akrasia-rest.herokuapp.com";
/*
Account Information
 */
let playerID;
let playerName;
let playerReward;
let playerDaily;
let playerToken;
let playerGotReward;

/*
Character information
 */
let playerLife = 100;
let playerMoney;
let playerALevel;

/*
Scores
 */
let playerWin;
let playerLose;
let playerRank;


/*
Enemie
 */
let enemieID
let enemieHealth
let enemieName

/*
Retrieve Data
 */
saveData = function (obj) {
    playerID = obj.id;
    playerName = obj.username;
    playerToken = obj.user_token;
    playerGotReward = obj.got_reward;
    playerDaily = obj.login_reward;

    playerMoney = obj.money;
    playerALevel = obj.life;
    playerLife = (playerALevel * 10) + 100;

    playerWin = obj.win;
    playerLose = obj.lose;
    playerRank = obj.rank;
}
