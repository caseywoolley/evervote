'use strict';

describe('Service: pollChart', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var pollChart;
  beforeEach(inject(function (_pollChart_) {
    pollChart = _pollChart_;
  }));

  it('should do something', function () {
    expect(!!pollChart).toBe(true);
  });

});
