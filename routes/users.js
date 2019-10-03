var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('./../config');
var access_token
var sender_psid

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next){
  res.render('register');
})

router.get('/landing',function(req,res,next){
  res.render('landing');
})

router.post('/register',function(req,res,next){
  console.log(req.body);
})

router.get('/location/accesstoken/:access_token/senderpsid/:sender_psid',function(req,res,next){
 //console.log(req.params);

  access_token = req.params.access_token
  sender_psid = req.params.sender_psid

  res.render('location');  
})

router.post('/location',function(req,res,next){
  console.log(req.body);

  location = {
    "Latitude":req.body.Latitude,
    "Longitude":req.body.Longitude
  }

  console.log(location)
  console.log("Access Token " + access_token)
  console.log("Sender Id " + sender_psid)

  callSendAPI(location, access_token, location)

  res.redirect('landing')

})

router.get('/delivery/accesstoken/:access_token/senderpsid/:sender_psid',function(req,res,next){
  //console.log(req.params);
 
   access_token = req.params.access_token
   sender_psid = req.params.sender_psid
 
   res.render('delivery');  
 })

router.post('/delivery',function(req,res,next){
  console.log(req.body)
  res.redirect('landing')
})




// Sends response messages via the Send API

function callSendAPI(sender_psid,access_token ,response) {
  // Construct the message body
  console.log('message to be sent: ', response);
  let request_body = {
      "recipient": {
          "id": sender_psid
      },
      "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
      "uri": `${config.FACEBOOK_GRAPH_API_BASE_URL}me/messages`,
      "qs": {
          "access_token": access_token
      },
      "method": "POST",
      "json": request_body
  }, (err, res, body) => {
      if (!err) {
          console.log('message sent!')
      } else {
          console.error("Unable to send message:" + err);
      }
  });
}

module.exports = router;
