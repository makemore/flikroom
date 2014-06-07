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

    io.socket.on("node", function(node){
        console.log(node);
        console.log(node.data.inNodes);
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

            for (var i = 0; i < nodeFromWorld.inNodes.length; i++) {
                nodeFromWorld.inNodes[i].init();
            }

            for (var i = 0; i < nodeFromWorld.outNodes.length; i++) {
                nodeFromWorld.outNodes[i].init();
            }

        }
        else if (node.verb == "updated" && node.data.inNodes != undefined)
        {
            var nodeFromWorld = window.world.getNodeById(node.id);
            nodeFromWorld.inNodeIds = node.data.inNodes;
            console.log(nodeFromWorld);
            setTimeout(function(){
                nodeFromWorld.drawInLinks();
            },1000);

        } else if (node.verb == "updated" && node.data.outNodes != undefined) {
            var nodeFromWorld = window.world.getNodeById(node.id);
            nodeFromWorld.outNodes = node.data.outNodes;
            console.log(nodeFromWorld);
            setTimeout(function(){
                nodeFromWorld.drawOutLinks();
            },1000);
        }

        else if (node.verb == "destroyed")
        {
            var nodeFromWorld = window.world.getNodeById(node.id);
            nodeFromWorld.delete(); //Still need to remove reference from world...
        }
    });

    io.socket.request("/node?room=" + roomId, null, function(nodes){
        console.log(nodes);
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
                    inNodeIds: node.inNodes,
                    outNodeIds: node.outNodes
                }));
                break;
            case "page":

                break;
        }
    }
});




//$(".thing").click(function(e){ e.stopPropagation();});