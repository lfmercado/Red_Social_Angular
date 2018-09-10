import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Params, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Follow } from '../../models/follow.model';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { Global } from '../../services/Global.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
  public title:string;
  public user: User;
  public identity;
  public tokken;
  public stats;
  public url;
  public followed;
  public following;
  public res:boolean;
  
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService:UserService,
    private _followService:FollowService
  ) { 
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.tokken = this._userService.getTokken();
    this.title = 'Perfil De Usuario';
    this.following = false;
    this.followed = false;
  }

  ngOnInit() {
    this.loadPage();
  }

  loadPage(){
    this._route.params.subscribe( params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id){
    this._userService.getUser(id).subscribe(
      response =>{
        if(response.user){
          this.user = response.user;
          this.res = true;
          console.log(response);
          
          //confirmar si el usuario al que estamos entrando al perfil nosotros lo seguimos
          if(response.value.following != null && response.value.following._id){
            this.following = true;
          }else{
            this.following = false;
          }
          //Confirmar si la persona nos sigue
          if(response.value.followed != null &&response.value.followed._id){
            this.followed = true;
          }else{
            this.followed = false;
          }

        }else{
        console.log(response);
        this.res= false;
        }
      },
      error =>{
        if(error) console.log(<any>error);
        this.res= false;
        this._router.navigate(['/profile', this.identity._id]);
      });
  }
  getCounters(id){
    this._userService.getCounter(id).subscribe(
      response => {
        this.stats = response;
        console.log(response);
      },
      error =>{
        if(error) console.log(<any>error);
      });
  }
  followUser(id){
    var follow = new Follow('',this.identity._id, id);
    this._followService.addFollow(this.tokken, follow).subscribe(
      response =>{
        if(response){
          this.following = true;
          this.getCounters(id);
        }
      },
      error =>{
        console.log(<any>error);
      });
  }

  unFollowUser(id){
    this._followService.deleteFollow(this.tokken, id).subscribe(
      response => {
        if(response){
          this.following = false;
          this.getCounters(id);
        }
      },
      error =>{
        console.log(<any>error);
      });
  }
  public followUserOver;
  mouseEnter(userId){
    this.followUserOver = userId;
  }

  mouseLeave(userId){
    this.followUserOver = 0;
  }

}
