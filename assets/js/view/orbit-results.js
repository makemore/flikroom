/**
 * Created by chris on 11/05/2014.
 */

var OrbitResults = function(x,y){
    this.x = x;
    this.y = y;
    this.searchResults = [];
};

OrbitResults.prototype.init = function(){

}




OrbitResults.prototype.addResultSet = function(searchResult){
    var result = $.grep(this.searchResults, function(e){ return e.type === searchResult.type; });
    if (result.length === 0)
    {
        this.searchResults.push(searchResult);
    }
    else
    {
        result[0].results = result[0].results.concat(searchResult.results);
    }
    this.render();
}

OrbitResults.prototype.render = function(){
    var rad = 140;
    $(".small-circle").remove();
    for(var i = 0; i < this.searchResults.length; i++) {
        //This for just looping around in a circle (actually it works fine,
        // I just left the number of items in the final argument
        var x = this.x + 80 + rad * Math.cos(2 * Math.PI * i / this.searchResults.length);
        var y = this.y - 8 + rad * Math.sin(2 * Math.PI * i / this.searchResults.length);
        var searchNode = $.tmpl($("#tmpl-search-node").html(), { left: x, top: y});
        $("#canvas").append(searchNode);
    }
}