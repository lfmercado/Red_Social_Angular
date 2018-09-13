import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Message } from '../../../models/message.model';
import { Follow } from '../../../models/follow.model';

import { Global } from '../../../services/Global.service';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';

import { fadeLateral } from '../../../animation';   

@Component({
    selector: 'sended',
    templateUrl: './sended.component.html',

})
export class SendedComponent implements DoCheck, OnInit{
    public title = "Mensajes Enviados";
    constructor(){

    }
    ngDoCheck(){

    }
    ngOnInit(){

    }
}
