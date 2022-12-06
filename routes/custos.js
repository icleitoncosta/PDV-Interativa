var express = require('express');
var router = express.Router();
var moment = require('moment');
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

const Custo = require('../models/custos');

/* GET custos listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	var custosListAll = function(callback){
	 Custo.find({}, callback).sort({ date: 'desc' });
	} 

	custosListAll(function(err, docs){
  		res.render('custos', {title: 'Tabela de Custos - PDV Interativa', custosList: docs });
	});
});

// Adicionando novo Custo
router.post('/', ensureAuthenticated, [
  body('inputNome').not().isEmpty(),
  body('inputTipo').not().isEmpty(),
  body('inputValor').not().isEmpty(),
  body('inputCod').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let custo = new Custo();
    custo.cod = req.body.inputCod;
    custo.nome = req.body.inputNome.toLowerCase();
    custo.tipocob = req.body.inputTipo;
    custo.valor = req.body.inputValor.replace(/[^\d]+/g,"");
    custo.is_delete = req.body.inputDelet;
    

    custo.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/custos');
      }
    });
});

// retornando dados para editar o custo
router.get('/:id', ensureAuthenticated, function(req, res, next) {
	var custo = function(callback){
		Custo.findById(req.params.id, callback);
	} 

	// Pegando dados do custo e passando para renderizar na pagina
	custo(function(err, custo){
		
        res.send(custo);
	});

});
// Editando o custo (tratando o recebimento do POST)
router.post('/:id', ensureAuthenticated, [
  body('inputNome').not().isEmpty(),
  body('inputTipo').not().isEmpty(),
  body('inputValor').not().isEmpty(),
  body('inputCod').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let custo = new Custo();
    custo._id = req.params.id;
    custo.cod = req.body.inputCod;
    custo.nome = req.body.inputNome.toLowerCase();
    custo.tipocob = req.body.inputTipo;
    custo.valor = req.body.inputValor.replace(/[^\d]+/g,"");
    custo.is_delete = req.body.inputDelet;

    let query = {_id: req.params.id};

    Custo.update(query, custo, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/custos');
      }
    });
});
// Deletando o custo
router.delete('/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    
    Custo.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});
module.exports = router;