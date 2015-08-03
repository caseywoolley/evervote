'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, Auth, Polls) {
    // Need to turn poll functions into a service
    //$scope.pollService = Polls;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.polls = [];

    //database functions
    $scope.getPolls = function() {
      $http.get('/api/polls').success(function(polls) {
        $scope.polls = polls;
      });
    }
    
    $scope.voteCount = function(poll){
      if (poll.voters) {
        return Object.keys(poll.voters).length;
      } else {
        return 0;
      }
    }
    $scope.getPolls();
    //$scope.pollService.getPolls();
  });

