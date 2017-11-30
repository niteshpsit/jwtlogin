var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config');
/* GET home page. */
router.post('/login', function(req, res, next) {

  let { username, password } = req.body;
  if(username !== config.username || password !== config.password){
    res.status(403).json({ success: false, message: 'Authentication failed. Wrong password.' });
    return;
  }

  let payload = { username, password };
  var token = jwt.sign(payload, config.secret, {
    expiresIn: 1440 // expires in 24 hours
  });

  // return the information including token as JSON
  res.json({
    success: true,
    message: 'Enjoy your token!',
    token: token
  });

});

module.exports = router;
