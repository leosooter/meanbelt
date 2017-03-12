console.log("questionController file has loaded");

angular.module('app')
  .controller('questionController', ['$scope', '$location', '$cookies', 'questionFactory', 'userFactory', function($scope, $location, $cookies, questionFactory, userFactory){

    $scope.currentUser = $cookies.getObject('currentUser');
    if(!$scope.currentUser){
      $location.path('login');
    }

    $scope.successMessage = questionFactory.successMessage;

    $scope.gameAnswers = [];

    function shuffleArray (array) {
      var i = 0
        , j = 0
        , temp = null

      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
    }

    userFactory.getUsers()
      .then(function(response){
        $scope.users = response.data;
        console.log("//////All users = ", $scope.users);
      })


    $scope.refreshQuestions = function(){
      questionFactory.getQuestions()
        .then(function(response){
          $scope.questions = response.data;
          console.log("$scope.questions =", $scope.questions);
        })
        .catch(function(error){
          console.log("refreshQuestions error", error);
        })
    };

    $scope.addQuestion = function(){
      $scope.error = '';
      console.log($scope.newAnswer);
      $scope.newQuestion.answers = [];
      $scope.newQuestion.answers.push({answer : $scope.newAnswer.answer1, correct : true});
      $scope.newQuestion.answers.push({answer : $scope.newAnswer.answer2, correct : false});
      $scope.newQuestion.answers.push({answer : $scope.newAnswer.answer3, correct : false});
      shuffleArray($scope.newQuestion.answers);
      console.log($scope.newQuestion.answers);
      for(let answer of $scope.newQuestion.answers){
        if(!answer.answer){
          console.log("empty answer");
          $scope.error = 'You must fill in all fields';
          return false;
        }
      }
      questionFactory.addQuestion($scope.newQuestion)
        .then(function(response){
          console.log("response from addQuestion", response);
          $location.path('dashboard');
        })
        .catch(function(error){
          console.log("error from addQuestion", error);
        })
      $scope.newQuestion = {};
      questionFactory.successMessage = '';
    };

    $scope.submitAnswers = function(){
      $scope.error = '';
      console.log("/////////Answers =", $scope.gameAnswers);
      if($scope.gameAnswers.length != $scope.questions.length){
        console.log("incomplete test");
        $scope.error = 'You must answer all questions';
        return false;
      }
      const score = [0, $scope.gameAnswers.length];

      for(let answer of $scope.gameAnswers){
        if (answer.correct){
          score[0] ++;
        }
      }
      console.log("Final score = ", score);
      const percent = Math.round( (score[0]/score[1]) * 100 );
      const data = {
        score : score,
        percent : percent,
      }
      userFactory.updateScore($scope.currentUser._id, data)
        .then(function(response){
          console.log("response from submitAnswers", response);
          if(percent > 60){
            questionFactory.successMessage = `Great job! ${$scope.currentUser.userName}, your score was ${percent}%`;
          }
          else{
            questionFactory.successMessage = `Great try ${$scope.currentUser.userName}, your score was ${percent}%`;
          }

          $location.path('dashboard');
        })
      $scope.error = '';
      $scope.gameAnswers = [];
    }

    $scope.resetSearch = function(){
      $scope.searchResults = {};
    }

    $scope.logout = function(){
      console.log("userController logout method");
      $cookies.put('currentUser', false);
      $location.path("login");
      questionFactory.successMessage = '';
    }

    $scope.greaterThanPercent = function(percent, search){
      return (percent > search);
    }

    $scope.refreshQuestions();

  }])
