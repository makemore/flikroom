/**
 * Created by chris on 11/05/2014.
 */

var YouTubeSearch = function(name){
    this.name = name;
    this.type = "youtube";
    this.template = "tmpl-result-node-youtube";
    this.cssClass = ".node-youtube";
    this.results = [];
    this.id = "youtubeSearch";


    this.mock = true;
    if (!this.mock)
    {
        this.init();
    }

};



YouTubeSearch.prototype.init = function(){
    if (typeof gapi === 'undefined') {
        //could have another test here to only load the general google api && youtube api load
        var tag = document.createElement('script');
        tag.src = "https://apis.google.com/js/client.js?onload=youtubeDataApiReady";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        window.youtubeDataApiReady = function () {
            console.log("google api ready");
            gapi.client.setApiKey('AIzaSyBaKhPo_fVbVtM5ZFvEhGv2pAz7bJDCQcE');
            //gapi.client.load('urlshortener', 'v1', makeRequest);
            gapi.client.load('youtube', 'v3', function () {
                //handleAPILoaded();
                console.log("youtube data api loaded");
            });
        }
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    else
    {
        console.log("api already loaded");
    }
}


YouTubeSearch.prototype.search = function(term, callback){
    var that = this;
    if (!this.mock) {
        var request = gapi.client.youtube.search.list({
            q: term,
            part: 'snippet'
        });

        request.execute(function (youtubeData) {
            for (var i = 0; i < youtubeData.items.length; i++) {
                var item = {}
                item.title = youtubeData.items[i].snippet.title;
                item.image = youtubeData.items[i].snippet.thumbnails.default.url;
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
            item.title = "dummy item " + i.toString();
            //item.image = youtubeData.items[i].snippet.thumbnails.default.url;
            that.results.push(item);
        }
        callback(that);
    }

}