console.log("User Controller file has loaded");
angular.module('app')
  .controller('userController', ['$scope', '$location', '$cookies','userFactory', function($scope, $location, $cookies, userFactory){
    console.log("User Controller has initiated");

    $scope.register = function(){
      $scope.registerError = '';
      $scope.loginError = '';
      console.log("userFactory register method");
      if($scope.newUser){
        $scope.newUser.score = [0,0];
        userFactory.register($scope.newUser)
          .then(function(response){
            const user = response.data.user;
            console.log("User registered", user);
            $cookies.putObject('currentUser', user);
            $location.path("dashboard");
          })
          .catch(function(error){
            console.log("error");
          })
      }
      else{
        console.log("blank name");
        $scope.registerError = "Name cannot be blank";
      }

    }

    $scope.login = function(){
      $scope.loginError = '';
      $scope.registerError = '';
      if($scope.loginUser){
        userFactory.login($scope.loginUser)
        .then(function(response){
          const user = response.data.user;
          console.log("User logged in", user);
          $cookies.putObject('currentUser', user);
          $location.path("dashboard");
        })
        .catch(function(error){
          console.log("login error", error);
        })
      }
      else{
        console.log("blank name");
        $scope.loginError = "Name cannot be blank";
      }

    }

  }])
