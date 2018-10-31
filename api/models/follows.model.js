'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FollowSchema = Schema({
    user: {type: Schema.ObjectId, ref: 'User'}, //Schema.ObjectId para hacer las relaciones
    followed: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Follow', FollowSchema);