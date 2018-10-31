import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PublicationService } from './services/publication.service';
import { Global } from './services/Global.service';
import { MessageService } from './services/message.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, PublicationService, MessageService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Ng Social';
  public identity;
  public tokken;
  public url:string;
  public unviewed;
  public unviewed2;
  public actNotificacion: boolean;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _publicationService: PublicationService,
    private _messageService: MessageService
  ){
    this.url = Global.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.getUnviewedMessages(this.tokken);
  } 

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    if(this.unviewed == undefined || this.unviewed == null){
      this.getUnviewedMessages(this.tokken);
      this.unviewed2 = this._messageService.getMessagesUnviewed();
      console.log(this.unviewed2);
    }
    //this.getUnviewedMessages(this.tokken);
    //this.getPublication(1);
  }


  getUnviewedMessages(tokken){
    this._messageService.getUnviewedMessages(tokken).subscribe(
      response =>{
        console.log(response);
        localStorage.setItem('unviewed', JSON.stringify(response));
        this.unviewed = response;
        if(this.unviewed.unviewed == 0){
          console.log('soy 0');
          this.actNotificacion = false;
        }else{
          console.log('mayor a 0');
          this.actNotificacion = true;
          
        }
        console.log(this.unviewed);
      },
      error => {
        if(error) console.log(<any>error); 
        return error;
      });
  }

  logOut(){
    localStorage.clear();
    this.unviewed = undefined;
  }
}


