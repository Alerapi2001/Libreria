import { PrestitoComponent } from './pages/prestito/prestito.component';
import { CarrelloComponent } from './pages/carrello/carrello.component';
import { LibriListComponent } from './pages/libri-list/libri-list.component';
import { RegisterComponent } from './authentication/register/register.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { LibroPageComponent } from './pages/libro-page/libro-page.component';
import { ListaPrestitiComponent } from './pages/lista-prestiti/lista-prestiti.component';
import { AddLibroComponent } from './pages/add-libro/add-libro.component';
import { AddAutoreComponent } from './pages/add-autore/add-autore.component';
import { AddEditoreComponent } from './pages/add-editore/add-editore.component';

const routes: Routes = [
  {
    path:"",
    pathMatch:"full",
    component:LoginComponent
  },
{
  path:"login",
  component:LoginComponent
},
{
  path:"register",
  component:RegisterComponent
},
{
  path:"lista_libri",
  component:LibriListComponent
},
{
  path:"carrello",
  component:CarrelloComponent
},
{
  path:"prestito",
  component:PrestitoComponent
},
{
  path:"prestito-lista",
  component:ListaPrestitiComponent
},
{
  path:"profilo",
  component:ProfiloComponent
},
{
  path:"libro",
  component:LibroPageComponent
},
{
  path:"addLibro",
  component:AddLibroComponent
},
{
  path:"addAutore",
  component:AddAutoreComponent
},
{
  path:"addEditore",
  component:AddEditoreComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
