/**
 * Created by chris on 11/05/2014.
 */

var OmniBox = function(name,x,y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.init();
    this.bingSearchResults = null;
    this.youtubeSearchResults = null;
    this.justResults;
};

OmniBox.prototype.search = function(val, type){
    var that = this;
    var link = URI(val);

    if (link.is("absolute"))
    {
        console.log("absolute");
    }
    else if (link.is("relative"))
    {

        switch(type) {
            case "page":
                var bingSearch = new BingSearch();
                bingSearch.search(val, function(response){
                    //orbiter.addResultSet(response);
                    //that.bingSearchResults = response;
                    that.justResults.addResults(response);
                });
                break;
            case "video":
                var youtubeSearch = new YouTubeSearch("youtube");
                youtubeSearch.search(val, function(response){
                    //orbiter.addResultSet(response);
                    that.justResults.addResults(response);
                    //that.youtubeSearchResults = response;
                });
                break;
            default:
                alert("not sure")
                break;
        }
    }
    else if (link.is("urn"))
    {
        console.log("urn");
    }
    else if (link.is("url"))
    {
        console.log("url");
    }
    else
    {
        console.log(link);
    }
}


OmniBox.prototype.init = function(){
    var inputBox = $.tmpl($("#tmpl-search-box").html(), { left: this.x, top: this.y});
    inputBox = $(inputBox);
    $("#canvas").append(inputBox);

    inputBox.find(".filter-container").on("click",function(){
        inputBox.find(".filter-dropdown").toggle();
    });

    inputBox.find(".close-omni").on("click",function(){
        inputBox.remove();
        $(".search-result").remove();
    });

    var inputField = inputBox.find(".uberbox");
    var youtubeSearch = new YouTubeSearch("YouTubeSearch");
    inputField.focus();
    this.numberOfResults = 0;
    var halfSizeOfField = $(inputBox).width()/2;
    console.log(halfSizeOfField);
    var orbiter = new OrbitFilterResults(this.x + halfSizeOfField, this.y);
    this.justResults = new OrbitResults(this.x + halfSizeOfField, this.y);

    var that = this;

    $(".filter-option").on("click", inputBox , function(){
        inputBox.find(".filter-dropdown").toggle();
        that.search(inputField.val(), $(this).data("type"));
    });
    inputField.keypress(function(event) {
        if (event.keyCode == 13) {
            var filterSelection = $(inputBox).find(".filter-icon");
            that.search($(this).val(), filterSelection.data("type"));
        } else {
            //just typing into the box
        }
    });


    /*
     inputField.autocomplete({
     source: function(request, outerResponse)
     {
     console.log("testing");
     youtube.search(request.term, function(response){
     console.log(response);
     outerResponse( $.map( response.items, function(item) {
     console.log(item);
     return {
     label: item.snippet.title,
     value: item.id.videoId
     }
     }));
     });
     //console.log(test);
     },
     minLength: 2,
     select: function( event, ui ) {
     youtube.init(ui.item.value);
     inputField.remove();
     }
     });
     */

    //var youtube = new YouTubePlayer("YouTube", e.offsetX, e.offsetY);


    //if (userId == undefined)
    //{
    //    alert("must be logged in for this");
    //    return;
    //}

    //addNodeToCanvas("temp", e.offsetX - 50, e.offsetY - 50);
    //io.socket.post("/node", {x:e.offsetX - 50, y:e.offsetY - 50, room: roomId, user: userId}, function(response){
    //    $("#node-temp").attr("id", "node-" + response.id);
    //});
}