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

var YouTubePlayer = function(x, y, result){
  this.x = x;
  this.y = y;
  this.init(result);
};

//Add dynamically to the already defined object a new getter
YouTubePlayer.prototype.getName = function() {
    return this.name;
};




YouTubePlayer.prototype.init = function(result) {
    var rndNum = Math.floor((Math.random() * 10000) + 1);
    var youtubePlayer = $.tmpl($("#tmpl-youtube-player").html(), {
        left: this.x,
        top: this.y,
        rndNum: rndNum,
        title: result.title
    });
    $("#canvas").append(youtubePlayer);

    youtubePlayer = $(youtubePlayer);


    //This should be refactored into a base "node" class
    youtubePlayer.find(".node-close").on("click", function(){
        $(youtubePlayer).remove();
    });

    youtubePlayer.draggable({ handle: ".node-menu" });

    //YouTubePlayer.prototype.player;
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
        console.log("YT is not undefined");
        addPlayer(rndNum);
    }


    function addPlayer(rndNum){
        YouTubePlayer.prototype.player = new YT.Player('youtube-player' + rndNum, {
            height: '290',
            width: '340',
            videoId: result.id,
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
        /*if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }*/
    }
    function stopVideo() {
        player.stopVideo();
    }

    //this.initConnectionPaths();


    var isDragging = false;


    var startLeft = 0;
    var startTop = 0;

    $(".node-handle").on("mousedown", youtubePlayer, function(e){
        //alert("here");
        //<path d="M78,303 C215,298 246,90 406,372" />
        //var path = document.createElement("path");
        e.preventDefault();
        e.stopPropagation();

        /*
        $(window).mousemove(function() {
            isDragging = true;
            $(window).unbind("mousemove");
        });
        */
        /*
        console.log(e);
        var player = $(e.currentTarget).parent().parent();
        $("#canvas").append("<svg height='210' width='400' style='position:absolute;left:" + player.css("left") + ";top:" + player.css("top") + ";z-index:1000;'><path d='M85,65 C339,66 170,369 406,372 Z' /></svg>");
        */
        console.log("down");
        var player = $(e.currentTarget).parent().parent();

        startLeft = player.css("left").split("px")[0];
        startTop = player.css("top").split("px")[0];

        startLeft = parseInt(startLeft);
        startTop = parseInt(startTop) + player.height();

        //dropTempMarker(startLeft,startTop, "s");
    });

    $(window).mouseup(function(e){

        //need to work out top left position
        //then just extend width and height of div based on bottom right

        var stopLeft = e.offsetX;
        var stopTop = e.offsetY;


        var finalLeft = null;
        var finalTop = null;

        var width = null;
        var height = null;

        if (startLeft > stopLeft) {
            finalLeft = stopLeft;
            width = startLeft - stopLeft;
        } else {
            finalLeft = startLeft;
            width = stopLeft - startLeft;
        }

        if (startTop < stopTop) {
            finalTop = startTop;
            height = stopTop - startTop;
        } else {
            finalTop = stopTop;
            height = startTop - stopTop;
        }

        console.log(finalLeft);
        console.log(finalTop);

        /*
               start point startX
               control point 1
               control point 2
               end

               sX,sY,
               c1X,c1Y,
               c2X,c2Y,
               eX,eY
           */

        var center = $.tmpl($("#tmpl-node-path").html(), {
            left: finalLeft,
            top: finalTop,
            width: width,
            height: height,
            sX : 0,
            sY : 0,
            c1X : 0,
            c1Y : 0,
            c2X : 0,
            c2Y : 0,
            eX : width,
            eY : height
        });

        center = $(center);

        $("#canvas").append(center);

        center = center[0];

        //dropTempMarker(e.offsetX, e.offsetY, "e"); //end point
        //dropTempMarker(finalLeft,finalTop, "f");  //final top left point
        /*
        var wasDragging = isDragging;
        isDragging = false;
        $(window).unbind("mousemove");
        if (!wasDragging) { //was clicking
            //$("#throbble").show();
            console.log("dragged");
        }
        */
    });

};

function dropTempMarker(x,y, identify){
    var center = $.tmpl($("#tmpl-search-node").html(), {
        left: x,
        top: y,
        type: "c",
        id: "c",
        numberOfResults: identify
    });
    $("#canvas").append(center);
    setTimeout(function(){
        $(center).remove();
    }, 2000);
}


YouTubePlayer.prototype.initConnectionPaths = function(){

}



//Create a new object of type Person
//var youtube = new YouTubePlayer("YouTube", 5000, 5000);

YouTubePlayer.prototype.sayMyName = function() {
    alert('Hello, my name is ' + this.getName());
};

//youtube.sayMyName();