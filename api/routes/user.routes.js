'use strict'

var express = require('express');
var UserController = require('../controllers/user.controller');

///Este es el metodo de autenticacion --> Middlewere
var mdAuth = require('../middleweres/authenticated');
var multiparty = require('connect-multiparty');
var mdUpload = multiparty({uploadDir: './uploads/users'})
var api = express.Router();


api.get('/home', UserController.home);
api.get('/prueba', mdAuth.ensureAuth, UserController.prueba);
api.post('/save-user', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/user/:id', mdAuth.ensureAuth, UserController.getUser);
api.get('/users/:page?', mdAuth.ensureAuth, UserController.getUsers);
api.put('/user-update/:id', mdAuth.ensureAuth, UserController.updateUser);
api.get('/counters/:id?', mdAuth.ensureAuth, UserController.getCounter);
api.get('/get-image-user/:imageFile', UserController.getImageFile);
api.post('/upload-image-user/:id', [mdAuth.ensureAuth, mdUpload], UserController.uploadImage);

module.exports = api;

