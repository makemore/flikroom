var getNodeLink = function(params){
    var that = {};
    that.startId = params.startId;
    that.endId = params.endId;
    that.startInput = params.startInput;
    that.endInput = params.endInput;

    that.el = null;

    that.id = world.getNextClientId();


    that.center = {};

    that.init = function(){



        var startingIn = true;
        var endingIn = true;
        // Starting setup from ID
        var startPlayer = $("#node-" + that.startId);

        if (startPlayer.length == 0)
        {
            console.log("startingPlayer doesn't exist yet");
            return;
        }

        var startLeft = startPlayer.css("left").split("px")[0];
        var startTop = startPlayer.css("top").split("px")[0];

        startLeft = parseInt(startLeft);
        startTop = parseInt(startTop) + startPlayer.height();

        if (!that.startInput)
        {
            startLeft = startLeft + startPlayer.width();
            startingIn = false;
        }

        //ending setup from id



        var endingPlayer = $("#node-" + that.endId);

        if (endingPlayer.length == 0)
        {
            console.log("startingPlayer doesn't exist yet");
            return;
        }

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
            finalTop = startTop - 15;
            height = stopTop - startTop + 15; // Modifications here compensate for width of line
        } else {
            finalTop = stopTop - 15;
            height = startTop - stopTop + 15;
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
            that.center = $.tmpl($("#tmpl-node-path").html(), {
                left: finalLeft,
                top: finalTop,
                width: width,
                height: height,
                sX : 0,
                sY : 10,
                c1X : width / 2,
                c1Y : 10,
                c2X : width / 2,
                c2Y : height - 10,
                eX : width,
                eY : height - 10
            });
        } else {
            that.center = $.tmpl($("#tmpl-node-path").html(), {
                left: finalLeft,
                top: finalTop,
                width: width,
                height: height,
                sX : 0,
                sY : height - 10,
                c1X : width / 2,
                c1Y : height - 10,
                c2X : width / 2,
                c2Y : 10,
                eX : width,
                eY : 10
            });
        }

        if (that.el === null)
        {
            that.el = $(that.center);
            $("#canvas").append(that.el);
            that.el = $(that.el);
            //referenceCheck = that.el;



        } else
        {
//            //console.log($(that.el));
            //$("#link-" + that.id).remove(); //hacky as shit, but should work.

            that.el[0].remove();
            //referenceCheck = $(that.el);
            //referenceCheck.remove();

            //$(that.el).remove();
            that.el = $(that.center);
            $("#canvas").append(that.el);

        }




    }


    that.render = function(){
        console.log("preparing to re-render");
        //Not using this just, just being slack and running the whole thing again.
    }

    that.remove = function(){
        console.log("removing link");
        that.el.remove();
        that.el = null;
        var positionInArray = arrayObjectIndexOf(window.world.links, that.id, "id");
        window.world.links[positionInArray] = null; //should delete the reference to the object??
    }

    return that;
}



