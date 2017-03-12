const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  userName : {
    type : String,
    required : true,
    unique : true,
    trim : true,
    minLength : 2,
  },
  score : Array,

  percent : Number,
});


module.exports = mongoose.model('User', UserSchema);
