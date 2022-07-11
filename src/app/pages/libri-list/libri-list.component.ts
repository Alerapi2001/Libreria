import { Router } from '@angular/router';
import { CasaEditrice } from './../../models/casa-editrice';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Autore } from 'src/app/models/autore';
import { Libro } from 'src/app/models/libro';
import { HttpClient } from '@angular/common/http';
import { Lista } from 'src/app/models/lista';
import { Carrello } from 'src/app/models/carrello';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-libri-list',
  templateUrl: './libri-list.component.html',
  styleUrls: ['./libri-list.component.css']
})
export class LibriListComponent implements OnInit {
  case_editrici: CasaEditrice[] = [];
  autori:Autore[]= [] ;
  libri:Libro[]= [];
  carrello:Carrello []=[];
  carrelloAdd:any;
  nome_aut : string="";
  cogn_aut : string="";
  nome_edit : string="";
  term = '';
  id:any="";
  check:any;
  checkAdmin:any;
  listali:Lista[]= [];

  constructor(private databases:DatabaseService, private route:Router, private http: HttpClient,private cookies:CookiesService) {

  }
  getCaseEditrici(): any {
    return this.databases.getCasaEditrice()
      .subscribe(res => {
        this.case_editrici = res;
        console.log(this.case_editrici);
      });
  }
  getCarrello(): any {
    return this.databases.getCarrello()
      .subscribe(res => {
        this.carrello = res;
        console.log(this.carrello);
      });
  }
  getAutori(): any {
    return this.databases.getAutore()
      .subscribe(res => {
        this.autori = res;
        console.log(this.autori);
      });
  }
  getLibri(): any {
    return this.databases.getLibro()
      .subscribe(res => {
        this.libri = res;
        console.log(this.libri);
      });
  }
  ngOnInit(): void {
    this.getCaseEditrici();
    this.getAutori();
    this.getLibri();
    this.getCarrello();
    this.id=this.cookies.getCookie("user_loged");
    this.check=this.cookies.getCookie("user_check");
    if(this.check!="true"){
      this.route.navigate(["login"]);
    }
    this.checkAdmin=this.cookies.getCookie("admin_check");
  }


  addCart(libroid:any): void {var vis = 1000;
    window.alert = function (message){
      var a= document.createElement('div');
      var y=document.createElement('button');
      a.style.cssText="width:500px; padding:30px;text-align:center; background:#ba2626; color:white;font-size: 20px;position:fixed; top:200px; right:0; left:0; margin:auto;box-shadow:0 0 10px black; z-index:"+ vis+ ";";
      a.innerHTML = message + "<br>";
      y.style.cssText="background:#f6f6f6; color:#ba2626; width: 50%; border:none; transition:all 0.5s ease; margin-top:20px;";
      y.onmouseover= function(){
        y.style.cssText="background:#ba2626; color:#f6f6f6; width: 50%; border:none; transition:all 0.5s ease;margin-top:20px;";
      }
      y.onmouseout= function(){
        y.style.cssText="background:#f6f6f6; color:#ba2626; width: 50%; border:none; transition:all 0.5s ease;margin-top:20px;";
      }
      y.onmouseover;
      y.onmouseout;
      y.innerHTML="OK";
      document.body.appendChild(a);
      a.appendChild(y);
      vis--;
      y.addEventListener("click", function() {
        a.remove();
        window.location.reload();
        }
      )
    };
    this.carrelloAdd={id_utente : this.id , id_libro:libroid}
    this.databases.addCarrello(this.carrelloAdd)
      .subscribe(response => {
          console.log(this.carrelloAdd);
        }
      );
      alert("Aggiunto al carrello");
  }

  manda(id:any){
    this.cookies.setCookie("paginaLibroId", id, 7);
    this.route.navigate(["libro"]);
  }


  get():any{
    for(let i=0;i<this.libri.length;i++){
      for(let c=0;c<this.autori.length;c++){
        if(this.autori[c].id==this.libri[i].id_autore){
          this.nome_aut=this.autori[c].nome;
          this.cogn_aut=this.autori[c].cognome;
        }
      }

      for(let d=0;d<this.case_editrici.length;d++){
        if(this.case_editrici[d].id==this.libri[i].id_casa_editrice){
          this.nome_edit=this.case_editrici[d].nome_editore;
        }
      }
this.listali[i]={
  id:this.libri[i].id,
  titolo:this.libri[i].titolo,
  nome_autore:this.nome_aut,
  cognome_autore:this.cogn_aut,
  nome_casa_editrice:this.nome_edit,
  copertina:this.libri[i].copertina,
  n_copie:this.libri[i].n_copie
}
  }
  console.log(this.listali);
  }

}
