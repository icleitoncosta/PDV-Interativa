var express = require('express');
var router = express.Router();
var moment = require('moment');
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

// Clientes model
const Cliente = require('../models/clientes');

/* GET clients listing. */
router.get('/', ensureAuthenticated, (req, res, next)=> {

	var clientesListAll = function(callback){
		Cliente.find({}, callback).sort({ nome: 'asc' });
	} 

	clientesListAll(function(err, docs){
		
  		res.render('clientes', {title: 'Clientes - PDV Interativa', clientList: docs, user: req.user });
	});


});

// Formulário para adicionar novo cliente
router.get('/novo',ensureAuthenticated, function(req, res, next) {

  	res.render('clientes/novo', {title: 'Novo Cliente - PDV Interativa', user: req.user});

});
// Adicionando novo cliente 
router.post('/novo', ensureAuthenticated, [
  body('inputNome').isLength({ min: 5 }),
  body('inputDoc').isLength({ min: 10 })
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let cliente = new Cliente();
    cliente.nome = req.body.inputNome.toLowerCase();
    cliente.documento = req.body.inputDoc.replace(/[^\d]+/g,"");
    cliente.dn = req.body.inputdataNascimento.replace(/[^\d]+/g,"");
    cliente.telefone = req.body.inputTelefone.replace(/[^\d]+/g,"");
    cliente.celular = req.body.inputCelular.replace(/[^\d]+/g,"");
    cliente.email = req.body.inputEmail.toLowerCase();
    cliente.logradouro = req.body.inputLogradouro.toLowerCase();
    cliente.numero = req.body.inputNumero;
    cliente.bairro = req.body.inputBairro.toLowerCase();
    cliente.cidade = req.body.inputCidade.toLowerCase();
    cliente.uf = req.body.inputEstado.toLowerCase();
    cliente.cep = req.body.inputCEP.replace(/[^\d]+/g,"");
    cliente.create_date = moment().format();
    cliente.block = req.body.restringir;
    cliente.info = req.body.inputInfo;

    cliente.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/pdv');
      }
    });
});

// Formulário para editar um cliente
router.get('/edit/:id', ensureAuthenticated, (req, res, next)=> {
	var cliente = function(callback){
		Cliente.findById(req.params.id, callback);
	} 

	// Pegando dados do cliente e passando para renderizar na pagina
	cliente(function(err, cliente){
		
  		res.render('clientes/edit', {title: 'Cadastro - PDV Interativa', cliente: cliente });
	});

});
// Editando o cliente (tratando o recebimento do POST)
router.post('/edit/:id', ensureAuthenticated, [
  body('inputNome').isLength({ min: 5 }),
  body('inputDoc').isLength({ min: 10 })
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let cliente = {};
    cliente.nome = req.body.inputNome.toLowerCase();
    cliente.documento = req.body.inputDoc.replace(/[^\d]+/g,"");
    cliente.dn = req.body.inputdataNascimento.replace(/[^\d]+/g,"");
    cliente.telefone = req.body.inputTelefone.replace(/[^\d]+/g,"");
    cliente.celular = req.body.inputCelular.replace(/[^\d]+/g,"");
    cliente.email = req.body.inputEmail.toLowerCase();
    cliente.logradouro = req.body.inputLogradouro.toLowerCase();
    cliente.numero = req.body.inputNumero;
    cliente.bairro = req.body.inputBairro.toLowerCase();
    cliente.cidade = req.body.inputCidade.toLowerCase();
    cliente.uf = req.body.inputEstado.toLowerCase();
    cliente.cep = req.body.inputCEP.replace(/[^\d]+/g,"");
    cliente.create_date = moment().format();
    cliente.block = req.body.restringir;
    cliente.info = req.body.inputInfo;

    let query = {_id: req.params.id};

    Cliente.update(query, cliente, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/pdv/'+req.params.id);
      }
    });
});

// Deletando o cliente
router.delete('/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    
    Cliente.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});

// Getando clientes com aquela busca e informando
router.get('/busca/:word', ensureAuthenticated, function(req, res, next) {
  let q = req.params.word;
  let query = {
    "$or": [{"nome": {"$regex": q, "$options": "i"}}, {"documento": {"$regex": q, "$options": "i"}}, {"telefone": {"$regex": q, "$options": "i"}}, {"celular": {"$regex": q, "$options": "i"}}]
  };
  let output = [];

  Cliente.find(query).limit(6).then( usrs => {
      if(usrs && usrs.length && usrs.length > 0) {
          usrs.forEach(user => {
            let obj = {
                value: user._id,
                label: user.nome,
                desc: user.documento
            };
            output.push(obj);
          });
      }
      res.jsonp(output);
  })


});



module.exports = router;
