const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );

var express = require('express');
var router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
  const $ = require( "jquery" )( window );
              //hash password
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash('interativa',salt,
                (err,hash)=> {
                    if(err) throw err;
                        console.log(hash)
                }));
});

// Desconectando o usuário
//logout
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','Desconectado com sucesso.');
  res.redirect('/login'); 
})
// Conectando o usuário
router.post('/',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect : '../',
    failureRedirect: '/login',
    failureFlash : true
  })(req,res,next)
})



module.exports = router;
