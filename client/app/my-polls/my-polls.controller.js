'use strict';

angular.module('workspaceApp')
  .controller('MyPollsCtrl', function ($scope, $http) {
    //$scope.polls = [];
    $scope.newPoll = {};
    $scope.optionCount = 0;
    $scope.baseUrl = "https://evervote-caseywoolley.c9.io/";
    
    $scope.save = function(newPoll) {
      $scope.polls.push(newPoll);
      $scope.newPoll = {};
      $scope.optionCount = 0;
    } 
    
    $scope.addOption = function() {
      $scope.optionCount = Object.keys($scope.newPoll.options).length;
    }
    
    $scope.getNumber = function(num) {
      return new Array(num);   
    }
    
    //database functions
    
    $http.get('/api/polls').success(function(polls) {
      $scope.polls = polls;
    });

    $scope.addPoll = function() {
      if($scope.newPoll.options && $scope.newPoll.options[1]) {
        $scope.polls.push($scope.newPoll); //just for frontend
        $http.post('/api/polls', { 
          name: $scope.newPoll.name,
          options: $scope.newPoll.options
        });
        $scope.newPoll = {};
        $scope.optionCount = 0;
      }
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
      
    
  });
