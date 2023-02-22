import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/servicios/image.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';

@Component({
  selector: 'app-editproyect',
  templateUrl: './editproyect.component.html',
  styleUrls: ['./editproyect.component.css']
})
export class EditproyectComponent implements OnInit {

  proyecto: Proyectos = null;
  urlEnEdicion: string;
  nombreRecuperado: string ="";
  constructor(private activatedRouter: ActivatedRoute, private router: Router, private proyectosService: ProyectosService, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.proyectosService.detail(id).subscribe(
      data => {
        this.proyecto = data;
        // -----------  Aqui recupero la URL de la foto  ---------//
        this.imageService.urlThree = this.proyecto.fotoDescripcion;
        // -----------  Aqui recupero la URL de la foto  ---------//
        let urlEnEdicion = this.proyecto.fotoDescripcion;
        let i = 0;
        while(urlEnEdicion[i] != "_"){
          i++;
        }
        i++;
        while(urlEnEdicion[i] != "?"){
          this.nombreRecuperado = this.nombreRecuperado + urlEnEdicion[i];
          i++;
        }
      }, err => {
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )
  }

  onUpdate(): void {
    // ---------------------------------------------  Aguardamos  ------------------------------------//
    const id = this.activatedRouter.snapshot.params['id'];

    // -----------------  Guardas la foto en la base de datos -------------------//
    this.proyecto.fotoDescripcion = this.imageService.urlThree //----------------//
    // -----------------  Guardas la foto en la base de datos -------------------//

    this.proyectosService.update(id, this.proyecto).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
    )
    // ---------------------------------------------  Aguardamos  ------------------------------------//
  }
  uploadImageThree($event: any) {
    var id = Math.random().toString(36).substring(2);
    const name = "proyecto_" + id;
    this.imageService.uploadImageThree($event, name);
  }

  uploadImageThreeEdit($event: any) {
    this.imageService.uploadImageThree($event, "proyecto_" + this.nombreRecuperado); //Aqui el name tiene que darselo el init
  }
}