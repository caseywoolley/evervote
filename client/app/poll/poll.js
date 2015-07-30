'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/poll', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      })
      .when('/poll/:id', {
        templateUrl: 'app/poll/poll.html',
        controller: 'PollCtrl'
      });
  });
