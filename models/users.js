var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const usuariosSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  data_criacao: {
    type : Date,
    default : Date.now
  },
  nivelAcesso: {
    type: String
  }
});

const Usuarios = module.exports = mongoose.model('Usuarios', usuariosSchema);