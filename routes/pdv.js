var express = require('express'), cookieParser = require('cookie-parser');
const { body, validationResult } = require('express-validator');
const {ensureAuthenticated} = require('../config/auth') 
var router = express.Router();


/* GET pdv home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('pdv', { title: 'PDV - PDV Gráfica Interativa', user: req.user });
});


// Criando um Cookie
router.post('/createCookie', ensureAuthenticated, function(req, res){

  res.cookie(req.body.cookie_name, req.body.cookie_value); 
  res.send('');
  console.log('cookie created successfully');

});

//Iterate users data from cookie 
router.get('/getCart', ensureAuthenticated, (req, res)=>{ 
	//shows all the cookies 
	res.send(req.cookies['cartData']); 
}); 
//Iterate users data from cookie 
router.get('/getCartTime', ensureAuthenticated, (req, res)=>{ 
	//shows all the cookies 
	res.send(req.cookies['cartTime']); 
}); 

//Route for destroying cookie 
router.get('/clearCart', ensureAuthenticated, (req, res)=>{ 
	res.clearCookie('cartData'); 
	res.send('Carrinho limpo com sucesso!'); 
}); 
  
module.exports = router;
