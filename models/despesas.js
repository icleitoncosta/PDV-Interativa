var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

// Despesas schema
const despesasSchema = mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  valordocaixa: {
    type: String,
    required: true
  },
  valortotal: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  pedido: {
    type: String,
    required: true
  }

});

const Despesas = module.exports = mongoose.model('Despesas', despesasSchema);