const mongoose = require('mongoose');
const nameRegex = /^[a-zA-Z]+$/;

const Schema = mongoose.Schema;

const QuestionSchema = mongoose.Schema({
  title : {
    type : String,
    required : true,
    trim : true,
    minLength : 15,
  },
  answers : {
    type : Array,
    required : true,
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
