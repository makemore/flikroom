var nodeBase = function(params) {
    var that = {};
    that.id = params.id; //just pure ID
    that.x = params.x;
    that.y = params.y;
    that.type = params.type;
    //that.$el = params.$el; set in child object
    that.result = params.result;
    that.local = params.local;

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
            console.log(response);
            if (that.local)
            {
                that.$el.attr("id", "node-" + response.id);
                console.log(that);
                that.id = response.id;
                //CAN'T FUCKING GET ACCESS TO ROOT OBJECT!
                //OK, so can't directly access root variables, but can access sub properties of objects.. Odd

                console.log(that.id);
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

        $(".node-handle").on("mousedown", this.$el, function (e) {
            //alert("here");
            //<path d="M78,303 C215,298 246,90 406,372" />
            //var path = document.createElement("path");


            var player = $(e.currentTarget).parent().parent();

            startId = player.attr("id").split('-')[1];

            if ($(e.currentTarget).hasClass("handle-output")) {
                startInput = false;
            }
            e.preventDefault();
            e.stopPropagation();

            return false;
        });


        $(".node-handle").mouseup(function (e) {

            //need to work out top left position
            //then just extend width and height of div based on bottom right

            e.preventDefault();
            e.stopPropagation();


            var player = $(e.currentTarget).parent().parent();

            if ($(e.currentTarget).hasClass("handle-output")) {
                endInput = false;
            }


            endId = $(player).attr("id").split('-')[1];


            var startNode = window.world.getNodeById(startId);

            var endNode = window.world.getNodeById(endId);

            var nodeLink = new NodeLink(startId, endId, startInput, endInput);

            if (startingIn) {
                startNode.addInNode(nodeLink);
            } else {
                startNode.nodes.outNodes.push(nodeLink);
            }

            if (endingIn) {
                endNode.nodes.inNodes.push(nodeLink);
            } else {
                endNode.nodes.outNodes.push(nodeLink);
            }
        });

    }

    that.initBase = function(){
        that.setupBase();
        that.setupLinking();
    }

    return that;
}

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












NodeBase.prototype.addInNode = function(nodeLink){
    //io.socket.put("/node/" + id, { x: $(this).css("left"), y: $(this).css("top")}, function(response)
    var that = this;
    that.nodes.inNodes.push(nodeLink);


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
}


NodeBase.prototype.baseFunction = function(){
    //everyone can do this
}