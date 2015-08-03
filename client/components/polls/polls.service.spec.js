'use strict';

describe('Service: polls', function () {

  // load the service's module
  beforeEach(module('workspaceApp'));

  // instantiate service
  var polls;
  beforeEach(inject(function (_polls_) {
    polls = _polls_;
  }));

  it('should do something', function () {
    expect(!!polls).toBe(true);
  });

});
