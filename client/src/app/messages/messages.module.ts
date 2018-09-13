//Modulos necesarios
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//importamos los componentes del modulo
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';

//Rutas
import { MessagesRoutingModule } from './messages.routing';


@NgModule({
    declarations:[
        MainComponent,
        SendedComponent,
        ReceivedComponent,
        AddComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        MessagesRoutingModule
    ],
    exports:[
        MainComponent,
        SendedComponent,
        ReceivedComponent,
        AddComponent
    ],
    providers:[

    ]
})
export class MessagesModule{}