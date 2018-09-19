import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//importamos los componentes del modulo
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { MainComponent } from './components/main/main.component';
import { SendedComponent } from './components/sended/sended.component';

import { AdminGuard } from '../services/user.guards';
import { AddToComponent } from './components/addTo/addTo.component';

const messagesRoutes: Routes =[
    {
        path: 'messages',
        component: MainComponent,
        canActivate:[AdminGuard],
        children:[
            {path: '', redirectTo: 'received', pathMatch: 'full'},
            {path: 'send', component: AddComponent, canActivate:[AdminGuard]},
            {path: 'sendTo/:id', component: AddToComponent, canActivate:[AdminGuard]},
            {path: 'received', component: ReceivedComponent, canActivate:[AdminGuard]},
            {path: 'received/:page', component: ReceivedComponent, canActivate:[AdminGuard]},
            {path: 'sended', component: SendedComponent, canActivate:[AdminGuard]},
            {path: 'sended/:page', component: SendedComponent, canActivate:[AdminGuard]}
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