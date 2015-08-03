'use strict';
angular.module('workspaceApp')
  .controller('PollCtrl', function ($scope, $http, $location, $window, $routeParams, Auth, pollChart) {
    
    $scope.poll = {};
    $scope.user = Auth.getCurrentUser();
    $scope.isLoggedIn = Auth.isLoggedIn;
    //$scope.pollChart;
    $scope.makePollChart = pollChart.makePollChart;
    $scope.addOption = false;
    $scope.optionCount = 0;
    $scope.fullUrl = $location.absUrl();
    $scope.isAdmin = Auth.isAdmin;
    
    $(document).ready(function() {
      $("input:text").focus(function() { 
        $(this).select(); 
      });
      $('input:text').mouseup(function(e) { return false; });
    });
    
    $scope.newOption = function() {
      /* 
      //- need to make input field the focus
      $scope.$watch($( "input[new-option]" ).attr.ngHide, function(newValue){
                    if(!newValue){
                        $( "input[new-option]" ).focus();
                    }
                })
      */
      $scope.addOption = true;
    }
    
    $scope.cancelOption = function(){
      delete $scope.poll.options[$scope.optionCount];
      $scope.addOption = false;
    }
    
    $scope.voteCount = function(poll){
      if (poll.voters) {
        return Object.keys(poll.voters).length;
      } else {
        return 0;
      }
    }
    
    //database functions
    $scope.addNewOption = function() {
      if ($scope.poll.options[$scope.optionCount]) {
        $scope.updatePoll($scope.poll);
        $scope.optionCount = Object.keys($scope.poll.options).length;
        $scope.makePollChart($scope.poll);
        $scope.addOption = false;
        $scope.castVote($scope.optionCount - 1);
      }
    }
    
    $scope.showPoll = function(userId) {
      $http.get('/api/polls/poll/' + $routeParams.id).success(function(poll) {
        $scope.poll = poll;
        if (!$scope.poll.votes) {
          $scope.poll.votes = {};
          $scope.poll.voters = {};
        }
        $scope.userSelection = $scope.poll.voters[$scope.user._id];
        //$scope.drawChart($scope.poll);
        $scope.makePollChart($scope.poll);
        $scope.optionCount = Object.keys($scope.poll.options).length;
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
        $scope.poll.votes[$scope.poll.voters[$scope.user._id]] -= 1;
      }
      
      //cast vote
      $scope.poll.votes[option] += 1;
      $scope.poll.voters[$scope.user._id] = option;
      $scope.poll.updated = Date.now();
      
      //updates database
      $scope.updatePoll($scope.poll);
     
      //redraw chart
      $scope.makePollChart($scope.poll);
    }
    
    /* --- add this pattern to my-polls page
    $scope.awesomeThings.push(newThing);
$http.post('/api/things', newThing).success(function(thatThingWeJustAdded) {
    $scope.awesomeThings.pop(); // let's lose that id-lacking newThing 
    $scope.awesomeThings.push(thatThingWeJustAdded); // and add the id-having newThing!
};
    */
    
    $scope.deletePoll = function(poll) {
      $http.delete('/api/polls/' + poll._id).success( $window.location.href = '/my-polls' );
      
    };
    
    $scope.updatePoll = function(poll){
      $http.put('/api/polls/' + poll._id, poll).success( function(updatedPoll){
        $scope.poll = updatedPoll;
      });
      
    }
    
    $scope.showPoll();
    
   
    
  });
