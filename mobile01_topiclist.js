var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');
var iconv = require('iconv-lite'); // 用來轉碼
moment.locale("zh-tw");
var async = require('async');
var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true,
    poolSize: 10
});
var db = new mongodb.Db('FAKE', mongodbServer);


for (var page = 1; page <= 1; page++) {

    var p_url = "http://www.mobile01.com/topiclist.php?f=566&p=" + page;

    var options = {
        url: p_url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36',
        }
    };
    console.log(p_url);
    request(options, function(error, response, body) {
        // console.log(error);
        if (error) return console.log(error)

        $ = cheerio.load(body);

        //爬主題下的回文
        $('tr').each(function(i, elem) {

            var desc = $(elem).find('.subject-text a').text()
            var href = "http://www.mobile01.com/" + $(elem).find('.subject-text a').attr('href')
            var dt = $(elem).find('p').first().text()
            var authur = $(elem).find('p').last().text()


            console.log("===============");
            console.log("主題：" + desc);
            console.log("主題url：" + href);
            console.log("發文時間：" + dt);
            console.log("發文作者：" + authur);

        });

    });
} //for