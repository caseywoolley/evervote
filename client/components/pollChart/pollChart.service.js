'use strict';

angular.module('workspaceApp')
  .service('pollChart', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
            // bar chart data
    return {
      makePollChart: function(poll) {
            var barData = {
                labels : $.map(poll.options, function(value, index) { return [value]; }),
                datasets : [
                    {
                        fillColor : "#97ac5e",
                        strokeColor : "#bcd676",
                        data : $.map(poll.votes, function(value, index) { return [value]; })
                    }
                ]
            }
            //create unique id for poll chart
            var chartId = 'poll-chart-' + poll._id;
            // refresh DOM chart container
            $('.poll-chart').remove('#' + chartId);
            $('.poll-chart').html('<canvas id="' + chartId + '" style="width:100%; height:100%">');
            
            //get container
            var chartContainer = document.getElementById(chartId).getContext("2d");
            // draw bar chart
            console.log('drawChart');
            new Chart(chartContainer).Bar(barData);
      }
    }
  });