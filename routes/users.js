var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var config = require('../config');


router.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
 
      if (token) {
    
        jwt.verify(token, config.secret, function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            req.decoded = decoded;    
            next();
          }
        });
    
      } else {

        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    
      }
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({users:[
    {firstName:"FIRST USER",lastName:"LAST NAME"},
    {firstName:"SECOND USER",lastName:"LAST NAME"},
  ]})
});

module.exports = router;
