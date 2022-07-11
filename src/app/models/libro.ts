export class Libro {
  constructor(
    public id:number,
    public titolo:string,
    public id_autore:number,
    public id_casa_editrice:number,
    public copertina:string,
    public n_copie:number,
    public trama:string
  ){

  }
}
