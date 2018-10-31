'use strict'

var User = require('../models/user.model');
var Follow = require('../models/follows.model');
var Publication = require('../models/publications.model');
var bcrypt = require('bcrypt-nodejs');//para encriptar la contraseña
var jwt = require('../services/jwt.service');//servicio por el cual genero el token
var mongoose_paginte = require('mongoose-pagination');
var fs = require('fs');//metodo que permite subir archivos
var path = require('path');//para reconocer la extensión de los archivos

function home(req, res){
    res.status(200).send({
        message : 'Hola Mundo Desde EL Controlador De Usuario'
    });;
}

function prueba (req, res ){
    res.status(200).send({
        message : 'Hola desde el api!!'
    });
}

//Metodo para el registro de usuarios
function saveUser (req, res){
    var params = req.body;
    var user = new User();
   
    //Reviso que si tenga todos los campos requeridos
    if(params.name && params.surname && params.nick && params.email && params.password){
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.profession = null;
        user.description = null;
        user.role = 'ROLE_USER';
        user.image = null;
        /**
         * Para poder hacer busquedas por medio del OR se deben implementar de esta manera
         * resulta util cuando se quiere buscar un usuario por varios paramatros sin tener
         * la obligacion de que se cumplan todos!!
         * 
         *    
            User.findOne({ $or: [
                ***De esta manera se esta buscando al usuario por su email o por su nick***
                {email : user.email.toLowerCase()},
                {nick: user.nick.toLowerCase()}
            ]}).exec(function(err, users){

                 });
         */

         // Controlar los usuarios para que no se registren con el mismo correo
        User.findOne({email : user.email.toLowerCase()}).exec(function(err, users){
            
            if(err){
                 res.status(500).send({
                    message:'Error en la peticion de busqueda de usuarios repetidos'
                });
            }else{
                if(users && users.email)
                {
                 res.status(200).send({
                        message: 'No se puede crear el usuario, el correo ya se encuentra en uso!!'
                    });
                }
                else{
                    //por medio de la libreria bcrypt y su metodo hash encripto una contraseña
                    bcrypt.hash(params.password,null,null, (error, result)=>{
                        user.password = result;
                        user.save((err, userSaved) =>{
                            if(err){
                                return res.status(500).send({
                                    message: 'Error, No se ha podido guardar el usuario'
                                });
                            }else{
                                if(userSaved){
                                    
                                    res.status(200).send({
                                        user: userSaved
                                    });
                                }else{
                                    res.status(404).send({
                                        message: 'No se ha podido registrar el usuario'
                                    });
                                }
                            }
                        })
                    });
                }
            }
        }); 
    }else{
        res.status(200).send({
            message: 'Es obligatorio completar todos los campos!!'
        });
    }
}

//Metodo para ingresar al sistema
function loginUser(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email: email},(err, user)=>{
        if(err){
            res.status(500).send({
                message: 'Error, No se ha podido loguear correptamente'
            });
        }else{
            if(user != null){
                bcrypt.compare(password, user.password, (err, check)=>{
                    if(check){
                        user.password = undefined;
                        //Devolver un tokken
                        if(params.getTokken){
                            res.status(200).send({
                                tokken: jwt.createTokken(user)
                            });
                        }else{//Devolver los datos en claro
                        res.status(200).send({
                            user: user,
                            message: 'Se ha ingresado con exito!!'
                        });
                        }
                    }else{
                        res.status(404).send({
                            message: 'Error, No se ha podido identificar el usuario'
                        });
                    }
                })
            }
            else{
                res.status(404).send({
                    message: 'Error, No se ha podido identificar el usuario'
                });
            }
        }
    });
}

//Metodo para conseguir los datos de un usuario
function getUser(req, res){
                //Tener en cuenta que cuando los datos llegan por url se utiliza el params
    var userId = req.params.id;
    User.findById(userId, (err, user)=>{
        if(err){
            res.status(500).send({
                message: 'Error, no se ha podido realizar la peticion!!'
            });
      }
            
        if(!user){
                res.status(404).send({
                    message: 'Error, el usuario no existe!!'
                });
        }
        else{
      ///Revisar si la persona que estoy buscando ya lo estoy siguiendo 
      followThisUser(req.user.sub,userId).then((value)=>{
        res.status(200).send({
            user,
            value
        });
      });
    }
    });
}

async function followThisUser(identity_user_id, user_id){

     try {
        var following = await Follow.findOne({ user: identity_user_id, followed: user_id}).exec()
            .then((following) => {
                return following;
            })
            .catch((err)=>{
                return console.log(err);
            });
        var followed = await Follow.findOne({ user: user_id, followed: identity_user_id}).exec()
            .then((followed) => {
                return followed;
            })
            .catch((err)=>{
                return console.log(err);
            });
        return {
            following: following,
            followed: followed
        }
    } catch(e){
        console.log(e);
    }
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

//trae cuantos seguidores, seguido y publicaciones tengo o alguien en especifico.
function getCounter(req, res){
    if(req.params.id){
        getCountFollows(req.params.id).then((value)=>{
            return res.status(200).send({
            followed: value.followed,
            following: value.following,
            publications: value.publications
            })           
        });
    }else{
    getCountFollows(req.user.sub).then((value)=>{
        return res.status(200).send({
            followed: value.followed,
            following: value.following,
            publications: value.publications
        })
    });
    }
}


async function getCountFollows(user_id){
    try {   
    var following = await Follow.countDocuments({user : user_id}).exec()
    .then((count) => {
        return count;
     })
     .catch((e)=>{
         console.log(e);
     });

     var followed = await Follow.countDocuments({ followed : user_id}).exec()
     .then((count) => {
        return count;
     })
     .catch((e)=>{
        console.log(e);
     });

     var publications = await Publication.countDocuments({'user': user_id}).exec()
        .then(count =>{
            return count;    
        })
        .catch((e)=>{
            console.log(e);
         });
         
        
     return {
         following : following,
         followed: followed,
         publications: publications
     }
    }catch(e){
        console.log(e);
    }
    
}



function getUsers(req, res){
    var indentity_user_id = req.user.sub;
    var page = 1;

    if(req.params.page){
        page = req.params.page;
    }

    var itemsPerPage = 5;
    User.find().sort('_id').paginate(page, itemsPerPage,(err, users, total)=>{
        if(err){
            res.status(500).send({
                message: 'Error, no se ha podido realizar la peticion!!'
            });
      }      
        if(!users){
                res.status(404).send({
                    message: 'Error, No hay usuarios existentes!!'
                });
      } 

      followsUsersId(indentity_user_id).then((value)=>{
          return res.status(200).send({
          users,
          userFollowing: value.following,
          userFollowMe: value.followed,
          total,
          pages: Math.ceil(total/itemsPerPage)
        });
     
      });
    });
}

function updateUser(req, res){
    var userId = req.params.id;
    var params = req.body;
    //Borramos la propiedad password ya que esta no se podra modificar desde esta vista!!
    delete params.password;
//    console.log(req.body);

    if(userId != req.user.sub){
        return res.status(500).send({
            message: 'Error, no posees los permisos para modificar los datos de otro usuario!!'
        });
    }
    User.find({email : params.email.toLowerCase()}).exec(function(err, users){
        var user_isset = false;
        users.forEach((user) => {
            if(user._id != userId) user_isset = true;
        });
        if(user_isset) return res.status(404).send('Error, no se puede actualizar el registro, los Id´s no son iguales');

            else{                
                User.findByIdAndUpdate(userId, params, {new : true}, (err, userUpdate)=>{
                    if(err){
                        res.status(500).send({
                            message: 'Error, no se ha podido realizar la peticion de actualizar el usuario!!'
                        });
                } 
                if(!updateUser){
                    return res.status(404).sen({
                        message: 'Error, no se ha podido actualizar el usuario'
                    });
                }
                return res.status(200).send({userUpdate});
                });
            }
      
    });

}

//Subir Foto de perfil/Avatar
function uploadImage(req, res){

    var userId = req.params.id;
    // console.log(req);
    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if(userId != req.user.sub){
          return removeFiles(res, filePath,'Error, no posees los permisos para modificar los datos--Imagen de otro usuario!!');            
        }
       
        if(fileExt == 'PNG' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
            User.findByIdAndUpdate(userId, {image : fileName}, {new : true}, (err, userUpdate)=>{
                if(err){
                    res.status(500).send({
                        message: 'Error, no se ha podido realizar la peticion para subir el avatar del usuario!!'
                    });
              } 
              if(!updateUser){
                return res.status(404).sen({
                    message: 'Error, no se ha podido actualizar el usuario'
                });
              }
              return res.status(200).send({userUpdate});
            });
        }else{
            return removeFiles(res, filePath,'Error, Extension del archivo no permitida!!');
        }
    }else{
        return res.status(200).send({message:'Error, no se ha subido una imagen!!'});
    }
}

//Borrar las imagenes o archivos subidos
function removeFiles(res, filePath, message){
    fs.unlink(filePath, (err)=>{
        return res.status(200).send({message: message});
    });
}

//Obtener la imagen del usuario
function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    
    var pathFile ='./uploads/users/' + imageFile;
    fs.exists(pathFile, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'Error, no existe la imagen'});
        }
    });
}

//por medio de este metodo podemos exportar todos los metodos que tengamos dentro de nuestro controlador para que puedan ser utilizados 
module.exports ={
    home,
    prueba,
    saveUser,
    loginUser,
    getUser,
    getCounter,
    getUsers,
    updateUser,
    uploadImage,
    getImageFile

}