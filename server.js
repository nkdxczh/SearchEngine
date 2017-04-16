//---------------------------------------------------------------------------------------------
//                                             Node Modules Here
var express = require('express');
var path = require('path');
var url = require('url');
var app = express();


//---------------------------------------------------------------------------------------------
//                                              Port Information
var PORT = 3333;
app.listen(PORT, () =>{
    console.log('listening on PORT 3333');
});

//-----------------------------------------------------------------------------------------------
//                                            Static File Server
app.use(express.static('public'));

//-----------------------------------------------------------------------------------------------
//                                              Routing Information

app.get('/query', (req, res) =>{
    //var queryObject = url.parse(req.url, true);
    //var path = queryObject.path;
    //var params = queryObject.query;
    console.log('path is: ' + req.url);
    //console.log('params are: ' + params);
    res.writeHead(200);
    res.write("got it");
    res.end();
});

