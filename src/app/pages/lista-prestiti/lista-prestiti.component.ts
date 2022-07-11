import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { Libro } from 'src/app/models/libro';
import { Listaprestiti } from 'src/app/models/listaprestiti';
import { Prestito } from 'src/app/models/prestito';
import { Utente } from 'src/app/models/utente';

@Component({
  selector: 'app-lista-prestiti',
  templateUrl: './lista-prestiti.component.html',
  styleUrls: ['./lista-prestiti.component.css']
})
export class ListaPrestitiComponent implements OnInit {
  utente:Utente[]=[];
  prestito:Prestito[]=[];
  libro:Libro[]=[];
  listapre:Listaprestiti[]= [];
  nomeuser:any;
  cognomeuser:any;
  titolo:any;
  term = '';
  data:any;
  fulldata:any;
  month:any;
  day:any;
  constructor(private databases:DatabaseService) { }

  ngOnInit(): void {
    this.getUtente();
    this.getPrestito();
    this.getLibro();
    this.get();
  }

getUtente():any{
  this.databases.getUtente().subscribe(res=>{
    this.utente=res;
  })
}

getPrestito():any{
  this.databases.getPrestito().subscribe(res=>{
    this.prestito=res;
  })
}

getLibro():any{
  this.databases.getLibro().subscribe(res=>{
    this.libro=res;
  })
}




get():any{
  for(let i=0;i<this.prestito.length;i++){
    for(let c=0;c<this.libro.length;c++){
      if(this.libro[c].id==this.prestito[i].id_libro){
        this.titolo=this.libro[c].titolo;
      }
    }

    for(let d=0;d<this.utente.length;d++){
      if(this.utente[d].id==this.prestito[i].id_utente){
        this.nomeuser=this.utente[d].nome;
        this.cognomeuser=this.utente[d].cognome;
      }
    }

    this.fulldata=new Date(this.prestito[i].giorno_prestito);
    this.day=this.fulldata.getDate();
    this.month=["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
    if(this.day<10 && this.day>0){
      this.day="0"+this.day;
    }
    this.data=this.day+" "+this.month[this.fulldata.getMonth()]+" "+this.fulldata.getFullYear();
this.listapre[i]={
id:this.prestito[i].id,
nome:this.nomeuser,
cognome:this.cognomeuser,
titolo:this.titolo,
tempo_prestito:this.prestito[i].tempo_prestito+" GIORNI",
giorno_prestito:this.data
}
}
console.log(this.listapre);
}

}
