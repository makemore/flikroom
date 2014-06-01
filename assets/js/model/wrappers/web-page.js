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


var getWebPage = function(x, y, result) {

    var webPage = {}
    webPage.x = x;
    webPage.y = y;

    var webPageHtml = $.tmpl($("#tmpl-web-page").html(), {
        description: result.description
    });

    var html = $.tmpl($("#tmpl-node-base").html(), {
        title: result.title,
        left: x,
        top: y,
        body: $(webPageHtml[0]).html(),
        className: "node-web-page"
    });

    $("#canvas").append(html);

    webPage.$el = $(html);

    webPage.$el.on("click", function(){
        console.log($(this).data("url"));
    });


    webPage.$el.resizable({
        handles: 'se',
        //aspectRatio: 2 / 1
        stop: function(event, ui){
            webPage.$el.find("iframe").width(webPage.$el.width());
            webPage.$el.find("iframe").height(webPage.$el.height());
        }
    });
    webPage.$el.find("iframe").width(webPage.$el.width());
    webPage.$el.find("iframe").height(webPage.$el.height());

    var webPage = Object.create(new NodeBase(webPage));
    return webPage;
}

