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
    selector: 'add',
    templateUrl: './add.component.html',
    animations: [fadeLateral],
    providers: [FollowService, MessageService, UserService]

})
export class AddComponent implements DoCheck, OnInit{
    public title = "Enviar Mensaje";
    public message: Message;
    public tokken;
    public identity;
    public url;
    public res;
    public follows;
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

    getMyFollows(){
        this._followService.getMyFollows(this.tokken).subscribe(
            response =>{
                this.follows = response.follows;
            },
            error =>{
            if(error) console.log(<any>error);
        })
    }
    onSubmit(){
        console.log(this.message);
        this._messageService.addMessage(this.tokken, this.message).subscribe(
            response =>{
                if(response.message){
                    this.res= true;
                    
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