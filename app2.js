var Twit = require("twit");
var config = require("./congig.js");


const fs = require('fs');

var T = new Twit(config);

var options = { user_id: '119009405',
                count: 5,
                tweet_mode:'extended',};

T.get('statuses/user_timeline', options  , function(err, data) {
  for (var i = 0; i < data.length ; i++) {
    console.log(data[i].full_text);
    fs.writeFileSync('users.txt', data[i].full_text);
  }
})
