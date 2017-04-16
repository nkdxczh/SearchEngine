$(document).ready(function(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        console.log("the data from the server is: " + xhr.response);
    };
    xhr.open("GET", "/query?q=cat");
    xhr.send();
});