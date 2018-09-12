import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public title;
  public user: User;
  public res: boolean;
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = "Registro";
    this.user = new User('','','','','','ROLE_USER','');
  }

  ngOnInit() {
  }

  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response =>{
        console.log(response);
        if(response.user && response.user._id){
          console.log(response.user);
          this.res = true;
          registerForm.reset();
        }
        else{
          this.res = false;
        }
      },
      error =>{
        console.log(<any>error);
        this.res = false;
      }
    );
    //console.log(this.user);
  }

}
