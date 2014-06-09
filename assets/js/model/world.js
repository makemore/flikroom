/**
 * Created by chris on 02/06/2014.
 */

var getWorld = function(){
    var world = {}
    world.nodes = [];
    world.links = [];
    world.nextClientId = 0;
    world.startId;
    world.startInput;

    world.currentNode = null;

    world.getNodeById = function(id){
        return $.grep(this.nodes, function(e){ return e.id == id; })[0];
    }

    world.addNodeToWorld = function(node){
        world.nodes.push(node);
        console.log(node);
        node.drawLinks();
    }

    world.getLinkByIds = function(id1, id2){
        var firstDirection = $.grep(world.links, function(e){ return (e.startId == id1 && e.endId == id2); })[0];
        if (firstDirection != null)
        {
            return firstDirection;
        }
        else
        {
            var secondDirection = $.grep(world.links, function(e){ return (e.startId == id2 && e.endId == id1); })[0];
            return secondDirection;
        }
    }

    world.addLinkToWorld = function(link){
        world.links.push(link);
    }


    world.getNextClientId = function(){
        world.nextClientId++;
        return world.nextClientId;
    }

    world.moveTo = function(x,y){
        $("#canvas").animate({
            left: x,
            top: y
        }, 2000, function() {
            // Animation complete.
        });
    };


    return world;
}

