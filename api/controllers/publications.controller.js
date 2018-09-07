'use strict'

var Publication= require('../models/publications.model');
var User = require('../models/user.model');
var Follow = require('../models/follows.model');

var mongoose_paginte = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

function prueba(req, res){
    return res.status(200).send({message: 'Hola desde el controlador de publicaciones'});
}

function savePublications(req, res){
    var publication = new Publication();
    var params = req.body;

    if(!params.text){
        return res.status(200).send({message: 'Error, no hay texto para publicar'});
    }
    
    publication.text = params.text;
    publication.file = null;
    publication.user = req.user.sub;
    publication.created_at = moment().unix();

    publication.save((err, publicated)=>{
        if(err){
            return res.status(500).send({message: 'Error, no se ha guardado la publicaion'});
        }else{
            if(!publicated){
                return res.status(200).send({message: 'Error, no se ha guardado la publicaion'});
            }else{
                return res.status(200).send({publicated});
            }
        }
    })
}

function getPublications(req, res){
    var page = 1;
   
    if(req.params.page){
        page = req.params.page;
    }
    var itemsPerPage = 4;
    Follow.find({user : req.user.sub}).populate('followed').exec((err, follows)=>{
        if(err) return res.status(500).send({message: 'Error, no se han encontrado las publicaiones'}); 
        var follows_clean =[]; 
        follows.forEach((follow)=>{
            follows_clean.push(follow.followed);
        });
    //Por medio de este push podemos ver nuestras publicaciones
        follows_clean.push(req.user.sub);        
        
        Publication.find({user: {'$in':follows_clean}}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total)=>{
            if(err) return res.status(500).send({message: 'Error, no se han podido devolver las publicaiones'}); 
            if(!publications) return res.status(404).send({message: 'Error, no hay publicaiones'}); 
            return res.status(200).send({
                total_items: total,
                 pages: Math.ceil(total/itemsPerPage),
                 itemsPerPage: itemsPerPage,
                publications,
                            
            }); 
        });
    });
}

function getPublication(req, res){
    var publicationId  = req.params.id;

    Publication.findById(publicationId,(err, publication)=>{
        if(err) return res.status(500).send({message: 'Error, no se han podido devolver la publicacion'}); 
        if(!publication) return res.status(404).send({message: 'Error, no existe la publicacion'}); 
         return res.status(200).send({publication})
    })
}

function deletePublication(req, res){
    var publicationId = req.params.id;

    Publication.find({'user': req.user.sub, '_id': publicationId}).deleteOne(err=>{
        if(err) return res.status(500).send({message: 'Error, no se han podido borrar la publicacion'}); 
        return res.status(200).send({message: 'La publicacion se ha eliminado con exito!!'});
    });
    
}

//Subir Foto de perfil/Avatar
function uploadImage(req, res){

    var publicationId = req.params.id;
 
    if(req.files){
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[2];
        var extSplit = fileName.split('\.');
        var fileExt = extSplit[1];

        if(fileExt == 'PNG' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){

            Publication.findOne({'user': req.user.sub, '_id': publicationId}).exec((err, publication)=>{
                if(err){
                    res.status(500).send({
                        message: 'Error, no se ha podido realizar la peticion!!'
                    });
                }
                console.log(publication);
                if(publication){
                    Publication.findOneAndUpdate(publicationId, {file : fileName}, {new : true}, (err, publicationUpdate)=>{
                        if(err){
                            res.status(500).send({
                                message: 'Error, no se ha podido realizar la peticion!!'
                            });
                      } 
                      if(!publicationUpdate){
                        return res.status(404).send({
                            message: 'Error, no se ha podido actualizar el usuario'
                        });
                      }
                      return res.status(200).send({publication: publicationUpdate});
                    });
                }else{
                    return res.status(200).send({
                        message: 'Error, no tienes permiso para modificar esta publicacion!!'
                    });
                } 
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
    
    var pathFile ='./uploads/publications/' + imageFile;
    fs.exists(pathFile, (exists)=>{
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({message: 'Error, no existe la imagen'});
        }
    });
}

module.exports = {
    prueba,
    savePublications,
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImageFile
}