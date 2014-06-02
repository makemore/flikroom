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



var getYouTubePlayer = function(x, y, result){

    var youtubePlayer = {};

    youtubePlayer.x = x;
    youtubePlayer.y = y;
    youtubePlayer.result = result;
    // Give the baby away

    youtubePlayer.init = function(result) {
        var rndNum = Math.floor((Math.random() * 10000) + 1);

        var youtubeHtml = $.tmpl($("#tmpl-youtube-player").html(), {
            rndNum: rndNum
        });

        var source   = $("#tmpl-node-base").html();
        var template = Handlebars.compile(source);



        var context = {
            title: youtubePlayer.result.title,
            left: this.x,
            top: this.y,
            body: youtubeHtml[0].outerHTML,
            className: "node-youtube-player"
        };

        var html = $(template(context)); //have to wrap in jquery before appending to keep reference;

        $("#canvas").append(html);


        //This isn't getting back to the base class
        youtubePlayer.$el = html;

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
            youtubePlayer.player = new YT.Player('youtube-player' + rndNum, {
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




    };

    youtubePlayer.init(result);
    var youtubePlayer = Object.create(new NodeBase(youtubePlayer, "youtube"));
    return youtubePlayer;
}







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
