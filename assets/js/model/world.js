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


    world.getNodeById = function(id){
        return $.grep(this.nodes, function(e){ return e.id == id; })[0];
    }

    world.addNodeToWorld = function(node){
        world.nodes.push(node);

        console.log(node);
        //loop through all in and out nodes and see if they are already drawn on the page properly..
        if (node.inNodeIds != undefined) {
            for (var i = 0; i < node.inNodeIds.length; i++) {
                var existingLink = world.getLinkByIds(node.id, node.inNodeIds[i]);
                if (existingLink == null) {

                    var otherObject = world.getNodeById(node.inNodeIds[i]);
                    //get other object

                    if (otherObject == undefined)
                    {
                        console.log("other object not ready yet");
                        return;
                    }
                    //check in list and add nodes if exists

                    var otherInBool = otherObject.isIdInInNodes(node.id);
                    //looking to see if Id exists in input list or output list
                    if (otherInBool) {
                        node.addLink(node.id, true, node.inNodeIds[i], true);
                    }

                    //check out list and add nodes if exists

                    var otherOutBool = otherObject.isIdInOutNodes(node.id);
                    //looking to see if Id exists in input list or output list
                    if (otherOutBool) {
                        node.addLink(node.id, true, node.inNodeIds[i], false);
                    }

                } else {
                    console.log("link already exists");
                }
            }
        }

        if (node.outNodeIds != undefined) {
            for (var i = 0; i < node.outNodeIds.length; i++) {
                var existingLink = world.getLinkByIds(node.id, node.outNodeIds[i]);
                if (existingLink == null) {
                    var otherObject = world.getNodeById(node.outNodeIds[i]);
                    //get other object

                    if (otherObject == undefined)
                    {
                        console.log("other object not ready yet");
                        return;
                    }
                    //check in list and add nodes if exists

                    var otherInBool = otherObject.isIdInInNodes(node.id);
                    //looking to see if Id exists in input list or output list
                    if (otherInBool) {
                        node.addLink(node.id, true, node.outNodeIds[i], true);
                    }
                    //check out list and add nodes if exists

                    var otherOutBool = otherObject.isIdInOutNodes(node.id);
                    //looking to see if Id exists in input list or output list
                    if (otherOutBool) {
                        node.addLink(node.id, true, node.outNodeIds[i], false);
                    }
                } else {
                    console.log("link already exists");
                }
            }
        }
    }

    world.getLinkByIds = function(id1, id2){
        var firstDirection = $.grep(this.links, function(e){ return (e.startId == id1 && e.endId == id2); })[0];
        if (firstDirection != null)
        {
            return firstDirection;
        }
        else
        {
            var secondDirection = $.grep(this.links, function(e){ return (e.startId == id2 && e.endId == id1); })[0];
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

    return world;
}

