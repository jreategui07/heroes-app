import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.models';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url:string = 'https://heroes-app-19d6a.firebaseio.com';

  constructor(private http: HttpClient) { }

  getHeroe(id: string) {
    return this.http.get(`${ this.url }/heroes/${ id }.json`);
  }

  deleteHeroe(id: string) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  createHeroe(heroe: HeroeModel) {
    //return this.http.post(`${ this.url }/heroes.json`, heroe);
    return this.http.post(`${ this.url }/heroes.json`, heroe).pipe(
      map((response:any) => {
        heroe.id = response.name;
        return heroe;
      })
    );
  }
  
  updateHeroe(heroe: HeroeModel) {

    //para obviar el id del objecto heroe, ya que se agregaria como nuevo valor en firebase
    const heroeTemp = {
      ...heroe //a heroeTemp, le asigna el contenido del objeto heroe 
    };

    delete heroeTemp.id; //eliminamos el id del objeto heroeTemp

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
    
  }

  getHeroes() {
    //return this.http.get(`${ this.url }/heroes.json`);
    //Convertimos el json proporcionado por firebase a un arreglo o conjunto de reglas
    return this.http.get(`${ this.url }/heroes.json`).pipe(
      //map(response=> this.formatoArreglo(response))
      map(this.formatoArreglo) //lo mismo que la linea anterior pero resumido. Se llama a la función "formatoArreglo" y el response se envía de forma explicita
      ,delay(250) //delay de prueba para poder apreciar el spiner
    );
  }

  private formatoArreglo(jsonObject: object) {

    const heroes: HeroeModel[] = [];

    //console.log(heroesObj);

    if(jsonObject === null) return []; //en caso de no tener registros en la base de datos de firebase
    
    Object.keys(jsonObject).forEach(key=> {
      const heroe: HeroeModel = jsonObject[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }

}
