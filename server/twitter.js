var router = require('express').Router();

router.post('/test', function(req, res) {
	//console.log(req.body);
	//res.send({msg: 'test'});
	console.log(req.session[status]);
	var status = req.session.status;
	if(req.session == undefined)
		res.status(403);

	switch(status) {
		case 'empty' : res.json({test: 'tweets'}); req.session.status = 'gotTweets'; break;
		case 'gotTweets' : res.json({data: 'anaylsis'}); break;
		//case 'analysis': res.json({}); break;
	}
})

module.exports = router;


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
          });

      });
    });*/