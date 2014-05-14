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
    var rad = 190;
    $(".small-circle").remove();
    var that = this;
    console.log(this.searchResults.length);
    for(var i = 0; i < this.searchResults.length; i++) {
        //This for just looping around in a circle (actually it works fine,
        // I just left the number of items in the final argument
        var x = this.x + 120 + rad * Math.cos(2 * Math.PI * i / this.searchResults.length);
        var y = this.y + rad * Math.sin(2 * Math.PI * i / this.searchResults.length);
        var searchNode = $.tmpl($("#tmpl-search-node").html(), {
            left: x,
            top: y,
            type:this.searchResults[i].type,
            id: this.searchResults[i].id,
            numberOfResults: this.searchResults[i].results.length
        });

        //Fucking stupid code, but it works, must do better property lookup search here
        $(searchNode).on("mouseenter", function () {
            for (var i = 0; i < that.searchResults.length; i++){
                if (that.searchResults[i].id === $(this).attr("id"))
                {
                    //console.log(that.searchResults[i]);
                    for (var j = 0; j < that.searchResults[i].results.length; j++) {
                        var x = that.x + 80 + (rad + (rad + (j * 150))) * Math.cos(2 * Math.PI * i / that.searchResults.length);
                        var y = that.y - 8 + (rad + (rad + (j * 150))) * Math.sin(2 * Math.PI * i / that.searchResults.length);
                        var resultNode = $.tmpl($("#" + that.searchResults[i].template).html(), {
                            left: x,
                            top: y,
                            title: that.searchResults[i].results[j].title,
                            image: that.searchResults[i].results[j].image
                        });
                        $("#canvas").append(resultNode);
                    }
                }
            }
        });

        $(searchNode).on("mouseout", function () {
            for (var i = 0; i < that.searchResults.length; i++) {
                if (that.searchResults[i].id === $(this).attr("id")) {
                    $(that.searchResults[i].cssClass).remove();
                }
            }
        });


        $("#canvas").append(searchNode);
        //console.log(this.searchResults[i].id);
        //console.log(i);
    }




}