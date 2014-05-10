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
    $("#canvas").draggable();
    $(".thing").draggable();
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    $("#canvas").css("left", -Math.abs(width / 2));
    $("#canvas").css("top", -Math.abs(height / 2));


    $("#canvas").on("dblclick", function(e){
        var inputField = $.tmpl($("#tmpl-search-box").html(), { left: e.offsetX, top: e.offsetY});
        inputField = $(inputField);
        $("#canvas").append(inputField);
        var youtube = new YouTubeFlik("YouTube", e.offsetX, e.offsetY);

        inputField.focus();

        inputField.keypress(function(event) {
            if (event.keyCode == 13) {
                console.log("here");
                io.socket.request("/scrape/getLinksFromUrl", { url : $(this).val() }, function(links){
                    console.log(links);
                });


              //  youtube.init();
              //  $(this).remove();
            } else {
               // var val = $(this).val();
               // if (val.length > 1) {
               //     youtube.search($(this).val());
               // }
            }
        });


        /*
        inputField.autocomplete({
            source: function(request, outerResponse)
            {
                console.log("testing");
                youtube.search(request.term, function(response){
                    console.log(response);
                    outerResponse( $.map( response.items, function(item) {
                        console.log(item);
                        return {
                            label: item.snippet.title,
                            value: item.id.videoId
                        }
                    }));
                });
                //console.log(test);
            },
            minLength: 2,
            select: function( event, ui ) {
                youtube.init(ui.item.value);
                inputField.remove();
            }
        });
        */

        //var youtube = new YouTubeFlik("YouTube", e.offsetX, e.offsetY);


        //if (userId == undefined)
        //{
        //    alert("must be logged in for this");
        //    return;
        //}

        //addNodeToCanvas("temp", e.offsetX - 50, e.offsetY - 50);
        //io.socket.post("/node", {x:e.offsetX - 50, y:e.offsetY - 50, room: roomId, user: userId}, function(response){
        //    $("#node-temp").attr("id", "node-" + response.id);
        //});
    });

    io.socket.on("node", function(node){
        //console.log(node);
        if (node.verb == "created" && node.data.room == roomId) {
            addNodeToCanvas(node.data.id, node.data.x,node.data.y);
        } else if (node.verb == "updated" && node.data.room == roomId)
        {
            console.log(node);
            $("#node-" + node.id).css("left", node.data.x);
            $("#node-" + node.id).css("top", node.data.y);
        }

    });

    io.socket.request("/node?room=" + roomId, null, function(nodes){
        for (var i = 0; i < nodes.length; i++)
        {
            addNodeToCanvas(nodes[i].id, nodes[i].x, nodes[i].y);
        }
    });


    function addNodeToCanvas(id, x, y)
    {
        var node = document.createElement('div');
        node.className = "node";
        node = $(node);
        node.css("left", x );
        node.css("top", y );
        node.attr("id", "node-" + id);
        node.draggable({
            drag: function(e) {
                var target = $(e.target);
                var id = target.attr("id").split("-")[1];
                io.socket.put("/node/" + id, { x: $(this).css("left"), y: $(this).css("top")}, function(response)
                {
                    console.log(response);
                });

            }
        });
        node.css("position", "absolute");
        $("#canvas").append(node);
    }
});




//$(".thing").click(function(e){ e.stopPropagation();});