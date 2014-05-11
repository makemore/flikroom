/**
 * Created by chris on 11/05/2014.
 */

var YouTubeSearch = function(name){
    this.name = name;
    this.init();
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
    var request = gapi.client.youtube.search.list({
        q: term,
        part: 'snippet'
    });

    request.execute(function(response) {
        //var responseArray = [];
        //for(var i = 0; i<response.items.length; i++)
        //{
        //    responseArray.push(response.items[i].snippet.title)
        //}
        // return response;
        callback(response);
        //var str = JSON.stringify(response.result);
        //$('#search-container').html('<pre>' + str + '</pre>');
        //console.log()
    });
}