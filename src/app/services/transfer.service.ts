import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  variabile:any;
  constructor() { }

  get(){
    return this.variabile;
  }

  set(value:any):void{
    this.variabile=value;
  }
}
