'use strict';

angular.module('workspaceApp')
  .controller('MyPollsCtrl', function ($scope, $http, Auth) {
    $scope.newPoll = {};
    $scope.optionCount = 0;
    $scope.baseUrl = "https://evervote-caseywoolley.c9.io/";
    $scope.user = Auth.getCurrentUser();
    
    $scope.addOption = function() {
      if ($scope.newPoll.options) {
        $scope.optionCount = Object.keys($scope.newPoll.options).length;
      }
    }
    
    $scope.getNumber = function(num) {
      return new Array(num);   
    }
    
    //database functions
    $scope.getPolls = function(userId) {
      $http.get('/api/polls').success(function(polls) {
        $scope.polls = polls;
      });
    }

    $scope.addPoll = function() {
      if($scope.newPoll.options && $scope.newPoll.options[1]) {
        $scope.newPoll.ownerId = $scope.user._id;
        $http.post('/api/polls', $scope.newPoll).success(function(){
         $scope.getPolls();
         $scope.newPoll = {};
         $scope.optionCount = 0;
        });
        
      }
    };

    $scope.deletePoll = function(poll) {
      $http.delete('/api/polls/' + poll._id).success( $scope.getPolls() );
    };
    
    $scope.getPolls();
  });
