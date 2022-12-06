var express = require('express');
var router = express.Router();
var moment = require('moment');
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

const Despesa = require('../models/despesas');

/* GET despesas listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {

	  var despesasListAll = function(callback){
	  var dataInicio = moment().startOf('month').format('YYYY-MM-DD'); 
	  var dataFim = moment().endOf('month').format('YYYY-MM-DD');

	  Despesa.find({date: {
        $gte:dataInicio,
        $lt: dataFim
      }}, callback).sort({ date: 'desc' });
	} 

	despesasListAll(function(err, docs){
  		res.render('despesas', {title: 'Despesas - PDV Interativa', despesasList: docs });
	});
});

/* GET despesas listing by specific date. */
router.get('/:datainicio/:datafim', ensureAuthenticated, function(req, res, next) {

	  var despesasListAll = function(callback){
	  var dataInicio = new Date(req.params.datainicio);
	  var dataFim = new Date(req.params.datafim);
	  var dataInicio = dataInicio.toISOString();
	  var dataFim = dataFim.toISOString();

	  Despesa.find({date: {
        $gte:dataInicio,
        $lt: dataFim
      }}, callback).sort({ date: 'desc' });
	} 

	despesasListAll(function(err, docs){
  		res.render('despesas', {title: 'Despesas - PDV Interativa', despesasList: docs });
	});
});

// Adicionando nova despesa
router.post('/', ensureAuthenticated, [
  body('inputDate').not().isEmpty(),
  body('inputDescricao').not().isEmpty(),
  body('inputValordocaixa').not().isEmpty(),
  body('inputValortotal').not().isEmpty(),
  body('inputTipo').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let despesa = new Despesa();
    despesa.date = req.body.inputDate;
    despesa.descricao = req.body.inputDescricao.toLowerCase();
    despesa.valordocaixa = req.body.inputValordocaixa.replace(/[^\d]+/g,"");
    despesa.valortotal = req.body.inputValortotal.replace(/[^\d]+/g,"");
    despesa.tipo = req.body.inputTipo.toLowerCase();
    despesa.usuario = 'padrao';
    if(req.body.inputPedido == ''){
    	despesa.pedido = 0;
    }else{despesa.pedido = req.body.inputPedido.replace(/[^\d]+/g,"");}
    

    despesa.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/despesas');
      }
    });
});

// retornando dados para editar a despesa
router.get('/:id', ensureAuthenticated, function(req, res, next) {
	var despesa = function(callback){
		Despesa.findById(req.params.id, callback);
	} 

	// Pegando dados do cliente e passando para renderizar na pagina
	despesa(function(err, despesa){
		
        res.send(despesa);
	});

});
// Editando o cliente (tratando o recebimento do POST)
router.post('/:id', ensureAuthenticated, [
  body('inputDate').not().isEmpty(),
  body('inputDescricao').not().isEmpty(),
  body('inputValordocaixa').not().isEmpty(),
  body('inputValortotal').not().isEmpty(),
  body('inputTipo').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let despesa = {};
    despesa.date = req.body.inputDate;
    despesa.descricao = req.body.inputDescricao.toLowerCase();
    despesa.valordocaixa = req.body.inputValordocaixa.replace(/[^\d]+/g,"");
    despesa.valortotal = req.body.inputValortotal.replace(/[^\d]+/g,"");
    despesa.tipo = req.body.inputTipo.toLowerCase();
    despesa.usuario = 'padrao';
    if(req.body.inputPedido == ''){
    	despesa.pedido = 0;
    }else{despesa.pedido = req.body.inputPedido.replace(/[^\d]+/g,"");}

    let query = {_id: req.params.id};

    Despesa.update(query, despesa, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/despesas');
      }
    });
});
// Deletando a despesa
router.delete('/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    
    Despesa.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});
module.exports = router;