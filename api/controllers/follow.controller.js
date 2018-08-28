'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');

var User = require('../models/user.model');
var Follow = require('../models/follows.model');

function saveFollows(req, res){
    var params = req.body;
    var follow = new Follow();

    follow.user = req.user.sub; 
    follow.followed = params.followed;
    if(!params.followed){
        return res.status(200).send({message: 'Error, no se ha ingresado el id de la persona que se desea seguir!!'})
    }
    follow.save((err, followSaved)=>{
        if(err){
            return res.status(500).send({message:'Error, No se ha podido guardar el seguimiento---Server'});
        }
        if(!followSaved){
            return res.status(500).send({message:'Error, No se ha podido guardar el seguimiento'});
        }
        return res.status(200).send({follow: followSaved});
    })
}

function deleteFollow(req, res){
    var userId = req.user.sub;
    var followed = req.params.id;
    
    Follow.find({'user': userId, 'followed': followed}).remove((err)=>{
        if(err){
                return res.status(500).send({message:'Error, No se ha podido dejar de seguir!!'});
        }else{
            return res.status(200).send({message:'Se ha dejado de seguir!!  '});
        }
    });
}

function getFollows(req, res){
    var userId = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 4;
    Follow.find({user: userId}).populate({path: 'followed'}).paginate(page, itemsPerPage,(err, follows, total)=>{
        if(err){
            res.status(500).send({
                message: 'Error, no se ha podido realizar la peticion!!'
            });
      }      
        if(!follows){
                res.status(404).send({
                    message: 'Error, No hay usuarios existentes!!'
                });
      }
      return res.status(200).send({
          follows,
          total,
          pages: Math.ceil(total/itemsPerPage)
      });
    });

}

function getFollowsMe(req, res){
    var userId = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 4;                   //De esta manera mostramos los campos involucrados, el usuario es la persona que esta siguiendo
                                            //followed es la persona a quienes los user estan siguiendo
    Follow.find({followed: userId}).populate('user').paginate(page, itemsPerPage,(err, follows, total)=>{
        if(err){
            res.status(500).send({
                message: 'Error, no se ha podido realizar la peticion!!'
            });
      }      
        if(!follows){
                res.status(404).send({
                    message: 'Error, No hay usuarios siguiendote!!'
                });
      } 
      return res.status(200).send({
          follows,
          total,
          pages: Math.ceil(total/itemsPerPage)
      });
    });
}

function getFollowsNoList(req, res){
    var userId = req.user.sub;

    Follow.find({user: userId}).populate({path: 'followed'}).exec((err, follows)=>{
        if(err){
            return res.status(500).send({message:'Error, No se han podido encontrar a quien sigues!!'});
    }else{
        if(follows.length < 1){
            return res.status(200).send({
                follows,
                message: 'Hasta el momento no sigues a nadie'
            });
        }
        else{
            return res.status(200).send({follows});
        }
      
    }
    })
}

function getFollowsMeNoList(req, res){
    var userId = req.user.sub;

    Follow.find({followed: userId}).populate({path: 'user'}).exec((err, followsMe)=>{
        if(err){
            return res.status(500).send({message:'Error, No se han podido encontrar a quien sigues!!'});
    }else{
        if(followsMe.length < 1){
            return res.status(200).send({
                followsMe,
                message: 'Hasta el momento no sigues a nadie'
            });
        }else{
            return res.status(200).send({followsMe});
        }
    }
    })
}

module.exports = {
    saveFollows,
    deleteFollow,
    getFollows,
    getFollowsMe,
    getFollowsMeNoList,
    getFollowsNoList
}