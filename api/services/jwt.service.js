'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

var secret = 'Curso_Angular6_Desarrollar_Una_Red_Social';
    
exports.createTokken = function(user){
    //Esta es la propiedad en la cual se asigna los datos para generar el tokken
    var payload ={
        sub : user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        role: user.role,
        image: user.image,
        //Esta es la fecha de creacion del tokken
                    //unix es la forma de decirle que tome la fecha actual, el día de hoy
        iat: moment().unix(),
        //Esta es la fecha de expiracion del tokken
                    //con el add se le dice que corra la fecha en un determinado tiempo, en este caso 30 días
        exp: moment().add(30, 'days').unix
    };  
            /**
            / por medio del encode es que se genera el tokken, el tokken sirve como un codigo de autenticacion para la seguiridad del
            / sistema, recibe 2 parametros, el objeto al que se le quiere generar un tokken y una contraseña o una key, que es lo que
            / utiliza para poder generar un tokken unico y asi no se puedan generar tokken de manera exterior 
            */
    return jwt.encode(payload, secret);
}