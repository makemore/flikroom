var getNodeLink = function(params){
    var that = {};
    that.startId = params.startId;
    that.endId = params.endId;
    that.startInput = params.startInput;
    that.endInput = params.endInput;

    console.log(that.startId);
    console.log(that.endId);

    that.init = function(){
        var center;


        var startingIn = true;
        var endingIn = true;
        // Starting setup from ID
        var startPlayer = $("#node-" + that.startId);

        var startLeft = startPlayer.css("left").split("px")[0];
        var startTop = startPlayer.css("top").split("px")[0];
        startLeft = parseInt(startLeft);
        startTop = parseInt(startTop) + startPlayer.height();

        console.log(that.startInput);

        if (!that.startInput)
        {
            startLeft = startLeft + startPlayer.width();
            startingIn = false;
        }

        //ending setup from id

        var endingPlayer = $("#node-" + that.endId);

        var stopLeft = endingPlayer.css("left").split("px")[0];
        var stopTop = endingPlayer.css("top").split("px")[0];

        stopLeft = parseInt(stopLeft);
        stopTop = parseInt(stopTop) + endingPlayer.height();

        if (!that.endInput)
        {
            stopLeft = stopLeft + endingPlayer.width();
            endingIn = false;
        }


        var finalLeft = null;
        var finalTop = null;

        var width = null;
        var height = null;

        var topLeftToBottomRight = true;

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

        if (startLeft > stopLeft && startTop < stopTop)
        {
            // bottom left direction
            topLeftToBottomRight = false;
        }

        if (startLeft < stopLeft && startTop > stopTop)
        {
            topLeftToBottomRight = false;
        }



        //Final rendering


        if (topLeftToBottomRight)
        {
            center = $.tmpl($("#tmpl-node-path").html(), {
                left: finalLeft,
                top: finalTop,
                width: width,
                height: height,
                sX : 0,
                sY : 0,
                c1X : width / 2,
                c1Y : 0,
                c2X : width / 2,
                c2Y : height,
                eX : width,
                eY : height
            });
        } else {
            center = $.tmpl($("#tmpl-node-path").html(), {
                left: finalLeft,
                top: finalTop,
                width: width,
                height: height,
                sX : 0,
                sY : height,
                c1X : width / 2,
                c1Y : height,
                c2X : width / 2,
                c2Y : 0,
                eX : width,
                eY : 0
            });
        }
        that.el = $(center)[0];
        $("#canvas").append(that.el);
    }

    that.init();
}



