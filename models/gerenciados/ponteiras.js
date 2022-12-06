var mongoose = require('mongoose');

//Conexão
mongoose.connect('mongodb://localhost:27017/pdv_interativa');

const ponteirasSchema = mongoose.Schema({
  fornecedor: {
    type: String,
    required: true
  },
  cor: {
    type: String,
    required: true
  },
  esp: {
    type: String,
    required: true
  },
  estoque: {
    type: String,
    required: true
  },
  custo: {
    type: String,
    required: true
  },
  data_created: {
    type: String
  }

});
// esp = expessura

const Ponteiras = module.exports = mongoose.model('Ponteiras', ponteirasSchema);
