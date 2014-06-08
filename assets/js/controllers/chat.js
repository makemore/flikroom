var flikApp = angular.module('flikApp', []);

angular.module('flikApp').directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});


flikApp.factory('socket', function ($rootScope) {
    var socket = io.socket;
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        request: function(url, data, callback) {
            socket.request(url, data, function () {
                console.log(url);
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        },
        post: function(url, data, callback) {
        socket.post(url, data, function () {
            console.log(url);
            var args = arguments;
            $rootScope.$apply(function () {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        })
    }
    };
});

flikApp.controller('ChatCtrl', function ($scope, socket) {

    $("#chats").animate({ scrollTop: $("#chats")[0].scrollHeight}, 1000);

    socket.request("/chat?room=" + roomId, null, function(chats){
        for (var i = 0; i < chats.length; i++)
        {
            if (chats[i].localName != undefined)
            {
                chats[i].username = chats[i].localName;
            }
        }
        $scope.chats = chats;
    });

    socket.request("/room/join", function(gotResponse) {
        // we don’t really care about the response
    });


    socket.on("chat", function(chat){
        console.log(chat);
        if (chat.verb == "created" && chat.data.room == roomId) {

            var chatObj = {};
            if (chat.data.localName === undefined)
            {
                chatObj.message = chat.data.message;
                chatObj.username = chat.data.user.username;
            }
            else
            {
                chatObj.message = chat.data.message;
                chatObj.username = chat.data.localName;
            }
            $scope.chats.push(chatObj);
        }
    });

    $scope.submitChat = function(event){
        //console.log($(event.target).val());
        //socket.post('/chat',{message: $(event.target).val()}, function (response) {
        //    // create a new chat
        //});

            if (userId === undefined)
            {
                if (window.world.localName === undefined) {
                    window.world.localName = prompt("Please enter your name", "Chaz");

                    if (window.world.localName == null) {
                        alert("must set name");
                        return;
                    }
                }

            }

        var chatObj = {};
        if (window.world.localName === undefined)
        {
            chatObj.message = $(event.target).val();
            chatObj.username = username;
        }
        else
        {
            chatObj.message = $(event.target).val();
            chatObj.username = window.world.localName;
        }
        $scope.chats.push(chatObj);

        if (userId != undefined) {
            io.socket.post("/chat", {message: $(event.target).val(), user: userId, room: roomId}, function (response) {
                console.log(response);
                //$scope.apply();
            });
        } else {
            io.socket.post("/chat", {message: $(event.target).val(), localName: window.world.localName, room: roomId}, function (response) {
                console.log(response);
                //$scope.apply();
            });
        }

        $(event.target).val("");
        $("#chats").animate({ scrollTop: $("#chats")[0].scrollHeight}, 1000);
    }


});

