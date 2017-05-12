//html box vars
var searchResult = "<article class='search-result row'> \
                    <div class='col-xs-12 col-sm-12 col-md-3'> \
                    <a href='#' title='' class='thumbnail'><img src='https://www.agileconnection.com/sites/default/files/article/2017/education-2.jpg' alt='Lorem ipsum' /></a> \
                    </div> \
                    <div class='col-xs-12 col-sm-12 col-md-2'> \
                    <ul class='meta-search'> \
                    <li id='li1'><i class='glyphicon glyphicon-calendar'></i> <span></span></li> \
                    <li id='li2'><i class='glyphicon glyphicon-time'></i> <span></span></li> \
                    <li id='li3'><i class='glyphicon glyphicon-tags'></i> <span></span></li> \
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

var searchArray;

$(document).ready(function () {
    var index = 'all';
    $("#searchButton").click(function () {
        //delete array and append data
        searchArray = new Array();
        $("#append").children().remove();
        $("#pageNum").children().remove();
        $("#append").innerHTML = "";
        $("#toggelVisibility").css("visibility", "visible");
        var query = $("#searchBar").val();
        console.log("query is: " + query);
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            console.log(xhr.response);
            displayData(JSON.parse(xhr.response), query);
        }
        //split query 'index:term;'
        var queryArray = query.split(";");
        var fields = new Array();
        var terms = new Array();
        queryArray.forEach((element) => {
            //now get field and term
            if (element.split(":").length != 2) {
                fields.push("_all");
                terms.push(element.split(":")[0]);
            }
            else {
                fields.push(element.split(":")[0]);
                terms.push(element.split(":")[1]);
            }
        });
        xhr.open("GET", "/query?fields=" + fields + "&terms=" + terms + "&index=" + index);
        xhr.send();
    });

    //Record the index chosen for the drop down selected
    $("#indexSelect li a").click(function () {
        index = $(this).text();
        console.log('index selected is: ' + index);
    });
});

function displayData(jData, query) {
    var results = jData.hits.total;
    //need to get the number of pages that need to be rendered
    var pages = Math.ceil(results / 10);
    var i;
    for (i = 1; i <= pages; i++) {
        $("#pageNum").append("<li id='link" + i + "' ><a href='#'>" + i + "</a></li>");
    }
    $("#link1").toggleClass('active');
    $("#pageNum li").click(function () {
        $(".active").toggleClass('active');
        $(this).toggleClass("active");
        populatePage($(".active").attr('id').replace("link", ""));
    });
    console.log(results);
    $("#matches").text(results);
    $("#displayQuery").text(query);
    $("#append").empty();
    jData.hits.hits.forEach(function (element) {
        //populate array
        searchArray.push(element);
    });
    populatePage(1);
}

function populatePage(page) {
    console.log("page is: " + page);
    //first remove all the previous search data
    $("#append").children().remove();
    var minRange = (page - 1) * 10;
    var maxRange = page * 10;
    for (minRange; minRange < maxRange; minRange++) {
        var element = searchArray[minRange];
        if (element._type == "line") {
            let id = "line" + element._id;
            let title = element._source.file;
            let description = "The " + element._source.line + " row."
            let pubDate = element._source.modified;
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            let tag = element._source.field;
            let display = $(searchResult);
            $("#append").append(display);
            $("article").last().attr('id', id);
            $("#" + id + " div h3 a").text(title);
            $("#" + id + " div p").text(description);
            $("#" + id + " #li1 span").text(pubDate);
            $("#" + id + " #li2 span").text(time);
            $("#" + id + " #li3 span").text(tag);
        }
        else {
            let id = "meta" + element._id;
            let title = element._source.name;
            let description = element._source.description;
            let pubDate = element._source.modified;
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes();
            let tag = element._source.field;
            console.log("pubDate: " + pubDate + " time: " + time + " tag: " + tag);
            let display = $(searchResult);
            $("#append").append(display);
            //change title and description id
            $("article").last().attr('id', id);
            $("#" + id + " div h3 a").text(title);
            $("#" + id + " div h3 a").attr('href', element._source.url);
            $("#" + id + " div p").text(description);
            $("#" + id + " #li1 span").text(pubDate);
            $("#" + id + " #li2 span").text(time);
            $("#" + id + " #li3 span").text(tag);
        }
    }
}
