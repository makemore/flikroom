/**
 * ScrapeController
 *
 * @description :: Server-side logic for managing Scrapes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    getLinksFromUrl: function(req, res) {
        //var url = req.param('url');
        var searchTerm = req.param('term');
        var url = 'http://www.bing.com/search?q=' + searchTerm;
        var request = require('request')
            , cheerio = require('cheerio');

        request("http://" + url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // Print the google web page.

                $ = cheerio.load(body);
                //var links = $('a'); //use your CSS selector here
                var links = $('.sb_tlst h3 a');
                var responseArray = []
                $(links).each(function(i, link){
                    //console.log($(link).text() + ':\n  ' + $(link).attr('href'));
                    responseArray.push($(link).attr('href'));
                });
                res.send(responseArray);

            }
        });


        /*
        request('http://' + url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
                $ = cheerio.load(body);
                var links = $('a'); //use your CSS selector here
                //console.log(body);

                $(links).each(function(i, link){
                    console.log($(link).text() + ':\n  ' + $(link).attr('href'));
                });
            }
        })
        */
        /*
         var searchTerm = 'screen+scraping';
         var url = 'http://www.bing.com/search?q=' + searchTerm;
         */
        /*
        request(url, function(err, resp, body){
            console.log(resp);
            console.log(body);
            //$ = cheerio.load(body);
            //var links = $('a'); //use your CSS selector here
            //console.log(body);

            $(links).each(function(i, link){
                //console.log($(link).text() + ':\n  ' + $(link).attr('href'));
            });
        });
        */

        /*
        $('h2.title').text('Hello there!');
        $('h2').addClass('welcome');

        $.html();
        //=> <h2 class="title welcome">Hello there!</h2>
        */

    },
    bingSearch:function(req, res){
        var searchTerm = req.param('term');
        var AppId = "49EB4B94127F7C7836C96DEB3F2CD8A6D12BDB71";
        var url = "http://api.bing.net/json.aspx?"
            // Common request fields (required)
            + "AppId=" + AppId
            + "&Query=" + searchTerm
            + "&Sources=Web"
        var request = require('request')
            , cheerio = require('cheerio');

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body) // Print the google web page.

                console.log(JSON.parse(body));
                res.send(JSON.parse(body));

                /*
                $ = cheerio.load(body);
                //var links = $('a'); //use your CSS selector here
                var links = $('.sb_tlst h3 a');
                var responseArray = []
                $(links).each(function(i, link){
                    //console.log($(link).text() + ':\n  ' + $(link).attr('href'));
                    responseArray.push($(link).attr('href'));
                });
                res.send(responseArray);
                */

            } else
            {
                console.log(response);
                console.log(error);
            }
        });

    }

};

