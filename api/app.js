'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar Rutas


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
app.get('/prueba', (req, res )=>{
    res.status(200).send({message : 'Hola desde el api!!'});
});

//Exportar la configuracion
module.exports = app;