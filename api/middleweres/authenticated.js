'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Curso_Angular6_Desarrollar_Una_Red_Social';
                                    // El metoodo next es lo que sirve para separar darle paso a la peticion al controlador
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(200).send({
            message: 'Error, la peticion no tienen la cabecera de autentificacion!!'
        });
    }                                       //por medio de este metodo se le quitan cualquier comilla doble o simple que tenga el tokken
    var tokken = req.headers.authorization.replace(/['"]+/g,'');
    //console.log(req.headers);
    try {
        var payload = jwt.decode(tokken, secret);
        if(payload.exp <= moment.unix()){
            return res.status(401).send({
                message: 'El Tokken ha expirado!!'
            });
        }
    } catch (error) {
        return res.status(404).send({
            message: 'El Tokken no es valido!!'
        });
    }
    
    req.user = payload;

    next();
}