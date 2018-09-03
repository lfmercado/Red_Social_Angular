import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
//import { HttpModule } from '@angular/http';
import {HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [//Aqui se cargan los pipes y los componentes
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [//Aqui se cargan los modulos que se crean interna o extenamente
    BrowserModule,
    routing,
    FormsModule,
    //HttpModule
    HttpClientModule
  ],
  providers: [//Aqui se importar los servicios
    appRoutingProviders
  ],//Aqui se carga el componente principal
  bootstrap: [AppComponent]
})
export class AppModule { }
