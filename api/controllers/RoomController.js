/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    view: function(req, res) {
        console.log(req.params.id);
        res.view({ "roomId" : req.params.id });
    },
    join: function(req, res) {
        //console.log("here");
        // Lookup a user

        /*
         Room.findOne(req.params.id).done(function(err, room) {
         // we now have a model with instance methods attached
         // update an attribute value
         //user.email = 'foo.bar@gmail.com';
         // save the updated value
         //user.save(function(err) {
         // value has been saved
         //});
         room.subscribe(req.socket);
         });*/

        Chat.watch(req);
        Node.watch(req);
        //Chat.find().exec(function (err, chats) {
            // Subscribe the requesting socket (e.g. req.socket) to all users (e.g. users)
        //});
    }
};

