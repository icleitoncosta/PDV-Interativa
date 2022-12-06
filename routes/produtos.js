var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

// models
const Produto = require('../models/produtos');
const Atributo = require('../models/atributos');

/* GET produtos listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	var produtosListAll = function(callback){
		Produto.find({}, callback).sort({ nome: 'asc' });
	} 
	produtosListAll(function(err, docs){
  		res.render('produtos', {
  			title: 'Produtos - PDV Interativa', 
  			produtosList: docs });
	});
});

// Formulário para adicionar novo produto
router.get('/novo', ensureAuthenticated, function(req, res, next) {
	var atributosListAll = function(callback){
		Atributo.find({}, callback).sort({ nome: 'asc' });
	} 
	atributosListAll(function(err, docs){
  		res.render('produtos/novo', {
  			title: 'Novo produto - PDV Interativa', 
  			atributosList: docs });
	});
});


// Adicionando novo produto 
router.post('/novo', ensureAuthenticated, [
  body('inputCod').isLength({ min: 1 }),
  body('inputNome').isLength({ min: 3 }),
  body('inputPreco').isLength({ min: 1 })
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let produto = new Produto();
    produto.cod = req.body.inputCod.toLowerCase();
    produto.nome = req.body.inputNome.toLowerCase();
    produto.descricao = req.body.inputDescricao;
    produto.atributos = req.body.inputAtributo;
    produto.tipopreco = req.body.inputTipoCob;
    produto.preco = req.body.inputPreco.replace(',','.');
    produto.type = req.body.inputTipo;
    produto.prices_by_qnt = req.body.varQntPrice;

    produto.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/produtos');
      }
    });
});

// Formulário para editar o produto
router.get('/:id', ensureAuthenticated, function(req, res, next) {
  var produto = function(callback){
    Produto.findById(req.params.id, callback);
  } 

  // Pegando dados do produto e passando para renderizar na pagina
  produto(function(err, produto){
    
      res.render('produtos/edit', {title: 'Editando produto - PDV Interativa', produto: produto });
  });
});
// Deletando o produto
router.delete('/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    
    Produto.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});
// Getando produtos com aquela busca e informando
router.get('/busca/:word', ensureAuthenticated, function(req, res, next) {
  let q = req.params.word;
  let query = {
    "$or": [{"nome": {"$regex": q, "$options": "i"}}, {"cod": {"$regex": q, "$options": "i"}}, {"descricao": {"$regex": q, "$options": "i"}}]
  };
  let output = [];

  Produto.find(query).limit(6).then( pdct => {
      if(pdct && pdct.length && pdct.length > 0) {
          pdct.forEach(product => {
            let obj = {
                value: product._id,
                label: product.nome,
                preco: product.preco,
                cod: product.cod,
                type: product.type,
                descricao: product.descricao,
                prices_by_qnt: product.prices_by_qnt,
                tipopreco: product.tipopreco
            };
            output.push(obj);
          });
      }
      res.jsonp(output);
  })


});
module.exports = router;
