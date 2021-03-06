'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  options: Object,
  votes: Object,
  voters: Object,
  voteCount: Number,
  ownerId: String,
  ownerName: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', PollSchema);