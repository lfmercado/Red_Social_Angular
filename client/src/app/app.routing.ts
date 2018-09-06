import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimeLineComponent } from './components/time-line/time-line.component';

const appRoutes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-edit', component: UserEditComponent},
    {path: 'users', component: UsersComponent},
    {path: 'users/:page', component: UsersComponent},
    {path: 'time-line', component: TimeLineComponent},
    {path: 'time-line/:page', component: TimeLineComponent},
    //Esta es la ruta 404, cuando se escribe una ruta que no existe se redireccione a home
    //la ruta 404 siempre tiene que ser la ultima, pq el compilador no toma las rutas que esten por debajo de esta
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);