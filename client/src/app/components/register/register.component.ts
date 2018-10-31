import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register', //por medio de una etiqueta html con este nombre angular reconoce que este componente esta siendo llamado
  templateUrl: './register.component.html', //se le indica a angular donde esta la plantilla html
  styleUrls: ['./register.component.css'], //se le indica a angular donde esta la hoja de estilos
  providers: [UserService] //son los servicios que utiliza el componente
})
export class RegisterComponent implements OnInit { //
  public title;
  public user: User;
  public res: boolean;
  constructor(
    private _route : ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) { 
    this.title = "Registro";
    this.user = new User('','','','','','','','ROLE_USER','','');
  }

  ngOnInit() {
  }

  onSubmit(registerForm){
    this._userService.register(this.user).subscribe(
      response =>{ //todo ok
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
