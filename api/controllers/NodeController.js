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
                console.log("saved");
                console.log(updatedNode);
                res.send(updatedNode);
            });
        };

        Node.findOne(startId, function roomFound(err, node) {
            if (err) return res.sender(err, 500);
            if (!node) return res.send("node " + startId + " not found", 404);

            if (startInput) {
                if (node.inNodes === undefined) node.inNodes = [];
                if (node.inNodes.indexOf(endId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.inNodes.push(endId)
                    saveThing(node, {inNodes: node.inNodes });
                }
            } else {
                if (node.outNodes === undefined) node.outNodes = [];
                if (node.outNodes.indexOf(endId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.outNodes.push(endId);
                    console.log(node);
                    saveThing(node, {outNodes: node.outNodes });
                }
            }
        });

        Node.findOne(endId, function roomFound(err, node) {
            if (err) return res.sender(err, 500);
            if (!node) return res.send("node " + endId + " not found", 404);

            if (endInput) {
                if (node.inNodes === undefined) node.inNodes = [];
                if (node.inNodes.indexOf(startId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.inNodes.push(startId)
                    saveThing(node, {inNodes: node.inNodes });
                }
            } else {
                if (node.outNodes === undefined) node.outNodes = [];
                if (node.outNodes.indexOf(startId) >= 0) {
                    res.send({response: "link already in node"});
                } else {
                    node.outNodes.push(startId);
                    console.log(node);
                    saveThing(node, {outNodes: node.outNodes });
                }
            }
        });

    }
};

