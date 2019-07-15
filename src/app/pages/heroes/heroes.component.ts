import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando: boolean = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    
    this.cargando = true;

    /* this.heroesService.getHeroes().subscribe(response=>{
      console.log(response);
      this.heroes = response;
    }); */

    //igual que la anterior pero resumida
    this.heroesService.getHeroes().subscribe(response=> {
      this.heroes = response;
      this.cargando = false;
    });

  }

  borrarHeroe(heroe: HeroeModel, i: number) {

   /*Swal.fire({
        title: '¿Está seuro?',
        text: `Está seuro que desea borrar a ${ heroe.nombre }`,
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true
    }).then(userResponse=> {
      
      if(userResponse.value) {
        this.heroesService.deleteHeroe(heroe.id).subscribe(response=> {
          this.heroes.splice(i, 1); //borrar heroe del objeto de herores segun el id, para que se renderice en la web
          console.log(response);
        });
      }

    });*/

    Swal.fire({
      title: '¿Está seuro?',
      text: `Estás seuro que deseas eliminar a ${ heroe.nombre }`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((userResponse) => {
      if (userResponse.value) {
        this.heroesService.deleteHeroe(heroe.id).subscribe(response=> {
          this.heroes.splice(i, 1); //borrar heroe del objeto de herores segun el id, para que se renderice en la web
          Swal.fire(
            'Eliminado!',
            `Se ha eliminado a ${ heroe.nombre }`,
            'success'
          )
        });
      }
    });

  }

}
