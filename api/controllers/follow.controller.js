'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePagination = require('mongoose-pagination');

var User = require('../models/user.model');
var Follow = require('../models/follows.model');

function saveFollows(req, res) {
    var params = req.body;
    var follow = new Follow();

    follow.user = req.user.sub;
    follow.followed = params.followed;
    if (!params.followed) {
        return res.status(200).send({
            message: 'Error, no se ha ingresado el id de la persona que se desea seguir!!'
        })
    }
    follow.save((err, followSaved) => {
        if (err) {
            return res.status(500).send({
                message: 'Error, No se ha podido guardar el seguimiento---Server'
            });
        }
        if (!followSaved) {
            return res.status(500).send({
                message: 'Error, No se ha podido guardar el seguimiento'
            });
        }
        return res.status(200).send({
            follow: followSaved
        });
    })
}

function deleteFollow(req, res) {
    var userId = req.user.sub;
    var followed = req.params.id;

    Follow.find({
        'user': userId,
        'followed': followed
    }).remove((err) => {
        if (err) {
            return res.status(500).send({
                message: 'Error, No se ha podido dejar de seguir!!'
            });
        } else {
            return res.status(200).send({
                message: 'Se ha dejado de seguir!!  '
            });
        }
    });
}

function getFollows(req, res) {
    var userId = req.user.sub;
    var page = 1;

    if (req.params.page) {
        page = req.params.page;
    }
    if (req.params.id) {
        userId = req.params.id;
    }
    
    //console.log(req.params);
    var itemsPerPage = 4;
    Follow.find({
        user: userId
    }).populate({
        path: 'followed'
    }).paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) {
            res.status(500).send({
                message: 'Error, no se ha podido realizar la peticion!!'
            });
        } else {
            if (!follows) {
                res.status(404).send({
                    message: 'Error, No hay usuarios existentes!!'
                });
            } else {
                followsUsersId(req.user.sub).then((value)=>{
                return res.status(200).send({
                    follows: follows,
                    userFollowing: value.following,
                    userFollowMe: value.followed,
                    total,
                    pages: Math.ceil(total / itemsPerPage)
                });
            });
            }
        }
    });

}

async function followsUsersId(user_id){
    try {                                                      //De esta manera le quito los atributos de una consulta para no mostrarlos
        var following = await Follow.find({ 'user': user_id}).select({'_id':0, '__v':0, 'user':0}).exec()
            .then((follows) => {
               return follows;
            })
            .catch((err)=>{
                return console.log(err);
            });

        var followed = await Follow.find({'followed': user_id}).select({'_id':0, '__v':0, 'followed':0}).exec()
            .then((followed) => {
                return followed;
            })
            .catch((err)=>{
                return console.log(err);
            });  

            //Capturo los following
            var following_clean = [];
            following.forEach((follow) => {
                following_clean.push(follow.followed);
            });
        
            //capturo los Followed
            var followed_clean = [];
                followed.forEach((follow) => {
                    followed_clean.push(follow.user);
                });
                
        return {
            following: following_clean,
            followed: followed_clean
        }
    } catch(e){
        console.log(e);
    }
}



function getFollowsMe(req, res) {
    var userId = req.user.sub;
    var page = 1;

    if (req.params.page) {
        page = req.params.page;
    }
    if (req.params.id) {
        userId = req.params.id;
    }
    var itemsPerPage = 4; //De esta manera mostramos los campos involucrados, el usuario es la persona que esta siguiendo
    //followed es la persona a quienes los user estan siguiendo
    Follow.find({
        followed: userId
    }).populate('user').paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) {
            res.status(500).send({
                message: 'Error, no se ha podido realizar la peticion!!'
            });
        }
        if (!follows) {
            res.status(404).send({
                message: 'Error, No hay usuarios siguiendote!!'
            });
        }
        followsUsersId(req.user.sub).then((value)=>{
            return res.status(200).send({
                follows: follows,
                userFollowing: value.following,
                userFollowMe: value.followed,
                total,
                pages: Math.ceil(total / itemsPerPage)
            });
        });
    });
}

function getFollowsNoList(req, res) {
    var userId = req.user.sub;

    Follow.find({
        user: userId
    }).populate({
        path: 'followed'
    }).exec((err, follows) => {
        if (err) {
            return res.status(500).send({
                message: 'Error, No se han podido encontrar a quien sigues!!'
            });
        } else {
            if (follows.length < 1) {
                return res.status(200).send({
                    follows,
                    message: 'Hasta el momento no sigues a nadie'
                });
            } else {
                return res.status(200).send({
                    follows
                });
            }

        }
    })
}

function getFollowsMeNoList(req, res) {
    var userId = req.user.sub;

    Follow.find({
        followed: userId
    }).populate({
        path: 'user'
    }).exec((err, followsMe) => {
        if (err) {
            return res.status(500).send({
                message: 'Error, No se han podido encontrar a quien sigues!!'
            });
        } else {
            if (followsMe.length < 1) {
                return res.status(200).send({
                    followsMe,
                    message: 'Hasta el momento no sigues a nadie'
                });
            } else {
                return res.status(200).send({
                    followsMe
                });
            }
        }
    })
}


function getMyFollows(req, res){
    var userId = req.user.sub;
    var find = Follow.find({user: userId});
    if(req.params.followed){
        find = Follow.find({followed: userId});
    }

    find.populate('user followed').exec((err, follows)=>{
        if(err) return res.status(500).send({message:'Error en el servidor'});

        if(!follows) return res.status(404).send({message: 'Error, no sigues a ningun usuario'});

        return res.status(200).send({follows});
    });
}

module.exports = {
    saveFollows,
    deleteFollow,
    getFollows,
    getFollowsMe,
    getFollowsMeNoList,
    getFollowsNoList,
    getMyFollows
}