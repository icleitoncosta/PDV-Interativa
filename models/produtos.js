var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

// Despesas schema
const produtosSchema = mongoose.Schema({
  cod: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  atributos: {
    type: String,
    required: true
  },
  tipopreco: {
    type: String,
    required: true
  },
  preco: {
    type: String
  },
  custo: {
    type: String
  },
  is_del: {
    type: String
  },
  type: {
    type: String
  },
  prices_by_qnt: {
    type: String
  }

});

const Produtos = module.exports = mongoose.model('Produtos', produtosSchema);