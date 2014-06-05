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


/*

 that.id = params.id; //just pure ID
 that.x = params.x;
 that.y = params.y;
 that.type = params.type;
 that.$el = params.$el;
 that.result = params.result;
 that.local = params.local;
 */


// x, y, result, id
var getYouTubePlayer = function(params) {

    params.id = params.id || "client-" + window.world.getNextClientId(); // default parameter value.. If I always have access to el, then do a i need to set a temp client id?

    var youtubePlayer = nodeBase({
        x: params.x,
        y: params.y,
        type: "youtube",
        result: params.result,
        id: params.id
    });

    // Give the baby away

    youtubePlayer.local = false;

    if (params.id === undefined)
    {
        youtubePlayer.local = true;
    }


    youtubePlayer.init = function(result) {
        youtubePlayer.rndNum = Math.floor((Math.random() * 10000) + 1);

        var youtubeHtml = $.tmpl($("#tmpl-youtube-player").html(), {
            rndNum: youtubePlayer.rndNum
        });

        var source   = $("#tmpl-node-base").html();
        var template = Handlebars.compile(source);

        var context = {
            title: youtubePlayer.result.title,
            left: youtubePlayer.x,
            top: youtubePlayer.y,
            body: youtubeHtml[0].outerHTML,
            className: "node-youtube-player",
            id: youtubePlayer.id
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
        }

        //YouTubePlayer.prototype.player;
        //console.log(YT);
        if (window.YT === undefined && window.youtubeLoading === undefined) {
            window.youtubeLoading = true;
            //check if holding array exists
            if (window.playersToLoadWhenReady === undefined)
            {
                window.playersToLoadWhenReady = [];
            }
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
            else
            {
                youtubePlayer.addPlayer();
            }
            //
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
            youtubePlayer.player.stopVideo();
        }

        //this.initConnectionPaths();




    };

    youtubePlayer.init(youtubePlayer.result);
    youtubePlayer.initBase();
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
