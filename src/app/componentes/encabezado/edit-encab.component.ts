import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/model/persona.model';
import { ImageService } from 'src/app/servicios/image.service';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-edit-encab',
  templateUrl: './edit-encab.component.html',
  styleUrls: ['./edit-encab.component.css']
})
export class EditEncabComponent implements OnInit {

  persona: Persona = null;
  constructor(private activatedRouter: ActivatedRoute, private personaService: PersonaService, private router: Router, public imageService: ImageService) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.personaService.detail(id).subscribe(
      data => {
        this.persona = data;
      }, err => {
        alert("Error al modificar la experiencia");
        this.router.navigate(['']);
      }
    )
  }


  onUpdate(): void {
    // ---------------------------------------------  Aguardamos  ------------------------------------//
    const id = this.activatedRouter.snapshot.params['id'];

    this.persona.fotoPerfil = this.imageService.url
    this.persona.fotoPortada = this.imageService.urlTwo

    this.personaService.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['']);
      }, err => {
        alert("Error al modificar la experiencia");
        this.router.navigate(['']);
      }
    )
    // ---------------------------------------------  Aguardamos  ------------------------------------//

    // -------------------------------------------------------------------------------  Metodo del Arabe
  }
    uploadImage($event: any) {
      const id = this.activatedRouter.snapshot.params['id'];
      const name = "perfil_" + id;
      this.imageService.uploadImage($event, name);
    }

    uploadImageTwo($event: any) {
      const id = this.activatedRouter.snapshot.params['id'];
      const name = "portada_" + id;
      this.imageService.uploadImageTwo($event, name);
    }
}
