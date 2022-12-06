var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

// Clientes schema
const clientesSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  documento: {
    type: String,
    required: true
  },
  dn: {
    type: String
  },
  telefone: {
    type: String
  },
  celular: {
    type: String
  },
  email: {
    type: String
  },
  logradouro: {
    type: String
  },
  numero: {
    type: String
  },
  bairro: {
    type: String
  },
  cidade: {
    type: String
  },
  uf: {
    type: String
  },
  cep: {
    type: String
  },
  create_date: {
    type: String
  },
  block: {
    type: String
  },
  info: {
    type: String
  }

});

const Clientes = module.exports = mongoose.model('Clientes', clientesSchema);