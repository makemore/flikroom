/**
 * Created by chris on 19/05/2014.
 */

/**
 * Created by chris on 10/05/2014.
 */

/*
 //Define a functional object to hold persons in JavaScript
 var Person = function(name) {
 this.name = name;
 };

 //Add dynamically to the already defined object a new getter
 Person.prototype.getName = function() {
 return this.name;
 };

 //Create a new object of type Person
 var john = new Person("John");

 //Try the getter
 alert(john.getName());

 //If now I modify person, also John gets the updates
 Person.prototype.sayMyName = function() {
 alert('Hello, my name is ' + this.getName());
 };

 //Call the new method on john
 john.sayMyName();

 */

var WebPage = function(x, y, result){
    this.x = x;
    this.y = y;
    var webPageNode = $.tmpl($("#tmpl-web-page").html(), {
        left: x,
        top: y,
        title: result.title,
        url: result.url,
        description: result.description
    });
    webPageNode = $(webPageNode);
    $("#canvas").append(webPageNode);

    webPageNode.find(".node-close").on("click", function(){
        $(webPageNode).remove();
    });

    webPageNode.on("click", function(){
        console.log($(this).data("url"));
    });

    webPageNode.draggable({ handle: ".node-menu" });

    webPageNode.resizable({
        handles: 'se',
        //aspectRatio: 2 / 1
        stop: function(event, ui){
            webPageNode.find("iframe").width(webPageNode.width());
            webPageNode.find("iframe").height(webPageNode.height());
        }
    });
    webPageNode.find("iframe").width(webPageNode.width());
    webPageNode.find("iframe").height(webPageNode.height());

};

WebPage.prototype.init = function(id) {

};