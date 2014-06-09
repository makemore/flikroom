// x, y, result, id
var getYouTubePlayer = function(params) {

    params.id = params.id || "client-" + window.world.getNextClientId(); // default parameter value.. If I always have access to el, then do a i need to set a temp client id?

    var youtubePlayer = nodeBase({
        x: params.x,
        y: params.y,
        type: "youtube",
        result: params.result,
        id: params.id,
        inNodeIds: params.inNodeIds,
        outNodeIds: params.outNodeIds
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

        youtubePlayer.play = function(){
            youtubePlayer.player.playVideo();
            var x = youtubePlayer.x - (($(window).width() / 2) - (youtubePlayer.$el.width() / 2));
            var y = youtubePlayer.y - (($(window).height() / 2) - (youtubePlayer.$el.height() / 2));
            window.world.moveTo(-Math.abs(x),-Math.abs(y));
            window.world.currentNode = youtubePlayer;
        }

        youtubePlayer.stop = function() {
            youtubePlayer.player.stopVideo();
        }

        youtubePlayer.next = function(){
            if (youtubePlayer.outNodeObjects.length == 1)
            {
                var next = youtubePlayer.outNodeObjects[0];
                youtubePlayer.stop();
                next.play();
            }
            else if (youtubePlayer.outNodeObjects.length > 1)
            {
                alert("more than 1 route to pick from, need to show you to ask");
            }
        }

        youtubePlayer.prev = function(){
            if (youtubePlayer.inNodeObjects.length == 1)
            {
                var prev = youtubePlayer.inNodeObjects[0];
                youtubePlayer.stop();
                prev.play();
            }
            else if (youtubePlayer.outNodeObjects.length > 1)
            {
                alert("more than 1 route to pick from, need to show you to ask");
            }
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

            if (event.data == YT.PlayerState.ENDED)
            {
                youtubePlayer.next();
            }

            //console.log(event);
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
