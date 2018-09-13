import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  public title:string;
  public identity;
  public tokken;
  constructor(private _userService: UserService) { 
    this.title = '¡¡Bienvenido a NG Social!!';
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken= this._userService.getTokken();
  }

}
