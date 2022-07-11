import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { Autore } from 'src/app/models/autore';
import { CasaEditrice } from 'src/app/models/casa-editrice';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-add-libro',
  templateUrl: './add-libro.component.html',
  styleUrls: ['./add-libro.component.css']
})
export class AddLibroComponent implements OnInit {
  check:any;
  autore:Autore[]=[];
  editore:CasaEditrice[]=[];
  libroAdd:any;
  constructor(private cookies:CookiesService, private route:Router, private databases:DatabaseService) { }

  getAutore():any{
    return this.databases.getAutore().subscribe(res=>{
      this.autore=res;
    });
  }
  getEditore():any{
    return this.databases.getCasaEditrice().subscribe(res=>{
      this.editore=res;
    });
  }

  ngOnInit(): void {
    this.getAutore();
    this.getEditore();
    this.check=this.cookies.getCookie("user_check");
    if(this.check!="true"){
      this.route.navigate(["login"]);
    }
  }
  addLibro(libro: {titolo:string, autore:number, editore:number,copie:number ,copertina: string, trama: string}): void {
    var vis = 1000;
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
   this.libroAdd={titolo : libro.titolo , id_autore:libro.autore , id_casa_editrice:libro.editore , n_copie:libro.copie , copertina:libro.copertina , trama:libro.trama};
    this.databases.addLibro(this.libroAdd)
      .subscribe(response => {
          console.log(this.libroAdd);
          this.route.navigate(["lista_libri"]);
        }
      );
    alert("Libro Aggiunto al Database");



}

}
