var NodeBase = function(params){
    this.node = params.node;
    this.type = params.type;
    this.setupBase();
    this.setupLinking();
    this.inNodes = [];
    this.outNodes = [];
    this.links = [];
    this.id = params.id;


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
            that.prototype.id = response.id;
            //CAN'T FUCKING GET ACCESS TO ROOT OBJECT!
            console.log(that);
        }

    });
}

NodeBase.prototype.delete = function(){
    var that = this;
    console.log(that);
    io.socket.delete("/node/" + this.getId(), {

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

    console.log("setup linking");

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
        }

        console.log(that);

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

        console.log(player);
        var nodeLink = new NodeLink(finalLeft,finalTop,width,height, topLeftToBottomRight);

    });
}



NodeBase.prototype.baseFunction = function(){
    //everyone can do this
}