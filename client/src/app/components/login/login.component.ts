import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService]
})
export class LoginComponent implements OnInit {
  public title;
  public user : User;
  public res: boolean;
  public identity;
  public tokken;

  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title ="Login";
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.user);
    this._userService.sigUp(this.user).subscribe(
      response =>{
        console.log(response);
        if(response.user && response.user._id){
          this.identity = response.user;
          this.res = true;
          //Mantener la sesion iniciada
          this.getTokken();  
          localStorage.setItem('identity', JSON.stringify(this.identity));    
          this._router.navigate(['/']);
        }
        else{
          this.res = false;
        }
      },
      error => {
        this.res = false;
        console.log(<any>error);
      });
  }

  getTokken(){
    this._userService.sigUp(this.user, 'true').subscribe(
      response =>{
        this.tokken = response;
        if(this.tokken != null && this.tokken != undefined){
          this.res = true;
          localStorage.setItem('tokken',   JSON.stringify(this.tokken));
        }
        else{
          this.res = false;
        }
      },
      error => {
        this.res = false;
        console.log(<any>error);
      });
  }

}
