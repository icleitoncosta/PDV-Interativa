var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

// Despesas schema
const formasdepagamentoSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  taxa: {
    type: String,
    required: true
  }
  create_date: {
    type: String,
    required: true
  }

});

const formasDePagamento = module.exports = mongoose.model('formasDePagamento', formasdepagamentoSchema);