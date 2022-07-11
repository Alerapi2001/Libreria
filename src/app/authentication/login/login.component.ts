import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { Utente } from 'src/app/models/utente';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkato:boolean=false;
  utenti!: Utente[];
  userloggato:any=false;
  password_cript:any;
  constructor( private route : Router,private databases:DatabaseService, private cookies:CookiesService) { }


  getUtente(): any {
    return this.databases.getUtente()
      .subscribe(res => {
        this.utenti = res;
        console.log(this.utenti);
      });
  }

  ngOnInit(): void {
    this.getUtente();
    this.password_cript="";
    this.userloggato=this.cookies.getCookie("user_check");
    if(this.userloggato=="true"){
      this.route.navigate(["lista_libri"]);
    }
  }



  login(logUs: { password: string; email: string; }):any{
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
        }
      )
    };
    for(let i=0; i<this.utenti.length;i++){
      this.password_cript=window.btoa(logUs.password);
      if(this.utenti[i].password== this.password_cript && this.utenti[i].email == logUs.email){
        this.checkato=false;
        this.cookies.setCookie("user_loged", this.utenti[i].id,7);
        this.cookies.setCookie("username_loged", this.utenti[i].username,7);
        this.cookies.setCookie("user_check", "true",7);
        this.cookies.setCookie("admin_check", this.utenti[i].admin,7);
        window.location.reload();
        this.route.navigate(['lista_libri']);
        break;
      }
      else{
        this.checkato=true;
      }
    }
    if(this.checkato==true){
      window.alert("Email o Password Errati");
    }
  }

}
