const path = require('path');
const User = require(path.resolve('server', 'models', 'userModel'));

module.exports = {

  getUsers : function(req, res){
    console.log("getUsers method");
    User.find({})
      .then(function(users){
        console.log("getUsers method success");
        res.json(users);
      })
      .catch(function(error){
        console.log("getUsers method error",error);
        res.json({success : false, error : error});
      })
  },

  getOneUser : function(req, res){
    console.log("getOneUser method");
    User.findOne({_id : req.params.id})
      .then(function(user){
        console.log("getOneUser method success");
        res.json(user)
      })
      .catch(function(error){
        console.log("getOneUser method error",error);
        res.json({success : false, error : error});
      })
  },

  register : function(req, res){
    console.log("addUser method");
    User.create(req.body)
      .then(function(user){
        res.json({success : true, user : user});
      })
      .catch(function(error){
        console.log("addUser error", error);
        res.json({success : false, error : error});
      })
  },

  login : function(req, res){
    console.log("login method");
    const userName = req.body.userName;
    User.findOne({userName : userName})
      .then(function(user){
        console.log("Login found user", user);
          res.json({success : true, user : user});
      })
      .catch(function(error){
        console.log("login error", error);
        res.json({success : false, error : error});
      })
  },

  updateScore : function(req, res){
    User.findOne({_id : req.params.id})
      .then(function(user){
        user.score = req.body.score;
        user.percent = req.body.percent;
        user.save();
        res.json({success : true, user : user});
      })
      .catch(function(error){
        console.log("updateScore error", error);
        res.json({success : false, error : error});
      })
  },


}
