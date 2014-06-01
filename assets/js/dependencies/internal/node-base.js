var NodeBase = function(node){
    this.node = node;
    this.setupBase();
    this.setupLinking();
}

NodeBase.prototype.setupBase = function(){
    var that = this;
    this.node.$el.find(".node-close").on("click", function(){
        $(that.node.$el[0]).remove();
    });
    this.node.$el.draggable({ handle: ".node-menu" });


}

NodeBase.prototype.setupLinking = function(){
    var isDragging = false;
    var startLeft = 0;
    var startTop = 0;

    $(".node-handle").on("mousedown", this.node.$el, function(e){
        //alert("here");
        //<path d="M78,303 C215,298 246,90 406,372" />
        //var path = document.createElement("path");
        e.preventDefault();
        e.stopPropagation();

        /*
         $(window).mousemove(function() {
         isDragging = true;
         $(window).unbind("mousemove");
         });
         */
        /*
         console.log(e);
         var player = $(e.currentTarget).parent().parent();
         $("#canvas").append("<svg height='210' width='400' style='position:absolute;left:" + player.css("left") + ";top:" + player.css("top") + ";z-index:1000;'><path d='M85,65 C339,66 170,369 406,372 Z' /></svg>");
         */
        console.log("down");

        var player = $(e.currentTarget).parent().parent();

        startLeft = player.css("left").split("px")[0];
        startTop = player.css("top").split("px")[0];
        startLeft = parseInt(startLeft);
        startTop = parseInt(startTop) + player.height();

        if ($(e.currentTarget).hasClass("handle-output"))
        {
            startLeft = startLeft + player.width();
        }

        //dropTempMarker(startLeft,startTop, "s");
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


        var nodeLink = new NodeLink(finalLeft,finalTop,width,height, topLeftToBottomRight);

    });
}



NodeBase.prototype.baseFunction = function(){
    //everyone can do this
}