import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { FollowService } from '../../services/follow.service';

import { fadeLateral } from '../../animation';  

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
  providers: [UserService, FollowService],
  animations: [fadeLateral]
})
export class FollowingComponent implements OnInit, DoCheck {

  public title = 'Usuarios seguidos por: ';
  public url: string;
  public identity;
  public tokken;
  public page;
  public nextPage;
  public previusPage;
  public res;

  public total;
  public pages;
  public users : User[];

  public following;
  public follows;
  public followUserOver;

  public userPageId:String;

  constructor(
    private _route: ActivatedRoute,
    private _router : Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {  
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.tokken= this._userService.getTokken();
  }

  ngOnInit() {
    this.actualPage();
  }
  ngDoCheck() {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    
  }

  //Metodo para tomar la pagina actual
  actualPage(){
    this._route.params.subscribe(
      params =>{
        let userId = params['id'];  
                  //con el simbolo mas convierto lo que traiga en un entero
        let page = +params['page'];
        console.log(params);
        this.userPageId = userId;
        console.log(userId);
        this.page = page;
        
        if (!params['page']){
          this.page = 1;
        }
        if(!this.page){
          this.page = 1;
        }else{ 
          console.log(this.page);
          this.nextPage = this.page + 1;
          this.previusPage = this.page - 1;
          if(this.previusPage <= 0) this.previusPage = 1;   
          console.log(this.nextPage);       
        }
        //Tomamos todos los usuarios que existan
        this.getfollows(this.userPageId, page);
        this.getUser(this.userPageId);
        console.log(this.userPageId);
      });
      
  }

  getfollows(userId, page){
    this._followService.getFollowing(this.tokken, userId, page).subscribe(
      response =>{
        console.log(userId);
          if(response.follows.length < 1){
            this.res = false;
            this.page = 0;
          }
          if(!response.follows ){
            this.res = false;
          }else{
            this.total = response.total;
            this.users = response.users;
            this.pages = response.pages;
            this.follows = response.follows;
            console.log(this.follows);
            if(page > this.pages)
            {
              this._router.navigate(['/following', this.userPageId, 1]);
            }
          }
      },
      error=>{

          if(error) console.log(<any>error);
          this.res = false;
      });
  }

  mouseEnter(userId){
    this.followUserOver = userId;
  }

  mouseLeave(userId){
    this.followUserOver = 0;
  }

  followUser(followed){
  //var follow = JSON.parse('{ "_id":"\'\'", "user":"'+this.identity._id+'", "followed":"'+followed+'" }'); 
   var follow = new Follow('',this.identity._id,followed);
    this._followService.addFollow(this.tokken, follow).subscribe(
      response =>{
        //console.log(response);
        if(!response.follow) {
          this.res=false;
        }else{
          this.res = true;
          this.follows.push(followed);
          console.log(this.follows);
          this.getCounters();
        }
      },
      error =>{
        if(error) console.log(<any>error);
          this.res = false;
      });
  }
  
  unFollowUser(followed){
    this._followService.deleteFollow(this.tokken, followed).subscribe(
      response =>{
        var search = this.follows.indexOf(followed);
        console.log(response);
          if(search != -1){ //el segundo parametro es para que elimine la cantida de elementos despues del elemento encontrado
            this.follows.splice(search, 1)
            this.getCounters();
          }
          this.follows.splice(search, 1)
          this.getCounters();
      },
      error =>{
        if(error) console.log(<any>error);
          this.res = false;
      });
  }
  getCounters(){

    this._userService.getCounter().subscribe(
      response =>{
        console.log(response);
      if(response.following != undefined){
        localStorage.setItem('stats', JSON.stringify(response));
        this.res = true;
      }
      },
      error=>{    
        this.res = false;   
        console.log(error);
      });
  } 

  public user :User;
  getUser(id){
    this._userService.getUser(id).subscribe(
      response =>{
        if(response.user){
          this.user = response.user;
        }else{
          this._router.navigate(['/home'])
        }
      },
      error =>{
        if(error) {
          console.log(<any>error);
          this._router.navigate(['/home'])
        }
        
      });
  }

}
