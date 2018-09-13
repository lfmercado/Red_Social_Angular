import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importamos los componentes del modulo
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';

const messagesRoutes: Routes =[
    {
        path: 'messages',
        component: MainComponent,
        children:[
            {path: '', redirectTo: 'received', pathMatch: 'full'},
            {path: 'send', component: AddComponent},
            {path: 'received', component: ReceivedComponent},
            {path: 'sended', component: SendedComponent}
        ]
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(messagesRoutes)
    ],
    exports:[RouterModule]
})
export class MessagesRoutingModule{}