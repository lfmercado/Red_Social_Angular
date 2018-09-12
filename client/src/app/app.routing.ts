import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

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
    {path: 'following/:id/:page', component:FollowingComponent},
    {path: 'followed/:id/:page', component:FollowedComponent},
    {path: 'profile/:id', component:ProfileComponent},
    //Esta es la ruta 404, cuando se escribe una ruta que no existe se redireccione a home
    //la ruta 404 siempre tiene que ser la ultima, pq el compilador no toma las rutas que esten por debajo de esta
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);