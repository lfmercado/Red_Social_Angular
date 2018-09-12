'use strict'

var express = require('express');
var followController = require('../controllers/follow.controller');

var api = express.Router(); 
var mdAuth = require('../middleweres/authenticated');

api.post('/follow', mdAuth.ensureAuth, followController.saveFollows);
api.delete('/follow/:id', mdAuth.ensureAuth, followController.deleteFollow);
api.get('/get-follows/:id?/:page?', mdAuth.ensureAuth, followController.getFollows);
api.get('/get-follows-me/:id?/:page?', mdAuth.ensureAuth, followController.getFollowsMe);
api.get('/get-follows-me-nl', mdAuth.ensureAuth, followController.getFollowsMeNoList);
api.get('/get-follows-nl', mdAuth.ensureAuth, followController.getFollowsNoList);

module.exports = api