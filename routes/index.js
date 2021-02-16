const express = require('express');
const router = express.Router(); // is used to create a new router object. This function is used when you want to create a new router object in your program to handle requests.
/* GET home page. */
router.get('/', function (req, res, next) { // this is the main page index
  res.render('index', { title: 'Express' });
});
module.exports = router;