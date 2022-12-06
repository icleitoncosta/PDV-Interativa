var express = require('express');
var router = express.Router();
var moment = require('moment');
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

// models
const Lonas = require('../models/gerenciados/lonas');
const Adesivos = require('../models/gerenciados/adesivos');
const Bastao = require('../models/gerenciados/bastao');
const Ilhoses = require('../models/gerenciados/ilhos');
const Ponteiras = require('../models/gerenciados/ponteiras');

/* GET produtos listing. */
router.get('/', ensureAuthenticated, async function(req, res, next) {
   
    const LonasListAll = await Lonas.find({}).sort({ data_created: 'asc' });
    const AdesivosListAll = await Adesivos.find({}).sort({ data_created: 'asc' });
    const BastaoListAll = await Bastao.find({}).sort({ data_created: 'asc' });
    const IlhosesListAll = await Ilhoses.find({}).sort({ data_created: 'asc' });
    const PonteirasListAll = await Ponteiras.find({}).sort({ data_created: 'asc' });

    await res.render('gerenciados', {
      title: 'Produtos gerenciados - PDV Interativa', 
      lonasList: LonasListAll, 
      adesivosList: AdesivosListAll, 
      bastaoList: BastaoListAll, 
      ilhosesList: IlhosesListAll, 
      ponteirasList: PonteirasListAll
    });
});

// Adicionando nova Lona
router.post('/nova_lona', ensureAuthenticated, [
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputFundo').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let lona = new Lonas();
    lona.marca = req.body.inputMarca;
    lona.tp = req.body.inputTp;
    lona.gr = req.body.inputGR;
    lona.estoque = req.body.inputEstoque;
    lona.lg = req.body.inputLG;
    lona.fundo = req.body.inputFundo;
    lona.custo = req.body.inputCusto;
    lona.data_created = moment().format();
    
    lona.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados');
      }
    });
});

// Editando a lona
router.post('/lonas/edit/:id', ensureAuthenticated, [
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputFundo').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let lona = {};
    lona.marca = req.body.inputMarca;
    lona.tp = req.body.inputTp;
    lona.gr = req.body.inputGR;
    lona.estoque = req.body.inputEstoque;
    lona.lg = req.body.inputLG;
    lona.fundo = req.body.inputFundo;
    lona.custo = req.body.inputCusto;
    
    let query = {_id: req.params.id};

    Lonas.update(query, lona, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados');
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
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
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
    adesivo.marca = req.body.inputMarca;
    adesivo.tp = req.body.inputTp;
    adesivo.gr = req.body.inputGR;
    adesivo.estoque = req.body.inputEstoque;
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
        res.redirect('/gerenciados');
      }
    });
});


// Editando a lona
router.post('/adesivos/edit/:id', ensureAuthenticated, [
  body('inputTp').not().isEmpty(),
  body('inputGR').not().isEmpty(),
  body('inputMarca').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
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
    adesivo.marca = req.body.inputMarca;
    adesivo.tp = req.body.inputTp;
    adesivo.gr = req.body.inputGR;
    adesivo.estoque = req.body.inputEstoque;
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
        res.redirect('/gerenciados/');
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
  body('inputFornecedor').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputEXP').not().isEmpty(),
  body('inputFornecedor').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
  body('inputTam').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let bastao = new Bastao();
    bastao.fornecedor = req.body.inputFornecedor;
    bastao.tp = req.body.inputTp;
    bastao.exp = req.body.inputEXP;
    bastao.estoque = req.body.inputEstoque;
    bastao.tam = req.body.inputTam;
    bastao.custo = req.body.inputCusto;
    bastao.data_created = moment().format();
    
    bastao.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados');
      }
    });
});
// Editando 
router.post('/bastao/edit/:id', ensureAuthenticated, [
  body('inputFornecedor').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputEXP').not().isEmpty(),
  body('inputFornecedor').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
  body('inputTam').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let bastao2 = {};
    bastao2.fornecedor = req.body.inputFornecedor;
    bastao2.tp = req.body.inputTp;
    bastao2.exp = req.body.inputEXP;
    bastao2.estoque = req.body.inputEstoque;
    bastao2.tam = req.body.inputTam;
    bastao2.custo = req.body.inputCusto;
    bastao2.data_created = moment().format();
    
    let query = {_id: req.params.id};

    Bastao.update(query, bastao2, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados/');
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

// ILHÓS
// ILHÓS
// ILHÓS
// ILHÓS
// ILHÓS
// ILHÓS
// ILHÓS

// Adicionando novo
router.post('/novo_ilhos', ensureAuthenticated, [
  body('inputMarca').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let ilhos = new Ilhoses();
    ilhos.marca = req.body.inputMarca;
    ilhos.tp = req.body.inputTp;
    ilhos.lg = req.body.inputLG;
    ilhos.estoque = req.body.inputEstoque;
    ilhos.custo = req.body.inputCusto;
    ilhos.data_created = moment().format();
    
    ilhos.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados');
      }
    });
});
// Editando 
router.post('/ilhos/edit/:id', ensureAuthenticated, [
  body('inputMarca').not().isEmpty(),
  body('inputTp').not().isEmpty(),
  body('inputLG').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty(),
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let ilhos = {};
    ilhos.marca = req.body.inputMarca;
    ilhos.tp = req.body.inputTp;
    ilhos.lg = req.body.inputLG;
    ilhos.estoque = req.body.inputEstoque;
    ilhos.custo = req.body.inputCusto;
    ilhos.data_created = moment().format();
    
    let query = {_id: req.params.id};

    Ilhoses.update(query, ilhos, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados/');
      }
    });
});

// retornando dados para editar 
router.get('/ilhos/:id', ensureAuthenticated, function(req, res, next) {
  var ilhos = function(callback){
    Ilhoses.findById(req.params.id, callback);
  } 

  // Pegando dados do cliente e passando para renderizar na pagina
  ilhos(function(err, ilhos){
    
        res.send(ilhos);
  });

});

// Deletando o adesivo
router.delete('/ilhos/:id', function(req, res, next) {
    let query = {_id: req.params.id};
    Ilhoses.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});
// PONTEIRA
// PONTEIRA
// PONTEIRA
// PONTEIRA
// PONTEIRA
// PONTEIRA
// PONTEIRA

// Adicionando novo
router.post('/nova_ponteira', ensureAuthenticated, [
  body('inputFornecedor').not().isEmpty(),
  body('inputCor').not().isEmpty(),
  body('inputESP').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let ponteira = new Ponteiras();
    ponteira.fornecedor = req.body.inputFornecedor;
    ponteira.cor = req.body.inputCor;
    ponteira.esp = req.body.inputESP;
    ponteira.estoque = req.body.inputEstoque;
    ponteira.custo = req.body.inputCusto;
    ponteira.data_created = moment().format();
    
    ponteira.save(function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados');
      }
    });
});
// Editando 
router.post('/ponteiras/edit/:id', ensureAuthenticated, [
  body('inputFornecedor').not().isEmpty(),
  body('inputCor').not().isEmpty(),
  body('inputESP').not().isEmpty(),
  body('inputCusto').not().isEmpty(),
  body('inputEstoque').not().isEmpty()
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    let ponteira = {};
    ponteira.fornecedor = req.body.inputFornecedor;
    ponteira.cor = req.body.inputCor;
    ponteira.esp = req.body.inputLG;
    ponteira.estoque = req.body.inputEstoque;
    ponteira.custo = req.body.inputCusto;
    ponteira.data_created = moment().format();
    
    let query = {_id: req.params.id};

    Ponteiras.update(query, ponteira, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.redirect('/gerenciados/');
      }
    });
});

// retornando dados para editar 
router.get('/ponteiras/:id', ensureAuthenticated, function(req, res, next) {
  var ponteira = function(callback){
    Ponteiras.findById(req.params.id, callback);
  } 

  // Pegando dados do cliente e passando para renderizar na pagina
  ponteira(function(err, ponteira){
    
        res.send(ponteira);
  });

});

// Deletando 
router.delete('/ponteiras/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    Ponteiras.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});

module.exports = router;
