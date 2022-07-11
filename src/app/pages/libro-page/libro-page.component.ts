import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Autore } from 'src/app/models/autore';
import { CasaEditrice } from 'src/app/models/casa-editrice';
import { Libro } from 'src/app/models/libro';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-libro-page',
  templateUrl: './libro-page.component.html',
  styleUrls: ['./libro-page.component.css']
})
export class LibroPageComponent implements OnInit {
  libroCurrent: any ="";
  libro: Libro[] = [];
  autore: Autore[] = [];
  casaEditrice : CasaEditrice[] = [];
  checkTrama:boolean=false;

  constructor(private cookies:CookiesService,private databases:DatabaseService) { }

  getLibri () : any {
    this.databases.getLibro().subscribe(res => {
      this.libro = res;
    })
  }

  getAutore () : any {
    this.databases.getAutore().subscribe(res => {
      this.autore = res;
    })
  }

  getCasaEditrice () : any {
    this.databases.getCasaEditrice().subscribe(res =>{
      this.casaEditrice = res;
    })
  }

  ngOnInit(): void {
    this.libroCurrent = this.cookies.getCookie("paginaLibroId");
    this.getLibri();
    this.getAutore();
    this.getCasaEditrice();
    this.checkTrama=false;
  }

  vediTrama(){
    if(this.checkTrama==false){
      this.checkTrama=true;
    }
    else{
      this.checkTrama=false;
    }
  }

}
