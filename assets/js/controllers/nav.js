/**
 * Created by chris on 08/06/2014.
 */


var getNav = function(){
    var nav = {};

    nav.init = function(){

        $(document).ready(function(){
            $("#nav-back").on("click", function(){
                nav.back();
            });
            $("#nav-play").on("click", function(){
                nav.play();
            });
            $("#nav-forward").on("click", function(){
                nav.forwards();
            });
        });
    }


    nav.back = function(){
        world.currentNode.prev();
        alert("back is bit flakey");
    };

    nav.play = function(){

        var firstNode = window.world.nodes[0];

        if (firstNode == null)
        {
            alert("Please add a node");
            return;
        }
        firstNode.play();

    };

    nav.forwards = function(){
        world.currentNode.next();
    };




    nav.init();
    return nav;
}