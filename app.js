var Twit = require("twit");
var config = require("./congig.js");
var T = new Twit(config);

//const stream = T.stream('statuses/filter', {track: '#JavaScript'});
T.get("search/tweets", { q: "'follow back' (hindu OR RSS OR sanghi OR proud Hindu OR indian OR modi OR BJP OR हिन्दू", count: 10 }, gotData);
// event handlerconsole.log(err
// use this to log errors from requests
//setInterval(tweeter, 60*60*1000);
function responseCallback(err, data, response) {
  console.log(err);
}

function gotData(err, data) {
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text, "\n");
  }
}
//T.post('statuses/update', { status: 'I am tweeting via the API!' }, tweeted);
// event handler
//  stream.on('tweet', tweet => {
//    // retweet
//   T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
// like
//  T.post('favorites/create', {id: tweet.id_str}, responseCallback);
//});

stream.on('follow', function (eventMsg) {
  //...
})