'use strict';

angular.module('workspaceApp')
  .factory('Polls', function($http, User, Auth, pollChart) {
    
    return {
    makePollChart: pollChart.makePollChart,
    user: Auth.getCurrentUser(),
    polls: {},
    newPoll: {},
    optionCount: 0,
    //var deferred = $q.defer();
    
    
    addOption: function() {
        if (this.newPoll.options) {
          this.optionCount = Object.keys(this.newPoll.options).length;
        }
      },
      
      //database functions
      getPolls: function() {
        $http.get('/api/polls').success(function(allPolls) {
          console.log(allPolls);
          //deferred.resolve(allPolls);
          this.polls = allPolls;
          return allPolls;
        });
      },
      
      getUserPolls: function() {
        $http.get('/api/polls/user/' + this.user._id).success(function(userPolls) {
          this.polls = userPolls;
          return userPolls;
        });
      },
      
      addPoll: function() {
        if(this.newPoll.options && this.newPoll.options[1]) {
          this.newPoll.ownerId = this.user._id;
          this.newPoll.ownerName = this.user.name;
          $http.post('/api/polls', this.newPoll).success(function(){
           
           this.getUserPolls();
           this.newPoll = {};
           this.optionCount = 0;
          });
        }
      },
    
      deletePoll: function(poll) {
        $http.delete('/api/polls/' + poll._id).success( this.getPolls() );
      }
    }
 
  });