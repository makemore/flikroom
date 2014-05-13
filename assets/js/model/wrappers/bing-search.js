/**
 * Created by chris on 13/05/2014.
 */

var BingSearch = function(){

    this.template = "tmpl-result-node-youtube";
    this.cssClass = ".node-youtube";
    this.results = [];
    //this.init();
    this.AppId = "49EB4B94127F7C7836C96DEB3F2CD8A6D12BDB71";
};



// Bing API 2.0 code sample demonstrating the use of the
// Web SourceType over the JSON Protocol.
BingSearch.prototype.search = function()
{
    var requestStr = "http://api.bing.net/json.aspx?"

        // Common request fields (required)
        + "AppId=" + this.AppId
        + "&Query=msdn blogs"
        + "&Sources=Web"

        // Common request fields (optional)
        + "&Version=2.0"
        + "&Market=en-us"
        + "&Adult=Moderate"
        + "&Options=EnableHighlighting"

        // Web-specific request fields (optional)
        + "&Web.Count=10"
        + "&Web.Offset=0"
        + "&Web.Options=DisableHostCollapsing+DisableQueryAlterations"

        // JSON-specific request fields (optional)
        + "&JsonType=callback"
        + "&JsonCallback=BingSearchCompleted";

    var requestScript = document.getElementById("searchCallback");
    requestScript.src = requestStr;
    console.log(requestStr);
}

window.BingSearchCompleted = function (response)
{
    var errors = response.SearchResponse.Errors;
    if (errors != null)
    {
        // There are errors in the response. Display error details.
        //DisplayErrors(errors);
        console.log(errors);
    }
    else
    {
        // There were no errors in the response. Display the
        // Web results.
        //DisplayResults(response);
        console.log(response);
    }
}