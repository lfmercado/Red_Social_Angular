//Modulos necesarios
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MomentModule } from 'angular2-moment';

//importamos los componentes del modulo
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';


//Rutas
import { MessagesRoutingModule } from './messages.routing';

//Servicios
import { UserService } from '../services/user.service';
import { AdminGuard } from '../services/user.guards';
import { AddToComponent } from './components/addTo/addTo.component';

@NgModule({
    declarations:[
        MainComponent,
        SendedComponent,
        ReceivedComponent,
        AddComponent,
        AddToComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        MessagesRoutingModule,
        MomentModule
    ],
    exports:[
        MainComponent,
        SendedComponent,
        ReceivedComponent,
        AddComponent,
        AddToComponent
    ],
    providers:[
        UserService,
        AdminGuard
    ]
})
export class MessagesModule{}