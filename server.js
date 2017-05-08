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

var bod = {
    "from": 0, "size": 100,
    "query": {
        "bool" : {
            "must": []
        }
    }
};

var meta =  "http://localhost:9200/meta/_search?pretty";
var line = "http://localhost:9200/line/_search?pretty";
var all = "http://localhost:9200/_search?pretty"

function makeOptions() {

    var bodStr = JSON.stringify(bod);
    var options = {
        url: all,
        "headers": {
            "Content-Type": "application/json"
        },
        body: bodStr
    };
    return options;
}

app.get('/query', (req, res) => {
    console.log('path is: ' + req.url);
    console.log('the fields is: ' + req.query.fields);
    console.log('the terms is: ' + req.query.terms);
    var fields = req.query.fields.split(",");
    var terms = req.query.terms.split(",");
    var i = 0;
    var length = Math.min(fields.length, terms.length);
    console.log(length);
    for(i; i < length; i++){
        var match={};
        match[fields[i]] = terms[i];
        var temp = {
            match
        };
        bod.query.bool.must.push(temp);
        console.log(JSON.stringify(bod));
    }
    //bod.query.match._all = query;
    var options = makeOptions();
    // console.log("parameters are: " + params);
    //call elasticsearch api

    //console.log('params are: ' + params);
    request(options, (error, response, body) => {
        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        //console.log('body:', body);
        res.writeHead(200);
        res.write(body);
        res.end();
    });
});

