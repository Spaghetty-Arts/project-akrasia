(function () {

    enterCredits = function () {
        AudioManager.playBgm({name: "credits", pan: 0, pitch: 100, volume: 100});
        Graphics.playVideo("movies/credits2.webm");
        setInterval(cancelVideo, 1);
        setTimeout(endVideo, 31000);
    }

    function cancelVideo() {
        if (Input.isTriggered('escape')) {
            location.reload();
        }
    }

    function endVideo() {
        location.reload();
    }
})();