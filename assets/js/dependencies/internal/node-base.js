var nodeBase = function(params) {
    var that = {};
    that.id = params.id; //just pure ID
    that.x = params.x;
    that.y = params.y;
    that.type = params.type;
    //that.$el = params.$el; set in child object
    that.result = params.result;
    that.local = params.local;
    that.inNodes = [];
    that.outNodes = [];

    that.setupBase = function(){
        $(".node-close").on("click", that.$el, function(e){
            that.$el.remove();
            that.delete();
        });
        that.$el.draggable({ handle: ".node-menu" });
    }

    that.save = function(){
        io.socket.post("/node/", {
            x: that.x,
            y: that.y,
            room: roomId,
            type: that.type,
            result: that.result
        }, function(response)
        {
            if (that.id.indexOf("client") > -1)
            {
                that.$el.attr("id", "node-" + response.id);
                that.id = response.id;
            }
        });
    }

    that.delete = function(){
        io.socket.delete("/node/" + that.id, {
            },
            function(response)
            {
                console.log(response);
            });
    }

    that.setupLinking = function() {
        var isDragging = false;
        var startLeft = 0;
        var startTop = 0;
        var that = this;
        var startingIn = true;
        var endingIn = true;
        var startId = null;
        var endId = null;
        var startInput = true;
        var endInput = true;


        //double binding events...

        that.$el.find(".node-handle").on("mousedown", function (e) {
            //alert("here");
            //<path d="M78,303 C215,298 246,90 406,372" />
            //var path = document.createElement("path");
            console.log("mousedown");

            var player = $(e.currentTarget).parent().parent();

            startId = player.attr("id").split('-')[1];

            if ($(e.currentTarget).hasClass("handle-output")) {
                window.world.startInput = false;
                console.log("output");
            }
            else
            {
                console.log("input");
            }

            e.preventDefault();
            e.stopPropagation();

            //storing mininal information about starting node globally
            window.world.startId = startId;
            window.world.startInput = startInput;
            return false;
        });


        that.$el.find(".node-handle").on("mouseup", function (e) {
            console.log("mouseup");
            //need to work out top left position
            //then just extend width and height of div based on bottom right

            e.preventDefault();
            e.stopPropagation();


            var player = $(e.currentTarget).parent().parent();

            if ($(e.currentTarget).hasClass("handle-output")) {
                endInput = false;
                console.log("output");
            }
            else
            {
                console.log("input");
            }


            //Problem, not getting access to the same scope on mouse down, and mouse up..

            //This is a problem.. need to be able to wire up across instances..


            console.log(window.world.startId);

            endId = $(player).attr("id").split('-')[1];



            var startNode = window.world.getNodeById(window.world.startId);

            var endNode = window.world.getNodeById(endId);


            var nodeLink = getNodeLink({ startId:window.world.startId, endId:endId, startInput:window.world.startInput, endInput:endInput });

            if (startingIn) {
                startNode.addInNode(nodeLink);
            } else {
                startNode.addOutNode(nodeLink);
            }

            if (endingIn) {
                endNode.addInNode(nodeLink);
            } else {
                endNode.addOutNode(nodeLink);
            }
        });

    }

    that.addInNode = function(nodeLink){
        that.inNodes.push(nodeLink);
    }

    that.addOutNode = function(nodeLink){
        that.outNodes.push(nodeLink);
    }

    //io.socket.put("/node/" + id, { x: $(this).css("left"), y: $(this).css("top")}, function(response)




    /*
     io.socket.put("/node/" + that.node.id, {
     inNodes:
     }, function(response)
     {
     console.log(response);
     if (that.node.local)
     {
     that.node.$el.attr("id", "node-" + response.id);
     console.log(that);
     that.node.id = response.id;
     //CAN'T FUCKING GET ACCESS TO ROOT OBJECT!
     //OK, so can't directly access root variables, but can access sub properties of objects.. Odd

     console.log(that.node.id);
     }

     });
     */




    that.initBase = function(){
        that.setupBase();
        that.setupLinking();
    }

    return that;
}








