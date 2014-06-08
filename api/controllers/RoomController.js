/**
 * RoomController
 *
 * @description :: Server-side logic for managing Rooms
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*---------------------
 :: User
 -> controller
 ---------------------*/
var RoomController = {
    view: function(req, res) {
        //console.log(req.params.id);

        //res.view({ roomId: req.params.id});

        console.log("user: " + req.session.user);

        var id = req.params.id;
        if (!id) return res.send("No id specified.", 500);


        Room.find(id, function roomFound(err, room) {
            if(err) return res.sender(err,500);
            if(!room) return res.send("Room "+id+" not found", 404);


            if (req.session.user === undefined) {
                res.view({
                    "room": room[0],
                    "userId": req.session.user,
                    "userName" : undefined
                });
            }
            else
            {
                res.view({
                    "room": room[0],
                    "userId": req.session.user,
                    "userName" : req.session.user.username
                });
            }
        });

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
    },

    'new': function(req,res) {
        res.view();
    },

    create: function(req,res) {
        var params = _.extend(req.query || {}, req.params || {}, req.body || {});

        Room.create(params, function roomCreated (err, createdRoom) {

            if (err) return res.send(err,500);

            res.redirect('/room/list/'+ createdRoom.id);
        });
    },

    list: function (req, res) {
        Room.find(function(err, rooms){
            if (err) return res.send(err, 500);
            res.view({
                model: rooms
            });
        });
    },

    show: function (req,res) {

        var id = req.params.id;
        if (!id) return res.send("No id specified.", 500);


        Room.find(id, function roomFound(err, room) {
            if(err) return res.sender(err,500);
            if(!room) return res.send("Room "+id+" not found", 404);
            res.view({
                "room":room[0]
            })
        });
    },

    edit: function (req,res) {
        var id = req.params.id;

        if (!id) return res.send("No id specified.",500);
        Room.find(id, function roomFound (err,room){
            if (err) return res.send(err,500);
            if (!room) return res.send("Room "+id+" not found.",404);

            res.view({"room":room[0]});
        });
    },


    update: function (req,res) {

        var params = _.extend(req.query || {}, req.params || {}, req.body || {});
        var id = params.id;

        if (!id) return res.send("No id specified.",500);

        Room.update(id, params, function roomUpdated(err, updatedRoom) {
            if (err) {
                res.redirect('/room/edit');
            }
            if(!updatedRoom) {
                res.redirect('/room/edit');
            }
            res.redirect('/room/show/'+id);
        });
    },


    destroy: function (req,res) {
        var id = req.params.id;
        if (!id) return res.send("No id specified.",500);

        Room.find(id, function foundRoom(err, room) {
            if (err) return res.send(err,500);
            if (!room) return res.send("No room with that idid exists.",404);

            Room.destroy(id, function roomDestroyed(err) {
                if (err) return res.send(err,500);

                return res.redirect('/room');
            });

        })
    }


};
module.exports = RoomController;




