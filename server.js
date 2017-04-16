//---------------------------------------------------------------------------------------------
//                                             Node Modules Here
var express = require('express');
var path = require('path');
var url = require('url');
var request = require('request');
var app = express();


//---------------------------------------------------------------------------------------------
//                                              Port Information
var PORT = 3333;
app.listen(PORT, () => {
    console.log('listening on PORT 3333');
});

//-----------------------------------------------------------------------------------------------
//                                            Static File Server
app.use(express.static('public'));

//-----------------------------------------------------------------------------------------------
//                                              Routing Information

app.get('/query', (req, res) => {
    //var queryObject = url.parse(req.url, true);
    //var path = queryObject.path;
    //var params = queryObject.query;
    console.log('path is: ' + req.url);
    //call elasticsearch api

    //console.log('params are: ' + params);
    request("http://localhost:9200/_search?pretty", {
        "query": {
            "match": {
                "column": "year"
            }
        }
    }, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.writeHead(200);
        res.write(body);
        res.end();
    });
});

