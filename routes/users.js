var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register',function(req,res,next){
  res.render('register');
})

router.get('/location',function(req,res,next){
  res.render('location');
})



router.post('/register',function(req,res,next){
  console.log(req.body);
})

module.exports = router;
