/**
 * Created by chris on 11/05/2014.
 */

var OrbitFilterResults = function(x,y){
    this.x = x;
    this.y = y;
    this.searchResults = [];
};

OrbitFilterResults.prototype.init = function(){

}




OrbitFilterResults.prototype.addResultSet = function(searchResult){
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

OrbitFilterResults.prototype.render = function(){
    var that = this;
    var rad = 120;
    $(".small-circle").remove();
    var center = $.tmpl($("#tmpl-search-node").html(), {
        left: that.x,
        top: that.y,
        type: "c",
        id: "c",
        numberOfResults: "c"
    });
    //$("#canvas").append(center); Debug center point
    for(var i = 0; i < this.searchResults.length; i++) {
        //This for just looping around in a circle (actually it works fine,
        // I just left the number of items in the final argument
        var x = this.x + rad * Math.cos(2 * Math.PI * i / this.searchResults.length);
        x = x - 17.5; //center compensation
        var y = this.y + rad * Math.sin(2 * Math.PI * i / this.searchResults.length);
        var searchNode = $.tmpl($("#tmpl-search-node").html(), {
            left: x,
            top: y,
            type:this.searchResults[i].type,
            id: this.searchResults[i].id,
            numberOfResults: this.searchResults[i].results.length
        });
        this.searchResults[i].resultsShown = false;
        //Fucking stupid code, but it works, must do better property lookup search here
        $(searchNode).on("click", function () {
            $(".search-result").remove();            
            for (var i = 0; i < that.searchResults.length; i++){
                if (that.searchResults[i].id === $(this).attr("id"))
                {

                    var searchProvider = that.searchResults[i];
                    var halfOfWidthOfResult = 120 /2;
                    if (!searchProvider.resultsShown) {
                        //console.log(that.searchResults[i]);
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
                        that.searchResults[i].resultsShown = !that.searchResults[i].resultsShown;
                    }
                    else {
                        $(that.searchResults[i].cssClass).remove();
                        that.searchResults[i].resultsShown = !that.searchResults[i].resultsShown;
                    }
                }
            }
        });




        /*
        $(searchNode).on("mouseout", function () {
            for (var i = 0; i < that.searchResults.length; i++) {
                if (that.searchResults[i].id === $(this).attr("id")) {
                    $(that.searchResults[i].cssClass).remove();
                }
            }
        });
        */
        $("#canvas").append(searchNode);
    }




}