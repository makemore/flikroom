


var NodeLink = function(x,y,width,height, topLeftToBottomRight){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.topLeftToBottomRight = topLeftToBottomRight;
    this.init();
    this.el = null;
};

NodeLink.prototype.init = function(){
    var center;

    /*
     start point startX
     control point 1
     control point 2
     end

     sX,sY,
     c1X,c1Y,
     c2X,c2Y,
     eX,eY
     */

    if (this.topLeftToBottomRight)
    {
        center = $.tmpl($("#tmpl-node-path").html(), {
            left: this.x,
            top: this.y,
            width: this.width,
            height: this.height,
            sX : 0,
            sY : 0,
            c1X : this.width / 2,
            c1Y : 0,
            c2X : this.width / 2,
            c2Y : this.height,
            eX : this.width,
            eY : this.height
        });
    } else {
        center = $.tmpl($("#tmpl-node-path").html(), {
            left: this.x,
            top: this.y,
            width: this.width,
            height: this.height,
            sX : 0,
            sY : this.height,
            c1X : this.width / 2,
            c1Y : this.height,
            c2X : this.width / 2,
            c2Y : 0,
            eX : this.width,
            eY : 0
        });
    }
    this.el = $(center)[0];
    $("#canvas").append(center);
}