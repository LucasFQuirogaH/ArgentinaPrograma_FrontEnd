import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  persona: Persona = new Persona("", "", "", "", "");
  //persona: Persona =  null;

  constructor(public personaService: PersonaService, private router: Router, private tokenService: TokenService) { }
  isLogged = false;

  ngOnInit(): void {
    
    this.cargarPersona();

    // Validacion del token
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else{
      this.isLogged = false;
    }
  }

  onLogOut(): void{
    this.tokenService.logOut();
    window.location.reload();
  }

  login() {
    this.router.navigate(['/login'])
  }

  cargarPersona(): void{
    this.personaService.detail(1).subscribe(
      data => {
          this.persona = data;
      }
    )
  }


}

