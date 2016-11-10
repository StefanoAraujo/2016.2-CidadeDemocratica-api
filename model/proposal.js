var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var proposalSchema = new Schema({
  id: Number,
  title: String,
  updatedAt:Date,
  users:[String]
})

mongoose.model('Proposal', proposalSchema);
