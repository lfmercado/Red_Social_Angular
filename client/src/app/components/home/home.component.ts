import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgModule } from '@angular/core';
import { MessageService } from '../../services/message.service';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule]
})

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
  public tiles;
  constructor(private _userService: UserService,
              private _messageService: MessageService) {
    this.title = '¡¡Bienvenido a NG Social!!';
    this.tokken = this._userService.getTokken();
    this.tiles = [
      {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
      {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
      {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
      {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.tokken= this._userService.getTokken();    
  }
}
