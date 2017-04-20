$(document).ready(function () {
    $("#searchButton").click(function () {
        var query = $("#searchBar").val();
        console.log("query is: " + query);
        var xhr = new XMLHttpRequest();
        //xhr.onload = function () {
        //    console.log("the data from the server is: " + xhr.response);
        //};
        xhr.open("POST", "http://127.0.0.1:9200/_search?pretty");
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    console.log(xhr.responseText);
                    var jsonResponse = JSON.parse(xhr.responseText);
                    results = jsonResponse.hits.hits;
                    for(i = 0; i < results.length; i++){
                        result = results[i];
                        console.log(result._source.name);
                    }

                }
        };
        xhr.send(JSON.stringify({"query": {"match" : {"column" : query}}}));
    });
});