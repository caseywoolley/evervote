'use strict';

angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $http, $routeParams, Auth) {
    
    //$scope.poll = {};
    $scope.user = Auth.getCurrentUser();
    
    
    //database functions
    $scope.showPoll = function(userId) {
      $http.get('/api/polls/poll/' + $routeParams.id).success(function(poll) {
        $scope.poll = poll;
        if (!$scope.poll.votes) {
          $scope.poll.votes = {};
          $scope.poll.voters = {};
        }
        $scope.userSelection = $scope.poll.voters[$scope.user._id];
      });
    }
    
    $scope.castVote = function(option) {
      $('.poll-options').removeClass('selected');
      $('.poll-options:eq(' + option + ')').addClass('selected');
      //initialize votes to 0
      if (!$scope.poll.votes[option]) {
        $scope.poll.votes[option] = 0;
      }
      
      //remove old vote
      if ($scope.poll.voters[$scope.user._id] != undefined) {
        console.log('remove:' + $scope.poll.voters[$scope.user._id]);
        $scope.poll.votes[$scope.poll.voters[$scope.user._id]] -= 1;
      }
      
      //cast vote
      $scope.poll.votes[option] += 1;
      $scope.poll.voters[$scope.user._id] = option;
      $scope.poll.updated = Date.now();
      
      //updates database
      $http.put('/api/polls/' + $scope.poll._id, $scope.poll).success( function(updatedPoll){
        $scope.poll = updatedPoll;
      });

    }
    
    /* --- add this pattern to my-polls page
    $scope.awesomeThings.push(newThing);
$http.post('/api/things', newThing).success(function(thatThingWeJustAdded) {
    $scope.awesomeThings.pop(); // let's lose that id-lacking newThing 
    $scope.awesomeThings.push(thatThingWeJustAdded); // and add the id-having newThing!
};
    */
    
    $scope.deletePoll = function(poll) {
      $http.delete('/api/polls/' + poll._id).success( $scope.getPolls() );
    };
    
    $scope.showPoll();
  });
