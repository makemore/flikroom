/**
 * Created by chris on 06/05/2014.
 */

$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

$.fn.pressEnter = function(fn) {

    return this.each(function() {
        $(this).bind('enterPress', fn);
        $(this).keyup(function(e){
            if(e.keyCode == 13)
            {
                $(this).trigger("enterPress");
            }
        })
    });
};

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}


//new DragDivScroll('canvasContainer');

//Not using that above, as better to have less dependencies.

// Repeat above here for any further scrolled elements

$(document).ready(function(){

    window.world = getWorld();

    $("#canvas").draggable();
    $(".thing").draggable();
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    $("#canvas").css("left", -Math.abs(width / 2));
    $("#canvas").css("top", -Math.abs(height / 2));


    $("#canvas").on("dblclick", function(e){
        var omni = new OmniBox("omni",e.offsetX,e.offsetY);
    });

    io.socket.on("room", function(room) {
        console.log(room);
    });

    io.socket.on("node", function(node){
        console.log(node);
        if (node.verb == "created" && node.data.room == roomId) {
            addNodeToCanvas(node.data);
        }
        else if (node.verb == "updated" && node.data.x != undefined) {
            // do this stuff, if sending x/y in the message

            var nodeFromWorld = window.world.getNodeById(node.id);

            //position change
            //Not a very good way of switching on the update data.

            $("#node-" + node.id).css("left", node.data.x);
            $("#node-" + node.id).css("top", node.data.y);

            //move any associated links
            for (var i = 0; i < nodeFromWorld.inNodes.length; i++) {
                nodeFromWorld.inNodes[i].init();
            }

            for (var i = 0; i < nodeFromWorld.outNodes.length; i++) {
                nodeFromWorld.outNodes[i].init();
            }

        }
        else if (node.verb == "updated" && node.data.inNodeIds != undefined)
        {
            var nodeFromWorld = window.world.getNodeById(node.id);
            nodeFromWorld.inNodeIds = node.data.inNodeIds;
            setTimeout(function(){
                nodeFromWorld.drawLinks();
                nodeFromWorld.drawLinks(); //Dirty and hacky as shit, but it works and proved that this method would work. Needs refactor to event based update.
                nodeFromWorld.drawLinks();
            },1000);


        } else if (node.verb == "updated" && node.data.outNodeIds != undefined) {
            var nodeFromWorld = window.world.getNodeById(node.id);
            nodeFromWorld.outNodeIds = node.data.outNodeIds;
            setTimeout(function(){
                nodeFromWorld.drawLinks();
                nodeFromWorld.drawLinks(); //Dirty and hacky as shit, but it works and proved that this method would work. Needs refactor to event based update.
                nodeFromWorld.drawLinks();
            },1000)

        }

        else if (node.verb == "destroyed")
        {
            var nodeFromWorld = window.world.getNodeById(node.id);
            nodeFromWorld.delete(); //Still need to remove reference from world...
        }
    });

    io.socket.request("/node?room=" + roomId, null, function(nodes){
        for (var i = 0; i < nodes.length; i++)
        {
           addNodeToCanvas(nodes[i]);
        }
    });



    function addNodeToCanvas(node)
    {
        switch (node.type)
        {
            case "youtube":
                window.world.addNodeToWorld(getYouTubePlayer({
                    x: node.x,
                    y: node.y,
                    result: node.result,
                    id: node.id,
                    inNodeIds: node.inNodeIds,
                    outNodeIds: node.outNodeIds
                }));
                break;
            case "page":

                break;
        }
    }
});




//$(".thing").click(function(e){ e.stopPropagation();});