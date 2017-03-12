console.log("User factory file has loaded");
angular.module('app')
  .factory('userFactory', ['$http', function($http){
    const factory = {};

    factory.register = function(newUser){
      console.log("userFactory register method");
      return $http.post('/user', newUser)
    };

    factory.login = function(loginUser){
      console.log("userFactory login method");
      return $http.post('/user/login', loginUser)
    };

    factory.updateScore = function(userId, data){
      return $http.post(`/user/updateScore/${userId}`, data)
    };

    factory.getUsers = function(){
      console.log("userFactory getUsers method");
      return $http.get(`/user`)
    };

    return factory;
  }])
