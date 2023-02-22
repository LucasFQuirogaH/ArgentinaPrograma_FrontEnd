import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/servicios/s-experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  expe: Experiencia[] = [];
  constructor(private sExperiencia: SExperienciaService, private tokenService: TokenService) { }

  isLogged = false;
  ngOnInit(): void {
    this.cargarExperiencia(); // Aqui debe cargar independiente de si estas o no loggeado
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  cargarExperiencia(): void {
    this.sExperiencia.lista().subscribe(data=>{this.expe = data;
    })
  }

  delete(id?: number){
    if (id !=undefined){
      this.sExperiencia.delete(id).subscribe(
        data=>{
          this.cargarExperiencia();
        }, err =>{
          alert("No se pudo borrar la experiencia");
        }
      )
    }
  }
}
