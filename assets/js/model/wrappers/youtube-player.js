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



var getYouTubePlayer = function(x, y, result, id) {

    var youtubePlayer = {};

    youtubePlayer.x = x;
    youtubePlayer.y = y;
    youtubePlayer.result = result;

    // Give the baby away

    youtubePlayer.init = function(result) {
        youtubePlayer.rndNum = Math.floor((Math.random() * 10000) + 1);

        var youtubeHtml = $.tmpl($("#tmpl-youtube-player").html(), {
            rndNum: youtubePlayer.rndNum
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


        youtubePlayer.$el = html;

        youtubePlayer.addPlayer = function(){
            youtubePlayer.player = new YT.Player('youtube-player' + youtubePlayer.rndNum, {
                height: '290',
                width: '340',
                videoId: result.id,
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            console.log(youtubePlayer);
        }


        //YouTubePlayer.prototype.player;
        //console.log(YT);
        if (window.YT === undefined && window.youtubeLoading === undefined) {
            console.log("here");
            window.youtubeLoading = true;
            //check if holding array exists
            if (window.playersToLoadWhenReady === undefined)
            {
                window.playersToLoadWhenReady = [];
            }
            console.log(youtubePlayer);
            window.playersToLoadWhenReady.push(youtubePlayer);

            console.log("YT is undefined");
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = function () {
                console.log("iframeApiReady");
                for (var i = 0; i < window.playersToLoadWhenReady.length; i++)
                {
                    window.playersToLoadWhenReady[i].addPlayer();
                }
            }
        }
        else
        {
            console.log("YT is not undefined");

            if (window.playersToLoadWhenReady === undefined)
            {
                window.playersToLoadWhenReady = [];
            }

            if (window.YT === undefined)
            {
                window.playersToLoadWhenReady.push(youtubePlayer);
            }
            //youtubePlayer.addPlayer();
        }





        function onPlayerReady(event) {
            //event.target.playVideo();
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

    //can't take over youtubePlayer, as we need that for the reference for things to lazy load for youtube videos.
    var returnedObject = Object.create(new NodeBase(youtubePlayer, "youtube", id));
    return returnedObject;
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
