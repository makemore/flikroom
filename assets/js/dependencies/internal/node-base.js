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
    that.inNodeIds = params.inNodeIds;
    that.outNodeIds = params.outNodeIds;

    that.setupBase = function(){
        $(".node-close").on("click", that.$el, function(e){
            that.delete();
        });
        that.$el.draggable({
            handle: ".node-menu",
            drag: function(e) {
                var target = $(e.target);
                var id = target.attr("id").split("-")[1];
                io.socket.put("/node/" + id, { x: $(this).css("left"), y: $(this).css("top")}, function(response)
                {
                    //console.log(response);
                });
                for (var i = 0; i < that.inNodes.length; i++){
                    that.inNodes[i].init();
                }
                for (var i = 0; i < that.outNodes.length; i++){
                    that.outNodes[i].init();
                }
            },
            start: function(e){
                //$(e.currentTarget).find(".node-shield").show();
                $(".node-shield").show();
            },
            stop: function(e){
                $(".node-shield").hide();
                //$(e.currentTarget).find(".node-shield").hide();
            }
        });
    };

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
        that.$el.remove();
        io.socket.delete("/node/" + that.id, {
            },
            function(response)
            {
                //console.log(response);
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

        var endInput = true;


        //double binding events...

        that.$el.find(".node-handle").on("mousedown", function (e) {
            //alert("here");
            //<path d="M78,303 C215,298 246,90 406,372" />
            //var path = document.createElement("path");


            var player = $(e.currentTarget).parent().parent();

            window.world.startInput = true;

            startId = player.attr("id").split('-')[1];

            if ($(e.currentTarget).hasClass("handle-output")) {
                window.world.startInput = false;
            }

            e.preventDefault();
            e.stopPropagation();

            //storing mininal information about starting node globally
            window.world.startId = startId;
            //window.world.startInput = startInput; allready defined above.
            return false;
        });


        that.$el.find(".node-handle").on("mouseup", function (e) {
            //need to work out top left position
            //then just extend width and height of div based on bottom right

            e.preventDefault();
            e.stopPropagation();


            var player = $(e.currentTarget).parent().parent();

            if ($(e.currentTarget).hasClass("handle-output")) {
                endInput = false;
            }


            //Problem, not getting access to the same scope on mouse down, and mouse up..

            //This is a problem.. need to be able to wire up across instances..


            endId = $(player).attr("id").split('-')[1];

            that.addLink(window.world.startId, window.world.startInput, endId, endInput);


            //This is a bit ropey, lots of duplicate code.
            that.saveNodeLink(getNodeLink({ startId: window.world.startId, endId: endId, startInput: window.world.startInput, endInput: endInput }))
        });

    };

    that.addLink = function(startId, startInput, endId, endInput){



        var existingLink = window.world.getLinkByIds(startId,endId);


        if (existingLink == null) {

            var startNode = window.world.getNodeById(startId);
            var endNode = window.world.getNodeById(endId);

            if (startNode == null || endNode == null)
            {
                console.log("half of a link doesn't exist yet");
                return;
            }

            var nodeLink = getNodeLink({ startId: startId, endId: endId, startInput: startInput, endInput: endInput });

            nodeLink.init(); //Init out here, rather than automatically on constructor//working now..


            window.world.addLinkToWorld(nodeLink);

            if (window.world.startInput) {
                startNode.addInNode(nodeLink);
            } else {
                startNode.addOutNode(nodeLink);
            }

            if (endInput) {
                endNode.addInNode(nodeLink);
            } else {
                endNode.addOutNode(nodeLink);
            }
        }
        else
        {
            console.log("linkAlreadyDrawnOnCanvas");
        }
    }


    that.addInNode = function(nodeLink){
        that.inNodes.push(nodeLink);
    };

    that.addOutNode = function(nodeLink){
        that.outNodes.push(nodeLink);
    };

    that.isIdInInNodes = function(id){

       if (this.inNodeIds === undefined)
       {
           return false;
       }

       var id = $.grep(this.inNodeIds, function(e){ return e == id; })[0];

       if (id)
       {
           return true;
       }
       else
       {
           return false;
       }
    }

    that.isIdInOutNodes = function(id){
        if (this.outNodeIds === undefined)
        {
            return false;
        }
        var id = $.grep(this.outNodeIds, function(e){ return e == id; })[0];
        if (id)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    that.saveNodeLink = function(nodeLink){
        //a node link will always contain it own id, and the other. The other should always be added.
        io.socket.request("/node/addNodeLink", {
            startId: nodeLink.startId,
            startInput : nodeLink.startInput,
            endId : nodeLink.endId,
            endInput : nodeLink.endInput
        }, function(response){
            //console.log(response);
        });
    };


    that.drawLinks = function(){
        that.drawInLinks();
        that.drawOutLinks();
    }

    that.drawInLinks = function(){
        //loop through all in and out nodes and see if they are already drawn on the page properly..
        if (that.inNodeIds != undefined) {
            for (var i = 0; i < that.inNodeIds.length; i++) {
                var existingLink = world.getLinkByIds(that.id, that.inNodeIds[i]);
                if (existingLink == null) {
                    console.log("here");
                    console.log(that.inNodeIds[i]);
                    var otherObject = world.getNodeById(that.inNodeIds[i]);
                    //get other object

                    testingObject = otherObject;

                    if (otherObject == undefined)
                    {
                        console.log("other object not ready yet");
                        break; //skip this loop cycle
                    }
                    //check in list and add nodes if exists



                    var otherInBool = otherObject.isIdInInNodes(that.id);
                    //looking to see if Id exists in input list or output list

                    if (otherInBool) {
                        that.addLink(that.id, true, that.inNodeIds[i], true);
                    }
                    else
                    {
                        console.log("id not in partner in nodes");
                    }


                    //check out list and add nodes if exists
                    console.log(that.id);
                    var otherOutBool = otherObject.isIdInOutNodes(that.id);

                    //looking to see if Id exists in input list or output list
                    if (otherOutBool) {
                        that.addLink(that.id, true, that.inNodeIds[i], false);
                    }
                    else
                    {
                        console.log("id not in partner out nodes");
                    }

                } else {
                    console.log("link already exists");
                }
            }
        }
    }

    that.drawOutLinks = function(){
        if (that.outNodeIds != undefined) {
            for (var i = 0; i < that.outNodeIds.length; i++) {
                var existingLink = world.getLinkByIds(that.id, that.outNodeIds[i]);
                if (existingLink == null) {
                    var otherObject = world.getNodeById(that.outNodeIds[i]);
                    //get other object

                    if (otherObject == undefined)
                    {
                        console.log("other object not ready yet");
                        break; //skip this loop cycle
                    }
                    //check in list and add nodes if exists

                    var otherInBool = otherObject.isIdInInNodes(that.id);
                    //looking to see if Id exists in input list or output list
                    if (otherInBool) {
                        that.addLink(that.id, true, that.outNodeIds[i], true);
                    }
                    else
                    {
                        console.log("id not in partner in nodes");
                    }
                    //check out list and add nodes if exists

                    var otherOutBool = otherObject.isIdInOutNodes(that.id);
                    //looking to see if Id exists in input list or output list
                    if (otherOutBool) {
                        that.addLink(that.id, true, that.outNodeIds[i], false);
                    }
                    else
                    {
                        console.log("id not in partner out nodes");
                    }

                } else {
                    console.log("link already exists");
                }
            }
        }
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








