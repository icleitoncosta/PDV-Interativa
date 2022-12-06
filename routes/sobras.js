var express = require('express');
var router = express.Router();
var moment = require('moment');
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

// models
const Lonas = require('../models/sobras/lonas');
const Adesivos = require('../models/sobras/adesivos');
const Bastao = require('../models/sobras/bastao');

/* GET produtos listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	var dataAll = [];

	async function getAllDataAndRender(){
	  var LonasListAll = async function(callback){ await Lonas.find({}, callback);} 
	  await LonasListAll( function(err, docs){ dataAll.push(docs); });

	  var adesivosListAll = async function(callback){ await Adesivos.find({}, callback);} 
	  await adesivosListAll( function(err, docs){ dataAll.push(docs); });

	  var bastaoListAll = async function(callback){ await Bastao.find({}, callback);} 
	  await bastaoListAll( function(err, docs){ dataAll.push(docs); });


      await res.render('sobras', {
      	title: 'Sobras de material - PDV Interativa', 
      	lonasList: dataAll[0], 
      	adesivosList: dataAll[1], 
      	bastaoList: dataAll[2]
      });
	}


	// Pegando todos os dados e renderizando
	getAllDataAndRender();

});

// Adicionando nova Lona
router.post('/nova_lona', ensureAuthenticated, [
  body('inputCod').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputComprimento').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputFundo').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let lona = new Lonas();
    lona.cod = req.body.inputCod;
    lona.marca = req.body.inputMarca;
    lona.tp = req.body.inputTp;
    lona.gr = req.body.inputGR;
    lona.comprimento = req.body.inputComprimento;
    lona.lg = req.body.inputLG;
    lona.fundo = req.body.inputFundo;
    lona.custo = req.body.inputCusto;
    lona.data_created = moment().format();
    
    lona.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/sobras');
      }
    });
});

// Editando a lona
router.post('/lonas/edit/:id', ensureAuthenticated, [
  body('inputCod').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputComprimento').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputFundo').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let lona = {};
    lona.cod = req.body.inputCod;
    lona.marca = req.body.inputMarca;
    lona.tp = req.body.inputTp;
    lona.gr = req.body.inputGR;
    lona.comprimento = req.body.inputComprimento;
    lona.lg = req.body.inputLG;
    lona.fundo = req.body.inputFundo;
    lona.custo = req.body.inputCusto;
    
    let query = {_id: req.params.id};

    Lonas.update(query, lona, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/sobras');
      }
    });
});

// retornando dados para editar a despesa
router.get('/lonas/:id', ensureAuthenticated, function(req, res, next) {
	var lona = function(callback){
		Lonas.findById(req.params.id, callback);
	} 

	// Pegando dados do cliente e passando para renderizar na pagina
	lona(function(err, lona){
		
        res.send(lona);
	});

});
// Deletando a lona
router.delete('/lonas/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    Lonas.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});


// ADESIVOS
// ADESIVOS
// ADESIVOS
// ADESIVOS
// ADESIVOS
// ADESIVOS
// ADESIVOS

// Adicionando novo
router.post('/novo_adesivo', ensureAuthenticated, [
  body('inputCod').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputComprimento').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputFundo').not().isEmpty(),
  body('inputCola').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let adesivo = new Adesivos();
    adesivo.cod = req.body.inputCod;
    adesivo.marca = req.body.inputMarca;
    adesivo.tp = req.body.inputTp;
    adesivo.gr = req.body.inputGR;
    adesivo.comprimento = req.body.inputComprimento;
    adesivo.lg = req.body.inputLG;
    adesivo.fundo = req.body.inputFundo;
    adesivo.custo = req.body.inputCusto;
    adesivo.cola = req.body.inputCola;
    adesivo.data_created = moment().format();
    
    adesivo.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/sobras');
      }
    });
});


// Editando a lona
router.post('/adesivos/edit/:id', ensureAuthenticated, [
  body('inputCod').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputComprimento').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputFundo').not().isEmpty(),
  body('inputCola').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let adesivo = {};
    adesivo.cod = req.body.inputCod;
    adesivo.marca = req.body.inputMarca;
    adesivo.tp = req.body.inputTp;
    adesivo.gr = req.body.inputGR;
    adesivo.comprimento = req.body.inputComprimento;
    adesivo.lg = req.body.inputLG;
    adesivo.fundo = req.body.inputFundo;
    adesivo.custo = req.body.inputCusto;
    adesivo.cola = req.body.inputCola;
    adesivo.data_created = moment().format();
    
    let query = {_id: req.params.id};

    Adesivos.update(query, adesivo, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/sobras/');
      }
    });
});

// retornando dados para editar 
router.get('/adesivos/:id', ensureAuthenticated, function(req, res, next) {
  var adesivo = function(callback){
    Adesivos.findById(req.params.id, callback);
  } 

  // Pegando dados do cliente e passando para renderizar na pagina
  adesivo(function(err, adesivo){
    
        res.send(adesivo);
  });

});

// Deletando o adesivo
router.delete('/adesivos/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    Adesivos.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});

// BASTAO
// BASTAO
// BASTAO
// BASTAO
// BASTAO
// BASTAO
// BASTAO

// Adicionando novo
router.post('/novo_bastao', ensureAuthenticated, [
  body('inputCod').not().isEmpty(),
  body('inputFornecedor').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputEXP').not().isEmpty(),
  body('inputFornecedor').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputTam').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let bastao = new Bastao();
    bastao.cod = req.body.inputCod;
    bastao.fornecedor = req.body.inputFornecedor;
    bastao.tp = req.body.inputTp;
    bastao.exp = req.body.inputEXP;
    bastao.tam = req.body.inputTam;
    bastao.custo = req.body.inputCusto;
    bastao.data_created = moment().format();
    
    bastao.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/sobras');
      }
    });
});
// Editando 
router.post('/bastao/edit/:id', ensureAuthenticated, [
  body('inputCod').not().isEmpty(),
  body('inputFornecedor').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputEXP').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputTam').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let bastao2 = {};
    bastao.cod = req.body.inputCod;
    bastao2.fornecedor = req.body.inputFornecedor;
    bastao2.tp = req.body.inputTp;
    bastao2.exp = req.body.inputEXP;
    bastao2.tam = req.body.inputTam;
    bastao2.custo = req.body.inputCusto;
    bastao2.data_created = moment().format();
    
    let query = {_id: req.params.id};

    Bastao.update(query, bastao2, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/sobras/');
      }
    });
});

// retornando dados para editar 
router.get('/bastao/:id', ensureAuthenticated, function(req, res, next) {
  var bastao = function(callback){
    Bastao.findById(req.params.id, callback);
  } 

  // Pegando dados do cliente e passando para renderizar na pagina
  bastao(function(err, bastao){
    
        res.send(bastao);
  });

});

// Deletando o adesivo
router.delete('/bastao/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    Bastao.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});



module.exports = router;
