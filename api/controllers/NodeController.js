/**
 * NodeController
 *
 * @description :: Server-side logic for managing Nodes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */




module.exports = {
    addNodeLink:function(req, res){
        var startId = req.param('startId');
        var startInput = req.param('startInput');
        var endId = req.param('endId');
        var startInput = req.param('endInput');

        Node.find(startId, function roomFound(err, node) {
            if(err) return res.sender(err,500);
            if(!node) return res.send("node "+id+" not found", 404);




            if (node.indexOf(addId) >= 0) {
                res.send({response: "link already in node"});
            } else {
                if (node.inNodes === undefined) node.inNodes = [];
                node.inNodes.push(addId);


                Node.update(id, {inNodes: node.inNodes }, function nodeUpdated(err, updatedNode) {
                    if (err) {
                        //res.redirect('/room/edit');
                        console.log(err);
                    }
                    if(!updatedNode) {
                        //res.redirect('/room/edit');
                        console.log("not updated");
                    }
                    res.send(updatedNode);
                });
            }
        });
    }
};

