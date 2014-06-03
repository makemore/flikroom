var NodeBase = function(params){
    this.node = params.node;
    this.type = params.type;
    this.setupBase();
    this.setupLinking();
    this.nodes = {
        inNodes: [],
        outNodes: []
    }
    this.links = [];
    //this.id = params.id; Can't store ID here, as it can't be changed after initalised, via prototype method?
    //Odd need to get better at this..
    //Now using this.node.id as location of id
    this.node.id = params.id;


    //These are not used at the moment (just direct access to this.node.id)
    this.setId = function(id) {
        this.id = id;
    }

    this.getId = function() {
        return this.id;
    }

}

NodeBase.prototype.setupBase = function(){
    var that = this;

    $(".node-close").on("click", that.node.$el, function(e){
       that.node.$el.remove();
       that.delete();
    });

    that.node.$el.draggable({ handle: ".node-menu" });
}



NodeBase.prototype.save = function(){
    //io.socket.put("/node/" + id, { x: $(this).css("left"), y: $(this).css("top")}, function(response)
    var that = this;
    io.socket.post("/node/", {
        x: that.node.x,
        y: that.node.y,
        room: roomId,
        type: that.type,
        result: that.node.result
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
}

NodeBase.prototype.delete = function(){
    var that = this;
    console.log(that.node.id);
    io.socket.delete("/node/" + that.node.id, {

        },
        function(response)
        {
            console.log(response);
        });
}

NodeBase.prototype.setupLinking = function(){
    var isDragging = false;
    var startLeft = 0;
    var startTop = 0;
    var that = this;
    var startingIn = true;
    var endingIn = true;
    var startId = null;
    var endId = null;

    $(".node-handle").on("mousedown", this.node.$el, function(e){
        //alert("here");
        //<path d="M78,303 C215,298 246,90 406,372" />
        //var path = document.createElement("path");
        e.preventDefault();
        e.stopPropagation();



        var player = $(e.currentTarget).parent().parent();

        startLeft = player.css("left").split("px")[0];
        startTop = player.css("top").split("px")[0];
        startLeft = parseInt(startLeft);
        startTop = parseInt(startTop) + player.height();

        if ($(e.currentTarget).hasClass("handle-output"))
        {
            startLeft = startLeft + player.width();
            startingIn = false;
        }
        startId = $(player).attr("id").split('-')[1];

        return false;
    });




    $(".node-handle").mouseup(function(e){

        //need to work out top left position
        //then just extend width and height of div based on bottom right

        e.preventDefault();
        e.stopPropagation();



        var player = $(e.currentTarget).parent().parent();

        var stopLeft = player.css("left").split("px")[0];
        var stopTop = player.css("top").split("px")[0];

        stopLeft = parseInt(stopLeft);
        stopTop = parseInt(stopTop) + player.height();

        if ($(e.currentTarget).hasClass("handle-output"))
        {
            stopLeft = stopLeft + player.width();
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


        endId = $(player).attr("id").split('-')[1];

        console.log(startId);

        var startNode = window.world.getNodeById(startId);

        console.log(endId);
        var endNode = window.world.getNodeById(endId);

        var nodeLink = new NodeLink(finalLeft, finalTop, width, height, topLeftToBottomRight);

        console.log(startNode);
        console.log(endNode);

        if (startingIn){
            startNode.addInNode(nodeLink);
        } else {
            startNode.nodes.outNodes.push(nodeLink);
        }

        if (endingIn)
        {
            endNode.nodes.inNodes.push(nodeLink);
        } else {
            endNode.nodes.outNodes.push(nodeLink);
        }
    });
}




NodeBase.prototype.addInNode = function(nodeLink){
    //io.socket.put("/node/" + id, { x: $(this).css("left"), y: $(this).css("top")}, function(response)
    var that = this;
    that.nodes.inNodes.push(nodeLink);

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
}


NodeBase.prototype.baseFunction = function(){
    //everyone can do this
}