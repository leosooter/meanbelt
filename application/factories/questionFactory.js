console.log("questionFactory file has loaded");

angular.module('app')
  .factory('questionFactory', ['$http', function($http){

    const factory = {};

    factory.successMessage = '';

    factory.getQuestions = function(){
      console.log("questionFactory getQuestions method");
      return $http.get('/question')
    };

    factory.addQuestion = function(data){
      console.log("questionFactory addQuestion method", data);
      return $http.post('/question', data)
    };


    return factory;

  }])
