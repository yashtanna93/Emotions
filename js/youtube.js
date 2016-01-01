// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var images = 0;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: '',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.UNSTARTED:
            console.log("notstared");
            break;
        case YT.PlayerState.ENDED:
            stop_snapshot();
            console.log("ended");
            break;
        case YT.PlayerState.PLAYING:
            take_snapshot();
            console.log("playing");
            break;
        case YT.PlayerState.PAUSED:
            console.log("paused");
            break;
        case YT.PlayerState.BUFFERING:
            console.log("buffering");
            break;
    }
}

function getUrlVars(url) {
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function go() {
    url = document.getElementById("youtube-url").value;
    vidId = getUrlVars(url)["v"];
    if(vidId != null && YT.PlayerState.UNSTARTED) {
        player.loadVideoById(vidId, 0, 'large'); //automatically plays the video
        $("#player").show();
    }
}

var click;
function take_snapshot() {
    // take snapshot and get image data
    t = 0;
    click = setInterval(function () {
        t = t + 3;
        Webcam.snap(function (data_uri) {
            // display results in page
            document.getElementById('results').innerHTML =
                '<h2>Here is your image:</h2>' +
                '<img src="' + data_uri + '"/>';
            imageUpload("test", t, data_uri);
            images = images + 1;
        });
    }, 3000);
}
function stop_snapshot() {
    clearInterval(click);
    localStorage.setItem('image', images);
    window.location.assign("analyse.html");
}
