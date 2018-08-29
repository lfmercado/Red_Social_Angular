'use strict'

var express = require('express');
var messageController = require('../controllers/message.controller');

///Este es el metodo de autenticacion --> Middlewere
var mdAuth = require('../middleweres/authenticated');
var multiparty = require('connect-multiparty');
var mdUpload = multiparty({uploadDir: './uploads/users'})
var api = express.Router();

api.get('/prueba-mes', messageController.prueba);
api.post('/message', mdAuth.ensureAuth, messageController.saveMessage);
api.get('/get-messages/:page?', mdAuth.ensureAuth, messageController.getReceiberMessage);

module.exports = api;

