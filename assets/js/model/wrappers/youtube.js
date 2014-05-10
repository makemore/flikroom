/**
 * Created by chris on 10/05/2014.
 */

/*
 //Define a functional object to hold persons in JavaScript
 var Person = function(name) {
 this.name = name;
 };

 //Add dynamically to the already defined object a new getter
 Person.prototype.getName = function() {
 return this.name;
 };

 //Create a new object of type Person
 var john = new Person("John");

 //Try the getter
 alert(john.getName());

 //If now I modify person, also John gets the updates
 Person.prototype.sayMyName = function() {
 alert('Hello, my name is ' + this.getName());
 };

 //Call the new method on john
 john.sayMyName();

 */

var YouTubeFlik = function(name, x, y){
  this.name = name;
  this.x = x;
  this.y = y;
  this.init();
};

//Add dynamically to the already defined object a new getter
YouTubeFlik.prototype.getName = function() {
    return this.name;
};

YouTubeFlik.prototype.init = function() {
    var rndNum = Math.floor((Math.random() * 10000) + 1);
    var insert = "<div id='player" + rndNum + "' class='node-youtube' style='left:" + this.x + "px;top:" + this.y + "px;'></div>";
    $("#canvas").append(insert);



    //YouTubeFlik.prototype.player;
    //console.log(YT);
    if (window.YT === undefined) {
        console.log("YT is undefined");
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = function () {
            console.log("iframeApiReady");
            addPlayer(rndNum);
        }
    }
    else
    {
        console.log("YT is not undefined")
        addPlayer(rndNum);
    }


    function addPlayer(rndNum){
        YouTubeFlik.prototype.player = new YT.Player('player' + rndNum, {
            height: '290',
            width: '340',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }


    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
};



//Create a new object of type Person
//var youtube = new YouTubeFlik("YouTube", 5000, 5000);

YouTubeFlik.prototype.sayMyName = function() {
    alert('Hello, my name is ' + this.getName());
};

//youtube.sayMyName();