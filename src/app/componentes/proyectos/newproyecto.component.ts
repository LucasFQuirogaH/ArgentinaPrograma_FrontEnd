import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/servicios/image.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-newproyecto',
  templateUrl: './newproyecto.component.html',
  styleUrls: ['./newproyecto.component.css']
})
export class NewproyectoComponent implements OnInit {

  nombre: string;
  link: string;
  fotoDescripcion: string;

  constructor(private proyectosService: ProyectosService, private router: Router, private activatedRouter: ActivatedRoute, public imageService: ImageService ) { }

  ngOnInit(): void {
    this.imageService.urlThree = null;
  }

  onCreate(): void{

    const proyecto = new Proyectos(this.nombre, this.fotoDescripcion, this.link);

    //----------------------------------------------------------//
    // --------- Aqui guardo la foto en la variable ------------//
    //----------------------------------------------------------//
    proyecto.fotoDescripcion = this.imageService.urlThree;
    //----------------------------------------------------------//
    // --------- Aqui guardo la foto en la variable ------------//
    //----------------------------------------------------------//



    // ---------- ------------------------ ----------- //
    // ---------- Aqui agregas el proyecto ----------- //
    // ---------- ------------------------ ----------- //

    this.proyectosService.save(proyecto).subscribe(
      data => {
        alert("proyecto agregado correctamente");
        this.router.navigate(['']);
      }, err => {
        alert("Fallo el agregado de proyecto");
        this.router.navigate(['']);
      }
      )
    }
    // ---------- ------------------------ ----------- //
    // ---------- Aqui agregas el proyecto ----------- //
    // ---------- ------------------------ ----------- //
    
    // ----------------------- --------------------------- ---------------------------------//
    // ----------------------- Cargador de la imagen nueva ---------------------------------//
    // ----------------------- --------------------------- ---------------------------------//
    uploadImageThree($event: any) {
      const id = Math.random().toString(36).substring(2);
      const name = `proyecto_${id}`;
      this.imageService.uploadImageThree($event, name);
    }
    // ----------------------- --------------------------- ---------------------------------//
    // ----------------------- Cargador de la imagen nueva ---------------------------------//
    // ----------------------- --------------------------- ---------------------------------//
}
