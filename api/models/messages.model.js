'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageShema = Schema({
    text: String,
    created_at: String,
    emmiter: {type: Schema.ObjectId, ref: 'User'},
    receiver: {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Message', MessageShema);