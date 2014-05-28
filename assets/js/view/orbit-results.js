/**
 * Created by chris on 11/05/2014.
 */

var OrbitResults = function(x,y){
    this.x = x;
    this.y = y;
    this.searchResults = [];
    this.resultObject = null;
};

OrbitResults.prototype.init = function(){

}




OrbitResults.prototype.addResults = function(searchResults){
    this.resultObject = searchResults;
    this.render();
}

OrbitResults.prototype.render = function(){
    var that = this;
    var rad = 120;
    var center = $.tmpl($("#tmpl-search-node").html(), {
        left: that.x,
        top: that.y,
        type: "c",
        id: "c",
        numberOfResults: "c"
    });
    //$("#canvas").append(center); Debug center point
    $(".search-result").remove();
    var searchProvider = that.resultObject;
    var halfOfWidthOfResult = 120 / 2;
    for (var j = 0; j < searchProvider.results.length; j++) {
        var result = searchProvider.results[j];
        var x = that.x + (rad * 1.9) * Math.cos(2 * Math.PI * j / searchProvider.results.length);
        x = x - 60; //center compensation
        var y = that.y + (rad * 1.9) * Math.sin(2 * Math.PI * j / searchProvider.results.length);
        y = y - 30; //center compensation
        //var x = that.x  + (rad + (rad + (j * 150))) * Math.cos(2 * Math.PI * i / that.searchResults.length);
        //var y = that.y - 8 + (rad + (rad + (j * 150))) * Math.sin(2 * Math.PI * i / that.searchResults.length);
        var resultNode = $.tmpl($("#" + searchProvider.template).html(), {
            left: x,
            top: y,
            title: result.title,
            image: result.image,
            id: result.id
        });
        console.log("here");
        $("#canvas").append(resultNode);
        $(resultNode).draggable({
            stop: function(e,ui) {
                var that = this;
                var result = $.grep(searchProvider.results, function(e){ return e.id == $(that).data("id"); });
                searchProvider.convertResultIntoNode(result[0], ui.position.left, ui.position.top);
                $(this).remove();
            }
        });
    }
}