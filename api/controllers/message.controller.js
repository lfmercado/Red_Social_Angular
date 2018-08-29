'use strict'

var moment = require('moment');
var mongoosePagination = require('mongoose-pagination');

var Message = require('../models/messages.model');
var User = require('../models/user.model');
var Follow = require('../models/follows.model');


function prueba(req, res){
    return res.status(200).send({message: 'Hola desde el controlador de mensajes'});
}

function saveMessage(req, res){
    var params = req.body;

    if(params.text && params.receiver){
        var message = new Message();
        message.text = params.text;
        message.emitter = req.user.sub;
        message.receiver = params.receiver;
        message.created_at= moment().unix();

        message.save((err, messageStored)=>{
            if(err) return res.status(500).send({message: 'Error, no se ha podido guardar el mensaje'});
            if(!messageStored) return res.status(200).send({message: 'Error, no se ha podido enviar el mensaje'});

            return res.status(200).send({message: messageStored});
        });
    }else{
        return res.status(200).send({message: 'El mensaje debe de tener un contenido y/o un destinatario'}); 
    }
}

function getReceiberMessage(req, res){
    var userId = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }
    var itemsPage = 4;

    Message.find({receiver: userId}).populate('emitter').paginate(page, itemsPage, (err, messages)=>{
        if(err) return res.status(500).send({message: 'Error, no se ha podido traer el mensaje'});
        if(!messages) return res.status(404).send({message: 'Error, no se hay mensajes'});

        return res.status(200).send({
            total: total,
            pages: Math.ceil(total/itemsPage),
            messages: messages
        });
    });
}

module.exports = {
    prueba,
    saveMessage,
    getReceiberMessage
}