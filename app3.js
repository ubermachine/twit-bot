var Twit = require("twit");
var config = require("./congig.js");


const fs = require('fs');

var T = new Twit(config);


const replies = [
    "फ़ॉलो karo","फ़ॉलो kariye FB jarur milega","Guaranteed FB","फॉलो करें और फॉलो बैक पाएं","फ़ॉलोबेक pakka","फ़ॉलो permanent","फ़ॉलो back sabko milega","फ़ॉलो karo i FB","I FB","I follow back","Apko hi follow back milega","hume follow karo"
    ]
//const stream = T.stream('statuses/filter', {track: 'फ़ॉलोबेक','follow back'},{ follow: '110156719' });

const termsToTrack = ["%फ़ॉलोबेक(",'फ़ॉलोबेक','फॉलो']
const special=[ "+", "-", "&&", "||", "!", "(", ")", "{", "}", "[", "]", "^",
"~", "*", "?", ":","\"","\\"]
const emoji=["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]
   setInterval(() => {
       const stream = T.stream('statuses/filter', {track:termsToTrack, tweet_mode:'extended'  })
    
    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }




function responseCallback (err, data, response) {
 console.log(err);


}

stream.on('tweet', function (tweet) {

    // We perform some checks before we send anyone a tweet.
    if(
    // We don't want our bot to reply to retweets
        !tweet.retweeted_status
        &&
    // It's important that our twitter bot doesn't respond to itself.
    // So we check if the tweet is from our handle
        tweet.user.screen_name !== "uberBhakt"
        &&
    // The twitter stream api send us a lot of tweets that aren't exact matches of our text
    // so we double check with a function
        isTweetExactMatch(tweet.text)
        
    
    ){
    // If the tweet matches all the above criteria, we send our reply
    // Note - here the tweet parameter refers to the tweet we're replying to.
    console.log('before');
//wait(60000);  //7 seconds in milliseconds

    sendReply(tweet);
    console.log('after');
         }
         //setTimeout(() => {  console.log("Wait!"); }, 60000);
      })
    
    
    // A function to check if the tweets have exact matches for our search terms.
    function isTweetExactMatch(text){
        // Make sure the text is in lowercase
        //text = text.toLowerCase()
        // Check if tweet contains an exact match of the phrases we're looking for.
        return termsToTrack.some(term => text.includes(term))
    };
    
function sendReply(tweet){
		
    // get the screen name of the twitter account - we'll need to prepend our response with this in order to reply.
    var screenName = tweet.user.screen_name
              
    // All our tweets will have the same instructions on how to quit twitter
    const instructions = '@uberBhakt'
    console.log('before1111');
   // wait(60000);  //7 seconds in milliseconds
    //await new Promise(resolve => setTimeout(resolve, 60000));     
   // const delay = require('delay');

    // Now we create the reply - the handle + a random reply from our set of predefined replies + the instructions on how to quit
    var response =  '@' + screenName +' '+ special[Math.floor(Math.random() * replies.length)]+ instructions + ' ' + replies[Math.floor(Math.random() * replies.length)] + ' ' +Math.floor(Math.random() * 10000)+'%'+emoji[Math.floor(Math.random() * replies.length)]
            
        T.post('statuses/update', {
            // To reply we need the id of tweet we're replying to.
            in_reply_to_status_id:tweet.id_str,
            // Status is the content of the tweet, we set it to the response string we made above.
            status:response
            // After we tweet we use a callback function to check if our tweet has been succesful.
        })
        console.log('before5555');
        stream.stop()
      
    }
},39000)
    


//stream.on('tweet', tweet => {

 //   console.log(tweet.text)

  //T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);



 // T.post('favorites/create', {id: tweet.id_str}, responseCallback);



//});

var retweet = function() {
    var params = {
      q: 'follow back, फ़ॉलोबेक,फॉलो',
      result_type: 'recent',
      lang: 'hi'    
    } 

T.get('search/tweets', params, function(err, data) {
    // if there no errors
      if (!err) {
        // grab ID of tweet to retweet
          var retweetId = data.statuses[0].id_str;
          // Tell TWITTER to retweet
          T.post('statuses/retweet/:id', {
              id: retweetId
          }, function(err, response) {
              if (response) {
                  console.log('Retweeted!!!');
              }
              // if there was an error while tweeting
              if (err) {
                  console.log('Something went wrong while RETWEETING... Duplication maybe...');
              }
          });
      }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...');
      }
  });
}
  // grab & retweet as soon as program is running...

  // retweet in every 5 minutes
  //setInterval(retweet, 500000);
