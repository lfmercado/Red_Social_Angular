import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

//Modulo de animacion
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { MomentModule } from 'angular2-moment';

//modulo de mensajes privados
import { MessagesModule } from './messages/messages.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { TimeLineComponent } from './components/time-line/time-line.component';
import { PeopleComponent } from './components/people/people.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

//Servicios
import { UserService } from './services/user.service';
import { AdminGuard } from './services/user.guards';




@NgModule({
  declarations: [//Aqui se cargan los pipes y los componentes
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TimeLineComponent,
    PeopleComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent
  ],
  imports: [//Aqui se cargan los modulos que se crean interna o extenamente
    BrowserModule,
    routing,
    FormsModule,
    //HttpModule
    HttpClientModule,
    MomentModule,
    BrowserAnimationsModule,
    MessagesModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MaterialModule
  ],
  exports:[
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [//Aqui se importar los servicios
    appRoutingProviders,
    UserService,
    AdminGuard
  ],//Aqui se carga el componente principal
  bootstrap: [AppComponent]
})
export class AppModule { }
