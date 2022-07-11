import { Carrello } from './models/carrello';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Autore } from './models/autore';
import { CasaEditrice } from './models/casa-editrice';
import { Libro } from './models/libro';
import { Utente } from './models/utente';
import { Prestito } from './models/prestito';


const APILIBRI="http://127.0.0.1:8000/api/libri";
const APIUTENTI="http://127.0.0.1:8000/api/utente";
const API="http://127.0.0.1:8000/api";
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private http:HttpClient) { }

  getCasaEditrice(): Observable<CasaEditrice[]> {
    return this.http.get<CasaEditrice[]>(APILIBRI+"/editori");
  }
  getAutore(): Observable<Autore[]> {
    return this.http.get<Autore[]>(APILIBRI+"/autori");
  }
  getLibro(): Observable<Libro[]> {
    return this.http.get<Libro[]>(APILIBRI);
  }
  getUtente(): Observable<Utente[]> {
    return this.http.get<Utente[]>(APIUTENTI);
  }
  getCarrello(): Observable<Carrello[]> {
    return this.http.get<Carrello[]>(APIUTENTI+"/carrello");
  }

  addUtente(utente: Utente): Observable<any> {
   return this.http.post(APIUTENTI, utente)
     .pipe(
       map((response) => response),
       catchError(this.errorHandler)
     );
 }

 addPrestito(prestito: Prestito): Observable<any> {
  return this.http.post(APIUTENTI+"/prestito", prestito)
    .pipe(
      map((response) => response),
      catchError(this.errorHandler)
    );
}

addLibro(libro: Libro): Observable<any> {
 return this.http.post(APILIBRI, libro)
   .pipe(
     map((response) => response),
     catchError(this.errorHandler)
   );
}

addAutore(autore: Autore): Observable<any> {
 return this.http.post(APILIBRI+"/autori", autore)
   .pipe(
     map((response) => response),
     catchError(this.errorHandler)
   );
}

addEditore(editore: CasaEditrice): Observable<any> {
 return this.http.post(APILIBRI+"/editori", editore)
   .pipe(
     map((response) => response),
     catchError(this.errorHandler)
   );
}

  addCarrello(carrello: Carrello): Observable<any> {
   return this.http.post(APIUTENTI+"/carrello", carrello)
     .pipe(
       map((response) => response),
       catchError(this.errorHandler)
     );
 }
  errorHandler(error: HttpErrorResponse): any {
    return throwError(error.error || {message: 'Server Error'});
  }

  removeCart(id:any){
    return this.http.get(API+"/deleteCarrello/"+id);
  }


  getPrestito(): Observable<Prestito[]> {
    return this.http.get<Prestito[]>(APIUTENTI+"/prestito");
  }

  updateCopie(id:any,value:any){
    return this.http.get(API+"/update-copie/"+id+"/"+value);
  }
}
