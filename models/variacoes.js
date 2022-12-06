var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const variacoesSchema = mongoose.Schema({
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
  variacoes: {
    type: String,
    required: true
  },
  preco: {
    type: String,
    required: true
  },
  custo: {
    type: String,
    required: true
  }
});

const Variacoes = module.exports = mongoose.model('Variacoes', variacoesSchema);