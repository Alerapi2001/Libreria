import { Carrello } from './../../models/carrello';
import { Utente } from './../../models/utente';
import { Router } from '@angular/router';
import { CookiesService } from './../../services/cookies.service';
import { Libro } from './../../models/libro';
import { DatabaseService } from 'src/app/database.service';
import { Component, OnInit } from '@angular/core';
import { Autore } from 'src/app/models/autore';
import { CasaEditrice } from 'src/app/models/casa-editrice';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  autore!:Autore[];
  libro!:Libro[] ;
  editore!:CasaEditrice[] ;
  carrello:Carrello[]=[];
  utenti:Utente[] = [];
  user_current: any ="";
  id_utente: any;
  adminCheck:any;
  constructor(private databases:DatabaseService, private cookie:CookiesService, private route:Router) { }

  getAutori():any{
    return this.databases.getAutore()
    .subscribe(res =>{
      this.autore= res;
    });
  }

  getCarrello(id:any):any{
    return this.databases.getCarrello()
    .subscribe(res=>{
      let n=0;
      for(let r=0;r<res.length;r++){
        if(res[r].id_utente == id){
          this.carrello[n]=res[r];
          n++;
        }
      }
    });
  }

  getLibro():any{
    return this.databases.getLibro()
    .subscribe(res =>{
      this.libro= res;
    });
  }


  getUtente():any{
    return this.databases.getUtente()
    .subscribe(res =>{
      this.utenti= res;
    });
  }


  getEditore():any{
    return this.databases.getCasaEditrice()
    .subscribe(res =>{
      this.editore= res;
    });
  }

  ngOnInit(): void {
    this.id_utente=this.cookie.getCookie("user_loged");
    this.getAutori();
    this.getEditore();
    this.getLibro();
    this.getCarrello(this.id_utente);
    this.user_current=this.cookie.getCookie("username_loged");
    this.adminCheck=this.cookie.getCookie("admin_check");
  }

  logout(){
    this.cookie.setCookie("user_loged", "",7);
    this.cookie.setCookie("username_loged", "",7);
    this.cookie.setCookie("user_check", "",7);
    this.cookie.setCookie("admin_check", "",7);
    window.location.reload();
    this.route.navigate(["login"]);
  }

}
