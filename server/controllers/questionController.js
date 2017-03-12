const path = require('path');
const Question = require(path.resolve('server', 'models', 'questionModel'));

module.exports = {

  getQuestions : function(req, res){
    console.log("getQuestions method");
    Question.find({})
      .then(function(questions){
        console.log("getQuestions method success");
        res.json(questions);
      })
      .catch(function(error){
        console.log("getQuestions method error",error);
        res.json({success : false, error : error});
      })
  },

  addQuestion : function(req, res){
    console.log("addQuestion method");
    Question.create(req.body)
      .then(function(question){
        console.log("addQuestion method success");
        res.json(question)
      })
      .catch(function(error){
        console.log("addQuestion method error",error);
        res.json({success : false, error : error});
      })
  },



}
