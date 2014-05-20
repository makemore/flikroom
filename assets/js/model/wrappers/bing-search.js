/**
 * Created by chris on 13/05/2014.
 */

var BingSearch = function(){
    this.template = "tmpl-result-node-bing";
    this.cssClass = ".node-bing";
    this.type = "bing";
    this.results = [];
    this.id = "bingSearch";
    this.mock = false;
};



// Bing API 2.0 code sample demonstrating the use of the
// Web SourceType over the JSON Protocol.
BingSearch.prototype.search = function(term, callback)
{
    var that = this;
    if (!this.mock) {
        io.socket.request("/scrape/bingSearch", { term: term }, function (results) {
            for (var i = 0; i < results.SearchResponse.Web.Results.length; i++) {
                var item = {}
                item.title = results.SearchResponse.Web.Results[i].Title;
                item.url = results.SearchResponse.Web.Results[i].Url;
                item.description = results.SearchResponse.Web.Results[i].Description;
                item.id = item.url; //There isn't an id per result, so just use the full url

                //item.image = results.searchResponse.Web.Results[i].snippet.thumbnails.default.url;

                /*
                CacheUrl: "http://cc.bingj.com/cache.aspx?q=funky+shit&d=4974252028002954&w=f99dSwQzenTWBze1k8I6wlNAS_ilGl5F"
                DateTime: "2014-05-17T20:40:00Z"
                Description: "The Prodigy - Funky Shit Album: The Fat of the Land Copyright recordings, music and lyrics reproduced by kind permission of Take Me To The Hospital ..."
                DisplayUrl: "www.youtube.com/watch?v=fc07IVuw61o"
                Title: "The Prodigy - Funky Shit - YouTube"
                Url: "http://www.youtube.com/watch?v=fc07IVuw61o"
                */
                that.results.push(item);
            }
            callback(that);
        });
    }
    else
    {
        //mock data for testing
        for (var i = 0; i < 10; i++) {
            var item = {}
            item.title = "bing result " + i.toString();
            that.results.push(item);
        }
        callback(that);
    }
}


BingSearch.prototype.convertResultIntoNode = function(result, x, y){
    var webPage = new WebPage(x,y, result);
}
