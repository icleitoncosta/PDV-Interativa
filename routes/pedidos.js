var express = require('express');
var router = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
const { body, validationResult } = require('express-validator');

// models
const Pedido = require('../models/pedidos');


/* Enviando para renderizar a lista de pedidos. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	var pedidosListAll = function(callback){
		Pedido.find({}, callback).sort({ nome: 'asc' });
	} 
	pedidosListAll(function(err, docs){
  		res.render('pedidos', {
  			title: 'Pedidos - PDV Interativa', 
  			pedidosList: docs });
	});
});

function contar_itens_tabela(){

}

// Adicionando novo pedido 
router.post('/novo', ensureAuthenticated, [
  body('nome_cliente').isLength({ min: 1 }),
  body('cliente_id').isLength({ min: 3 }),
  body('itens_pedido').isLength({ min: 1 }),
  body('tempo_de_atend'),
  body('descontos'),
  body('obs'),
  body('preco_total').isLength({ min: 1 })
], function(req, res){

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

    Pedido.countDocuments({}, function(err, docCount) {
        if (err) { return handleError(err) } //handle possible errors

        let pedido = new Pedido();
        pedido.numero = docCount+1;
        pedido.nome_cliente = req.body.nome_cliente;
        pedido.cliente_id = req.body.cliente_id.toLowerCase();
        pedido.itens_pedido = req.body.itens_pedido;
        pedido.tempo_de_atend = req.body.tempo_de_atend;
        pedido.descontos = req.body.descontos;
        pedido.obs = req.body.obs;
        pedido.preco_total = req.body.preco_total;
        pedido.atendente = req.user.nome;
        var docCountN = docCount+1;
        pedido.save(function(err){
          if(err) {
            res.send(err);
            console.error(err);
            return;
          } else {
            res.json(docCountN);
          }
        });
    })


});

// Formulário para editar o pedido
router.get('editar/:id', ensureAuthenticated, function(req, res, next) {
  var pedido = function(callback){
    Pedido.findById(req.params.id, callback);
  } 
  pedido(function(err, pedido){
      res.render('pedidos_edit', {title: 'Editando pedido - PDV Interativa', pedido: pedido });
  });
});
// Formulário para ver/imprimir o pedido
router.get('ver/:id', ensureAuthenticated, function(req, res, next) {
  var pedido = function(callback){
    Pedido.findById(req.params.id, callback);
  } 
  pedido(function(err, pedido){
      res.render('pedido_view', {title: 'Editando pedido #'+pedido.numero+' - PDV Interativa', pedido: pedido });
  });
});
// Deletando o pedido
router.delete('/:id', ensureAuthenticated, function(req, res, next) {
    let query = {_id: req.params.id};
    
    Pedido.remove(query, function(err){
      if(err) {
        console.error(err);
        return;
      } else {
        res.send('Success');
      }
    });
});

module.exports = router;
