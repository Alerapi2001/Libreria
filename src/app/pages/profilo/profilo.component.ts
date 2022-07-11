import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Utente } from 'src/app/models/utente';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  utenti!: Utente[];
  userCurrent: any ="";


  constructor(private cookie:CookiesService, private databases:DatabaseService) { }

  getUtente(): any {
    return this.databases.getUtente()
      .subscribe(res => {
        this.utenti = res;
        console.log(this.utenti);
      });
  }

  ngOnInit(): void {
    this.getUtente();
    this.userCurrent = this.cookie.getCookie("user_loged");
  }

  cambioPassword() {
    
  }

}


