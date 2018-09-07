import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PublicationService } from './services/publication.service';

import { Global } from './services/Global.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, PublicationService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'Ng Social';
  public identity;
  public tokken;
  public url:string;
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _publicationService: PublicationService
  ){
    this.url = Global.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
  } 

  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
//    this.getPublication(1);
  }

  logOut(){
    localStorage.clear();
  }
}


