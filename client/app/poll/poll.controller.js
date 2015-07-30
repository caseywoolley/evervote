'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $http, $routeParams) {
    
    $scope.poll = {};
    
    //database functions
    $scope.showPoll = function(userId) {
      $http.get('/api/polls/poll/' + $routeParams.id).success(function(poll) {
        $scope.poll = poll;
      });
    }
    
    $scope.showPoll();
  });
