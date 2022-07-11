import { Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Carrello } from 'src/app/models/carrello';
import { Libro } from 'src/app/models/libro';
import { Utente } from 'src/app/models/utente';
import { CookiesService } from 'src/app/services/cookies.service';
import { TransferService } from 'src/app/services/transfer.service';

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css']
})
export class CarrelloComponent implements OnInit{
  carrello : Carrello[] = [];
  libri : Libro[] = [];
  utenti : Utente[] = [];
  id_utente: any;
  check:any;
  constructor(private databases:DatabaseService , private cookies:CookiesService, private route:Router, private transfer:TransferService) { }

  ngOnInit(): void {
    this.id_utente=this.cookies.getCookie("user_loged");
      this.getCarrello(this.id_utente);
      this.getLibri();
      this.getUtenti();
      this.check=this.cookies.getCookie("user_check");
      if(this.check!="true"){
        this.route.navigate(["login"]);
      }
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

  getLibri():any{
    return this.databases.getLibro()
    .subscribe(res=>{
      this.libri=res;
      console.log(this.libri);
    });
  }

  getUtenti():any{
    return this.databases.getUtente()
    .subscribe(res=>{
      this.utenti=res;
      console.log(this.utenti);
    });
  }


  prestito(id_libro:any, id:any){
    this.cookies.setCookie("id_libro_prestito",id_libro,7);
    this.cookies.setCookie("id_carrello_prestito",id,7);
    this.route.navigate(["prestito"]);
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
      this.getCarrello(this.id_utente);
    });
    alert("LIBRO RIMOSSO DAL CARRELLO");
  }

}
