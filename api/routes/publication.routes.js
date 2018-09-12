'use strict'

var express = require('express');
var publicationController = require('../controllers/publications.controller');

var api = express.Router(); 

var mdAuth = require('../middleweres/authenticated');
var multiparty = require('connect-multiparty');
var mdUpload = multiparty({uploadDir: './uploads/publications'});

api.get('/probando-publications', publicationController.prueba);
api.post('/save-publication', mdAuth.ensureAuth, publicationController.savePublications);
api.get('/publications/:page?',mdAuth.ensureAuth, publicationController.getPublications);
api.get('/publications-user/:userId/:page?',mdAuth.ensureAuth, publicationController.getPublicationsUser);
api.get('/publication/:id',mdAuth.ensureAuth, publicationController.getPublication);
api.delete('/publication/:id', mdAuth.ensureAuth, publicationController.deletePublication);
api.post('/upload-image-pub/:id', [mdUpload, mdAuth.ensureAuth], publicationController.uploadImage);
api.get('/get-image-pub/:imageFile', publicationController.getImageFile);


module.exports = api;
