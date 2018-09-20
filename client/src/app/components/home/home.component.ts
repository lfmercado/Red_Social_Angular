import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, MessageService]
})
export class HomeComponent implements OnInit {
  public title: string;
  public identity;
  public tokken;
  public unviewed;
  constructor(private _userService: UserService,
              private _messageService: MessageService) {
    this.title = '¡¡Bienvenido a NG Social!!';
    this.tokken = this._userService.getTokken();
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken= this._userService.getTokken();    
  }
}
