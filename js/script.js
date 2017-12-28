
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    console.log(streetStr);
    var cityStr = $('#city').val();
    console.log(cityStr);
    var address = streetStr + ', ' + cityStr;
    console.log(address);

    $greeting.text("You want to live at " + address + "?");
    
    // load streetview
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'&key=AIzaSyBxtalzcguz43BLusrYHhB9fhnTGzFHzRo';
    
    // YOUR CODE GOES HERE!
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+"&sort=newest&api-key=d44a602ce5264126b5a156c672cb3b0e";
    
    $.getJSON(nytimesUrl, function(data){
        console.log(data);

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+'<p>'+article.snippet+'</p>'+'</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    var wikipediaUrl = "http://en.wikiasdfasdfpedia.org/w/api.php?action=opensearch&search="+cityStr+"&format=json&callback=wikiCallbak";

    $.ajax({
        url: wikipediaUrl,
        dataType: "jsonp",
        success: function(response){
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articlesStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/'+articlesStr;
                $wikiElem.append('<li><a href="' + url + '">'+articlesStr+'</a></li>');
            }
        }
    })
};

// $('#form-container').submit(loadData);
