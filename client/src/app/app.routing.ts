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

import { AdminGuard } from './services/user.guards';

const appRoutes : Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'user-edit', component: UserEditComponent},
    {path: 'users', component: UsersComponent, canActivate:[AdminGuard]},
    {path: 'users/:page', component: UsersComponent, canActivate:[AdminGuard]},
    {path: 'time-line', component: TimeLineComponent, canActivate:[AdminGuard]},
    {path: 'time-line/:page', component: TimeLineComponent, canActivate:[AdminGuard]},
    {path: 'following/:id/:page', component:FollowingComponent, canActivate:[AdminGuard]},
    {path: 'followed/:id/:page', component:FollowedComponent, canActivate:[AdminGuard]},
    {path: 'profile/:id', component:ProfileComponent, canActivate:[AdminGuard]},
    //Esta es la ruta 404, cuando se escribe una ruta que no existe se redireccione a home
    //la ruta 404 siempre tiene que ser la ultima, pq el compilador no toma las rutas que esten por debajo de esta
    {path: '**', component:HomeComponent}
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);