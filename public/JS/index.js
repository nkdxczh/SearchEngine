//html box vars
var searchResult = "<article class='search-result row'> \
                        <div class='col-xs-12 col-sm-12 col-md-3'> \
                            <a href='#' title='' class='thumbnail'><img src='http://lorempixel.com/250/140/people' alt='Lorem ipsum' /></a> \
                        </div> \
                        <div class='col-xs-12 col-sm-12 col-md-2'> \
                            <ul class='meta-search'> \
                                <li><i class='glyphicon glyphicon-calendar'></i> <span>02/15/2014</span></li> \
                                <li><i class='glyphicon glyphicon-time'></i> <span>4:28 pm</span></li> \
                                <li><i class='glyphicon glyphicon-tags'></i> <span>People</span></li> \
                            </ul> \
                        </div> \
                        <div class='col-xs-12 col-sm-12 col-md-7 excerpet'> \
                            <h3><a id='title' href='#' title=''>Title Here</a></h3> \
                            <p id='description'>Description Here \
                            </p> \
                            <span class='plus'><a href='#' title='Lorem ipsum'><i class='glyphicon glyphicon-plus'></i></a></span> \
                        </div> \
                        <span class='clearfix borda'></span> \
                    </article>"

$(document).ready(function () {
    var index = '';
    $("#searchButton").click(function () {
        $("#toggelVisibility").css("visibility", "visible");
        var query = $("#searchBar").val();
        console.log("query is: " + query);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(xhr.response);
            displayData(JSON.parse(xhr.response), query);
        }
        xhr.open("GET", "/query?q=" + query + "&index=" + index);
        xhr.send();
    });

    //Record the index chosen for the drop down selected
    $("#indexSelect li a").click(function() {
        index = $(this).text();
        console.log('index selected is: ' + index);
    });
});

function displayData(jData, query) {
    var results = jData.hits.total;
    console.log(results);
    $("#matches").text(results);
    $("#displayQuery").text(query);
    jData.hits.hits.forEach(function (element) {
        let id = element._id;
        let title = element._source.name;
        let description = element._source.description;
        console.log("title is: " + title + "\ndescription is: " + description);
        let display = $(searchResult);
        $("#append").append(display);
        //change title and description id
        $("article").last().attr('id', id);
        $("#" + id + " div h3 a").text(title);
        $("#" + id + " div p").text(description);
    });

}
