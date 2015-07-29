'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/my-polls', {
        templateUrl: 'app/my-polls/my-polls.html',
        controller: 'MyPollsCtrl'
      });
  });
