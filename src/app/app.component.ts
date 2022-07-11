import { Component, OnInit } from '@angular/core';
import { CookiesService } from './services/cookies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LibreriaProject';
  check:any;
  showNav:boolean=true;
  constructor(private cookie:CookiesService){

  }
  ngOnInit(): void {
    this.check=this.cookie.getCookie("user_check");
    if(this.check!="true"){
      this.showNav=false;
    }
  }
}
