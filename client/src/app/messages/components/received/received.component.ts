import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message.model';
import { Follow } from '../../../models/follow.model';

import { Global } from '../../../services/Global.service';
import { UserService } from '../../../services/user.service';

import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';

import { fadeLateral } from '../../../animation';  
declare var $;
@Component({
    selector: 'received',
    templateUrl: './received.component.html',
    providers: [FollowService, MessageService, UserService]
})
export class ReceivedComponent implements DoCheck, OnInit{
    public title = "Mensajes Recibidos";
    public message: Message;
    public tokken;
    public identity;
    public url;
    public res;
    public follows;
    public messages;
    public pages;
    public total;
    public page;
    public nextPage;
    public previusPage;
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
        this.actualPage();
    }

    getMessages(tokken, page, adding = false){
        this._messageService.getMyMessages(this.tokken, page).subscribe(
            response =>{

                if(response.messages){
                    console.log(response);                    
                    this.messages = response.messages;
                    console.log(this.messages);
                    this.total = response.total;
                    this.pages = response.pages;

                    if(!adding){
                        this.messages = response.messages;
                        if(response.messages.length <= 0){
                          this.res = false;
                          console.log(this.res);
                        }else{
                          this.res = true;
                        }
                      }else{
                        var array = this.messages;
                        var arrayB = response.messages;
                                            //con el concat le añado elementos al array
                        this.messages = array.concat(arrayB)
                        console.log(this.messages);
                        //por medio de la libreria de Jquery hacemos que la pagina haga scroll automatico cada vez que
                        //carguemos nuevas publicaciones
                        $("html, body").animate({scrollTop: $('html').prop("scrollHeight")}, 500);
                        //$('.panel-body').slice();
            
                      }
                }
                },
                error =>{
                    if(error){
                        console.log(<any>error);
                        this.res =false;
                    }
            });
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

      //Metodo para tomar la pagina actual
   actualPage(){
    this._route.params.subscribe(
      params =>{
                  //con el simbolo mas convierto lo que traiga en un entero
        let page = +params['page'];
         this.page = page;
        if (!params['page']){
          this.page = 1;
        }
        if(!this.page){
          this.page = 1;
        }else{
          this.nextPage = this.page + 1;
          this.previusPage = this.page - 1;
          if(this.previusPage <= 0) this.previusPage = 1;         
        }
        //Tomamos todos los usuarios que existan
        this.getMessages(this.tokken, this.page);
        this.setMessageViewed();
      });
  }
  public noViewMore = false;
  viewMore(){
    this.page += 1;
    if(this.page == this.pages){
        this.noViewMore = true;
    }    
    this.getMessages(this.tokken, true);
  }

  setMessageViewed(){

    this._messageService.setViewedMessages(this.tokken).subscribe(
        response =>{
            console.log(response);            
        },
        error =>{
            if(error) console.log(<any>error);
            
        }
    )
  }
}
