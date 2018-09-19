'use strict'

var moment = require('moment');
var mongoosePagination = require('mongoose-pagination');

var Message = require('../models/messages.model');
var User = require('../models/user.model');
var Follow = require('../models/follows.model');


function prueba(req, res){
    return res.status(200).send({message: 'Hola desde el controlador de mensajes'});
}

//Guardar los mensajes
function saveMessage(req, res){
    var params = req.body;

    if(params.text && params.receiver){
        var message = new Message();
        message.text = params.text;
        message.emitter = req.user.sub;
        message.receiver = params.receiver;
        message.created_at= moment().unix();
        message.viewed = 'false';

        message.save((err, messageStored)=>{
            if(err) return res.status(500).send({message: 'Error, no se ha podido guardar el mensaje'});
            if(!messageStored) return res.status(200).send({message: 'Error, no se ha podido enviar el mensaje'});

            return res.status(200).send({message: messageStored});
        });
    }else{
        return res.status(200).send({message: 'El mensaje debe de tener un contenido y/o un destinatario'}); 
    }
}
//Obtener todoos los mensajes que tengamos
function getReceiberMessage(req, res){
    var userId = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }
    var itemsPage = 4;
                //Buscamos el campo        
                //receiber que es el
                //destinatario del
                //mensaje           //por medio del metodo populate nos traemos
                                    //toda la informacion del remitente
                                    //en este caso, le decimos que datos queremos
    Message.find({receiver: userId}).populate('emitter', 'name surname image nick _id').sort('-created_at').paginate(page, itemsPage, (err, messages, total)=>{
        if(err) return res.status(500).send({message: 'Error, no se ha podido traer el mensaje'});
        if(!messages) return res.status(404).send({message: 'Error, no se hay mensajes'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPage),
            messages: messages
        });
    });
}

//Ver todos los mensajes que hemos enviado
function getEmitterMessage(req, res){
    var userId = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }
    var itemsPage = 4; 
    Message.find({emitter: userId}).populate('emitter receiver', 'name surname image nick _id').sort('-created_at').paginate(page, itemsPage, (err, messages, total)=>{
        if(err) return res.status(500).send({message: 'Error, no se ha podido traer el mensaje'});
        if(!messages) return res.status(404).send({message: 'Error, no se hay mensajes'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPage),
            messages: messages
        });
    });
}

//Ver todos los mensajes que no hemos leido
function getUnviewedMessages(req, res){
    var userId = req.user.sub;
    Message.countDocuments({receiver: userId, viewed: 'false'}).exec((err, count)=>{
        if(err) return res.status(500).send({message: 'Error, no se ha podido traer el mensaje'});  
        
        return res.status(200).send({'unviewed': count});
    });
}

//Marcar un mensaje como leido
function setViewedMessage(req, res){
    var userId = req.user.sub;

    Message.update({receiver: userId, viewed: 'false'}, {viewed: 'true'}, {"multi": true}, (err, messageUpdate)=>{
        if(err) return res.status(500).send({message: 'Error en la peticion'}); 
        
        return res.status(200).send({
            messages:messageUpdate
        });
    });
}
module.exports = {
    prueba,
    saveMessage,
    getReceiberMessage,
    getEmitterMessage,
    getUnviewedMessages,
    setViewedMessage
}