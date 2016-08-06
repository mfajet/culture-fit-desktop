var Twitter = require('twitter-node-client').Twitter;
var config = require('../config.js');

var twitter = new Twitter(config);
var success = function(data){
  var tweets = JSON.parse(data);
  var fivePop=[tweets[0],tweets[1],tweets[2],tweets[3],tweets[4]];
  tweets.map(function(obj){
    var nums = obj.favorite_count + obj.retweet_count;
    if(nums>=(tweets[0].favorite_count + tweets[0].retweet_count)){
      tweets[4]=tweets[3];
      tweets[3]=tweets[2];
      tweets[2]=tweets[1];
      tweets[1]=tweets[0];
      tweets[0]=obj;
    }else if(nums>(tweets[1].favorite_count + tweets[1].retweet_count)){
      tweets[4]=tweets[3];
      tweets[3]=tweets[2];
      tweets[2]=tweets[1];
      tweets[1]=obj;
    }else if(nums>(tweets[2].favorite_count + tweets[2].retweet_count)){
      tweets[4]=tweets[3];
      tweets[3]=tweets[2];
      tweets[2]=obj;
    }else if(nums>(tweets[3].favorite_count + tweets[3].retweet_count)){
      tweets[4]=tweets[3];
      tweets[3]=obj;
    }else if(nums>(tweets[4].favorite_count + tweets[4].retweet_count)){
      tweets[4]=obj;
    }
  });
  console.log(fivePop.length);
};
var error = function(err, response, body){
  console.log('ERROR [%s]', body);

};
twitter.getUserTimeline({ screen_name: 'MarkFajita',include_rts:"false", count: '200'}, error, success);