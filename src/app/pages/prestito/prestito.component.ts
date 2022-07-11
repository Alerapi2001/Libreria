import { Carrello } from 'src/app/models/carrello';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { Autore } from 'src/app/models/autore';
import { CasaEditrice } from 'src/app/models/casa-editrice';
import { Libro } from 'src/app/models/libro';
import { CookiesService } from 'src/app/services/cookies.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-prestito',
  templateUrl: './prestito.component.html',
  styleUrls: ['./prestito.component.css']
})
export class PrestitoComponent implements OnInit {
  libro:Libro[]=[];
  autore:Autore[]=[];
  editore:CasaEditrice[]=[];
  carrello : Carrello[] = [];
  id_libro:any;
  id_carrello:any;
  n_copie_libro_corrente:any;
  prestitoAdd:any;
  id_utente:any;
  fulldata:any;
  data:any;
  month:any;
  day:any;
  constructor(private databases:DatabaseService, private cookies:CookiesService, private route:Router) { }

  getLibro():any{
    return this.databases.getLibro()
    .subscribe(res=>{
      this.libro=res;
    })
  }

  getCarrello():any{
    return this.databases.getCarrello()
    .subscribe(res=>{
      this.carrello=res;
    });
  }
  getAutore():any{
    return this.databases.getAutore()
    .subscribe(res=>{
      this.autore=res;
    })
  }
  getEditore():any{
    return this.databases.getCasaEditrice()
    .subscribe(res=>{
      this.editore=res;
    })
  }

  getData():any{
    this.data=(<HTMLInputElement>document.getElementById("dataPicker")).value
  }

  ngOnInit(): void {
    this.id_libro=this.cookies.getCookie("id_libro_prestito");
    this.id_carrello=this.cookies.getCookie("id_carrello_prestito");
    this.id_utente=this.cookies.getCookie("user_loged");
    this.getLibro();
    this.getAutore();
    this.getEditore();
    this.fulldata=new Date();
    this.month=this.fulldata.getMonth()+1;
    if(this.month<10 && this.month>0){
      this.month="0"+this.month;
    }
    this.day=this.fulldata.getDate();
    if(this.day<10 && this.day>0){
      this.day="0"+this.day;
    }
    this.data=this.fulldata.getFullYear()+"-"+this.month+"-"+this.day;
  }

  remove(id:any):any{var vis = 1000;
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
    this.databases.removeCart(id).subscribe(res=>{
      this.getCarrello();
    });
  }

  conferma(){var vis = 1000;
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
    for(let i=0;i<this.libro.length;i++){
      if(this.libro[i].id==this.id_libro){
        if(Number(this.libro[i].n_copie)>0){

    this.prestitoAdd={ id_libro:this.id_libro ,id_utente : this.id_utente , tempo_prestito: (<HTMLInputElement>document.getElementById("giorni_prestito")).value , giorno_prestito: this.data }
    this.databases.addPrestito(this.prestitoAdd)
      .subscribe(response => {
          console.log(this.prestitoAdd);
        }
      );
        this.n_copie_libro_corrente=this.libro[i].n_copie;
        this.databases.updateCopie(this.id_libro,this.n_copie_libro_corrente-1).subscribe(res=>{
          this.getLibro();
        });
        this.remove(this.id_carrello);
        alert("Prestito Eseguito");
        this.route.navigate(["lista_libri"]);
        }
        else{
          alert("Copia Non Disponibile");
        }
      }
    }
  }

}
