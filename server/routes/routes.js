const path = require('path');
const userController = require(path.resolve('server', 'controllers', 'userController'));
const questionController = require(path.resolve('server', 'controllers', 'questionController'));

module.exports = function(router){

  //user routes
  router.get('/user', userController.getUsers)

  router.get('/user/:id', userController.getOneUser)

  router.post('/user', userController.register)

  router.post('/user/updateScore/:id', userController.updateScore)

  router.post('/user/login', userController.login)


  //question routes
  router.get('/question', questionController.getQuestions)

  router.post('/question', questionController.addQuestion)

}
