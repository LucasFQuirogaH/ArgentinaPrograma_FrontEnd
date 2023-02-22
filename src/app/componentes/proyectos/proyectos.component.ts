import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyectos } from 'src/app/model/proyectos';
import { ImageService } from 'src/app/servicios/image.service';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyectos[] = null;
  proyecto: Proyectos = null;
  urlEnEdicion: string;
  urlABorrar: string ="";
  nombreRecuperado: string;

  constructor(private activatedRouter: ActivatedRoute, private router: Router, private proyectosService: ProyectosService, private tokenService: TokenService, public imageService: ImageService) { }

  isLogged = false;
  ngOnInit(): void {
    this.cargarProyectos();

    //-----------------------------------------------//
    // ------------ Validacion del token  ---------- //
    //-----------------------------------------------//
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    //-----------------------------------------------//
    // ------------ Validacion del token  ---------- //
    //-----------------------------------------------//
  }

  //------------------------------------------------//
  // ---- ---- ---  Carga de proyectos --- --- ---- //
  //------------------------------------------------//
  cargarProyectos(): void {
    this.proyectosService.lista().subscribe(
      data => {
        this.proyectos = data;
      }
    )
  }
  //------------------------------------------------//
  // ---- ---- ---  Carga de proyectos --- --- ---- //
  //------------------------------------------------//

  delete(id?: number) {
    //-------------------------------------------------------------//
    // Aqui recuperas la informacion del proyecto para leer la URL //
    //-------------------------------------------------------------//

    this.proyectosService.detail(id).subscribe(
      data => {
        this.proyecto = data;
        //----------------------------------------------------------//
        // ------------  Aqui recupero la URL de la foto  ----------//
        //----------------------------------------------------------//
        this.urlABorrar = this.proyecto.fotoDescripcion;
        //----------------------------------------------------------//
        // ------------  Aqui recupero la URL de la foto  ----------//
        //----------------------------------------------------------//
        //alert(this.urlABorrar) // Este si lo muestra
        this.imageService.tambienBorraFotoDeFirebase(this.urlABorrar);
        
      }, err => {
        alert("Error al modificar el proyecto");
        this.router.navigate(['']);
      }
      )
    //-------------------------------------------------------------//
    // Aqui recuperas la informacion del proyecto para leer la URL //
    //-------------------------------------------------------------//

    //----------------------------------------------------------------------------------//
    // ---------------------- Aqui borras el proyecto del backend ----------------------//
    //----------------------------------------------------------------------------------//
    this.proyectosService.delete(id).subscribe(
      data => {
        this.cargarProyectos();
      }, err => {
        alert('No se pudo eliminar');
      }
    );
  }
}
