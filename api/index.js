'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;
                //Conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient : true})
        .then(()=>{
            console.log('Conexion a la base de datos se ha realiazado con exito!!');
            //Creando conexion al servidor
            app.listen(port, ()=>{
                console.log('Conexion al servidor establecida con exito!!');
            })
        })
        .catch( err =>console.log(err));