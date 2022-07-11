import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { LibriListComponent } from './pages/libri-list/libri-list.component'
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { PrestitoComponent } from './pages/prestito/prestito.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { ListaPrestitiComponent } from './pages/lista-prestiti/lista-prestiti.component';
import { AddLibroComponent } from './pages/add-libro/add-libro.component';
import { AddAutoreComponent } from './pages/add-autore/add-autore.component';
import { AddEditoreComponent } from './pages/add-editore/add-editore.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LibriListComponent,
    CarrelloComponent,
    PrestitoComponent,
    ProfiloComponent,
    LibroPageComponent,
    ListaPrestitiComponent,
    AddLibroComponent,
    AddAutoreComponent,
    AddEditoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
