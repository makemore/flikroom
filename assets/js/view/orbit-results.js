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
    var that = this;
    for(var i = 0; i < this.searchResults.length; i++) {
        //This for just looping around in a circle (actually it works fine,
        // I just left the number of items in the final argument
        var x = this.x + 80 + rad * Math.cos(2 * Math.PI * i / this.searchResults.length);
        var y = this.y - 8 + rad * Math.sin(2 * Math.PI * i / this.searchResults.length);
        var searchNode = $.tmpl($("#tmpl-search-node").html(), {
            left: x,
            top: y,
            type:this.searchResults[i].results.length,
            id: this.searchResults[i].id
        });
        $("#canvas").append(searchNode);
        console.log(that.searchResults[i].id);
        $("#" + this.searchResults[i].id).on("mouseenter", function(){
            console.log(that.searchResults[i-1]);
            console.log(that.searchResults[i-1].template);
            for(var j=0; j<that.searchResults[i-1].results.length;j++)
            {
                var x = that.x + 80 + (rad + (rad + (j * 150)))  * Math.cos(2 * Math.PI * i / that.searchResults.length);
                var y = that.y - 8 + (rad + (rad + (j * 150))) * Math.sin(2 * Math.PI * i / that.searchResults.length);
                var resultNode = $.tmpl($("#" +  that.searchResults[i-1].template).html(), {
                    left: x,
                    top: y,
                    title:that.searchResults[i-1].results[j].title,
                    image:that.searchResults[i-1].results[j].image
                });
                $("#canvas").append(resultNode);
            }
        });

        $(searchNode).on("mouseout", function(){

            $(that.searchResults[i-1].cssClass).remove();
        });

    }
}