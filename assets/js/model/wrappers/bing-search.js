/**
 * Created by chris on 13/05/2014.
 */

var BingSearch = function(){

    this.template = "tmpl-result-node-bing";
    this.cssClass = ".node-bing";
    this.type = "bing";
    this.results = [];
    //this.init();
};



// Bing API 2.0 code sample demonstrating the use of the
// Web SourceType over the JSON Protocol.
BingSearch.prototype.search = function(term, callback)
{
    var that = this;
    io.socket.request("/scrape/bingSearch", { term : term }, function(results){
        //
        console.log(results);

        for (var i=0;i<results.SearchResponse.Web.Results.length;i++)
        {
            var item = {}
            item.title = results.SearchResponse.Web.Results[i].Title;
            //item.image = results.searchResponse.Web.Results[i].snippet.thumbnails.default.url;
            that.results.push(item);
        }
        callback(that);
    });
}

