'use strict';

angular.module('workspaceApp')
  .controller('MyPollsCtrl', function ($scope, $http, Auth, Polls, pollChart) {
    $scope.newPoll = {};
    $scope.optionCount = 0;
    $scope.sortOptions = [];
    //$scope.baseUrl = "https://evervote-caseywoolley.c9.io/";
    $scope.user = Auth.getCurrentUser();
    $scope.makePollChart = pollChart.makePollChart;
    
    //$scope.addOption = Polls.addOption;
    
    $scope.addOption = function() {
      if ($scope.newPoll.options) {
        $scope.optionCount = Object.keys($scope.newPoll.options).length;
        console.log($scope.optionCount);
      }
    }
    
    $scope.removeOption = function(index) {
      if ($scope.newPoll.options && $scope.newPoll.options[index]){
        $('#option-' + index).find('input[name=option]').val('');
        delete $scope.newPoll.options[index];
        $scope.sortOptions = $.map($scope.newPoll.options, function(value, index) {
          return [value];
        });
        //sort option index
        $scope.newPoll.options = {};
        $scope.sortOptions.map(function(value, i){
          $scope.newPoll.options[i] = value;
        });
        $scope.optionCount = Object.keys($scope.newPoll.options).length;
      }
    }
    
    $scope.getNumber = function(num) {
      return new Array(num);   
    }
    
    $scope.voteCount = function(poll){
      if (poll.voters) {
        return Object.keys(poll.voters).length;
      } else {
        return 0;
      }
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
