import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message.model';
import { Follow } from '../../../models/follow.model';

import { Global } from '../../../services/Global.service';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';

import { fadeLateral } from '../../../animation';  

@Component({
    selector: 'addTo',
    templateUrl: './addTo.component.html',
    animations: [fadeLateral],
    providers: [FollowService, MessageService, UserService]

})
export class AddToComponent implements DoCheck, OnInit{
    public title = "Enviar Mensaje";
    public message: Message;
    public tokken;
    public identity;
    public url;
    public res;
    public follows;
    public userId;
    public user;
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ){
        this.identity = this._userService.getIdentity();
        this.message = new Message('','','',this.identity._id,'');
        this.tokken = this._userService.getTokken();
        this.url = Global.url;  
        
    }
    ngDoCheck(){

    }
    ngOnInit(){
        this.getMyFollows();
        
    }

    loadPage(){
    this._route.params.subscribe( params => {
        this.userId = params['id'];
        console.log(this.userId);
        this.getUser(this.userId);
        this.message = new Message('','','',this.identity._id,this.userId);
    });
    }

    getMyFollows(){
        this._followService.getFollowing(this.tokken,this.identity._id,1).subscribe(
            response =>{
                this.follows = response.follows;
                this.loadPage();
                
            },
            error =>{
            if(error) console.log(<any>error);
        })
    }

    getUser(id){
        this._userService.getUser(id).subscribe(
            response =>{
                this.user = response.user;
                console.log(this.user);
                
            },
            error => {
                if(error) console.log(<any>error);
            }
        )
    }

    onSubmit(form){
        console.log(this.message);
        this._messageService.addMessage(this.tokken, this.message).subscribe(
            response =>{
                if(response.message){
                    this.res= true;
                    form.reset();
                }
            },
            error=>{
                if(error){
                    console.log(<any>error);
                    this.res =false;
                }
        });
    }
}