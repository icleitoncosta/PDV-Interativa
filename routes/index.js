const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const {ensureAuthenticated} = require('../config/auth') 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, (req, res, next)=>{
  res.render('index', { title: 'PDV Gráfica Interativa', user: req.user });
  const $ = require( "jquery" )( window );
});

module.exports = router;
