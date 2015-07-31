'use strict';

angular.module('workspaceApp')
  .controller('MyPollsCtrl', function ($scope, $http, Auth, pollChart) {
    $scope.newPoll = {};
    $scope.optionCount = 0;
    //$scope.baseUrl = "https://evervote-caseywoolley.c9.io/";
    $scope.user = Auth.getCurrentUser();
    $scope.makePollChart = pollChart.makePollChart;
    
    $scope.addOption = function() {
      if ($scope.newPoll.options) {
        $scope.optionCount = Object.keys($scope.newPoll.options).length;
      }
      //$scope.makePollChart($scope.polls[0]);
      $scope.polls.map(function(poll){
          $scope.makePollChart(poll);
        });
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
    
    $scope.getUserPolls = function() {
      console.log('/api/polls/user/' + $scope.user._id);
      $http.get('/api/polls/user/' + $scope.user._id).success(function(polls) {
        $scope.polls = polls;
      });
    }
    /*  - how to query?
    $scope.doSearch = function(){
    $scope.itemSearch.get({query:$scope.searchTerm}, function(data){
        $scope.posts = data.posts;
        console.log($scope.posts[1]);
    });
};*/

    $scope.addPoll = function() {
      if($scope.newPoll.options && $scope.newPoll.options[1]) {
        $scope.newPoll.ownerId = $scope.user._id;
        $scope.newPoll.ownerName = $scope.user.name;
        $http.post('/api/polls', $scope.newPoll).success(function(){
         //$scope.getPolls();
         $scope.getUserPolls();
         $scope.newPoll = {};
         $scope.optionCount = 0;
        });
        
      }
    };

    $scope.deletePoll = function(poll) {
      $http.delete('/api/polls/' + poll._id).success( $scope.getPolls() );
    };
    
    $scope.getUserPolls();
  
  });
