$(document).ready(function () {
    $("#searchButton").click(function () {
        var query = $("#searchBar").val();
        console.log("query is: " + query);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log("the data from the server is: " + xhr.response);
        };
        xhr.open("GET", "/query?q=" + query);
        xhr.send();
    });
});