export class Prestito {
  constructor(
    public id:number,
    public id_libro:number,
    public id_utente:number,
    public tempo_prestito:number,
    public giorno_prestito:string
  ){

  }
}
