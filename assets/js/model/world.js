/**
 * Created by chris on 02/06/2014.
 */

var World = function(){
    this.nodes = [];
    this.nextClientId = 0;
    this.startId;
    this.startInput;
}


World.prototype.getNodeById = function(id){
    return $.grep(this.nodes, function(e){ return e.id == id; })[0];
}

World.prototype.addNodeToWorld = function(node){
    this.nodes.push(node);
}

World.prototype.getNextClientId = function(){
    this.nextClientId++;
    return this.nextClientId;
}