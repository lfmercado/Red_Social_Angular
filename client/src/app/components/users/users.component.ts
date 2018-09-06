import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/Global.service';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, FollowService]
})
export class UsersComponent implements OnInit, DoCheck {

  public title = 'Personas';
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

  public follows;
  public followUserOver;

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
                  //con el simbolo mas convierto lo que traiga en un entero
        let page = +params['page'];
        this.page = page;
        if (!params['page']){
          this.page = 1;
        }
        if(!this.page){
          this.page = 1;
        }else{ console.log(this.page);
          this.nextPage = this.page + 1;
          this.previusPage = this.page - 1;
          if(this.previusPage <= 0) this.previusPage = 1;   
          console.log(this.nextPage);       
        }
        //Tomamos todos los usuarios que existan
        this.getUser(page);
      });
  }

  getUser(page){
    this._userService.getUsers(page).subscribe(
      response =>{
          if(!response.users){
            this.res = false;
          }else{
            this.total = response.total;
            this.users = response.users;
            this.pages = response.pages;
            this.follows = response.userFollowing;
            console.log(this.follows);
            if(page > this.pages)
            {
              this._router.navigate(['/gente', 1]);
            }
            console.log(response);
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
          if(search != -1){ //el segundo parametro es para que elimine la cantida de elementos despues del elemento encontrado
            this.follows.splice(search, 1)
            this.getCounters();
          }
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

}
