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
        if(response.user && response.user._id != ""){
          this.identity = response.user;          
          //Mantener la sesion iniciada
          this.getTokken();  
          localStorage.setItem('identity', JSON.stringify(this.identity));    
          this._router.navigate(['/']);
          this.res = true;
        }else{
          this.res = false; 
          console.log('error');
        }

      },
      error => {
        console.log(<any>error);
        this.res = false;
      });
  }

  getTokken(){
    this._userService.sigUp(this.user, 'true').subscribe(
      response =>{
        this.tokken = response.tokken;
        if(this.tokken != null && this.tokken != undefined){
          localStorage.setItem('tokken',this.tokken);
          this.getCounters();
        }
      },
      error => {
        console.log(<any>error);
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
