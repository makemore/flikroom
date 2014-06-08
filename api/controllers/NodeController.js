/**
 * NodeController
 *
 * @description :: Server-side logic for managing Nodes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */




module.exports = {
    addNodeLink:function(req, res){
        var startId = parseInt(req.param('startId'));
        var startInput = req.param('startInput');
        var endId = parseInt(req.param('endId'));
        var endInput = req.param('endInput');

        console.log(startId);
        console.log(startInput);
        console.log(endId);
        console.log(endInput);

        var saveThing = function(node, reference){
            Node.update(node.id, reference, function nodeUpdated(err, updatedNode) {
                if (err) {
                    //res.redirect('/room/edit');
                    console.log(err);
                }
                if(!updatedNode) {
                    //res.redirect('/room/edit');
                    console.log("not updated");
                }

                Node.publishUpdate(node.id, reference, req.socket);

                res.send(updatedNode);
            });
        };

        Node.findOne(startId, function roomFound(err, node) {
            if (err) return res.sender(err, 500);
            if (!node) return res.send("node " + startId + " not found", 404);

            if (startInput) {
                if (node.inNodeIds === undefined) node.inNodeIds = [];
                if (node.inNodeIds.indexOf(endId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.inNodeIds.push(endId)
                    saveThing(node, {inNodeIds: node.inNodeIds });
                }
            } else {
                if (node.outNodeIds === undefined) node.outNodeIds = [];
                if (node.outNodeIds.indexOf(endId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.outNodeIds.push(endId);
                    console.log(node);
                    saveThing(node, {outNodeIds: node.outNodeIds });
                }
            }
        });

        Node.findOne(endId, function roomFound(err, node) {
            if (err) return res.sender(err, 500);
            if (!node) return res.send("node " + endId + " not found", 404);

            if (endInput) {
                if (node.inNodeIds === undefined) node.inNodeIds = [];
                if (node.inNodeIds.indexOf(startId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.inNodeIds.push(startId)
                    saveThing(node, {inNodeIds: node.inNodeIds });
                }
            } else {
                if (node.outNodeIds === undefined) node.outNodeIds = [];
                if (node.outNodeIds.indexOf(startId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.outNodeIds.push(startId);
                    console.log(node);
                    saveThing(node, {outNodeIds: node.outNodeIds });
                }
            }
        });

    }
};

