'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas
var user_rutes = require('./routes/user.routes');
var follow_rutes = require('./routes/follow.routes');

//Middlewares
app.use(bodyParser.urlencoded({extends:false}));
app.use(bodyParser.json());

//Cors
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requestes-With, Content-Type, Accept, Access-Allow-Request-Method'); 
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


//Rutas
app.use('/api', user_rutes);
app.use('/api', follow_rutes);

//Exportar la configuracion
module.exports = app;