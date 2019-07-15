import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from '../../models/heroe.models';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(private heroeService: HeroesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); //ActivatedRoute, nos permite leer un parametro que se encuentre en la URL. Para este caso la usamos para leer el id

    if(id !== 'nuevo') {
      this.heroeService.getHeroe(id).subscribe((response: HeroeModel)=> {
        //console.log(response);
        this.heroe = response;
        this.heroe.id = id;
      });
    }
  }

  guardar(form:NgForm) {

    if(form.invalid) {
      console.log('El formulario no es valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id) { //actualizar
      /* this.heroeService.updateHeroe(this.heroe).subscribe(response=>{
        console.log(response);
      }); */
      peticion = this.heroeService.updateHeroe(this.heroe);
    }else{ //crear
      /* this.heroeService.createHeroe(this.heroe).subscribe(response=>{
        console.log(response);
        //this.heroe = response; //esta instrucción está demás debido a que todos los objetos en javascript son pasados por referencia
      }); */
      peticion = this.heroeService.createHeroe(this.heroe);
    }

    peticion.subscribe(response=>{
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    });

  }

}
