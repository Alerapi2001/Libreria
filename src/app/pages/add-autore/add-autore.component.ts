import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-add-autore',
  templateUrl: './add-autore.component.html',
  styleUrls: ['./add-autore.component.css']
})
export class AddAutoreComponent implements OnInit {
  check:any;
  autoreAdd:any;
  constructor(private cookies:CookiesService, private route:Router, private databases:DatabaseService) { }

  ngOnInit(): void {
    this.check=this.cookies.getCookie("user_check");
    if(this.check!="true"){
      this.route.navigate(["login"]);
    }
  }

  addAutore(autore:{nome:string, cognome:string}){
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
   this.autoreAdd={nome : autore.nome , cognome:autore.cognome};
    this.databases.addAutore(this.autoreAdd)
      .subscribe(response => {
          console.log(this.autoreAdd);
          this.route.navigate(["addLibro"]);
        }
      );
    alert("Autore Aggiunto al Database");
  }

}
