/**
 * Created by chris on 11/05/2014.
 */

var OmniBox = function(name,x,y){
    this.name = name;
    this.x = x;
    this.y = y;
    this.init();
};

OmniBox.prototype.init = function(){
    var inputField = $.tmpl($("#tmpl-search-box").html(), { left: this.x, top: this.y});
    inputField = $(inputField);
    $("#canvas").append(inputField);
    var youtubeSearch = new YouTubeSearch("YouTubeSearch");

    inputField.focus();
    this.numberOfResults = 0;
    var that = this;
    var orbiter = new OrbitResults(this.x, this.y);

        inputField.keypress(function(event) {
        if (event.keyCode == 13) {

            var link = URI($(this).val());

            if (link.is("absolute"))
            {
                console.log("absolute");
            }
            else if (link.is("relative"))
            {
                var searchResult = {
                    type : "youtube" + that.numberOfResults,
                    results : ["result1", "result2", "result3"]
                }
                that.numberOfResults++;
                orbiter.addResultSet(searchResult);
                console.log("relative");
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

            /*
            console.log("here");
            io.socket.request("/scrape/getLinksFromUrl", { url : $(this).val() }, function(links){
                console.log(links);
            });
            */

            //  youtube.init();
            //  $(this).remove();
        } else {
            // var val = $(this).val();
            // if (val.length > 1) {
            //     youtubeSearch.search($(this).val());
            // }
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