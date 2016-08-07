var router = require('express').Router();

var twitter = require('./getTweets.js');
var popTweets = require('./getNotableTweets.js');

router.post('/data', function(req, res) {
	//console.log(req.body);
	//res.send({msg: 'test'});
	var status = req.session.status;
	if(req.session == undefined)
		res.status(403);
	sendFirstTweets(res, req);
	switch(status) {
		case 'empty' : sendFirstTweets(res, req); req.session.status = 'gotTweets'; break;
		case 'gotTweets' : sendAnaylsis(res, req); break;
		//case 'analysis': res.json({}); break;
	}
})

module.exports = router;

function sendFirstTweets(res, req) {
	//res.json({test: 'tweets'});
	var screen_name = req.body.screen_name;
	popTweets(function(data, screen_name){
  	var tweets = JSON.parse(data);
 	var fivePop=[tweets[0],tweets[1],tweets[2],tweets[3],tweets[4]];
  	for(var i=5;i<tweets.length;i++){
		var obj = tweets[i];
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
  };
  console.log(fivePop);
	res.json(fivePop);
});

}

function sendAnaylsis(res, req) {
	//res.json({data: 'anaylsis'});
	var screen_name = req.body.screen_name;	
	twitter(function (data) {
      var fs = require('fs');
      fs.writeFile("./test.JSON", data, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          const exec = require('child_process').exec;

          exec("Rscript TopFiveFriends.R ./test.JSON", (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log('stdout: ' + stdout );
            var fiveNames = stdout.split('\n');
            fiveNames.pop();

            var i = fiveNames.indexOf(username);
            if(i>=0){
              fiveNames.splice(i,1);
            }else {
              fiveNames.pop();
            }
            fiveNames.map(function(str){
                twitter.getUser({screen_name: str}, error, namesSuccess);
              });
            console.log('stderr: '+ stderr);
            console.log(fiveNames);
          })

      }
    )})
    var config = require('../config.js');

    var twitter = new Twitter(config);

    var username = 'MarkFajita';
    var fiveUsers = [];

var counter =0;
    var namesSuccess = function(data){
      fiveUsers.push(data);
      counter++;
      if(counter>=5){
        //console.log("KERLIN SEND IT");
		res.json(fiveUsers);
      }
    }
}


//var twitter = require('./getTweets.js');

/*twitter(function (data) {
      var fs = require('fs');
      fs.writeFile("./test.JSON", data, function(err) {
          if(err) {
              return console.log(err);
          }

          console.log("The file was saved!");
          const exec = require('child_process').exec;
          exec("R CMD BATCH '--args ./test.JSON' simpleRFile.R", (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            console.log(start-Date.now());
			fs.readFile('./data.json', function read(err, data) {
    			if (err) {
        			throw err;
   	 			}
    				res.json(JSON.parse(data));
				});
          });

      });
    });*/
