import { Component, OnInit } from '@angular/core';
import { Acerca } from 'src/app/model/acerca';
import { AcercaService } from 'src/app/servicios/acerca.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  acerca: Acerca[] = [];
  constructor(private sAcerca: AcercaService, private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarAcerca();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else{
      this.isLogged =  false;
    }
  }

  cargarAcerca(): void{
    this.sAcerca.lista().subscribe(
      data => {
        this.acerca = data;
      }
    )
  }

  delete(id?: number){
    if (id != undefined){
      this.sAcerca.delete(id).subscribe(
        data =>{
          this.cargarAcerca();
        }, err => {
          alert('No se pudo eliminar la educacion')
        }
      )
    }
  }

}
