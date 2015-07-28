'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {
    $scope.awesomeThings = ['ted', 'fred', 'bob'];
    // Use the User $resource to fetch all users
    //$scope.users = User.query();
    //console.log($scope.users);

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;


    $scope.polls = [
    {
      name: 'Crunchy or Smooth?',
      info: 'p1',
      owner: 'ownerid',
      active: true,
      options:[
        {
          _id: 1,
          name: 'Crunchy',
          votes: 2
        },
        {
          name: 'Smooth',
          votes: 5
        }
        ]
    },
    {
      name: 'poll 2',
      info: 'p2',
      active: true
    },
    {
      name: 'poll 3'
    }
    ];

    $http.get('/api/things').success(function(awesomeThings) {
      //$scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };
  });

