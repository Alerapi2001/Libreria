import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Utente } from 'src/app/models/utente';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  utentelist:Utente[]=[];
  utenteAdd:any;
  checkUserEsiste:boolean=false;
  checkPasswordCorrisponde:boolean=false;
  constructor(private databases:DatabaseService, private cookies:CookiesService, private route:Router) { }

  ngOnInit(): void {
    this.getUtente();
  }

  getUtente():any{
    return this.databases.getUtente().subscribe(res=>{
      this.utentelist=res;
    });
  }

  addUtente(utente: {nome:string, cognome:string, username:string,email: string, password: string,password2:string; sesso: string,data_nascita:string }): void {
    var vis = 1000;
    this.checkUserEsiste=false;
    this.checkPasswordCorrisponde=false;
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
    for(let i=0; i<this.utentelist.length;i++){
      if(this.utentelist[i].email==utente.email){
        this.checkUserEsiste=true;
        alert("Utente Già Registrato");
      }
    }
    if(utente.nome == "" || utente.cognome=="" || utente.username=="" || utente.email=="" || utente.password=="" || utente.sesso=="" || utente.data_nascita==""){
      alert("Riempi tutti i campi");
    }
    else{
    if(utente.password!=utente.password2){
      alert("Le Password Non Coincidono");
    }
    else{
    if(this.checkUserEsiste==false){
    utente.password=window.btoa(utente.password);
    this.utenteAdd={nome : utente.nome , cognome:utente.cognome , username:utente.username, email:utente.email , password:utente.password , sesso:utente.sesso , data_nascita:utente.data_nascita};
    this.databases.addUtente(this.utenteAdd)
      .subscribe(response => {
          console.log(this.utenteAdd);
          this.route.navigate(["login"]);
          window.location.reload();
        }
      );
    alert("Registrazione Completata");
    }
  }
  }
}

}
